import Status from './status/ClientStatusInitialState'

const { Record } = require('immutable')

export default Record({
    status: Status()
})