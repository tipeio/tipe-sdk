import fetch from 'node-fetch'

export default class Client {
  config: any
  static createClient = createClient
  constructor(config: any) {
    this.config = config
  }
  private _fetch = (params: string) => {
    const domain = this.config.domain || 'https://tipe.io'
    const url = `/api/${this.config.project}${params}`
    const body = JSON.stringify({})
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      Authorization: this.config.key
    }
    const options = {
      method: 'POST',
      headers,
      body,
      timeout: this.config.timeout || 5000
    }
    const promise = fetch(`${domain}${url}`, options)
    .then()

    return promise
  }
  document = (values: any) => {
    const params = Object.keys(values).reduce((mem, param) => {
      return mem + param + '=' + values[param]
    }, '?')
    return this._fetch(`/document${params}`)
  }
}

export function createClient (config: any) {
  return new Client(config)
}

