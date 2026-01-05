import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

const {
    CLEAR_MARKETPLACE_COMMUNITY_FILTER,
    CHANGE_MARKETPLACE_COMMUNITY_FILTER_FIELD,
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_MARKETPLACE_COMMUNITY_FILTER }
}

export function changeField (field, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_MARKETPLACE_COMMUNITY_FILTER_FIELD,
                payload: { field, value }
            })
        })
    }
}
