export interface ITipeClientOptions {
  key: string
  project: string
  domain?: string
  timeout?: number
}

export interface ITipeParams {
  [key: string]: string
}

export interface IFetchCOnfig {
  fields: {[key: string]: string}
  shape?: string
  page?: string
}

export type APIFetcher = (
  path: string,
  contentConfig: IFetchCOnfig,
  fetchConfig?: ITipeClientOptions
) => Promise<{[key: string]: any}>

