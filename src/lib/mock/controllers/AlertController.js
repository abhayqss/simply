import Controller from './Controller'

import {getActiveAlerts, getSystemAlerts} from '../MockData'

import {ALERT_TYPES} from '../../Constants'

const {ACTIVE_ALERT} = ALERT_TYPES

class AlertController extends Controller {
    getPath () {
        return '/alerts'
    }

    getHandlers () {
        return [
            {
                path: '',
                handler: (vars, params) => {
                    if (params.type === ACTIVE_ALERT) {
                        return getActiveAlerts({...vars, ...params})
                    }

                    else {
                        return getSystemAlerts({...vars, ...params})
                    }
                }
            },
        ]
    }
}

export default new AlertController()