import Immutable from 'immutable'
import { any, map } from 'underscore'

import InitialState from './ClientListInitialState'

import { ACTION_TYPES, PAGINATION } from 'lib/Constants'

import { getDataUrl } from 'lib/utils/Utils'
import Converter from 'lib/converters/Converter'
import factory from 'lib/converters/ConverterFactory'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_LIST_ERROR,

    CLEAR_CLIENT_LIST,
    CLEAR_CLIENT_LIST_FILTER,
    CHANGE_CLIENT_LIST_FILTER,
    CHANGE_CLIENT_LIST_FILTER_FIELD,

    LOAD_CLIENT_LIST_REQUEST,
    LOAD_CLIENT_LIST_SUCCESS,
    LOAD_CLIENT_LIST_FAILURE,
    CHANGE_CLIENT_LIST_SORTING,

    DOWNLOAD_CLIENT_AVATAR_SUCCESS,

    SAVE_CLIENT_SUCCESS
} = ACTION_TYPES

const { FIRST_PAGE } = PAGINATION

const initialState = new InitialState()

const converter = factory.getConverter(Converter.types.BINARY_TO_BASE_64)

export default function clientListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_LIST:
            return state.clear()
                        .setIn(['shouldReload'], action.payload || false)


        case CLEAR_CLIENT_LIST_ERROR:
            return state.removeIn(['error'])

        case CLEAR_CLIENT_LIST_FILTER:
            return state.setIn(
                ['dataSource', 'filter'],
                state.getIn(['dataSource', 'filter']).clear()
            ).setIn(['shouldReload'], action.payload || false)

        case CHANGE_CLIENT_LIST_FILTER: {
            const {
                changes = {},
                shouldReload = true
            } = action.payload

            return state.setIn(['shouldReload'], shouldReload)
                        .mergeIn(['dataSource', 'filter'], changes)
        }

        case CHANGE_CLIENT_LIST_FILTER_FIELD: {
            const {
                name,
                value,
                shouldReload = true
            } = action.payload

            return state
                .setIn(['dataSource', 'filter', name], value)
                .setIn(['shouldReload'], shouldReload)
        }

        case CHANGE_CLIENT_LIST_SORTING: {
            const {
                field,
                order,
                shouldReload = true
            } = action.payload

            return state
                .setIn(['shouldReload'], shouldReload)
                .setIn(['dataSource', 'sorting', 'field'], field)
                .setIn(['dataSource', 'sorting', 'order'], order)

        }

        case SAVE_CLIENT_SUCCESS: {
            return state.removeIn(['error'])
                .setIn(['shouldReload'], true)
        }

        case LOAD_CLIENT_LIST_REQUEST:
            return state
            .setIn(['error'], null)
            .setIn(['shouldReload'], false)
            .setIn(['isFetching'], true)

        case LOAD_CLIENT_LIST_SUCCESS: {
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

        case DOWNLOAD_CLIENT_AVATAR_SUCCESS: {
            const {
                clientId,
                mediaType,
            } = action.payload

            const { data } = state.dataSource

            if (any(data, o => o.id === clientId)) {
                return state.setIn(
                    ['dataSource', 'data'],
                    map(data, o => ({
                        ...o,
                        avatarDataUrl: o.id === clientId ? getDataUrl(
                            converter.convert(action.payload.data),
                            mediaType
                        ) : o.avatarDataUrl
                    }))
                )
            }

            break
        }

        case LOAD_CLIENT_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
