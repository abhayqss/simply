import Factory from '../ActionFactory'

import * as actions from 'redux/directory/gender/list/genderListActions'

export default Factory(actions, {
    action: (params, actions) => actions.load()
})