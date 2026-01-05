import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'

const { FIRST_PAGE } = PAGINATION

export class MarketplaceCommunityService extends BaseService {
    find ({ communityId, page = FIRST_PAGE, size = 10, ...other }) {
        return super.request({
            url: `/marketplace/communities${communityId ? `/${communityId}/partners`: ''}`,
            params: { page: page - 1, size, ...other }
        })
    }

    findById (communityId) {
        return super.request({
            url: `/marketplace/communities/${communityId}`,
            mockParams: { communityId },
        })
    }

    count () {
        return super.request({
            url: `/marketplace/communities/count`
        })
    }

    appointment (communityId, data) {
        return super.request({
            method: 'POST',
            url: `/marketplace/communities/${communityId}/appointment`,
            body: data,
            type: 'json'
        })
    }
}

const service = new MarketplaceCommunityService()
export default service