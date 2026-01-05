import {ACTION_TYPES} from 'lib/Constants'

import InitialState from './DashboardServicePlanCountInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_DASHBOARD_SERVICE_PLAN_COUNT,
    CLEAR_DASHBOARD_SERVICE_PLAN_COUNT_ERROR,
    LOAD_DASHBOARD_SERVICE_PLAN_COUNT_REQUEST,
    LOAD_DASHBOARD_SERVICE_PLAN_COUNT_SUCCESS,
    LOAD_DASHBOARD_SERVICE_PLAN_COUNT_FAILURE
} = ACTION_TYPES

const initialState = new InitialState()

export default function dashboardServicePlanCountReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_DASHBOARD_SERVICE_PLAN_COUNT:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .removeIn(['dataSource'])

        case CLEAR_DASHBOARD_SERVICE_PLAN_COUNT_ERROR:
            return state.removeIn(['error'])

        case LOAD_DASHBOARD_SERVICE_PLAN_COUNT_REQUEST: {
            return state.setIn(['error'], null)
                .setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
        }

        case LOAD_DASHBOARD_SERVICE_PLAN_COUNT_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['dataSource', 'data'], action.payload)

        case LOAD_DASHBOARD_SERVICE_PLAN_COUNT_FAILURE:
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
    }

    return state
}