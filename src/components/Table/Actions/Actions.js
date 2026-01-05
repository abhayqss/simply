import React, { Component } from 'react'

import cn from 'classnames'
import PropTypes from 'prop-types'
import { UncontrolledTooltip as Tooltip } from 'reactstrap'

import './Actions.scss'

import { ReactComponent as Cog } from 'images/cog.svg'
import { ReactComponent as Asset } from 'images/asset.svg'
import { ReactComponent as Pencil } from 'images/pencil.svg'
import { ReactComponent as Delete } from 'images/delete.svg'
import { ReactComponent as Info } from 'images/actions-info.svg'
import { ReactComponent as Download } from 'images/download.svg'
import { ReactComponent as VideoCall} from 'images/videocall.svg'

export default class Actions extends Component {

    static propTypes = {
        data: PropTypes.object,
        hasInfoAction: PropTypes.bool,
        hasEditAction: PropTypes.bool,
        hasAssetAction: PropTypes.bool,
        hasDeleteAction: PropTypes.bool,
        hasDownloadAction: PropTypes.bool,
        hasVideoCallAction: PropTypes.bool,
        hasConfigureAction: PropTypes.bool,

        iconSize: PropTypes.number,
        className: PropTypes.string,
        infoHintClassName: PropTypes.string,

        infoHintMessage: PropTypes.string,
        editHintMessage: PropTypes.string,
        assetHintMessage: PropTypes.string,
        deleteHintMessage: PropTypes.string,
        downloadHintMessage: PropTypes.string,
        videoCallHintMessage: PropTypes.string,
        configureHintMessage: PropTypes.string,

        onInfo: PropTypes.func,
        onEdit: PropTypes.func,
        onAsset: PropTypes.func,
        onDelete: PropTypes.func,
        onDownload: PropTypes.func,
        onVideoCall: PropTypes.func,
        onConfigure: PropTypes.func,
        renderInfoHint: PropTypes.func
    }

    static defaultProps = {
        data: {},
        iconSize: 22,

        infoHintMessage: "Info",
        editHintMessage: "Edit",
        assetHintMessage: "Asset",
        deleteHintMessage: "Delete",
        downloadHintMessage: "Download",
        videoCallHintMessage: "Video Call",
        configureHintMessage: "Configure",

        onInfo: function () {},
        onEdit: function () {},
        onAsset: function () {},
        onDelete: function () {},
        onDownload: function () {},
        onVideoCall: function () {},
        onConfigure: function () {},
        renderInfoHint: function () {},
    }


    onInfo = () => {
        const {
            data,
            onInfo: cb
        } = this.props

        cb(data)
    }

    onEdit = () => {
        const {
            data,
            onEdit: cb
        } = this.props

        cb(data)
    }

    onAsset = () => {
        const {
            data,
            onAsset: cb
        } = this.props

        cb(data)
    }

    onDelete = () => {
        const {
            data,
            onDelete: cb
        } = this.props

        cb(data)
    }

    onDownload = () => {
        const {
            data,
            onDownload: cb
        } = this.props

        cb(data)
    }

    onConfigure = () => {
        const {
            data,
            onConfigure: cb
        } = this.props

        cb(data)
    }

    onVideoCall = () => {
        const {
            data,
            onVideoCall: cb
        } = this.props

        cb(data)
    }


    render () {
        const {
            data,
            iconSize,

            className,
            infoHintClassName,

            hasInfoAction,
            hasEditAction,
            hasAssetAction,
            hasDeleteAction,
            hasDownloadAction,
            hasConfigureAction,
            hasVideoCallAction,

            editHintMessage,
            assetHintMessage,
            deleteHintMessage,
            downloadHintMessage,
            videoCallHintMessage,
            configureHintMessage,

            renderInfoHint,
        } = this.props

        return (
            <div className={cn('Actions', className)}>
                {hasInfoAction && (
                    <>
                        <Info
                            id={"info" + data.id}
                            style={{ width: iconSize, height: iconSize }}
                            className='Actions-Item'
                            onClick={this.onInfo}
                        />
                        <Tooltip
                            className={infoHintClassName}
                            placement="left-start"
                            target={"info" + data.id}>
                            {renderInfoHint && renderInfoHint()}
                        </Tooltip>
                    </>

                )}
                {hasConfigureAction && (
                    <>
                        <Cog
                            id={"configure" + data.id}
                            style={{ width: iconSize, height: iconSize }}
                            className='Actions-Item'
                            onClick={this.onConfigure}
                        />
                        <Tooltip
                         placement="top"
                         trigger="click hover"
                         target={"configure" + data.id}>
                            {configureHintMessage}
                        </Tooltip>
                    </>

                )}
                {hasVideoCallAction && (
                    <>
                        <VideoCall
                            id={"video-call" + data.id}
                            style={{ width: iconSize, height: iconSize, marginTop: 4}}
                            className='Actions-Item'
                            onClick={this.onVideoCall}
                        />
                        <Tooltip
                         placement="top"
                         trigger="click hover"
                         target={"video-call" + data.id}>
                            {videoCallHintMessage}
                        </Tooltip>
                    </>
                )}
                {hasDownloadAction && (
                    <>
                        <Download
                            id={"download" + data.id}
                            style={{ width: iconSize, height: iconSize }}
                            className='Actions-Item'
                            onClick={this.onDownload}
                        />
                        <Tooltip
                         placement="top"
                         trigger="click hover"
                         target={"download" + data.id}>
                            {downloadHintMessage}
                        </Tooltip>
                    </>
                )}
                {hasEditAction && (
                    <>
                        <Pencil
                            id={"edit" + data.id}
                            style={{ width: iconSize, height: iconSize }}
                            className='Actions-Item'
                            onClick={this.onEdit}
                        />
                        <Tooltip
                         placement="top"
                         trigger="click hover"
                         target={"edit" + data.id}>
                            {editHintMessage}
                        </Tooltip>
                    </>
                )}
                {hasAssetAction && (
                    <>
                        <Asset
                            id={"asset" + data.id}
                            style={{ width: iconSize, height: iconSize }}
                            className='Actions-Item'
                            onClick={this.onAsset}
                        />
                        <Tooltip
                         placement="top"
                         trigger="click hover"
                         target={"asset" + data.id}>
                            {assetHintMessage}
                        </Tooltip>
                    </>
                )}
                {hasDeleteAction && (
                    <>
                        <Delete
                            id={"delete" + data.id}
                            style={{ width: iconSize, height: iconSize }}
                            className='Actions-Item'
                            onClick={this.onDelete}
                        />
                        <Tooltip
                         placement="top"
                         trigger="click hover"
                         target={"delete" + data.id}>
                            {deleteHintMessage}
                        </Tooltip>
                    </>
                )}
            </div>
        )
    }
}











