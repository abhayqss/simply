const { Record } = require('immutable')

const Filter = Record({
    fields: Record({
        serviceIds: [],
        insuranceId: null ,
        primaryFocusIds: [],
        communityTypeIds: [],
    })()
})

export default Filter