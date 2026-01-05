import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'
import { isEmpty } from 'lib/utils/Utils'

const { FIRST_PAGE } = PAGINATION

export class CommunityService extends BaseService {
    find ({ orgId, name, sort, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/organizations/${orgId}/communities`,
            mockParams : { orgId },
            params: { name, sort, page: page - 1, size }
        })
    }

    findById (orgId, commId, isMarketplaceDataIncluded = false) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}`,
            params: {
                marketplaceDataIncluded: isMarketplaceDataIncluded
            },
            mockParams: {
                orgId: orgId,
                id: commId,
                marketplaceDataIncluded: isMarketplaceDataIncluded
            }
        })
    }

    downloadLogo (orgId, commId) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}/logo`
        })
    }

    count (orgId) {
        return super.request({
            url: `/organizations/${orgId}/communities/count`
        })
    }

    save (orgId, community) {
        return super.request({
            method: isEmpty(community.id) ? 'PUT' : 'POST',
            url: `/organizations/${orgId}/communities`,
            body: community,
            type: 'multipart/form-data',
        })
    }

    canAdd (orgId) {
        return super.request({
            url: `/organizations/${orgId}/communities/can-add`
        })
    }

    validateUniq (orgId, data) {
        return super.request({
            url: `/organizations/${orgId}/communities/validate-uniq`,
            params: data
        })
    }
}

const service = new CommunityService()
export default service