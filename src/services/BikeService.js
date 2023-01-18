import axios from 'axios'
const baseUrl = 'https://solita-backend.fly.dev'

/**
 * get the already filtered data of the drones from the backend.
 */
const getAll = async () => {
  const request = await axios.get(`${baseUrl}/api/bikers/all`)
  return request.data
}

const getFiltered = async (filters) => {
  let newUrl = `${baseUrl}/api/bikers?`
  for (const i in filters) {
    newUrl = `${newUrl}${filters[i]}&`
  }
  console.log(newUrl)
  const request = await axios.get(newUrl)
  return request.data
}

export default { getAll, getFiltered }
