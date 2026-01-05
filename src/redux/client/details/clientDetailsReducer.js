import InitialState from './ClientDetailsInitialState'

import { getDataUrl } from 'lib/utils/Utils'
import Converter from 'lib/converters/Converter'
import factory from 'lib/converters/ConverterFactory'

import { ACTION_TYPES } from 'lib/Constants'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_CLIENT_DETAILS,
    CLEAR_CLIENT_DETAILS_ERROR,

    DOWNLOAD_CLIENT_AVATAR_SUCCESS,

    LOAD_CLIENT_DETAILS_REQUEST,
    LOAD_CLIENT_DETAILS_SUCCESS,
    LOAD_CLIENT_DETAILS_FAILURE
} = ACTION_TYPES


const initialState = new InitialState()

const converter = factory.getConverter(Converter.types.BINARY_TO_BASE_64)

export default function clientDetailsReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CLIENT_DETAILS:
            return state.removeIn(['data'])
                        .removeIn(['error'])
                        .setIn(['isFetching'], false)
                        .setIn(['shouldReload'], false)

        case CLEAR_CLIENT_DETAILS_ERROR:
            return state.removeIn(['error'])

        case LOAD_CLIENT_DETAILS_REQUEST:
            return state.setIn(['isFetching'], true)
                        .setIn(['shouldReload'], false)
                        .setIn(['error'], null)

        case LOAD_CLIENT_DETAILS_SUCCESS:
            return state.setIn(['isFetching'], false)
                        .setIn(['data'], action.payload)

        case LOAD_CLIENT_DETAILS_FAILURE:
            return state.setIn(['isFetching'], false)
                        .setIn(['error'], action.payload)

        case DOWNLOAD_CLIENT_AVATAR_SUCCESS: {
            const {
                clientId,
                mediaType
            } = action.payload

            const { data } = state
            const fileData = action.payload.data

            if (data && data.id === clientId && fileData) {
                return state.setIn(['data'], {
                    ...data,
                    avatarDataUrl: getDataUrl(
                        converter.convert(fileData),
                        mediaType
                    )
                })
            }
        }
    }
    return state
}
