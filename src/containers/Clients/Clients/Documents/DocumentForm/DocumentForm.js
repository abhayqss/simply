import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import cn from 'classnames'
import {Form, Col, Row} from 'reactstrap'

import './DocumentForm.scss'

import FileField from 'components/Form/FileField/FileField'
import RadioGroupField from 'components/Form/RadioGroupField/RadioGroupField'

import * as clientDocumentFormActions from 'redux/client/document/form/clientDocumentFormActions'

const SHARING_OPTIONS = [
    {value: 'MY_COMPANY', label: 'Share with EMTest_21250'},
    {value: 'ALL', label: 'Share with all'},
]

function mapStateToProps (state) {
    const { form } = state.client.document

    return {
        error: form.error,
        fields: form.fields,
        isValid: form.isValid,
        isFetching: form.isFetching
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(clientDocumentFormActions, dispatch)
        }
    }
}

class DocumentForm extends Component {

    componentWillUnmount = () => {
        this.clear()
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

    clear () {
        this.props.actions.clear()
    }

    render () {
        const {
            fields,
            className
        } = this.props

        const {
            document,
            documentHasError,
            documentErrorText,

            sharingOption,
            sharingOptionHasError,
            sharingOptionErrorText
        } = fields
        return (
            <Form className={cn('DocumentForm', className)}>
                <div className='DocumentForm-Section'>
                    <Row className="margin-bottom-20">
                        <Col md={8}>
                            <FileField
                                name='document'
                                value={document && (document.name || '')}
                                label='Choose document'
                                className='DocumentForm-FileField'
                                hasError={documentHasError}
                                errorText={documentErrorText}
                                hasHint={true}
                                hintText={'Supported file types: Word, PDF, Excel, TXT, JPEG, GIF, PNG, TIFF | Max 20 mb'}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <RadioGroupField
                                className="DocumentForm-RadioGroupField"
                                name="sharingOption"
                                selected={sharingOption}
                                hasError={sharingOptionHasError}
                                errorText={sharingOptionErrorText}
                                options={SHARING_OPTIONS}
                                onChange={this.onChangeField}
                            />
                        </Col>
                    </Row>
                </div>
            </Form>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentForm)