import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/OrganizationService'

const {
    DOWNLOAD_ORGANIZATION_LOGO_REQUEST,
    DOWNLOAD_ORGANIZATION_LOGO_SUCCESS,
    DOWNLOAD_ORGANIZATION_LOGO_FAILURE,
} = ACTION_TYPES

export function download (orgId) {
    return dispatch => {
        dispatch({ type: DOWNLOAD_ORGANIZATION_LOGO_REQUEST })

        return service.downloadLogo(orgId).then(response => {
            const { data, mediaType } = response

            dispatch({
                type: DOWNLOAD_ORGANIZATION_LOGO_SUCCESS,
                payload: { data, orgId, mediaType }
            })
        }).catch(e => {
            dispatch({ type: DOWNLOAD_ORGANIZATION_LOGO_FAILURE, payload: e })
        })
    }
}

