import Old from './old/OldPasswordInitialState'
import New from './new/NewPasswordInitialState'
import Create from './create/CreateInitialState'
import Reset from './reset/ResetPasswordInitialState'
import Complexity from './complexity/ComplexityInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    old: Old(),
    new: New(),
    reset: Reset(),
    create: Create(),
    complexity: Complexity(),
})

export default InitialState