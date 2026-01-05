import BaseService from './BaseService'

import {
    PAGINATION,
    ALLOWED_FILE_FORMATS,
    ALLOWED_FILE_FORMAT_MIME_TYPES
} from 'lib/Constants'

import { isEmpty } from 'lib/utils/Utils'

const { FIRST_PAGE } = PAGINATION

const { PDF } = ALLOWED_FILE_FORMATS

export class ServicePlanService extends BaseService {
    find ({ clientId, searchText, page = FIRST_PAGE, sort, size = 10 }) {
        return super.request({
            url: `/clients/${clientId}/service-plans`,
            mockParams: { clientId },
            params: { searchText, page: page - 1, sort, size }
        })
    }

    isAnyInDevelopment (clientId) {
        return super.request({
            url: `/clients/${clientId}/service-plans/any-in-development`,
        })
    }

    findById (clientId, planId) {
        return super.request({
            url: `/clients/${clientId}/service-plans/${planId}`,
            mockParams: { id: planId },
        })
    }

    findHistory ({ name, clientId, servicePlanId, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/clients/${clientId}/service-plans/${servicePlanId}/history`,
            mockParams: { clientId },
            params: { name, page: page - 1, size }
        })
    }

    count (clientId) {
        return super.request({
            url: `/clients/${clientId}/service-plans/count`,
            mockParams: { id: clientId },
        })
    }

    download (clientId, planId) {
        return super.request({
            type: ALLOWED_FILE_FORMAT_MIME_TYPES[PDF],
            url: `/clients/${clientId}/service-plans/${planId}/download`
        })
    }

    save (servicePlan, clientId) {
        const isNew = isEmpty(servicePlan.id)

        return super.request({
            method: isNew ? 'POST' : 'PUT',
            url: `/clients/${clientId}/service-plans`,
            body: servicePlan,
            type: 'json'
        })
    }

    canAdd (clientId) {
        return super.request({
            url: `/clients/${clientId}/service-plans/can-add`
        })
    }
}

const service = new ServicePlanService()
export default service