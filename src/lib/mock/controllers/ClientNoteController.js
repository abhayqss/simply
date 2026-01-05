import * as mock from '../MockData'
import Controller from './Controller'

class ClientNoteController extends Controller {
    getPath () {
        return 'clients/:clientId/notes'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getClientNotes({...vars, ...params})
                }
            },
            {
                path: '/:noteId',
                handler: (vars, params) => {
                    return mock.getClientNoteDetails({...vars, ...params})
                }
            },
            {
                path: '/:noteId/history',
                handler: (vars, params) => {
                    return mock.getClientNoteHistory({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getClientNoteCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new ClientNoteController()