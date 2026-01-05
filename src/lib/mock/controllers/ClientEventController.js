import * as mock from '../MockData'
import Controller from './Controller'

class ClientEventController extends Controller {
    getPath () {
        return 'client/:clientId/events'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getClientEvents({...vars, ...params})
                }
            },
            {
                path: '/:eventId',
                handler: (vars, params) => {
                    return mock.getClientEventDetails({...vars, ...params})
                }
            },
            {
                path: '/composed-events-notes',
                handler: (vars, params) => {
                    return mock.getComposedEventsNotes({...vars, ...params})
                }
            },
            {
                path: '/:eventId/notes',
                handler: (vars, params) => {
                    return mock.getClientEventRelatedNotes({...vars, ...params})
                }
            },
            {
                path: '/:eventId/notifications',
                handler: (vars, params) => {
                    return mock.getClientEventSentNotifications({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getClientEventCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new ClientEventController()