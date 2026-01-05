import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/CareTeamMemberService'

const {
    CLEAR_CARE_CLIENT_DETAILS,
    CLEAR_CARE_CLIENT_DETAILS_ERROR,

    LOAD_CARE_CLIENT_DETAILS_REQUEST,
    LOAD_CARE_CLIENT_DETAILS_SUCCESS,
    LOAD_CARE_CLIENT_DETAILS_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_CARE_CLIENT_DETAILS
    }
}

export function clearError () {
    return {
        type: CLEAR_CARE_CLIENT_DETAILS_ERROR
    }
}

export function load (contactId) {
    return dispatch => {
        dispatch({ type: LOAD_CARE_CLIENT_DETAILS_REQUEST })
        return service.findById(contactId).then(response => {
            const { data } = response
            dispatch({ type: LOAD_CARE_CLIENT_DETAILS_SUCCESS, payload: data })
            return data
        }).catch((e) => {
            dispatch({ type: LOAD_CARE_CLIENT_DETAILS_FAILURE, payload: e })
        })
    }
}
