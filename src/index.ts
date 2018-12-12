import fetch from 'node-fetch'
import { ITipeClientOptions, ITipeParams, APIFetcher } from './type'
import stringify from 'fast-json-stable-stringify'

export default class Client {
  public static createClient = createClient
  public config: ITipeClientOptions

  constructor(config: ITipeClientOptions) {
    this.config = config
  }

  public getDocuments = (shape: string, searchFields: ITipeParams = {}, options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api('/documents', {shape, fields: searchFields}, options)
  }

  public getDocumentById = (id: string, options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api('/documentbyid', {fields: {id}}, options)
  }

  public getPageByParams = (page: string, params: ITipeParams): Promise<{[key: string]: any}> => {
    return this.api('/page', {page, fields: params})
  }

  public api: APIFetcher = (path, contentConfig, fetchConfig) => {
    const config = {
      ...this.config,
      ...fetchConfig
    }

    const domain = config.domain || 'https://api.tipe.io'
    const url = `/api/${config.project}/${path.split('/').pop()}`
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: config.key
    }

    const body = stringify(contentConfig)

    const options = {
      method: 'POST',
      headers,
      body,
      cache: 'no-cache',
      timeout: config.timeout || 5000
    }

    return fetch(`${domain}${url}`, options)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(res)
    })
  }
}

export function createClient (config: ITipeClientOptions) {
  return new Client(config)
}
