import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'
import { isEmpty } from 'lib/utils/Utils'

const { FIRST_PAGE } = PAGINATION

export class CommunityLocationService extends BaseService {
    find ({ orgId, commId, name, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}/locations`,
            mockParams: { orgId, commId },
            params: { name, page: page - 1, size, }
        })
    }

    findById (locationId) {
        return super.request({
            url: `/locations/${locationId}`,
            mockParams: { id: locationId },
        })
    }

    count (orgId, commId) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}/locations/count`
        })
    }

    save (orgId, commId, location) {
        const isNew = isEmpty(location.id)

        return super.request({
            method: isNew ? 'PUT' : 'POST',
            url: `organizations/${orgId}/communities/${commId}/locations`,
            body: location,
            type: 'json'
        })
    }
}

const service = new CommunityLocationService()
export default service