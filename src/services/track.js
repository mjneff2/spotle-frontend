import axios from 'axios'
const baseUrl = '/api/track'

let token = null

const setToken = (newToken) => {
  token = newToken
}

const getTrack = async () => {
  const result = await axios.post(baseUrl, {
    access_token: token
  })
  return result.data
}

export default { setToken, getTrack }