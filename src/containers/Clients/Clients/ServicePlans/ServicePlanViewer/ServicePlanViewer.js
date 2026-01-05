import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import PropTypes from 'prop-types'
import {Button, Col, Row} from 'reactstrap'
import {map, findWhere, values, isNumber, groupBy} from 'underscore'

import './ServicePlanViewer.scss'

import Tabs from 'components/Tabs/Tabs'
import Table from 'components/Table/Table'
import Modal from 'components/Modal/Modal'
import Loader from 'components/Loader/Loader'
import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'
import RangeSlider from 'components/RangeSlider/RangeSlider'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import ScoringSection from './../ServicePlanForm/ScoringSection/ScoringSection'

import * as servicePlanHistoryActions from 'redux/client/servicePlan/history/servicePlanHistoryActions'
import * as servicePlanDetailsActions from 'redux/client/servicePlan/details/servicePlanDetailsActions'

import * as domainListActions from 'redux/directory/servicePlan/need/domain/list/domainListActions'
import * as priorityListActions from 'redux/directory/servicePlan/need/priority/list/priorityListActions'

import {PAGINATION} from 'lib/Constants'
import {isEmpty, DateUtils} from 'lib/utils/Utils'

const COLORS = {
    1: '#53b865',
    2: '#ffd529',
    3: '#f36c32'
}

const RELEVANT_ACTIVATION_OR_EDUCATION_TASK = "RELEVANT_ACTIVATION_OR_EDUCATION_TASK"

const {format, formats} = DateUtils

const {FIRST_PAGE} = PAGINATION

const DATE_FORMAT = formats.americanMediumDate
const DATE_TIME_FORMAT = formats.longDateMediumTime12

function mapStateToProps(state) {
    const { details, history } = state.client.servicePlan
    return {
        details,
        history,
        directory: state.directory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            details: {
                ...bindActionCreators(servicePlanDetailsActions, dispatch),
            },
            history: {
                ...bindActionCreators(servicePlanHistoryActions, dispatch),
            },
            need: {
                domain: {list: bindActionCreators(domainListActions, dispatch)},
                priority: {list: bindActionCreators(priorityListActions, dispatch)}
            },
        }
    }
}

class ServicePlanViewer extends Component {

    static propTypes = {
        isOpen: PropTypes.bool,
        clientId: PropTypes.number,
        servicePlanId: PropTypes.number,
        onClose: PropTypes.func,
        onViewDetails: PropTypes.func,
        isServicePlanArchived: PropTypes.bool
    }

    static defaultProps = {
        onClose: function () {},
        onViewDetails: function () {},
        isServicePlanArchived: false
    }

    state = {
        tab: 0,
        value: 0
    }

    componentDidMount() {
        const { isServicePlanArchived } = this.props

        this.loadDomainList()
        this.loadPriorityList()

        this.refresh()

        if (!isServicePlanArchived) {
            this.refreshHistory()
        }
    }

    componentDidUpdate(prevProps) {
        const { servicePlanId, isServicePlanArchived } = this.props

        if (!isServicePlanArchived && prevProps.servicePlanId !== servicePlanId) {
            this.refresh()
        }
    }

    onChangeTab = tab => {
        this.setState({ tab })
    }

    onClose = () => {
        this.props.onClose()
    }


    onViewDetails = servicePlan => {
        this.props.onViewDetails(servicePlan)
    }

    isLoading() {
        const { details, directory } = this.props
        const { isFetching, shouldReload } = details
        const {
            domain
        } = directory.servicePlan.need

        return isFetching || shouldReload || isEmpty(domain.list.dataSource.data)
    }

    refresh() {
        this.update(true)
    }

    refreshHistory = page => {
        this.updateHistory(true, page || FIRST_PAGE)
    }

    update(isReload) {
        const { actions, clientId, servicePlanId } = this.props

        if (isReload)
            actions.details.load(servicePlanId, clientId)
    }

    updateHistory(isReload, page) {
        const { history, servicePlanId, clientId } = this.props
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = history

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.history.load({
                size,
                page: page || p,
                clientId,
                servicePlanId,
            })
        }
    }

    loadDomainList() {
        this
            .props
            .actions
            .need
            .domain
            .list
            .load()
    }

    loadPriorityList() {
        this
            .props
            .actions
            .need
            .priority
            .list
            .load()
    }

    render() {
        const { tab } = this.state
        const {
            isOpen,
            details,
            history,
            directory,
            isServicePlanArchived
        } = this.props

        let content = null

        if (this.isLoading()) {
            content = <Loader />
        }

        else if (isEmpty(details.data)) {
            content = <h4>No Data</h4>
        }
        else {
            const {
                /* Summary */
                createdBy,
                isCompleted,
                dateCreated,
                dateCompleted,

                /* Need / Opportunities */
                needs
            } = details.data

            const {
                domain
            } = directory.servicePlan.need

            const domains = map(domain.list.dataSource.data, ({id, name, title}) => ({
                name, text: title, value: id
            }))

            let groupedNeeds = []

            if (tab === 0) {
                groupedNeeds = values(
                    groupBy(needs, (need, index) =>{
                        return need.domainName
                    })
                )
            }

            content = (
                <>
                    {(tab === 0) && (
                        <div id="formSection" className="ServicePlanViewer-Section">
                            <div id="summary" className="ServicePlanViewer-SectionTitle">
                                Summary
                            </div>
                            <Row>
                                <Col md={6}>
                                    <DateField
                                        value={dateCreated}
                                        isDisabled={true}
                                        label="Date Created*"
                                        className="ServicePlanViewer-TextField"
                                        hasTimeSelect={true}
                                    />
                                </Col>
                                <Col md={6}>
                                    <TextField
                                        type="text"
                                        value={createdBy}
                                        isDisabled={true}
                                        label="Created by*"
                                        className="ServicePlanViewer-TextField"
                                    />
                                </Col>
                            </Row>
                            <Row>
                                {dateCompleted && (
                                    <Col md={6}>
                                        <DateField
                                            value={dateCompleted}
                                            isDisabled={true}
                                            label="Date Completed*"
                                            className="ServicePlanViewer-TextField"
                                            hasTimeSelect={true}
                                        />
                                    </Col>
                                )}
                                <Col md={6}>
                                    <CheckboxField
                                        isDisabled
                                        value={isCompleted}
                                        label="Mark service plan as completed"
                                        className="ServicePlanForm-CheckboxField"
                                    />
                                </Col>
                            </Row>
                            <div id="formSection" >
                                {groupedNeeds.map(o => {
                                    const domain = findWhere(domains, {text: o[0].domainName})
                                    let content = null

                                    if (domain && domain.name === RELEVANT_ACTIVATION_OR_EDUCATION_TASK) {
                                        content = (
                                            <>
                                                <div className="ServicePlanViewer-SectionTitle">
                                                    Activation or Education Task
                                                </div>
                                                <Table
                                                    keyField="id"
                                                    className="ServicePlanViewer-Scoring__ActivationTable"
                                                    data={map(o, ob => ob)}
                                                    columns={[
                                                        {
                                                            dataField: 'id',
                                                            text: '',
                                                            headerStyle: {
                                                                width: '32px',
                                                            },
                                                            style: (cell, row, rowIndex) => ({
                                                                backgroundColor: COLORS[row.priorityId], fontWeight: 600
                                                            }),
                                                            formatter: (v, row, rowIndex) => rowIndex + 1
                                                        },
                                                        {
                                                            dataField: 'activationOrEducationTask',
                                                            text: 'Activation or Education Task',
                                                            headerStyle: {
                                                                width: '685px',
                                                                verticalAlign: 'top'
                                                            },
                                                        },
                                                        {
                                                            dataField: 'targetCompletionDate',
                                                            text: 'Target Completion Date',
                                                            headerStyle: {
                                                                width: '107px',
                                                                verticalAlign: 'top'
                                                            },
                                                            formatter: v => format(v, DATE_FORMAT)
                                                        },
                                                        {
                                                            dataField: 'completionDate',
                                                            text: 'Completion Date',
                                                            headerStyle: {
                                                                width: '107px',
                                                                verticalAlign: 'top'
                                                            },
                                                            formatter: v => format(v, DATE_FORMAT)
                                                        },
                                                    ]}
                                                />
                                            </>
                                        )
                                    }

                                    else {
                                        content = (
                                            <>
                                                <div className="ServicePlanViewer-SectionHeader">
                                                    <div className="ServicePlanViewer-SectionTitle">
                                                        {domain && domain.text}
                                                    </div>
                                                    <RangeSlider
                                                        min={0}
                                                        max={5}
                                                        step={1}
                                                        value={o[0].needScore}
                                                        isDisabled={true}
                                                        className="ServicePlanViewer-RangeSlider"
                                                    />
                                                </div>
                                                {o.map((ob, key) => (
                                                    <ScoringSection
                                                        key={key}
                                                        isInViewMode
                                                        index={key + 1}
                                                        fields={ob}
                                                        style={{borderColor: COLORS[ob.priorityId]}}
                                                    />
                                                ))}
                                            </>
                                        )
                                    }

                                    return (
                                        <>
                                            {content}
                                        </>
                                    )
                                })
                                }
                            </div>
                        </div>
                    )}
                    {(tab === 1) && (
                        <Table
                            hasPagination
                            keyField='id'
                            title='Change History'
                            isLoading={history.isFetching}
                            className='ServicePlanChangeHistory'
                            containerClass='ServicePlanChangeHistoryContainer'
                            data={history.dataSource.data}
                            pagination={history.dataSource.pagination}
                            columns={[
                                {
                                    dataField: 'dateModified',
                                    text: 'Date',
                                    align: 'right',
                                    headerAlign: 'right',
                                    headerStyle: {
                                        width: '200px',
                                    },
                                    formatter: v => format(v, DATE_TIME_FORMAT)

                                },
                                {
                                    dataField: 'status',
                                    text: 'Status',
                                    align: 'left',
                                    headerStyle: {
                                        width: '100px'
                                    }
                                },
                                {
                                    dataField: 'author',
                                    text: 'Author',
                                    headerStyle: {
                                        width: '200px',
                                    },
                                    formatter: (v, row) => `${row.author}, ${row.authorRole}`
                                },
                                {
                                    dataField: 'isArchived',
                                    text: 'Updates',
                                    headerStyle: {
                                        width: '170px',
                                        textAlign: 'left'
                                    },
                                    formatter: (v, row) => v ? (
                                            <Button
                                                color='link'
                                                className="ServicePlanChangeHistory-ViewDetailsBtn"
                                                onClick={() => this.onViewDetails(row)}>
                                                View Details
                                            </Button>
                                        ) : null
                                }
                            ]}
                            renderCaption={title => {
                                return (
                                    <div className='ServicePlanChangeHistory-Caption'>
                                        <div className='ServicePlanChangeHistory-Title'>
                                            {title}
                                        </div>
                                    </div>
                                )
                            }}
                            onRefresh={this.refreshHistory}
                        />
                    )}
                </>
            )
        }

        return (
            <Modal
                isOpen={isOpen}
                onClose={this.onClose}
                className="ServicePlanViewer"
                title={`View Service Plan`}
                renderFooter={() => (
                    <Button outline color='success' onClick={this.onClose}>
                        Close
                    </Button>
                )}>
                {!isServicePlanArchived && (
                    <Tabs
                        className='ServicePlanViewer-Tabs'
                        items={[
                            {title: 'Details', isActive: tab === 0},
                            {title: 'Change History', isActive: tab === 1},
                        ]}
                        onChange={this.onChangeTab}
                    />
                )}
                {content}
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePlanViewer)