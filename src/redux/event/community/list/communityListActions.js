import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_EVENT_COMMUNITY_LIST,
    LOAD_EVENT_COMMUNITY_LIST_SUCCESS,
    LOAD_EVENT_COMMUNITY_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_EVENT_COMMUNITY_LIST }
}

export function load (config) {
    return dispatch => {
        return service.findCommunities(config).then(response => {
            dispatch({
                type: LOAD_EVENT_COMMUNITY_LIST_SUCCESS,
                payload: response.data
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_EVENT_COMMUNITY_LIST_FAILURE, payload: e })
        })
    }
}