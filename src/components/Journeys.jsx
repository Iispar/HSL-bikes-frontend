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
  const [filterNow, setFilterNow] = useState(['limit=9']);
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
    $('#backwards-journey-button').prop('disabled', true);
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
        if (filteredJourneys.length <= 0) $('#forwards-journey-button').prop('disabled', true);
        else $('#forwards-journey-button').prop('disabled', false);
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

    if (page.current === 0) $('#backwards-journey-button').prop('disabled', true);
    else $('#backwards-journey-button').prop('disabled', false);

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
    $('#journeys__header__search__departure__input').autocomplete('close');
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
    $('#journeys__header__search__return__input').autocomplete('close');
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
    const min = $('#distance-slider-min').val();
    const max = $('#distance-slider-max').val();
    const valuePotent = value ** 3;
    let filteredMin;
    let filteredMax;
    if (slider === 'distance-slider-min') {
      if (min >= max - 0.2) {
        $('#distance-slider-max').val(parseFloat($('#distance-slider-max').val()) + 0.01);
      }
      if (min >= 0.85) {
        $('#distance-slider-min').val(0.85);
        const filtered = Math.round(((0.85 ** 3) * 3600) * 50);
        setDistanceMin(filtered);
        return;
      }
      const filtered = Math.round((valuePotent * 3600) * 50);
      filteredMax = Math.round($('#distance-slider-max').val() ** 3 * 3600 * 50);
      setDistanceMax(filteredMax);
      setDistanceMin(filtered);
    } else if (slider === 'distance-slider-max') {
      if (min >= max - 0.2) {
        $('#distance-slider-min').val(parseFloat($('#distance-slider-min').val()) - 0.01);
      }
      if (max <= 0.15) {
        $('#distance-slider-max').val(0.15);
        const filtered = Math.round(((0.15 ** 3) * 3600) * 50);
        setDistanceMax(filtered);
        return;
      }
      const filtered = Math.round((valuePotent * 3600) * 50);
      filteredMin = Math.round((($('#distance-slider-min').val() ** 3) * 3600) * 50);
      setDistanceMin(filteredMin);
      setDistanceMax(filtered);
    } else if (slider === 'duration-slider-min') {
      const filtered = Math.round((valuePotent * 40000) * 60);
      $('#duration-slider-header').text(`${Math.round(filtered / 60)} -`);
      setDurationMin(filtered);
      return;
    }
    const minDisplayValue = ($('#distance-slider-min').val() ** 3) * 3600 * 50;
    const maxDisplayValue = ($('#distance-slider-max').val() ** 3) * 3600 * 50;
    const displayMin = parseFloat(minDisplayValue / 1000).toFixed(2);
    const displayMax = parseFloat(maxDisplayValue / 1000).toFixed(2);
    if ((parseFloat(min, 10) === 0.00) && (parseFloat(max, 10) === 1.0)) $('#distance-slider-header').text('all');
    else if (parseFloat(max, 10) === 1.0) $('#distance-slider-header').text(`${displayMin} -`);
    else if (parseFloat(min, 10) === 0.00) $('#distance-slider-header').text(`- ${displayMax} `);
    else $('#distance-slider-header').text(`${displayMin} - ${displayMax} `);
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
    $('#journeys__header__filters__distace-slider').on({
      mouseenter: () => {
        const min = $('#distance-slider-min').val();
        const max = $('#distance-slider-max').val();
        const displayMin = parseFloat(distanceMin / 1000).toFixed(2);
        const displayMax = parseFloat(distanceMax / 1000).toFixed(2);
        if ((parseFloat(min, 10) === 0.00) && (parseFloat(max, 10) === 1.0)) $('#distance-slider-header').text('all');
        else if (parseFloat(max, 10) === 1.0) $('#distance-slider-header').text(`${displayMin} -`);
        else if (parseFloat(min, 10) === 0.00) $('#distance-slider-header').text(`- ${displayMax} `);
        else $('#distance-slider-header').text(`${displayMin} - ${displayMax} `);
      },
      mouseleave: () => {
        $('#distance-slider-header').text('distance');
      },
    });
  });

  /**
   * Listener for durationSlider which displays the value of the slider.
   */
  $(() => {
    $('#journeys__header__filters__duration-slider').on({
      mouseenter: () => {
        if (durationMin === 'null') $('#duration-slider-header').text('0 - ');
        else $('#duration-slider-header').text(`${Math.round(durationMin / 60)} -`);
      },
      mouseleave: () => {
        $('#duration-slider-header').text('duration');
      },
    });
  });

  /**
   * Using jQuery autocomplete which also sets the inputfield data into the city variable.
   * Can this be done with const(?)
   */
  $(() => {
    $('#journeys__header__search__departure__input').autocomplete({
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
    $('#journeys__header__search__return__input').autocomplete({
      source: stations,
      select: (event, ui) => {
        setArrival(ui.item.value);
      },
    });
  });

  /**
   * Resets the filters back to none and also refreshes the journey data back. And also
   * closes the filters menu.
   */
  const resetFilters = () => {
    $('#forwards-journey-button').prop('disabled', false);
    $('#backwards-journey-button').prop('disabled', true);
    $('#journeys__header__search__departure__input').val('');
    $('#journeys__header__search__return__input').val('');
    $('.journeys__header__all').css('display', 'flex');
    $('.journeys__header__filters').css('display', 'none');
    setFilterNow(['limit=9']);
    bikeService.getFiltered(['limit=9'])
      .then((filteredJourneys) => setJourneys([...filteredJourneys]));
  };

  /**
   * Opens the menu for the filters.
   */
  const openFilters = () => {
    $('.journeys__header__all').css('display', 'none');
    $('.journeys__header__filters').css('display', 'flex');
  };

  return (
    <div className="journeys" id="journeys">
      <div className="journeys__title" id="journeys__title">
        <p className="journeys__title__text">
          Journeys
        </p>
      </div>
      <div className="journeys__header" id="journeys__header">
        <div className="journeys__header__search">
          <div className="journeys__header__search__departure">
            <i className="journeys__header__search__departure__logo" />
            <form onSubmit={handleSubmitDeparture}>
              <input id="journeys__header__search__departure__input" className="journeys__header__search__departure__input" placeholder="Departure station" onChange={(event) => setDeparture(event.target.value)} />
            </form>
          </div>
          <div className="journeys__header__search__return">
            <i className="journeys__header__search__return__logo" />
            <form onSubmit={handleSubmitReturn}>
              <input id="journeys__header__search__return__input" className="journeys__header__search__return__input" placeholder="Return station" onChange={(event) => setArrival(event.target.value)} />
            </form>
          </div>
        </div>
        <div className="journeys__header__all">
          <button className="journeys__header__all__button" id="journeys__header__all__button" type="button" onClick={() => openFilters()}> ALL </button>
          <div className="journeys__header__all__arrow-down" />
        </div>
        <div className="journeys__header__filters">
          <div className="journeys__header__filters__sliders">
            <div className="journeys__header__filters__sliders__distance-slider" id="journeys__header__filters__distace-slider">
              <p className="journeys__header__filters__sliders__distance-slider__header" id="distance-slider-header"> distance </p>
              <div className="journeys__header__filters__sliders__distance-slider__container">
                <div className="journeys__header__filters__sliders__distance-slider__track" />
                <input type="range" min="0" max="1" step="0.01" defaultValue="0" id="distance-slider-min" onChange={(event) => changeSliderValue(event, 'distance-slider-min')} />
                <input type="range" min="0" max="1" step="0.01" defaultValue="1" id="distance-slider-max" onChange={(event) => changeSliderValue(event, 'distance-slider-max')} />
              </div>
            </div>

            <div className="journeys__header__filters__sliders__duration-slider" id="journeys__header__filters__duration-slider">
              <p className="journeys__header__filters__sliders__duration-slider__header" id="duration-slider-header"> duration </p>
              <div className="journeys__header__filters__sliders__duration-slider__container">
                <div className="journeys__header__filters__sliders__duration-slider__track" />
                <input type="range" min="0" max="1" step="0.01" defaultValue="0" id="duration-slider-min" onChange={(event) => changeSliderValue(event, 'duration-slider-min')} />
              </div>
            </div>
          </div>
          <div className="journeys__header__filters__buttons">
            <button id="reset-button" className="journeys__header__filters__buttons__reset" onClick={() => resetFilters()} type="button"> </button>
            <div className="journeys__header__filters__buttons__dropdown__button" type="button"> Sort by </div>
            <div className="journeys__header__filters__buttons__dropdown">
              <div className="journeys__header__filters__buttons__dropdown__button__top-corner" />
              <div className="journeys__header__filters__buttons__dropdown__button__bottom-corner" />
              <div className="journeys__header__filters__buttons__dropdown__content">
                <button id="DistanceDecreasing-button" className="journeys__header__filters__buttons__dropdown__content_sort-btn" onClick={() => changeFilter(['sort=-Covered_distance'])} type="button"> Furthest </button>
                <button id="DistanceIncreasing-button" className="journeys__header__filters__buttons__dropdown__content_sort-btn" onClick={() => changeFilter(['sort=+Covered_distance'])} type="button"> Shortest </button>
                <button id="DurationDecreasing-button" className="journeys__header__filters__buttons__dropdown__content_sort-btn" onClick={() => changeFilter(['sort=-Duration'])} type="button"> Longest </button>
                <button id="DurationIncreasing-button" className="journeys__header__filters__buttons__dropdown__content_sort-btn" onClick={() => changeFilter(['sort=+Duration'])} type="button"> Fastest </button>
              </div>
              <div className="journeys__header__filters__buttons__dropdown__content_top-right" />
            </div>
            <button className="journeys__header__filters__buttons__search" type="button" id="search-button" onClick={() => searchFilters()}> </button>
          </div>
        </div>
      </div>
      <div className="journeys__list" id="journeys__list">
        <ListJourneys journeys={journeys} />
      </div>

      <div className="journeys__pagination" id="journeys__pagination">
        <button className="journeys__pagination__button" id="backwards-journey-button" onClick={() => changePage('b', page)} type="button"> Previous </button>
        <button className="journeys__pagination__button" id="forwards-journey-button" onClick={() => changePage('f', page)} type="button"> Next </button>
      </div>
    </div>
  );
};

export default Journeys;
