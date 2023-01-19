import bikeService from '../../services/BikeService'

//     const averageDistanceStarting = ''
//     const averageDistanceEnding = ''
//     const topReturnStations = ''
//     const topDepartureStations = ''

/**
 * Calls the count api and return all trips ending in given location
 * @param {String} stationId
 * @returns
 */
export const getCountTripsEnding = async (stationId) => {
  const filter = ['Return_station_id=' + stationId]
  const result = await bikeService.getCount(filter)
  return result
}

/**
 * Calls the count api and return all trips starting in given location
 * @param {String} stationId
 * @returns
 */
export const getCountTripsStarting = async (stationId) => {
  const filter = ['Departure_station_id=' + stationId]
  const result = await bikeService.getCount(filter)
  return result
}
