import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ClientService'
import { defer } from "lib/utils/Utils";

const {
    CLEAR_CLIENT_LIST_ERROR,

    CLEAR_CLIENT_LIST,
    CLEAR_CLIENT_LIST_FILTER,
    CHANGE_CLIENT_LIST_FILTER,
    CHANGE_CLIENT_LIST_FILTER_FIELD,

    LOAD_CLIENT_LIST_REQUEST,
    LOAD_CLIENT_LIST_SUCCESS,
    LOAD_CLIENT_LIST_FAILURE,
    CHANGE_CLIENT_LIST_SORTING
} = ACTION_TYPES

export function clear (shouldReload) {
    return { type: CLEAR_CLIENT_LIST, payload: shouldReload }
}

export function clearError () {
    return { type: CLEAR_CLIENT_LIST_ERROR }
}

export function sort (field, order, shouldReload) {
    return {
        type: CHANGE_CLIENT_LIST_SORTING,
        payload: { field, order, shouldReload }
    }
}

export function clearFilter (shouldReload) {
    return { type: CLEAR_CLIENT_LIST_FILTER, payload: shouldReload }
}

export function changeFilter (changes, shouldReload) {
    return {
        type: CHANGE_CLIENT_LIST_FILTER,
        payload: { changes, shouldReload }
    }
}

export function changeFilterField (name, value, shouldReload) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CLIENT_LIST_FILTER_FIELD,
                payload: { name, value, shouldReload }
            })
        })
    }
}

export function load (config) {

    return dispatch => {
        dispatch({ type: LOAD_CLIENT_LIST_REQUEST, payload: config.page })
        return service.find(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response

            dispatch({
                type: LOAD_CLIENT_LIST_SUCCESS,
                payload: { data, page, size, totalCount }
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_CLIENT_LIST_FAILURE, payload: e })
        })
    }
}

