import * as mock from '../MockData'
import Controller from './Controller'

class OrganizationController extends Controller {
    getPath () {
        return '/organizations'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getOrganizations({...vars, ...params})
                }
            },
            {
                path: '/:organizationId',
                handler: (vars, params) => {
                    return mock.getOrganizationDetails({...vars, ...params})
                }
            },
            {
                path: '/:organizationId/basic',
                handler: (vars, params) => {
                    return mock.getOrganizationDetails({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getOrganizationCount(params)
                }
            },
        ]
    }
}

export default new OrganizationController()