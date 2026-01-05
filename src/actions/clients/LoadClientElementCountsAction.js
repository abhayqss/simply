import React from 'react'

import LoadAssessmentCountAction from './LoadAssessmentCountAction'
import LoadServicePlanCountAction from './LoadServicePlanCountAction'

export default function LoadClientElementCountsAction (props) {
    return (
        <>
            <LoadAssessmentCountAction {...props}/>
            <LoadServicePlanCountAction {...props}/>
        </>
    )
}