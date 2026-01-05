import BaseService from './BaseService'

import { isEmpty } from 'lib/utils/Utils'
import { PAGINATION } from 'lib/Constants'

const { FIRST_PAGE } = PAGINATION

export class ClientDocumentService extends BaseService {
    find ({ clientId, page = FIRST_PAGE, size = 10, name, typeId}) {
        return super.request({
            /*            url: `/clients/${clientId}/documents`,*/
            url: `/clients/${clientId}/documents`,
            mockParams: { clientId },
            params: { page: page - 1, size, name, typeId},
        })
    }

    findById (documentId, clientId, userId) {
        return super.request({
            url: `/clients/${clientId}/documents/${documentId}`,
            mockParams: { id: documentId },
        })
    }

    findHistory ({ userId, clientId, documentId, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/clients/${clientId}/documents/${documentId}/history`,
            params: { page: page - 1, size }
        })
    }

    count (clientId, userId) {
        return super.request({
            url: `/clients/${clientId}/documents/count`,
            mockParams: { id: clientId },
        })
    }

    save (document, clientId, userId) {
        return super.request({
            method: 'POST',
            url: `/clients/${clientId}/documents/upload`,
            body: document,
            type: 'multipart/form-data',
        })
    }

    deleteById (documentId, clientId, userId) {
        return super.request({
            method: 'DELETE',
            url: `/clients/${clientId}/documents/${documentId}`,
            mockParams: { id: documentId },
        })
    }
}

const service = new ClientDocumentService()
export default service