import fetch from 'node-fetch'
const stringify: (obj: any) => string = require('fast-json-stable-stringify')

type IParams = {[key: string]: string}
type IOPtions = {[key: string]: string}

export default class Client {
  config: any
  static createClient = createClient
  constructor(config: any) {
    this.config = config
  }
  private fetch = (type: string, params: IParams, opt: IOPtions = {}) => {
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
  get = (type: string, values: IParams, options: IOPtions = {}) => {
    return this.fetch(type, values, options)
  }
  shape = (values: IParams, options: IOPtions = {}) => {
    type IOPtions = {[key: string]: string}
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this.fetch('Shape', values, options)
  }
  page = (values: IParams, options: IOPtions = {}) => {
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this.fetch('Page', values, options)
  }
  asset = (values: IParams, options: IOPtions = {}) => {
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this.fetch('Asset', values, options)
  }
}

export function createClient (config: IParams) {
  type IOPtions = {[key: string]: string}
  return new Client(config)
}

