import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'
import { isEmpty } from 'lib/utils/Utils'

const { FIRST_PAGE } = PAGINATION

export class OrganizationService extends BaseService {
    find ({ name, sort, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            /*url: `/organizations`,*/
            url: `/organizations`,
            params: { name, sort, page: page - 1, size }
        })
    }

    findById (orgId, isMarketplaceDataIncluded = false) {
        return super.request({
            url: `/organizations/${orgId}`,
            params: {
                marketplaceDataIncluded: isMarketplaceDataIncluded
            },
            mockParams: {
                id: orgId,
                marketplaceDataIncluded: isMarketplaceDataIncluded
            }
        })
    }

    downloadLogo (orgId) {
        return super.request({
            url: `/organizations/${orgId}/logo`
        })
    }

    count () {
        return super.request({
            url: `/organizations/count`
        })
    }

    save (organization) {
        const isNew = isEmpty(organization.id)

        return super.request({
            method: isNew ? 'PUT' : 'POST',
/*            url: `/organizations`,*/
            url: `/organizations`,
            body: organization,
            type: 'multipart/form-data',
        })
    }

    canAdd () {
        return super.request({
            url: '/organizations/can-add'
        })
    }

    validateUniq (data) {
        return super.request({
            url: '/organizations/validate-uniq',
            params: data
        })
    }
}

const service = new OrganizationService()
export default service