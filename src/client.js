const tipeFetch = require('./tipe-fetch')

export class Client {
  query() {
    throw new Error('query: not implemented')
  }
  fetch() {
    throw new Error('fetch: not implemented')
  }
  folder() {
    throw new Error('folder: not implemented')
  }
  folders() {
    throw new Error('folders: not implemented')
  }
  document() {
    throw new Error('document: not implemented')
  }
  documents() {
    throw new Error('documents: not implemented')
  }
}

export class RestClient extends Client {
  constructor(config) {
    super()
    this._apiUrl = config.apiUrl
    this._version = config.version
    this._orgKey = config.orgKey
    this._apiKey = config.apiKey
    this._published = config.published
  }
  _createUrl(type, id) {
    return (
      (this._apiUrl || 'https://api.tipe.io/') +
      (this._published ? 'published/' : '') +
      'api/v' +
      (this._version || '1') +
      '/' +
      type +
      (id ? '/' + id : '')
    )
  }
  fetch(url) {
    return tipeFetch(url, this._orgKey, this._apiKey)
  }
  folder(id) {
    return tipeFetch(this._createUrl('folder', id), this._orgKey, this._apiKey)
  }
  folders() {
    return tipeFetch(this._createUrl('folders'), this._orgKey, this._apiKey)
  }
  documents() {
    return tipeFetch(this._createUrl('documents'), this._orgKey, this._apiKey)
  }
  document(id) {
    return tipeFetch(
      this._createUrl('document', id),
      this._orgKey,
      this._apiKey
    )
  }
}

export class GraphqlClient extends Client {
  constructor(config) {
    super()
    this._apiUrl = config.apiUrl
    this._orgKey = config.orgKey
    this._apiKey = config.apiKey
    this._published = config.published
  }
  _createUrl() {
    const published = this._published
    return (
      (this._apiUrl || 'https://api.tipe.io/') +
      (published ? 'published/' : '') +
      'graphql'
    )
  }
  query(query, variables) {
    const body = { query }
    if (variables) {
      body.variables = variables
    }
    return tipeFetch(this._createUrl(), this._orgKey, this._apiKey, {
      method: 'POST',
      body: JSON.stringify(body)
    })
  }
}
