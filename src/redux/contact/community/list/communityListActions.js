import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_CONTACT_COMMUNITY_LIST,
    LOAD_CONTACT_COMMUNITY_LIST_REQUEST,
    LOAD_CONTACT_COMMUNITY_LIST_SUCCESS,
    LOAD_CONTACT_COMMUNITY_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CONTACT_COMMUNITY_LIST }
}

export function load (params) {
    return dispatch => {
        dispatch({ type: LOAD_CONTACT_COMMUNITY_LIST_REQUEST })
        return service.findCommunities(params).then(response => {
            dispatch({
                type: LOAD_CONTACT_COMMUNITY_LIST_SUCCESS,
                payload: response.data
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_CONTACT_COMMUNITY_LIST_FAILURE, payload: e })
        })
    }
}