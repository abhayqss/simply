import Status from './status/ContactStatusInitialState'

const { Record } = require('immutable')

export default Record({
    status: new Status()
})