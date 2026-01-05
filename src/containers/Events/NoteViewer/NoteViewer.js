import React, {Component} from 'react'

import {map} from 'underscore'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import PropTypes from 'prop-types'

import {Button} from 'reactstrap'

import * as noteDetailsActions from 'redux/note/details/noteDetailsActions'

import Modal from 'components/Modal/Modal'
import Loader from 'components/Loader/Loader'
import Detail from 'components/Detail/Detail'

import {isEmpty} from 'lib/utils/Utils'

import './NoteViewer.scss'

function mapStateToProps(state) {
    const { details } = state.note

    return {
        data: details.data,
        error: details.error,
        isFetching: details.isFetching,
        shouldReload: details.shouldReload,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            details: bindActionCreators(noteDetailsActions, dispatch),
        }
    }
}

class NoteViewer extends Component {
    static propTypes = {
        isOpen: PropTypes.bool,
        noteId: PropTypes.number,
        onClose: PropTypes.func,
    }

    static defaultProps = {
        onClose: function() {},
    }

    componentDidMount() {
        this.refresh()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.noteId !== this.props.noteId) {
            this.refresh()
        }
    }

    isLoading() {
        const { isFetching, shouldReload } = this.props

        return isFetching || shouldReload
    }

    update(isReload) {
        const { actions, noteId } = this.props

        if (isReload)
            actions.details.load(noteId)
    }

    refresh() {
        this.update(true)
    }

    clear() {
        this.props.actions.details.clear()
    }

    onClose = () => {
        this.props.onClose()
    }

    onNext = () => {
        alert('Coming Soon')
    }

    render() {
        const {
            data,
            isOpen,
        } = this.props

        let content = null

        if (this.isLoading()) {
            content = <Loader />
        }

        else if (isEmpty(data)) {
            content = <h4>No Data</h4>
        }

        else {
            const {
                summary, encounter, description
            } = data

            content = (
                <div className="NoteViewer">
                    <div className="NoteViewer-Section">
                        <Detail title="PERSON SUBMITTING NOTE">
                            {summary.personSubmittingNote}
                        </Detail>
                        <Detail title="ADMIT / IN TAKE DATE">
                            {summary.admitIntakeDate}
                        </Detail>
                        {encounter && (
                            <>
                                <Detail title="DATE TIME">
                                    {encounter.dateTime}
                                </Detail>
                                <Detail title="TYPE">
                                    {encounter.type}
                                </Detail>
                                <Detail title="ENCOUNTER TYPE">
                                    {encounter.encounterType}
                                </Detail>
                                <Detail title="CLINICIAN COMPLETING ENCOUNTER">
                                    {encounter.clinicianCompletingEncounter}
                                </Detail>
                                <Detail title="ENCOUNTER DATE">
                                    {encounter.encounterDate}
                                </Detail>
                                <Detail title="FROM">
                                    {encounter.from}
                                </Detail>
                                <Detail title="TO">
                                    {encounter.to}
                                </Detail>
                                <Detail title="TOTAL SPENT TIME">
                                    {encounter.totalSpentTime}
                                </Detail>
                                <Detail title="RANGE">
                                    {encounter.range}
                                </Detail>
                                <Detail title="UNITS">
                                    {encounter.units}
                                </Detail>
                            </>
                        )}
                        <Detail title="SUBJECTIVE">
                            {description.subjective}
                        </Detail>
                        <Detail title="OBJECTIVE">
                            {description.objective}
                        </Detail>
                        <Detail title="ASSESSMENT">
                            {description.assessment}
                        </Detail>
                        <Detail title="PLAN">
                            {description.plan && (
                                <>
                                    {description.plan.description}
                                    {map(description.plan.types, (o, i) => (
                                        <div key={i}>
                                            {`${i + 1}. ${o}`}
                                        </div>
                                    ))}
                                </>
                            )}
                        </Detail>
                    </div>
                </div>
            )
        }
        return (
            <Modal
                isOpen={isOpen}
                onClose={this.onClose}
                className="NoteViewer"
                title={`View Note`}
                renderFooter={() => (
                    <Button color='success' onClick={this.onClose}>
                        Close
                    </Button>
                )}>
                {content}
            </Modal>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteViewer)