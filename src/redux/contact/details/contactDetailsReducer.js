import { ACTION_TYPES } from 'lib/Constants'
import { any, map } from 'underscore'

import InitialState from './ContactDetailsInitialState'

import { getDataUrl } from 'lib/utils/Utils'
import Converter from 'lib/converters/Converter'
import factory from 'lib/converters/ConverterFactory'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,
    CLEAR_CONTACT_DETAILS,
    CLEAR_CONTACT_DETAILS_ERROR,

    LOAD_CONTACT_DETAILS_REQUEST,
    LOAD_CONTACT_DETAILS_SUCCESS,
    LOAD_CONTACT_DETAILS_FAILURE,

    DOWNLOAD_CONTACT_AVATAR_SUCCESS
} = ACTION_TYPES


const initialState = new InitialState()

const converter = factory.getConverter(Converter.types.BINARY_TO_BASE_64)

export default function contactDetailsReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_CONTACT_DETAILS:
            return state.removeIn(['data'])
                .removeIn(['error'])
                .setIn(['isFetching'], false)
                .setIn(['shouldReload'], false)

        case CLEAR_CONTACT_DETAILS_ERROR:
            return state.removeIn(['error'])

        case LOAD_CONTACT_DETAILS_REQUEST:
            return state.setIn(['isFetching'], true)
                .setIn(['shouldReload'], false)
                .setIn(['error'], null)

        case LOAD_CONTACT_DETAILS_SUCCESS: {
            const {
                data,
                shouldNotSave = false
            } = action.payload

            return state.setIn(['isFetching'], false)
                        .setIn(['data'], shouldNotSave ? state.data : data)
        }

        case LOAD_CONTACT_DETAILS_FAILURE:
            return state.setIn(['isFetching'], false)
                .setIn(['error'], action.payload)

        case DOWNLOAD_CONTACT_AVATAR_SUCCESS: {
            const {
                contactId,
                mediaType,
            } = action.payload

            const { data } = state
            const fileData = action.payload.data

            if (data && data.id === contactId && fileData) {
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
