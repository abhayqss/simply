import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_DIRECTORY_COMMUNITY_LIST,
    LOAD_DIRECTORY_COMMUNITY_LIST_SUCCESS,
    LOAD_DIRECTORY_COMMUNITY_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_DIRECTORY_COMMUNITY_LIST }
}

export function load (params) {
    return dispatch => {
        return service.findCommunities(params).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_DIRECTORY_COMMUNITY_LIST_SUCCESS,
                payload: { data }
            })

            return response
        }).catch(e => {
            dispatch({ type: LOAD_DIRECTORY_COMMUNITY_LIST_FAILURE, payload: e })
        })
    }
}

