import React from 'react'

const Station = () => {
  return (
    <div className = "stationInformation" id="stationInformation">
      <div className = "singleStationHeader" id="singleStationHeader">
        station name
      </div>
      <div className = "singleStationInfo" id="singleStationInfo">
        streetname, city
      </div>
      <div className = "singleStationData" id="singleStationData">
        <p id="singleStationCapasity"> capasity </p>
        <p id="singleStationTrips"> trips </p>
      </div>
    </div>
  )
}
export default Station
