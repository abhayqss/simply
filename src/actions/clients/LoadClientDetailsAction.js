import Factory from '../ActionFactory'

import * as actions from 'redux/client/details/clientDetailsActions'

export default Factory(actions, {
    action: ({ clientId }, actions) => actions.load(clientId)
})