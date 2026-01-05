import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ContactService'

import { defer } from 'lib/utils/Utils'

const {
    CLEAR_CONTACT_LIST_ERROR,

    CLEAR_CONTACT_LIST,
    CLEAR_CONTACT_LIST_FILTER,
    CHANGE_CONTACT_LIST_FILTER,
    CHANGE_CONTACT_LIST_FILTER_FIELD,

    LOAD_CONTACT_LIST_REQUEST,
    LOAD_CONTACT_LIST_SUCCESS,
    LOAD_CONTACT_LIST_FAILURE,
    CHANGE_CONTACT_LIST_SORTING
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CONTACT_LIST }
}

export function clearError () {
    return { type: CLEAR_CONTACT_LIST_ERROR }
}

export function sort (field, order, shouldReload) {
    return {
        type: CHANGE_CONTACT_LIST_SORTING,
        payload: { field, order, shouldReload }
    }
}

export function clearFilter () {
    return { type: CLEAR_CONTACT_LIST_FILTER }
}

export function changeFilter (changes, shouldReload) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CONTACT_LIST_FILTER,
                payload: { changes, shouldReload }
            })
        })
    }
}

export function changeFilterField (name, value, shouldReload) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_CONTACT_LIST_FILTER_FIELD,
                payload: { name, value, shouldReload }
            })
        })
    }
}

export function load (config) {
    return dispatch => {
        dispatch({ type: LOAD_CONTACT_LIST_REQUEST, payload: config.page })
        return service.find(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response

            dispatch({
                type: LOAD_CONTACT_LIST_SUCCESS,
                payload: { data, page, size, totalCount }
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_CONTACT_LIST_FAILURE, payload: e })
        })
    }
}

