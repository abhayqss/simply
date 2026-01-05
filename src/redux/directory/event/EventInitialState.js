import Type from './type/EventTypeInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    type: new Type(),
})

export default InitialState