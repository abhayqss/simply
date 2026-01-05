import * as mock from '../MockData'
import Controller from './Controller'

class ServicePlanController extends Controller {
    getPath () {
        return 'clients/:clientId/service-plans'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getServicePlans({...vars, ...params})
                }
            },
            {
                path: '/:planId',
                handler: (vars, params) => {
                    return mock.getServicePlanById({...vars, ...params})
                }
            },
            {
                path: '/:planId/history',
                handler: (vars, params) => {
                    return mock.getServicePlanHistory({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getServicePlanCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new ServicePlanController()