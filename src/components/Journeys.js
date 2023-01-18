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

  return (
    <div className = "journeys-container">
        <div className = "filters-container">
        </div>
        <div className = "listOfJourneys-container">
        <ListJourneys journeys = {journeys} />
        </div>
    </div>
  )
}

export default Journeys
