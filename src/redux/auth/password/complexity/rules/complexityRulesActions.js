import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/AuthService'

const {
    CLEAR_COMPLEXITY_RULES,
    CLEAR_COMPLEXITY_RULES_ERROR,

    LOAD_COMPLEXITY_RULES_REQUEST,
    LOAD_COMPLEXITY_RULES_SUCCESS,
    LOAD_COMPLEXITY_RULES_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_COMPLEXITY_RULES
    }
}

export function clearError () {
    return {
        type: CLEAR_COMPLEXITY_RULES_ERROR
    }
}

export function load (params) {
    return dispatch => {
        dispatch({ type: LOAD_COMPLEXITY_RULES_REQUEST })
        return service.findPasswordComplexityRules(params).then(response => {
            const { data } = response
            dispatch({ type: LOAD_COMPLEXITY_RULES_SUCCESS, payload: data })
            return data
        }).catch((e) => {
            dispatch({ type: LOAD_COMPLEXITY_RULES_FAILURE, payload: e })
        })
    }
}