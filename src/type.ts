export interface ITipeClientPageOptions {
  name: string
  status?: string,
  routeParams?: {
    k: string
    v: string
  }
}
export interface ITipeClientOptions {
  key: string
  project: string
  domain?: string
  timeout?: number
}

export interface ITipeParams {
  [key: string]: string
}

export interface IFetchConfig {
  [key: string]: any
  status?: string
  page?: string
}

export type APIFetcher = (
  restMethod: string,
  path: string,
  contentConfig: IFetchConfig,
  fetchConfig?: ITipeClientOptions
) => Promise<{[key: string]: any}>

