import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/CommunityService'

const {
    CLEAR_COMMUNITY_DETAILS,
    CLEAR_COMMUNITY_DETAILS_ERROR,

    LOAD_COMMUNITY_DETAILS_REQUEST,
    LOAD_COMMUNITY_DETAILS_SUCCESS,
    LOAD_COMMUNITY_DETAILS_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_COMMUNITY_DETAILS
    }
}

export function clearError () {
    return {
        type: CLEAR_COMMUNITY_DETAILS_ERROR
    }
}

export function load (orgId, commId, isMarketplaceDataIncluded) {
    return dispatch => {
        dispatch({ type: LOAD_COMMUNITY_DETAILS_REQUEST })
        return service.findById(orgId, commId, isMarketplaceDataIncluded).then(response => {
            dispatch({ type: LOAD_COMMUNITY_DETAILS_SUCCESS, payload: response.data })
            return response
        }).catch((e) => {
            dispatch({ type: LOAD_COMMUNITY_DETAILS_FAILURE, payload: e })
        })
    }
}