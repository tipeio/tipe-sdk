import axios from 'axios'
import {
  ITipeClientOptions,
  APIFetcher,
  GetPageByTipeIdOptions,
  GetPagesByTypeOptions,
  GetPagesByParamsOptions,
  GetPageByIdOptions
} from './type'

import stringify from 'fast-json-stable-stringify'
declare var window: any
export default class Client {
  public static createClient = createClient
  public config: ITipeClientOptions

  constructor(config: ITipeClientOptions) {
    this.config = config
  }

  public getPagesByProjectId = (projectId: string): Promise<{[key: string]: any}> => {
    return this.api(`POST`, `pagesByProjectId`, { projectId })
  }

  public getPagesByType = (pageConfig: ITipeClientPageOptions, options?: ITipeClientOptions): Promise<{ [key: string]: any }> => {
    return this.api(`POST`, `pagesByType`, {page: pageConfig.name, status: pageConfig.status}, options)
  }

  public getPageByParams = (pageConfig: ITipeClientPageOptions, options?: ITipeClientOptions): Promise<{ [key: string]: any }> => {
    if (window && window.location.href.split('?tipeId=')[1]) {
      const tipeParams = window.location.href.split('?tipeId=')[1]
      return this.getPageByTipeId({ id: tipeParams }, options)
    }
    return this.api('POST', 'pageByParams', pageConfig, options)
  }

  public getPageById = (pageConfig: GetPageByIdOptions, options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    if (window && window.location.href.split('?tipeId=')[1]) {
      const tipeParams = window.location.href.split('?tipeId=')[1]
      return this.getPageByTipeId({ id: tipeParams }, options)
    }
    return this.api('POST', 'pageById', pageConfig, options)
  }

  public getPageByTipeId = (pageConfig: GetPageByTipeIdOptions,  options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
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
