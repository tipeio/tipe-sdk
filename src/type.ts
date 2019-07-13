export interface IGetPagesByTypeOptions {
  template: string
  status?: string
}

export interface IGetPageByIdOptions {
  id: string
}

export interface IGetPagesByParamOptions {
  template: string
  searchParam: string
  status?: string
}

export interface IGetPageByTipeIdOptions {
  id: string
}

export interface ITipeClientPageOptions {
  template: string
  status?: string,
  searchParam?: string
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
}

export type APIFetcher = (
  restMethod: string,
  path: string,
  contentConfig: IFetchConfig,
  fetchConfig?: ITipeClientOptions
) => Promise<{[key: string]: any}>

