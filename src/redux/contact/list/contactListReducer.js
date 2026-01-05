import { any, map } from 'underscore'

import InitialState from './ContactListInitialState'

import { ACTION_TYPES } from 'lib/Constants'

import { getDataUrl } from 'lib/utils/Utils'
import Converter from 'lib/converters/Converter'
import factory from 'lib/converters/ConverterFactory'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CONTACT_LIST_ERROR,

    CLEAR_CONTACT_LIST,
    CLEAR_CONTACT_LIST_FILTER,
    CHANGE_CONTACT_LIST_FILTER,
    CHANGE_CONTACT_LIST_FILTER_FIELD,

    LOAD_CONTACT_LIST_REQUEST,
    LOAD_CONTACT_LIST_SUCCESS,
    LOAD_CONTACT_LIST_FAILURE,
    CHANGE_CONTACT_LIST_SORTING,

    DOWNLOAD_CONTACT_AVATAR_SUCCESS,

    SAVE_CONTACT_SUCCESS
} = ACTION_TYPES

const initialState = new InitialState()

const converter = factory.getConverter(Converter.types.BINARY_TO_BASE_64)

export default function organizationListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CONTACT_LIST:
            return state.clear()
                        .setIn(['shouldReload'], action.payload || false)

        case CLEAR_CONTACT_LIST_ERROR:
            return state.removeIn(['error'])

        case CLEAR_CONTACT_LIST_FILTER:
            return state.setIn(['shouldReload'], true)
                        .removeIn(['dataSource', 'filter', 'email'])
                        .removeIn(['dataSource', 'filter', 'lastName'])
                        .removeIn(['dataSource', 'filter', 'firstName'])
                        .removeIn(['dataSource', 'filter', 'statuses'])
                        .removeIn(['dataSource', 'filter', 'systemRoleIds'])

        case CHANGE_CONTACT_LIST_FILTER: {
            const {
                changes = {},
                shouldReload = true
            } = action.payload

            return state.setIn(['shouldReload'], shouldReload)
                        .mergeIn(['dataSource', 'filter'], changes)
        }


        case CHANGE_CONTACT_LIST_FILTER_FIELD: {
            const {
                name,
                value,
                shouldReload = true
            } = action.payload

            return state
                .setIn(['dataSource', 'filter', name], value)
                .setIn(['shouldReload'], shouldReload)
        }

        case CHANGE_CONTACT_LIST_SORTING: {
            const {
                field, order, shouldReload = true
            } = action.payload

            return state
                .setIn(['shouldReload'], shouldReload)
                .setIn(['dataSource', 'sorting', 'field'], field)
                .setIn(['dataSource', 'sorting', 'order'], order)
        }

        case SAVE_CONTACT_SUCCESS: {
            return state.removeIn(['error'])
                .setIn(['shouldReload'], true)
        }

        case LOAD_CONTACT_LIST_REQUEST:
            return state
            .setIn(['error'], null)
            .setIn(['shouldReload'], false)
            .setIn(['isFetching'], true)

        case LOAD_CONTACT_LIST_SUCCESS: {
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

        case DOWNLOAD_CONTACT_AVATAR_SUCCESS: {
            const {
                contactId,
                mediaType,
            } = action.payload

            const { data } = state.dataSource

            if (any(data, o => o.id === contactId)) {
                return state.setIn(
                    ['dataSource', 'data'],
                    map(data, o => ({
                        ...o,
                        avatarDataUrl: o.id === contactId ? getDataUrl(
                            converter.convert(action.payload.data),
                            mediaType
                        ) : o.avatarDataUrl
                    }))
                )
            }

            break
        }

        case LOAD_CONTACT_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
