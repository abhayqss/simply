import Network from './network/InsuranceNetworkInitialState'
import Payment from './payment/InsurancePaymentInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    network: Network(),
    payment: Payment()
})

export default InitialState