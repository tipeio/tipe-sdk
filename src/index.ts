import axios from 'axios'
import {
  ITipeClientOptions,
  ITipeClientPageOptions,
  APIFetcher,
  IGetPageByTipeIdOptions,
  IGetPageByIdOptions
} from './type'

import stringify from 'fast-json-stable-stringify'

export default class Client {
  public static createClient = createClient
  public config: ITipeClientOptions

  constructor(config: ITipeClientOptions) {
    this.config = config
  }

  public getPagesByProjectId = (): Promise<{[key: string]: any}> => {
    return this.api('POST', 'pagesByProjectId', { projectId: this.config.project })
  }

  public getPagesByTemplate = (pageConfig: ITipeClientPageOptions, options?: ITipeClientOptions): Promise<{ [key: string]: any }> => {
    return this.api('POST', 'pagesByTemplate', pageConfig, options)
  }

  public getPagesByParam = (pageConfig: ITipeClientPageOptions, options?: ITipeClientOptions): Promise<{ [key: string]: any }> => {
    return this.api('POST', 'pageByParam', pageConfig, options)
  }

  public getPageById = (pageConfig: IGetPageByIdOptions, options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api('POST', 'pageById', pageConfig, options)
  }

  public getPageByTipeId = (pageConfig: IGetPageByTipeIdOptions,  options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api('POST', 'pageByTipeId', pageConfig, options)
  }

  public api: APIFetcher = (restMethod = 'GET', path, contentConfig, fetchConfig) => {
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
      method: restMethod,
      url: `${domain}${url}`,
      headers,
      data: body,
      cache: 'no-cache',
      timeout: config.timeout || 5000
    }

    return axios(options)
  }
}

export function createClient (config: ITipeClientOptions) {
  return new Client(config)
}
