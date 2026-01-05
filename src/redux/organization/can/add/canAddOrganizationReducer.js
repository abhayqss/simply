import { ACTION_TYPES} from 'lib/Constants'

import InitialState from './CanAddOrganizationCountInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CAN_ADD_ORGANIZATION,
    CLEAR_CAN_ADD_ORGANIZATION_ERROR,
    LOAD_CAN_ADD_ORGANIZATION_REQUEST,
    LOAD_CAN_ADD_ORGANIZATION_SUCCESS,
    LOAD_CAN_ADD_ORGANIZATION_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function organizationCountReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CAN_ADD_ORGANIZATION:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .removeIn(['value'])

        case CLEAR_CAN_ADD_ORGANIZATION_ERROR:
            return state.removeIn(['error'])

        case LOAD_CAN_ADD_ORGANIZATION_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['shouldReload'], false)
        }

        case LOAD_CAN_ADD_ORGANIZATION_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['value'], action.payload)

        case LOAD_CAN_ADD_ORGANIZATION_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['shouldReload'], false)
    }

    return state
}