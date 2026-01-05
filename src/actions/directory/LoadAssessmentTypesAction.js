import Factory from '../ActionFactory'

import * as actions from 'redux/directory/assessment/type/list/assessmentTypeListActions'

export default Factory(actions, {
    action: (params, actions) => actions.load(params)
})