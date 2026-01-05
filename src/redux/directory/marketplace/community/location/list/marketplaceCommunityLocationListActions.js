import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_MARKETPLACE_COMMUNITY_LOCATION_LIST,
    LOAD_MARKETPLACE_COMMUNITY_LOCATION_LIST_SUCCESS,
    LOAD_MARKETPLACE_COMMUNITY_LOCATION_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_MARKETPLACE_COMMUNITY_LOCATION_LIST }
}

export function load () {
    return dispatch => {
        return service
            .findMarketplaceCommunityLocations()
            .then(response => {
                dispatch({ type: LOAD_MARKETPLACE_COMMUNITY_LOCATION_LIST_SUCCESS })
                return response
            })
            .catch(e => {
                dispatch({ type: LOAD_MARKETPLACE_COMMUNITY_LOCATION_LIST_FAILURE, payload: e })
            })
    }
}

