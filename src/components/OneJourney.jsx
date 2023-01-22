import React from 'react';
import propTypes from 'prop-types';

const Journey = (props) => {
  const { departureStationName } = props;
  const { returnStationName } = props;
  const { distance } = props;
  const { duration } = props;

  return (
    <div name="singleJourney" className="singleJourney-container">
      <div name="singelJourneyLocation-container">
        <p className="station-text">
          From:
          {departureStationName}
        </p>
        <p className="station-text">
          To:
          {returnStationName}
        </p>
      </div>
      <div className="singelJourneyData-container">
        <p className="data-text">
          {distance}
          M
        </p>
        <p className="data-text">
          {duration}
          MIN
        </p>
      </div>
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
