import InitialState from './EventNoteComposedListInitialState'

import { ACTION_TYPES, PAGINATION } from 'lib/Constants'
import Immutable from 'immutable'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_EVENT_NOTE_COMPOSED_LIST_ERROR,

    CLEAR_EVENT_NOTE_COMPOSED_LIST,
    CLEAR_EVENT_NOTE_COMPOSED_LIST_FILTER,
    CHANGE_EVENT_NOTE_COMPOSED_LIST_FILTER,

    LOAD_EVENT_NOTE_COMPOSED_LIST_REQUEST,
    LOAD_EVENT_NOTE_COMPOSED_LIST_SUCCESS,
    LOAD_EVENT_NOTE_COMPOSED_LIST_FAILURE
} = ACTION_TYPES

const { FIRST_PAGE } = PAGINATION

const initialState = new InitialState()

export default function eventNoteComposedListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_EVENT_NOTE_COMPOSED_LIST:
            return state.removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], action.payload || false)
                .setIn(['dataSource', 'data'], [])
                .setIn(['dataSource', 'pagination', 'page'], FIRST_PAGE)
                .removeIn(['dataSource', 'pagination', 'totalCount'])
                .removeIn(['dataSource', 'filter', 'clientId'])
                .removeIn(['dataSource', 'filter', 'typeId'])
                .removeIn(['dataSource', 'filter', 'noteTypeId'])
                .removeIn(['dataSource', 'filter', 'fromDate'])
                .removeIn(['dataSource', 'filter', 'toDate'])
                .removeIn(['dataSource', 'filter', 'withIrOnly'])

        case CLEAR_EVENT_NOTE_COMPOSED_LIST_ERROR:
            return state.removeIn(['error'])

        case CLEAR_EVENT_NOTE_COMPOSED_LIST_FILTER:
            return state.removeIn(['dataSource', 'filter', 'clientId'])
                .removeIn(['dataSource', 'filter', 'typeId'])
                .removeIn(['dataSource', 'filter', 'noteTypeId'])
                .removeIn(['dataSource', 'filter', 'fromDate'])
                .removeIn(['dataSource', 'filter', 'toDate'])
                .removeIn(['dataSource', 'filter', 'withIrOnly'])

        case CHANGE_EVENT_NOTE_COMPOSED_LIST_FILTER: {
            const { changes, shouldReload = true } = action.payload

            if (changes) {
                return state
                    .mergeIn(['dataSource', 'filter'], Immutable.fromJS(changes))
                    .setIn(['shouldReload'], shouldReload)
            }

            break
        }

        case LOAD_EVENT_NOTE_COMPOSED_LIST_REQUEST:
            return state
            .setIn(['error'], null)
            .setIn(['shouldReload'], false)
            .setIn(['isFetching'], true)

        case LOAD_EVENT_NOTE_COMPOSED_LIST_SUCCESS: {
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

        case LOAD_EVENT_NOTE_COMPOSED_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
