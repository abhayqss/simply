import Factory from '../ActionFactory'

import * as actions from 'redux/directory/insurance/network/list/insuranceNetworkListActions'

export default Factory(actions, {
    action: (params, actions) => actions.load(params)
})