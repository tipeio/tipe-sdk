import axios from 'axios'
import { ITipeClientPageOptions, ITipeClientOptions, APIFetcher } from './type'

import stringify from 'fast-json-stable-stringify'
declare var window: any
export default class Client {
  public static createClient = createClient
  public config: ITipeClientOptions

  constructor(config: ITipeClientOptions) {
    this.config = config
  }

  public getPagesByType = (pageConfig: ITipeClientPageOptions, options?: ITipeClientOptions): Promise<{ [key: string]: any }> => {
    return this.api(`POST`, `pagesByType`, {page: pageConfig.name, status: pageConfig.status}, options)
  }

  public getPagesByParams = (pageConfig: ITipeClientPageOptions, options?: ITipeClientOptions): Promise<{ [key: string]: any }> => {
    if (window && window.location.href.split('?tipeId=')[1]) {
      const tipeParams = window.location.href.split('?tipeId=')[1]
      return this.getPageById(tipeParams, { id: tipeParams }, options)
    }
    return this.api(`POST`, `pageByParams`, {page: pageConfig.name, routeParams: pageConfig.routeParams, status: pageConfig.status}, options)
  }

  public getPageById = (id: string, contentConfig: object,  options?: ITipeClientOptions): Promise<{[key: string]: any}> => {
    return this.api(`POST`, `pageById`, contentConfig, options)
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
