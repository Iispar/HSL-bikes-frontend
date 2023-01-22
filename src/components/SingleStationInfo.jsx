import React, { useState } from 'react';
import $ from 'jquery';
import { getTop, getAverageDistance, getMonthName } from './helpers/stationDataHelpers';

const Station = () => {
  const [currentMonth, setCurrentMonth] = useState('all');
  const [currentDirection, setCurrentDirection] = useState('');
  /**
   * Closes the single station view and returns the list.
   */
  const closeView = () => {
    $('#list-container').css('display', 'flex');
    $('#singleStation-container').css('display', 'none');
  };

  /**
   * Changes the month for all of the statistics
   * @param {Int} month
   */
  const changeMonth = async (month) => {
    const setMonth = getMonthName(month);
    setCurrentMonth(month);
    const id = $('#stationInformation').attr('name');

    $('#waitForTopStations').css('display', 'flex');
    $('#waitForTopStations').text('loading...');
    $('#topStationsList').text('');

    if (setMonth === 'all') {
      $('#waitForTopStations').text(`top ${currentDirection} stations all time`);
      $('#currentMonthStatistics').text('all time');
    } else {
      $('#waitForTopStations').text(`top ${currentDirection} stations in ${setMonth}`);
      $('#currentMonthStatistics').text(`in ${setMonth}`);
    }

    await getTop(currentDirection, id, currentMonth);
    const avgReturning = await getAverageDistance('return', id, currentMonth);
    const avgDeparting = await getAverageDistance('departure', id, currentMonth);

    $('#singleStationAvgReturning').text(`avg distance returning: ${avgReturning}`);
    $('#singleStationAvgDeparting').text(`avg distance departing: ${avgDeparting}`);
  };

  /**
   * Changes the top list from return to departure or vice versa.
   * @param {string} direction
   */
  const changeDirection = async (direction) => {
    const setMonth = getMonthName(currentMonth);
    setCurrentDirection(direction);
    const id = $('#stationInformation').attr('name');
    $('#waitForTopStations').css('display', 'flex');
    $('#waitForTopStations').text('loading...');
    $('#topStationsList').text('');

    await getTop(direction, id, currentMonth);
    if (setMonth === 'all') $('#waitForTopStations').text(`top ${direction} stations all time`);
    else $('#waitForTopStations').text(`top ${direction} stations in ${setMonth}`);
  };

  return (
    <div className="stationInformation-container" id="stationInformation" name="">
      <button onClick={() => closeView()} type="button"> close </button>
      <div className="dropdown-container">
        <button className="dropdown-button" type="button"> Month </button>
        <div className="dropdown-content">
          <button onClick={() => changeMonth('all')} type="button"> all </button>
          <button onClick={() => changeMonth(5)} type="button"> may </button>
          <button onClick={() => changeMonth(6)} type="button"> june </button>
          <button onClick={() => changeMonth(7)} type="button"> july </button>
        </div>
      </div>
      <div className="singleStationHeader-container">
        <div className="singleStationTitle-container" id="singleStationHeader">
          station name
        </div>
        <div className="singleStationInfo-container" id="singleStationInfo">
          streetname, city
        </div>
      </div>
      <div className="singleStationData-container">
        <div className="topForStation-container">
          <button className="topStationsRD-button" type="button" onClick={() => changeDirection('return')}> return </button>
          <button className="topStationsRD-button" type="button" onClick={() => changeDirection('departure')}> departure </button>
          <p id="waitForTopStations">
            Waiting for top stations...
          </p>
          <ul id="topStationsList" className="topStationsList"> </ul>
        </div>
        <div className="statisticsForStation-container">
          <p id="currentMonthStatistics"> all time </p>
          <p id="singleStationTripsDeparture"> trips </p>
          <p id="singleStationTripsReturn"> trips </p>
          <p id="singleStationAvgReturning"> avgLR </p>
          <p id="singleStationAvgDeparting"> avgLD </p>
          <p id="singleStationCapasity"> capasity </p>
        </div>
      </div>
    </div>
  );
};
export default Station;
