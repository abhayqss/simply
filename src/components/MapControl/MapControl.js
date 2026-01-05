import React, { Component } from 'react'
import ReactDom from 'react-dom'

import PropTypes from 'prop-types'
import { MAP } from 'react-google-maps/lib/constants'

/**
 * This Component for add custom control to map
 * (map.controls[position].push(component))
 * NOTE:
 * Can ref to map through context in constructor (or this.context expect contructor)
 * User constructor to add div and render will createPortal
 */
export default class MapControl extends Component {
    static contextTypes = { [MAP]: PropTypes.object }

    static propTypes = {
        position: PropTypes.number.isRequired,
        children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
        className: PropTypes.string,
    };

    static defaultProps = {
        children: [],
        className: '',
    };

    node = document.createElement('div')

    nodeIndex = 0

    constructor(props, context) {
        super(props, context)

        this.map = this.context[MAP]
        this.nodeIndex = this.map.controls[props.position].length
        this.map.controls[props.position].push(this.node)
    }

    componentWillUnmount() {
        this.map.controls[this.props.position].removeAt(this.nodeIndex);
    }

    render() {
        const { className } = this.props;
        className && this.node.classList.add(className);

        return ReactDom.createPortal(this.props.children, this.node);
    }
}