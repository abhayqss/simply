import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/CommunityService'

const {
    CLEAR_COMMUNITY_COUNT,
    CLEAR_COMMUNITY_COUNT_ERROR,
    LOAD_COMMUNITY_COUNT_REQUEST,
    LOAD_COMMUNITY_COUNT_SUCCESS,
    LOAD_COMMUNITY_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_COMMUNITY_COUNT }
}

export function clearError () {
    return { type: CLEAR_COMMUNITY_COUNT_ERROR }
}

export function load (orgId) {
    return dispatch => {
        dispatch({ type: LOAD_COMMUNITY_COUNT_REQUEST })
        return service.count(orgId).then(response => {
            dispatch({ type: LOAD_COMMUNITY_COUNT_SUCCESS, payload: response.data })
        }).catch(e => {
            dispatch({ type: LOAD_COMMUNITY_COUNT_FAILURE, payload: e })
        })
    }
}
