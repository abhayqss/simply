import List from './list/CommunityListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
})

export default InitialState