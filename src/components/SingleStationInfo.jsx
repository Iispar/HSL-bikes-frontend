/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { useParams, useNavigate } from 'react-router-dom';
import {
  setTop, getAverageDistance, getMonthName, getCountTrips,
} from './helpers/stationDataHelpers';

/**
 * Returns html for a view with one station.
 * @returns view of a single station
 */
const Station = () => {
  const [currentView, setCurrentView] = useState('stats');
  const { id } = useParams();
  const navigate = useNavigate();
  const nameFi = 'Hanasaari';
  const adressFi = 'x';
  const cityFi = 'y';
  let tripsEndingHere = null;
  let tripsStartingHere = null;
  let avgReturning = null;
  let avgDeparting = null;
  let avgReturnignKm = null;
  let avgDepartingKm = null;

  /**
   * Sets the correct information for the current displayed station.
   */
  const setStation = async () => {
    $('#station-information').attr('name', id);
    $('#station-filter-btn').prop('disabled', true);
    $('#stations__list').css('display', 'none');
    $('#stations__pagination').css('display', 'none');
    $('#stations__search').css('display', 'none');
    $('#stations__title').css('display', 'none');
    $('#journeys__title').css('display', 'none');
    $('#journeys__header').css('display', 'none');
    $('#journeys__list').css('display', 'none');
    $('#journeys__pagination').css('display', 'none');
    $('#journeys__single-station-map').css('display', 'flex');
    $('#station-information').css('display', 'flex');
    $('#station-information__selection__container__stats-btn').addClass('selected');

    if (nameFi.length > 16) $('#station-information__header__name__title').css('font-size', '30px');
    else $('#station-information__header__name__title').css('font-size', '38px');

    $('#station-information__header__name__title').text(nameFi);
    $('#station-information__header__name__location').text(`${adressFi},${cityFi}`);
    await setTop('station-information__data__top-returning__container__list', 'return', id, 'all');
    await setTop('station-information__data__top-departing__container__list', 'departure', id, 'all');
    $('.station-information__data__top-returning__container__title').text('top return: ');
    $('.station-information__data__top-departing__container__title').text('top departure:');
    $('#station-filter-btn').prop('disabled', false);

    tripsEndingHere = await getCountTrips('return', id, 'all');
    tripsStartingHere = await getCountTrips('departure', id, 'all');
    avgReturning = await getAverageDistance('return', id, 'all');
    avgDeparting = await getAverageDistance('departure', id, 'all');
    avgReturnignKm = parseFloat(avgReturning / 1000).toFixed(2);
    avgDepartingKm = parseFloat(avgDeparting / 1000).toFixed(2);
    $('#station-information__data__statistics__container__departing__all-trips').text(`trips ${tripsEndingHere}`);
    $('#station-information__data__statistics__container__returning__all-trips').text(`trips ${tripsStartingHere}`);
    $('#station-information__data__statistics__container__returning__all-avg').text(`avg: ${avgReturnignKm} km`);
    $('#station-information__data__statistics__container__departing__all-avg').text(`avg: ${avgDepartingKm} km`);
  };

  /**
   * sets the station info after the page has been loaded.
   */
  useEffect(() => {
    if (tripsEndingHere !== null) return;
    // Doing thisway because useEffect can't be async.
    setStation();
  });

  /**
   * Closes the single station view and returns the list.
   */
  const closeView = () => {
    $('#stations__view').css('display', 'flex');
    $('#stations__search').css('display', 'flex');
    $('#stations__title').css('display', 'flex');
    $('#stations__list').css('display', 'flex');
    $('#stations__pagination').css('display', 'flex');
    $('#journeys__title').css('display', 'flex');
    $('#journeys__header').css('display', 'flex');
    $('#journeys__list').css('display', 'block');
    $('#journeys__pagination').css('display', 'flex');
    $('#journeys__single-station-map').css('display', 'none');
    $('#station-information').css('display', 'none');
    $('#station-information__data__top-returning__container__list').empty();
    $('#station-information__data__top-departing__container__list').empty();
    $('#station-information__data__statistics__returning__all-avg').text('');
    $('#station-information__data__statistics__container__departing__all-avg').text('');
    navigate('/');
  };

  /**
   * Changes the month for all of the statistics
   * @param {Int} month
   */
  const changeMonth = async (month) => {
    $('button[name=station-filter-btn]').prop('disabled', true);
    const setMonth = getMonthName(month);

    $('#station-information__data__statistics__container__departing__all-trips').text('Waiting for data...');
    $('#station-information__data__statistics__returning__all-trips').text('Waiting for data...');
    $('#station-information__data__statistics__returning__all-avg').text('');
    $('#station-information__data__statistics__container__departing__all-avg').text('');
    $('td[name=top-stations-title]').text('');
    $('#station-information__data__top-returning__container__list').text('');
    $('#station-information__data__top-departing__container__list').text('');

    if (setMonth === 'all') {
      $('#station-information__data__month-filter__dropdown__button__info__current').text('all');
    } else {
      $('#station-information__data__month-filter__dropdown__button__info__current').text(setMonth);
    }

    await setTop('station-information__data__top-returning__container__list', 'return', id, month);
    await setTop('station-information__data__top-departing__container__list', 'departure', id, month);

    $('button[name=station-filter-btn]').prop('disabled', false);

    tripsEndingHere = await getCountTrips('return', id, month);
    tripsStartingHere = await getCountTrips('departure', id, month);
    avgReturning = await getAverageDistance('return', id, month);
    avgDeparting = await getAverageDistance('departure', id, month);
    avgReturnignKm = parseFloat(avgReturning / 1000).toFixed(2);
    avgDepartingKm = parseFloat(avgDeparting / 1000).toFixed(2);
    $('#station-information__data__statistics__container__departing__all-trips').text(`trips ${tripsEndingHere}`);
    $('#station-information__data__statistics__container__returning__all-trips').text(`trips ${tripsStartingHere}`);
    $('#station-information__data__statistics__container__returning__all-avg').text(`avg: ${avgReturnignKm} km`);
    $('#station-information__data__statistics__container__departing__all-avg').text(`avg: ${avgDepartingKm} km`);
  };

  /**
   * Changes the view between stats, returning trips and departing trips.
   */
  const changeView = (selection) => {
    $(`#station-information__selection__container__${currentView}-btn`).removeClass('selected');
    $(`#station-information__selection__container__${selection}-btn`).addClass('selected');
    setCurrentView(selection);
  };

  /**
   * When we click outside of the monthselector and the dropdown is visible we close it.
   */
  $(document).click((e) => {
    if (e.target.id !== 'station-information__data__month-filter__dropdown__search' && $('#station-information__data__month-filter__dropdown__content').css('display') === 'flex') {
      $('#station-information__data__month-filter__dropdown__content').removeClass('animation');
      $('#station-information__data__month-filter__dropdown').removeClass('focus');
    }
  });

  /**
   * When the search for months is clicked we open the dropdown menu.
   */
  $('.station-information__data__month-filter__dropdown__search').click(() => {
    $('#station-information__data__month-filter__dropdown__content').addClass('animation');
    $('#station-information__data__month-filter__dropdown').addClass('focus');
  });

  /**
   * When we select a month we close the dropdown.
   */
  $('#station-information__data__month-filter__dropdown__content').click(() => {
    $('#station-information__data__month-filter__dropdown__content').removeClass('animation');
    $('#station-information__data__month-filter__dropdown').removeClass('focus');
  });

  return (
    <div className="station-information" id="station-information" name="">
      <div className="station-information__header">
        <div className="station-information__header__name">
          <div className="station-information__header__name__title" id="station-information__header__name__title">
            station name
          </div>
          <div className="station-information__header__name__location" id="station-information__header__name__location">
            streetname, city
          </div>
        </div>
        <div className="station-information__header__close">
          <button className="station-information__header__close__btn" id="station-information__header__close__btn" onClick={() => closeView()} type="button"> </button>
        </div>
      </div>
      <div className="station-information__selection">
        <div className="station-information__selection__container">
          <button type="button" onClick={() => changeView('stats')} name="station-filter-btn" id="station-information__selection__container__stats-btn" className="station-information__selection__container__btn"> stats </button>
          <button type="button" onClick={() => changeView('return')} name="station-filter-btn" id="station-information__selection__container__return-btn" className="station-information__selection__container__btn"> return </button>
          <button type="button" onClick={() => changeView('departure')} name="station-filter-btn" id="station-information__selection__container__departure-btn" className="station-information__selection__container__btn"> departure </button>
        </div>
      </div>
      <div className="station-information__data">
        <div className="station-information__data__month-filter">
          <div className="station-information__data__month-filter__dropdown" id="station-information__data__month-filter__dropdown">
            <div className="station-information__data__month-filter__dropdown__search" id="station-information__data__month-filter__dropdown__search">
              <div className="station-information__data__month-filter__dropdown__search__info">
                <div className="station-information__data__month-filter__dropdown__search__info__title"> Month </div>
                <div className="station-information__data__month-filter__dropdown__search__info__current" id="station-information__data__month-filter__dropdown__button__info__current"> all </div>
              </div>
              <i className="station-information__data__month-filter__dropdown__search__logo" />
            </div>
            <div className="station-information__data__month-filter__dropdown__content" id="station-information__data__month-filter__dropdown__content">
              <button className="station-information__data__month-filter__dropdown__content__btn" onClick={() => changeMonth('all')} type="button" name="station-filter-btn"> all </button>
              <button className="station-information__data__month-filter__dropdown__content__btn" onClick={() => changeMonth(5)} type="button" name="station-filter-btn" id="station-filter-may"> may </button>
              <button className="station-information__data__month-filter__dropdown__content__btn" onClick={() => changeMonth(6)} type="button" name="station-filter-btn" id="station-filter-june"> june </button>
              <button className="station-information__data__month-filter__dropdown__content__btn" onClick={() => changeMonth(7)} type="button" name="station-filter-btn" id="station-filter-july"> july </button>
            </div>
          </div>
        </div>
        <div className="station-information__data__top-returning">
          <div className="station-information__data__top-returning__container">
            <div className="station-information__data__top-returning__container__title" id="station-information__data__top-returning__container__title" name="top-stations-title">
              waiting for data...
            </div>
            <ol id="station-information__data__top-returning__container__list" className="station-information__data__top-returning__container__list"> </ol>
          </div>
        </div>
        <div className="station-information__data__top-departing">
          <div className="station-information__data__top-departing__container">
            <div className="station-information__data__top-departing__container__title" id="station-information__data__top-departing__container__title" name="top-stations-title">
              waiting for data...
            </div>
            <ol id="station-information__data__top-departing__container__list" className="station-information__data__top-departing__container__list"> </ol>
          </div>
        </div>
        <div className="station-information__data__statistics">
          <div className="station-information__data__statistics__container">
            <div className="station-information__data__statistics__container__title" id="station-information__data__statistics__container__title"> statistics </div>
            <div className="station-information__data__statistics__container__departing">
              <p className="station-information__data__statistics__container__departing__title"> departing: </p>
              <p className="station-information__data__statistics__container__departing__all-trips" id="station-information__data__statistics__container__departing__all-trips" />
              <p className="station-information__data__statistics__container__departing__all-avg" id="station-information__data__statistics__container__departing__all-avg" />
            </div>
            <div className="station-information__data__statistics__container__returning">
              <p className="station-information__data__statistics__container__returning__title"> returning: </p>
              <p className="station-information__data__statistics__container__returning__all-trips" id="station-information__data__statistics__container__returning__all-trips" />
              <p className="station-information__data__statistics__container__returning__all-avg" id="station-information__data__statistics__container__returning__all-avg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Station;
