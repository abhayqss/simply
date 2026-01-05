import Controller from './Controller'

import * as mock from '../MockData'

import {DASHBOARD_TYPES} from '../../Constants'

const {
    CASELOAD,
    APPOINTMENT,
    RECENT_NOTE,
    RECENT_EVENT,
} = DASHBOARD_TYPES

class DashboardController extends Controller {
    getPath () {
        return '/dashboard'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    switch(params.type){
                        case CASELOAD: resolve(mock.getDashboardCaseloads(params))
                            break;
                        case APPOINTMENT: resolve(mock.getDashboardAppointments(params))
                            break;
                        case RECENT_EVENT: resolve(mock.getDashboardRecentEvents(params))
                            break;
                        case RECENT_NOTE: resolve(mock.getDashboardRecentNotes(params))
                            break;

                        default: return [];
                    }
                }
            },
        ]
    }
}

export default new DashboardController()