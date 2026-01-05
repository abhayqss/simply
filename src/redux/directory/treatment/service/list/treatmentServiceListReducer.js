import InitialState from './TreatmentServiceListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_TREATMENT_SERVICE_LIST,
    LOAD_TREATMENT_SERVICE_LIST_REQUEST,
    LOAD_TREATMENT_SERVICE_LIST_SUCCESS,
    LOAD_TREATMENT_SERVICE_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function treatmentServiceListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_TREATMENT_SERVICE_LIST:
            return state
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['dataSource', 'data'], [])

        case LOAD_TREATMENT_SERVICE_LIST_REQUEST:
            return state.setIn(['isFetching'], true)

        case LOAD_TREATMENT_SERVICE_LIST_SUCCESS: {
            const { data } = action.payload

            const existingData = state.getIn(['dataSource', 'data'])

            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], !existingData)
                .setIn(['dataSource', 'data'], data)
        }

        case LOAD_TREATMENT_SERVICE_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
