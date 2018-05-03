const fetch = require('node-fetch');

var API_KEY = process.env.TIPE_API_KEY
var ORG_KEY = process.env.TIPE_ORG_KEY

function tipeFetch (type, id) {
  return fetch('https://api.tipe.io/api/v1/' + type + '/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': API_KEY,
      'Tipe-Id': ORG_KEY,
    }
  })
  .then(function (res) {
    if (res.status >= 200 && res.status <= 302) {
      return res.json()
    } else {
      if (res.status === 401) {
        return new Error('Error 401: Make sure you have a valid Org Secret Key and API Key')
      }
      return new Error(res.message || 'There was an error making a request')
    }
  })
}

function createClient (config) {
  const apiKey = config.apiKey || config.ApiKey || config.Authorization || config.authorization
  if (apiKey) {
    API_KEY = apiKey
  }
  const orgKey = config.orgKey || config.orgId || config.OrgKey
  if (orgKey) {
    ORG_KEY = orgKey
  }
  return {
    getFolder(id) {
      return tipeFetch('folder', id)
    },
    getDocument(id) {
      return tipeFetch('document', id)
    }
  }
}


module.exports = {
  createClient
}
