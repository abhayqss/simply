import { ACTION_TYPES } from 'lib/Constants'

import InitialState from './CareClientDetailsInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,        CLEAR_CARE_CLIENT_DETAILS,
    CLEAR_CARE_CLIENT_DETAILS_ERROR,

    LOAD_CARE_CLIENT_DETAILS_REQUEST,
    LOAD_CARE_CLIENT_DETAILS_SUCCESS,
    LOAD_CARE_CLIENT_DETAILS_FAILURE
} = ACTION_TYPES


const initialState = new InitialState()

export default function clientDetailsReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CARE_CLIENT_DETAILS:
            return state.removeIn(['data'])
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)

        case CLEAR_CARE_CLIENT_DETAILS_ERROR:
            return state.removeIn(['error'])

        case LOAD_CARE_CLIENT_DETAILS_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['error'], null)

        case LOAD_CARE_CLIENT_DETAILS_SUCCESS:
            return state.setIn(['isFetching'], false)
                .setIn(['data'], action.payload)

        case LOAD_CARE_CLIENT_DETAILS_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }
    return state
}
