import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/CommunityService'

const {
    DOWNLOAD_COMMUNITY_LOGO_REQUEST,
    DOWNLOAD_COMMUNITY_LOGO_SUCCESS,
    DOWNLOAD_COMMUNITY_LOGO_FAILURE,
} = ACTION_TYPES

export function download (orgId, commId) {
    return dispatch => {
        dispatch({ type: DOWNLOAD_COMMUNITY_LOGO_REQUEST })

        return service.downloadLogo(orgId, commId).then(response => {
            const { data, mediaType } = response

            dispatch({
                type: DOWNLOAD_COMMUNITY_LOGO_SUCCESS,
                payload: { data, orgId, commId, mediaType }
            })
        }).catch(e => {
            dispatch({ type: DOWNLOAD_COMMUNITY_LOGO_FAILURE, payload: e })
        })
    }
}

