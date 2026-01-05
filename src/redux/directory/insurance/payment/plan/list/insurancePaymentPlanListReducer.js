import InitialState from './insurancePaymentPlanListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_INSURANCE_PAYMENT_PLAN_LIST,
    LOAD_INSURANCE_PAYMENT_PLAN_LIST_REQUEST,
    LOAD_INSURANCE_PAYMENT_PLAN_LIST_SUCCESS,
    LOAD_INSURANCE_PAYMENT_PLAN_LIST_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function insuranceNetworkListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_INSURANCE_PAYMENT_PLAN_LIST:
            return state
                .setIn(['isFetching'], false)
                .setIn(['dataSource', 'data'], [])
                .removeIn(['error'])

        case LOAD_INSURANCE_PAYMENT_PLAN_LIST_REQUEST:
            return state
                .setIn(['isFetching'], true)
                .removeIn(['error'])

        case LOAD_INSURANCE_PAYMENT_PLAN_LIST_SUCCESS: {
            const { data } = action.payload

            const existingData = state.getIn(['dataSource', 'data'])

            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], !existingData)
                .setIn(['dataSource', 'data'], data)
        }

        case LOAD_INSURANCE_PAYMENT_PLAN_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
