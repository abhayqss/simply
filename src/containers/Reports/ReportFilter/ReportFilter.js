import React, { Component } from 'react'

import {
    map,
    where,
    isEqual
} from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Row, Col, Button } from 'reactstrap'

import DateField from 'components/Form/DateField/DateField'
import SelectField from 'components/Form/SelectField/SelectField'

import './ReportFilter.scss'

import * as reportListActions from 'redux/report/list/reportListActions'
import * as reportDocumentActions from 'redux/report/document/reportDocumentActions'

import * as communityListActions from 'redux/directory/community/list/communityListActions'
import * as reportTypeListActions from 'redux/directory/report/type/list/reportTypeListActions'
import * as organizationListActions from 'redux/directory/organization/list/organizationListActions'

import { Response } from 'lib/utils/AjaxUtils'

import {
    isNotEmpty,
    DateUtils as DU
} from 'lib/utils/Utils'

function mapStateToProps (state) {
    const {
        auth,
        report,
        directory
    } = state

    return {
        fields: report.list.dataSource.filter,

        auth,
        report,
        directory
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(reportListActions, dispatch),
            document: bindActionCreators(reportDocumentActions, dispatch),
            types: bindActionCreators(reportTypeListActions, dispatch),
            communities: bindActionCreators(communityListActions, dispatch),
            organizations: bindActionCreators(organizationListActions, dispatch)
        }
    }
}

class ReportFilter extends Component {

    componentDidMount () {
        this.actions.types.load()
        this.actions.organizations.load()

        const user = this.authUser

        if (user) {
            const { fields } = this.props

            const organizationId = (
                fields.organizationId
                || user.organizationId
            )

            this.updateCommunities(organizationId)

            this.isClear() && this.change({
                organizationId,
                fromDate: DU.startOf(
                    new Date(), 'month'
                ).getTime(),
                toDate: Date.now()
            })
        }
    }

    componentDidUpdate (prevProps) {
        const user = this.authUser

        if (user && !prevProps.auth.login.user.data) {
            const { fields } = this.props

            const organizationId = (
                fields.organizationId
                || user.organizationId
            )

            if (this.isClear()) {
                this.change({
                    organizationId,
                    fromDate: DU.startOf(
                        new Date(), 'month'
                    ).getTime(),
                    toDate: Date.now()
                })
            }

            this.updateCommunities(organizationId)
        }
    }

    onClear = () => {
        this.clear()
    }

    onExport = () => {
        this.export()
    }

    onChangeField = (name, value) => {
        this.changeField(name, value)
        this.onFieldChanged(name, value)
    }

    onChangeDateField = (name, value) => {
        this.changeField(name, value ? (
            name === 'fromDate' ? (
                DU.startOf(value, 'day').getTime()
            ) : DU.endOf(value, 'day').getTime()
        ) : null)
    }

    onFieldChanged = (name, value) => {
        if (name === 'organizationId') {
            this.updateCommunities(value)
        }

        if (name === 'reportType') {
            if (['HUD', 'HUD_MFSC'].includes(value)) {
                const now = new Date()

                const october1 = DU.startOf(
                    DU.add(
                        DU.month(now, 9), -1, 'year'
                    ),'month'
                )

                const september30 = DU.month(
                    DU.endOf(DU.date(now, 30), 'day'), 8
                )

                this.change({
                    fromDate: october1.getTime(),
                    toDate: DU.gt(now, september30) ? september30 : now
                })
            }

            else this.change({
                fromDate: DU.startOf(
                    new Date(), 'month'
                ).getTime(),
                toDate: Date.now()
            })
        }
    }

    get actions () {
        return this.props.actions
    }

    get authUser () {
        return this.props.auth.login.user.data
    }

    isClear () {
        const {
            fields
        } = this.props

        return isEqual(
            fields.toJS(),
            fields.clear().toJS()
        )
    }

    updateCommunities (organizationId) {
        this.actions.communities
            .load({ organizationId })
            .then(Response(({ data }) => {
                this.changeField(
                    'communityIds',
                    map(where(data, {
                        canViewOrHasAccessibleClient: true
                    }), o => o.id)
                )
            }))
    }

    change (changes, shouldReload) {
        this.actions.changeFilter(
            changes, shouldReload
        )
    }

    changeField (name, value, shouldReload) {
        this.actions.changeFilterField(
            name, value, shouldReload
        )
    }

    clear () {
        const {
            organizationId
        } = this.authUser

        this.change({
            organizationId,
            reportType: null,
            fromDate: DU.startOf(
                new Date, 'month'
            ).getTime(),
            toDate: Date.now()
        })

        this.updateCommunities(organizationId)
    }

    export () {
        this.actions.document.download(
            this.props.fields.toJS()
        )
    }

    render () {
        const {
            fields: {
                organizationId,
                communityIds,
                reportType,
                fromDate,
                toDate
            },
            report: {
                document: doc
            },
            directory: {
                report,
                community,
                organization
            }
        } = this.props

        const canExport = organizationId && isNotEmpty(communityIds) && reportType

        return (
            <div className="ReportFilter">
                <Row>
                    <Col md={4}>
                        <SelectField
                            type="text"
                            name="organizationId"
                            isDisabled={doc.isFetching}
                            options={map(
                                organization.list.dataSource.data,
                                ({ id, label }) => ({
                                    text: label, value: id
                                })
                            )}
                            value={organizationId}
                            label="Organization"
                            defaultText="Organization"
                            onChange={this.onChangeField}
                        />
                    </Col>
                    <Col md={4}>
                        <SelectField
                            isMultiple
                            value={communityIds}
                            label="Community"
                            name="communityIds"
                            defaultText="Community"
                            isDisabled={doc.isFetching}
                            className="ReportFilter-Field"
                            options={map(
                                where(
                                    community.list.dataSource.data,
                                    { canViewOrHasAccessibleClient: true }
                                ),
                                ({ id, name }) => ({
                                    text: name, value: id
                                })
                            )}
                            onChange={this.onChangeField}
                        />
                    </Col>
                    <Col md={4}>
                        <SelectField
                            value={reportType}
                            label="Report"
                            name="reportType"
                            defaultText="Report"
                            isDisabled={doc.isFetching}
                            className="ReportFilter-Field"
                            options={map(report.type.list.dataSource.data, ({ name, title }) => ({
                                text: title, value: name
                            }))}
                            onChange={this.onChangeField}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col md={2}>
                        <DateField
                            type="text"
                            name="fromDate"
                            value={fromDate}
                            label="Date From"
                            maxDate={toDate}
                            isDisabled={doc.isFetching}
                            className="ReportFilter-Field"
                            onChange={this.onChangeDateField}
                        />
                    </Col>
                    <Col md={2}>
                        <DateField
                            type="text"
                            name="toDate"
                            value={toDate}
                            label="Date To"
                            minDate={fromDate}
                            isDisabled={doc.isFetching}
                            className="ReportFilter-Field"
                            onChange={this.onChangeDateField}
                        />
                    </Col>
                    <Col md={8}>
                        <Button
                            outline
                            color="success"
                            disabled={doc.isFetching}
                            className="margin-right-16"
                            onClick={this.onClear}>
                            Clear
                        </Button>
                        <Button
                            color="success"
                            disabled={!canExport || doc.isFetching}
                            onClick={this.onExport}>
                            Export
                        </Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportFilter)