import bikeService from '../services/BikeService'

//     const averageDistanceStarting = ''
//     const averageDistanceEnding = ''
//     const topReturnStations = ''
//     const topDepartureStations = ''

export const getCountTripsEnding = async (stationId) => {
  const filter = ['Return_station_id=' + stationId]
  const result = await bikeService.getCount(filter)
  return result
}

export const getCountTripsStarting = async (stationId) => {
  const filter = ['Departure_station_id=' + stationId]
  const result = await bikeService.getCount(filter)
  return result
}
