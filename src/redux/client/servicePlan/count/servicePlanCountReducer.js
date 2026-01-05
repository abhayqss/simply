import { ACTION_TYPES} from 'lib/Constants'

import InitialState from './ServicePlanCountInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_SERVICE_PLAN_COUNT,
    CLEAR_SERVICE_PLAN_COUNT_ERROR,
    LOAD_SERVICE_PLAN_COUNT_REQUEST,
    LOAD_SERVICE_PLAN_COUNT_SUCCESS,
    LOAD_SERVICE_PLAN_COUNT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function contactCountReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_SERVICE_PLAN_COUNT:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .removeIn(['value'])

        case CLEAR_SERVICE_PLAN_COUNT_ERROR:
            return state.removeIn(['error'])

        case LOAD_SERVICE_PLAN_COUNT_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['shouldReload'], false)
        }

        case LOAD_SERVICE_PLAN_COUNT_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['value'], action.payload)

        case LOAD_SERVICE_PLAN_COUNT_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['shouldReload'], false)
    }

    return state
}