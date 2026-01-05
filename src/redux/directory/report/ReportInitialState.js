import Type from './type/ReportTypeInitialState'
import Group from './group/ReportGroupInitialState'

const { Record } = require('immutable')

export default Record({
    type: Type(),
    group: Group()
})