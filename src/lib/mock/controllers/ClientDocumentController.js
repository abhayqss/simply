import * as mock from '../MockData'
import Controller from './Controller'

class DocumentController extends Controller {
    getPath () {
        return 'clients/:clientId/documents'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getClientDocuments({...vars, ...params})
                }
            },
            {
                path: '/:planId',
                handler: (vars, params) => {
                    return mock.getClientDocumentById({...vars, ...params})
                }
            },
            {
                path: '/:planId/history',
                handler: (vars, params) => {
                    return mock.getClientDocumentHistory({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getClientDocumentCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new DocumentController()