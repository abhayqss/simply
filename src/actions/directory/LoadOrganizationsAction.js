import Factory from '../ActionFactory'

import * as actions from 'redux/directory/organization/list/organizationListActions'

export default Factory(actions, {
    action: (params, actions) => actions.load()
})