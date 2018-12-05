import Tipe, { createClient } from '../src'
jest.mock('node-fetch', () => {
  return function(url: string, options: any) {
    // sync promise
    const promise = {
      then(fn: any) {
        options.body = JSON.parse(options.body)
        return fn([url, options])
        return promise
      },
      catch(fn?: any) {
        return promise
      }
    }
    return promise
  }
})
console.log = s => {
  process.stdout.write(s + "\n")
}
describe('Tipe', () => {
  test('should work', () => {
    expect(Tipe).not.toBe(undefined)
  })
  test('should createClient', () => {
    const tipe = createClient({})
    expect(tipe instanceof Tipe).toBe(true)
  })
  test('should request a document', () => {
    const tipe = createClient({
      domain: 'yolo.com',
      project: '090909',
      key: '8989'
    })
    tipe.document({
      id: '555'
    }).then(([url, options]) => {
      expect(url).toEqual('yolo.com/api/090909/sdk')
      expect(options.body.type).toEqual('document')
    })
    .catch(() => {})
  })
  test('should request a asset', () => {
    const tipe = createClient({
      domain: 'yolo.com',
      project: '090909',
      key: '8989'
    })
    tipe.asset({
      id: '555'
    }).then(([url, options]) => {
      expect(url).toEqual('yolo.com/api/090909/sdk')
      expect(options.body.type).toEqual('asset')
    })
    .catch(() => {})
  })
  test('should request a page', () => {
    const tipe = createClient({
      domain: 'yolo.com',
      project: '090909',
      key: '8989'
    })
    tipe.page({
      id: '555'
    }).then(([url, options]) => {
      expect(url).toEqual('yolo.com/api/090909/sdk')
      expect(options.body.type).toEqual('page')
    })
    .catch(() => {})
  })
})
