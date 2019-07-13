import Tipe, { createClient } from '../src'
import stringify from 'fast-json-stable-stringify'
import axios from "axios"
jest.mock("axios");

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

  describe('pages by project id', () => {
    test('calls api with correct args', async () => {
      const projectId = 'asdf'
      const options = {key: '1', project: projectId}
      const tipe = new Tipe(options)
      const expectedResults = {data: {}}
      tipe.api = jest.fn().mockResolvedValue(expectedResults)

      const results = await tipe.getPagesByProjectId()

      expect(tipe.api).toHaveBeenNthCalledWith(1, 'POST', 'pagesByProjectId', {projectId})
      expect(results).toBe(expectedResults)
    })
  })

  describe('page by id', () => {
    test('calls api with correct args', async () => {
      const projectId = '12'
      const options = {key: '1', project: projectId}
      const tipe = new Tipe(options)
      const expectedResults = {data: {}}
      tipe.api = jest.fn().mockResolvedValue(expectedResults)

      const id = 'the_id'
      const results = await tipe.getPageById({id}, options)

      expect(tipe.api).toHaveBeenNthCalledWith(1, 'POST', 'pageById', {id}, options)
      expect(results).toBe(expectedResults)
    })
  })

  describe('pages by template', () => {
    test('calls api with correct args', async ()=> {
      const options = {key: '1', project: '12'}
      const tipe = new Tipe(options)
      const expectedResults = {data: {}}
      tipe.api = jest.fn().mockResolvedValue(expectedResults)
      
      const config = {template: '12334', status: 'draft'}
      const results = await tipe.getPagesByTemplate(config, options)

      expect(tipe.api).toHaveBeenNthCalledWith(1, 'POST', 'pagesByTemplate', config, options)
      expect(results).toBe(expectedResults)
    })
  })

  describe('page by param', () => {
    test('calls api with correct args', async ()=> {
      const options = { key: '1', project: '12' }
      const pageConfig = {template: '12323', searchParam: 'test', status: 'DRAFT'}
      const tipe = new Tipe(options)
      const expectedResults = { data: {} }
      
      tipe.api = jest.fn().mockResolvedValue(expectedResults)

      const results = await tipe.getPagesByParam(pageConfig, options)

      expect(tipe.api).toHaveBeenNthCalledWith(1, 'POST', 'pageByParam', pageConfig, options)
      expect(results).toBe(expectedResults)
    })
  })

  describe('api', () => {
    test('formats the correct request', async () => {
      const expectedResult = {data: {}}

      const path = 'hello'
      const params = {fields: {name: 'Jason'}}
      const config = {key: 'key', project: 'project'}
      const tipe = new Tipe(config)

      const result = await tipe.api('GET', path, params, config)
      const body = stringify(params)

      expect(axios).toHaveBeenNthCalledWith(1, {
        url: `https://api.tipe.io/api/${config.project}/${path}`,
        data: body,
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          Authorization: config.key
        },
        cache: 'no-cache',
        timeout: 5000
      })
    })
  })
})
