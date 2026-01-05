import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/CommunityService'

const {
    CLEAR_CAN_ADD_COMMUNITY,
    CLEAR_CAN_ADD_COMMUNITY_ERROR,
    LOAD_CAN_ADD_COMMUNITY_REQUEST,
    LOAD_CAN_ADD_COMMUNITY_SUCCESS,
    LOAD_CAN_ADD_COMMUNITY_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CAN_ADD_COMMUNITY }
}

export function clearError () {
    return { type: CLEAR_CAN_ADD_COMMUNITY_ERROR }
}

export function load (orgId) {
    return dispatch => {
        dispatch({ type: LOAD_CAN_ADD_COMMUNITY_REQUEST })
        return service.canAdd(orgId).then(response => {
            dispatch({ type: LOAD_CAN_ADD_COMMUNITY_SUCCESS, payload: response.data })
            return response
        }).catch(e => {
            dispatch({ type: LOAD_CAN_ADD_COMMUNITY_FAILURE, payload: e })
        })
    }
}
