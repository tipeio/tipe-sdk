import fetch from 'node-fetch'
const stringify: (obj: any) => string = require('fast-json-stable-stringify')

export default class Client {
  config: any
  static createClient = createClient
  constructor(config: any) {
    this.config = config
  }
  private fetch = (type: string, params: any, opt = {}) => {
    const config = {
      ...this.config,
      ...opt
    }
    const domain = config.domain || 'https://api.tipe.io'
    const url = `/api/${config.project}/sdk`
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: config.key
    }
    const body = stringify({
      params,
      type
    })
    const options = {
      method: 'POST',
      headers,
      body,
      cache: 'no-cache',
      timeout: config.timeout || 5000
    }
    const promise = fetch(`${domain}${url}`, options)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res)
    })

    return promise
  }
  document = (values: any, options = {}) => {
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this.fetch('document', values, options)
  }
  page = (values: any, options = {}) => {
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this.fetch('page', values, options)
  }
  asset = (values: any, options = {}) => {
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this.fetch('asset', values, options)
  }
}

export function createClient (config: any) {
  return new Client(config)
}

