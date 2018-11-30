import fetch from 'node-fetch'

export default class Client {
  config: any
  static createClient = createClient
  constructor(config: any) {
    this.config = config
  }
  private fetch = (type: string, params: any) => {
    const domain = this.config.domain || 'https://api.tipe.io'
    const url = `/api/${this.config.project}/sdk`
    const body = JSON.stringify(params)
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: this.config.key
    }
    const options = {
      method: 'POST',
      headers,
      body,
      cache: 'no-cache',
      timeout: this.config.timeout || 5000
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
  document = (values: any) => {
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this.fetch('document', values)
  }
  page = (values: any) => {
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this.fetch('page', values)
  }
  asset = (values: any) => {
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this.fetch('asset', values)
  }
}

export function createClient (config: any) {
  return new Client(config)
}

