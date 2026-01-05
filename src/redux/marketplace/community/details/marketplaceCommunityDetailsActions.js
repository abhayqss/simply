import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/MarketplaceCommunityService'

const {
    CLEAR_MARKETPLACE_COMMUNITY_DETAILS,
    CLEAR_MARKETPLACE_COMMUNITY_DETAILS_ERROR,

    LOAD_MARKETPLACE_COMMUNITY_DETAILS_REQUEST,
    LOAD_MARKETPLACE_COMMUNITY_DETAILS_SUCCESS,
    LOAD_MARKETPLACE_COMMUNITY_DETAILS_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_MARKETPLACE_COMMUNITY_DETAILS
    }
}

export function clearError () {
    return {
        type: CLEAR_MARKETPLACE_COMMUNITY_DETAILS_ERROR
    }
}

export function load (communityId) {
    return dispatch => {
        dispatch({ type: LOAD_MARKETPLACE_COMMUNITY_DETAILS_REQUEST })
        return service.findById(communityId).then(response => {
            const { data } = response
            dispatch({ type: LOAD_MARKETPLACE_COMMUNITY_DETAILS_SUCCESS, payload: data })
            return data
        }).catch((e) => {
            dispatch({ type: LOAD_MARKETPLACE_COMMUNITY_DETAILS_FAILURE, payload: e })
        })
    }
}
