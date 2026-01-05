import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'
import { isEmpty } from 'lib/utils/Utils'

const { FIRST_PAGE } = PAGINATION

export class CommunityDeviceTypeService extends BaseService {
    find ({ orgId, commId, name, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}/device-types`,
            mockParams: { orgId, commId },
            params: { name, page: page - 1, size }
        })
    }

    findById (deviceTypeId, orgId, commId) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}/device-types/${deviceTypeId}`,
            mockParams: { id: deviceTypeId },
        })
    }

    count (orgId, commId) {
        return super.request({
            url: `/organizations/${orgId}/communities/${commId}/device-types/count`
        })
    }

    save (orgId, commId, deviceType) {
        const isNew = isEmpty(deviceType.id)

        return super.request({
            method: isNew ? 'PUT' : 'POST',
            url: `organizations/${orgId}/communities/${commId}/device-types`,
            body: deviceType,
            type: 'json'
        })
    }
}

const service = new CommunityDeviceTypeService()
export default service