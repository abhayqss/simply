import { saveAs } from 'file-saver'

import service from 'services/ReportService'

import { ACTION_TYPES } from 'lib/Constants'

const {
    CLEAR_REPORT_DOCUMENT,
    CLEAR_REPORT_DOCUMENT_ERROR,
    DOWNLOAD_REPORT_DOCUMENT_REQUEST,
    DOWNLOAD_REPORT_DOCUMENT_SUCCESS,
    DOWNLOAD_REPORT_DOCUMENT_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_REPORT_DOCUMENT }
}

export function clearError () {
    return { type: CLEAR_REPORT_DOCUMENT_ERROR }
}

export function download (params) {
    return dispatch => {
        dispatch({ type: DOWNLOAD_REPORT_DOCUMENT_REQUEST })

        return service.download(params).then(({ name, data }) => {
            dispatch({ type: DOWNLOAD_REPORT_DOCUMENT_SUCCESS })

            saveAs(data, name)

            return { success: true, name }
        }).catch(e => {
            dispatch({ type: DOWNLOAD_REPORT_DOCUMENT_FAILURE, payload: e })
        })
    }
}

