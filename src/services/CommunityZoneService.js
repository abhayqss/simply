import BaseService from './BaseService'

import { isEmpty } from 'lib/utils/Utils'
import { PAGINATION } from 'lib/Constants'

const { FIRST_PAGE } = PAGINATION

export class CommunityZoneService extends BaseService {
    find ({ orgId, commId, name, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}/zones`,
            mockParams: { orgId, commId },
            params: { name, page: page - 1, size }
        })
    }

    findById (zoneId) {
        return super.request({
            url: `/zones/${zoneId}`,
            mockParams: { id: zoneId },
        })
    }

    count (orgId, commId) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}/zones/count`
        })
    }

    save (orgId, commId, zone) {
        const isNew = isEmpty(zone.id)

        return super.request({
            method: isNew ? 'PUT' : 'POST',
            url: `organizations/${orgId}/communities/${commId}/zones`,
            body: zone,
            type: 'json'
        })
    }
}

const service = new CommunityZoneService()
export default service