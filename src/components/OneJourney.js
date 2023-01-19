import React from 'react'
import propTypes from 'prop-types'

const Journey = (props) => {
  const departureStationName = props.departureStationName
  const returnStationName = props.returnStationName
  const distance = props.distance
  const duration = props.duration

  return (
    <div name = "singleJourney" className = "singleJourney-container">
        Departure station: {departureStationName}, Return station: {returnStationName}, Distance: {distance}, Duration: {duration}
    </div>
  )
}

Journey.propTypes = {
  departureStationName: propTypes.string,
  returnStationName: propTypes.string,
  distance: propTypes.number,
  duration: propTypes.number
}

export default Journey
