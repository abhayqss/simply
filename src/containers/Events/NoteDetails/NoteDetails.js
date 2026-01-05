import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import {map} from 'underscore'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {Button} from 'reactstrap'

import * as noteDetailsActions from 'redux/note/details/noteDetailsActions'
import * as noteHistoryActions from 'redux/note/history/noteHistoryActions'

import Tabs from 'components/Tabs/Tabs'
import Table from 'components/Table/Table'
import Detail from 'components/Detail/Detail'
import Loader from 'components/Loader/Loader'

import NoteEditor from '../NoteEditor/NoteEditor'

import {ReactComponent as EditNote} from 'images/edit-note.svg'

import {PAGINATION} from 'lib/Constants'
import {isEmpty, DateUtils as DU} from 'lib/utils/Utils'

import './NoteDetails.scss'

const {format, formats} = DU

const TIME_FORMAT = formats.time
const DATE_FORMAT = formats.americanMediumDate

const {FIRST_PAGE} = PAGINATION

const NOTE_STATUS_COLORS = {
    UPDATED: '#d3dfe8',
    CREATED: '#d5f3b8',
}

const NOTE_SUBTYPE_COLORS = {
    ENCOUNTER: '#fff1ca',
    OFFICE_NOTE: '#ffd3c0',
    NURSING_PROGRESS: '#d3dfe8',
    INPATIENT_PROGRESS: '#e7ccfe'
}

const REMOVABLE_HEIGHT = 134

function mapStateToProps(state) {
    return {
        note: state.note,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            note: {
                details: bindActionCreators(noteDetailsActions, dispatch),
                history: bindActionCreators(noteHistoryActions, dispatch),
            },
        },
    }
}

class NoteDetails extends Component {
    static propTypes = {
        noteId: PropTypes.number,
    }

    state = {
        tab: 0,
        isNoteEditorOpen: false
    }

    componentDidMount() {
        this.refresh()
        this.refreshHistory()
    }

    componentDidUpdate(prevProps) {
        const { note, noteId } = this.props

        if (note.details.shouldReload || (noteId !== prevProps.noteId)) {
            this.setState({ tab: 0 })

            this.refresh()
            this.refreshHistory()
        }

        if (note.history.shouldReload) {
            this.refreshHistory()
        }
    }

    onChangeTab = tab => {
        this.setState({ tab })
    }

    onEditNote = () => {
        this.setState({ isNoteEditorOpen: true })
    }

    onCloseNoteEditor = () => {
        this.setState({ isNoteEditorOpen: false })
    }

    onRefreshHistory = (page) => {
        this.refreshHistory(page)
    }

    isLoading() {
        const { isFetching, shouldReload } = this.props.note.details

        return isFetching || shouldReload
    }

    refresh() {
        this.update(true)
    }

    refreshHistory(page) {
        this.updateHistory(true, page || FIRST_PAGE)
    }

    update(isReload) {
        const { actions, noteId, clientId } = this.props

        if (isReload) {
            actions.note.details.load(noteId, clientId)
        }
    }

    updateHistory(isReload, page) {
        const { note } = this.props
        const {
            isFetching,
            shouldReload,
            dataSource: ds
        } = note.history

        if (isReload || shouldReload || (!isFetching && isEmpty(ds.data))) {
            const { actions, noteId, clientId } = this.props

            const { page: p, size } = ds.pagination

            actions.note.history.load({
                size,
                page: page || p,
                noteId,
                clientId
            })
        }
    }

    render() {
        const {
            tab,
            isNoteEditorOpen
        } = this.state

        const {
            note,
            noteId,
            className,
            scrollableContainerHeight,
        } = this.props

        let content = null

        if (tab === 0) {
            if (this.isLoading()) {
                content = <Loader />
            }

            else if (isEmpty(note.details.data)) {
                content = (
                    <div className="NoteDetails-NoDataText">No Details</div>
                )
            }

            else {
                const {data} = note.details

                const isEncounterType = data.encounterDate || data.encounterTotalTimeSpent

                content = (
                    <div className="overflow-auto" style={{height: scrollableContainerHeight - REMOVABLE_HEIGHT}}>
                            <div className="NoteDetails-Section NoteDescription">
                                <div className="NoteDescription-Title">
                                    <div className="NoteDescription-TitleText">
                                        Summary
                                    </div>
                                </div>
                                <Detail title="Client">
                                    <span className="NoteDescription-Link">
                                        {data.clientName}
                                    </span>
                                </Detail>
                                <Detail
                                    title="Type">
                                    {data.category && data.category.title}
                                </Detail>
                                <Detail title="Subtype">
                                    {data.type && (
                                        <span
                                            className="NoteDescription-Subtype"
                                            style={{ backgroundColor: NOTE_SUBTYPE_COLORS[data.type.name] }}>
                                            {data.type.title}
                                        </span>
                                    )}
                                </Detail>
                                <Detail title="Event">
                                    <span className="NoteDescription-Link">
                                        {data.eventType}.
                                    </span>
                                    {format(data.modifiedDate, DATE_FORMAT)} {format(data.modifiedDate, TIME_FORMAT)}
                                </Detail>
                                <Detail title="Status">
                                    {data.status && (
                                        <span
                                            className="NoteDescription-Subtype"
                                            style={{ backgroundColor: NOTE_STATUS_COLORS[data.status.name] }}>
                                            {data.status.title}
                                        </span>
                                    )}
                                </Detail>
                                <Detail title="Last modified date">
                                    {format(data.modifiedDate, DATE_FORMAT)} {format(data.modifiedDate, TIME_FORMAT)}
                                </Detail>
                                <Detail title="Person submitting note">
                                    {data.personSubmittingNote}
                                </Detail>
                                <Detail title="Role">
                                    {data.role}
                                </Detail>
                            </div>
                            {isEncounterType && (
                                <div className="NoteDetails-Section NoteDescription">
                                    <div className="NoteDescription-Title">
                                        <div className="NoteDescription-TitleText">
                                            Encounter
                                        </div>
                                    </div>
                                    <Detail title="Encounter type">
                                        {data.type}
                                    </Detail>
                                    {data.encounterDate && (
                                        <Detail title="Encounter date">
                                            {format(data.encounterDate, DATE_FORMAT)}
                                        </Detail>
                                    )}
                                    {data.encounterDate && (
                                        <Detail title="Encounter time">
                                            {format(data.encounterDate, TIME_FORMAT)}
                                        </Detail>
                                    )}
                                    <Detail title="Total time spent">
                                        {data.encounterTotalTimeSpent}
                                    </Detail>
                                    <Detail title="Range">
                                        {data.range}
                                    </Detail>
                                    <Detail title="Units">
                                        {data.units}
                                    </Detail>
                                </div>
                            )}
                            <div className="NoteDetails-Section NoteDescription">
                                <div className="NoteDescription-Title">
                                    <div className="NoteDescription-TitleText">
                                        Description
                                    </div>
                                </div>
                                <Detail title="Subjective">
                                    {data.subjective}
                                </Detail>
                                <Detail title="Objective">
                                    {data.objective}
                                </Detail>
                                <Detail title="Assessment">
                                    {data.assessment}
                                </Detail>
                                <Detail title="Plan">
                                    {data.plan}
                                </Detail>
                            </div>
                    </div>
                )
            }
        }

        if (tab === 1) {
            const noteHistoryDs = note.history.dataSource

            content = (
                <Table
                    hasPagination
                    keyField='id'
                    isLoading={note.history.isFetching}
                    className='NoteChangeHistory'
                    containerClass='NoteChangeHistoryContainer'
                    data={noteHistoryDs.data}
                    pagination={noteHistoryDs.pagination}
                    columns={[
                        {
                            dataField: 'date',
                            text: 'Date',
                            headerAlign: 'right',
                            headerStyle: {
                                width: '200px'
                            },
                            formatter: v => `${format(v, DATE_FORMAT)} ${format(v, TIME_FORMAT)}`
                        },
                        {
                            dataField: 'status',
                            text: 'Status',
                            formatter: (v) => (
                                <span
                                    className="NoteChange-Status"
                                    style={{ backgroundColor: NOTE_STATUS_COLORS[v.name] }}>
                                        {v.title}
                                    </span>
                            )
                        },
                        {
                            dataField: 'author',
                            text: 'Author',
                        },
                        {
                            dataField: 'role',
                            text: 'Role',
                            headerStyle: {
                                width: '200px'
                            },
                        },
                        {
                            dataField: 'archived',
                            text: 'Updates',
                            headerStyle: {
                                width: '165px'
                            },
                            formatter: (v) => (
                                v ? (
                                    <Button
                                        color="link"
                                        className="NoteChange-ViewBtn">
                                        View Details
                                    </Button>
                                ) : null
                            )
                        }
                    ]}
                    onRefresh={this.onRefreshHistory}
                />
            )
        }

        return (
            <div className={cn('NoteDetails', className)}>
                <div className="NoteDetails-Header">
                    <Tabs
                        className='NoteDetails-Tabs'
                        items={[
                            {title: 'Note Description', isActive: tab === 0},
                            {title: 'Change History', isActive: tab === 1},
                        ]}
                        onChange={this.onChangeTab}
                    />
                    {(tab === 0) && (
                        <div>
                            <EditNote
                                className="NoteDetails-EditNoteBtn"
                                onClick={this.onEditNote}
                            />
                            <NoteEditor
                                isOpen={isNoteEditorOpen}
                                noteId={noteId}
                                onClose={this.onCloseNoteEditor}
                            />
                        </div>
                    )}
                </div>
                {content}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteDetails)