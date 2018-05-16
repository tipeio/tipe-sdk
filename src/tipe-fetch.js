const fetch = require('isomorphic-fetch')

export default function tipeFetch(url, orgKey, apiKey, ops) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Tipe-Id': orgKey,
      Authorization: apiKey
    },
    ...ops
  }
  return fetch(url, options).then(function(res) {
    if (res.status >= 200 && res.status <= 302) {
      return res.json()
    } else {
      if (res.status === 401) {
        return new Error(
          'Error 401: Make sure you have a valid Org Secret Key and API Key'
        )
      }
      return new Error(res.message || 'There was an error making a request')
    }
  })
}
