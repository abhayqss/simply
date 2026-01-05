import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'
import { isEmpty } from 'lib/utils/Utils'

import { omit } from 'underscore'

const { FIRST_PAGE } = PAGINATION

function getUrl (clientId, path) {
    return clientId
        ? `/clients/${clientId}${path}`
        : path
}

export class NoteService extends BaseService {
    find ({ name, clientId, page = FIRST_PAGE, size = 10 , filter}) {
        const customFilter = clientId ? omit(filter, ['organizationId', 'communityIds']) : filter

        return super.request({
            url: getUrl(clientId, `/notes`),
            params: { name, page: page - 1, size, ...customFilter, }
        })
    }

    findById (noteId, clientId) {
        return super.request({
            url:  `/notes/${noteId}`,
            mockParams: { id: noteId, clientId },
        })
    }

    findComposed ({ name, clientId, page = FIRST_PAGE, size = 10 , filter}) {
        const customFilter = clientId ? omit(filter, ['organizationId', 'communityIds']) : filter

        return super.request({
            url:  clientId ? `/clients/${clientId}/composed-event-note` : `/notes/composed`,
            params: { name, page: page - 1, size, ...customFilter, }
        })
    }

    findComposedCount (clientId) {
        return super.request({
            url:  clientId ? `/clients/${clientId}/composed-event-note/count` : `/notes/composed/count`,
        })
    }

    findRelatedNotes ({ name, clientId, eventId, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/notes/related-note`,
            params: { name, page: page - 1, size , eventId, clientId},
            mockParams: { id: eventId, clientId }
        })
    }

    findHistory ({ name, clientId, noteId, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url:`/notes/${noteId}/history`,
            params: { name, page: page - 1, size },
            mockParams: { id: noteId, clientId }
        })
    }

    count (clientId) {
        return super.request({
            /*            url: `/notes/count`,*/
            url: getUrl(clientId, `/notes/count`)
        })
    }

    save (note, clientId) {
        const isNew = isEmpty(note.id)

        return super.request({
            method: isNew ? 'POST' : 'PUT',
            /*            url: `/notes`,*/
            url: getUrl(clientId, `/notes`),
            body: note,
            type: 'json'
        })
    }
}

const service = new NoteService()
export default service

