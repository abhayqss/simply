import Community from './community/MarketplaceCommunityInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    community: new Community()
})

export default InitialState