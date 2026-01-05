/**
 * Created by stsiushkevich on 08.11.2018
 */

import _ from 'underscore'

let log = null

export default class ErrorLog {
  constructor () {
    log = {}
  }

  contains (e) {
    const { code } = e
    return !!code && !!log[code] &&
      _.any(log[code], o => o.message === e.message)
  }

  add (e) {
    const { code } = e
    if (!log[code]) log[code] = []
    log[code].push(e)
  }

  get () {
    return _.clone(log)
  }

  clear () {
    log = {}
  }
}
