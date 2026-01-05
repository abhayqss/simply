import Form from './form/ResetPasswordFormInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    form: Form()
})

export default InitialState