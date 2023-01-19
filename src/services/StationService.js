import axios from 'axios'
const baseUrl = 'https://solita-backend.fly.dev'

/**
 * get the data of the stations from the backend. Return first 10 items from the backend.
 */
const getAll = async () => {
  const request = await axios.get(`${baseUrl}/api/stations/all`)
  return request.data
}

/**
 * Get filtered data from the backend with the filters being in the URL
 * @param {Array} filters
 * @returns requested data.
 */
const getFiltered = async (filters) => {
  let newUrl = `${baseUrl}/api/stations?`
  for (const i in filters) {
    newUrl = `${newUrl}${filters[i]}&`
  }
  console.log(newUrl)
  const request = await axios.get(newUrl)
  return request.data
}

export default { getAll, getFiltered }
