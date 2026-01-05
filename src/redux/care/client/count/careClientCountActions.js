import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/CareTeamMemberService'

const {
    CLEAR_CARE_CLIENT_COUNT,
    CLEAR_CARE_CLIENT_COUNT_ERROR,
    LOAD_CARE_CLIENT_COUNT_REQUEST,
    LOAD_CARE_CLIENT_COUNT_SUCCESS,
    LOAD_CARE_CLIENT_COUNT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CARE_CLIENT_COUNT }
}

export function clearError () {
    return { type: CLEAR_CARE_CLIENT_COUNT_ERROR }
}

export function load (receiverId) {
    return dispatch => {
        dispatch({ type: LOAD_CARE_CLIENT_COUNT_REQUEST })
        return service.count(receiverId).then(response => {
            dispatch({ type: LOAD_CARE_CLIENT_COUNT_SUCCESS, payload: response.data })
        }).catch(e => {
            dispatch({ type: LOAD_CARE_CLIENT_COUNT_FAILURE, payload: e })
        })
    }
}
