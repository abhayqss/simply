import * as mock from '../MockData'
import Controller from './Controller'

class CommunityHandsetController extends Controller {
    getPath () {
        return '/organizations/:organizationId/communities/:communityId/handsets'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getCommunityHandsets({...vars, ...params})
                }
            },
            {
                path: '/:handsetId',
                handler: (vars, params) => {
                    return mock.getCommunityHandsetDetails({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getCommunityHandsetCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new CommunityHandsetController()