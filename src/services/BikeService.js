import axios from 'axios'
const baseUrl = 'https://solita-backend.fly.dev'

/**
 * get the already filtered data of the bikes from the backend. returns first ten items from the backend.
 */
const getAll = async () => {
  const request = await axios.get(`${baseUrl}/api/bikers/all`)
  return request.data
}

/**
 * Get filtered data from the backend with the filters being in the URL
 * @param {Array} filters
 * @returns requested data.
 */
const getFiltered = async (filters) => {
  let newUrl = `${baseUrl}/api/bikers?`
  for (const i in filters) {
    newUrl = `${newUrl}${filters[i]}&`
  }
  console.log(newUrl)
  const request = await axios.get(newUrl)
  return request.data
}

/**
 * Returns amount of trips in database that fill filters.
 * @param {Array} filters
 * @returns amount of trips that fill the filter
 */
const getCount = async (filters) => {
  let newUrl = `${baseUrl}/api/bikers/count?`
  for (const i in filters) {
    newUrl = `${newUrl}${filters[i]}&`
  }
  console.log(newUrl)
  const request = await axios.get(newUrl)
  return request.data
}

export default { getAll, getFiltered, getCount }
