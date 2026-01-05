/**
 * Created by stsiushkevich on 08.11.2018
 */
import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import _ from 'underscore'

import ErrorLog from './ErrorLog'

let errorLog = null
let isAlertShowed = false

function isNotEmpty (v) {
  return !_.isEmpty(v)
}

function isString (v) {
  return _.isString(v)
}

function getError (o) {
  return o ? (o.error ? getError(o.error) : o) : null
}

function getErrorCode (o) {
  return (getError(o) || {}).code
}

function getErrorMessage (e) {
  let message = ''

  if(e.message) message = e.message
  else if (isString(e)) message = e

  _.each(e.validationErrors || [], o => {
    message += `\n${o}`
  })
  return message
}

function shouldSkipError (e, excluded) {
  return _.contains(excluded, e.code) || errorLog.contains(e)
}

function showConfirmationAlert (opts) {
  isAlertShowed = true

  const {
    title, text, onConfirm: cb
  } = opts

  //todo create Global Modal using React Portals

  /*Alert.alert(title, text, [{
      type: Alert.POSITIVE_BUTTON,
      text: 'OK',
      onPress: () => {
        isAlertShowed = false
        cb && cb()
      }
    }],
    { cancelable: false }
  )*/
}

export default class ErrorManager {

  api = {
    getError: getError,
    getErrorMessage: getErrorMessage,
    getErrorCode: getErrorCode
  }

  constructor () {
    errorLog = new ErrorLog()
  }

  handleError (source, opts = {}) {
    const e = getError(source)
    const excluded = opts.exclude || []

    if (isNotEmpty(e) && !shouldSkipError(e, excluded)) {
      if (!isAlertShowed) {
        const {alert = {}} = opts

        const {hasTitle = true, onConfirm} = alert
        const title = hasTitle ? (alert.title || 'Error') : ''
        const text = getErrorMessage(e)

        showConfirmationAlert({title, text, onConfirm})
      }

      errorLog.add(e)
    }
  }

  clearErrorLog () {
    errorLog.clear()
  }
}
