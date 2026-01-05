import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/CommunityService'

const {
    CLEAR_COMMUNITY_HISTORY_ERROR,

    CLEAR_COMMUNITY_HISTORY,

    LOAD_COMMUNITY_HISTORY_REQUEST,
    LOAD_COMMUNITY_HISTORY_SUCCESS,
    LOAD_COMMUNITY_HISTORY_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_COMMUNITY_HISTORY }
}

export function clearError () {
    return { type: CLEAR_COMMUNITY_HISTORY_ERROR }
}

export function load (config) {
    return dispatch => {
        dispatch({ type: LOAD_COMMUNITY_HISTORY_REQUEST, payload: config.page })
        return service.find(config).then(response => {
            const { page, size } = config
            const { data, totalCount } = response
            dispatch({
                type: LOAD_COMMUNITY_HISTORY_SUCCESS,
                payload: { data, page, size, totalCount }
            })
        }).catch(e => {
            dispatch({ type: LOAD_COMMUNITY_HISTORY_FAILURE, payload: e })
        })
    }
}

