import React, { useState, useEffect } from 'react'
import bikeService from '../services/BikeService'
import Journey from './OneJourney'

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

  const printJourneys = () => {
    if (journeys.length === 0) return <div className = "loading-containter"> Waiting for data... </div>

    const list = []
    for (const i in journeys) {
      console.log(journeys[i])
      list.push(<Journey
        DepartureStationName = {journeys[i].Departure_station_name}
        ReturnStationName = {journeys[i].Return_station_name}
        Distance = {journeys[i].Covered_distance}
        Duration = {journeys[i].Duration}
        />)
    }
    return list
  }

  return (
    <div>
      {printJourneys()}
    </div>
  )
}

export default Journeys
