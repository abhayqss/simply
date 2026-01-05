import Network from './network/InsuranceNetworkInitialState'

const { Record } = require('immutable')

export default Record({
    network: Network()
})