import List from './list/CommunityListInitialState'
import Type from './type/CommunityTypeInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    type: new Type(),
})

export default InitialState