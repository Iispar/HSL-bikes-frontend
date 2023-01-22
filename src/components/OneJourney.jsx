import React from 'react';
import propTypes from 'prop-types';

const Journey = (props) => {
  const { departureStationName } = props;
  const { returnStationName } = props;
  const { distance } = props;
  const { duration } = props;

  return (
    <div name="singleJourney" className="singleJourney-container">
      Departure station:
      {' '}
      {departureStationName}
      , Return station:
      {returnStationName}
      , Distance:
      {distance}
      , Duration:
      {duration}
    </div>
  );
};

Journey.propTypes = {
  departureStationName: propTypes.string.isRequired,
  returnStationName: propTypes.string.isRequired,
  distance: propTypes.number.isRequired,
  duration: propTypes.number.isRequired,
};

export default Journey;
