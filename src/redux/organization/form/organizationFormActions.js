import { ACTION_TYPES } from 'lib/Constants'

import { defer, allAreTrue } from 'lib/utils/Utils'

import service from 'services/OrganizationService'
import legalInfoValidator from 'validators/OrganizationFormLegalInfoValidator'
import marketplaceValidator from 'validators/OrganizationFormMarketplaceValidator'

const {
    CLEAR_ORGANIZATION_FORM,
    CLEAR_ORGANIZATION_FORM_ERROR,
    CLEAR_ORGANIZATION_FORM_FIELD_ERROR,

    CHANGE_ORGANIZATION_FORM_TAB,

    CHANGE_ORGANIZATION_FORM_FIELD,
    CHANGE_ORGANIZATION_FORM_FIELDS,
    CHANGE_ORGANIZATION_FORM_MARKET_PLACE_FIELD,

    VALIDATE_ORGANIZATION_DATA_UNIQ_REQUEST,
    VALIDATE_ORGANIZATION_DATA_UNIQ_SUCCESS,
    VALIDATE_ORGANIZATION_DATA_UNIQ_FAILURE,

    VALIDATE_ORGANIZATION_FORM_LEGAL_INFO,
    VALIDATE_ORGANIZATION_FORM_MARKETPLACE,
    VALIDATE_ORGANIZATION_FORM_AFFILIATE_RELATIONSHIP,

    SAVE_ORGANIZATION_REQUEST,
    SAVE_ORGANIZATION_SUCCESS,
    SAVE_ORGANIZATION_FAILURE
} = ACTION_TYPES

export function clear () {
    return { type: CLEAR_ORGANIZATION_FORM }
}

export function clearError () {
    return { type: CLEAR_ORGANIZATION_FORM_ERROR }
}

export function clearFieldError (name) {
    return {
        type: CLEAR_ORGANIZATION_FORM_FIELD_ERROR,
        payload: name
    }
}

export function changeTab (tab) {
    return {
        type: CHANGE_ORGANIZATION_FORM_TAB,
        payload: tab
    }
}

export function changeField (name, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_ORGANIZATION_FORM_FIELD,
                payload: { name, value }
            })
        })
    }
}

export function changeMarketplaceField (name, value) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_ORGANIZATION_FORM_MARKET_PLACE_FIELD,
                payload: { name, value }
            })
        })
    }
}

export function changeFields (changes) {
    return dispatch => {
        return defer().then(() => {
            dispatch({
                type: CHANGE_ORGANIZATION_FORM_FIELDS,
                payload: changes
            })
        })
    }
}

function validate (data, validator, actionType) {
    return dispatch => {
        return validator.validate(data).then(() => {
            dispatch({ type: actionType, payload: { success: true } })
            return true
        }).catch(errors => {
            dispatch({ type: actionType, payload: { success: false, errors } })
            return false
        })
    }
}

export function validateLegalInfo (data) {
    return validate(data, legalInfoValidator, VALIDATE_ORGANIZATION_FORM_LEGAL_INFO)
}

export function validateMarketplace (data) {
    return validate(data, marketplaceValidator, VALIDATE_ORGANIZATION_FORM_MARKETPLACE)
}

export function validateAffiliateRelationship (data) {
    return validate(data, legalInfoValidator, VALIDATE_ORGANIZATION_FORM_AFFILIATE_RELATIONSHIP)
}

export function validateUniq (data) {
    return dispatch => {
        dispatch({ type: VALIDATE_ORGANIZATION_DATA_UNIQ_REQUEST })
        return service.validateUniq(data).then(({ data } = {}) => {
            dispatch({ type: VALIDATE_ORGANIZATION_DATA_UNIQ_SUCCESS, payload: data })

            return allAreTrue(
                data.oid !== null ? data.oid : true,
                data.name !== null ? data.name : true,
                data.companyId !== null ? data.companyId : true
            )
        }).catch(e => {
            dispatch({ type: VALIDATE_ORGANIZATION_DATA_UNIQ_FAILURE, payload: e })
        })
    }
}

export function submit (organization) {
    return dispatch => {
        dispatch({ type: SAVE_ORGANIZATION_REQUEST })
        return service.save(organization).then(response => {
            dispatch({ type: SAVE_ORGANIZATION_SUCCESS, payload: response })
            return response
        }).catch(e => {
            dispatch({ type: SAVE_ORGANIZATION_FAILURE, payload: e })
        })
    }
}
