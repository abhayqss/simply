import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import './ServicePlanFilter.scss'

import SearchField from 'components/SearchField/SearchField'

import * as servicePlanListActions from 'redux/client/servicePlan/list/servicePlanListActions'

function mapStateToProps (state) {
    return {
        fields: state.client.servicePlan.list.dataSource.filter
    }
}

function mapDispatchToProps (dispatch) {
    return {
        actions: {
            ...bindActionCreators(servicePlanListActions, dispatch)
        }
    }
}

class ServicePlanFilter extends Component {
    onClear = () => {
        this.clear()
    }

    onChangeField = (name, value) => {
        this.actions.changeFilterField(
            name, value
        )
    }

    get actions () {
        return this.props.actions
    }

    clear () {
        this.change({
            searchText: null
        })
    }

    render () {
        return (
            <div className="ServicePlanFilter">
                <SearchField
                    name='searchText'
                    value={this.props.fields.searchText}
                    className='ServicePlanFilter-Field'
                    placeholder='Search'
                    onChange={this.onChangeField}
                    onClear={this.onClear}
                />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ServicePlanFilter)