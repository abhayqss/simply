import InitialState from './DashboardEventListInitialState'

import { ACTION_TYPES, PAGINATION } from 'lib/Constants'
import Immutable from 'immutable'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_DASHBOARD_EVENT_LIST_ERROR,

    CLEAR_DASHBOARD_EVENT_LIST,
    CLEAR_DASHBOARD_EVENT_LIST_FILTER,
    CHANGE_DASHBOARD_EVENT_LIST_FILTER,

    LOAD_DASHBOARD_EVENT_LIST_REQUEST,
    LOAD_DASHBOARD_EVENT_LIST_SUCCESS,
    LOAD_DASHBOARD_EVENT_LIST_FAILURE
} = ACTION_TYPES

const { FIRST_PAGE } = PAGINATION

const initialState = new InitialState()

export default function recentEventListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_DASHBOARD_EVENT_LIST:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .setIn(['dataSource', 'data'], [])
                .setIn(['dataSource', 'pagination', 'page'], FIRST_PAGE)
                .removeIn(['dataSource', 'pagination', 'totalCount'])

        case CLEAR_DASHBOARD_EVENT_LIST_ERROR:
            return state.removeIn(['error'])

        case CLEAR_DASHBOARD_EVENT_LIST_FILTER:
            return state.setIn(
                ['dataSource', 'filter'],
                state.getIn(['dataSource', 'filter']).clear()
            )

        case CHANGE_DASHBOARD_EVENT_LIST_FILTER: {
            const { changes, shouldReload = true } = action.payload

            if (changes) {
                return state
                    .mergeIn(['dataSource', 'filter'], Immutable.fromJS(changes))
                    .setIn(['shouldReload'], shouldReload)
            }

            break
        }

        case LOAD_DASHBOARD_EVENT_LIST_REQUEST:
            return state
                .setIn(['error'], null)
                .setIn(['shouldReload'], false)
                .setIn(['isFetching'], true)

        case LOAD_DASHBOARD_EVENT_LIST_SUCCESS: {
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

        case LOAD_DASHBOARD_EVENT_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
