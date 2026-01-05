import _ from 'underscore'

import { DateUtils } from '../utils/Utils'

const { format, add, formats } = DateUtils
const ISO_DATE_TIME = formats.isoDateTime

export function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomFloat (min, max, precision) {
    return min + Number((Math.random() * (max - min + 1)).toFixed(precision))
}

export function buildRandomArray (length, limit) {
    let arr = []
    let _limit = limit || length
    for (let x = 0; x < length; x++) {
        arr.push({
            idx: x,
            rnd: getRandomInt(0, 9999)
        })
    }
    arr = _.sortBy(arr, 'rnd')
    let a = []
    _.each(arr, (obj, index) => {
        if (index < _limit) {
            a.push(obj.idx)
        }
    })
    return a
}

export function getRandomArrayElement (arr) {
    let idx = getRandomInt(0, arr.length - 1)
    return arr[idx]
}

export function getRandomArrayElements (arr, count) {
    count = count || getRandomInt(0, arr.length - 1)

    const res = []

    for (let i = 0; i < count; i++) {
        let idx = getRandomInt(0, arr.length - 1)
        res.push(arr[idx])
    }

    return res
}

function getRandomTimeObj (hStart = 8, hEnd = 18, mArray, sArray) {
    let hoursDirty = getRandomInt(hStart, hEnd)
    let hours = Math.min(hoursDirty, 23)
    let minutes = mArray ? getRandomArrayElement(mArray) : getRandomInt(0, 59)
    let seconds = sArray ? getRandomArrayElement(sArray) : getRandomInt(0, 59)

    return {
        hours: hours,
        minutes: minutes,
        seconds: seconds
    }
}

function getRandomDay (month, year, endDay, startDay = 1) {
    endDay = endDay || daysInMonth(month, year)
    return getRandomInt(startDay, endDay)
}

function getDateObjFromISO (isoStr) {
    return {
        year: Number(isoStr.substring(0, 4)),
        month: Number(isoStr.substring(5, 7)) - 1,
        day: Number(isoStr.substring(8, 10))
    }
}

function parseISO (isoStr) {
    let d = getDateObjFromISO(isoStr)
    return new Date(d.year, d.month, d.day)
}

function getDateObjFromPeriod (startDate, endDate) {
    let date = parseISO(startDate)
    let end = parseISO(endDate)
    let diff = end - date
    let offset = getRandomInt(0, diff)
    date.setTime(date.getTime() + offset)
    return {
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
    }
}

function daysInMonth (month, year) {
    return new Date(year, month, 0).getDate()
}

export function getRandomDateTimeStr (startDate, endDate, zone = 'Z') {
    let d = getDateObjFromPeriod(startDate, endDate)
    let t = getRandomTimeObj()
    let date = new Date(d.year, d.month, d.day, t.hours, t.minutes, t.seconds)
    return format(date, ISO_DATE_TIME) + zone
}

export function getDateTimeFromStr (dateTimeStr) {
    let date = Date.parse(dateTimeStr)
    return isNaN(date) ? new Date() : date
}

export function getWeeklyDateTimeStr (endDate, zone = 'Z') {
    let d = getDateObjFromISO(endDate)
    let t = getRandomTimeObj()
    let date = new Date(d.year, d.month, d.day, t.hours, t.minutes, t.seconds)

    let a = []
    for (let i = 0; i < 7; i++) {
        a.push(format(date, ISO_DATE_TIME) + zone)
        date = add(date, -1, 'day')
    }

    return a
}
