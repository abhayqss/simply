import React, {Component} from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {bindActionCreators} from 'redux'

import {Button} from 'reactstrap'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as clientDetailsActions from 'redux/client/details/clientDetailsActions'

import {ReactComponent as PdfTypeIcon} from 'images/pdf.svg'
import {ReactComponent as XmlTypeIcon} from 'images/xml.svg'
import {ReactComponent as DocTypeIcon} from 'images/doc.svg'

import {ReactComponent as SmartWatchIcon} from 'images/smart-watch.svg'
import {ReactComponent as SmartPillboxIcon} from 'images/smart-pillbox.svg'

import {ReactComponent as View} from 'images/view.svg'
import {ReactComponent as Download} from 'images/download.svg'
import {ReactComponent as Delete} from 'images/delete.svg'
import {ReactComponent as Edit} from 'images/pencil.svg'

import {isEmpty, } from 'lib/utils/Utils'

import './ClientDocumentsDevicesSummary.scss'

import {
    PAGINATION,
} from 'lib/Constants'

const DOCUMENT_TYPE_ICONS = {
    'PDF': PdfTypeIcon,
    'XML': XmlTypeIcon,
    'DOC': DocTypeIcon
}

const DEVICE_TYPE_ICONS = {
    'SMART_WATCH': SmartWatchIcon,
    'SMART_PILLBOX': SmartPillboxIcon
}

const {FIRST_PAGE} = PAGINATION

const ICON_SIZE = 36

function ClientDocument ({type, title, date, className}) {
    const TypeIcon = DOCUMENT_TYPE_ICONS[type] || PdfTypeIcon

    return (
        <div className={cn('ClientDocument', className)}>
            <div className='flex-1 d-flex'>
                <TypeIcon className='ClientDocument-TypeIcon'/>
                <div className='d-flex flex-column justify-content-center'>
                    <div className='ClientDocument-Title'>
                        {title}
                    </div>
                    <div className='ClientDocument-Date'>
                        {date}
                    </div>
                </div>
            </div>
            <div className='d-flex align-items-center'>
                <View
                    className='ClientDocument-ViewBtn'
                    onClick={() => {alert('Coming Soon')}}
                />
                <Download
                    className='ClientDocument-DownloadBtn'
                    onClick={() => {alert('Coming Soon')}}
                />
            </div>
        </div>
    )
}

function ClientDevice ({type, title, summary, className}) {
    const TypeIcon = DEVICE_TYPE_ICONS[type] || PdfTypeIcon

    return (
        <div className={cn('ClientDevice', className)}>
            <div className='flex-1 d-flex'>
                <TypeIcon className='ClientDevice-TypeIcon'/>
                <div className='d-flex flex-column justify-content-center'>
                    <div className='ClientDevice-Title'>
                        {title}
                    </div>
                    <div className='ClientDevice-Summary'>
                        {summary}
                    </div>
                </div>
            </div>
            <div className='d-flex align-items-center'>
                <Edit
                    className='ClientDevice-EditBtn'
                    onClick={() => {alert('Coming Soon')}}
                />
                <Delete
                    className='ClientDevice-DeleteBtn'
                    onClick={() => {alert('Coming Soon')}}
                />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        data: state.client.details.data,
        error: state.client.details.error,
        isFetching: state.client.details.isFetching,
        shouldReload: state.client.details.shouldReload,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            sidebar: bindActionCreators(sideBarActions, dispatch),
            details: bindActionCreators(clientDetailsActions, dispatch),
        },
    }
}

class ClientDocumentsDevicesSummary extends Component {

    static propTypes = {
        clientId: PropTypes.string,
    }

    state = {
        tab: 0,
        isOpen: false,
        isSharingDataParticipant: false
    }

    componentDidMount() {
        this.refresh()

        document.addEventListener('mousedown', this.onMouseEvent);
    }

    componentDidUpdate() {
        if (this.props.shouldReload) {
            this.refresh()
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onMouseEvent);
    }

    onChangeTab = (tab) => {
        this.changeTab(tab)
    }

    onMouseEvent = (e) => {
        if (this.detailPopupRef && !this.detailPopupRef.contains(e.target)) {
            this.setState({ isOpen: false });
        }
    }

    onChangeFilterField = (name, value) => {
        this.changeCareTeamFilter({ [name]: value })
    }

    onEditDetails() {
        alert('Coming Soon')
    }

    onAddToClient() {
        alert('Coming Soon')
    }

    onOpenPopup = () => {
        this.setState({isOpen: true})
    }

    onClose = () => {
        this.setState({isOpen: false})
    }

    /*redux is not implemented ,so using state for selection*/
    onSelectingOption = value => {
        this.setState({
            selectedOption: value,
        })
    }

    onChangeField = (name, value) => {
        //actions.details.changeFilter(changes, shouldReload)
    }

    onChangeSharingDataParticipation = (name, isChecked) => {
        this.setState({ isSharingDataParticipant: isChecked })
    }

    changeTab (tab) {
        this.setState({ tab })
    }

    refresh() {
        this.update(true)
    }

    update(isReload) {
        const { data } = this.props

        if (isReload || isEmpty(data)) {
            const { actions, match } = this.props
            console.log("match", match)

            //actions.details.load(match.params.clientId)
        }
    }

    updateSideBar() {
        this.props.actions.sidebar.update({ items: this.getSideBarItems() })
    }

    clear() {
        this.props.actions.details.clear()
    }

    changeFilter(changes, shouldReload) {
        const { actions } = this.props

        actions.list.changeFilter(changes, shouldReload)
    }

    isLoading() {
        const { isFetching, shouldReload } = this.props

        return isFetching || shouldReload
    }

    render() {
        const {
            tab,
            isOpen,
            isSharingDataParticipant
        } = this.state

        const { data, isFetching, className } = this.props

        return (
            <div className={cn("ClientDocumentsDevicesSummary", className)}>
                <div className='ClientDocumentsSummary'>
                    <div className='ClientDocumentsSummary-Title'>Documents</div>
                    <ClientDocument
                        type='PDF'
                        title='Facesheet'
                        date='12/12/2018'
                        className='ClientDocumentsSummary-Item'
                    />
                    <ClientDocument
                        type='XML'
                        title='CCD'
                        date='12/12/2018'
                        className='ClientDocumentsSummary-Item'
                    />
                    <ClientDocument
                        type='DOC'
                        title='Medication action plan'
                        date='07/05/2019'
                        className='ClientDocumentsSummary-Item'
                    />
                    <div className='text-right'>
                        <Button
                            color="success"
                            className="ClientDocumentsSummary-ViewAllBtn"
                            onClick={() => {alert('Coming Soon')}}>
                            View all documents
                        </Button>
                    </div>
                </div>
                <div className='ClientDevicesSummary'>
                    <div className='ClientDevicesSummary-Title'>Devices</div>
                    <ClientDevice
                        type='SMART_PILLBOX'
                        title='3456789002746'
                        summary='Dose health, 12/12/2018'
                        className='ClientDevicesSummary-Item'
                    />
                    <ClientDevice
                        type='SMART_WATCH'
                        title='QW764RT896THN'
                        summary='Reemo health, 07/01/2018'
                        className='ClientDevicesSummary-Item'
                    />
                    <div className='text-right'>
                        <Button
                            color="default"
                            className="ClientDevicesSummary-AddNewBtn"
                            onClick={() => {alert('Coming Soon')}}>
                            Add new device
                        </Button>
                        <Button
                            color="success"
                            className="ClientDevicesSummary-ViewAllBtn"
                            onClick={() => {alert('Coming Soon')}}>
                            View all devices
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientDocumentsDevicesSummary)