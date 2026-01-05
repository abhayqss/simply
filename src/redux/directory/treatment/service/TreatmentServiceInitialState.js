import List from './list/TreatmentServiceListInitialState'

const { Record } = require('immutable')

export default Record({
    list: List()
})