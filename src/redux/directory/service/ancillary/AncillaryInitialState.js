import Ancillary from './list/AncillaryListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new Ancillary(),
})

export default InitialState