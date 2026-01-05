import React, { Component, } from 'react'

import cn from 'classnames'
import { map, first } from 'underscore'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { withRouter } from 'react-router-dom'

import { Form } from 'reactstrap'

import 'components/InfoHint/InfoHint.scss'

import Loader from 'components/Loader/Loader'
import RadioGroupField from 'components/Form/RadioGroupField/RadioGroupField'

import './AssessmentTypeForm.scss'

import * as assessmentFormActions from 'redux/client/assessment/form/assessmentFormActions'

import { isEmpty, isNotEmpty } from 'lib/utils/Utils'

function mapStateToProps (state) {
    return {
        fields: state.client.assessment.form.fields,
        types: state.directory.assessment.type.list
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(assessmentFormActions, dispatch)
        }
    }
}

class AssessmentTypeForm extends Component {
    componentDidMount () {
        if (isNotEmpty(this.types)) {
            if (!this.data.typeId) {
                this.changeField('typeId', first(
                    first(this.types).types
                ).id)
            }
        }
    }

    componentDidUpdate (prevProps) {
        if (isNotEmpty(this.types)) {
            if (isEmpty(prevProps.types.dataSource.data)) {
                if (!this.data.typeId) {
                    this.changeField('typeId', first(
                        first(this.types).types
                    ).id)
                }
            }
        }
    }

    onChangeField = (name, value) => {
        this.changeField(name, value)
    }

    onDeleteRow = () => {
        alert("Deleted")
    }

    get actions () {
        return this.props.actions
    }

    get clientId () {
        return +(
            this.props
                .match
                .params
                .clientId
        )
    }

    get types () {
        return (
            this.props
                .types
                .dataSource
                .data
        )
    }

    get data () {
        return this.props.fields.toJS()
    }

    changeField (name, value) {
        this.actions.changeField(name, value)
    }

    changeFields (changes) {
        this.actions.changeFields(changes)
    }

    render () {
        const {
            isFetching,
            dataSource: ds
        } = this.props.types

        return (
            <Form className="AssessmentTypeForm">
                {isFetching ? (
                    <Loader/>
                ) : map(ds.data, group => (
                    <div key={group.id} className='AssessmentTypeForm-Section'>
                        <div className='AssessmentTypeForm-SectionTitle'>
                            {group.title}
                        </div>
                        <RadioGroupField
                            name='typeId'
                            selected={this.data.typeId}
                            className='AssessmentTypeForm-RadioGroupField'
                            options={map(group.types, o => ({
                                label: o.title,
                                value: o.id
                            }))}
                            onChange={this.onChangeField}
                        />
                    </div>
                ))}
            </Form>
        )
    }
}

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(AssessmentTypeForm)
)