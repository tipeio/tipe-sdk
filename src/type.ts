export interface ITipeClientOptions {
  key: string
  project: string
  domain?: string
  timeout?: number
}

export interface ITipeParams {
  [key: string]: string
}

export interface ITipePageParams {
  params: { [key: string]: string }
  route: string
}

export interface IFetchConfig {
  fields: {[key: string]: string} | ITipePageParams
  shape?: string
  page?: string
}

export type APIFetcher = (
  path: string,
  contentConfig: IFetchConfig,
  fetchConfig?: ITipeClientOptions
) => Promise<{[key: string]: any}>

