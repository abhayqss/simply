import {
    ACTION_TYPES,
    VALIDATION_ERROR_TEXTS
} from 'lib/Constants'

import {
    anyIsFalse,
    interpolate
} from 'lib/utils/Utils'

import { updateFieldErrors } from '../../utils/Form'

import InitialState from './OrganizationFormInitialState'

const {
    LOGOUT_SUCCESS,
    CLEAR_ALL_AUTH_DATA,

    CLEAR_ORGANIZATION_FORM,
    CLEAR_ORGANIZATION_FORM_ERROR,
    CLEAR_ORGANIZATION_FORM_FIELD_ERROR,

    CHANGE_ORGANIZATION_FORM_TAB,

    CHANGE_ORGANIZATION_FORM_FIELD,
    CHANGE_ORGANIZATION_FORM_FIELDS,
    CHANGE_ORGANIZATION_FORM_MARKET_PLACE_FIELD,

    VALIDATE_ORGANIZATION_FORM_LEGAL_INFO,
    VALIDATE_ORGANIZATION_FORM_LEGAL_INFO_FIELD,

    VALIDATE_ORGANIZATION_FORM_MARKETPLACE,
    VALIDATE_ORGANIZATION_FORM_AFFILIATE_RELATIONSHIP,

    VALIDATE_ORGANIZATION_DATA_UNIQ_SUCCESS,

    SAVE_ORGANIZATION_REQUEST,
    SAVE_ORGANIZATION_SUCCESS,
    SAVE_ORGANIZATION_FAILURE
} = ACTION_TYPES

const {
    NON_UNIQ,
    NON_UNIQ_SHORT
} = VALIDATION_ERROR_TEXTS

const initialState = new InitialState()

export default function organizationFormReducer (state = initialState, action) {
    if (!(state instanceof InitialState)) {
        return initialState.mergeDeep(state)
    }

    switch (action.type) {
        case LOGOUT_SUCCESS:
        case CLEAR_ALL_AUTH_DATA:
        case CLEAR_ORGANIZATION_FORM:
            return state.clear()

        case CLEAR_ORGANIZATION_FORM_ERROR:
            return state.removeIn(['error'])

        case CLEAR_ORGANIZATION_FORM_FIELD_ERROR: {
            const name = action.payload
            return state.setIn(['fields', name + 'HasError'], false)
                .setIn(['fields', name + 'ErrorMsg'], '')
        }

        case CHANGE_ORGANIZATION_FORM_TAB:
            return state.setIn(['tab'], action.payload)

        case CHANGE_ORGANIZATION_FORM_FIELD: {
            const { name, value } = action.payload
            return state.setIn(['fields', name], value)
        }

        case CHANGE_ORGANIZATION_FORM_MARKET_PLACE_FIELD: {
            const { name, value } = action.payload
            return state.setIn(['fields', 'marketplace', name], value)
        }

        case CHANGE_ORGANIZATION_FORM_FIELDS:
            return state.mergeDeep({ fields: action.payload })

        case VALIDATE_ORGANIZATION_DATA_UNIQ_SUCCESS: {
            const {
                oid,
                name,
                companyId
            } = action.payload

            if (anyIsFalse(oid, name, companyId)) {
                const errorText = (s, v) => interpolate(s, 'organization', v)

                return state
                    .setIn(['isValid'], false)
                    .setIn(['isValidLegalInfoTab'], false)
                    .mergeIn(['fields'], {
                            ...oid === false && {
                                oidHasError: true,
                                oidErrorText: errorText(NON_UNIQ, 'OID')
                            },
                            ...name === false && {
                                nameHasError: true,
                                nameErrorText: errorText(NON_UNIQ_SHORT, 'name')
                            },
                            ...companyId === false && {
                                companyIdHasError: true,
                                companyIdErrorText: errorText(NON_UNIQ, 'Company ID')
                            }
                        }
                    )
            }

            break
        }

        case VALIDATE_ORGANIZATION_FORM_LEGAL_INFO: {
            const path = ['fields']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(['isValidLegalInfoTab'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case VALIDATE_ORGANIZATION_FORM_MARKETPLACE: {
            const path = ['fields', 'marketplace']
            const { success, errors } = action.payload

            return state
                .setIn(['isValid'], success)
                .setIn(['isValidMarketplaceTab'], success)
                .setIn(path, updateFieldErrors(state.getIn(path), errors))
        }

        case SAVE_ORGANIZATION_REQUEST: {
            return state.setIn(['isFetching'], true)
        }

        case SAVE_ORGANIZATION_SUCCESS: {
            return state.setIn(['isFetching'], false)
        }

        case SAVE_ORGANIZATION_FAILURE: {
            return state.setIn(['error'], action.payload)
                .setIn(['isFetching'], false)
        }
    }

    return state
}
