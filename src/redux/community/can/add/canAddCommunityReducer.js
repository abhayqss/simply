import { ACTION_TYPES} from 'lib/Constants'

import InitialState from './CanAddCommunityCountInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CAN_ADD_COMMUNITY,
    CLEAR_CAN_ADD_COMMUNITY_ERROR,
    LOAD_CAN_ADD_COMMUNITY_REQUEST,
    LOAD_CAN_ADD_COMMUNITY_SUCCESS,
    LOAD_CAN_ADD_COMMUNITY_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function organizationCountReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CAN_ADD_COMMUNITY:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .removeIn(['value'])

        case CLEAR_CAN_ADD_COMMUNITY_ERROR:
            return state.removeIn(['error'])

        case LOAD_CAN_ADD_COMMUNITY_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['shouldReload'], false)
        }

        case LOAD_CAN_ADD_COMMUNITY_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['value'], action.payload)

        case LOAD_CAN_ADD_COMMUNITY_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['shouldReload'], false)
    }

    return state
}