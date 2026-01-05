import InitialState from './SystemAlertListInitialState'

import {ACTION_TYPES, PAGINATION} from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_SYSTEM_ALERT_LIST_ERROR,

    CLEAR_SYSTEM_ALERT_LIST,
    LOAD_SYSTEM_ALERT_LIST_REQUEST,
    LOAD_SYSTEM_ALERT_LIST_SUCCESS,
    LOAD_SYSTEM_ALERT_LIST_FAILURE
} = ACTION_TYPES

const { FIRST_PAGE } = PAGINATION

const initialState = new InitialState()

export default function systemAlertListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_SYSTEM_ALERT_LIST:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .removeIn(['dataSource', 'data'])
                .setIn(['dataSource', 'pagination', 'page'], FIRST_PAGE)
                .removeIn(['dataSource', 'pagination', 'totalCount'])
                .setIn(['dataSource', 'pagination', 'loading'], false)

        case CLEAR_SYSTEM_ALERT_LIST_ERROR:
            return state.removeIn(['error'])

        case LOAD_SYSTEM_ALERT_LIST_REQUEST: {
            let nextState = state.setIn(['error'], null)
                .setIn(['shouldReload'], false)

            return action.payload === FIRST_PAGE ? nextState.setIn(['isFetching'], true)
                : nextState.setIn(['dataSource', 'pagination', 'loading'], true)
        }

        case LOAD_SYSTEM_ALERT_LIST_SUCCESS: {
            const {
                page,
                size,
                totalCount
            } = action.payload

            let nextState = state.setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['dataSource', 'pagination', 'page'], page)
                .setIn(['dataSource', 'pagination', 'size'], size)
                .setIn(['dataSource', 'pagination', 'totalCount'], totalCount)
                .setIn(['dataSource', 'pagination', 'loading'], false)

            let data = action.payload.data
            const prevData = state.getIn(['dataSource', 'data']) || []
            data = page === FIRST_PAGE ? data : [...prevData, ...data]

            return nextState.setIn(['dataSource', 'data'], data)
        }

        case LOAD_SYSTEM_ALERT_LIST_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['dataSource', 'pagination', 'loading'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
