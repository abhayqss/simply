import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/DirectoryService'

const {
    CLEAR_CARE_TEAM_ROLE_LIST,
    LOAD_CARE_TEAM_ROLE_LIST_SUCCESS,
    LOAD_CARE_TEAM_ROLE_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CARE_TEAM_ROLE_LIST }
}

export function load (config) {
    return dispatch => {
        return service.findCareTeamRoles(config).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_CARE_TEAM_ROLE_LIST_SUCCESS,
                payload: data
            })
        }).catch(e => {
            dispatch({ type: LOAD_CARE_TEAM_ROLE_LIST_FAILURE, payload: e })
        })
    }
}