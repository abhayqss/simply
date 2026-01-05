import * as mock from '../MockData'
import Controller from './Controller'

class ContactController extends Controller {
    getPath () {
        return '/contacts'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getContacts({...vars, ...params})
                }
            },
            {
                path: '/:contactId',
                handler: (vars, params) => {
                    return mock.getContactDetails({...vars, ...params})
                }
            },
            {
                path: '/:contactId/history',
                handler: (vars, params) => {
                    return mock.getContactHistory({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getContactCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new ContactController()