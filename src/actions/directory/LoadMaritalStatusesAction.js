import Factory from '../ActionFactory'

import * as actions from 'redux/directory/marital/status/list/maritalStatusListActions'

export default Factory(actions, {
    action: (params, actions) => actions.load()
})