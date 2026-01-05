import Need from './need/NeedInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    need: new Need(),
})

export default InitialState