import React, {Component} from 'react'

import $ from 'jquery'
import cn from 'classnames'

import {renderToStaticMarkup} from 'react-dom/server'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import { withRouter } from 'react-router-dom'

import {
    map,
    any,
    each,
    find,
    where,
    filter,
    reject,
    isNumber,
    findWhere
} from 'underscore'

import PropTypes from 'prop-types'
import * as Survey from 'survey-react'
import * as widgets from 'surveyjs-widgets'
import {Button, Row, Col} from 'reactstrap'

import 'survey-react/survey.css'

import 'pretty-checkbox'
import 'bootstrap/dist/css/bootstrap.min.css'

import Tabs from 'components/Tabs/Tabs'
import Alert from 'components/Alert/Alert'
import Table from 'components/Table/Table'
import Modal from 'components/Modal/Modal'
import Loader from 'components/Loader/Loader'
import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'

import './AssessmentViewer.scss'

import * as assessmentSurveyActions from 'redux/directory/assessment/survey/assessmentSurveyActions'
import * as assessmentDetailsActions from 'redux/client/assessment/details/assessmentDetailsActions'
import * as assessmentHistoryActions from 'redux/client/assessment/history/assessmentHistoryActions'
import * as assessmentManagementActions from 'redux/directory/assessment/management/assessmentManagementActions'

import {
    PAGINATION,
    ASSESSMENT_TYPES
} from 'lib/Constants'

import { Response } from 'lib/utils/AjaxUtils'
import { isEmpty, DateUtils, DateUtils as DU } from 'lib/utils/Utils'

const { format, formats } = DateUtils

const DATE_FORMAT = formats.longDateMediumTime12

const { FIRST_PAGE } = PAGINATION

const { GAD7, COMPREHENSIVE } = ASSESSMENT_TYPES

const STATUS_COLORS = {
    INACTIVE: '#e0e0e0',
    COMPLETED: '#d1ebfe',
    IN_PROCESS: '#d5f3b8'
}

const ASSESSMENT_TABS = [
    'Assessment Details',
    'Change History'
]

const COMPREHENSIVE_ASSESSMENT_TABS = [
    'Guide',
    'Demographics',
    'Medical History',
    'WellRx',
    'Additional Questions',
    'Behavioral Health',
    'Engagement',
    'Change History'
]

const SURVEY_CSS = {
    pageTitle: "sv_p_title SurveyPage-Title",
    question: {
        mainRoot: "sv_q sv_qstn SurveyQuestion",
        title: "sv_q_title SurveyQuestion-Title"
    },
    panel: {
        title: "sv_p_title SurveyPanel-Title"
    },
    row: "sv_row SurveyRow"
}

let majorSurveyPanels = []
let minorSurveyPanels = []

const LEVELS_ALERT_TYPES = {
    LOW: 'success',
    MEDIUM: 'warning',
    HIGH: 'danger'
}

function mapStateToProps(state) {
    return {
        assessment: state.client.assessment,
        directory: state.directory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            details: bindActionCreators(assessmentDetailsActions, dispatch),
            history: bindActionCreators(assessmentHistoryActions, dispatch),

            survey: bindActionCreators(assessmentSurveyActions, dispatch),
            management: bindActionCreators(assessmentManagementActions, dispatch)
        }
    }
}

class AssessmentViewer extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,

        assessmentId: PropTypes.number,

        onView: PropTypes.func,
        onClose: PropTypes.func
    }

    static defaultProps = {
        onView: function () {},
        onClose: function () {}
    }

    formRef = React.createRef()
    modalRef = React.createRef()

    state = {
        step: 0,
        scrollOffset: 0,
        isReviewMode: false,
        surveyModel: null,
        surveyData: null,
        invalidSurveyPageIndexes: []
    }

    componentDidMount() {
        this.loadSurvey()
            .then(Response(({ data }) => {
                this.setState({
                    surveyModel: new Survey.Model(
                        JSON.parse(data)
                    )
                })
            }))

        this.refreshDetails()

        this.loadManagement()

        if (this.getAssessmentType().name === COMPREHENSIVE) {
            this.setState({ step: 1 })
        }

        Survey.JsonObject.metaData.addProperty("panel", {
            name: "readOnly:boolean",
            default: true
        })

        Survey.JsonObject.metaData.addProperty("panel", "isNavigable:boolean")
        Survey.JsonObject.metaData.addProperty("panel", "isExpandable:boolean")
        Survey.JsonObject.metaData.addProperty("panel", "isNavDestination:boolean")
        Survey.JsonObject.metaData.addProperty("panel", "panelAnchor:text")

        Survey.JsonObject.metaData.addProperty("question", "isPriority:boolean")

        widgets.prettycheckbox(Survey, $);
    }

    componentDidUpdate (prevProps, prevState) {
        const {
            isAssessmentArchived,
            assessment: { details },
        } = this.props


        if (!isAssessmentArchived && details.shouldReload) {
            this.refreshDetails()
        }

        const { step } = this.state

        if (step !== prevState.step) {
            const modal = this.modalRef.current
            if (modal) modal.scrollToTop(0)

            if (step === this.getTabs().length - 1) {
                this.refreshChangeHistory()
            }
        }
    }

    componentWillUnmount () {
        if (this.props.isAssessmentArchived) {
            this.actions.details.clear(true)
        }

        else {
            this.actions.survey.clear()
            this.actions.details.clear()
            this.actions.management.clear()
        }

        Survey.JsonObject.metaData.removeProperty('panel', 'readOnly')

        Survey.JsonObject.metaData.addProperty("panel", {
            name: "readOnly:boolean",
            default: false
        })
    }

    onClose = () => {
        this.props.onClose()
    }

    onNext = () => {
        const { step } = this.state
        if(step <= 6) this.changeStep(step + 1)
    }

    onBack = () => {
        const { step } = this.state
        if(step >= 1) this.changeStep(step - 1)
    }

    onView = data => {
        this.props.onView(data)
    }

    onChangeTab = (tab) => {
        this.changeStep(tab)
    }

    onAfterRenderSurveyPage = (survey, options) => {
        const {
            page,
            htmlElement
        } = options

        const $page = $(htmlElement)
        $page.addClass('SurveyPage')

        if (this.state.isReviewMode) {
            const $nav = $(
                renderToStaticMarkup(
                    <div className='SurveyPage-Nav' />
                )
            );

            each(where(majorSurveyPanels, { isExpandable: true }), ({ name }) => {
                $nav.append(
                    renderToStaticMarkup(
                        <a
                            href={`#${name}`}
                            data-nav-target={name}
                            className='SurveyPage-NavLink'>
                            {name}
                        </a>
                    )
                )
            });

            $page.prepend($nav);
        }

        else {
            const $nav = $page.find('.SurveyPage-Nav')
            $nav.remove()
        }

        const $expandAll = $page.find('.sv-expand-all-sections-btn')
        const $collapseAll = $page.find('.sv-collapse-all-sections-btn')

        $expandAll
            .closest('div')
            .addClass('sv-expand-collapse-btns')

        $page.find('.ExpandableSurveyPanel')

        $expandAll.on('click', () => {
            $.each(page.rows, (i, row) => {
                $.each(row.elements, (j, elem) => {
                    if (elem.isPanel) {
                        elem.expand()
                        this.areAllPanelsExpanded = true
                        this.areAllPanelsCollapsed = false

                        $page.find('.SurveyPanel-Nav').show()
                    }
                });
            });
        });

        $collapseAll.on('click', () => {
            $.each(page.rows, (i, row) => {
                $.each(row.elements, (j, elem) => {
                    if (elem.isPanel) {
                        elem.collapse()
                        this.areAllPanelsCollapsed = true
                        this.areAllPanelsExpanded = false

                        $page.find('.SurveyPanel-Nav').hide()
                    }
                });
            });
        });
    }

    onAfterRenderSurveyPanel = (survey, options) => {
        const {
            panel,
            htmlElement
        } = options

        const {
            name,
            isNavigable,
            isExpandable,
            isNavDestination
        } = panel

        const $panel = $(htmlElement)
        $panel.addClass('SurveyPanel')

        const $title = $panel.find('.SurveyPanel-Title').eq(0);

        $title.on('click', e => {
            if (isReviewMode) e.stopPropagation()
        });

        const { isReviewMode } = this.state

        if (isExpandable || isNavigable) {
            let panel = findWhere(majorSurveyPanels, { name })

            if (!panel) {
                panel = {
                    name,
                    isNavigable,
                    isExpandable,
                    isNavDestination,
                    element: htmlElement,
                }

                majorSurveyPanels.push(panel)
            }

            each(minorSurveyPanels, p => {
                if (!p.navigableParent) {
                    p.navigableParent = panel
                }
            })
        }

        if (isExpandable) {
            $panel.addClass('ExpandableSurveyPanel')
        }

        if (isNavigable) {
            const hasNav = $panel.find('.SurveyPanel-Nav').length > 0

            const navDestinations = filter(minorSurveyPanels, p => p.navigableParent.name === name)

            if (!hasNav && navDestinations.length > 0) {
                $panel.addClass('NavigableSurveyPanel')

                const $nav = $(
                    renderToStaticMarkup(
                        <div
                            style={{display: 'none'}}
                            className='SurveyPanel-Nav'
                        />
                    )
                );

                each(navDestinations, ({ name }) => {
                    $nav.append(
                        renderToStaticMarkup(
                            <a
                                href={`#${name}`}
                                data-nav-target={name}
                                className='SurveyPanel-NavLink'>
                                {name}
                            </a>
                        )
                    )
                });

                $title.after($nav);

                if (isExpandable) {
                    if ($title.find('.sv_expanded').length > 0) {
                        $nav.show()
                    }

                    const isExpanded = () => {
                        return $title.find('.sv_expanded').length > 0
                    }


                    if (isExpanded()) $nav.show()

                    $title.on('click', e => {
                        if (isReviewMode) e.stopPropagation()

                        else setTimeout(() => {
                            if (isExpanded()) $nav.show()
                            else $nav.hide()
                        }, 100)
                    });
                }
            }
        }

        if (isNavDestination) {
            if (!any(minorSurveyPanels, (p) => p.name === name)) {
                minorSurveyPanels.push({
                    name,
                    isNavigable,
                    isExpandable,
                    isNavDestination,
                    element: htmlElement
                })
            }

            $panel
                .attr('id', name)
                .addClass('NavDestinationSurveyPanel')

            const borderClass = 'SurveyMinorPanel-DecoratedBorder'

            if (!$panel.has(`.${borderClass}`).length) {
                $panel.prepend(
                    renderToStaticMarkup (
                        <div className={borderClass} />
                    )
                )
            }
        }
    }

    onAfterRenderSurveyQuestion = (survey, options) => {
        const {
            question,
            htmlElement
        } = options

        const type = question.getType()

        $(htmlElement)
            .addClass('SurveyQuestion_type_' + type)
            .closest('.SurveyRow')
            .addClass(type !== 'boolean' ? 'd-flex flex-row' : '')
    }

    onRefreshChangeHistory = (page) => {
        this.refreshChangeHistory(page)
    }

    get actions () {
        return this.props.actions
    }

    get clientId () {
        return +this.props.match.params.clientId
    }

    getHeaderHeight () {
        const o = this.modalRef.current
        return o ? o.getHeaderHeight() : 73
    }

    changeStep (step) {
        majorSurveyPanels = []
        minorSurveyPanels = []

        this.setState({ step })
    }

    loadDetails () {
        return this.actions.details.load(
            this.clientId,
            this.props.assessmentId
        )
    }

    refreshDetails () {
        this.loadDetails()
            .then(Response(({ data }) => {
                this.setState({
                    surveyData: JSON.parse(data.dataJson)
                })
            }))
    }

    loadSurvey () {
        return this.actions.survey.load({
            clientId: this.clientId,
            typeId: this.props.assessmentTypeId
        })
    }

    loadManagement () {
        this.actions.management.load({
            clientId: this.clientId,
            typeId: this.props.assessmentTypeId
        })
    }

    setScrollOffset (offset) {
        this.modalRef.current.setScrollOffset(offset)
    }

    updateChangeHistory (isReload, page) {
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = this.props.assessment.history

        if (isReload
            || shouldReload
            || (!isFetching && isEmpty(ds.data))) {

            const {
                size,
                page: p
            } = ds.pagination

            this.actions.history.load({
                size,
                page: page || p,
                clientId: this.clientId,
                assessmentId: this.props.assessmentId
            })
        }
    }

    refreshChangeHistory (page) {
        this.updateChangeHistory(true, page || FIRST_PAGE)
    }

    getAssessmentType () {
        let type = null

        const {
            directory,
            assessment,
            assessmentTypeId
        } = this.props

        const id = assessmentTypeId || assessment.form.fields.typeId

        if (id) {
            each(
                directory.assessment.type.list.dataSource.data,
                o => {
                    const t = findWhere(o.types, { id })
                    if (t) type = t
                }
            )
        }

        return type
    }

    getTabs () {
        return this.getAssessmentType().name === COMPREHENSIVE ?
            COMPREHENSIVE_ASSESSMENT_TABS : ASSESSMENT_TABS
    }

    getScoringAlert () {
        const {
            directory,
            assessment
        } = this.props

        const {
            management: mg
        } = directory.assessment

        const { score } = assessment.details.data || {}

        if (isNumber(score) && mg.data) {
            const item = find(
                mg.data.scale,
                o => score >= o.scoreLow && score <= o.scoreHigh
            )

            return item ? {
                text: item.severity,
                type: LEVELS_ALERT_TYPES[item.highlighting.toUpperCase()]
            } : {
                text: 'Severe anxiety disorder.',
                type: LEVELS_ALERT_TYPES.HIGH
            }
        }

        return null
    }

    render () {
        const {
            step,
            surveyData,
            surveyModel,
            scrollOffset
        } = this.state

        const {
            isOpen,
            assessmentId,
            assessment: {
                details, history
            },
            directory: {
                assessment: {
                    management
                }
            },
            isAssessmentArchived
        } = this.props

        const tabs = this.getTabs()
        const type = this.getAssessmentType()
        const scoringAlert = this.getScoringAlert()

        const {
            id,
            comment,
            contactName,
            dateCompleted
        } = details.data || {}

        return (
            <Modal
                hasCloseBtn
                isOpen={isOpen}
                ref={this.modalRef}
                onClose={this.onClose}
                scrollOffset={scrollOffset}
                className={cn('AssessmentViewer', `AssessmentViewer-Assessment_type_${type.name.toLowerCase()}`)}
                title={`View ${type.title}`}
                headerClassName='AssessmentViewer-Header'
                footerClassName='AssessmentViewer-Footer'
                renderFooter={() => (
                    <>
                        <Row className='flex-1'>
                            <Col md={6}>
                                {type.name === COMPREHENSIVE && (
                                    <>
                                        {step > 0 && (
                                            <Button
                                                color="link"
                                                className="AssessmentViewer-BackBtn"
                                                onClick={this.onBack}>
                                                Back
                                            </Button>
                                        )}
                                        {step < tabs.length - 1 && (
                                            <Button
                                                color="link"
                                                className="AssessmentViewer-NextBtn"
                                                onClick={this.onNext}>
                                                Next
                                            </Button>
                                        )}
                                    </>
                                )}
                            </Col>
                            <Col md={6} className='text-right'>
                                <Button outline color='success' onClick={this.onClose}>Close</Button>
                            </Col>
                        </Row>
                    </>
                )}>
                <>
                    {type.name === COMPREHENSIVE ? (
                        <>
                            {surveyModel ? (
                                <div style={{ top: this.getHeaderHeight() }} className='AssessmentViewer-TabsWrapper'>
                                    <Tabs
                                        className='AssessmentViewer-Tabs'
                                        items={map(
                                            reject(tabs, (t, i) => isAssessmentArchived && i === tabs.length - 1),
                                            (title, i) => ({
                                                title, isActive: i === step
                                            })
                                        )}
                                        onChange={this.onChangeTab}
                                    />
                                </div>
                            ) : null}
                            {assessmentId === id && details.isFetching ? (
                                <div className='AssessmentViewer-Loading'>
                                    <Loader/>
                                </div>
                            ) : step < tabs.length - 1 && surveyModel && surveyData && (
                                <div>
                                    <Survey.Survey
                                        mode='display'
                                        currentPageNo={step}
                                        css={SURVEY_CSS}
                                        model={surveyModel}
                                        data={surveyData}
                                        onAfterRenderPage={this.onAfterRenderSurveyPage}
                                        onAfterRenderPanel={this.onAfterRenderSurveyPanel}
                                        onAfterRenderQuestion={this.onAfterRenderSurveyQuestion}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            {!isAssessmentArchived && (
                                <div className='AssessmentViewer-TabsWrapper'>
                                    <Tabs
                                        className='AssessmentViewer-Tabs'
                                        items={map(tabs, (title, i) => ({
                                            title, isActive: i === step
                                        }))}
                                        onChange={this.onChangeTab}
                                    />
                                </div>
                            )}
                            {step === 0 && (
                                assessmentId === id && details.isFetching ? (
                                    <div className='AssessmentViewer-Loading'>
                                        <Loader/>
                                    </div>
                                ) : surveyModel && surveyData && (
                                    <div>
                                        <div className='AssessmentViewer-Section'>
                                            <div className='AssessmentViewer-SectionTitle font-size-26'>General</div>
                                            <div className="margin-top-20">
                                                <Row form>
                                                    <Col md={6}>
                                                        <DateField
                                                            isDisabled
                                                            label="Date Completed*"
                                                            name="dateCompleted"
                                                            className="AssessmentViewer-Field"
                                                            value={dateCompleted}
                                                            timeFormat="hh:mm aa"
                                                            dateFormat="MM/dd/yyyy hh:mm a"
                                                        />
                                                    </Col>
                                                    <Col md={6}>
                                                        <TextField
                                                            isDisabled
                                                            type="text"
                                                            label="Completed By*"
                                                            className="AssessmentViewer-Field"
                                                            value={contactName}
                                                        />
                                                    </Col>
                                                </Row>
                                            </div>
                                            <Survey.Survey
                                                mode='display'
                                                currentPageNo={step}
                                                css={SURVEY_CSS}
                                                model={surveyModel}
                                                data={surveyData}
                                                onAfterRenderPage={this.onAfterRenderSurveyPage}
                                                onAfterRenderPanel={this.onAfterRenderSurveyPanel}
                                                onAfterRenderQuestion={this.onAfterRenderSurveyQuestion}
                                            />
                                            <div className="margin-top-20">
                                                <TextField
                                                    isDisabled
                                                    type="textarea"
                                                    label="Comment"
                                                    name="comment"
                                                    value={comment}
                                                    className="AssessmentViewer-Field AssessmentViewer-CommentField"
                                                />
                                            </div>
                                        </div>
                                        <div className="AssessmentViewer-Section">
                                            <div className='AssessmentViewer-SectionTitle'>
                                                {type.shortTitle} Scoring
                                            </div>
                                            {scoringAlert && (
                                                <Alert
                                                    className='ScoringAlert'
                                                    type={scoringAlert.type}
                                                    title={isNumber(details.data.score) ? `${details.data.score} Points`: ''}
                                                    text={scoringAlert.text}
                                                />
                                            )}
                                        </div>
                                        {management.data && (
                                            <div className="AssessmentViewer-Section">
                                                <div className='AssessmentViewer-SectionTitle'>Management</div>
                                                <div className='AssessmentViewer-SectionText'>
                                                    {management.data.message}
                                                </div>
                                                <Table
                                                    isLoading={false}
                                                    className='AssessmentScoringManagement'
                                                    containerClass='AssessmentScoringManagementContainer'
                                                    data={management.data.scale}
                                                    columns={[
                                                        {
                                                            dataField: 'score',
                                                            text: 'Score',
                                                            headerStyle: {
                                                                width: '100px',
                                                            },
                                                            formatter: (v, row) => {
                                                                return `${row.scoreLow}-${row.scoreHigh}`
                                                            }
                                                        },
                                                        {
                                                            dataField: 'severityShort',
                                                            text: `${type.name === GAD7 ? 'Symptom' : 'Depression'} Severity`,
                                                            headerStyle: {
                                                                width: '200px',
                                                            }
                                                        },
                                                        {
                                                            dataField: 'comments',
                                                            text: 'Comments',
                                                        }
                                                    ]}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </>
                    )}
                    {step === tabs.length - 1 && (
                        <Table
                            hasPagination
                            keyField='id'
                            title='Change History'
                            isLoading={history.isFetching}
                            className='AssessmentChangeHistory'
                            containerClass='AssessmentChangeHistoryContainer'
                            data={history.dataSource.data}
                            pagination={history.dataSource.pagination}
                            columns={[
                                {
                                    dataField: 'modifiedDate',
                                    text: 'Date',
                                    align: 'right',
                                    headerAlign: 'right',
                                    headerStyle: {
                                        width: '130px',
                                    },
                                    formatter: v => format(v, DATE_FORMAT)

                                },
                                {
                                    dataField: 'status',
                                    text: 'Status',
                                    headerStyle: {
                                        width: '100px',
                                    },
                                    formatter: (v, row) => {
                                        return (
                                            <span
                                                style={{ backgroundColor: STATUS_COLORS[row.statusName] }}
                                                className='AssessmentChangeHistory-AssessmentStatus'>
                                                        {row.statusTitle}
                                                    </span>
                                        )
                                    }
                                },
                                {
                                    dataField: 'author',
                                    text: 'Author',
                                    headerStyle: {
                                        width: '200px',
                                    }
                                },
                                {
                                    dataField: '',
                                    text: 'Updates',
                                    headerStyle: {
                                        width: '100px',
                                    },
                                    formatter: (v, row) => {
                                        return row.isArchived ? (
                                            <Button
                                                color='link'
                                                onClick={() => { this.onView(row) }}
                                                className="AssessmentChangeHistory-ViewDetailsBtn">
                                                View Details
                                            </Button>
                                        ) : null
                                    }
                                }
                            ]}
                            renderCaption={title => {
                                return (
                                    <div className='AssessmentChangeHistory-Caption'>
                                        <div className='AssessmentChangeHistory-Title'>
                                            {title}
                                        </div>
                                    </div>
                                )
                            }}
                            onRefresh={this.onRefreshChangeHistory}
                        />
                    )}
                </>
            </Modal>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AssessmentViewer)
)