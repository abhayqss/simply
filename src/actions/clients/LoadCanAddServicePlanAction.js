import Factory from '../ActionFactory'

import * as actions from 'redux/client/servicePlan/can/add/canAddServicePlanActions'

export default Factory(actions, {
    action: ({ userId }, actions) => actions.load(userId)
})