import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'

const { FIRST_PAGE } = PAGINATION

export class AlertService extends BaseService {
    find ({ page = FIRST_PAGE, size = 10, type }) {
        return super.request({
            url: `/alerts`,
            params: { page: page - 1, size, type }
        })
    }

    findById (alertId) {
        return super.request({
            url: `/alerts/${alertId}`
        })
    }

    count (type) {
        return super.request({
            url: `/alerts/count`,
            params: { type }
        })
    }

    /*save (alert) {
        const isNew = isEmpty(alert.id)

        return super.request({
            method: isNew ? 'PUT' : 'POST',
            url: `/notify/active-alerts`,
            body: alert,
            type: 'json'
        })
    }*/
}

const service = new AlertService()
export default service