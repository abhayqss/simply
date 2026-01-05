import BaseService from './BaseService'

import { isEmpty } from 'lib/utils/Utils'
import { PAGINATION } from 'lib/Constants'

const { FIRST_PAGE } = PAGINATION

export class CommunityHandsetService extends BaseService {
    find ({ orgId, commId, name, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}/handsets`,
            mockParams: { orgId, commId },
            params: { name, page: page - 1, size }
        })
    }

    findById (handsetId) {
        return super.request({
            url: `/handsets/${handsetId}`,
            mockParams: { id: handsetId },
        })
    }

    count (orgId, commId) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}/handsets/count`
        })
    }

    save (orgId, commId, handset) {
        const isNew = isEmpty(handset.id)

        return super.request({
            method: isNew ? 'PUT' : 'POST',
            url: `organizations/${orgId}/communities/${commId}/handsets`,
            body: handset,
            type: 'json'
        })
    }
}

const service = new CommunityHandsetService()
export default service