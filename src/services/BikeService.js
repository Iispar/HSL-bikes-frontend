import axios from 'axios';

const baseUrl = 'https://solita-backend.fly.dev';

/**
 * get the already filtered data of the bikes from the backend.
 * returns first ten items from the backend.
 */
const getAll = async () => {
  const request = await axios.get(`${baseUrl}/api/bikers/all`);
  return request.data;
};

/**
 * Get filtered data from the backend with the filters being in the URL
 * @param {Array} filters
 * @returns requested data.
 */
const getFiltered = async (filters) => {
  let newUrl = `${baseUrl}/api/bikers?`;
  for (let i = 0; i < filters.length; i += 1) {
    newUrl = `${newUrl}${filters[i]}&`;
  }
  const request = await axios.get(newUrl);
  return request.data;
};

/**
 * Returns amount of trips in database that fill filters.
 * @param {Array} filters
 * @returns amount of trips that fill the filter
 */
const getCount = async (direction, url) => {
  const newUrl = `${baseUrl}/api/bikers/count/${direction}/${url}`;
  const request = await axios.get(newUrl);
  return request.data[0].count;
};

/**
 * Returns the average distance of selected months, station and direction
 * @param {Array} filters
 * @returns amount of trips that fill the filter
 */
const getAverage = async (direction, stationId, month) => {
  const url = `${baseUrl}/api/bikers/average/${direction}/${stationId}/${month}`;
  const request = await axios.get(url);
  return request.data;
};

/**
 * Returns the top five stations of selected months, station and direction
 * @param {Array} filters
 * @returns amount of trips that fill the filter
 */
const getTop = async (direction, stationId, month) => {
  const url = `${baseUrl}/api/bikers/top/${direction}/${stationId}/${month}`;
  const request = await axios.get(url);
  return request.data;
};

export default {
  getAll, getFiltered, getCount, getAverage, getTop,
};
