import Form from './form/CreateFormInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    form: new Form()
})

export default InitialState