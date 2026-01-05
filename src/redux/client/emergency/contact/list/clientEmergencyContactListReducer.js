import { any, map } from 'underscore'

import InitialState from './ClientEmergencyContactListInitialState'

import { ACTION_TYPES, PAGINATION } from 'lib/Constants'

import { getDataUrl } from 'lib/utils/Utils'
import Converter from 'lib/converters/Converter'
import factory from 'lib/converters/ConverterFactory'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_EMERGENCY_CONTACT_LIST_ERROR,

    CLEAR_CLIENT_EMERGENCY_CONTACT_LIST,

    LOAD_CLIENT_EMERGENCY_CONTACT_LIST_REQUEST,
    LOAD_CLIENT_EMERGENCY_CONTACT_LIST_SUCCESS,
    LOAD_CLIENT_EMERGENCY_CONTACT_LIST_FAILURE,

    DOWNLOAD_CLIENT_EMERGENCY_CONTACT_AVATAR_SUCCESS
} = ACTION_TYPES


const initialState = new InitialState()

const converter = factory.getConverter(Converter.types.BINARY_TO_BASE_64)

export default function clientEmergencyContactListReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_EMERGENCY_CONTACT_LIST:
            return state.clear()
                        .setIn(['shouldReload'], action.payload || false)


        case CLEAR_CLIENT_EMERGENCY_CONTACT_LIST_ERROR:
            return state.removeIn(['error'])

        case LOAD_CLIENT_EMERGENCY_CONTACT_LIST_REQUEST:
            return state
            .setIn(['error'], null)
            .setIn(['shouldReload'], false)
            .setIn(['isFetching'], true)

        case LOAD_CLIENT_EMERGENCY_CONTACT_LIST_SUCCESS: {
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

        case DOWNLOAD_CLIENT_EMERGENCY_CONTACT_AVATAR_SUCCESS: {
            const {
                contactId,
                mediaType,
            } = action.payload

            const data = state.dataSource.data

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

        case LOAD_CLIENT_EMERGENCY_CONTACT_LIST_FAILURE:
            return state
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)
                .setIn(['error'], action.payload)
    }

    return state
}
