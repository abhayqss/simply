import Rules from './rules/ComplexityRulesInitialState'

const { Record } = require('immutable')

const InitialState = Record({
    rules: new Rules()
})

export default InitialState