import List from './list/ClientStatusListInitialState'

const { Record } = require('immutable')

export default Record({
    list: List()
})