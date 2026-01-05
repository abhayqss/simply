import React, {Component} from 'react'

import {
    map,
    pluck,
    filter,
    reject,
    compact
} from 'underscore'

import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Highlighter from 'react-highlight-words'

import { Button } from 'reactstrap'

import './InsuranceNetworkPaymentPlanPicker.scss'

import Table from 'components/Table/Table'
import MultiSelect from 'components/MultiSelect/MultiSelect'
import CheckboxField from 'components/Form/CheckboxField/CheckboxField'

import { isNotEmpty } from 'lib/utils/Utils'

const ALL = 'ALL'
const NONE = 'NONE'

function mapStateToProps (state) {
    const { network } = state.insurance

    return {
        error: network.list.error,
        isFetching: network.list.isFetching,
        shouldReload: network.list.shouldReload,
        dataSource: network.list.dataSource
    }
}

class InsuranceNetworkPaymentPlanPicker extends Component {

    static propTypes = {
        networkIds: PropTypes.arrayOf(PropTypes.number),
        paymentPlanIds: PropTypes.arrayOf(PropTypes.number),

        searchedText: PropTypes.string,

        onCancel: PropTypes.func,
        onComplete: PropTypes.func
    }

    static defaultProps = {
        onCancel: () => {},
        onComplete: () => {}
    }

    state = {
        selectedNetworks: []
    }

    componentDidMount() {
        const {
            networkIds,
            paymentPlanIds,
            dataSource: ds
        } = this.props

        this.setState({
            selectedNetworks: map(
                filter(ds.data, o => networkIds.includes(o.id)),
                o => ({
                    ...o,
                    paymentPlans: filter(o.paymentPlans, o => paymentPlanIds.includes(o.id))
                })
            )
        })
    }

    onPickNetwork = (network, isSelected) => {
        const { dataSource: ds } = this.props

        this.setState(s => ({
            selectedNetworks: network.name === ALL ? ds.data : (
                network.name === NONE ? [] : (
                    isSelected ? [...s.selectedNetworks, network]
                        : s.selectedNetworks.filter(o => o.id !== network.id)
                )
            )
        }))
    }

    onPickPaymentPlans = (network, plans) => {
        this.setState(s => {
            return {
                selectedNetworks: [
                    ...reject(s.selectedNetworks, o => o.id === network.id),
                    {...network, paymentPlans: map(plans, id => ({ id }))}
                ]
            }
        })
    }

    onComplete = () => {
        this.props.onComplete(
            this.state.selectedNetworks
        )
    }

    onCancel = () => {
        this.props.onCancel()
    }

    render () {
        const {
            selectedNetworks
        } = this.state

        const {
            isFetching,
            dataSource: ds,

            searchedText,
            paymentPlanIds
        } = this.props

        return (
            <div className="InsuranceNetworkPaymentPlanPicker">
                <Table
                    hasHover
                    keyField="id"
                    isLoading={isFetching}
                    noDataText="No networks found"
                    className="InsuranceNetworkPaymentPlanList"
                    containerClass="InsuranceNetworkPaymentPlanListContainer"
                    data={isNotEmpty(ds.data) ? [
                        {id: 'all', name: ALL, title: 'All'},
                        ...ds.data,
                        {id: 'none', name: NONE, title: 'None'}
                    ] : []}
                    selectedRows={{
                        mode: 'checkbox',
                        clickToSelect: false,
                        hideSelectAll: true,
                        selected: compact([
                            ...pluck(selectedNetworks, 'id'),
                            selectedNetworks.length === 0 && 'none',
                            selectedNetworks.length === ds.data.length && 'all',
                        ]),
                        onSelect: this.onPickNetwork,
                        style: { backgroundColor: '#edf4f5' },
                        selectionRenderer: ({ mode, checked }) => (
                            <CheckboxField
                                value={checked}
                                className="InsuranceNetworkPaymentPlanPicker-ListCheckbox"
                            />
                        )
                    }}
                    columns={[
                        {
                            dataField: 'title',
                            text: 'Network Name',
                            headerStyle: {
                                width: '430px'
                            },
                            formatter: v => (
                                <Highlighter
                                    highlightClassName='InsuranceNetworkPaymentPlanList-Highlight'
                                    searchWords={[searchedText]}
                                    textToHighlight={v}
                                />
                            )
                        },
                        {
                            dataField: 'paymentPlans',
                            text: 'Payment Plan',
                            headerStyle: {
                                width: '350px'
                            },
                            formatter: (v, row) => (
                                row.paymentPlans && row.paymentPlans.length ? (
                                    <MultiSelect
                                        className="InsuranceNetworkPaymentPlanList-MultiSelect"
                                        isMultiple
                                        hasTooltip
                                        value={map(
                                            filter(
                                                row.paymentPlans,
                                                o => paymentPlanIds.length ? paymentPlanIds.includes(o.id) : true
                                            ),
                                            o => o.id
                                        )}
                                        options={map(row.paymentPlans, ({id, title}) => ({
                                            text: title, value: id
                                        }))}
                                        onChange={plans => { this.onPickPaymentPlans(row, plans) }}
                                    />
                                ) : null
                            )
                        },
                    ]}
                    onRefresh={this.onRefresh}
                />
                <div className="InsuranceNetworkPaymentPlanPicker-Btns">
                    <Button
                        color='success'
                        onClick={this.onComplete}
                        className="InsuranceNetworkPaymentPlanPicker-Btn" >
                        Select
                    </Button>
                    <Button
                        outline
                        color='success'
                        onClick={this.onCancel}
                        className="InsuranceNetworkPaymentPlanPicker-Btn">
                        Cancel
                    </Button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(InsuranceNetworkPaymentPlanPicker)