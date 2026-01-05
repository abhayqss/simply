import Location from './location/MarketplaceCommunityLocationInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    location: Location()
})

export default InitialState