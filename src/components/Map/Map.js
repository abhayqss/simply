import React, { Component } from "react"

import cn from 'classnames'
import PropTypes from 'prop-types'
import { geolocated } from 'react-geolocated'

import {
    map,
    each,
    find,
    isEqual
} from 'underscore'

import {
    compose,
    withProps
} from 'recompose'

import {
    Marker,
    GoogleMap,
    withScriptjs,
    withGoogleMap
} from 'react-google-maps'

import config from 'config'

import './Map.scss'

import InfoWindow from 'react-google-maps/lib/components/InfoWindow'
import MarkerWithLabel from 'react-google-maps/lib/components/addons/MarkerWithLabel'

import Loader from '../Loader/Loader'
import MapControl from '../MapControl/MapControl'

import { COORDINATES } from 'lib/Constants'
import { isEmpty, isNotEmpty } from 'lib/utils/Utils'
import { isValidCoordinate, isEqualCoordinates } from 'lib/utils/GeoUtils'

import indicator from 'images/gps-indicator.png'

const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${config.google.maps.apiKey}&v=3.exp&libraries=geometry,drawing,places`

const { DEFAULT_LATITUDE_DELTA, DEFAULT_LONGITUDE_DELTA } = COORDINATES

const DEFAULT_REGION = {
    lat: DEFAULT_LATITUDE_DELTA,
    lng: DEFAULT_LONGITUDE_DELTA
}

class Map extends Component {
    static propTypes = {
        locations: PropTypes.array,
        defaultZoom: PropTypes.number,
        defaultRegion: PropTypes.object,

        onClickMarker: PropTypes.func,
        renderMarkerPopup: PropTypes.func,
    }

    static defaultProps = {
        locations: [],
        defaultZoom: 4,
        defaultRegion: DEFAULT_REGION,
        onClickMarker: () => {}
    }

    mapRef = React.createRef()

    state = {
        region: null,
        markers: [],
        pickedMarker: null,
        shouldReloadMarkers: false
    }

    constructor (props) {
        super(props)

        const {
            coords,
            isGeolocationAvailable,
            isGeolocationEnabled
        } = this.props

        if (isGeolocationAvailable && isGeolocationEnabled && coords) {
            this.state.region = {
                lat: coords.latitude,
                lng: coords.longitude
            }
        }
    }

    componentDidMount () {
        window.addEventListener('click', this.onClick)
    }

    componentDidUpdate (prevProps) {
        const { locations } = this.props
        const { markers, shouldReloadMarkers } = this.state

        if (!isEqual(locations, prevProps.locations)) {
            this.setState({ shouldReloadMarkers: true })
        }

        const hasNoMarkers = isNotEmpty(locations) && isEmpty(markers)

        if (shouldReloadMarkers || hasNoMarkers) this.prepareMarkers()
    }

    onClick = e => {
        if (!(e.target && (e.target.src || '').includes('marker'))) {
            this.setState({ pickedMarker: null })
        }
    }

    onClickMarker = o => {
        this.setState({ pickedMarker: o })
    }

    onToCurrentLocation = () => {
        const {
            coords,
            isGeolocationAvailable,
            isGeolocationEnabled
        } = this.props

        const region = isGeolocationAvailable && isGeolocationEnabled && coords ? {
            lat: coords.latitude,
            lng: coords.longitude
        } : DEFAULT_REGION

        this.mapRef.current.panTo(new window.google.maps.LatLng(
            region.lat,
            region.lng
        ))
    }

    prepareMarkers = () => {
        const markers = []

        each(this.props.locations, (o) => {
            if (isValidCoordinate(o.coordinate)) {
                const { lat, lng } = o.coordinate

                const coordinate = { lat, lng }
                const marker = find(markers, m => isEqual(coordinate, m.coordinate))

                if (marker) marker.locationIds.push(o.id)
                else markers.push({
                    locationIds: [o.id],
                    isPicked: o.isPicked,
                    coordinate: { lat, lng }
                })
            }
        })

        if (isNotEmpty(markers)) this.setState({ markers, shouldReloadMarkers: false })
    }

    getRegion () {
        const { region } = this.state
        const { defaultRegion } = this.props
        return isValidCoordinate(region) ? region : { ...defaultRegion, ...region }
    }

    render () {
        const {
            className,
            defaultZoom,

            coords,
            isGeolocationAvailable,
            isGeolocationEnabled,

            renderMarkerPopup
        } = this.props

        const {
            markers,
            pickedMarker
        } = this.state

        return (
            <div className={cn('Map', className)}>
                <GoogleMap
                    ref={this.mapRef}
                    style={{ height: 600 }}
                    defaultZoom={defaultZoom}
                    defaultCenter={this.getRegion()}
                    onClick={this.onClick}>
                    {this.mapRef.current && (
                        <MapControl
                            position={window.google.maps.ControlPosition.RIGHT_BOTTOM}>
                            <div className='Map-CurrentLocationBtn' onClick={this.onToCurrentLocation}>
                                <img src={indicator}/>
                            </div>
                        </MapControl>
                    )}
                    <Marker
                        position={isGeolocationAvailable && isGeolocationEnabled && coords ? {
                            lat: coords.latitude,
                            lng: coords.longitude
                        } : {
                            lat: DEFAULT_LATITUDE_DELTA,
                            lng: DEFAULT_LONGITUDE_DELTA
                        }}
                        icon={{ url: require('images/ripple.svg') }}
                    />
                    {renderMarkerPopup && pickedMarker && (
                        <InfoWindow
                            position={
                                new window.google.maps.LatLng(
                                    pickedMarker.coordinate.lat,
                                    pickedMarker.coordinate.lng
                                )
                            }>
                            <div>
                                {renderMarkerPopup(pickedMarker)}
                            </div>
                        </InfoWindow>
                    )}
                    {isNotEmpty(markers) ? map(markers, m => {
                        const ids = m.locationIds

                        const isPicked = m.isPicked || pickedMarker && isEqualCoordinates(
                            pickedMarker.coordinate, m.coordinate
                        )

                        return (
                            <MarkerWithLabel
                                key={ids.join(':')}
                                position={m.coordinate}
                                labelClass='Map-MarkerLabel'
                                onClick={() => { this.onClickMarker(m) }}
                                labelAnchor={new window.google.maps.Point(10, 35)}
                                icon={{
                                    url: require(
                                        `images/map-marker-${isPicked ? 'orange' : 'green'}.svg`
                                    )
                                }}>
                                <div className='Map-MarkerLabelText'>{ids.length > 5 ? '5+' : ids.length}</div>
                            </MarkerWithLabel>
                        )
                    }) : null}
                </GoogleMap>
            </div>
        )
    }
}

export default compose(
    geolocated({
        userDecisionTimeout: 5000
    }),
    withProps({
        googleMapURL: GOOGLE_MAP_URL,
        loadingElement: (
            <Loader/>
        ),
        containerElement: (
            <div style={{ height: '100%' }}/>
        ),
        mapElement: (
            <div style={{ height: '100%' }}/>
        )
    }),
    withScriptjs,
    withGoogleMap
)(Map)