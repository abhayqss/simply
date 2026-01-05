import List from './list/CareLevelListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
})

export default InitialState