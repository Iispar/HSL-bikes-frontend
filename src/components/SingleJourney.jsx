/* eslint-disable no-unused-vars */
import React from 'react';
import propTypes from 'prop-types';

/**
 * Creates a html object of a journey for single station.
 * @param {} props
 * @returns singular journey object
 */
const SingleJourney = (props) => {
  const { departureStationName } = props;
  const { returnStationName } = props;
  const { coveredDistance } = props;
  const { duration } = props;
  const distanceInKm = parseFloat(coveredDistance / 1000).toFixed(2);
  const durationInMin = Math.floor(duration / 60);
  let { direction } = props;
  if (direction === 'return') direction = 'FROM';
  else direction = 'TO';

  return (
    <div className="station-single-journey">
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
  departureStationName: propTypes.string,
  returnStationName: propTypes.string,
  coveredDistance: propTypes.number,
  duration: propTypes.number,
  direction: propTypes.string,
};

SingleJourney.defaultProps = {
  departureStationName: null,
  returnStationName: null,
  coveredDistance: null,
  duration: null,
  direction: null,
};

export default SingleJourney;
