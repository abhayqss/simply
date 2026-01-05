import React, {Component} from 'react'

import cn from 'classnames'
import {map} from 'underscore'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'

import {
    Button
} from 'reactstrap'

import ClientServicesCostComposedChart from 'components/charts/ClientServicesCostComposedChart/ClientServicesCostComposedChart'

import {path} from 'lib/utils/ContextUtils'

import {PAGINATION} from 'lib/Constants'

import './ClientServicesCostSummary.scss'

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

class ClientServicesCostSummary extends Component {

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

    render () {
        const { className } = this.props

        return (
            <div className={cn('ClientServicesCostSummary', className)}>
                <ClientServicesCostComposedChart
                    renderTitle={() => (
                        <div className='d-flex justify-content-between margin-bottom-16'>
                            <div className='ClientServicesCostComposedChart-TitleText'>
                                <span>Services cost</span>
                            </div>
                            <div className='flex-1 text-right'>
                                <Button
                                    color="success"
                                    className="ClientEventUtilizationSummary-ViewEventsBtn"
                                    onClick={() => { alert('Coming soon') }}>
                                    View all events
                                </Button>
                            </div>
                        </div>
                    )}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientServicesCostSummary)