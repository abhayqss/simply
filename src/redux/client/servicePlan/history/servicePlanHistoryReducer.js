import InitialState from './ServicePlanHistoryInitialState'

import { ACTION_TYPES, PAGINATION } from 'lib/Constants'

const {
    CLEAR_ALL_AUTH_DATA,
    LOGOUT_SUCCESS,

    CLEAR_SERVICE_PLAN_HISTORY_ERROR,

    CLEAR_SERVICE_PLAN_HISTORY,

    LOAD_SERVICE_PLAN_HISTORY_REQUEST,
    LOAD_SERVICE_PLAN_HISTORY_SUCCESS,
    LOAD_SERVICE_PLAN_HISTORY_FAILURE
} = ACTION_TYPES

const { FIRST_PAGE } = PAGINATION

const initialState = new InitialState()

export default function servicePlanHistoryReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case CLEAR_ALL_AUTH_DATA:
        case LOGOUT_SUCCESS:
        case CLEAR_SERVICE_PLAN_HISTORY:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .setIn(['dataSource', 'data'], [])
                .setIn(['dataSource', 'pagination', 'page'], FIRST_PAGE)
                .removeIn(['dataSource', 'pagination', 'totalCount'])
                .removeIn(['dataSource', 'filter', 'name'])

        case CLEAR_SERVICE_PLAN_HISTORY_ERROR:
            return state.removeIn(['error'])

        case LOAD_SERVICE_PLAN_HISTORY_REQUEST:
            return state
            .setIn(['error'], null)
            .setIn(['shouldReload'], false)
            .setIn(['isFetching'], true)

        case LOAD_SERVICE_PLAN_HISTORY_SUCCESS: {
            const {
                data,
                page,
                size,
                totalCount
            } = action.payload

            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['dataSource', 'data'], data)
                .setIn(['dataSource', 'pagination', 'page'], page)
                .setIn(['dataSource', 'pagination', 'size'], size)
                .setIn(['dataSource', 'pagination', 'totalCount'], totalCount)
        }

        case LOAD_SERVICE_PLAN_HISTORY_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
