import InitialState from './ServicePlanListInitialState'

import { ACTION_TYPES, PAGINATION } from 'lib/Constants'
import Immutable from 'immutable'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_SERVICE_PLAN_LIST_ERROR,

    CLEAR_SERVICE_PLAN_LIST,
    CLEAR_SERVICE_PLAN_LIST_FILTER,
    CHANGE_SERVICE_PLAN_LIST_FILTER,

    LOAD_SERVICE_PLAN_LIST_REQUEST,
    LOAD_SERVICE_PLAN_LIST_SUCCESS,
    LOAD_SERVICE_PLAN_LIST_FAILURE,
    SAVE_SERVICE_PLAN_SUCCESS,

    CHANGE_SERVICE_PLAN_LIST_SORTING
} = ACTION_TYPES

const { FIRST_PAGE } = PAGINATION

const initialState = new InitialState()

export default function organizationListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_SERVICE_PLAN_LIST:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .setIn(['dataSource', 'data'], [])
                .setIn(['dataSource', 'pagination', 'page'], FIRST_PAGE)
                .removeIn(['dataSource', 'pagination', 'totalCount'])
                .removeIn(['dataSource', 'filter', 'name'])

        case CLEAR_SERVICE_PLAN_LIST_ERROR:
            return state.removeIn(['error'])

        case CLEAR_SERVICE_PLAN_LIST_FILTER:
            return state.removeIn(['dataSource', 'filter', 'name'])

        case CHANGE_SERVICE_PLAN_LIST_FILTER: {
            const { changes, shouldReload = true } = action.payload

            if (changes) {
                return state
                    .mergeIn(['dataSource', 'filter'], Immutable.fromJS(changes))
                    .setIn(['shouldReload'], shouldReload)
            }

            break
        }

        case SAVE_SERVICE_PLAN_SUCCESS: {
            return state.removeIn(['error'])
                .setIn(['shouldReload'], true)
        }

        case  CHANGE_SERVICE_PLAN_LIST_SORTING: {
            const {
                field, order, shouldReload = true
            } = action.payload

            return state
                .setIn(['shouldReload'], shouldReload)
                .setIn(['dataSource', 'sorting', 'field'], field)
                .setIn(['dataSource', 'sorting', 'order'], order)
        }

        case LOAD_SERVICE_PLAN_LIST_REQUEST:
            return state
            .setIn(['error'], null)
            .setIn(['shouldReload'], false)
            .setIn(['isFetching'], true)

        case LOAD_SERVICE_PLAN_LIST_SUCCESS: {
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

        case LOAD_SERVICE_PLAN_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
