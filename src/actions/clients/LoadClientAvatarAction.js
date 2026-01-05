import Factory from '../ActionFactory'

import * as actions from 'redux/client/avatar/clientAvatarActions'

export default Factory(actions, {
    action: (params, actions) => actions.download(params)
})