import React, {Component} from 'react';

import cn from 'classnames'
import { map } from 'underscore'
import PropTypes from 'prop-types'

import Highlighter from 'react-highlight-words'

import {ReactComponent as Info} from 'images/community-info.svg'
import {ReactComponent as Directions} from 'images/directions.svg'

import './MarketplaceCommunityRow.scss'

class MarketplaceCommunityRow extends Component {
    static propTypes = {
        className: PropTypes.string,

        title: PropTypes.string,
        distance: PropTypes.string,
        description: PropTypes.string,
        displayAddress: PropTypes.string,
        highlightedText: PropTypes.string,

        onMoreInfo: PropTypes.func,
        onNavigation: PropTypes.func,
    }

    static defaultProps = {
        onMoreInfo: function () {},
        onNavigation: function () {},
    }

    onMoreInfo = () => {
        const {
            data, onMoreInfo: cb
        } = this.props

        cb(data)
    }

    onNavigation = () => {
        const {
            data, onNavigation: cb
        } = this.props

        cb(data)
    }
    render() {
        const {
            data,
            highlightedText,
            className
        } = this.props

        const {
            communityName,
            organizationName,
            primaryFocuses,
            address,
            location
        } = data

        return (
            <div className={cn('MarketplaceCommunityRow', className)}>
                <div className="MarketplaceCommunityRow-Title">
                    <Highlighter
                        highlightClassName='MarketplaceCommunityRow-Highlight'
                        searchWords={[highlightedText]}
                        textToHighlight={`${organizationName}, ${communityName}`}
                    />
                </div>
                {primaryFocuses && (
                    <div className="MarketplaceCommunityRow-PrimaryFocuses">
                        <Highlighter
                            highlightClassName='MarketplaceCommunityRow-Highlight'
                            searchWords={[highlightedText]}
                            textToHighlight={map(primaryFocuses, o => o.label).join(', ')}
                        />
                    </div>
                )}
                <div className="d-flex justify-content-between margin-top-10">
                    <span className="MarketplaceCommunityRow-Address">
                        <Highlighter
                            highlightClassName='MarketplaceCommunityRow-Highlight'
                            searchWords={[highlightedText]}
                            textToHighlight={address}
                        />
                    </span>
                    {location.distanceInMiles && (
                        <span className="MarketplaceCommunityRow-Distance">
                            {location.distanceInMiles} mi
                        </span>
                    )}
                </div>
                {/*<Directions className="MarketplaceCommunityRow-Navigate" onClick={this.onNavigation}/>*/}
                <Info className="MarketplaceCommunityRow-MoreInfo" onClick={this.onMoreInfo}/>
            </div>
        );
    }
}

export default MarketplaceCommunityRow