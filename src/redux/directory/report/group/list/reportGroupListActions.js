import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_REPORT_GROUP_LIST,
    LOAD_REPORT_GROUP_LIST_REQUEST,
    LOAD_REPORT_GROUP_LIST_SUCCESS,
    LOAD_REPORT_GROUP_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_REPORT_GROUP_LIST }
}

export function load () {
    return dispatch => {
        dispatch({ type: LOAD_REPORT_GROUP_LIST_REQUEST })

        return service.findReportGroups().then(response => {
            const { data } = response

            dispatch({
                type: LOAD_REPORT_GROUP_LIST_SUCCESS,
                payload: data
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_REPORT_GROUP_LIST_FAILURE, payload: e })
        })
    }
}

