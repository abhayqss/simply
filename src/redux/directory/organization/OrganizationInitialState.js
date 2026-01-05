import List from './list/OrganizationListInitialState'
import Type from './type/OrganizationTypeInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new List(),
    type: new Type(),
})

export default InitialState