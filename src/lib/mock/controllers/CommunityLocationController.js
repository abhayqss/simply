import * as mock from '../MockData'
import Controller from './Controller'

class CommunityLocationController extends Controller {
    getPath () {
        return '/organizations/:organizationId/communities/:communityId/locations'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getCommunityLocations({...vars, ...params})
                }
            },
            {
                path: '/:locationId',
                handler: (vars, params) => {
                    return mock.getCommunityLocationDetails({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getCommunityLocationCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new CommunityLocationController()