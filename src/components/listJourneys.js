import React from 'react'
import Journey from './OneJourney'
import propTypes from 'prop-types'

const ListJourneys = (props) => {
  const journeys = props.journeys
  if (journeys.length === 0) return <div className = "loading-containter"> Waiting for data... </div>

  const list = []
  for (const i in journeys) {
    list.push(<Journey
            key = {journeys[i]._id}
            departureStationName = {journeys[i].Departure_station_name}
            returnStationName = {journeys[i].Return_station_name}
            distance = {journeys[i].Covered_distance}
            duration = {journeys[i].Duration}
            />)
  }
  return list
}

ListJourneys.propTypes = {
  journeys: propTypes.array
}

export default ListJourneys
