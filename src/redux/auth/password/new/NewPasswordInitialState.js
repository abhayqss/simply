import Form from './form/NewPasswordFormInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    form: new Form()
})

export default InitialState