import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ReportService'

const {
    CLEAR_REPORT_LIST_ERROR,

    CLEAR_REPORT_LIST,
    CLEAR_REPORT_LIST_FILTER,
    CHANGE_REPORT_LIST_FILTER,
    CHANGE_REPORT_LIST_FILTER_FIELD,

    LOAD_REPORT_LIST_REQUEST,
    LOAD_REPORT_LIST_SUCCESS,
    LOAD_REPORT_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_REPORT_LIST }
}

export function clearError () {
    return { type: CLEAR_REPORT_LIST_ERROR }
}

export function clearFilter () {
    return { type: CLEAR_REPORT_LIST_FILTER }
}

export function changeFilter (changes) {
    return {
        type: CHANGE_REPORT_LIST_FILTER,
        payload: changes
    }
}

export function changeFilterField (name, value) {
    return {
        type: CHANGE_REPORT_LIST_FILTER_FIELD,
        payload: { name, value }
    }
}

