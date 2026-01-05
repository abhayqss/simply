import Community from './community/MarketplaceCommunityInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    community: Community()
})

export default InitialState