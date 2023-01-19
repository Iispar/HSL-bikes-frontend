import React from 'react'
import $ from 'jquery'

const Station = () => {
  const closeView = () => {
    $('#list-container').css('display', 'flex')
    $('#singleStation-container').css('display', 'none')
  }
  return (
    <div className = "stationInformation" id="stationInformation">
    <button onClick={() => closeView()}> close </button>
      <div className = "singleStationHeader" id="singleStationHeader">
        station name
      </div>
      <div className = "singleStationInfo" id="singleStationInfo">
        streetname, city
      </div>
      <div className = "singleStationData" id="singleStationData">
        <p id="singleStationCapasity"> capasity </p>
        <p id="singleStationTripsDeparture"> trips </p>
        <p id="singleStationTripsReturn"> trips </p>
      </div>
    </div>
  )
}
export default Station
