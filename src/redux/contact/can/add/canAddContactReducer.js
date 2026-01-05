import { ACTION_TYPES} from 'lib/Constants'

import InitialState from './CanAddContactCountInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CAN_ADD_CONTACT,
    CLEAR_CAN_ADD_CONTACT_ERROR,
    LOAD_CAN_ADD_CONTACT_REQUEST,
    LOAD_CAN_ADD_CONTACT_SUCCESS,
    LOAD_CAN_ADD_CONTACT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function organizationCountReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CAN_ADD_CONTACT:
            return state.clear()
                        .setIn(['shouldReload'], action.payload || false)

        case CLEAR_CAN_ADD_CONTACT_ERROR:
            return state.removeIn(['error'])

        case LOAD_CAN_ADD_CONTACT_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['shouldReload'], false)
        }

        case LOAD_CAN_ADD_CONTACT_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['value'], action.payload)

        case LOAD_CAN_ADD_CONTACT_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['shouldReload'], false)
    }

    return state
}