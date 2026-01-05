import React, {Component} from 'react'

import {map} from 'underscore'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {
    Badge,
} from 'reactstrap'

import Table from 'components/Table/Table'

import {clientAllergiesSummary} from 'lib/mock/MockData'

import {path} from 'lib/utils/ContextUtils'
import {DateUtils as DU} from 'lib/utils/Utils'

import {PAGINATION} from 'lib/Constants'

import './ClientAllergiesSummary.scss'

const { format, formats } = DU

const TIME_FORMAT = formats.time
const DATE_FORMAT = formats.americanMediumDate

const {FIRST_PAGE} = PAGINATION

function mapStateToProps (state) {
    return {

    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {

        }
    }
}

class ClientAllergiesSummary extends Component {

    componentDidMount() {

    }

    componentDidUpdate() {

    }

    updateAllergiesSummary(isReload, page) {

    }

    refreshAllergiesSummary(page) {
        this.updateAllergiesSummary(true, page || FIRST_PAGE)
    }

    onChangeTab = tab => {
        this.setState({tab})
    }

    clear() {
        this.props.actions.list.clear()
    }

    render () {

        return (
            <div className="ClientAllergiesSummary">
                <div className='ClientAllergiesSummary-Title'>
                    <span className='ClientAllergiesSummary-TitleText'>Allergies</span>
                    <Badge color='warning' className='ClientAllergiesSummary-AllergiesCount'>
                        {15}
                    </Badge>
                </div>
                <div className="ClientAllergiesSummary-Body">
                    <Table
                        hasPagination
                        keyField='id'
                        isLoading={false}
                        className='EncountersList'
                        containerClass='EncountersListContainer'
                        data={clientAllergiesSummary}
                        pagination={{
                            page: 1,
                            size: 15,
                            totalCount: 15
                        }}
                        columns={[
                            {
                                dataField: 'allergen',
                                text: 'Allergen',
                                headerStyle: {
                                    width: '193px',
                                },
                                formatter: (v, row) => {
                                    return (
                                        <Link
                                            to={path('dashboard')}
                                            className='ClientAllergiesSummary-Link'>
                                            {row.allergen}
                                        </Link>
                                    )
                                },
                            },
                            {
                                dataField: 'reaction',
                                text: 'Reaction',
                            },
                            {
                                dataField: 'startDate',
                                text: 'Date',
                                headerAlign: 'right',
                                align: 'right',
                                formatter: (v, row) => {
                                    return (
                                        <span>
                                            {`${format(row.startDate, DATE_FORMAT)} ${format(row.startDate, TIME_FORMAT)}`}
                                        </span>
                                    )
                                },
                            },
                        ]}
                    />
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientAllergiesSummary)