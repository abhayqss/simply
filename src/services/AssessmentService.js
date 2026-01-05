import BaseService from './BaseService'
import { PAGINATION } from 'lib/Constants'
import { isEmpty } from 'lib/utils/Utils'

const { FIRST_PAGE } = PAGINATION

export class AssessmentService extends BaseService {
    find ({ name, clientId, page = FIRST_PAGE, size = 10, sort }) {
        return super.request({
            url: `/clients/${clientId}/assessments`,
            params: { name, page: page - 1, size, sort }
        })
    }

    findById (clientId, assessmentId) {
        return super.request({
            url: `/clients/${clientId}/assessments/${assessmentId}`
        })
    }

    findHistory ({ name, clientId, assessmentId, page = FIRST_PAGE, size = 10 }) {
        return super.request({
            url: `/clients/${clientId}/assessments/${assessmentId}/history`,
            params: { name, page: page - 1, size }
        })
    }

    count (clientId) {
        return super.request({
            url: `/clients/${clientId}/assessments/count`
        })
    }

    save (clientId, assessment) {
        const isNew = isEmpty(assessment.id)

        return super.request({
            method: isNew ? 'PUT' : 'POST',
            url: `/clients/${clientId}/assessments`,
            body: assessment,
            type: 'json'
        })
    }
}

const service = new AssessmentService()
export default service