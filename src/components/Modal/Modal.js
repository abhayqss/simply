import React, {Component} from 'react'

import $ from 'jquery'
import 'jquery.scrollto'
import cn from 'classnames'
import PropTypes from 'prop-types'

import {
    ModalHeader,
    ModalFooter,
    Modal as BootstrapModal,
} from 'reactstrap'

import './Modal.scss'

import ConfirmDialog from '../dialogs/ConfirmDialog/ConfirmDialog'

import {ReactComponent as Cross} from 'images/cross.svg'
import {ReactComponent as ArrowTop} from "images/arrowtop.svg";

const MARGIN_VERTICAL = 28

const DEFAULT_SCROLL_DURATION = 500

const MIN_SCROLL_OFFSET_TOP = 300
const MIN_SCROLL_OFFSET_CHANGE_TIME = 200

function getCurrentTime () {
    return new Date().getTime()
}

export default class Modal extends Component {

    static propTypes = {
        title: PropTypes.string,

        isOpen: PropTypes.bool,
        isBackdrop: PropTypes.bool,
        hasCloseBtn: PropTypes.bool,
        isCloseBtnDisabled: PropTypes.bool,

        className: PropTypes.string,
        scrollOffset: PropTypes.number,
        headerClassName: PropTypes.string,
        bodyClassName: PropTypes.string,
        footerClassName: PropTypes.string,
        renderHeader: PropTypes.func,
        renderFooter: PropTypes.func,
        renderHeaderButton: PropTypes.func,
        onClose: PropTypes.func,
        onCancelDialog: PropTypes.func,
        onConfirmDialog: PropTypes.func
    }

    static defaultProps = {
        scrollOffset: 0,
        hasCloseBtn: true,
        onClose: function () {},
        onCancelDialog: function () {},
        onConfirmDialog: function () {}
    }

    header = React.createRef()

    body = React.createRef()

    footer = React.createRef()

    scrollOffsetChangeTime = 0

    state = {
        isScrollToTopBtnShowed: false,

        maxBodyHeight: 0
    }

    componentDidMount () {
        const {
            scrollOffset
        } = this.props

        this.scroll(scrollOffset)

        window.addEventListener('resize', this.onResize)
    }

    componentWillUnmount () {
        window.removeEventListener('resize', this.onResize);
    }

    onOpened = () => {
        this.updateMaxBodyHeight()
        this.addScrollEventListener()
    }

    onClose = () => {
        this.removeScrollEventListener()
        this.props.onClose()
    }

    onCancelDialog = () => {
        this.props.onCancelDialog()
    }

    onConfirmDialog = () => {
        this.props.onConfirmDialog()
    }

    onResize = () => {
        this.updateMaxBodyHeight()
    }

    onScroll = e => {
        const scrollOffset = e.target.scrollTop;

        const {
            isScrollToTopBtnShowed: isShowed
        } = this.state

        const delta = Math.abs(getCurrentTime() - this.scrollOffsetChangeTime)

        if (delta > MIN_SCROLL_OFFSET_CHANGE_TIME) {
            this.scrollOffsetChangeTime = getCurrentTime()

            if (!isShowed && scrollOffset > MIN_SCROLL_OFFSET_TOP) {
                this.setState({ isScrollToTopBtnShowed: true })
            }

            if (isShowed && scrollOffset < MIN_SCROLL_OFFSET_TOP) {
                setTimeout(() => {
                    this.setState({ isScrollToTopBtnShowed: false })
                }, 250)
            }
        }
    }

    onScrollToTop = () => {
        this.scrollToTop()
    }

    getHeaderHeight () {
        const node = this.header.current
        return node ? node.clientHeight : 0
    }

    getFooterHeight () {
        const node = this.footer.current
        return node ? node.clientHeight : 0
    }

    getMaxBodyHeight () {
        const hh = this.getHeaderHeight()
        const fh = this.getFooterHeight()

        return window.innerHeight - hh - fh - MARGIN_VERTICAL * 2
    }

    updateMaxBodyHeight () {
        this.setState({
            maxBodyHeight: this.getMaxBodyHeight()
        })
    }

    addScrollEventListener () {
        this
            .body
            .current
            .addEventListener('scroll', this.onScroll)
    }

    removeScrollEventListener () {
        this
            .body
            .current
            .removeEventListener('scroll', this.onScroll)
    }

    scroll (target, duration = DEFAULT_SCROLL_DURATION, opts) {
        const node = this.body.current
        node && $(node).scrollTo(target, duration, opts)
    }

    scrollToTop (duration, opts) {
        this.scroll(0, duration, opts)
    }
    
    scrollToBottom (duration, opts) {
        this.scroll('max', duration, opts)
    }

    render () {
        const {
            maxBodyHeight,
            isScrollToTopBtnShowed
        } = this.state

        const {
            title,

            isOpen,
            hasCloseBtn,
            isCloseBtnDisabled,

            className,
            headerClassName,
            bodyClassName,
            footerClassName,

            renderHeader,
            renderFooter,
            renderHeaderButton
        } = this.props

        return (
            <BootstrapModal
                isOpen={isOpen}
                backdrop='static'
                toggle={this.onClose}
                onOpened={this.onOpened}
                className={cn('Modal', className)}>
                <div ref={this.header}>
                    <ModalHeader
                        toggle={hasCloseBtn && this.onClose}
                        className={cn('Modal-Header', headerClassName)}
                        close={hasCloseBtn ? (
                            renderHeaderButton ? renderHeaderButton() : (
                                <div
                                    className={cn(
                                        'btn',
                                        'Modal-CloseBtn',
                                        isCloseBtnDisabled && 'disabled'
                                    )}
                                    onClick={this.onClose}>
                                    <Cross className='Modal-CloseIcon'/>
                                </div>
                            )
                        ) : null}>
                        {renderHeader ? renderHeader(title) : title}
                    </ModalHeader>
                </div>
                <div
                    ref={this.body}
                    style={maxBodyHeight ? {maxHeight: maxBodyHeight, overflowY: 'auto'} : {}}
                    className={cn('modal-body Modal-Body', bodyClassName)}>
                    {this.props.children}
                </div>
                <div
                    ref={this.footer}
                    className='Modal-FooterWrapper'>
                    <ModalFooter className={cn('Modal-Footer', footerClassName)}>
                        {renderFooter ? renderFooter() : null}
                    </ModalFooter>
                    {isScrollToTopBtnShowed && (
                        <a
                            className="Modal-ScrollToTop"
                            title='Back to Top'
                            onClick={this.onScrollToTop}>
                            <ArrowTop className="Modal-ScrollToTopIcon"/>
                        </a>
                    )}
                </div>
            </BootstrapModal>
        )
    }
}