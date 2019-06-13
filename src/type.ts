export interface GetPagesByTypeOptions {
  name: string
  status?: string
}

export interface GetPageByIdOptions {
  id: string
}

export interface GetPagesByParamsOptions {
  name: string
  routeParams: {
    k: string
    v: string
  }
  status?: string
}

export interface GetPageByTipeIdOptions {
  id: string
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

