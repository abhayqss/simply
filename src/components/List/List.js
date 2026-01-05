import React, {Component} from 'react';

import ReactList from 'react-list';

import cn from 'classnames'
import PropTypes from 'prop-types'

import './List.scss'

export default class List extends Component {
    static propTypes = {
        type: PropTypes.string,
        length: PropTypes.number,

        style: PropTypes.object,
        className: PropTypes.string,

        renderItem: PropTypes.func,
        onEndReached: PropTypes.func
    }

    static defaultProps = {
        renderItem: function () {},
        onEndReached: function () {}
    }

    listRef = React.createRef()

    onScroll = e => {
        const [i, j] = this.listRef.current.getVisibleRange()
        j === this.props.length - 1 && this.props.onEndReached()
    }

    render() {
        const {
            type,
            length,

            style,
            className,

            renderItem
        } = this.props

        return (
            <div
                style={style}
                onScroll={this.onScroll}
                className={cn('List', className)}>
                <ReactList
                    ref={this.listRef}
                    type={type}
                    length={length}
                    itemRenderer={renderItem}
                />
            </div>
        )
    }
}