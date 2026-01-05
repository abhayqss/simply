import Service from './service/LanguageServiceInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    service: Service()
})

export default InitialState