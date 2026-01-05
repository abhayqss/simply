import * as mock from '../MockData'
import Controller from './Controller'

class ClientCareTeamMemberController extends Controller {
    getPath () {
        return '/clients/:clientId/care-team'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    return mock.getCareTeamMembers({...vars, ...params})
                }
            },
            {
                path: '/:careTeamId',
                handler: (vars, params) => {
                    return mock.getCareTeamMemberDetails({...vars, ...params})
                }
            },
            {
                path: '/:careTeamId/history',
                handler: (vars, params) => {
                    return mock.getCareTeamMemberHistory({...vars, ...params})
                }
            },
            {
                path: '/count',
                handler: (vars, params) => {
                    return mock.getCareTeamMemberCount({...vars, ...params})
                }
            },
        ]
    }
}

export default new ClientCareTeamMemberController()