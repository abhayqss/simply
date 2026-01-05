import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'
import { isEmpty } from 'lib/utils/Utils'

const { FIRST_PAGE } = PAGINATION

export class ClientService extends BaseService {
    find ({ name, page = FIRST_PAGE, sort, size = 10, filter }) {
        return super.request({
            url: `/clients`,
            params: { name, page: page - 1, sort, size, ...filter }
        })
    }

    findById (clientId) {
        return super.request({
            url: `/clients/${clientId}`,
            mockParams: { id: clientId }
        })
    }

    count () {
        return super.request({
            url: `/clients/count`
        })
    }

    save (data) {
        return super.request({
            method: isEmpty(data.id) ? 'POST' : 'PUT',
            url: `/clients`,
            body: data,
            type: 'multipart/form-data'
        })
    }

    findEmergencyContacts (clientId) {
        return super.request({
            url: `/clients/${clientId}/emergency-contacts`
        })
    }

    findBillingDetails (clientId) {
        return super.request({
            url: `/clients/${clientId}/billing-info`
        })
    }

    validateUniqInOrganization (data) {
        return super.request({
            url: '/clients/validate-uniq-in-organization',
            params: data
        })
    }

    validateUniqInCommunity (data) {
        return super.request({
            url: '/clients/validate-uniq-in-community',
            params: data
        })
    }
}

const service = new ClientService()
export default service