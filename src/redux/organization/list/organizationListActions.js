import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/OrganizationService'

const {
    CLEAR_ORGANIZATION_LIST_ERROR,

    CLEAR_ORGANIZATION_LIST,
    CLEAR_ORGANIZATION_LIST_FILTER,
    CHANGE_ORGANIZATION_LIST_FILTER,
    CHANGE_ORGANIZATION_LIST_FILTER_FIELD,

    CHANGE_ORGANIZATION_LIST_SORTING,

    LOAD_ORGANIZATION_LIST_REQUEST,
    LOAD_ORGANIZATION_LIST_SUCCESS,
    LOAD_ORGANIZATION_LIST_FAILURE
} = ACTION_TYPES

export function sort (field, order, shouldReload) {
    return {
        type: CHANGE_ORGANIZATION_LIST_SORTING,
        payload: { field, order, shouldReload }
    }
}

export function clear () {
    return { type: CLEAR_ORGANIZATION_LIST }
}

export function clearError () {
    return { type: CLEAR_ORGANIZATION_LIST_ERROR }
}

export function clearFilter (shouldReload) {
    return { type: CLEAR_ORGANIZATION_LIST_FILTER, payload: { shouldReload } }
}

export function changeFilterField (name, value, shouldReload) {
    return {
        type: CHANGE_ORGANIZATION_LIST_FILTER_FIELD,
        payload: { name, value, shouldReload }
    }
}

export function load (config) {
    return dispatch => {
        dispatch({ type: LOAD_ORGANIZATION_LIST_REQUEST, payload: config.page })
        return service.find(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response
            dispatch({
                type: LOAD_ORGANIZATION_LIST_SUCCESS,
                payload: { data, page, size, totalCount }
            })
        }).catch(e => {
            dispatch({ type: LOAD_ORGANIZATION_LIST_FAILURE, payload: e })
        })
    }
}

