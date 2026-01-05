import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {Form, Col, Row} from 'reactstrap'

import * as communityDeviceTypeFormActions from 'redux/community/deviceType/form/communityDeviceTypeFormActions'
import * as communityDeviceTypeDetailsActions from 'redux/community/deviceType/details/communityDeviceTypeDetailsActions'

import Loader from 'components/Loader/Loader'
import TextField from 'components/Form/TextField/TextField'
import SelectField from 'components/Form/SelectField/SelectField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import { isEmpty } from 'lib/utils/Utils'

import './CommunityDeviceTypeForm.scss'

function mapStateToProps (state) {
    return {
        error: state.community.deviceType.form.error,
        fields: state.community.deviceType.form.fields,
        isValid: state.community.deviceType.form.isValid,
        isFetching: state.community.deviceType.form.isFetching,

        details: state.community.deviceType.details
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(communityDeviceTypeFormActions, dispatch),

            details: bindActionCreators(communityDeviceTypeDetailsActions, dispatch),
        }
    }
}

class CommunityDeviceTypeForm extends Component {

    static propTypes = {
        communityDeviceTypeId: PropTypes.number
    }

    componentDidMount () {
        const { actions, communityDeviceTypeId } = this.props

        actions.details.load(communityDeviceTypeId + '')
    }

    onChangeField = (field, value) => {
        const { actions } = this.props

        actions.changeField(field, value).then(() => {
            if (!this.props.isValid) this.validate()
        })
    }

    validate () {
        const data = this.props.fields.toJS()
        return this.props.actions.validate(data)
    }

    isLoading () {
        const { isFetching, shouldReload } = this.props.details

        return isFetching || shouldReload
    }


    render () {

        const {
            error,
            fields,
            details,
            isValid,
            isFetching,
            className
        } = this.props

        const {
            workflow,
            workflowHasError,
            workflowErrorText,

            autoCloseInterval,
            autoCloseIntervalHasError,
            autoCloseIntervalErrorText,

            deviceEnabled,
            deviceEnabledHasError,
            deviceEnabledErrorText,
        } = fields

        let content = null

        if (this.isLoading()) {
            content = (
                <Loader/>
            )
        }

        else if (isEmpty(details.data)) {
            content = (
                <h4>No Data</h4>
            )
        }
        else {
            const { type } = details.data
            content = (
                <div className='CommunityDeviceTypeForm-Section'>
                    <Row>
                        <Col md={6}>
                            <TextField
                                isDisabled={true}
                                type='text'
                                name='type'
                                value={type}
                                label='Type*'
                                className='CommunityDeviceTypeForm-TextField'
                                hasError={false}
                                errorText={''}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={6}>
                            <SelectField
                                type='text'
                                name='workflow'
                                options={[]}
                                label='Workflow*'
                                value={workflow}
                                defaultText={'No action'}
                                className='CommunityDeviceTypeForm-TextField'
                                hasError={workflowHasError}
                                errorText={workflowErrorText}
                                isMultiple={false}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3}>
                            <SelectField
                                type='text'
                                name='autoCloseInterval'
                                options={[]}
                                value={autoCloseInterval}
                                label='Auto Close Interval*'
                                isMultiple={false}
                                defaultText={'1 hour'}
                                className='CommunityDeviceTypeForm-TextField'
                                hasError={autoCloseIntervalHasError}
                                errorText={autoCloseIntervalErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <CheckboxField
                                name="deviceEnabled"
                                value={deviceEnabled}
                                label={'Device Enabled'}
                                className="CommunityDeviceTypeForm-CheckboxField"
                                hasError={deviceEnabledHasError}
                                errorText={deviceEnabledErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
            )
        }
        return (
            <Form className={cn('CommunityDeviceTypeForm', className)}>
                {content}
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityDeviceTypeForm)