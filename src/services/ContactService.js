import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'
import { isEmpty } from 'lib/utils/Utils'

const { FIRST_PAGE } = PAGINATION

export class ContactService extends BaseService {
    find ({ name, page = FIRST_PAGE, sort, size = 10, filter }) {
        return super.request({
            url: `/contacts`,
            params: { name, page: page - 1, size, sort, ...filter }
        })
    }

    findById (contactId) {
        return super.request({
            url: `/contacts/${contactId}`,
            mockParams: { id: contactId },
        })
    }

    count () {
        return super.request({
            url: `/contacts/count`
        })
    }

    save (data) {
        return super.request({
            method: isEmpty(data.id) ? 'POST' : 'PUT',
            url: `/contacts`,
            body: data,
            type: 'multipart/form-data'
        })
    }

    canAdd (params) {
        return super.request({
            url: '/contacts/can-add',
            params
        })
    }

    invite (contactId) {
        return super.request({
            method: 'POST',
            url: `/contacts/${contactId}/invite`,
        })
    }

    validateUniq (data) {
        return super.request({
            url: '/contacts/validate-uniq',
            params: data
        })
    }
}

const service = new ContactService()
export default service