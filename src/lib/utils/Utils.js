import _ from 'underscore'

import {
    FILE_SIZE_FORMATS,
    SERVER_ERROR_CODES,
    PASSWORD_VALIDATIONS,
    PASSWORD_VALIDATION_TYPES
} from '../Constants'

const Dates = require('date-arithmetic')

const { MB } = FILE_SIZE_FORMATS

const EXPONENTIAL_POWER_VARIANTS_FOR_SIZES = { KB: 1, MB: 2, GB: 3 }

const { NO_CLIENT_INFO_FOUND, NO_CONNECTION_OR_SERVER_IS_NOT_AVAILABLE } = SERVER_ERROR_CODES

const MS_IN_SEC = 1000
const MS_IN_MIN = MS_IN_SEC * 60
const MS_IN_HOUR = MS_IN_MIN * 60
const MS_IN_DAY = MS_IN_HOUR * 24
const MS_IN_WEEK = MS_IN_DAY * 7

const {
    DIGIT,
    MIN_CHARACTERS,
    LOWERCASE_LETTER,
    UPPERCASE_LETTER,
    SPECIAL_CHARACTERS
} = PASSWORD_VALIDATION_TYPES

/*
 Gets nested properties from JavaScript object
 *
 * examples:
 * var prop = getProperty(obj, "prop1.nestedProp1");
 * var prop = getProperty(obj, "prop1.[0].nestedProp1");
 * */
export function getProperty(o, s) {
    s = (s + '').replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
    s = s.replace(/^\./, '') // strip a leading dot

    const a = s.split('.')

    for (let i = 0, n = a.length; i < n; ++i) {
        const k = a[i]

        if (k in o) o = o[k]
        else return
    }
    return o
}

export function extendProperty(target, prop, value) {
    prop = (prop + '').replace(/^\./, '') // strip a leading dot
    prop = prop.split('.')

    if (target) {
        if (_.isArray(prop)) {
            if (prop.length > 1) {
                target[prop[0]] = extendProperty(target[prop[0]], prop.slice(1), value)
            }
            else {
                target = extendProperty(target, prop[0], value)
            }
        }
        else {
            target[prop] = value
        }
    }
    else {
        target = {}
        if (_.isArray(prop)) {
            let newValue = value
            for (let idx = prop.length - 1; idx >= 0; idx--) {
                target = {}
                target[prop[idx]] = newValue
                newValue = target
            }
        }
        else {
            target[prop] = value
        }
    }
    return target
}

export function emptyPromise() {
    return new Promise(resolve => {
        resolve(null)
    })
}

export function logicalXOR(a, b) {
    return !a !== !b
}

export function capitalize(str) {
    return str ? str.charAt(0).toUpperCase() + str.slice(1) : str
}

export function isNoConnectionOrServerIsNotAvailableError(error) {
    return error && error.error && error.error.code === NO_CONNECTION_OR_SERVER_IS_NOT_AVAILABLE
}

export function isNoPatientInfoFoundError(error) {
    return error && error.error && error.error.code === NO_CLIENT_INFO_FOUND
}

export function getTitleFromErrorCode(code = '') {
    return capitalize(code.split('.').join(' '))
}

export function isEmptyStr(str) {
    return typeof str === 'string' && str.trim() === ''
}

export function getFieldErrorProps(obj) {
    if (!obj || typeof obj !== 'object') {
        return []
    }

    let props = _.keys(obj)
    return _.filter(props, prop => ~prop.indexOf('HasError') || ~prop.indexOf('ErrorMsg'))
}

export function parseEnumToWords(value, capitalizeFirst = false, capitalizeAll = false) {
    if (!value) {
        return value
    }

    let words = value.split('_')
    let str = ''
    _.each(words, (w, idx) => {
        let part = w.toLowerCase() + ' '
        str += (capitalizeAll || (capitalizeFirst && idx === 0)) ? capitalize(part) : part
    })

    return str.trim()
}

function isDateValid(date) {
    // An invalid date object returns NaN for getTime()
    // and NaN is the only object not strictly equal to itself
    return _.isNaN(date.getTime())
}

export function getAge(birthdayStr) {
    let birthday = new Date(birthdayStr)

    if (!birthdayStr || !isDateValid(birthday)) {
        return null
    }

    let today = new Date()
    let age = today.getFullYear() - birthday.getFullYear()

    birthday.setFullYear(today.getFullYear())

    // if the birthday has not occurred yet this year, subtract 1
    if (today < birthday) {
        age--
    }

    return age
}

function pad(val, len) {
    val = String(val)
    len = len || 2
    while (val.length < len) {
        val = '0' + val
    }
    return val
}

function getTimeZoneAbbr(date) {
    date = date || new Date()

    if (!(date instanceof Date)) {
        date = new Date(date)
    }

    let timeString = date.toTimeString()
    let abbr = timeString.match(/\([a-z ]+\)/i)
    if (abbr && abbr[0]) {
        // 17:56:31 GMT-0600 (CST)
        // 17:56:31 GMT-0600 (Central Standard Time)
        abbr = abbr[0].match(/[A-Z]/g)
        abbr = abbr ? abbr.join('') : undefined
    }
    else {
        // 17:56:31 CST
        // 17:56:31 GMT+0800 (台北標準時間)
        abbr = timeString.match(/[A-Z]{3,5}/g)
        abbr = abbr ? abbr[0] : undefined
    }

    return abbr
}

export function compareVersions(v1, v2) {
    if (typeof v1 === 'string' && typeof v2 === 'string') {
        const digs1 = v1.split('.')
        const digs2 = v2.split('.')
        const max = Math.max(digs1.length, digs2.length)
        for (let i = 0; i < max; i++) {
            const a = i < digs1.length ? parseInt(digs1[i]) : 0
            const b = i < digs2.length ? parseInt(digs2[i]) : 0
            if (a > b) return 1
            if (b > a) return -1
        }
        return 0
    }
    else throw new TypeError('All arguments must have "string" type')
}

export function isNullOrUndefined(v) {
    return v === null || v === void 0
}

export function isNull(v) {
    return v === null
}

export function allAreNull(...args) {
    return _.every(args, o => isNull(o))
}

export function anyIsNull(...args) {
    return _.any(args, o => isNull(o))
}

export function isNotNull(v) {
    return !isNull(v)
}

export function isNaN(v) {
    return _.isNumber(v) && v !== +v
}

export function isUndefined(v) {
    return v === void 0
}

export function isEmpty(v, opts = {}) {
    const {
        allowEmptyBool = true
    } = opts

    if (isNull(v) || isUndefined(v) || isNaN(v)) return true
    if (_.isObject(v) || _.isString(v)) return _.isEmpty(v)
    if (_.isBoolean(v)) return !v && allowEmptyBool

    return false
}

export function isNotEmpty(...args) {
    return !isEmpty(...args)
}

export function withoutEmptyValues(o) {
    return _.without(o, v => isEmpty(v))
}

export function omitEmptyProps(o) {
    return _.omit(o, (v, k) => isEmpty(v))
}

export function all(...args) {
    return {
        in: function (...vals) {
            return _.all(
                args, o => _.any(vals, v => o === v)
            )
        },
        notIn: function (...vals) {
            return _.all(
                args, o => !_.any(vals, v => o === v)
            )
        },
        equal: function (v) {
            return _.all(args, o => o === v)
        },
        notEqual: function (v) {
            return _.all(args, o => o !== v)
        }
    }
}

export function allAreEmpty(...args) {
    return _.all(args, o => isEmpty(o))
}

export function allAreNotEmpty(...args) {
    return _.all(args, o => isNotEmpty(o))
}

export function anyIsFalse(...args) {
    return _.any(args, o => o === false)
}

export function allAreFalse(...args) {
    return _.all(args, o => o === false)
}

export function allAreTrue(...args) {
    return _.all(args, o => o === true)
}

export function allAreTrueOrNull(...args) {
    return _.all(args, o => o === true || o === null)
}

export function values(o, ...keys) {
    return _.values(_.pick.apply(null, o, keys))
}

export function omitDeep(o, ...keys) {
    return _.mapObject(
        _.omit(o, ...keys),
        v => (_.isObject(v) && !_.isArray(v)) ? omitDeep(v, ...keys) : v
    )
}

export function pickAs(o, ...keys) {
    const picked = _.pick(
        o, _.filter(keys, k => _.isString(k))
    )

    const changes = _.filter(
        keys, k => _.isObject(k)
    )

    _.each(changes, ov => {
        _.each(ov, (name, oldName) => {
            picked[name] = o[oldName]
        })
    })

    return picked
}

export function formChangeChecker(o1, o2) {
    const filter = (v, k) => !(
        k.includes('HasError') || k.includes('ErrorText')
    )

    const firstObjectFields = _.pick(o1, filter)
    const secondObjectFields = _.pick(o2, filter)

    return _.isEqual(firstObjectFields, secondObjectFields)
}

export class Time {
    saved = this.now()

    now() {
        return Date.now()
    }

    save() {
        this.saved = this.now()
    }

    passedFromSaved() {
        return this.now() - this.saved
    }
}

export let DateUtils = _.extend({
    MILLI: {
        second: MS_IN_SEC,
        minute: MS_IN_MIN,
        hour: MS_IN_HOUR,
        day: MS_IN_DAY,
        week: MS_IN_WEEK
    },

    format: function (date, format, utc) {
        let token = /d{1,4}|M{1,4}|YY(?:YY)?|([HhmsAa])\1?|[oS]|[zZ]/g
        let df = DateUtils.formats

        date = date || new Date()

        if (!(date instanceof Date)) {
            date = new Date(date)
        }

        if (isNaN(date)) {
            throw TypeError('Invalid date')
        }

        format = String(df[format] || format || df['default'])

        let abbr = getTimeZoneAbbr(date)

        let prf = utc ? 'getUTC' : 'get'
        let d = date[prf + 'Date']()
        let D = date[prf + 'Day']()
        let M = date[prf + 'Month']()
        let Y = date[prf + 'FullYear']()
        let H = date[prf + 'Hours']()
        let m = date[prf + 'Minutes']()
        let s = date[prf + 'Seconds']()
        let o = utc ? 0 : date.getTimezoneOffset()
        let z = abbr.toLowerCase()
        let Z = abbr.toUpperCase()
        let flags = {
            d: d,
            dd: pad(d),
            ddd: DateUtils.i18n.dayNames[D],
            dddd: DateUtils.i18n.dayNames[D + 7],
            M: M + 1,
            MM: pad(M + 1),
            MMM: DateUtils.i18n.monthNames[M],
            MMMM: DateUtils.i18n.monthNames[M + 12],
            YY: String(Y).slice(2),
            YYYY: Y,
            h: H % 12 || 12,
            hh: pad(H % 12 || 12),
            H: H,
            HH: pad(H),
            m: m,
            mm: pad(m),
            s: s,
            ss: pad(s),
            a: H < 12 ? 'a' : 'p',
            aa: H < 12 ? 'am' : 'pm',
            A: H < 12 ? 'A' : 'P',
            AA: H < 12 ? 'AM' : 'PM',
            o: (o > 0 ? '-' : '+') + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
            S: ['th', 'st', 'nd', 'rd'][d % 10 > 3 ? 0 : (d % 100 - d % 10 !== 10) * d % 10],
            z: '(' + z + ')',
            Z: '(' + Z + ')'
        }

        return format.replace(token, function (t) {
            return (t in flags) ? flags[t] : t.slice(1, t.length - 1)
        })
    },

    formats: {
        'default': 'YYYY/MM/dd',
        time: 'hh: mm AA',
        shortDate: 'MM/dd',
        mediumDate: 'YY/MM/dd',
        americanShortDate: 'M/d/YYYY',
        americanMediumDate: 'MM/dd/YYYY',
        separatedYearDate: 'MMM dd, YYYY',
        separatedYearDateTime: 'MMM dd, YYYY hh:mm AA',
        longDate: 'YYYY/MM/dd',
        longDateTime: 'YYYY/MM/dd HH:mm:ss',
        longDateMediumTime12: 'MM/dd/YYYY hh:mm AA',
        longDateMediumTime12TimeZone: 'MM/dd/YYYY hh:mm AA Z',
        isoDateTime: 'YYYY-MM-ddTHH:mm:ss.000'
    },

    i18n: {
        dayNames: [
            'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat',
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ],
        monthNames: [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
            'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
        ]
    },

    diffDates: function (date1, date2, unit) {
        const diffInMs = Math.abs(+date1 - +date2)
        if (!unit) {
            return diffInMs
        }

        unit = unit.toLowerCase()
        const unitInMs = DateUtils.MILLI[unit]
        if (unitInMs) {
            return diffInMs / unitInMs
        }
        else if (unit === 'month' || unit === 'year') {
            const date1Less = date1 < date2
            const start = date1Less ? date1 : date2
            const end = date1Less ? date2 : date1
            let years = DateUtils.year(end) - DateUtils.year(start)
            let months = years * 12 + DateUtils.month(end) - DateUtils.month(start)
            let days = DateUtils.date(end) - DateUtils.date(start)
            if (days >= 0) {
                months++
            }
            return (unit === 'month') ? months : months / 12
        }
        else {
            return diffInMs
        }
    },

    isTomorrow: function (date) {
        let d1 = DateUtils.startOf(new Date(), 'day')
        let d2 = DateUtils.startOf(date, 'day')
        return (DateUtils.diff(d1, d2, 'day') === 1)
    },

    isToday: function (date) {
        let d1 = DateUtils.startOf(new Date(), 'day')
        let d2 = DateUtils.startOf(date, 'day')
        return (DateUtils.diff(d1, d2, 'day') === 0)
    },

    isYesterday: function (date) {
        let d1 = DateUtils.startOf(new Date(), 'day')
        let d2 = DateUtils.startOf(date, 'day')
        return (DateUtils.diff(d2, d1, 'day') === 1)
    },

    startOf: function (date, unit) {
        return DateUtils.startOf(date, unit)
    },

    endOf: function (date, unit) {
        return DateUtils.endOf(date, unit)
    },

    parseSecDuration(duration) {
        const secPerMinute = 60
        const secPerHour = 3600

        let hours = Math.floor(duration / secPerHour)
        duration = duration - hours * secPerHour
        let minutes = Math.floor(duration / secPerMinute)
        let seconds = duration - minutes * secPerMinute

        return (hours ? `${hours}h:` : '') + (minutes ? `${minutes}m:` : '') + `${seconds}s`
    },

    splitByMonth(start, end) {
        const endDate = end || new Date().getTime()
        const startDate = DateUtils.startOf(start || endDate, 'month')
        let d = DateUtils.startOf(endDate, 'month').getTime()
        let values = []
        while (d >= startDate) {
            values.push(d)
            d = DateUtils.add(d, -1, 'month').getTime()
        }
        return values
    },

    daysInMonth: function (year, month) {
        return new Date(year, month, 0).getDate()
    },

    getTimeZoneAbbr: getTimeZoneAbbr,

    toUTC: function (v) {
        const date = v instanceof Date ? v : new Date(v)

        return new Date(
            date.getTime() + date.getTimezoneOffset() * 60000
        )
    },

    localize: function (v) {
        const date = v instanceof Date ? v : new Date(v)

        return new Date(
            date.getTime() - date.getTimezoneOffset() * 60000
        )
    }
}, Dates)

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getRandomFloat(min, max, precision) {
    return min + Number((Math.random() * (max - min + 1)).toFixed(precision))
}

export function getAddress({ city = '', street = '', state = '', zip = '' } = {}, sep = '') {
    const s = `${street ? (street + sep) : ''} ${city ? (city + sep) : ''} ${state ? (state + sep) : ''} ${zip || ''}`
    return s.replace(/\s+/g, ' ')
}

export function camel(s) {
    return s.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
        return index === 0 ? letter.toLowerCase() : letter.toUpperCase()
    }).replace(/\s+/g, '')
}

export function defer(delay = 0, ...args) {
    return new Promise(resolve => {
        setTimeout(() => { resolve.apply(null, args) }, delay)
    })
}

export function delay(delay = 0, ...args) {
    return new Promise(resolve => {
        setTimeout(() => { resolve.apply(null, args) }, delay)
    })
}

export function promise(...args) {
    return new Promise(resolve => {
        resolve.apply(null, args)
    })
}

export function interpolate(s, ...vals) {
    for (let i = 0; i < vals.length; i++) {
        s = s.replace(new RegExp(`\\$${i}`, 'g'), vals[i])
    }
    return s
}

//todo remove
export function convertFileSize(initialSizeInBytes, format = MB) {
    return (initialSizeInBytes / Math.pow(1024, EXPONENTIAL_POWER_VARIANTS_FOR_SIZES[format]))
}

export function getDataPage(data, pagination) {
    const { page, size } = pagination

    return _.filter(data, (o, i) => {
        const start = page * size
        const end = start + size
        return i >= start && i < end
    })
}

export function camelToRegular(s) {
    return s.replace(/([A-Z])/g, ' $1')
            .replace(/^./, function (str) { return str.toUpperCase(); })
}

// My  favourite   - color \is green -> my-favourite-color-is-green
export function hyphenate(...vals) {
    return _.map(
        vals, v => v.trim().toLowerCase().replace(/(\s*-+\s*)|\s+|\\|\//g, '-')
    ).join('-')
}

// my-favourite-color-is-green -> My Favourite Color Is Green
export function hyphenatedToTitle(s) {
    return _.map(s.split('-'), w => capitalize(w)).join(' ')
}

export function containsIgnoreCase(a, b) {
    return a.toLowerCase().includes(b.toLowerCase())
}

export function getDataUrl(data, mediaType, isBase64 = true) {
    return `data:${mediaType ? `${mediaType};` : ''}${isBase64 ? 'base64' : ''},${data}`
}

export function dataURLtoFile(dataUrl, fileName) {
    let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
}

export function jsonToFormDataConverter(obj, form, namespace) {
    const fd = form || new FormData()

    let formKey

    for (let property in obj) {
        if (obj.hasOwnProperty(property)) {

            if (namespace) {
                formKey = namespace + '.' + property
            }
            else {
                formKey = property
            }

            if (_.isArray(obj[property])) {
                fd.append(formKey, obj[property])
            }

            else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {

                jsonToFormDataConverter(obj[property], fd, property)

            }

            else {
                fd.append(formKey, obj[property])
            }

        }
    }

    return fd
}

export function repeatStringNumTimes(str, times) {
    let repeatedStr = ''

    while (times > 0) {
        repeatedStr += str
        times--
    }
    return repeatedStr
}

export function getPasswordRegExp(options) {
    const {
        length,
        upperCaseCount,
        lowerCaseCount,
        alphabeticCount,
        arabicNumeralCount,
        nonAlphaNumeralCount
    } = options

    let pattern = `(?=.{${length},}$)`

    if (alphabeticCount) {
        pattern += `(?=[a-zA-Z]{${alphabeticCount}})`
    }

    if (arabicNumeralCount) {
        pattern += `(?=${repeatStringNumTimes(PASSWORD_VALIDATIONS[DIGIT], arabicNumeralCount)})`
    }

    if (upperCaseCount) {
        pattern += `(?=${repeatStringNumTimes(PASSWORD_VALIDATIONS[UPPERCASE_LETTER], upperCaseCount)})`
    }

    if (lowerCaseCount) {
        pattern += `(?=${repeatStringNumTimes(PASSWORD_VALIDATIONS[LOWERCASE_LETTER], lowerCaseCount)})`
    }

    if (nonAlphaNumeralCount) {
        pattern += `(?=${repeatStringNumTimes(PASSWORD_VALIDATIONS[SPECIAL_CHARACTERS], nonAlphaNumeralCount)})`
    }

    console.log("pattern", pattern)

    return new RegExp(pattern)
}