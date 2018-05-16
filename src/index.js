import { Client, RestClient, GraphqlClient } from './client'

function createClient(config) {
  config = {
    type: 'graphql',
    ...(config || {})
  }

  const apiKey =
    config.apiKey ||
    config.ApiKey ||
    config.Authorization ||
    config.authorization ||
    process.env.TIPE_API_KEY

  const orgKey =
    config.orgKey ||
    config.orgId ||
    config.OrgKey ||
    config.tipeId ||
    config.TipeId ||
    process.env.TIPE_ORG_KEY

  if (apiKey) {
    config.apiKey = apiKey
  }
  if (orgKey) {
    config.orgKey = orgKey
  }

  let client = new Client()
  if (config.type === 'rest') {
    client = new RestClient()
  } else if (config.type === 'graphql') {
    client = new GraphqlClient()
  }
  return client
}

module.exports = {
  createClient
}
