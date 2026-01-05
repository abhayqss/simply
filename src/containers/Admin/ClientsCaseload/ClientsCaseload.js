import React, {Component} from 'react'

import cn from 'classnames'

import {connect} from 'react-redux'
import {Redirect} from 'react-router'
import {bindActionCreators} from 'redux'

import {Button} from 'reactstrap'

import * as sideBarActions from 'redux/sidebar/sideBarActions'
import * as caseloadFormActions from 'redux/client/caseload/form/caseloadFormActions'

import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs'

import {path} from 'lib/utils/ContextUtils'

import {getSideBarItems} from '../SideBarItems'

import './ClientsCaseload.scss'

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            sidebar: bindActionCreators(sideBarActions, dispatch),

            caseload: bindActionCreators(caseloadFormActions, dispatch),

        },
    }
}

class ClientsCaseload extends Component {
    state = {
        isEditorOpen: false
    }

    componentDidMount() {
        this.updateSideBar()
    }

    componentDidUpdate() {
        if (this.props.shouldReload) {
            this.refresh()
        }
    }

    onRefresh = page => {
        this.refresh(page)
    }

    onCreateCaseload = () => {
        const {actions} = this.props
        actions.caseload.addCaseload()
        this.setState({ isEditorOpen: true })
    }

    updateSideBar() {
        this.props.actions.sidebar.update({ items: getSideBarItems() })
    }
    render() {
        const { isEditorOpen } = this.state

        if (isEditorOpen) {
            return (
                <Redirect
                    to={{
                        state: { isEditorOpen: true },
                        pathname: path('clients'),
                    }}
                />
            )
        }

        return (
            <div className={cn('Caseload')}>
                <Breadcrumbs
                    items={[
                        {title: 'Admin', href:'/admin/clients-caseload'},
                        {title: 'Clients Caseload', href: '/admin/clients-caseload', isActive: true},
                    ]}
                />
                <div className="CaseloadList-Caption">
                    <div className="flex-2">
                        <div className="CaseloadList-Title Table-Title">
                            Clients Caseload
                        </div>
                    </div>
                    <div className="flex-4 text-right">
                        <Button
                            color='success'
                            className="AddCaseloadBtn"
                            onClick={this.onCreateCaseload}>
                            Create Caseload
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientsCaseload)
