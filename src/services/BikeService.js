import axios from 'axios'
const baseUrl = 'https://solita-backend.fly.dev'

/**
 * get the already filtered data of the drones from the backend.
 */
const getAll = async () => {
  const request = await axios.get(`${baseUrl}/api/bikers/all`)
  return request.data
}

export default { getAll }
