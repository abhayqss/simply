import { ACTION_TYPES } from 'lib/Constants'

import service from 'services/CommunityDeviceTypeService'

const {
    CLEAR_COMMUNITY_DEVICE_TYPE_DETAILS,
    CLEAR_COMMUNITY_DEVICE_TYPE_DETAILS_ERROR,

    LOAD_COMMUNITY_DEVICE_TYPE_DETAILS_REQUEST,
    LOAD_COMMUNITY_DEVICE_TYPE_DETAILS_SUCCESS,
    LOAD_COMMUNITY_DEVICE_TYPE_DETAILS_FAILURE
} = ACTION_TYPES

export function clear () {
    return {
        type: CLEAR_COMMUNITY_DEVICE_TYPE_DETAILS
    }
}

export function clearError () {
    return {
        type: CLEAR_COMMUNITY_DEVICE_TYPE_DETAILS_ERROR
    }
}

export function load (deviceTypeId, orgId, commId) {
    return dispatch => {
        dispatch({ type: LOAD_COMMUNITY_DEVICE_TYPE_DETAILS_REQUEST })
        return service.findById(deviceTypeId, orgId, commId).then(response => {
            const { data } = response
            dispatch({ type: LOAD_COMMUNITY_DEVICE_TYPE_DETAILS_SUCCESS, payload: data })
            return data
        }).catch((e) => {
            dispatch({ type: LOAD_COMMUNITY_DEVICE_TYPE_DETAILS_FAILURE, payload: e })
        })
    }
}
