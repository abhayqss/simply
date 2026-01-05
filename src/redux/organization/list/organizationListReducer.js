import InitialState from './OrganizationListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_ORGANIZATION_LIST_ERROR,

    CLEAR_ORGANIZATION_LIST,
    CLEAR_ORGANIZATION_LIST_FILTER,
    CHANGE_ORGANIZATION_LIST_FILTER_FIELD,

    CHANGE_ORGANIZATION_LIST_SORTING,

    LOAD_ORGANIZATION_LIST_REQUEST,
    LOAD_ORGANIZATION_LIST_SUCCESS,
    LOAD_ORGANIZATION_LIST_FAILURE,

    SAVE_ORGANIZATION_SUCCESS
} = ACTION_TYPES

const initialState = new InitialState()

export default function organizationListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_ORGANIZATION_LIST:
            return state.clear()

        case CLEAR_ORGANIZATION_LIST_ERROR:
            return state.removeIn(['error'])

        case CLEAR_ORGANIZATION_LIST_FILTER: {
            const { shouldReload = true } = action.payload

            return state.removeIn(['dataSource', 'filter', 'name'])
                        .setIn(['shouldReload'], shouldReload)
        }

        case CHANGE_ORGANIZATION_LIST_FILTER_FIELD: {
            const {
                name,
                value,
                shouldReload = true
            } = action.payload

            return state
                .setIn(['dataSource', 'filter', name], value)
                .setIn(['shouldReload'], shouldReload)
        }

        case CHANGE_ORGANIZATION_LIST_SORTING: {
            const {
                field, order, shouldReload = true
            } = action.payload

            return state
                .setIn(['shouldReload'], shouldReload)
                .setIn(['dataSource', 'sorting', 'field'], field)
                .setIn(['dataSource', 'sorting', 'order'], order)
        }

        case SAVE_ORGANIZATION_SUCCESS: {
            return state.removeIn(['error'])
                        .setIn(['shouldReload'], true)
        }

        case LOAD_ORGANIZATION_LIST_REQUEST:
            return state
                .setIn(['error'], null)
                .setIn(['shouldReload'], false)
                .setIn(['isFetching'], true)

        case LOAD_ORGANIZATION_LIST_SUCCESS: {
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

        case LOAD_ORGANIZATION_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
