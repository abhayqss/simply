import * as mock from '../MockData'
import Controller from './Controller'

class EventController extends Controller {
    getPath () {
        return '/events'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getEvents({...vars, ...params})
                }
            },
            {
                path: '/:eventId',
                handler: (vars, params) => {
                    return mock.getEventDetails({...vars, ...params})
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
                    return mock.getEventRelatedNotes({...vars, ...params})
                }
            },
            {
                path: '/:eventId/notifications',
                handler: (vars, params) => {
                    return mock.getEventSentNotifications({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getEventCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new EventController()