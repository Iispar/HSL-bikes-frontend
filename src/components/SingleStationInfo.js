import React from 'react'
import $ from 'jquery'
import { getTop, getAverageDistance } from './helpers/stationDataHelpers'

const Station = () => {
  /**
   * Closes the single station view and returns the list.
   */
  const closeView = () => {
    $('#list-container').css('display', 'flex')
    $('#singleStation-container').css('display', 'none')
  }

  const changeMonth = async (month) => {
    const id = $('#stationInformation').attr('name')

    $('#singleStationTopReturning').text('Loading...')
    $('#singleStationTopDeparting').text('Loading...')
    $('#singleStationAvgReturning').text('Loading...')
    $('#singleStationAvgDeparting').text('Loading...')

    const topReturning = await getTop('return', id, month)
    const topDeparting = await getTop('departure', id, month)
    const avgReturning = await getAverageDistance('return', id, month)
    const avgDeparting = await getAverageDistance('departure', id, month)

    $('#singleStationTopReturning').text('top returning: ' + topReturning)
    $('#singleStationTopDeparting').text('top departing: ' + topDeparting)
    $('#singleStationAvgReturning').text('avg distance returning: ' + avgReturning)
    $('#singleStationAvgDeparting').text('avg distance departing: ' + avgDeparting)
  }

  return (
    <div className = "stationInformation" id="stationInformation" name="">
      <button onClick={() => closeView()}> close </button>
      <div className = "dropdown-container">
      <button className = "dropdown-button"> Month </button>
      <div className = "dropdown-content">
      <button onClick={() => changeMonth('all')}> all </button>
        <button onClick={() => changeMonth(5)}> may </button>
        <button onClick={() => changeMonth(6)}> june </button>
        <button onClick={() => changeMonth(7)}> july </button>
      </div>
  </div>
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
        <p id="singleStationTopReturning"> topR </p>
        <p id="singleStationTopDeparting"> topD </p>
        <p id="singleStationAvgReturning"> avgLR </p>
        <p id="singleStationAvgDeparting"> avgLD </p>
      </div>
    </div>
  )
}
export default Station
