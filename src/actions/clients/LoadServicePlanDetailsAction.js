import Factory from '../ActionFactory'

import * as actions from 'redux/client/servicePlan/details/servicePlanDetailsActions'

export default Factory(actions, {
    action: ({ clientId, planId }, actions) => actions.load(clientId, planId)
})