import React from 'react'
import PropTypes from 'prop-types'

import RangeSlider from 'components/RangeSlider/RangeSlider'
import ScoringSection from '../ScoringSection/ScoringSection'

const propTypes = {
    domain: PropTypes.shape({
        name: PropTypes.string,
        text: PropTypes.string
    }),
    groupedNeed: PropTypes.arrayOf(
        PropTypes.shape({
            fields: PropTypes.shape({
                needScore: PropTypes.number,
                priorityId: PropTypes.number
            }),
            id: PropTypes.number
        })
    ).isRequired,
    onChange: PropTypes.func.isRequired
}

const defaultProps = {
    domain: {}
}

const COLORS = {
    1: '#53b865',
    2: '#ffd529',
    3: '#f36c32'
}

export default function ScoringSectionList({ domain, onChange, groupedNeed }) {
    const rangeSliderValue = groupedNeed[0].fields.needScore // for temporary check

    return (
        <>
            <div className="ServicePlanForm-SectionHeader">
                <div className="ServicePlanForm-SectionTitle">
                    {domain.text}
                </div>
                <RangeSlider
                    min={0}
                    max={5}
                    step={1}
                    value={rangeSliderValue}
                    onChange={onChange}
                    className="ServicePlanForm-RangeSlider"
                />
            </div>
            {groupedNeed.map((need, key) => (
                <ScoringSection
                    key={need.fields.id}
                    index={key + 1}
                    fields={need.fields}
                    style={{
                        borderColor: COLORS[need.fields.priorityId]
                    }}
                />
            ))}
        </>
    )
}

ScoringSectionList.propTypes = propTypes
ScoringSectionList.defaultProps = defaultProps
