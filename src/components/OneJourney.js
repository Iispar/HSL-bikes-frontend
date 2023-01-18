import React from 'react'
import propTypes from 'prop-types'

const Journey = (props) => {
  const DepartureStationName = props.DepartureStationName
  const ReturnStationName = props.ReturnStationName
  const Distance = props.Distance
  const Duration = props.Duration

  return (
    <div className = "singleJourney-container">
        Departure station: {DepartureStationName}, Return station: {ReturnStationName}, Distance: {Distance}, Duration: {Duration}
    </div>
  )
}

Journey.propTypes = {
  DepartureStationName: propTypes.string,
  ReturnStationName: propTypes.string,
  Distance: propTypes.number,
  Duration: propTypes.number
}

export default Journey
