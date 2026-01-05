import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/AssessmentService'

const {
    CLEAR_ASSESSMENT_LIST_ERROR,

    CLEAR_ASSESSMENT_LIST,
    CLEAR_ASSESSMENT_LIST_FILTER,
    CHANGE_ASSESSMENT_LIST_FILTER,

    LOAD_ASSESSMENT_LIST_REQUEST,
    LOAD_ASSESSMENT_LIST_SUCCESS,
    LOAD_ASSESSMENT_LIST_FAILURE,

    CHANGE_ASSESSMENT_LIST_SORTING
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_ASSESSMENT_LIST }
}

export function clearError () {
    return { type: CLEAR_ASSESSMENT_LIST_ERROR }
}

export function sort (field, order) {
    return {
        type:  CHANGE_ASSESSMENT_LIST_SORTING,
        payload: { field, order }
    }
}

export function clearFilter () {
    return { type: CLEAR_ASSESSMENT_LIST_FILTER }
}

export function changeFilter (changes, shouldReload) {
    return {
        type: CHANGE_ASSESSMENT_LIST_FILTER,
        payload: { changes, shouldReload }
    }
}

export function load (config) {

    return dispatch => {
        dispatch({ type: LOAD_ASSESSMENT_LIST_REQUEST, payload: config.page })
        return service.find(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response

            dispatch({
                type: LOAD_ASSESSMENT_LIST_SUCCESS,
                payload: { data, page, size, totalCount }
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_ASSESSMENT_LIST_FAILURE, payload: e })
        })
    }
}

