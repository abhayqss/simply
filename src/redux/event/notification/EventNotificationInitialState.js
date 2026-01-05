import List from './list/EventNotificationListInitialState'

const { Record } = require('immutable')

export default Record({
    list: new List(),
})