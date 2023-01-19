import React, { useState, useEffect } from 'react'
import stationService from '../services/StationService'
import ListStations from './ListStations'

/**
 * method for creating the list of stations.
 * @returns the stations
 */
const Stations = () => {
  const [stations, setStations] = useState([])

  /**
   * useEffect hook that retrieves the data when the app is opened.
   */
  useEffect(() => {
    stationService.getAll()
      .then(stationData => setStations(stationData))
  }, [])

  return (
    <div className = "listOfStations-container">
      <ListStations stations = {stations}/>
    </div>
  )
}

export default Stations
