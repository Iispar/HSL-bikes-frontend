/* eslint-disable no-unused-vars */
import React from 'react';
import propTypes from 'prop-types';
import $ from 'jquery';
import { getKeyByValue } from './helpers/stationDataHelpers';
import { stationsAndIds } from '../data/stationsData';

/**
 * Creates a html object of a journey for single journey for single station.
 * @param {} props
 * @returns singular journey object
 */
const SingleJourney = (props) => {
  const { departureStationId } = props;
  const { returnStationId } = props;
  const { coveredDistance } = props;
  const { duration } = props;
  const distanceInKm = parseFloat(coveredDistance / 1000).toFixed(2);
  const durationInMin = Math.floor(duration / 60);
  let { direction } = props;
  if (direction === 'return') direction = 'FROM';
  else direction = 'TO';
  const departureStationName = getKeyByValue(stationsAndIds, departureStationId);

  /**
   * Sets the station for the map. Moves the data into the maps div-data attr.
   */
  const setMap = () => {
    $('#map__menu').attr('data-station', departureStationName);
  };

  return (
    <div className="station-single-journey" id="station-single-journey" onClick={() => setMap()} onKeyDown={() => setMap()} role="button" tabIndex={0}>
      <div className="station-single-journey__departure">
        {direction}
        &#160;
        {departureStationName}
      </div>
      <div className="station-single-journey__data">
        <div className="station-single-journey__data__distance">
          {distanceInKm}
          KM
        </div>
        <div className="station-single-journey__data__duration">
          {durationInMin}
          MIN
        </div>
      </div>
    </div>
  );
};

SingleJourney.propTypes = {
  departureStationId: propTypes.string,
  returnStationId: propTypes.string,
  coveredDistance: propTypes.number,
  duration: propTypes.number,
  direction: propTypes.string,
};

SingleJourney.defaultProps = {
  departureStationId: null,
  returnStationId: null,
  coveredDistance: null,
  duration: null,
  direction: null,
};

export default SingleJourney;
