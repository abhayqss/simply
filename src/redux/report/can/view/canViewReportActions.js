import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/ReportService'

const {
    CLEAR_CAN_ADD_REPORT,
    CLEAR_CAN_ADD_REPORT_ERROR,
    LOAD_CAN_ADD_REPORT_REQUEST,
    LOAD_CAN_ADD_REPORT_SUCCESS,
    LOAD_CAN_ADD_REPORT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CAN_ADD_REPORT }
}

export function clearError () {
    return { type: CLEAR_CAN_ADD_REPORT_ERROR }
}

export function load () {
    return dispatch => {
        dispatch({ type: LOAD_CAN_ADD_REPORT_REQUEST })
        return service.canView().then(response => {
            dispatch({ type: LOAD_CAN_ADD_REPORT_SUCCESS, payload: response.data })
            return response
        }).catch(e => {
            dispatch({ type: LOAD_CAN_ADD_REPORT_FAILURE, payload: e })
        })
    }
}
