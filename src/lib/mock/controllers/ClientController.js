import * as mock from '../MockData'
import Controller from './Controller'

class ClientController extends Controller {
    getPath () {
        return '/clients'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getClients({...vars, ...params})
                }
            },
            {
                path: '/:clientId',
                handler: (vars, params) => {
                    return mock.getClientDetails({...vars, ...params})
                }
            },
            {
                path: '/:clientId/history',
                handler: (vars, params) => {
                    return mock.getClientHistory({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getClientCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new ClientController()