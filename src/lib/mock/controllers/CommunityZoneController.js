import * as mock from '../MockData'
import Controller from './Controller'

class CommunityZoneController extends Controller {
    getPath () {
        return '/organizations/:organizationId/communities/:communityId/zones'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getCommunityZones({...vars, ...params})
                }
            },
            {
                path: '/:zoneId',
                handler: (vars, params) => {
                    return mock.getCommunityZoneDetails({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getCommunityZoneCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new CommunityZoneController()