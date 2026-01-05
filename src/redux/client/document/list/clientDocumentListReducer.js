import InitialState from './ClientDocumentListInitialState'

import { ACTION_TYPES, PAGINATION } from 'lib/Constants'
import Immutable from 'immutable'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_DOCUMENT_LIST_ERROR,

    CLEAR_CLIENT_DOCUMENT_LIST,
    CLEAR_CLIENT_DOCUMENT_LIST_FILTER,
    CHANGE_CLIENT_DOCUMENT_LIST_FILTER,

    LOAD_CLIENT_DOCUMENT_LIST_REQUEST,
    LOAD_CLIENT_DOCUMENT_LIST_SUCCESS,
    LOAD_CLIENT_DOCUMENT_LIST_FAILURE,

    SAVE_CLIENT_DOCUMENT_SUCCESS,
    LOAD_DELETE_CLIENT_DOCUMENT_SUCCESS
} = ACTION_TYPES

const { FIRST_PAGE } = PAGINATION

const initialState = new InitialState()

export default function clientDocumentListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_DOCUMENT_LIST:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .setIn(['dataSource', 'data'], [])
                .setIn(['dataSource', 'pagination', 'page'], FIRST_PAGE)
                .removeIn(['dataSource', 'pagination', 'totalCount'])
                .removeIn(['dataSource', 'filter', 'name'])
                .removeIn(['dataSource', 'filter', 'type'])

        case CLEAR_CLIENT_DOCUMENT_LIST_ERROR:
            return state.removeIn(['error'])

        case CLEAR_CLIENT_DOCUMENT_LIST_FILTER:
            return state.setIn(['shouldReload'], true)
                .removeIn(['dataSource', 'filter', 'name'])
                .removeIn(['dataSource', 'filter', 'type'])

        case CHANGE_CLIENT_DOCUMENT_LIST_FILTER: {
            const { changes, shouldReload } = action.payload

            if (changes) {
                return state
                    .mergeIn(['dataSource', 'filter'], Immutable.fromJS(changes))
                    .setIn(['shouldReload'], shouldReload)
            }

            break
        }

        case SAVE_CLIENT_DOCUMENT_SUCCESS: {
            return state.removeIn(['error'])
                .setIn(['shouldReload'], true)
        }

        case LOAD_DELETE_CLIENT_DOCUMENT_SUCCESS:
            return state.removeIn(['error'])
                .setIn(['shouldReload'], true)

        case LOAD_CLIENT_DOCUMENT_LIST_REQUEST:
            return state
            .setIn(['error'], null)
            .setIn(['shouldReload'], false)
            .setIn(['isFetching'], true)

        case LOAD_CLIENT_DOCUMENT_LIST_SUCCESS: {
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

        case LOAD_CLIENT_DOCUMENT_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}