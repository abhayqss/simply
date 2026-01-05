import React from 'react'

import { map } from 'underscore'

import Table from 'components/Table/Table'

import './ScoringSection.scss'

import { DateUtils } from 'lib/utils/Utils'

const { format, formats } = DateUtils

const DATE_FORMAT = formats.americanMediumDate

/*const RELEVANT_ACTIVATION_OR_EDUCATION_TASK = "RELEVANT_ACTIVATION_OR_EDUCATION_TASK"*/

function ScoringSection({ index, fields, style, isInViewMode }) {
    const {
        goals,
        needOpportunity,
        proficiencyGraduationCriteria,
    } = fields

    const sortedGoals = goals && goals.slice().sort((prev, next) => {
        const prevGoal = prev.fields || prev
        const nextGoal = next.fields || next

        return prevGoal.targetCompletionDate - nextGoal.targetCompletionDate
        || +prevGoal.goalCompletion - nextGoal.goalCompletion
    }) || []

    return (
        <div className="ScoringSection">
            <div className="ScoringSection-DetailWrapper" style={style}>
                <span className="ScoringSection-DetailCount">
                    {index}
                </span>
                <div className="ScoringSection-Detail"
                    style={{ borderTop: '1px solid #e0e0e0' }}>
                    <div className="ScoringSection-DetailTitle">
                        Need / Opportunity
                    </div>
                    <div className="ScoringSection-DetailText">
                        {needOpportunity}
                    </div>
                </div>
                <span className="ScoringSection-DetailSeparator" />
                {proficiencyGraduationCriteria && (
                    <div className="ScoringSection-Detail"
                        style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <div className="ScoringSection-DetailTitle">
                            Proficiency / Graduation Criteria
                        </div>
                        <div className="ScoringSection-DetailText">
                            {proficiencyGraduationCriteria}
                        </div>
                    </div>
                )}
            </div>
            {sortedGoals.length > 0 && (
                <Table
                    keyField="id"
                    className="ScoringSectionList"
                    data={isInViewMode
                        ? sortedGoals
                        : map(sortedGoals, o => o.fields)
                    }
                    columns={[
                        {
                            dataField: 'goal',
                            text: 'Goal',
                            headerStyle: {
                                width: '166px',
                                verticalAlign: 'top'
                            }
                        },
                        {
                            dataField: 'goalCompletion',
                            text: '%',
                            headerStyle: {
                                width: '58px',
                                verticalAlign: 'top'
                            },
                            style: {
                                fontWeight: 600
                            }
                        },
                        {
                            dataField: 'barriers',
                            text: 'Barriers',
                            headerStyle: {
                                width: '205px',
                                verticalAlign: 'top'
                            }
                        },
                        {
                            dataField: 'interventionAction',
                            text: 'Intervention / Action',
                            headerStyle: {
                                width: '161px',
                                verticalAlign: 'top'
                            }
                        },
                        {
                            dataField: 'resourceName',
                            text: 'Resource Name',
                            headerStyle: {
                                width: '129px',
                                verticalAlign: 'top'
                            }
                        },
                        {
                            dataField: 'targetCompletionDate',
                            text: 'Target Completion Date',
                            headerStyle: {
                                width: '109px',
                                verticalAlign: 'top'
                            },
                            formatter: v => v && format(v, DATE_FORMAT)
                        },
                        {
                            dataField: 'completionDate',
                            text: 'Completion Date',
                            headerStyle: {
                                width: '108px',
                                verticalAlign: 'top'
                            },
                            formatter: v => v && format(v, DATE_FORMAT)
                        },
                    ]}
                />
            )}
        </div>
    )
}

export default ScoringSection
