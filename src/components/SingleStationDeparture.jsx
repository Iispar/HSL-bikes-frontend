import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import $ from 'jquery';
import bikeService from '../services/BikeService';
import SingleJourney from './SingleJourney';
import { getPageFilter } from './helpers/filterHelpers';

const SingleStationDeparture = () => {
  const [journeys, setJourneys] = useState('');
  const page = useRef(0);
  const { id } = useParams();
  /**
  * useEffect hook that retrieves the data when the app is opened.
  */
  useEffect(() => {
    bikeService.getFiltered(['limit=10', `departure_station_id=${id}`])
      .then((journeysData) => setJourneys(journeysData));
    $('#station-information__departure__container__pagination__previous-btn').prop('disabled', true);
  }, []);

  /**
   * displays the current selection of journeys
   */
  const displayJourneys = () => {
    const list = [];
    for (let i = 0; i < journeys.length; i += 1) {
      list.push(<SingleJourney
        direction="departure"
        key={journeys[i]._id}
        departureStationId={journeys[i].Departure_station_id}
        returnStationId={journeys[i].Return_station_id}
        coveredDistance={journeys[i].Covered_distance}
        duration={journeys[i].Duration}
      />);
    }
    return list;
  };

  /**
   * method for moving forwards and backwords pages of journeys.
   * @param {String} direction
   * @param {Integer} page
   * @returns set journeydata as filtered
   */
  const changePage = (direction) => {
    if (direction === 'f') page.current += 1;
    else page.current -= 1;

    if (page.current === 0) $('#station-information__departure__container__pagination__previous-btn').prop('disabled', true);
    else $('#station-information__departure__container__pagination__previous-btn').prop('disabled', false);

    const filter = getPageFilter(direction, page.current, ['limit=10', `departure_station_id=${id}`]);
    bikeService.getFiltered(filter)
      .then((filteredJourneys) => setJourneys(filteredJourneys));
  };

  return (
    <div className="station-information__departure__container">
      <div className="station-information__departure__container__display">
        {displayJourneys()}
      </div>
      <div className="station-information__departure__pagination">
        <button type="button" className="station-information__departure__pagination__btn" id="station-information__departure__container__pagination__previous-btn" onClick={() => changePage('b')}> prev </button>
        <button type="button" className="station-information__departure__pagination__btn" id="station-information__departure__container__pagination__next-btn" onClick={() => changePage('f')}> next </button>
      </div>
    </div>
  );
};

export default SingleStationDeparture;
