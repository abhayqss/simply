import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/CommunityLocationService'

const {
    CLEAR_COMMUNITY_LOCATION_COUNT,
    CLEAR_COMMUNITY_LOCATION_COUNT_ERROR,
    LOAD_COMMUNITY_LOCATION_COUNT_REQUEST,
    LOAD_COMMUNITY_LOCATION_COUNT_SUCCESS,
    LOAD_COMMUNITY_LOCATION_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_COMMUNITY_LOCATION_COUNT }
}

export function clearError () {
    return { type: CLEAR_COMMUNITY_LOCATION_COUNT_ERROR }
}

export function load (receiverId) {
    return dispatch => {
        dispatch({ type: LOAD_COMMUNITY_LOCATION_COUNT_REQUEST })
        return service.count(receiverId).then(response => {
            dispatch({ type: LOAD_COMMUNITY_LOCATION_COUNT_SUCCESS, payload: response.data })
            return response
        }).catch(e => {
            dispatch({ type: LOAD_COMMUNITY_LOCATION_COUNT_FAILURE, payload: e })
        })
    }
}
