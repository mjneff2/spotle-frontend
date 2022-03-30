import axios from 'axios'
const baseUrl = '/api/login'

const login = async (pageUrl) => {
  const response = await axios.post(baseUrl, { pageUrl })
  return response.data
}

export default { login }