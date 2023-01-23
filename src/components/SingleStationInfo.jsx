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
    $('#topStationsList').empty();
    $('#right-container').css('border', '2px solid');
  };

  /**
   * Changes the month for all of the statistics
   * @param {Int} month
   */
  const changeMonth = async (month) => {
    $('.stationFilter-button').prop('disabled', true);
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
    $('.stationFilter-button').prop('disabled', false);
    if (currentDirection === 'return') $('#topReturn-button').prop('disabled', true);
    else $('#topDeparture-button').prop('disabled', true);
    const avgReturning = await getAverageDistance('return', id, currentMonth);
    const avgDeparting = await getAverageDistance('departure', id, currentMonth);
    const avgReturnignKm = parseFloat(avgReturning / 1000).toFixed(2);
    const avgDepartingKm = parseFloat(avgDeparting / 1000).toFixed(2);

    $('#singleStationAvgReturning').text(`avg distance returning: ${avgReturnignKm} km`);
    $('#singleStationAvgDeparting').text(`avg distance departing: ${avgDepartingKm} km`);
  };

  /**
   * Changes the top list from return to departure or vice versa.
   * @param {string} direction
   */
  const changeDirection = async (direction) => {
    $('.stationFilter-button').prop('disabled', true);
    const setMonth = getMonthName(currentMonth);
    setCurrentDirection(direction);
    const id = $('#stationInformation').attr('name');
    $('#waitForTopStations').css('display', 'flex');
    $('#waitForTopStations').text('loading...');
    $('#topStationsList').text('');
    await getTop(direction, id, currentMonth);
    if (setMonth === 'all') $('#waitForTopStations').text(`top ${direction} stations all time`);
    else $('#waitForTopStations').text(`top ${direction} stations in ${setMonth}`);
    $('.stationFilter-button').prop('disabled', false);
    if (direction === 'return') $('#topReturn-button').prop('disabled', true);
    else $('#topDeparture-button').prop('disabled', true);
  };

  return (
    <div className="stationInformation-container" id="stationInformation" name="">
      <div className="singleStationHeader-container">
        <div className="close-button">
          <button onClick={() => closeView()} type="button"> close </button>
        </div>
        <div className="singleStationTitle-container" id="singleStationHeader">
          station name
        </div>
        <div className="singleStationInfo-container" id="singleStationInfo">
          streetname, city
        </div>
      </div>
      <div className="singleStationJourneyData-container">
        <div className="topForStation-container">
          <div className="topForStationFilters-container">
            <div className="dropdown-container">
              <button className="dropdown-button" type="button"> Month </button>
              <div className="dropdown-content">
                <button onClick={() => changeMonth('all')} type="button" className="stationFilter-button"> all </button>
                <button onClick={() => changeMonth(5)} type="button" className="stationFilter-button"> may </button>
                <button onClick={() => changeMonth(6)} type="button" className="stationFilter-button"> june </button>
                <button onClick={() => changeMonth(7)} type="button" className="stationFilter-button"> july </button>
              </div>
            </div>
            <div className="returnDepartureFilter-container">
              <button type="button" onClick={() => changeDirection('return')} className="stationFilter-button" id="topReturn-button"> return </button>
              <button type="button" onClick={() => changeDirection('departure')} className="stationFilter-button" id="topDeparture-button"> departure </button>
            </div>
          </div>
          <h2 id="waitForTopStations">
            Waiting for top stations...
          </h2>
          <ol id="topStationsList" className="topStationsList"> </ol>
        </div>
        <div className="statisticsForStation-container">
          <div className="stationData-container">
            <h2 id="currentMonthStatistics"> all time </h2>
            <p id="singleStationTripsDeparture"> trips </p>
            <p id="singleStationTripsReturn"> trips </p>
            <p id="singleStationAvgReturning"> avgLR </p>
            <p id="singleStationAvgDeparting"> avgLD </p>
          </div>
          <div className="capasity-container">
            <p id="singleStationCapasity"> capasity </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Station;
