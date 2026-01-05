'use strict'

import Geo from 'geolib'

import { isNullOrUndefined } from './Utils'

const MILE_IN_METERS = 1609.34

export function isValidCoordinate (c) {
    return c && !(isNullOrUndefined(c.lat) || isNullOrUndefined(c.lng))
}

export function isEqualCoordinates (c1, c2) {
    if (isValidCoordinate(c1) && isValidCoordinate(c2)) {
        return c1.lat === c2.lat && c1.lng === c2.lng
    }
    return false
}

export function getDistanceInMeters (start, end, precision = 2) {
    return Geo.getDistance(start, end).toFixed(precision)
}

export function getDistanceInMiles (start, end, precision = 2) {
    const distance = Geo.getDistance(start, end)
    return (distance / MILE_IN_METERS).toFixed(2)
}