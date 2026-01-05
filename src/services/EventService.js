import BaseService from './BaseService'

import { isEmpty } from 'lib/utils/Utils'
import { PAGINATION } from 'lib/Constants'

import { omit } from 'underscore'

const { FIRST_PAGE } = PAGINATION

function getUrl (clientId, path) {
    return clientId
        ? `/clients/${clientId}${path}`
        : path
}

export class EventService extends BaseService {
    find ({ name, organizationId, clientId, page = FIRST_PAGE, size = 10, filter }) {
        const customFilter = clientId ? omit(filter, ['organizationId', 'communityIds']) : filter

        return super.request({
            url: getUrl(clientId, `/events`),
            params: {name, page: page - 1, size, ...customFilter},
        })
    }

    findById (eventId, clientId) {
        return super.request({
            url: `/events/${eventId}`,
            mockParams: { id: eventId, clientId },
        })
    }

   /* findComposedEventsNotes ({ name, clientId, page = FIRST_PAGE, size = 10, filter }) {
        return super.request({
            url: getUrl(clientId, `/notes/composed-events-note`),
            params: { name, page: page - 1, size, clientId, ...filter },
        })
    }*/

    findNotes ({ name, clientId, eventId, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/events/${eventId}/notes`,
            params: { name, page: page - 1, size },
            mockParams: { id: eventId, clientId }
        })
    }

    findSentNotifications ({ name, clientId, eventId, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/event-notification/event/${eventId}`,
            params: { name, page: page - 1, size , clientId},
            mockParams: { id: eventId, clientId }
        })
    }

    count (clientId) {
        return super.request({
            url: getUrl(clientId, `/events/count`)
        })
    }

    save (event, clientId) {
        const isNew = isEmpty(event.id)

        return super.request({
            method: isNew ? 'POST' : 'PUT',
            url: getUrl(clientId, `/events`),
            body: event,
            type: 'json'
        })
    }
}

const service = new EventService()
export default service