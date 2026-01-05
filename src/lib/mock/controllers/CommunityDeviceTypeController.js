import * as mock from '../MockData'
import Controller from './Controller'

class CommunityDeviceTypeController extends Controller {
    getPath () {
        return '/organizations/:organizationId/communities/:communityId/device-types'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getCommunityDeviceTypes({...vars, ...params})
                }
            },
            {
                path: '/:deviceTypeId',
                handler: (vars, params) => {
                    return mock.getCommunityDeviceTypeDetails({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getCommunityDeviceTypeCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new CommunityDeviceTypeController()