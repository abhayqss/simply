import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_DIRECTORY_INSURANCE_NETWORK_LIST,

    LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_REQUEST,
    LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_SUCCESS,
    LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_DIRECTORY_INSURANCE_NETWORK_LIST }
}

export function load (params) {
    return dispatch => {
        dispatch({ type: LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_REQUEST })

        return service.findInsuranceNetworks(params).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_SUCCESS,
                payload: { data }
            })
        }).catch(e => {
            dispatch({ type: LOAD_DIRECTORY_INSURANCE_NETWORK_LIST_FAILURE, payload: e })
        })
    }
}