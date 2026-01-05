import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'

const { FIRST_PAGE } = PAGINATION

export class DashboardService extends BaseService {
    find({name, page = FIRST_PAGE, size = 10, type}) {
        return super.request({
            url: `/dashboard`,
            params: {name, page: page - 1, size, type}
        })
    }

    findNotes({name, page = FIRST_PAGE, size = 10, organizationId}) {
        return super.request({
            url: `/notes`,
            params: {name, page: page - 1, size, organizationId}
        })
    }

    findEvents({name, page = FIRST_PAGE, size = 10, organizationId}) {
        return super.request({
            url: `/events`,
            params: {name, page: page - 1, size, organizationId}
        })
    }

    findServicePlanCount() {
        return super.request({
            url: `/service-plans/status-count`,
        })
    }

    findAssessmentCount() {
        return super.request({
            url: `/assessments/status-count`,
        })
    }
}

const service = new DashboardService()
export default service