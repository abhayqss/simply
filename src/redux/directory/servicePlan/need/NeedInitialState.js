import Domain from './domain/DomainInitialState'
import Priority from './priority/PriorityInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    domain: new Domain(),
    priority: new Priority(),
})

export default InitialState