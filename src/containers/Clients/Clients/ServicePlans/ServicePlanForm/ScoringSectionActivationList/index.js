import React from 'react'
import PropTypes from 'prop-types'
import { DateUtils } from 'lib/utils/Utils'

import Table from 'components/Table/Table'

const { format, formats } = DateUtils
const DATE_FORMAT = formats.americanMediumDate

const propTypes = {
    groupedNeed: PropTypes.arrayOf(
        PropTypes.shape({
            fields: PropTypes.shape({
                needScore: PropTypes.number,
                priorityId: PropTypes.number
            }),
            id: PropTypes.number
        })
    ).isRequired
}

const COLORS = {
    1: '#53b865',
    2: '#ffd529',
    3: '#f36c32'
}

export default function ScoringSectionActivationList({ groupedNeed }) {
    const tableData = groupedNeed.map(need => need.fields)

    return (
        <>
            <div className="ServicePlanForm-SectionTitle">
                Relevant Activation or Education Task
             </div>
            <Table
                keyField="id"
                className="ServicePlanForm-Scoring__ActivationTable"
                data={tableData}
                columns={[
                    {
                        dataField: 'id',
                        text: '',
                        headerStyle: {
                            width: '32px',
                        },
                        style: (cell, row) => ({
                            fontWeight: 600,
                            backgroundColor: COLORS[row.priorityId]
                        }),
                        formatter: (v, row, rowIndex) => rowIndex + 1
                    },
                    {
                        dataField: 'activationOrEducationTask',
                        text: 'Activation or Education Task',
                        headerStyle: {
                            width: '685px',
                            verticalAlign: 'top'
                        },
                    },
                    {
                        dataField: 'targetCompletionDate',
                        text: 'Target Completion Date',
                        headerStyle: {
                            width: '107px',
                            verticalAlign: 'top'
                        },
                        formatter: v => v && format(v, DATE_FORMAT)
                    },
                    {
                        dataField: 'completionDate',
                        text: 'Completion Date',
                        headerStyle: {
                            width: '107px',
                            verticalAlign: 'top'
                        },
                        formatter: v => v && format(v, DATE_FORMAT)
                    },
                ]}
            />
        </>
    )
}

ScoringSectionActivationList.propTypes = propTypes
