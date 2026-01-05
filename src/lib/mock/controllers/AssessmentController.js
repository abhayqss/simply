import * as mock from '../MockData'
import Controller from './Controller'

class AssessmentController extends Controller {
    getPath () {
        return 'clients/:clientId'
    }

    getHandlers () {
        return [
            {
                path: '/assessments',
                handler: (vars, params) => {
                    return mock.getAssessments({...vars, ...params})
                }
            },
            {
                path: '/assessments/:assessmentId',
                handler: (vars, params) => {
                    return mock.getAssessmentSurvey({...vars, ...params})
                }
            },
            {
                path: '/assessments/:assessmentId/history',
                handler: (vars, params) => {
                    return mock.getAssessmentHistory({...vars, ...params})
                }
            },
            {
                path: '/assessment-survey',
                handler: (vars, params) => {
                    return mock.getAssessmentSurvey({...vars, ...params})
                }
            },
            {
                path: '/assessment-management',
                handler: (vars, params) => {
                    return mock.getAssessmentManagement({...vars, ...params})
                }
            },
            {
                path: '/assessment-count',
                handler: (vars, params) => {
                    return mock.getAssessmentCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new AssessmentController()