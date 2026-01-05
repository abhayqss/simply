import Language from './list/LanguageListInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    list: new Language(),
})

export default InitialState