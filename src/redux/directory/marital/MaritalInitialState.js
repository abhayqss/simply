import Status from './status/MaritalStatusInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    status: new Status(),
})

export default InitialState