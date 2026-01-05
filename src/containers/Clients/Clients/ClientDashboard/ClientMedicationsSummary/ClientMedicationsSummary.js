import React, {Component} from 'react'

import {map} from 'underscore'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {
    Badge,
    ListGroup as List,
    ListGroupItem as ListItem,
} from 'reactstrap'

import Tabs from 'components/Tabs/Tabs'
import MedicationBarChart from 'components/charts/MedicationBarChart/MedicationBarChart'

import {medications} from 'lib/mock/MockData'

import {PAGINATION} from 'lib/Constants'
import {DateUtils as DU} from "lib/utils/Utils"

import './ClientMedicationsSummary.scss'


const {FIRST_PAGE} = PAGINATION

const {format, formats} = DU

const TIME_FORMAT = formats.time
const DATE_FORMAT = formats.americanMediumDate

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {}
    }
}

class ClientMedicationsSummary extends Component {

    state = {
        tab: 0
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    updateMedicationsSummary(isReload, page) {

    }

    refreshMedicationsSummary(page) {
        this.updateMedicationsSummary(true, page || FIRST_PAGE)
    }

    onChangeTab = tab => {
        this.setState({tab})
    }

    clear() {
        this.props.actions.list.clear()
    }

    render() {
        const {tab} = this.state

        return (
            <div className="ClientMedicationsSummary">
                <div className='ClientMedicationsSummary-Title'>
                    <span className='ClientMedicationsSummary-TitleText'>Medications</span>
                    <Badge color='warning' className='ClientMedicationsSummary-MedicationCount'>
                        {23}
                    </Badge>
                </div>
                <div className="ClientMedicationsSummary-Body">
                    <MedicationBarChart
                        className='flex-1 margin-right-35'
                        renderTitle={() => ''}
                    />
                    <div className="flex-1">
                        <Tabs
                            className='margin-bottom-25'
                            items={[
                                {title: 'Active', isActive: tab === 0},
                                {title: 'Completed', isActive: tab === 1},
                                {title: 'Other', isActive: tab === 2},
                            ]}
                            onChange={this.onChangeTab}
                        />
                        <List className="ClientMedicationList">
                            {map(medications, (o, i) => (
                                <ListItem
                                    style={(i % 2 === 0) ? {backgroundColor: '#f9f9f9'} : null}
                                    className="ClientMedicationList-Item ClientMedication">
                                    <div className='d-flex justify-content-between'>
                                        <div className='ClientMedication-Name'>
                                            {o.name}
                                        </div>
                                        <div className='ClientMedication-Date'>
                                            {format(o.startDate, DATE_FORMAT)}
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-between margin-top-5'>
                                        <span className='ClientMedication-Instruction'>{o.instruction}</span>
                                        <div className='ClientMedication-Time'>
                                            {format(o.startDate, TIME_FORMAT)}
                                        </div>
                                    </div>
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientMedicationsSummary)