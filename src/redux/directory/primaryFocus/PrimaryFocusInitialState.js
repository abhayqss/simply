import PrimaryFocus from './list/PrimaryFocusListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new PrimaryFocus(),
})

export default InitialState