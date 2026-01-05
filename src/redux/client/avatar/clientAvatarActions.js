import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/AvatarService'

const {
    DOWNLOAD_CLIENT_AVATAR_REQUEST,
    DOWNLOAD_CLIENT_AVATAR_SUCCESS,
    DOWNLOAD_CLIENT_AVATAR_FAILURE,
} = ACTION_TYPES

export function download ({ clientId, avatarId }) {
    return dispatch => {
        dispatch({ type: DOWNLOAD_CLIENT_AVATAR_REQUEST })

        return service.findById(avatarId).then(response => {
            const { data, mediaType } = response

            dispatch({
                type: DOWNLOAD_CLIENT_AVATAR_SUCCESS,
                payload: { data, clientId, mediaType }
            })
        }).catch(e => {
            dispatch({ type: DOWNLOAD_CLIENT_AVATAR_FAILURE, payload: e })
        })
    }
}

