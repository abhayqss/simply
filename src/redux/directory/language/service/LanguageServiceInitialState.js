import List from './list/languageServiceListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: List()
})

export default InitialState