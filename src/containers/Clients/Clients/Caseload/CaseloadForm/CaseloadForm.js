import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import cn from 'classnames'
import {pluck} from 'underscore'
import PropTypes from 'prop-types'
import {Form, Col, Row, Badge, Card, Button} from 'reactstrap'

import * as caseloadFormActions from 'redux/client/caseload/form/caseloadFormActions'

import Table from 'components/Table/Table'
import Actions from 'components/Table/Actions/Actions'
import TextField from 'components/Form/TextField/TextField'
import SearchField from 'components/SearchField/SearchField'
import SelectField from 'components/Form/SelectField/SelectField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import {DateUtils} from 'lib/utils/Utils'

import './CaseloadForm.scss'

const {format, formats} = DateUtils

const ICON_SIZE = 36

const DATE_FORMAT = formats.americanMediumDate

function mapStateToProps (state) {
    return {
        forms: state.client.caseload.form,

        client: {
            list: state.client.list,
            count: state.client.count
        },
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(caseloadFormActions, dispatch),
        }
    }
}

class CaseloadForm extends Component {
    static propTypes = {
        caseloadId: PropTypes.number,
    }

    state = {
        selected: []
    }

    onDeleteClient = (row) => {
        const {actions} = this.props
        let updated = []

        if(!this.hasCaseloadId()) {
            updated = this.state.selected.filter(x => x.id !== row.id)

            actions.updateClientList(this.getCaseloadId(), updated)

            this.setState({selected: updated})
        }

        else {
            const { dataSource: ds } = this.props.forms.get(this.getCaseloadId()).list

            updated = ds.data.filter(x => x.id !== row.id)

            actions.updateClientList(this.getCaseloadId(), updated)

            this.setState({selected: updated})
        }
    }

    onSelection = (row, isSelect) => {
        if (isSelect) {
            this.setState(s => ({selected: [...s.selected, row]}))
        }

        else {
            this.setState(s => ({selected: s.selected.filter(x => x !== row)}))
        }
    }

    onCancel = () => {
        this.onChangeFilterField('name', '')
    }

    onSelect = () => {
        const {actions} = this.props
        const {selected} = this.state

        this.onChangeFilterField('name', '')

        actions.updateClientList(this.getCaseloadId(), selected)
    }

    onChangeField = (field, value) => {
        const {actions} = this.props

        actions.changeCaseloadField(this.getCaseloadId(), field, value).then(() => {
            if (!this.props.forms.get(this.getCaseloadId()).isValid) this.validate()
        })
    }

    onChangeFilterField = (name, value) => {
        this.changeFilter(this.getCaseloadId(), {[name]: value})
    }

    hasListData (data) {
        return data.length !== 0
    }

    hasCaseloadId () {
        const {caseloadId} = this.props

        return caseloadId !== null
    }

    getCaseloadId () {
        const {caseloadId, forms} = this.props

        return caseloadId === null ? forms.size - 1 : caseloadId
    }

    changeFilter (index, changes, shouldReload) {
        this
            .props
            .actions
            .changeFilter(index, changes, shouldReload)
    }

    validate () {
        const data = this.props.forms.get(this.getCaseloadId()).fields.toJS()
        return this.props.actions.validate(data)
    }

    render () {
        const { selected } = this.state

        const {
            forms,
            client,
            className
        } = this.props

        let content = null
        const {
            count: clientListCount,
            list: {
                isFetching: clientListIsFetching, dataSource: clientDS
            }
        } = client

        if (forms && forms.size) {
            if (!this.hasCaseloadId()) {
               const form = forms.get(forms.size - 1)
                const {
                    organization,
                    organizationHasError,
                    organizationErrorText,

                    community,
                    communityHasError,
                    communityErrorText,

                    caseloadName,
                    caseloadNameHasError,
                    caseloadNameErrorText,

                    active,
                    activeHasError,
                    activeErrorText,

                    description,
                    descriptionHasError,
                    descriptionErrorText,

                    serviceCoordinator,
                    serviceCoordinatorHasError,
                    serviceCoordinatorErrorText,

                    backupPerson,
                    backupPersonHasError,
                    backupPersonErrorText,

                } = form.fields

                const {isFetching, dataSource : ds} =  form.list

                content = (
                    <>
                        <div className='CaseloadForm-Section'>
                            <div className='CaseloadForm-SectionTitle'>
                                General Data
                            </div>
                            <Row>
                                <Col md={6}>
                                    <SelectField
                                        type='text'
                                        name='organization'
                                        value={organization}
                                        label='Organization*'
                                        defaultText='Health Star'
                                        hasError={organizationHasError}
                                        errorText={organizationErrorText}
                                        className='CaseloadForm-SelectField'
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <SelectField
                                        type='text'
                                        name='community'
                                        value={community}
                                        label='Community*'
                                        defaultText='Health Star Community'
                                        hasError={communityHasError}
                                        errorText={communityErrorText}
                                        className='CaseloadForm-SelectField'
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={9}>
                                    <TextField
                                        type='text'
                                        name='caseloadName'
                                        value={caseloadName}
                                        label='Caseload Name*'
                                        className='CaseloadForm-TextField'
                                        hasError={caseloadNameHasError}
                                        errorText={caseloadNameErrorText}
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                                <Col md={3}>
                                    <CheckboxField
                                        name='active'
                                        label='Active'
                                        value={active}
                                        hasError={activeHasError}
                                        errorText={activeErrorText}
                                        className='CaseloadForm-CheckboxField'
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <TextField
                                        type='textarea'
                                        name='description'
                                        value={description}
                                        label='Description'
                                        className='CaseloadForm-TextArea'
                                        hasError={descriptionHasError}
                                        errorText={descriptionErrorText}
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <SelectField
                                        type='text'
                                        name='serviceCoordinator'
                                        value={serviceCoordinator}
                                        label='Service Coordinator*'
                                        defaultText='Alice Milton'
                                        hasError={serviceCoordinatorHasError}
                                        errorText={serviceCoordinatorErrorText}
                                        className='CaseloadForm-SelectField'
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <SelectField
                                        type='text'
                                        name='backupPerson'
                                        value={backupPerson}
                                        label='Backup Person'
                                        defaultText='Kaison Lowry'
                                        hasError={backupPersonHasError}
                                        errorText={backupPersonErrorText}
                                        className='CaseloadForm-SelectField'
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className='CaseloadForm-Section'>
                            <div className='CaseloadForm-SectionTitle'>
                                Clients
                                <Badge color="warning" className="CaseloadForm-CaseloadCount">
                                    {clientListCount.value}
                                </Badge>
                            </div>
                            <Row>
                                <Col md={12}>
                                    <SearchField
                                        type='text'
                                        name='name'
                                        value={ds.filter.name}
                                        label='Client*'
                                        placeholder='Search by name or 4 last digits of SSN'
                                        className='CaseloadForm-TextField'
                                        onChange={this.onChangeFilterField}
                                    />
                                </Col>
                            </Row>
                            {ds.filter.name && (
                                <Card className="ClientPicker">
                                    <Table
                                        hasHover
                                        hasPagination
                                        keyField="id"
                                        isLoading={clientListIsFetching}
                                        className="PickableClientList"
                                        containerClass="PickableClientListContainer"
                                        data={clientDS.data}
                                        pagination={clientDS.pagination}
                                        selectedRows={{
                                            mode: 'checkbox',
                                            clickToSelect: true,
                                            hideSelectAll: true,
                                            selected: pluck(selected, 'id'),
                                            onSelect: this.onSelection,
                                            style: { backgroundColor: '#edf4f5' },
                                            selectionRenderer: ({ mode, checked }) => (
                                                <CheckboxField
                                                    value={checked}
                                                    className="PickableClientList-Checkbox"
                                                />
                                            )
                                        }}
                                        columns={[
                                            {
                                                dataField: 'displayName',
                                                text: 'Name',
                                                headerStyle: {
                                                    width: '160px',
                                                },
                                            },
                                            {
                                                dataField: 'ssn',
                                                text: 'SSN',
                                                headerAlign:'right',
                                                align:'right',
                                                headerStyle: {
                                                    width: '93px',
                                                },
                                            },
                                            {
                                                dataField: 'gender',
                                                text: 'Gender',
                                                headerStyle: {
                                                    width: '116px',
                                                },
                                            },
                                            {
                                                dataField: 'birthDate',
                                                text: 'Date Of Birth',
                                                headerStyle: {
                                                    width: '168px',
                                                },
                                                formatter: v => format(v, DATE_FORMAT)
                                            },
                                            {
                                                dataField: 'riskScore',
                                                text: 'Risk Score',
                                                align: 'right',
                                                headerStyle: {
                                                    width: '134px',
                                                },
                                            },
                                            {
                                                dataField: 'postalCode',
                                                text: 'Zip',
                                                headerStyle: {
                                                    width: '80px',
                                                },
                                                formatter: v => v.split(' ')[1]
                                            },
                                            {
                                                dataField: 'status',
                                                text: 'Status',
                                                headerStyle: {
                                                    width: '80px',
                                                },
                                            },
                                        ]}
                                        onRefresh={this.onRefresh}
                                    />
                                    <div>
                                        <Button color='success' className="ClientPicker-Btn" onClick={this.onSelect}>Select</Button>
                                        <Button outline color='success' className="ClientPicker-Btn" onClick={this.onCancel}>Cancel</Button>
                                    </div>
                                </Card>
                            )}
                            {this.hasListData(ds.data) && (
                                <Row>
                                    <Table
                                        hasHover
                                        hasPagination
                                        keyField="id"
                                        isLoading={isFetching}
                                        className="Caseload-ClientListTable"
                                        containerClass="CaseloadForm-ClientTableContainer"
                                        data={ds.data}
                                        pagination={ds.pagination}
                                        columns={[
                                            {
                                                dataField: 'displayName',
                                                text: 'Name',
                                                sort: true,
                                                headerStyle: {
                                                    width: '160px',
                                                },
                                            },
                                            {
                                                dataField: 'ssn',
                                                text: 'SSN',
                                                sort: true,
                                                headerAlign:'right',
                                                align:'right',
                                                headerStyle: {
                                                    width: '93px',
                                                },
                                            },
                                            {
                                                dataField: 'gender',
                                                text: 'Gender',
                                                sort: true,
                                                headerStyle: {
                                                    width: '116px',
                                                },
                                            },
                                            {
                                                dataField: 'birthDate',
                                                text: 'Date Of Birth',
                                                sort: true,
                                                headerStyle: {
                                                    width: '154px',
                                                },
                                                formatter: v => format(v, DATE_FORMAT)
                                            },
                                            {
                                                dataField: 'riskScore',
                                                text: 'Risk Score',
                                                sort: true,
                                                align: 'right',
                                                headerStyle: {
                                                    width: '134px',
                                                },
                                            },
                                            {
                                                dataField: 'postalCode',
                                                text: 'Zip',
                                                headerStyle: {
                                                    width: '80px',
                                                },
                                                formatter: v => v.split(' ')[1]
                                            },
                                            {
                                                dataField: 'status',
                                                text: 'Status',
                                                headerStyle: {
                                                    width: '80px',
                                                },
                                            },
                                            {
                                                dataField: '',
                                                text: '',
                                                align: 'right',
                                                headerStyle: {
                                                    width: '80px',
                                                },
                                                formatter: (v, row) => {
                                                    return (
                                                        <Actions
                                                            data={row}
                                                            hasDeleteAction={true}
                                                            iconSize={ICON_SIZE}
                                                            onDelete={this.onDeleteClient}
                                                        />
                                                    )
                                                }
                                            }
                                        ]}
                                        onRefresh={this.onRefresh}
                                    />
                                </Row>
                            )}
                        </div>
                    </>
                )
            }
            else {
                const form = forms.get(this.getCaseloadId())
                const {
                    organization,
                    organizationHasError,
                    organizationErrorText,

                    community,
                    communityHasError,
                    communityErrorText,

                    caseloadName,
                    caseloadNameHasError,
                    caseloadNameErrorText,

                    active,
                    activeHasError,
                    activeErrorText,

                    description,
                    descriptionHasError,
                    descriptionErrorText,

                    serviceCoordinator,
                    serviceCoordinatorHasError,
                    serviceCoordinatorErrorText,

                    backupPerson,
                    backupPersonHasError,
                    backupPersonErrorText,

                } = form.fields

                const { isFetching, dataSource : ds } =  form.list

                content = (
                    <>
                        <div className='CaseloadForm-Section'>
                            <div className='CaseloadForm-SectionTitle'>
                                General Data
                            </div>
                            <Row>
                                <Col md={6}>
                                    <SelectField
                                        type='text'
                                        name='organization'
                                        value={organization}
                                        label='Organization*'
                                        defaultText='Health Star'
                                        hasError={organizationHasError}
                                        errorText={organizationErrorText}
                                        className='CaseloadForm-SelectField'
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <SelectField
                                        type='text'
                                        name='community'
                                        value={community}
                                        label='Community*'
                                        defaultText='Health Star Community'
                                        hasError={communityHasError}
                                        errorText={communityErrorText}
                                        className='CaseloadForm-SelectField'
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={9}>
                                    <TextField
                                        type='text'
                                        name='caseloadName'
                                        value={caseloadName}
                                        label='Caseload Name*'
                                        className='CaseloadForm-TextField'
                                        hasError={caseloadNameHasError}
                                        errorText={caseloadNameErrorText}
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                                <Col md={3}>
                                    <CheckboxField
                                        name='active'
                                        label='Active'
                                        value={active}
                                        hasError={activeHasError}
                                        errorText={activeErrorText}
                                        className='CaseloadForm-CheckboxField'
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <TextField
                                        type='textarea'
                                        name='description'
                                        value={description}
                                        label='Description'
                                        className='CaseloadForm-TextArea'
                                        hasError={descriptionHasError}
                                        errorText={descriptionErrorText}
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <SelectField
                                        type='text'
                                        name='serviceCoordinator'
                                        value={serviceCoordinator}
                                        label='Service Coordinator*'
                                        defaultText='Alice Milton'
                                        hasError={serviceCoordinatorHasError}
                                        errorText={serviceCoordinatorErrorText}
                                        className='CaseloadForm-SelectField'
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                                <Col md={6}>
                                    <SelectField
                                        type='text'
                                        name='backupPerson'
                                        value={backupPerson}
                                        label='Backup Person'
                                        defaultText='Kaison Lowry'
                                        hasError={backupPersonHasError}
                                        errorText={backupPersonErrorText}
                                        className='CaseloadForm-SelectField'
                                        onChange={this.onChangeField}
                                    />
                                </Col>
                            </Row>
                        </div>
                        <div className='CaseloadForm-Section'>
                            <div className='CaseloadForm-SectionTitle'>
                                Clients
                                <Badge color="warning" className="CaseloadForm-ClientCount">
                                    {clientListCount.value}
                                </Badge>
                            </div>
                            <Row>
                                <Col md={12}>
                                    <SearchField
                                        type='text'
                                        name='name'
                                        value={ds.filter.name}
                                        label='Client*'
                                        placeholder='Search by name or 4 last digits of SSN'
                                        className='CaseloadForm-TextField'
                                        onChange={this.onChangeFilterField}
                                    />
                                </Col>
                            </Row>
                            {ds.filter.name && (
                                <Card className="ClientPicker">
                                    <Table
                                        hasHover
                                        hasPagination
                                        keyField="id"
                                        isLoading={clientListIsFetching}
                                        className="PickableClientList"
                                        containerClass="PickableClientListContainer"
                                        data={clientDS.data}
                                        pagination={clientDS.pagination}
                                        selectedRows={{
                                            mode: 'checkbox',
                                            clickToSelect: true,
                                            hideSelectAll: true,
                                            selected: pluck(selected, 'id'),
                                            onSelect: this.onSelection,
                                            style: { backgroundColor: '#edf4f5' },
                                            selectionRenderer: ({ mode, checked }) => (
                                                <CheckboxField
                                                    value={checked}
                                                    className="PickableClientList-Checkbox"
                                                />
                                            )
                                        }}
                                        columns={[
                                            {
                                                dataField: 'displayName',
                                                text: 'Name',
                                                headerStyle: {
                                                    width: '160px',
                                                },
                                            },
                                            {
                                                dataField: 'ssn',
                                                text: 'SSN',
                                                headerAlign:'right',
                                                align:'right',
                                                headerStyle: {
                                                    width: '93px',
                                                },
                                            },
                                            {
                                                dataField: 'gender',
                                                text: 'Gender',
                                                headerStyle: {
                                                    width: '116px',
                                                },
                                            },
                                            {
                                                dataField: 'birthDate',
                                                text: 'Date Of Birth',
                                                headerStyle: {
                                                    width: '168px',
                                                },
                                                formatter: v => format(v, DATE_FORMAT)
                                            },
                                            {
                                                dataField: 'riskScore',
                                                text: 'Risk Score',
                                                align: 'right',
                                                headerStyle: {
                                                    width: '134px',
                                                },
                                            },
                                            {
                                                dataField: 'postalCode',
                                                text: 'Zip',
                                                headerStyle: {
                                                    width: '80px',
                                                },
                                                formatter: v => v.split(' ')[1]
                                            },
                                            {
                                                dataField: 'status',
                                                text: 'Status',
                                                headerStyle: {
                                                    width: '80px',
                                                },
                                            },
                                        ]}
                                        onRefresh={this.onRefresh}
                                    />
                                    <div>
                                        <Button color='success' className="ClientPicker-Btn" onClick={this.onSelect}>Select</Button>
                                        <Button outline color='success' className="ClientPicker-Btn" onClick={this.onCancel}>Cancel</Button>
                                    </div>
                                </Card>
                            )}
                            {this.hasListData(ds.data) && (
                                <Row>
                                    <Table
                                        hasHover
                                        hasPagination
                                        keyField="id"
                                        isLoading={isFetching}
                                        className="Caseload-ClientListTable"
                                        containerClass="CaseloadForm-ClientTableContainer"
                                        data={ds.data}
                                        pagination={ds.pagination}
                                        columns={[
                                            {
                                                dataField: 'displayName',
                                                text: 'Name',
                                                sort: true,
                                                headerStyle: {
                                                    width: '160px',
                                                },
                                            },
                                            {
                                                dataField: 'ssn',
                                                text: 'SSN',
                                                sort: true,
                                                headerAlign:'right',
                                                align:'right',
                                                headerStyle: {
                                                    width: '93px',
                                                },
                                            },
                                            {
                                                dataField: 'gender',
                                                text: 'Gender',
                                                sort: true,
                                                headerStyle: {
                                                    width: '116px',
                                                },
                                            },
                                            {
                                                dataField: 'birthDate',
                                                text: 'Date Of Birth',
                                                sort: true,
                                                headerStyle: {
                                                    width: '154px',
                                                },
                                                formatter: v => format(v, DATE_FORMAT)
                                            },
                                            {
                                                dataField: 'riskScore',
                                                text: 'Risk Score',
                                                sort: true,
                                                align: 'right',
                                                headerStyle: {
                                                    width: '134px',
                                                },
                                            },
                                            {
                                                dataField: 'postalCode',
                                                text: 'Zip',
                                                headerStyle: {
                                                    width: '80px',
                                                },
                                                formatter: v => v.split(' ')[1]
                                            },
                                            {
                                                dataField: 'status',
                                                text: 'Status',
                                                headerStyle: {
                                                    width: '80px',
                                                },
                                            },
                                            {
                                                dataField: '',
                                                text: '',
                                                align: 'right',
                                                headerStyle: {
                                                    width: '80px',
                                                },
                                                formatter: (v, row) => {
                                                    return (
                                                        <Actions
                                                            data={row}
                                                            hasDeleteAction={true}
                                                            iconSize={ICON_SIZE}
                                                            onDelete={this.onDeleteClient}
                                                        />
                                                    )
                                                }
                                            }
                                        ]}
                                        onRefresh={this.onRefresh}
                                    />
                                </Row>
                            )}
                        </div>
                    </>
                )
            }
        }

        return (
            <Form className={cn('CaseloadForm', className)}>
                {content}
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CaseloadForm)

