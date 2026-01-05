import ActiveAlert from './activeAlert/ActiveAlertInitialState'
import SystemAlert from './systemAlert/SystemAlertInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    activeAlert: new ActiveAlert(),
    systemAlert: new SystemAlert()
})

export default InitialState