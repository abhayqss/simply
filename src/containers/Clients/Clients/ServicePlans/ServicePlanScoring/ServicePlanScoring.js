import React, {Component} from 'react'

import PropTypes from 'prop-types'

import {
    map,
    keys,
    sortBy,
    groupBy,
    isNumber,
    findWhere
} from 'underscore'

import { connect } from 'react-redux'

import {Button, Col, Row} from 'reactstrap'

import './NeedSection.scss'

import TextField from 'components/Form/TextField/TextField'
import DateField from 'components/Form/DateField/DateField'
import SelectField from 'components/Form/SelectField/SelectField'

import {ReactComponent as Delete} from 'images/delete.svg'

import GoalSection from '../GoalSection/GoalSection'

const RELEVANT_ACTIVATION_OR_EDUCATION_TASK = "RELEVANT_ACTIVATION_OR_EDUCATION_TASK"

function mapStateToProps(state) {
    return {
        form: state.directory,
        details: state.directory,
        directory: state.directory
    }
}

class ServicePlanScoring extends Component {

    static propTypes = {
        planId: PropTypes.number
    }

    render() {
        const {
            form,
            planId,
            details,
            directory
        } = this.props

        const domains = (
            directory
                .servicePlan
                .need
                .domain
                .list
                .dataSource
                .data
        )

        const needs = map(
            isNumber(planId) ? (
                (details.data || {}).needs
            ) : form.fields.needs,
            o => ({
                ...o,
                domainTitle: (
                    findWhere(domains, { id: o.id }) || {}
                ).title
            })
        )

        const grouped = groupBy(
            needs, need => need.fields.domainName
        )

        const domainNames = sortBy(keys(grouped))

        return (
            <div className="ServicePlanScoring">

            </div>
        )
    }
}

export default connect(mapStateToProps, null)(ServicePlanScoring)
