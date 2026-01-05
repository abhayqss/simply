import Service from './service/AdditionalServiceInitialState'

const { Record } = require('immutable')

export default Record({
    service: Service()
})
