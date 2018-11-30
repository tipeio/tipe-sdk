import fetch from 'node-fetch'

export default class Client {
  config: any
  static createClient = createClient
  constructor(config: any) {
    this.config = config
  }
  private _fetch = (type: string, params: any) => {
    const domain = this.config.domain || 'https://tipe.io'
    const url = `/api/${this.config.project}/${type}`
    const body = JSON.stringify(params)
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
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this._fetch('document', values)
  }
  page = (values: any) => {
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this._fetch('page', values)
  }
  asset = (values: any) => {
    if (typeof values === 'string') {
      values = {id: values}
    }
    return this._fetch('asset', values)
  }
}

export function createClient (config: any) {
  return new Client(config)
}

