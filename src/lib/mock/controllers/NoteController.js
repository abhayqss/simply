import * as mock from '../MockData'
import Controller from './Controller'

class NoteController extends Controller {
    getPath () {
        return '/notes'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getNotes({...vars, ...params})
                }
            },
            {
                path: '/:noteId',
                handler: (vars, params) => {
                    return mock.getNoteDetails({...vars, ...params})
                }
            },
            {
                path: '/:noteId/history',
                handler: (vars, params) => {
                    return mock.getNoteHistory({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getNoteCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new NoteController()