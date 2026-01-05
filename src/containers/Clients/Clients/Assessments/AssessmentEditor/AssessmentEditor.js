import React, { Component } from 'react'

import $ from 'jquery'
import cn from 'classnames'
import PropTypes from 'prop-types'

import {
    map,
    any,
    each,
    find,
    pick,
    first,
    where,
    filter,
    isNumber,
    findWhere
} from 'underscore'

import { renderToStaticMarkup } from 'react-dom/server'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withRouter } from 'react-router-dom'

import * as Survey from 'survey-react'
import * as widgets from 'surveyjs-widgets'

import 'pc-bootstrap4-datetimepicker'

import { Button, Col, Row } from 'reactstrap'

import 'survey-react/survey.css'

import 'pretty-checkbox'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.min.css'

import Tabs from 'components/Tabs/Tabs'
import Modal from 'components/Modal/Modal'
import Alert from 'components/Alert/Alert'
import Table from 'components/Table/Table'
import Loader from 'components/Loader/Loader'
import DateField from 'components/Form/DateField/DateField'
import TextField from 'components/Form/TextField/TextField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import './AssessmentEditor.scss'

import AssessmentTypeForm from '../AssessmentTypeForm/AssessmentTypeForm'

import * as assessmentFormActions from 'redux/client/assessment/form/assessmentFormActions'
import * as assessmentDetailsActions from 'redux/client/assessment/details/assessmentDetailsActions'

import * as assessmentScoreActions from 'redux/directory/assessment/score/assessmentScoreActions'
import * as assessmentSurveyActions from 'redux/directory/assessment/survey/assessmentSurveyActions'
import * as assessmentManagementActions from 'redux/directory/assessment/management/assessmentManagementActions'

import {
    Time,
    defer,
    isEmpty,
    isNotEmpty,
    DateUtils as DU
} from 'lib/utils/Utils'

import store from 'lib/stores/BaseStore'

import { Response } from 'lib/utils/AjaxUtils'

import {
    ASSESSMENT_TYPES,
    ASSESSMENT_STATUSES
} from 'lib/Constants'

import { ReactComponent as Diskette } from 'images/diskette.svg'

import mockSurveys from 'lib/mock/MockSurveys'

const DATE_FORMAT = DU.formats.americanMediumDate
const DATE_TIME_ZONE_FORMAT = DU.formats.longDateMediumTime12TimeZone

const COMPREHENSIVE_TABS = [
    'Guide',
    'Demographics',
    'Medical History',
    'WellRx',
    'Additional Questions',
    'Behavioral Health',
    'Engagement'
]

const time = new Time()

let surveyPages = []
let majorSurveyPanels = []
let minorSurveyPanels = []

const SURVEY_CSS = {
    page: { root: 'sv_p_root' },
    pageTitle: 'sv_p_title SurveyPage-Title',
    question: {
        mainRoot: 'sv_q sv_qstn SurveyQuestion',
        title: 'sv_q_title SurveyQuestion-Title'
    },
    panel: {
        title: 'sv_p_title SurveyPanel-Title'
    },
    row: 'sv_row SurveyRow'
}

const EMPTY_SURVEY_TEXT = 'No questions for review'

const {
    GAD7,
    PHQ9,
    COMPREHENSIVE
} = ASSESSMENT_TYPES

const {
    INACTIVE,
    COMPLETED,
    IN_PROCESS
} = ASSESSMENT_STATUSES

const LEVELS_ALERT_TYPES = {
    LOW: 'success',
    MEDIUM: 'warning',
    HIGH: 'danger'
}

const STORED_STATES_KEY = 'ASSESSMENT_EDITOR_STATES'

function storeState (key, state) {
    store.save(
        STORED_STATES_KEY,
        { ...store.get(STORED_STATES_KEY), [key]: state }
    )
}

function restoreState (key) {
    return (
        store.get(STORED_STATES_KEY) || {}
    )[key] || {}
}

function mapStateToProps (state) {
    const {
        form, details
    } = state.client.assessment

    return {
        auth: state.auth,
        form,
        details,
        directory: state.directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            form: bindActionCreators(assessmentFormActions, dispatch),
            details: bindActionCreators(assessmentDetailsActions, dispatch),

            score: bindActionCreators(assessmentScoreActions, dispatch),
            survey: bindActionCreators(assessmentSurveyActions, dispatch),
            management: bindActionCreators(assessmentManagementActions, dispatch),
        }
    }
}

class AssessmentEditor extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        assessmentId: PropTypes.number,
        onClose: PropTypes.func,
        onSaveSuccess: PropTypes.func,
        onCompleteSuccess: PropTypes.func,
        onChangeActivitySuccess: PropTypes.func
    }

    static defaultProps = {
        onClose: function () {},
        onSaveSuccess: function () {}
    }

    formRef = React.createRef()
    modalRef = React.createRef()
    surveyRef = React.createRef()

    state = {
        step: this.isEditMode() ? 1 : 0,

        typeId: null,

        surveyKey: 0,

        isChanged: false,
        isInactive: false,

        scrollOffset: 0,
        isReviewMode: false,

        surveyData: null,
        surveyModel: null,
        isSurveyReady: false,
        surveyReviewModel: null,

        invalidSurveyPageIndexes: []
    }

    areAllPanelsExpanded = false
    areAllPanelsCollapsed = false

    componentDidMount () {
        time.save()

        $.extend(true, $.fn.datetimepicker.defaults, {
            icons: {
                up: 'fa fa-angle-up',
                down: 'fa fa-angle-down',
                previous: 'fa fa-angle-left',
                next: 'fa fa-angle-right'
            }
        })

        Survey.surveyStrings.emptySurvey = EMPTY_SURVEY_TEXT

        Survey.JsonObject.metaData.removeProperty('panel', 'readOnly')

        Survey.JsonObject.metaData.addProperty("panel", {
            name: "readOnly:boolean",
            default: false
        })


        Survey.JsonObject.metaData.addProperty('panel', 'isNavigable:boolean')
        Survey.JsonObject.metaData.addProperty('panel', 'isExpandable:boolean')
        Survey.JsonObject.metaData.addProperty('panel', 'isNavDestination:boolean')
        Survey.JsonObject.metaData.addProperty('panel', 'panelAnchor:text')

        Survey.JsonObject.metaData.addProperty('question', 'calendarFlag:text')
        Survey.JsonObject.metaData.addProperty('question', 'disableFuture:boolean')
        Survey.JsonObject.metaData.addProperty('question', 'customdatepicker:boolean')
        Survey.JsonObject.metaData.addProperty('question', 'isPriority:boolean')

        widgets.inputmask(Survey, $);
        widgets.prettycheckbox(Survey, $);

        if (this.isEditMode()) {
            const state = restoreState(
                this.assessmentId
            )

            if (state.step > 1) {
                this.setState({ step: state.step })
            }

            this.loadDetails()
                .then(Response(({ data }) => {
                    this.changeFormFields(
                        pick(
                            data,
                            'typeId',
                            'comment',
                            'hasErrors',
                            'dateAssigned',
                            'dateCompleted',
                            'contactId'
                        )
                    )

                    this.setState({
                        surveyData: JSON.parse(data.dataJson),
                        isInactive: data.statusName === INACTIVE
                    })
                }))
        }

        else {
            this.changeFormFields({
                contactId: this.authUser.id,
                dateAssigned: Date.now(),
                dateCompleted: Date.now()
            })

            this.setState({
                surveyData: {
                    "Completed by": this.authUser.fullName,
                    "Date started": DU.format(Date.now(), DATE_TIME_ZONE_FORMAT)
                }
            })
        }
    }

    componentDidUpdate (prevProps, prevState) {
        const {
            step,
            isReviewMode
        } = this.state

        if (!isReviewMode && prevState.isReviewMode) {
            if (this.getInvalidSurveyPageIndexes().length > 0) {
                this.scrollToFirstSurveyErrorQuestion()
            }
        }

        if (step !== prevState.step) {
            const modal = this.modalRef.current
            if (modal) modal.scrollToTop(0)

            const indexes = this.getInvalidSurveyPageIndexes()

            if (isNotEmpty(indexes) && indexes.includes(step - 1)) {
                this.scrollToFirstSurveyErrorQuestion()
            }

            if (prevState.step === 0) {
                this.updateSurvey()
                this.loadManagement()
            }
        }

        if (this.isEditMode()) {
            const { typeId } = this.formData

            if (typeId !== prevProps.form.fields.typeId) {
                const {
                    survey: sv, management: mg
                } = this.props.directory.assessment

                if (!sv.isFetching) {
                    this.updateSurvey()
                }

                const type = this.getAssessmentType() || {}

                if (!(type.name === COMPREHENSIVE || mg.isFetching)) {
                    this.loadManagement()
                }
            }
        }
    }

    componentWillUnmount () {
        this.actions.form.clear()
        this.actions.survey.clear()
        this.actions.details.clear()
        this.actions.management.clear()
    }

    onReview = () => {
        this.enableReviewMode()
    }

    onCancelReview = () => {
        this.cancelReviewMode()
    }

    onClose = () => {
        storeState(this.assessmentId, {
            step: this.state.step
        })

        this.props.onClose(
            this.state.isChanged
        )
    }

    onNext = e => {
        e.preventDefault();

        const { step } = this.state

        const type = this.getAssessmentType()

        if (type.name === COMPREHENSIVE) {
            this.changeStep(step + 1)
        }

        else {
            if (step > 0) {
                this.validateSurvey().then(success => {
                    if (success) {
                        this.loadScore()
                        this.changeStep(step + 1)
                    }
                })
            }

            else this.changeStep(step + 1)
        }
    }

    onBack = e => {
        e.preventDefault();

        if (this.state.isReviewMode) {
            this.cancelReviewMode()
        }

        else this.changeStep(this.state.step - 1)
    }

    onSave = () => {
        this.save().then(Response(({ data }) => {
            this.props.onSaveSuccess(
                { id: data, typeName: this.getAssessmentType().name }, true
            )
        }))
    }

    onValidateAndSave = () => {
        this.validateSurvey().then(success => {
            if (success) {
                this.save().then(Response(({ data }) => {
                    this.setState({ isChanged: false })

                    this.props.onSaveSuccess(
                        { id: data, typeName: COMPREHENSIVE }, false
                    )
                }))
            }
        })
    }

    onSaveAndClose = () => {
        this.save().then(Response(({ data }) => {
            storeState(data, {
                step: this.state.step
            })

            this.props.onSaveSuccess(
                { id: data, typeName: COMPREHENSIVE }, true
            )
        }))
    }

    onComplete = () => {
        this.validateSurvey().then(success => {
            if (success) {
                this.save({ shouldComplete: true }).then(resp => {
                    resp.success && this.props.onCompleteSuccess(
                        { id: resp.data, typeName: COMPREHENSIVE }
                    )
                })
            }

            else this.cancelReviewMode()
        })
    }

    onChangeActivity = (isInactive) => {
        this.save({ shouldMarkAsInactive: isInactive }).then(resp => {
            resp.success && this.props.onChangeActivitySuccess(
                { id: resp.data, typeName: COMPREHENSIVE }, isInactive
            )
        })
    }

    onChangeTab = (tab) => {
        this.changeStep(tab + 1)
    }

    onAfterRenderSurvey = (survey) => {
        each(survey.pages, p => {
            surveyPages.push({ name: p.name })
        })

        const {
            surveyData,
            surveyModel,
            isSurveyReady
        } = this.state

        if (!isSurveyReady && this.isEditMode()) {
            if (this.formData.hasErrors) {
                this.validateSurvey()
            }

            // to fix survey date field value validation issue
            each(surveyData, (value, name) => {
                surveyModel.setValue(name, value)

                const q = surveyModel.getQuestionByName(name)

                q && q.clearErrors()
            })
        }

        this.setState({ isSurveyReady: true })
    }

    onAfterRenderSurveyPage = (survey, options) => {
        const {
            page,
            htmlElement
        } = options

        if (page.name !== 'all') {
            const pg = find(
                surveyPages, p => p.name === page.name
            )

            if (pg) {
                if (!pg.element) {
                    pg.isVisible = page.isVisible
                    pg.element = htmlElement
                }
            }

            else {
                surveyPages.push({
                    name: page.name,
                    isVisible: page.isVisible,
                    element: htmlElement
                })
            }
        }

        const $page = $(htmlElement)
        $page.addClass('SurveyPage')

        if (this.state.isReviewMode) {
            const $nav = $(
                renderToStaticMarkup(
                    <div className='SurveyPage-Nav'/>
                )
            );

            const visiblePages = where(
                surveyPages, { isVisible: true }
            )

            if (visiblePages.length > 1) {
                each(visiblePages, ({ name }) => {
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

        if (isExpandable || isNavigable) {
            let mjPanel = findWhere(majorSurveyPanels, { name })

            if (!mjPanel) {
                mjPanel = {
                    name,
                    isNavigable,
                    isExpandable,
                    isNavDestination,
                    element: htmlElement,
                }

                majorSurveyPanels.push(mjPanel)
            }

            each(minorSurveyPanels, mnp => {
                if (!mnp.navigableParent) {
                    mnp.navigableParent = mjPanel
                }
            })
        }

        if (isExpandable) {
            $panel.addClass('ExpandableSurveyPanel')
        }

        if (isNavDestination) {
            $panel.addClass('NavDestinationSurveyPanel')
        }

        const { isReviewMode } = this.state

        if (isReviewMode) {
            let page = findWhere(surveyPages, { name })

            if (page) {
                page.isVisible = true

                $panel
                    .attr('id', name)
                    .addClass('SurveyPagePanel')

                let $title = $panel.find('.SurveyPagePanel-Title:first')

                if (!$title.length) {
                    $title = $(renderToStaticMarkup(
                        <div className='sv_p_title SurveyPanel-Title SurveyPagePanel-Title'>
                            {name}
                        </div>
                    ))

                    $panel.prepend($title)
                }

                each(majorSurveyPanels, mnp => {
                    if (!mnp.navigableParent) {
                        mnp.navigableParent = page
                    }
                })

                const hasNav = $panel.find('.SurveyPanel-Nav').length > 0

                const navDestinations = filter(majorSurveyPanels, p => p.navigableParent.name === name)

                if (!hasNav && navDestinations.length > 1) {
                    $panel.addClass('NavigableSurveyPanel')

                    const $nav = $(
                        renderToStaticMarkup(
                            <div className='SurveyPanel-Nav'/>
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
                }
            }

            if (isExpandable || isNavigable) {
                $panel.attr('id', name)

                const borderClass = 'SurveyMajorPanel-DecoratedBorder'

                if (!$panel.has(`.${borderClass}`).length) {
                    $panel.prepend(
                        renderToStaticMarkup(
                            <div className={borderClass}/>
                        )
                    )
                }
            }

            if (isExpandable) {
                panel.expand()

                $panel.find('.SurveyPanel-Title:first').on('click', e => {
                    e.stopPropagation()
                });
            }
        }

        else {
            if (isNavigable) {
                const hasNav = $panel.find('.SurveyPanel-Nav').length > 0

                const navDestinations = filter(minorSurveyPanels, p => p.navigableParent.name === name)

                if (!hasNav && navDestinations.length > 0) {
                    $panel.addClass('NavigableSurveyPanel')

                    const $nav = $(
                        renderToStaticMarkup(
                            <div
                                style={{ display: 'none' }}
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

                    const $title = $panel.find('.SurveyPanel-Title:first')

                    $title.after($nav);

                    if (isExpandable) {
                        if ($title.find('.sv_expanded').length > 0) {
                            $nav.show()
                        }

                        const isExpanded = () => {
                            return $title.find('.sv_expanded').length > 0
                        }


                        if (isExpanded()) $nav.show()

                        $title.on('click', () => {
                            setTimeout(() => {
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

                $panel.attr('id', name)

                const borderClass = 'SurveyMinorPanel-DecoratedBorder'

                if (!$panel.has(`.${borderClass}`).length) {
                    $panel.prepend(
                        renderToStaticMarkup(
                            <div className={borderClass}/>
                        )
                    )
                }
            }
        }
    }

    onAfterRenderSurveyQuestion = (survey, options) => {
        const {
            question,
            htmlElement
        } = options

        const name = question.name
        const type = question.getType()

        const $elem = $(htmlElement)

        $elem
            .addClass('SurveyQuestion_type_' + type)
            .closest('.SurveyRow')
            .addClass(type !== 'boolean' ? 'd-flex flex-row' : '')

        if (type === 'boolean') {
            question.visible = false
        }

        if (!question.readOnly && question.calendarFlag) {
            const isDateOnly = (
                question.calendarFlag === 'withoutTime'
            )

            $elem
                .find('input')
                .datetimepicker({
                    useCurrent: false,
                    sideBySide: !isDateOnly,
                    format: `MM/DD/YYYY${isDateOnly ? '' : ' hh:mm A'}`,
                    ...question.disableFuture && { maxDate: Date.now() }
                })
                .on('dp.show', () => {
                    $elem.find('input').val(question.value)
                })
                .on('dp.change', e => {
                    if (e.date) {
                        const date = DU.format(
                            e.date.toDate().getTime(),
                            isDateOnly ? DATE_FORMAT : DATE_TIME_ZONE_FORMAT
                        )

                        this.changeSurveyValue(name, date)

                        question.value = date
                        this.state.surveyModel.setValue(name, date)

                        $elem.find('input').val(date)

                        question.clearErrors()
                    }
                })
                .on('dp.hide', () => {
                    $elem.find('input').val(question.value)

                    if (question.value) {
                        question.clearErrors()
                    }
                })

        }
    }

    onSurveyValueChanged = (survey, options) => {
        this.setState(s => ({
            isChanged: true,
            surveyData: {
                ...s.surveyData,
                [options.name]: options.value
            }
        }))
    }

    onChangeMarkAsInactiveField = (n, v) => {
        this.toggleInactive(v)
        this.onChangeActivity(v)
    }

    onChangeFormField = (name, value) => {
        this.setState({ isChanged: true })
        this.changeFormField(name, value)
    }

    onChangeFormDateField = (name, value) => {
        this.setState({ isChanged: true })
        this.changeFormField(name, value ? value.getTime() : null)
        this.onFormDateFieldChanged(name, value)
    }

    onFormDateFieldChanged = (name, value) => {
        if (name === 'dateCompleted') {
            this.changeFormField("dateAssigned", value ? value.getTime() : null)
        }
    }

    get actions () {
        return this.props.actions
    }

    get clientId () {
        return +this.props.match.params.clientId
    }

    get assessmentId () {
        return this.props.assessmentId
    }

    get authUser () {
        return this.props.auth.login.user.data
    }

    get formData () {
        return this.props.form.fields.toJS()
    }

    changeFormField (name, value) {
        this.actions.form.changeField(
            name, value
        )
    }

    changeFormFields (changes) {
        this.actions.form.changeFields(changes)
    }

    toggleInactive (isInactive) {
        this.setState({ isInactive })
    }

    changeStep (step) {
        majorSurveyPanels = []
        minorSurveyPanels = []

        this.setState({ step })
    }

    loadSurvey () {
        return this.actions.survey.load({
            clientId: this.clientId,
            typeId: this.getAssessmentType().id
        })
    }

    updateSurvey () {
        this.loadSurvey()
            .then(Response(({ data }) => {
                this.setState({
                    surveyModel: new Survey.Model(
                        JSON.parse(data)
                    )
                })
            }))
    }

    loadDetails () {
        return this.actions.details.load(
            this.clientId,
            this.props.assessmentId
        )
    }

    loadScore () {
        this.actions.score.load({
            typeId: this.getAssessmentType().id,
            dataJson: JSON.stringify(this.state.surveyModel.data)
        })
    }

    loadManagement () {
        this.actions.management.load({
            clientId: this.clientId,
            typeId: this.getAssessmentType().id
        })
    }

    changeSurveyValue (name, value) {
        this.setState(s => ({
            surveyData: {
                ...s.surveyData,
                [name]: value
            }
        }))
    }

    emptySurveyModel () {
        return new Survey.Model()
    }

    cloneSurveyModel () {
        const model = new Survey.Model(
            this.props.directory.assessment.survey.value
        )

        model.data = this.state.surveyData

        return model
    }

    save ({
        shouldComplete = false,
        shouldMarkAsInactive = false
    } = {}) {
        const model = this.cloneSurveyModel()
        model.completeLastPage()

        const type = this.getAssessmentType()

        let statusName = null

        if (shouldComplete) statusName = COMPLETED
        else if (shouldMarkAsInactive) statusName = INACTIVE
        else if (type.name === COMPREHENSIVE) statusName = IN_PROCESS
        else statusName = COMPLETED

        return this.actions.form.submit(
            this.clientId,
            {
                statusName,
                ...this.formData,
                id: this.assessmentId,
                dateCompleted: time.now(),
                timeToEdit: time.passedFromSaved(),
                dataJson: JSON.stringify(model.data),
                hasErrors: isNotEmpty(this.getInvalidSurveyPageIndexes())
            }
        )
    }

    validateSurvey () {
        const survey = this.state.surveyModel
        survey.checkErrorsMode = 'onValueChanged';

        const indexes = this.getInvalidSurveyPageIndexes(true)

        const index = first(indexes) || -1

        if (index > 0 && index !== survey.currentPageNo) {
            this.setState({ step: index + 1 })
        }

        this.setState({ invalidSurveyPageIndexes: indexes })

        return defer().then(() => {
            if (index < 0) return true

            this.modalRef.current.scrollToBottom(0)

            return defer().then(() => {
                survey.currentPage.focusFirstErrorQuestion()
                return false
            })
        })
    }

    scrollToFirstSurveyErrorQuestion () {
        this.modalRef
            .current
            .scrollToBottom(0)

        setTimeout(() => {
            this.state
                .surveyModel
                .currentPage
                .focusFirstErrorQuestion()
        }, 0)
    }

    isEditMode () {
        return isNumber(this.assessmentId)
    }

    canRenderSurvey () {
        const {
            surveyData, surveyModel
        } = this.state

        return surveyModel && (
            this.isEditMode() ? surveyData : true
        )
    }

    scroll (offset) {
        this.modalRef.current.scroll({ top: offset })
    }

    enableReviewMode () {
        majorSurveyPanels = []
        minorSurveyPanels = []

        Survey.JsonObject.metaData.addProperty("panel", {
            name: "readOnly:boolean",
            default: true
        })

        each(surveyPages, p => {
            p.isVisible = false
        })

        const surveyReviewModel = this.cloneSurveyModel()

        const questions = surveyReviewModel.getAllQuestions()

        each(questions, (question, i) => {
            question.visible = false

            if (question.isPriority && question.value) {
                questions[i - 1].visible = true
            }
        })

        this.setState({ isReviewMode: true, surveyReviewModel })
    }

    cancelReviewMode () {
        majorSurveyPanels = []
        minorSurveyPanels = []

        Survey.JsonObject.metaData.removeProperty('panel', 'readOnly')

        this.setState({
            isReviewMode: false,
            surveyReviewModel: null
        })
    }

    getInvalidSurveyPageIndexes (shouldRefresh = false) {
        if (shouldRefresh) {
            const indexes = []
            const survey = this.state.surveyModel

            if (survey) each(survey.visiblePages, page => {
                if (page.hasErrors()) indexes.push(page.visibleIndex)
            })

            return indexes
        }

        return this.state.invalidSurveyPageIndexes
    }

    getScore () {
        return (
            this.props
                .directory
                .assessment
                .score
                .value
        )
    }

    getScoringAlert () {
        const mg = (
            this.props
                .directory
                .assessment
                .management
        )

        const score = this.getScore()

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

    isRiskIdentified () {
        const mg = (
            this.props
                .directory
                .assessment
                .management
        )

        const score = this.getScore()

        if (isNumber(score) && mg.data) {
            const item = find(
                mg.data.scale,
                o => score >= o.scoreLow && score <= o.scoreHigh
            )

            return item ? item.isRiskIdentified : true
        }

        return false
    }

    getAssessmentType () {
        let type = null

        const {
            form, directory
        } = this.props

        const id = form.fields.typeId

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

    getTitle () {
        const { step, isReviewMode } = this.state

        if (isReviewMode) return 'Priority Questions Review'

        if (step > 0) {
            const type = this.getAssessmentType() || {}

            return (type.name !== COMPREHENSIVE && step === 2) ? `${type && type.shortTitle} Scoring`
                : `${this.isEditMode() ? 'Edit' : 'Add'} ${type && type.shortTitle}`
        }

        return 'Select Assessment Type'
    }

    render () {
        const {
            step,
            isInactive,

            surveyData,
            surveyModel,
            surveyReviewModel,

            scrollOffset,
            isReviewMode
        } = this.state

        const {
            isOpen,
            form,
            details,
            directory: {
                assessment: {
                    score,
                    survey,
                    management
                }
            }
        } = this.props

        const { dateCompleted } = form.fields

        const type = this.getAssessmentType()
        const typeName = type ? type.name : null

        const scoringAlert = this.getScoringAlert()

        const hasTabs = typeName === COMPREHENSIVE && !isReviewMode

        return (
            <Modal
                hasCloseBtn
                isOpen={isOpen}
                ref={this.modalRef}
                onClose={this.onClose}
                scrollOffset={scrollOffset}
                className={cn('AssessmentEditor', { AssessmentEditor_mode_review: isReviewMode })}
                title={this.getTitle()}
                headerClassName='AssessmentEditor-Header'
                footerClassName='AssessmentEditor-Footer'
                renderHeader={title => (
                    <div className='d-flex justify-content-between align-items-center'>
                        <div>{title}</div>
                        {!isReviewMode && typeName === COMPREHENSIVE && step > 0 && (
                            <div
                                onClick={this.onValidateAndSave}
                                className='btn AssessmentEditor-ValidateAndSaveBtn'>
                                <Diskette className='AssessmentEditor-ValidateAndSaveIcon'/>
                            </div>
                        )}
                    </div>
                )}
                renderFooter={() => type && (
                    typeName === COMPREHENSIVE ? (
                        <>
                            {step === 0 && (
                                <>
                                    <Button
                                        outline
                                        color='success'
                                        onClick={this.onClose}>
                                        Close
                                    </Button>
                                    <Button
                                        color='success'
                                        onClick={this.onNext}>
                                        Next
                                    </Button>
                                </>
                            )}
                            {step > 0 && (
                                <Row className='flex-1'>
                                    <Col md={6}>
                                        {step > 1 && (
                                            <Button
                                                color='link'
                                                className='AssessmentEditor-BackBtn'
                                                onClick={this.onBack}>
                                                Back
                                            </Button>
                                        )}
                                        {isReviewMode && step === 1 && (
                                            <Button
                                                color='link'
                                                className='AssessmentEditor-BackBtn'
                                                onClick={this.onCancelReview}>
                                                Back
                                            </Button>
                                        )}
                                        {!isReviewMode && step < COMPREHENSIVE_TABS.length && (
                                            <Button
                                                color='link'
                                                className='AssessmentEditor-NextBtn'
                                                onClick={this.onNext}>
                                                Next
                                            </Button>
                                        )}
                                    </Col>
                                    <Col md={6} className='text-right'>
                                        {isReviewMode ? (
                                            <>
                                                {!isInactive && (
                                                    <Button
                                                        color='success'
                                                        onClick={this.onComplete}>
                                                        Complete
                                                    </Button>
                                                )}
                                            </>
                                        ) : (
                                            <>
                                                <CheckboxField
                                                    name='markAsInactive'
                                                    value={isInactive}
                                                    className='AssessmentForm-MarkAsInactiveField'
                                                    label='Mark as Inactive'
                                                    isDisabled={form.isFetching}
                                                    onChange={this.onChangeMarkAsInactiveField}
                                                />
                                                <Button
                                                    outline
                                                    color='success'
                                                    disabled={form.isFetching}
                                                    onClick={this.onSaveAndClose}>
                                                    Save & Close
                                                </Button>
                                                {/*<Button
                                                    color='success'
                                                    disabled={form.isFetching}
                                                    onClick={this.onReview}>
                                                    Review
                                                </Button>*/}
                                                <Button
                                                    color='success'
                                                    onClick={this.onComplete}>
                                                    Complete
                                                </Button>
                                            </>
                                        )}
                                    </Col>
                                </Row>
                            )}
                        </>
                    ) : (
                        <>
                            {step === 0 && (
                                <Button
                                    outline
                                    color='success'
                                    onClick={this.onClose}>
                                    Close
                                </Button>
                            )}
                            {step === 1 && (
                                <Button
                                    outline
                                    color='success'
                                    onClick={this.onClose}>
                                    Cancel
                                </Button>
                            )}
                            {step > 1 && (
                                <Button
                                    outline
                                    color='success'
                                    disabled={form.isFetching}
                                    onClick={this.onBack}>
                                    Back
                                </Button>
                            )}
                            {step < 2 && (
                                <Button
                                    color='success'
                                    onClick={this.onNext}>
                                    Next
                                </Button>
                            )}
                            {step === 2 && (
                                <Button
                                    color='success'
                                    disabled={form.isFetching}
                                    onClick={this.onSave}>
                                    Submit
                                </Button>
                            )}
                        </>
                    )
                )}>
                {step > 0 && (
                    <div className='AssessmentForm'>
                        {surveyModel && hasTabs ? (
                            <div className='AssessmentForm-TabsWrapper'>
                                <Tabs
                                    className='AssessmentForm-Tabs'
                                    items={map(COMPREHENSIVE_TABS, (title, i) => {
                                        const isActive = i === (step - 1)
                                        const hasIndicator = this.getInvalidSurveyPageIndexes().includes(i)

                                        return {
                                            title,
                                            isActive,
                                            hasIndicator,
                                            indicatorIconClassName: 'AssessmentForm-TabIndicatorIcon',
                                            className: (isActive && hasIndicator) ? 'ErrorIndicator' : ''
                                        }
                                    })}
                                    onChange={this.onChangeTab}
                                />
                            </div>
                        ) : null}
                        {(survey.isFetching || details.isFetching || form.isFetching) ? (
                            <div className='AssessmentForm-Loading'>
                                <Loader/>
                            </div>
                        ) : type && !(step === 2 && typeName !== COMPREHENSIVE) && this.canRenderSurvey() && (
                            <div>
                                {typeName !== COMPREHENSIVE && (
                                    <div className="margin-top-20 padding-left-40 padding-right-40">
                                        <Row form>
                                            <Col md={6}>
                                                <DateField
                                                    hasTimeSelect
                                                    label="Date Completed*"
                                                    name="dateCompleted"
                                                    className="AssessmentForm-Field"
                                                    value={dateCompleted}
                                                    maxDate={Date.now()}
                                                    maxTime={DU.lt(dateCompleted, Date.now(), 'day') ? (
                                                        DU.endOf(Date.now(), 'day')
                                                    ) : Date.now()}
                                                    timeFormat="hh:mm aa"
                                                    dateFormat="MM/dd/yyyy hh:mm a"
                                                    onChange={this.onChangeFormDateField}
                                                />
                                            </Col>
                                            <Col md={6}>
                                                <TextField
                                                    isDisabled
                                                    type="text"
                                                    label="Completed By*"
                                                    className="AssessmentForm-Field"
                                                    value={this.isEditMode() ? (
                                                        details.data.contactName
                                                    ) : this.authUser.fullName}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                )}
                                {isReviewMode ? (
                                    <Survey.Survey
                                        key="review"
                                        isSinglePage
                                        css={{
                                            ...SURVEY_CSS,
                                            page: {
                                                root: cn(
                                                    SURVEY_CSS.page.root,
                                                    `Page_type_${typeName.toUpperCase()}`
                                                )
                                            }
                                        }}
                                        data={surveyData}
                                        model={surveyReviewModel}
                                        onValueChanged={this.onSurveyValueChanged}
                                        onAfterRenderSurvey={this.onAfterRenderSurvey}
                                        onAfterRenderPage={this.onAfterRenderSurveyPage}
                                        onAfterRenderPanel={this.onAfterRenderSurveyPanel}
                                        onAfterRenderQuestion={this.onAfterRenderSurveyQuestion}
                                    />
                                ) : (
                                    <Survey.Survey
                                        key="edit"
                                        currentPageNo={step - 1}
                                        css={{
                                            ...SURVEY_CSS,
                                            page: {
                                                root: cn(
                                                    SURVEY_CSS.page.root,
                                                    `Page_type_${typeName.toUpperCase()}`
                                                )
                                            }
                                        }}
                                        data={surveyData}
                                        model={surveyModel}
                                        onValueChanged={this.onSurveyValueChanged}
                                        onAfterRenderSurvey={this.onAfterRenderSurvey}
                                        onAfterRenderPage={this.onAfterRenderSurveyPage}
                                        onAfterRenderPanel={this.onAfterRenderSurveyPanel}
                                        onAfterRenderQuestion={this.onAfterRenderSurveyQuestion}
                                    />
                                )}
                                {typeName !== COMPREHENSIVE && (
                                    <div className="padding-left-40 padding-right-40">
                                        <TextField
                                            type="textarea"
                                            label="Comment"
                                            name="comment"
                                            value={form.fields.comment}
                                            className="AssessmentForm-Field AssessmentForm-CommentField"
                                            onChange={this.onChangeFormField}
                                        />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                {step === 2 && type && typeName !== COMPREHENSIVE && (
                    <div className='AssessmentScoring'>
                        {form.isFetching && <Loader hasBackdrop/>}
                        {management.isFetching ? (
                            <div className='AssessmentScoring-Loading'>
                                <Loader/>
                            </div>
                        ) : (
                            <>
                                <div className='AssessmentEditor-Section'>
                                    <div className='AssessmentEditor-SectionTitle'>
                                        {type.shortTitle} Scoring
                                    </div>
                                    {scoringAlert && (
                                        <Alert
                                            className='ScoringAlert'
                                            type={scoringAlert.type}
                                            title={isNumber(score.value) ? `${score.value} Points` : ''}
                                            text={scoringAlert.text}
                                        />
                                    )}
                                </div>
                                {management.data && (
                                    <div className='AssessmentEditor-Section AssessmentEditor-ManagementSection'>
                                        <div className='AssessmentEditor-SectionTitle'>Management</div>
                                        <div className='AssessmentEditor-SectionText'>
                                            {management.data.message}
                                        </div>
                                        <Table
                                            className={`${typeName}Scale`}
                                            containerClass={`${typeName}ScaleContainer`}
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
                                                    text: `${typeName === GAD7 ? 'Symptom' : 'Depression'} Severity`,
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
                                {/*{[GAD7, PHQ9].includes(typeName) && this.isRiskIdentified() && (
                                    <div className='AssessmentEditor-Warning'>
                                        By clicking “Submit” button, the system will generate “Assessment risk
                                        identified” event. The alerts will be sent to care team memebers
                                    </div>
                                )}*/}
                            </>
                        )}
                    </div>
                )}
                {step === 0 && (
                    <AssessmentTypeForm/>
                )}
            </Modal>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AssessmentEditor)
)