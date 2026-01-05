import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/CareTeamMemberService'

const {
    CLEAR_CARE_TEAM_NOTIFICATION_PREFERENCE_LIST,
    LOAD_CARE_TEAM_NOTIFICATION_PREFERENCE_LIST_SUCCESS,
    LOAD_CARE_TEAM_NOTIFICATION_PREFERENCE_LIST_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_CARE_TEAM_NOTIFICATION_PREFERENCE_LIST }
}

export function load (config) {
    return dispatch => {
        return service.findCareTeamNotificationPreferences(config).then(response => {
            const { data } = response

            dispatch({
                type: LOAD_CARE_TEAM_NOTIFICATION_PREFERENCE_LIST_SUCCESS,
                payload: data
            })
        }).catch(e => {
            dispatch({ type: LOAD_CARE_TEAM_NOTIFICATION_PREFERENCE_LIST_FAILURE, payload: e })
        })
    }
}