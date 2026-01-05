import Group from './group/AgeGroupInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    group: new Group(),
})

export default InitialState