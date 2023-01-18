import React, { useState, useEffect } from 'react'
import bikeService from '../services/BikeService'
import ListJourneys from './listJourneys'

/**
 * method for creating the list of journeys.
 * @returns the journeys
 */
const Journeys = () => {
  const [journeys, setJourneys] = useState([])

  useEffect(() => {
    bikeService.getAll()
      .then(journeysData => setJourneys(journeysData))
  }, [])

  const changeFilter = () => {
    bikeService.getFiltered(['Departure_station_name=Viiskulma', 'limit=10'])
      .then(filteredJourneys => setJourneys(filteredJourneys))
  }

  return (
    <div className = "journeys-container">
        <div className = "filters-container">
            <button onClick={() => changeFilter()}> Espoo </button>
        </div>
        <div className = "listOfJourneys-container">
        <ListJourneys journeys = {journeys} />
        </div>
    </div>
  )
}

export default Journeys
