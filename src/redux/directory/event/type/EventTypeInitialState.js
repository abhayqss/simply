import List from './list/EventTypeListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
})

export default InitialState