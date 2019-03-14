import axios from 'axios'
import { ITipeClientOptions, APIFetcher } from './type'

import stringify from 'fast-json-stable-stringify'

export default class Client {
  public static createClient = createClient
  public config: ITipeClientOptions

  constructor(config: ITipeClientOptions) {
    this.config = config
  }

  public getDocumentsByType = (shape: string, options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api(`documents/${shape}`, {fields: {}}, options)
  }

  public getDocumentById = (id: string, options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api(`document/${id}`, {fields: {}}, options)
  }

  public getPage = (route: string,  options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api('page', {fields: { route }}, options)
  }

  public api: APIFetcher = (path, contentConfig, fetchConfig) => {
    const config = {
      ...this.config,
      ...fetchConfig
    }

    const domain = config.domain || 'https://api.tipe.io'
    const url = `/api/${config.project}/${path}`
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=utf-8',
      Authorization: config.key
    }

    const body = stringify(contentConfig)

    const options = {
      method: 'GET',
      headers,
      body,
      cache: 'no-cache',
      timeout: config.timeout || 5000
    }

    return axios({...options, url: `${domain}${url}`})
      .then(res => res)
      .catch(err => {
        return Promise.reject(err)
      })
  }
}

export function createClient (config: ITipeClientOptions) {
  return new Client(config)
}
