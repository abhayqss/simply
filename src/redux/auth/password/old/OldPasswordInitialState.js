import Form from './form/OldPasswordFormInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    form: new Form()
})

export default InitialState