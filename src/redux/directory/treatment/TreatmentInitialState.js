import Service from './service/TreatmentServiceInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    service: Service()
})

export default InitialState