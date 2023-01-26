import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import stationService from '../services/StationService';
import ListStations from './ListStations';
import { stations } from '../data/stationsData';
import { newFilter, getPageFilter } from './helpers/filterHelpers';
import SingleStationInfo from './SingleStationInfo';

/**
 * method for creating the list of stations.
 * @returns the stations
 */
const Stations = () => {
  const [stationsDisplay, setStationsDisplay] = useState([]);
  const [name, setName] = useState('');
  const [filterNow, setFilterNow] = useState(['limit=10', 'sort=+ID']);
  const page = useRef(0);

  /**
   * useEffect hook that retrieves the data when the app is opened.
   */
  useEffect(() => {
    stationService.getAll()
      .then((stationData) => setStationsDisplay(stationData));
    $('#backwardsStation-button').prop('disabled', true);
  }, []);

  /**
   * method for changing the filter. And setting the journeydata as instructed by the filtering.
   * @param {Array} filter
   */
  const changeFilter = (addToFilter) => {
    const filter = newFilter(filterNow, addToFilter);
    setFilterNow(filter);
    stationService.getFiltered(filter)
      .then((filteredJourneys) => {
        setStationsDisplay(filteredJourneys);
      });
  };

  /**
   * Handles the submit of the form. Same as in bikes.
   * @param {} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    $('#backwardsStation-button').prop('disabled', true);
    $('#forwardsStation-button').prop('disabled', true);
    $('#StationInput').autocomplete('close');
    const filterToChange = [`Name_fi=${name}`];
    changeFilter(filterToChange);
    setName('');
  };

  /**
   * Changes the page, same as in journeys,
   * @param {String} direction
   * @param {Int} page
   */
  const changePage = (direction) => {
    if (direction === 'f') page.current += 1;
    else page.current -= 1;

    if (page.current === 0) $('#backwardsStation-button').prop('disabled', true);
    else $('#backwardsStation-button').prop('disabled', false);

    const filter = getPageFilter(direction, page.current, filterNow);
    stationService.getFiltered(filter)
      .then((filteredJourneys) => setStationsDisplay(filteredJourneys));
  };

  /**
   * Resets the current sorts
   */
  const resetFilters = () => {
    $('#backwardsStation-button').prop('disabled', true);
    $('#forwardsStation-button').prop('disabled', false);
    $('#stationInput').val('');
    setFilterNow(['limit=10', 'sort=+ID']);
    setName('');
    stationService.getFiltered(['limit=10', 'sort=+ID'])
      .then((filteredJourneys) => setStationsDisplay([...filteredJourneys]));
  };

  /**
   * Using jQuery autocomplete which also sets the inputfield data into the city variable.
   * Can this be done with const(?)
   */
  $(() => {
    $('#StationInput').autocomplete({
      source: stations,
      select: (event, ui) => {
        setName(ui.item.value);
      },
    });
  });
  return (
    <div className="station-container" id="station-container">
      <div className="list-container" id="list-container">
        <div className="stationFilter-container">
          <div className="stationSearch-container">
            <form onSubmit={handleSubmit}>
              <input className="stationInput" name="stationInput" id="StationInput" placeholder="Station name" onChange={(event) => setName(event.target.value)} />
            </form>
          </div>
          <button className="reset-button" type="button" onClick={() => resetFilters()}> reset </button>
        </div>
        <div className="listOfStations-container">
          <ListStations stations={stationsDisplay} />
        </div>
        <div className="pagination-container">
          <button className="pagination-button" id="backwardsStation-button" onClick={() => changePage('b', page)} type="button"> previous </button>
          <button className="pagination-button" id="forwardsStation-button" onClick={() => changePage('f', page)} type="button"> next </button>
        </div>
      </div>
      <div className="allStations-container" id="singleStation-container">
        <SingleStationInfo />
      </div>
    </div>
  );
};

export default Stations;
