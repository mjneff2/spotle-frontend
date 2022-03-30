import axios from 'axios'
const baseUrl = '/api/search'

let token = null

const setToken = (newToken) => {
  token = newToken
}

const getResults = async (query) => {
  const result = await axios.post(baseUrl, {
    query,
    access_token: token
  })
  return result.data
}

export default { setToken, getResults }