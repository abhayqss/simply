import Factory from '../ActionFactory'

import * as actions from 'redux/client/servicePlan/count/servicePlanCountActions'

export default Factory(actions, {
    action: ({ clientId }, actions) => actions.load(clientId)
})