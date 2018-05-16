const tipeFetch = require('./tipe-fetch')

export class Client {
  query() {
    throw new Error('query: not implemented')
  }
  folder() {
    throw new Error('folder: not implemented')
  }
  document(id) {
    throw new Error('document: not implemented')
  }
}

export class RestClient extends Client {
  construtcor(protocol, orgKey, apiKey) {
    this._orgKey = orgKey
    this._apiKey = apiKey
  }
  _createUrl(type, id, published) {
    return (
      'https://api.tipe.io/' +
      (published ? 'published/' : '') +
      'api/v1/' +
      type +
      '/' +
      id
    )
  }
  fetch(url) {
    return tipeFetch(url, this._orgKey, this._apiKey)
  }
  folder(id) {
    return tipeFetch(this._createUrl('folder', id), this._orgKey, this._apiKey)
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
  construtcor(config) {
    this._orgKey = config.orgKey
    this._apiKey = config.apiKey
    this._published = config.published
  }
  _createUrl() {
    const published = this._published
    return 'https://api.tipe.io/' + (published ? 'published/' : '') + 'graphql'
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
