import Factory from '../ActionFactory'

import * as actions from 'redux/client/assessment/count/assessmentCountActions'

export default Factory(actions, {
    action: ({ clientId }, actions) => actions.load(clientId)
})