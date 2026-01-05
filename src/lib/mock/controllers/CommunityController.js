import * as mock from '../MockData'
import Controller from './Controller'

class CommunityController extends Controller {
    getPath () {
        return '/organizations/:organizationId/communities'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getCommunities({...vars, ...params})
                }
            },
            {
                path: '/:communityId',
                handler: (vars, params) => {
                    return mock.getCommunityDetails({...vars, ...params})
                }
            },
            {
                path: '/:communityId/basic',
                handler: (vars, params) => {
                    return mock.getCommunityDetails({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getCommunityDetails({...vars, ...params})
                }
            },
        ]
    }
}

export default new CommunityController()