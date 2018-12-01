jest.mock('node-fetch', () => {
  return function() {
    return Promise.resolve()
  }
})

import Tipe, { createClient } from '../src'

describe('Tipe', () => {
  test('should work', () => {
    expect(Tipe).not.toBe(undefined)
  })
  test('should createClient', () => {
    const tipe = createClient({})
    expect(tipe instanceof Tipe).toBe(true)
  })
})
