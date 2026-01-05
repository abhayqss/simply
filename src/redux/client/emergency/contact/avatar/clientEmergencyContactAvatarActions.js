import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/AvatarService'

const {
    DOWNLOAD_CLIENT_EMERGENCY_CONTACT_AVATAR_REQUEST,
    DOWNLOAD_CLIENT_EMERGENCY_CONTACT_AVATAR_SUCCESS,
    DOWNLOAD_CLIENT_EMERGENCY_CONTACT_AVATAR_FAILURE,
} = ACTION_TYPES

export function download ({ contactId, avatarId }) {
    return dispatch => {
        dispatch({ type: DOWNLOAD_CLIENT_EMERGENCY_CONTACT_AVATAR_REQUEST })

        return service.findById(avatarId).then(response => {
            const { data, mediaType } = response

            dispatch({
                type: DOWNLOAD_CLIENT_EMERGENCY_CONTACT_AVATAR_SUCCESS,
                payload: { data, contactId, mediaType }
            })
        }).catch(e => {
            dispatch({ type: DOWNLOAD_CLIENT_EMERGENCY_CONTACT_AVATAR_FAILURE, payload: e })
        })
    }
}

