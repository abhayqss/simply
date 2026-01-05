import * as mock from '../MockData'
import Controller from './Controller'

class MarketplaceCommunityController extends Controller {
    getPath () {
        return '/marketplace-communities'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getMarketplaceCommunities({...vars, ...params})
                }
            },
            {
                path: '/:communityId',
                handler: (vars, params) => {
                    return mock.getMarketplaceCommunityDetails({...vars, ...params})
                }
            },
            {
                path: '/:communityId/history',
                handler: (vars, params) => {
                    return mock.getContactHistory({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getMarketplaceCommunityCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new MarketplaceCommunityController()