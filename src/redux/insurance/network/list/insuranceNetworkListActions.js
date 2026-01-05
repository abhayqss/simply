import { ACTION_TYPES } from 'lib/Constants'

import { defer } from 'lib/utils/Utils'

import service from 'services/InsuranceNetworkController'

const {
    CLEAR_INSURANCE_NETWORK_LIST,

    CLEAR_INSURANCE_NETWORK_LIST_FILTER,
    CHANGE_INSURANCE_NETWORK_LIST_FILTER,
    CHANGE_INSURANCE_NETWORK_LIST_FILTER_FIELD,

    LOAD_INSURANCE_NETWORK_LIST_REQUEST,
    LOAD_INSURANCE_NETWORK_LIST_SUCCESS,
    LOAD_INSURANCE_NETWORK_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_INSURANCE_NETWORK_LIST }
}

export function clearFilter () {
    return { type: CLEAR_INSURANCE_NETWORK_LIST_FILTER }
}

export function changeFilterField (name, value, shouldReload) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_INSURANCE_NETWORK_LIST_FILTER_FIELD,
                payload: { name, value, shouldReload }
            })
        })
    }
}

export function changeFilter (changes, shouldReload) {
    return {
        type: CHANGE_INSURANCE_NETWORK_LIST_FILTER,
        payload: { changes, shouldReload }
    }
}

export function load (params) {
    return dispatch => {
        dispatch({ type: LOAD_INSURANCE_NETWORK_LIST_REQUEST })

        return service.find(params).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_INSURANCE_NETWORK_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_INSURANCE_NETWORK_LIST_FAILURE, payload: e })
        })
    }
}