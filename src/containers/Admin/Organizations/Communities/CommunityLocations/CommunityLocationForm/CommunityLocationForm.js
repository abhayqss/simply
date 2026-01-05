import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import cn from 'classnames'
import PropTypes from 'prop-types'
import {Form, Col, Row} from 'reactstrap'

import * as communityLocationFormActions from 'redux/community/location/form/communityLocationFormActions'

import TextField from 'components/Form/TextField/TextField'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import './CommunityLocationForm.scss'

function mapStateToProps (state) {
    return {
        error: state.community.location.form.error,
        fields: state.community.location.form.fields,
        isValid: state.community.location.form.isValid,
        isFetching: state.community.location.form.isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(communityLocationFormActions, dispatch)
        }
    }
}

class CommunityLocationForm extends Component {

    static propTypes = {
        communityLocationId: PropTypes.number
    }

    componentDidMount () {
    }

    onChangeField = (field, value) => {
        const {actions} = this.props

        actions.changeField(field, value).then(() => {
            if (!this.props.isValid) this.validate()
        })
    }

    validate () {
        const data = this.props.fields.toJS()
        return this.props.actions.validate(data)
    }

    render () {

        const {
            error,
            fields,
            isValid,
            isFetching,
            className
        } = this.props

        const {
            name,
            nameHasError,
            nameErrorText,

            zone,
            zoneHasError,
            zoneErrorText,

            locationEnabled,
            locationEnabledHasError,
            locationEnabledErrorText,
        } = fields

        return (
            <Form className={cn('CommunityLocationForm', className)}>
                <div className="CommunityLocationForm-Section">
                    <Row>
                        <Col md={8}>
                            <TextField
                                type="text"
                                name="name"
                                value={name}
                                label="Name*"
                                className="CommunityLocationForm-TextField"
                                hasError={nameHasError}
                                errorText={nameErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                        <Col md={4}>
                            <TextField
                                type="text"
                                name="zone"
                                value={zone}
                                label="Zone*"
                                className="CommunityLocationForm-TextField"
                                hasError={zoneHasError}
                                errorText={zoneErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={4}>
                            <CheckboxField
                                name="locationEnabled"
                                value={locationEnabled}
                                label="Enabled"
                                className="CommunityLocationForm-CheckboxField"
                                hasError={locationEnabledHasError}
                                errorText={locationEnabledErrorText}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommunityLocationForm)