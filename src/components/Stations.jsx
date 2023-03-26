import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
import stationService from '../services/StationService';
import ListStations from './ListStations';
import { stations, stationsAndIds } from '../data/stationsData';
import { getPageFilter } from './helpers/filterHelpers';

/*
 * method for creating the list of stations.
 * @returns the stations
 */
const Stations = () => {
  const [stationsDisplay, setStationsDisplay] = useState([]);
  const [name, setName] = useState('');
  const [filterNow, setFilterNow] = useState(['limit=8', 'sort=+ID']);
  const page = useRef(0);
  const navigate = useNavigate();

  /**
   * useEffect hook that retrieves the data when the app is opened.
   */
  useEffect(() => {
    stationService.getAll()
      .then((stationData) => setStationsDisplay(stationData));
    $('#backwardsStation-button').prop('disabled', true);
  }, []);

  /**
   * Handles the submit of the form. Navigates to the stations page if it exists.
   * @param {} event
   */
  const handleSubmit = (event) => {
    event.preventDefault();
    const id = stationsAndIds[name];
    if (id === undefined) {
      setStationsDisplay([]);
      return;
    }
    setName('');
    navigate(`/${id}`);
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
    // gets new filter
    const filter = getPageFilter(direction, page.current, filterNow);
    // gets new data and sets it.
    stationService.getFiltered(filter)
      .then((filteredJourneys) => setStationsDisplay(filteredJourneys));
  };

  /**
   * Resets the current sorts
   */
  const resetFilters = () => {
    $('#backwardsStation-button').prop('disabled', true);
    $('#forwardsStation-button').prop('disabled', false);
    $('#stations__search__reset-btn').css('display', 'none');
    $('#stations__search__input').val('');
    setFilterNow(['limit=8', 'sort=+ID']);
    setName('');
    stationService.getFiltered(['limit=8', 'sort=+ID'])
      .then((filteredJourneys) => setStationsDisplay([...filteredJourneys]));
  };

  /**
   * sets the name as the new one and also displays the reset button for the station search.
   */
  const changeName = (val) => {
    setName(val);
    if (val !== '') {
      $('#stations__search__reset-btn').css('display', 'block');
    } else {
      $('#stations__search__reset-btn').css('display', 'none');
    }
  };

  /**
   * Using jQuery autocomplete which also sets the inputfield data into the city variable.
   *
   */
  $(() => {
    $('#stations__search__input').autocomplete({
      source: stations,
      select: (event, ui) => {
        setName(ui.item.value);
      },
    });
  });

  return (
    <div className="stations" id="stations">
      <div className="stations__title" id="stations__title">
        <h1 className="stations__title__text">
          STATIONS
        </h1>
      </div>
      <div className="stations__search" id="stations__search">
        <div className="stations__search__field">
          <i className="stations__search__field__logo" />
          <form onSubmit={handleSubmit}>
            <input className="stations__search__field__input" name="stations__search__input" id="stations__search__input" placeholder="Station name" onChange={(event) => changeName(event.target.value)} />
          </form>
          <button className="stations__search__field__reset-btn" id="stations__search__reset-btn" type="button" onClick={() => resetFilters()}> </button>
        </div>
      </div>
      <div className="stations__list" id="stations__list">
        <ListStations stations={stationsDisplay} />
      </div>
      <div className="stations__pagination" id="stations__pagination">
        <button className="stations__pagination__button" id="backwardsStation-button" onClick={() => changePage('b', page)} type="button"> Previous </button>
        <button className="stations__pagination__button" id="forwardsStation-button" onClick={() => changePage('f', page)} type="button"> Next </button>
      </div>
    </div>
  );
};

export default Stations;
