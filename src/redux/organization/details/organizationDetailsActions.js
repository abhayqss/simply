import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/OrganizationService'

const {
    CLEAR_ORGANIZATION_DETAILS,
    CLEAR_ORGANIZATION_DETAILS_ERROR,

    LOAD_ORGANIZATION_DETAILS_REQUEST,
    LOAD_ORGANIZATION_DETAILS_SUCCESS,
    LOAD_ORGANIZATION_DETAILS_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_ORGANIZATION_DETAILS
    }
}

export function clearError () {
    return {
        type: CLEAR_ORGANIZATION_DETAILS_ERROR
    }
}

export function load (orgId, isMarketplaceDataIncluded) {
    return dispatch => {
        dispatch({ type: LOAD_ORGANIZATION_DETAILS_REQUEST })
        return service.findById(orgId, isMarketplaceDataIncluded).then(response => {
            const { data } = response
            dispatch({ type: LOAD_ORGANIZATION_DETAILS_SUCCESS, payload: data })
            return response
        }).catch((e) => {
            dispatch({ type: LOAD_ORGANIZATION_DETAILS_FAILURE, payload: e })
        })
    }
}