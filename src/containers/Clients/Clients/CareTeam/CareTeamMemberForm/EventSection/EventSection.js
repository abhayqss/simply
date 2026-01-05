import React, {Component} from 'react'

import {map} from 'underscore'
import PropTypes from 'prop-types'
import {Col, Row} from 'reactstrap'

import SelectField from 'components/Form/SelectField/SelectField'

import './EventSection.scss'

class EventSection extends Component {
    static propTypes = {
        fields: PropTypes.object,
        channels: PropTypes.array,
        eventType: PropTypes.string,
        eventTypeId: PropTypes.number,
        sectionIndex: PropTypes.number,
        responsibilities: PropTypes.array,

        onChange: PropTypes.func
    }

    static defaultProps = {
        channels: [],
        responsibilities: [],

        onChangeChannel: () => {},
        onChangeResponsibility: () => {}
    }

    shouldComponentUpdate(nextProps) {
        return (
             this.props.channels !== nextProps.channels ||
             this.props.responsibilities !== nextProps.responsibilities ||

             this.props.channel !== nextProps.channel ||
             this.props.responsibility !== nextProps.responsibility
        )
    }

    onChangeChannel = (eventTypeId, value) => {
        this.props.onChangeChannel(eventTypeId, value)
    }

    onChangeResponsibility = (eventTypeId, value) => {
        this.props.onChangeResponsibility(eventTypeId, value)
    }

    render () {
        const {
            channels,
            eventType,
            eventTypeId,
            sectionIndex,
            responsibilities,

            channel,
            responsibility,
        } = this.props

        return (
            <Row className="EventSection">
                <Col className="EventSection-Title" md={6}>
                    {eventType}
                </Col>
                <Col md={3}>
                    <SelectField
                        className='EventSection-Field'
                        name={eventTypeId}
                        value={responsibility}
                        label={(sectionIndex === -1) ? 'Responsibility' : null}
                        defaultText={"Select"}
                        options={map(responsibilities, ({id, label}) => ({
                            text: label, value: id
                        }))}
                        onChange={this.onChangeResponsibility}
                    />
                </Col>
                <Col md={3}>
                    <SelectField
                        className='EventSection-Field'
                        name={eventTypeId}
                        value={channel}
                        options={map(channels, ({id, label}) => ({
                            text: label, value: id
                        }))}
                        label={(sectionIndex === -1) ? 'Channel' : null}
                        defaultText={"Select"}
                        isMultiple={true}
                        onChange={this.onChangeChannel}
                    />
                </Col>
            </Row>
        )
    }
}

export default EventSection