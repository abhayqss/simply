import List from './list/ReportGroupListInitialState'

const { Record } = require('immutable')

export default Record({
    list: new List()
})