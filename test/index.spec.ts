jest.mock('node-fetch')
import Tipe, { createClient } from '../src'
import stringify from 'fast-json-stable-stringify'
import fetch from 'node-fetch'

const mockedFetch = fetch as jest.Mock<typeof fetch>

describe('Tipe', () => {
  describe('client', () => {
    test('should work', () => {
      expect(Tipe).not.toBe(undefined)
    })
    test('should createClient', () => {
      let tipe = createClient({key: 'asdf', project: 'sdaf'})
      expect(tipe instanceof Tipe).toBe(true)

      tipe = new Tipe({key: 'asdf', project: 'sdaf'})
      expect(tipe instanceof Tipe).toBe(true)
    })
  })

  describe('getDocumets', () => {
    test('calls api with correct args', async ()=> {
      const options = {key: '', project: ''}
      const tipe = new Tipe(options)
      const expectedResults = {data: {}}

      tipe.api = jest.fn().mockResolvedValue(expectedResults)

      const shape = 'Person'
      const fields = {}
      const results = await tipe.getDocuments(shape, fields, options)

      expect(tipe.api).toHaveBeenNthCalledWith(1, '/documents', {shape, fields}, options)
      expect(results).toBe(expectedResults)
    })
  })

  describe('documentbyid', () => {
    test('calls api with correct args', async ()=> {
      const options = {key: '1', project: '12'}
      const tipe = new Tipe(options)
      const expectedResults = {data: {}}
      tipe.api = jest.fn().mockResolvedValue(expectedResults)

      const id = 'the_id'
      const results = await tipe.getDocumentById(id, options)

      expect(tipe.api).toHaveBeenNthCalledWith(1, '/documentbyid', {fields: {id}}, options)
      expect(results).toBe(expectedResults)
    })
  })

  describe('api', () => {
    test('formats the correct request', async () => {
      const expectedResult = {data: {}}
      const httpResponse = {
        ok: true,
        json() {
          return expectedResult
        }
      }

      mockedFetch.mockResolvedValue(httpResponse)

      const path = '/hello'
      const params = {fields: {name: 'Jason'}}
      const config = {key: 'key', project: 'project'}
      const tipe = new Tipe(config)

      const result = await tipe.api(path, params, config)
      const body = stringify(params)
      expect(mockedFetch).toHaveBeenNthCalledWith(1, `https://api.tipe.io/api/${config.project}${path}`, {
        body,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: config.key
        },
        cache: 'no-cache',
        timeout: 5000
      })

      expect(result).toBe(expectedResult)
    })
  })
})
