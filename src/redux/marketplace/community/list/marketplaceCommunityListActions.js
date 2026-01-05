import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/MarketplaceCommunityService'

const {
    CLEAR_MARKETPLACE_COMMUNITY_LIST_ERROR,

    CLEAR_MARKETPLACE_COMMUNITY_LIST,
    CLEAR_MARKETPLACE_COMMUNITY_LIST_FILTER,
    CHANGE_MARKETPLACE_COMMUNITY_LIST_FILTER,
    CHANGE_MARKETPLACE_COMMUNITY_LIST_FILTER_FIELD,

    LOAD_MARKETPLACE_COMMUNITY_LIST_REQUEST,
    LOAD_MARKETPLACE_COMMUNITY_LIST_SUCCESS,
    LOAD_MARKETPLACE_COMMUNITY_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_MARKETPLACE_COMMUNITY_LIST }
}

export function clearError () {
    return { type: CLEAR_MARKETPLACE_COMMUNITY_LIST_ERROR }
}


export function clearFilter (shouldReload) {
    return {
        type: CLEAR_MARKETPLACE_COMMUNITY_LIST_FILTER,
        payload: { shouldReload }
    }
}

export function changeFilter (changes, shouldReload) {
    return {
        type: CHANGE_MARKETPLACE_COMMUNITY_LIST_FILTER,
        payload: { changes, shouldReload }
    }
}

export function changeFilterField (name, value, shouldReload) {
    return {
        type: CHANGE_MARKETPLACE_COMMUNITY_LIST_FILTER_FIELD,
        payload: { name, value, shouldReload }
    }
}

export function load (params) {
    return dispatch => {
        const { page, size, shouldAccumulate } = params

        dispatch({
            type: LOAD_MARKETPLACE_COMMUNITY_LIST_REQUEST,
            payload: { page, shouldAccumulate }
        })

        return service
            .find(params)
            .then(response => {
                const { data, latitude, longitude, totalCount } = response

                dispatch({
                    type: LOAD_MARKETPLACE_COMMUNITY_LIST_SUCCESS,
                    payload: { data, page, size, totalCount, shouldAccumulate, latitude, longitude }
                })
            })
            .catch(e => {
                dispatch({ type: LOAD_MARKETPLACE_COMMUNITY_LIST_FAILURE, payload: e })
            })
    }
}

