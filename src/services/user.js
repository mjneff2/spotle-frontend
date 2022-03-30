import axios from 'axios'
const baseUrl = '/api/user'

let token = null

const setToken = (newToken) => {
  token = newToken
}

const getUser = async () => {
  const result = await axios.post(baseUrl, {
    access_token: token
  })
  return result.data
}

export default { setToken, getUser }