import React, {Component} from 'react'

import cn from 'classnames'
import {map, first, isNull, isArray} from 'underscore'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {withRouter} from 'react-router-dom'

import {Badge, Button, Row, Col, Collapse} from 'reactstrap'

import './Events.scss'

import Tabs from 'components/Tabs/Tabs'
import Table from 'components/Table/Table'
import Loader from 'components/Loader/Loader'
import DateField from 'components/Form/DateField/DateField'
import TextField from 'components/Form/TextField/TextField'
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'
import MultiSelect from 'components/MultiSelect/MultiSelect'
import SelectField from 'components/Form/SelectField/SelectField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import NoteEditor from './NoteEditor/NoteEditor'
import NoteDetails from './NoteDetails/NoteDetails'
import EventEditor from './EventEditor/EventEditor'
import EventDetails from './EventDetails/EventDetails'

import {getSideBarItems} from '../Clients/SideBarItems'

import * as tokenActions from 'redux/auth/token/tokenActions'
import * as loginActions from 'redux/auth/login/loginActions'
import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as logoutActions from 'redux/auth/logout/logoutActions'
import * as noteListActions from 'redux/note/list/noteListActions'
import * as eventListActions from 'redux/event/list/eventListActions'
import * as clientDetailsActions from 'redux/client/details/clientDetailsActions'
import * as eventNoteComposedListActions from 'redux/event/note/composed/list/eventNoteComposedListActions'

import * as noteTypeListActions from 'redux/directory/note/type/list/noteTypeListActions'
import * as communityListActions from 'redux/directory/community/list/communityListActions'
import * as eventTypeListActions from 'redux/directory/event/type/list/eventTypeListActions'
import * as organizationListActions from 'redux/directory/organization/list/organizationListActions'

import {PAGINATION} from 'lib/Constants'
import {isEmpty, DateUtils as DU} from 'lib/utils/Utils'

import {ReactComponent as Filter} from 'images/filters.svg'

const { format, formats } = DU

const TIME_FORMAT = formats.time
const DATE_FORMAT = formats.americanMediumDate

const {FIRST_PAGE} = PAGINATION

const LIST_ROW_COLORS = [
    '#fff1ca',
    '#ffd3c0',
    '#d1ebfe',
    '#d3dfe8',
    '#e7ccfe'
]

const NOTE_TYPE_COLORS = {
    EVENT_NOTE: '#d5f3b8',
    CLIENT_NOTE: '#e7ccfe',
    PATIENT_NOTE: '#e7ccfe',
}

const NOTE_TYPES = {
    EVENT_NOTE: 'EVENT_NOTE',
    CLIENT_NOTE: 'CLIENT_NOTE',
    PATIENT_NOTE: 'PATIENT_NOTE',
}

const SECTION_COLORS = [
    '#ffd3c0',
    '#fff1ca',
    '#d5f3b8',
    '#d1ebfe',
    '#e7ccfe'
]

function renderTypeGroupSection (id, name, title, data, value, onChange) {
    return (
        <div
            key={id}
            className="SelectField-Section EventTypeGroupSection"
            style={{ borderLeftColor: SECTION_COLORS[id % 5] }}>
            <div className="SelectField-SectionTitle EventTypeGroupSection-Title">
                {title}
            </div>
            {map(data, o => (
                <div onClick={() => {
                    onChange(o.id)
                }}
                     className="SelectField-SectionItem EventTypeGroupSection-EventType"
                     style={(value === o.id) ? {
                         backgroundColor: '#f9f9f9',
                         borderTop: '1px solid #bfbdbd',
                         borderBottom: '1px solid #bfbdbd'
                     } : {}}>
                    {o.title}
                    {(value === o.id) && (
                        <span className="SelectField-SectionCheckMark" />
                    )}
                </div>
            ))}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        auth: state.auth,

        note: state.note,
        event: state.event,

        client: {
            details: state.client.details,
        },

        directory: state.directory
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            client: {
                details: bindActionCreators(clientDetailsActions, dispatch)
            },
            event: {
                note: {
                    composed: {
                        list: bindActionCreators(eventNoteComposedListActions, dispatch),
                    }
                },
                list: bindActionCreators(eventListActions, dispatch),
            },
            note: {
                list: bindActionCreators(noteListActions, dispatch),
            },
            directory: {
                community: {
                    list: bindActionCreators(communityListActions, dispatch)
                },
                organization: {
                    list: bindActionCreators(organizationListActions, dispatch)
                },
                event: {
                    type: {list: bindActionCreators(eventTypeListActions, dispatch)},
                },
                note: {
                    type: {list: bindActionCreators(noteTypeListActions, dispatch)},
                },
            },
            auth: {
                token: bindActionCreators(tokenActions, dispatch),
                login: bindActionCreators(loginActions, dispatch),
                logout: bindActionCreators(logoutActions, dispatch),
            },
            sidebar: bindActionCreators(sideBarActions, dispatch),
        },
    }
}

class Events extends Component {
    navigationRef = React.createRef();

    state = {
        tab: 0,
        selected: null,
        selectedNote: null,
        selectedEvent: null,
        isFilterOpen: true,
        isNoteEditorOpen: false,
        isEventEditorOpen: false,
    }

    componentDidMount() {
        const { location, auth, match } = this.props

        if (match.params.clientId) {
            this.refreshClientDetails()
        }

        if (auth.login.user.data) {
            const {organizationId} = auth.login.user.data

            this.changeFilter({
                organizationId,
            }, true)
        }

        if (location.state) {
            if (location.state.tab) {
                this.setState({
                    tab: location.state.tab,
                })
            }

            else {
                this.setState({
                    isEventEditorOpen: location.state.isEditorOpen
                })
            }
        }

        this.loadDirectoryData()

        this.updateSideBar()
    }

    componentDidUpdate(prevProps) {
        const {
            auth,
            event,
            note,
            actions,
            directory
        } = this.props

        const communityListDs = directory.community.list.dataSource

        if (this.props.client.details.shouldReload) {
            this.refreshClientDetails()
        }

        if (event.list.shouldReload) {
            this.refreshEventNoteComposedList()
            this.refreshEventList()
            this.refreshNoteList()
        }

        if (note.list.shouldReload) {
            this.refreshNoteList()
            this.refreshEventNoteComposedList()
        }

        if (event.note.composed.list.shouldReload) {
            this.refreshEventNoteComposedList()
        }

        if (event.list.dataSource.filter.organizationId !== prevProps.event.list.dataSource.filter.organizationId) {
            actions.directory.community.list.load({ organizationId: event.list.dataSource.filter.organizationId })
        }

        if (communityListDs.data !== prevProps.directory.community.list.dataSource.data) {
            this.changeFilter({
                communityIds: map(communityListDs.data, o => o.id),
            }, true)
        }

        if (auth.login.user.data && (auth.login.user.data !== prevProps.auth.login.user.data)) {
            const {organizationId} = auth.login.user.data


            this.changeFilter({
                organizationId,
            }, true)
        }

        const {
            selected,
            selectedNote,
            selectedEvent
        } = this.state

        if (!isEmpty(event.note.composed.list.dataSource.data) && isNull(selected)) {
            this.setState({
                selected: first(event.note.composed.list.dataSource.data)
            })
        }

        if (!isEmpty(event.list.dataSource.data) && isNull(selectedEvent)) {
            this.setState({
                selectedEvent: first(event.list.dataSource.data)
            })
        }

        if (!isEmpty(note.list.dataSource.data) && isNull(selectedNote)) {
            this.setState({
                selectedNote: first(note.list.dataSource.data)
            })
        }
    }

    onChangeFilterField = (name, value) => {
        this.changeFilter({ [name]: value })
    }

    onChangeFilterDateField = (name, value) => {
        this.changeFilter({ [name]: value ? new Date(value).getTime() : null })
    }

    onChangeOrganizationFilterField = (value) => {
        this.changeFilter({ organizationId: value }, true)
    }

    onChangeCommunityFilterField = (value) => {
        this.changeFilter({ communityIds: value }, true)
    }

    onRefreshEventNoteComposedList = (page) => {
        this.refreshEventNoteComposedList(page)
    }

    onRefreshEventList = (page) => {
        this.refreshEventList(page)
    }

    onRefreshNoteList = (page) => {
        this.refreshNoteList(page)
    }

    onSelect = (selected) => {
        this.setState({ selected })
    }

    onSelectNote = (selectedNote) => {
        this.setState({ selectedNote })
    }

    onSelectEvent = (selectedEvent) => {
        this.setState({ selectedEvent })
    }

    onToggleFilter = () => {
        this.setState(s => ({ isFilterOpen: !s.isFilterOpen }))
    }

    onClearFilter = () => {
        this.props.actions.event.list.clearFilter()
    }

    onChangeTab = tab => {
        this.setState({ tab })
    }

    onApplyFilter = () => {
        this.refreshEventNoteComposedList()
        this.refreshEventList()
        this.refreshNoteList()
    }

    onAddNote = () => {
        this.setState({ isNoteEditorOpen: true })
    }

    onCreateEvent = () => {
        this.setState({ isEventEditorOpen: true })
    }

    onCloseNoteEditor = () => {
        this.setState({ isNoteEditorOpen: false })
    }

    onCloseEventEditor = () => {
        this.setState({ isEventEditorOpen: false })
    }

    getComposedListRowStyle = (row, rowIndex) => {
        const style = {}
        const { selected } = this.state

        if (selected && selected.id === row.id) {
            style.backgroundColor = '#edf4f5'
        }

        style.borderLeftColor = LIST_ROW_COLORS[rowIndex % 5]

        return style
    }

    getEventListRowStyle = (row, rowIndex) => {
        const style = {}
        const { selectedEvent } = this.state

        if (selectedEvent && selectedEvent.id === row.id) {
            style.backgroundColor = '#edf4f5'
        }

        style.borderLeftColor = LIST_ROW_COLORS[rowIndex % 5]

        return style
    }

    getNoteListRowStyle = (row, rowIndex) => {
        const style = {}
        const { selectedNote } = this.state

        if (selectedNote && selectedNote.id === row.id) {
            style.backgroundColor = '#edf4f5'
        }

        style.borderLeftColor = LIST_ROW_COLORS[rowIndex % 5]

        return style
    }

    getSideBarItems() {
        const {
            match,
            eventCount,
            documentCount,
            assessmentCount,
            servicePlanCount,
        } = this.props

        const { clientId } = match.params

        return getSideBarItems({
            clientId,
            eventCount,
            documentCount,
            assessmentCount,
            servicePlanCount,
        })
    }

    getNavigationHeight () {
        const node = this.navigationRef.current
        return node ? node.scrollHeight : 0
    }

    isNoteType(type) {
        const { CLIENT_NOTE, EVENT_NOTE, PATIENT_NOTE } = NOTE_TYPES

        return !isEmpty(type) && [CLIENT_NOTE, EVENT_NOTE, PATIENT_NOTE].includes(type.name)
    }

    changeFilter(changes, shouldReload) {
        this.props.actions.event.list.changeFilter(changes, shouldReload)
    }

    clearEventNoteComposedList() {
        this.props.actions.event.note.composed.list.clear()
    }

    clearEventList() {
        this.props.actions.event.list.clear()
    }

    clearNoteList() {
        this.props.actions.note.list.clear()
    }

    refreshClientDetails() {
        this.updateClientDetails(true)
    }

    refreshEventNoteComposedList(page) {
        this.clearEventNoteComposedList()

        this.updateEventNoteComposedList(true, page || FIRST_PAGE)
    }

    refreshEventList(page) {
        this.clearEventList()

        this.updateEventList(true, page || FIRST_PAGE)
    }

    refreshNoteList(page) {
        this.clearNoteList()

        this.updateNoteList(true, page || FIRST_PAGE)
    }

    updateClientDetails(isReload) {
        const { data } = this.props

        if (isReload || isEmpty(data)) {
            const { actions, match } = this.props

            actions.client.details.load(match.params.clientId)
        }
    }

    updateEventNoteComposedList(isReload, page) {
        const {
            event,
            match
        } = this.props

        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = event.note.composed.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.event.note.composed.list.load({
                size,
                page: page || p,
                clientId: match.params.clientId,
                filter: event.list.dataSource.filter.toJS(),
            })

            this.setState({
                selected: null
            })
        }
    }

    updateEventList(isReload, page) {
        const {
            event,
            match
        } = this.props

        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = event.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.event.list.load({
                size,
                page: page || p,
                filter: ds.filter.toJS(),
                clientId: match.params.clientId
            })

            this.setState({
                selectedEvent: null
            })
        }
    }

    updateNoteList(isReload, page) {
        const {
            note,
            event,
            match
        } = this.props

        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = note.list

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions } = this.props
            const { page: p, size } = ds.pagination

            actions.note.list.load({
                size,
                page: page || p,
                clientId: match.params.clientId,
                filter: event.list.dataSource.filter.toJS(),
            })

            this.setState({
                selectedNote: null
            })
        }
    }

    updateSideBar() {
        this
            .props
            .actions
            .sidebar
            .update({
                items: this.getSideBarItems()
            })
    }

    loadDirectoryData() {
        const {
            note,
            event,
            organization
        } =  this.props.actions.directory

        note.type.list.load()
        event.type.list.load()
        organization.list.load()
    }

    render() {
        const {
            tab,
            selected,
            selectedNote,
            selectedEvent,
            isFilterOpen,
            isNoteEditorOpen,
            isEventEditorOpen
        } = this.state

        const {
            note,
            event,
            match,
            client,
            className,
            directory,
        } = this.props

        const {
            community,
            organization,
        } = directory

        let noteTypes = directory.note.type.list.dataSource.data
        let eventTypes = directory.event.type.list.dataSource.data

        const noteListDs = note.list.dataSource
        const eventListDs = event.list.dataSource
        const eventNoteComposedListDs = event.note.composed.list.dataSource

        const eventNavigationHeight = this.getNavigationHeight()

        const clientId = match.params.clientId

        return (
            <>
                {!!clientId && (
                    <Breadcrumbs
                        className='Events-Breadcrumbs'
                        items={[
                            { title: 'Clients', href: '/clients' },
                            {
                                title: client.details.data && client.details.data.fullName || 'Denise Weber',
                                href: '/clients/' + clientId,
                            },
                            {
                                title: 'Events',
                                href: '/clients/' + clientId + '/events',
                                isActive: true,
                            },
                        ]}
                    />
                )}
                <div className={cn('Events', className)} style={!!clientId ? {} : { marginTop: 80 }}>
                    {!clientId && (
                        <div className="margin-top-10">
                            <MultiSelect
                                className={'Events-OrganizationSelect'}
                                defaultText={'Organization'}
                                value={eventListDs.filter.organizationId}
                                options={map(organization.list.dataSource.data, ({ id, label }) => ({
                                    text: label, value: id
                                }))}
                                isMultiple={false}
                                onChange={this.onChangeOrganizationFilterField}
                            />
                            <MultiSelect
                                className={'Events-CommunitySelect'}
                                defaultText={'Community'}
                                value={eventListDs.filter.communityIds.toJS()}
                                options={map(community.list.dataSource.data, ({ id, name }) => ({
                                    text: name, value: id
                                }))}
                                isMultiple={true}
                                onChange={this.onChangeCommunityFilterField}
                            />
                        </div>
                    )}
                    <div>
                        <div className="Events-Title">
                            <div className="flex-2">
                                <div className="Events-TitleText">
                                    Events
                                    <Badge color="warning" className="Events-TotalCount">
                                        {eventNoteComposedListDs.pagination.totalCount}
                                    </Badge>
                                </div>
                            </div>
                            <div className="flex-4 text-right">
                                <Filter
                                    className={cn(
                                        'Events-FilterSwitcher',
                                        isFilterOpen
                                            ? 'EventFilter-Expanded'
                                            : 'EventFilter-Collapsed',
                                    )}
                                    onClick={this.onToggleFilter}
                                />
                                {!!clientId && (
                                    <>
                                        <Button
                                            outline
                                            color='success'
                                            className="margin-left-20"
                                            onClick={this.onAddNote}>
                                            Add new note
                                        </Button>
                                        <NoteEditor
                                            isOpen={isNoteEditorOpen}
                                            onClose={this.onCloseNoteEditor}
                                        />
                                        <Button
                                            color='success'
                                            className="margin-left-20"
                                            onClick={this.onCreateEvent}>
                                            Create event
                                        </Button>
                                        <EventEditor
                                            isOpen={isEventEditorOpen}
                                            onClose={this.onCloseEventEditor}
                                        />
                                    </>
                                )}
                            </div>
                        </div>
                        <Collapse isOpen={isFilterOpen}>
                            {!!clientId ? (
                                <div className="EventFilter">
                                    <Row>
                                        <Col md={8}>
                                            <Row>
                                                <Col md={6}>
                                                    <SelectField
                                                        name="eventTypeId"
                                                        value={eventListDs.filter.eventTypeId}
                                                        options={map(eventTypes, o => ({
                                                            ...o, data: map(o.data, ob => ({ ...ob, title: ob.label}))
                                                        }))}
                                                        isSectioned={true}
                                                        renderSection={renderTypeGroupSection}
                                                        label="Event Type"
                                                        defaultText="Select Event Type"
                                                        isMultiple={false}
                                                        onChange={this.onChangeFilterField}
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <SelectField
                                                        name="noteTypeId"
                                                        value={eventListDs.filter.noteTypeId}
                                                        options={map(noteTypes, ({id, label}) => ({
                                                            text: label, value: id
                                                        }))}
                                                        label="Note Type"
                                                        defaultText="Select Note Type"
                                                        isMultiple={false}
                                                        onChange={this.onChangeFilterField}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={4}>
                                            <Row>
                                                <Col md={6}>
                                                    <DateField
                                                        name="dateFrom"
                                                        value={eventListDs.filter.dateFrom}
                                                        label="Date From"
                                                        onChange={this.onChangeFilterDateField}
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <DateField
                                                        name="dateTo"
                                                        value={eventListDs.filter.dateTo}
                                                        label="Date To"
                                                        onChange={this.onChangeFilterDateField}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <Row>
                                                <Col md={6}>
                                                    <CheckboxField
                                                        name="onlyIncidentReportEvents"
                                                        value={eventListDs.filter.onlyIncidentReportEvents}
                                                        label="Only events with incident report"
                                                        onChange={this.onChangeFilterField}
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <Button
                                                        outline
                                                        color='success'
                                                        onClick={this.onClearFilter}>
                                                        Clear
                                                    </Button>
                                                    <Button
                                                        color='success'
                                                        onClick={this.onApplyFilter}>
                                                        Apply
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            ) : (
                                <div className="EventFilter">
                                    <Row>
                                        <Col md={8}>
                                            <Row>
                                                <Col md={4}>
                                                    <TextField
                                                        name="clientName"
                                                        value={eventListDs.filter.clientName}
                                                        label="Client Name"
                                                        placeholder="Select Client Name"
                                                        onChange={this.onChangeFilterField}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <SelectField
                                                        name="eventTypeId"
                                                        value={eventListDs.filter.eventTypeId}
                                                        options={map(eventTypes, o => ({
                                                            ...o, data: map(o.data, ob => ({ ...ob, title: ob.value}))
                                                        }))}
                                                        isSectioned={true}
                                                        renderSection={renderTypeGroupSection}
                                                        label="Event Type"
                                                        defaultText="Select Event Type"
                                                        isMultiple={false}
                                                        onChange={this.onChangeFilterField}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <SelectField
                                                        name="noteTypeId"
                                                        value={eventListDs.filter.noteTypeId}
                                                        options={map(noteTypes, ({id, label}) => ({
                                                            text: label, value: id
                                                        }))}
                                                        label="Note Type"
                                                        defaultText="Select Note Type"
                                                        isMultiple={false}
                                                        onChange={this.onChangeFilterField}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col md={4}>
                                            <Row>
                                                <Col md={6}>
                                                    <DateField
                                                        name="dateFrom"
                                                        value={eventListDs.filter.dateFrom}
                                                        label="Date From"
                                                        onChange={this.onChangeFilterDateField}
                                                    />
                                                </Col>
                                                <Col md={6}>
                                                    <DateField
                                                        name="dateTo"
                                                        value={eventListDs.filter.dateTo}
                                                        label="Date To"
                                                        onChange={this.onChangeFilterDateField}
                                                    />
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={8}>
                                            <Row>
                                                <Col md={4}>
                                                    <CheckboxField
                                                        name="onlyIncidentReportEvents"
                                                        value={eventListDs.filter.onlyIncidentReportEvents}
                                                        label="Only events with incident report"
                                                        onChange={this.onChangeFilterField}
                                                    />
                                                </Col>
                                                <Col md={4}>
                                                    <Button
                                                        outline
                                                        color='success'
                                                        onClick={this.onClearFilter}>
                                                        Clear
                                                    </Button>
                                                    <Button
                                                        color='success'
                                                        onClick={this.onApplyFilter}>
                                                        Apply
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                        </Collapse>
                    </div>
                    <Row>
                        <Col md={4}>
                            <div ref={this.navigationRef} className="Events-Navigation">
                                <div className="Events-NavHeader">
                                    <Tabs
                                        className='Events-NavTabs'
                                        items={[
                                            {title: 'All', isActive: tab === 0},
                                            {title: 'Events', isActive: tab === 1},
                                            {title: 'Notes', isActive: tab === 2},
                                        ]}
                                        onChange={this.onChangeTab}
                                    />
                                </div>
                                {(tab === 0) && (
                                    <div className="Events-NavBody">
                                        {(event.note.composed.list.isFetching) ? (
                                            <Loader />
                                        ) : (
                                            <Table
                                                hasHover
                                                hasPagination
                                                keyField='id'
                                                getRowStyle={this.getComposedListRowStyle}
                                                rowEvents={{
                                                    onClick: (e, row) => {
                                                        this.onSelect(row)
                                                    }
                                                }}
                                                className='EventNoteComposedList'
                                                containerClass='EventNoteComposedListContainer'
                                                data={eventNoteComposedListDs.data}
                                                pagination={eventNoteComposedListDs.pagination}
                                                columns={[
                                                    {
                                                        dataField: 'clientName',
                                                        formatter: (v, row) => (
                                                            this.isNoteType(row.category) ? (
                                                                <>
                                                                    <div
                                                                        className='Note-ClientName'>
                                                                        {row.clientName}
                                                                    </div>
                                                                    <div
                                                                        className='Note-Type'>
                                                                        {row.type.title}
                                                                    </div>
                                                                    <span
                                                                        style={{ backgroundColor: NOTE_TYPE_COLORS[row.category.name] }}
                                                                        className="Note-Category">
                                                                        {row.category.title}
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div
                                                                        className='Event-ClientName'>
                                                                        {row.clientName}
                                                                    </div>
                                                                    <div
                                                                        className='Event-Type'>
                                                                        {row.type.title}
                                                                    </div>
                                                                    <span
                                                                        style={{ backgroundColor: '#fff1ca' }}
                                                                        className="Event-EntityType">
                                                                        EVENT
                                                                    </span>
                                                                </>
                                                            )
                                                        )
                                                    },
                                                    {
                                                        dataField: 'createdDate',
                                                        formatter: (v, row) => (
                                                            this.isNoteType(row.category) ? (
                                                                <>
                                                                    <div
                                                                        className='Note-Date'>
                                                                        {format(v, DATE_FORMAT)}
                                                                    </div>
                                                                    <div
                                                                        className='Note-Time'>
                                                                        {format(v, TIME_FORMAT)}
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div
                                                                        className='Event-Date'>
                                                                        {format(v, DATE_FORMAT)}
                                                                    </div>
                                                                    <div
                                                                        className='Event-Time'>
                                                                        {format(v, TIME_FORMAT)}
                                                                    </div>
                                                                </>
                                                            )
                                                        )
                                                    },
                                                ]}
                                                onRefresh={this.onRefreshEventNoteComposedList}
                                            />
                                        )}
                                    </div>
                                )}
                                {(tab === 1) && (
                                    <div className="Events-NavBody">
                                        {event.list.isFetching ? (
                                            <Loader />
                                        ) : (
                                            <Table
                                                hasHover
                                                hasPagination
                                                keyField='id'
                                                getRowStyle={this.getEventListRowStyle}
                                                rowEvents={{
                                                    onClick: (e, row) => {
                                                        this.onSelectEvent(row)
                                                    }
                                                }}
                                                className='EventList'
                                                containerClass='EventListContainer'
                                                data={eventListDs.data}
                                                pagination={eventListDs.pagination}
                                                columns={[
                                                    {
                                                        dataField: 'clientName',
                                                        formatter: (v, row) => (
                                                            <>
                                                                <div
                                                                    className='Event-ClientName'>
                                                                    {row.clientName}
                                                                </div>
                                                                <div
                                                                    className='Event-Type'>
                                                                    {row.type.title}
                                                                </div>
                                                            </>
                                                        )
                                                    },
                                                    {
                                                        dataField: 'createdDate',
                                                        formatter: v => (
                                                            <>
                                                                <div
                                                                    className='Event-Date'>
                                                                    {format(v, DATE_FORMAT)}
                                                                </div>
                                                                <div
                                                                    className='Event-Time'>
                                                                    {format(v, TIME_FORMAT)}
                                                                </div>
                                                            </>
                                                        )
                                                    },
                                                ]}
                                                onRefresh={this.onRefreshEventList}
                                            />
                                        )}
                                    </div>
                                )}
                                {(tab === 2) && (
                                    <div className="Events-NavBody">
                                        {note.list.isFetching ? (
                                            <Loader />
                                        ) : (
                                            <Table
                                                hasHover
                                                hasPagination
                                                keyField='id'
                                                getRowStyle={this.getNoteListRowStyle}
                                                rowEvents={{
                                                    onClick: (e, row) => {
                                                        this.onSelectNote(row)
                                                    }
                                                }}
                                                className='NoteList'
                                                containerClass='NoteListContainer'
                                                data={noteListDs.data}
                                                pagination={noteListDs.pagination}
                                                columns={[
                                                    {
                                                        dataField: 'author',
                                                        formatter: (v, row) => (
                                                            <>
                                                                <div
                                                                    className='Note-ClientName'>
                                                                    {row.clientName}
                                                                </div>
                                                                <div
                                                                    className='Note-Type'>
                                                                    {row.type.title}
                                                                </div>
                                                                <span
                                                                    style={{ backgroundColor: NOTE_TYPE_COLORS[row.category.name] }}
                                                                    className="Note-Category">
                                                                    {row.category.title}
                                                                </span>
                                                            </>
                                                        )
                                                    },
                                                    {
                                                        dataField: 'createdDate',
                                                        headerStyle: {
                                                            width: '145px',
                                                        },
                                                        formatter: v => (
                                                            <>
                                                                <div
                                                                    className='Note-Date'>
                                                                    {format(v, DATE_FORMAT)}
                                                                </div>
                                                                <div
                                                                    className='Note-Time'>
                                                                    {format(v, TIME_FORMAT)}
                                                                </div>
                                                            </>
                                                        )
                                                    },
                                                ]}
                                                onRefresh={this.onRefreshNoteList}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </Col>
                        <Col md={8}>
                            {(tab === 0) && (
                                this.isNoteType(selected && selected.category) ? (
                                    <NoteDetails
                                        clientId={clientId}
                                        noteId={selected && selected.id}
                                        scrollableContainerHeight={eventNavigationHeight}
                                    />
                                ) : (
                                    <EventDetails
                                        clientId={clientId}
                                        eventId={selected && selected.id}
                                        scrollableContainerHeight={eventNavigationHeight}
                                    />
                                )
                            )}
                            {(tab === 1) && (
                                <EventDetails
                                    clientId={clientId}
                                    eventId={selectedEvent && selectedEvent.id}
                                    scrollableContainerHeight={eventNavigationHeight}
                                />
                            )}
                            {(tab === 2) && (
                                <NoteDetails
                                    clientId={clientId}
                                    noteId={selectedNote && selectedNote.id}
                                    scrollableContainerHeight={eventNavigationHeight}
                                />
                            )}
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Events))
