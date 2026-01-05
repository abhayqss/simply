import Add from './add/canAddServicePlanInitialState'

const { Record } = require('immutable');

export default Record({
    add: Add()
});