jest.mock('../src/tipe-fetch', () => {
  return function fetch(...args) {
    return [...args]
  }
})
const { Client, RestClient, GraphqlClient } = require('../src/client')

describe('Client', () => {
  let client = null
  beforeEach(() => {
    client = new Client()
  }, 1000)
  test('should throw error when query not implemented', () => {
    const message = 'query: not implemented'
    expect(() => client.query()).toThrow(new Error(message))
  })
  test('should throw error when fetch not implemented', () => {
    const message = 'fetch: not implemented'
    expect(() => client.fetch()).toThrow(new Error(message))
  })
  test('should throw error when folder not implemented', () => {
    const message = 'folder: not implemented'
    expect(() => client.folder()).toThrow(new Error(message))
  })
  test('should throw error when folders not implemented', () => {
    const message = 'folders: not implemented'
    expect(() => client.folders()).toThrow(new Error(message))
  })
  test('should throw error when document not implemented', () => {
    const message = 'document: not implemented'
    expect(() => client.document()).toThrow(new Error(message))
  })
  test('should throw error when documents not implemented', () => {
    const message = 'documents: not implemented'
    expect(() => client.documents()).toThrow(new Error(message))
  })
})

describe('RestClient', () => {
  let clientPublished = null
  let client = null
  beforeEach(() => {
    client = new RestClient({
      orgKey: 'My_orgKey',
      apiKey: 'My_apiKey',
      published: false
    })
    clientPublished = new RestClient({
      orgKey: 'My_orgKey',
      apiKey: 'My_apiKey',
      published: true
    })
  }, 1000)
  test('_createUrl', () => {
    expect(client._createUrl('folder', '77-uuid-88')).toBe(
      'https://api.tipe.io/api/v1/folder/77-uuid-88'
    )
    expect(clientPublished._published).toBe(true)
    expect(clientPublished._createUrl('folder', '77-uuid-88')).toBe(
      'https://api.tipe.io/published/api/v1/folder/77-uuid-88'
    )
  })
  test('fetch', () => {
    expect(client.fetch('http://yeye')).toEqual([
      'http://yeye',
      'My_orgKey',
      'My_apiKey'
    ])
    expect(clientPublished.fetch('http://yeye')).toEqual([
      'http://yeye',
      'My_orgKey',
      'My_apiKey'
    ])
  })
  test('folder', () => {
    expect(client.folder('77-uuid-88')).toEqual([
      'https://api.tipe.io/api/v1/folder/77-uuid-88',
      'My_orgKey',
      'My_apiKey'
    ])
    expect(clientPublished.folder('88-uuid-99')).toEqual([
      'https://api.tipe.io/published/api/v1/folder/88-uuid-99',
      'My_orgKey',
      'My_apiKey'
    ])
  })
  test('folders', () => {
    expect(client.folders()).toEqual([
      'https://api.tipe.io/api/v1/folders',
      'My_orgKey',
      'My_apiKey'
    ])
    expect(clientPublished.folders()).toEqual([
      'https://api.tipe.io/published/api/v1/folders',
      'My_orgKey',
      'My_apiKey'
    ])
  })
  test('document', () => {
    expect(client.document('77-uuid-88')).toEqual([
      'https://api.tipe.io/api/v1/document/77-uuid-88',
      'My_orgKey',
      'My_apiKey'
    ])
    expect(clientPublished.document('88-uuid-99')).toEqual([
      'https://api.tipe.io/published/api/v1/document/88-uuid-99',
      'My_orgKey',
      'My_apiKey'
    ])
  })
  test('documents', () => {
    expect(client.documents()).toEqual([
      'https://api.tipe.io/api/v1/documents',
      'My_orgKey',
      'My_apiKey'
    ])
    expect(clientPublished.documents()).toEqual([
      'https://api.tipe.io/published/api/v1/documents',
      'My_orgKey',
      'My_apiKey'
    ])
  })
})

describe('GraphqlClient', () => {
  let client = null
  let clientPublished = null
  beforeEach(() => {
    client = new GraphqlClient({
      orgKey: 'My_orgKey',
      apiKey: 'My_apiKey',
      published: false
    })
    clientPublished = new GraphqlClient({
      orgKey: 'My_orgKey',
      apiKey: 'My_apiKey',
      published: true
    })
  }, 1000)
  test('_createUrl', () => {
    expect(client._createUrl()).toBe('https://api.tipe.io/graphql')
    expect(client._published).toBe(false)
    expect(clientPublished._published).toBe(true)
    expect(clientPublished._createUrl()).toBe(
      'https://api.tipe.io/published/graphql'
    )
  })
})
