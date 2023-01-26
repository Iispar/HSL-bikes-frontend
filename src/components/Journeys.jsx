import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import bikeService from '../services/BikeService';
import ListJourneys from './ListJourneys';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.css';
import { getPageFilter, newFilter } from './helpers/filterHelpers';
import { stations, stationsAndIds } from '../data/stationsData';

/**
 * method for creating the list of journeys.
 * @returns the journeys
 */
const Journeys = () => {
  const [journeys, setJourneys] = useState([]);
  const page = useRef(0);
  const [filterNow, setFilterNow] = useState(['limit=10']);
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [distanceMin, setDistanceMin] = useState('null');
  const [distanceMax, setDistanceMax] = useState('null');
  const [durationMin, setDurationMin] = useState('null');

  /**
   * UseEffect hook that retrieves the data when the app is loaded in.
   */
  useEffect(() => {
    bikeService.getAll()
      .then((journeysData) => setJourneys(journeysData));
    $('#backwardsJourney-button').prop('disabled', true);
  }, []);

  /**
   * method for changing the filter. And setting the journeydata as instructed by the filtering.
   * @param {Array} filter
   */
  const changeFilter = (addToFilter) => {
    const filter = newFilter(filterNow, addToFilter);
    setFilterNow(filter);
    bikeService.getFiltered(filter)
      .then((filteredJourneys) => {
        setJourneys(filteredJourneys);
        if (filteredJourneys.length <= 0) $('#forwardsJourney-button').prop('disabled', true);
        else $('#forwardsJourney-button').prop('disabled', false);
      });
  };

  /**
   * method for moving forwards and backwords pages of journeydata.
   * @param {String} direction
   * @param {Integer} page
   * @returns set journeydata as filtered
   */
  const changePage = (direction) => {
    if (direction === 'f') page.current += 1;
    else page.current -= 1;

    if (page.current === 0) $('#backwardsJourney-button').prop('disabled', true);
    else $('#backwardsJourney-button').prop('disabled', false);

    const filter = getPageFilter(direction, page.current, filterNow);
    bikeService.getFiltered(filter)
      .then((filteredJourneys) => setJourneys(filteredJourneys));
  };

  /**
   * Handles the submit of the form, formats the request and sends it to changeFilter().
   * We use id:s to send the request.
   */
  const handleSubmitDeparture = (event) => {
    event.preventDefault();
    $('#DepartureStationsInput').autocomplete('close');
    const id = stationsAndIds[departure];
    const filterToChange = [`Departure_station_id=${id}`];
    changeFilter(filterToChange);
    setDeparture('');
  };
  /**
   * Handles the submit of the form, formats the request and sends it to changeFilter().
   * We use id:s to send the request.
   */
  const handleSubmitReturn = (event) => {
    event.preventDefault();
    $('#ReturnStationInput').autocomplete('close');
    const id = stationsAndIds[arrival];
    const filterToChange = [`Return_station_id=${id}`];
    changeFilter(filterToChange);
    setDeparture('');
  };

  /**
   *  onChange for distance and duration slider.
   * We set the value of the slider and also check that the sliders don't overlap.
   * @param {*} event
   * @param {*} slider
   */
  const changeSliderValue = (event, slider) => {
    event.preventDefault();
    const { value } = event.target;
    const min = $('#distanceSlider-min').val();
    const max = $('#distanceSlider-max').val();
    const valuePotent = value ** 3;
    let filteredMin;
    let filteredMax;
    if (slider === 'distanceSlider-min') {
      if (min >= max - 0.2) {
        $('#distanceSlider-max').val(parseFloat($('#distanceSlider-max').val()) + 0.01);
      }
      if (min >= 0.85) {
        $('#distanceSlider-min').val(0.85);
        const filtered = Math.round(((0.85 ** 3) * 3600) * 50);
        setDistanceMin(filtered);
        return;
      }
      const filtered = Math.round((valuePotent * 3600) * 50);
      filteredMax = Math.round($('#distanceSlider-max').val() ** 3 * 3600 * 50);
      setDistanceMax(filteredMax);
      setDistanceMin(filtered);
    } else if (slider === 'distanceSlider-max') {
      if (min >= max - 0.2) {
        $('#distanceSlider-min').val(parseFloat($('#distanceSlider-min').val()) - 0.01);
      }
      if (max <= 0.15) {
        $('#distanceSlider-max').val(0.15);
        const filtered = Math.round(((0.15 ** 3) * 3600) * 50);
        setDistanceMax(filtered);
        return;
      }
      const filtered = Math.round((valuePotent * 3600) * 50);
      filteredMin = Math.round((($('#distanceSlider-min').val() ** 3) * 3600) * 50);
      setDistanceMin(filteredMin);
      setDistanceMax(filtered);
    } else if (slider === 'durationSlider-min') {
      const filtered = Math.round((valuePotent * 40000) * 60);
      $('#durationSlider-header').text(`${Math.round(filtered / 60)} -`);
      setDurationMin(filtered);
      return;
    }
    const minDisplayValue = ($('#distanceSlider-min').val() ** 3) * 3600 * 50;
    const maxDisplayValue = ($('#distanceSlider-max').val() ** 3) * 3600 * 50;
    const displayMin = parseFloat(minDisplayValue / 1000).toFixed(2);
    const displayMax = parseFloat(maxDisplayValue / 1000).toFixed(2);
    if ((parseFloat(min, 10) === 0.00) && (parseFloat(max, 10) === 1.0)) $('#distanceSlider-header').text('all');
    else if (parseFloat(max, 10) === 1.0) $('#distanceSlider-header').text(`${displayMin} -`);
    else if (parseFloat(min, 10) === 0.00) $('#distanceSlider-header').text(`- ${displayMax} `);
    else $('#distanceSlider-header').text(`${displayMin} - ${displayMax} `);
  };

  /**
   * Handler for the search button. Searches with current filters.
   */
  const searchFilters = async () => {
    let filter = [];
    if (distanceMax !== 'null') filter.push(`Covered_distance<${distanceMax}`);
    if (distanceMin !== 'null') filter.push(`Covered_distance>${distanceMin}`);
    if (durationMin !== 'null') filter.push(`Duration>${durationMin}`);
    if (departure !== '') {
      const id = stationsAndIds[departure];
      filter.push(`Departure_station_id=${id}`);
    }
    if (arrival !== '') {
      const id = stationsAndIds[arrival];
      filter.push(`Return_station_id=${id}`);
    }
    filter = newFilter(filterNow, filter);
    setFilterNow(filter);
    bikeService.getFiltered(filter)
      .then((filteredJourneys) => setJourneys(filteredJourneys));
  };
  /**
   * Listener for distanceSlider which displays the value of the slider.
   */
  $(() => {
    $('#distanceSlider-container').on({
      mouseenter: () => {
        const min = $('#distanceSlider-min').val();
        const max = $('#distanceSlider-max').val();
        const displayMin = parseFloat(distanceMin / 1000).toFixed(2);
        const displayMax = parseFloat(distanceMax / 1000).toFixed(2);
        if ((parseFloat(min, 10) === 0.00) && (parseFloat(max, 10) === 1.0)) $('#distanceSlider-header').text('all');
        else if (parseFloat(max, 10) === 1.0) $('#distanceSlider-header').text(`${displayMin} -`);
        else if (parseFloat(min, 10) === 0.00) $('#distanceSlider-header').text(`- ${displayMax} `);
        else $('#distanceSlider-header').text(`${displayMin} - ${displayMax} `);
      },
      mouseleave: () => {
        $('#distanceSlider-header').text('distance');
      },
    });
  });

  /**
   * Listener for durationSlider which displays the value of the slider.
   */
  $(() => {
    $('#durationSlider-container').on({
      mouseenter: () => {
        if (durationMin === 'null') $('#durationSlider-header').text('0 - ');
        else $('#durationSlider-header').text(`${Math.round(durationMin / 60)} -`);
      },
      mouseleave: () => {
        $('#durationSlider-header').text('duration');
      },
    });
  });

  /**
   * Using jQuery autocomplete which also sets the inputfield data into the city variable.
   * Can this be done with const(?)
   */
  $(() => {
    $('#DepartureStationsInput').autocomplete({
      source: stations,
      select: (event, ui) => {
        setDeparture(ui.item.value);
      },
    });
  });

  /**
   * Because we have two different fields we need two different useStates
   * so we need to make different autofills, for each one.
   */
  $(() => {
    $('#ReturnStationInput').autocomplete({
      source: stations,
      select: (event, ui) => {
        setArrival(ui.item.value);
      },
    });
  });

  /**
   * Resets the filters back to none and also refreshes the journey data back.
   */
  const resetFilters = () => {
    $('#forwardsJourney-button').prop('disabled', false);
    $('#backwardsStation-button').prop('disabled', true);
    $('#DepartureStationsInput').val('');
    $('#DepartureStationsInput').val('');
    setFilterNow(['limit=10']);
    bikeService.getFiltered(['limit=10'])
      .then((filteredJourneys) => setJourneys([...filteredJourneys]));
  };

  return (
    <div className="journeys-container">
      <div className="journeyFilters-container">
        <div className="search-container">
          <div className="stationSearch-container">
            <form onSubmit={handleSubmitDeparture}>
              <input type="text" id="DepartureStationsInput" placeholder="Departure station" onChange={(event) => setDeparture(event.target.value)} />
            </form>
          </div>
          <div className="stationSearch-container">
            <form onSubmit={handleSubmitReturn}>
              <input type="text" id="ReturnStationInput" placeholder="Return station" onChange={(event) => setArrival(event.target.value)} />
            </form>
          </div>
        </div>
        <div className="distanceSlider-container" id="distanceSlider-container">
          <p className="distanceSlider-header" id="distanceSlider-header"> distance </p>
          <div className="sliders-container">
            <div className="slider-track" />
            <input type="range" min="0" max="1" step="0.01" defaultValue="0" id="distanceSlider-min" onChange={(event) => changeSliderValue(event, 'distanceSlider-min')} />
            <input type="range" min="0" max="1" step="0.01" defaultValue="1" id="distanceSlider-max" onChange={(event) => changeSliderValue(event, 'distanceSlider-max')} />
          </div>
        </div>

        <div className="durationSlider-container" id="durationSlider-container">
          <p className="durationSlider-header" id="durationSlider-header"> duration </p>
          <div className="sliders-container">
            <div className="slider-track" />
            <input type="range" min="0" max="1" step="0.01" defaultValue="0" id="durationSlider-min" onChange={(event) => changeSliderValue(event, 'durationSlider-min')} />
          </div>
        </div>

        <div className="buttons-container">
          <div className="resetButton-container">
            <button id="reset-button" className="button" onClick={() => resetFilters()} type="button"> reset </button>
          </div>

          <div className="dropdown-container">
            <button className="button" type="button"> Sort </button>
            <div className="dropdown-content">
              <button id="DistanceDecreasing-button" className="sortButton" onClick={() => changeFilter(['sort=-Covered_distance'])} type="button"> Furthest </button>
              <button id="DistanceIncreasing-button" className="sortButton" onClick={() => changeFilter(['sort=+Covered_distance'])} type="button"> Shortest </button>
              <button id="DurationDecreasing-button" className="sortButton" onClick={() => changeFilter(['sort=-Duration'])} type="button"> Longest </button>
              <button id="DurationIncreasing-button" className="sortButton" onClick={() => changeFilter(['sort=+Duration'])} type="button"> Fastest </button>
              <button id="DateIncreasing-button" className="sortButton" onClick={() => changeFilter(['sort=+Departure'])} type="button"> Oldest </button>
              <button id="DateDecreasing-button" className="sortButton" onClick={() => changeFilter(['sort=-Departure'])} type="button"> Latest </button>
            </div>
          </div>
          <button className="button" type="button" id="search-button" onClick={() => searchFilters()}> search </button>
        </div>
      </div>
      <div className="listOfJourneys-container">
        <ListJourneys journeys={journeys} />
      </div>

      <div className="pagination-container">
        <button className="pagination-button" id="backwardsJourney-button" onClick={() => changePage('b', page)} type="button"> previous </button>
        <button className="pagination-button" id="forwardsJourney-button" onClick={() => changePage('f', page)} type="button"> next </button>
      </div>
    </div>
  );
};

export default Journeys;
