import List from './list/ServiceListInitialState'

const { Record } = require('immutable')

export default Record({
    list: new List()
})