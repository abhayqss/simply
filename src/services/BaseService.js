import {
    any,
    each,
    keys,
    some,
    omit,
    extend,
    isNumber
} from 'underscore'

import qs from 'qs'
import request from 'superagent'

import config from 'config'

import mockServer from 'lib/mock/MockServer'

import Converter from 'lib/converters/Converter'
import ConverterFactory from 'lib/converters/ConverterFactory'

import ServerError from 'lib/errors/ServerError'
import NetworkError from 'lib/errors/NetworkError'
import AuthorizationError from 'lib/errors/AuthorizationError'

import {
    SERVER_ERROR_CODES,
    ALLOWED_FILE_FORMAT_MIME_TYPES,
} from 'lib/Constants'

import { isEmpty } from 'lib/utils/Utils'

// requests, which have not implemented on the backend yet
const notImplementedRequestTemplates = [
    // '/login', // implemented
    // '/logout', // implemented
   /* '/auth/validate-token',*/ // implemented

    /*Directory Service*/
    /*'/states', // implemented
    '/genders', // implemented
    '/marital-status', // implemented
    '/domains', // implemented
    '/priorities', // implemented*/
   /* '/note-types',
    '/note-subtype',
    '/event-types',
    '/additional-services',*/
    //'/community-types', // implemented
    // '/services-treatment-approaches', // implemented
    /*'/system-roles', // implemented
    '/care-team-channels', // implemented
    '/care-team-responsibilities', // implemented
    '/primary-focuses', // implemented
    '/emergency-services', // implemented
    '/additional-services', // implemented
    '/language-services', // implemented*/
    '/organization-types',
    '/encounter-note-type',
    //'/insurance/networks', // implemented
    //'/insurance/payment-plans', // implemented
    /*'/organizations', // implemented
    '/organizations/count', // implemented
    '/organizations/:id', // implemented
    '/communities', // implemented
    '/communities/count', // implemented
    '/communities/:id', // implemented*/
    //'/care-levels',
    '/handsets',
    '/handsets/count',
    '/zones',
    '/zones/count',
    '/device-types',
    '/device-types/count',
    '/device-types/:id',
    '/locations',
    '/locations/count',
    /*'/contacts',// implemented
    '/contacts/count',// implemented
    '/contacts/:id',*/ // implemented
    /*'/clients', // implemented
    '/clients/:id', // implemented
    '/clients/count', // implemented
    '/service-plans', // implemented
    '/service-plans/count', // implemented
    '/service-plans/:id', // implemented*/
    /*'/assessments',
    '/assessments/:id',
    '/assessments/:id/history',
    '/assessment-new',
    '/assessment-survey',
    '/assessment-management',
    '/assessment-count',*/
    /*'/care-team',
    '/care-team/count',*/
    '/alerts',
    '/alerts/count',
    '/dashboard',
    // '/marketplace/communities', // implemented
    // '/marketplace/communities/:id', // implemented
    /*'/events', // implemented
    '/composed-events-notes', // implemented
    '/events/:id', // implemented
    '/events/:id/notifications', // implemented
    '/events/:id/notes', // implemented
    '/notes', // implemented
    '/notes/:id', // implemented
    '/notes/:id/history', // implemented*/
    /*'/admit-dates',*/
    //'/documents', // implemented
]

const { responseTimeout } = config

const {
    UNAUTHORIZED,
    CONNECTION_ABORTED,
    INTERNAL_SERVER_ERROR,
    NO_CONNECTION_OR_SERVER_IS_NOT_AVAILABLE
} = SERVER_ERROR_CODES

const UNAUTHORIZED_ERROR_TEXT = 'Authentication is required to access this resource'
const NO_CONNECTION_ERROR_TEXT = 'No Internet connection. Make sure that Wi-Fi or cellular mobile data is turned on.'
const INTERNAL_SERVER_ERROR_TEXT = 'Internal Server Error.\n During the query execution, errors occurred on the server. Please, contact Support.'
const SERVER_IS_NOT_AVAILABLE_ERROR_TEXT = 'Server is not available. Please, try to connect again later.'

const errors = {
    unauthorized: {
        error: {
            code: UNAUTHORIZED,
            message: UNAUTHORIZED_ERROR_TEXT
        }
    },
    serverInternal: {
        error: {
            code: INTERNAL_SERVER_ERROR,
            message: INTERNAL_SERVER_ERROR_TEXT
        }
    },
    noConnectionOrServerIsNotAvailable: {
        error: {
            code: NO_CONNECTION_OR_SERVER_IS_NOT_AVAILABLE,
            message: `HTTP Request has been terminated.\n Possible causes:\n\n - ${NO_CONNECTION_ERROR_TEXT}\n - ${SERVER_IS_NOT_AVAILABLE_ERROR_TEXT}`
        }
    }
}

const converter = ConverterFactory.getConverter(Converter.types.JS_OBJECT_TO_FORM_DATA)

function isAllowedMimeType (type) {
    return any(
        ALLOWED_FILE_FORMAT_MIME_TYPES,
        t => t === type
    )
}

function onSuccess(response) {
    const type = response.headers['content-type']

    if (isAllowedMimeType(type)) {
        const disposition = response.headers['content-disposition']

        return {
            data: response.body,
            name: /filename=(.*\.\w+)/.exec(disposition)[1] || 'unnamed.txt'
        }
    }

    const {
        body,
        statusCode: status
    } = JSON.parse(response.text)

    if ((status === 200 || status === 201) && body.success !== false) {
        return body
    }

    if (body.crossDomain || body.code === CONNECTION_ABORTED) {
        if (status) throw new ServerError(errors.serverInternal.error)
        throw new NetworkError(errors.noConnectionOrServerIsNotAvailable.error)
    }

    throw new ServerError({status, ...body.error})
}

function onFailure({code, status, response, crossDomain}) {
    if (code === 'ABORTED' || crossDomain) {
        if (status) throw new ServerError(errors.serverInternal.error)
        throw new NetworkError(errors.noConnectionOrServerIsNotAvailable.error)
    }

    let {
        body = {}
    } = JSON.parse(response.text) || {}

    if (!(body && body.error)) {
        throw new AuthorizationError(errors.unauthorized)
    }

    throw new ServerError({
        body,
        status,
        ...errors.serverInternal.error,
        ...body.error
    })
}

export default class BaseService {

    USER_ID_TEMPLATE = '{userId}'

    request(opts) {
        opts = extend({
            method: 'GET',
            url: null,
            body: null,
            type: 'json',
            params: null,
            callback: null
        }, opts)

        const {method} = opts

        const { remote } = config

        const isNotImplemented = some(notImplementedRequestTemplates, t => {
            return opts.url.includes(t)
        })

       if (!remote.isEnabled || isNotImplemented) {

            return mockServer.service({
                ...opts,
                params: {
                    ...opts.params,
                    ...opts.mockParams
                }
            }).then(onSuccess)

        }

        const url = `${config.remote.url}${opts.url}`

        let rq = request(method, url)
            .withCredentials()
            .set('X-Auth-With-Cookies', '')
            .set('TimezoneOffset', new Date().getTimezoneOffset())
            .timeout({response: responseTimeout})

        const { headers } = opts

        if (headers) {
            each(keys(headers), key => {
                rq.set(key, headers[key])
            })
        }

        if (['GET', 'DELETE'].includes(method)) {
            rq = rq.query(qs.stringify(
                omit(opts.params, v => isEmpty(v, { allowEmptyBool: false })),
                { arrayFormat: 'comma' }
            ))

            if (isAllowedMimeType(opts.type)) {
                rq = rq.responseType('blob')
                       .timeout({response: 5 * 60 * 1000})
            }
        }

        if (method === 'POST' || method === 'PUT') {
            if (opts.type === 'multipart/form-data') {
                rq.send(converter.convert(opts.body))
            }

            else rq = rq.type(opts.type).send(opts.body)
        }

        return rq.then(onSuccess, onFailure)
    }
}
