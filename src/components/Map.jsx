/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React, { useRef, useEffect, useState } from 'react';
import $ from 'jquery';
import { useParams } from 'react-router-dom';
import stationService from '../services/StationService';
import { stationsAndIds } from '../data/stationsData';
import { getKeyByValue, setTopOnMap, getLngLat } from './helpers/stationDataHelpers';
// eslint-disable-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import mapboxgl from '!mapbox-gl';

const Map = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

  const map = useRef(null);
  const [lng, setLng] = useState(24.9000000000);
  const [lat, setLat] = useState(60.2000000000);
  const [zoom] = useState(18);
  const [station, setStation] = useState('');
  const { id } = useParams();
  const nameEng = getKeyByValue(stationsAndIds, id);
  const [markers, setMarkers] = useState([]);
  const [observer, setObserver] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [currentMarker, setCurrentMarker] = useState('');
  const [stationObserver, setStationObserver] = useState('');

  /**
   * Changes the direction of the shown station markers. First deletes all the markers from the map
   * and then creates new markers as selected for the direction.
   * @param {String} direction
   */
  const changeDirection = async (direction) => {
    // visuals.
    $('button[name=map__menu__btn').prop('disabled', true);
    if (direction === 'return') {
      $('#map-departure-btn').removeClass('selected');
      $('#map-return-btn').addClass('selected');
    } else {
      $('#map-departure-btn').addClass('selected');
      $('#map-return-btn').removeClass('selected');
    }
    const val = $('#map__menu').data('month');
    // removes all markers
    if (currentMarker !== '') currentMarker.remove();
    $('#map__menu').data('dir', direction);
    for (let i = 0; i < markers.length; i += 1) {
      markers[i].remove();
    }
    // new markers
    const newMarkers = await setTopOnMap(map.current, direction, id, val);
    setMarkers(newMarkers);
    if (observer !== '') observer.disconnect();
    $('button[name=map__menu__btn').prop('disabled', false);
  };

  /**
   * Sets a new single station marker on the map. This is called when clicked on a returning
   * or departing trip. First deletes previous marker if there is and then creates new.
   */
  const setSingleMarker = async () => {
    const inputStation = $('#map__menu').attr('data-station');
    if (currentMarker !== '') currentMarker.remove();
    // gets langitude and latitude of new marker for station.
    const coords = await getLngLat(inputStation);
    const stationMarker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(map.current);
    await setCurrentMarker(stationMarker);
    if (stationObserver !== '') stationObserver.disconnect();
  };

  /**
   * UseEffect to get current data for stations.
   */
  useEffect(() => {
    stationService.getFiltered([`Name=${nameEng}`])
      .then((stationData) => setStation(stationData));
  }, []);

  /**
   * UseEffect for single journey marker.
   * I use a MutationObserver to observe changes to the data-station attribute in map__menu div.
   * This change triggers a function that gets the data from the div and if it is something
   * other than null we set a new marker for it and then disconnect the observer that made the call.
   * And because the useEffect calls when currentMarker changes and it changes when we create a new
   * marker for a journey we call this again and get a new observer for data-station.
   * This is done because the call that the MutationObserver gets is the data it has at the moment
   * of the creation, so basically to get the correct marker to delete we need to create a new
   * observer every time we change the value. And we disconnect the old observers to not have
   * useless observers in the background.
   */
  useEffect(() => {
    const elem = document.getElementById('map__menu');
    const newObserver = new MutationObserver(() => {
      const inputStation = $('#map__menu').data('station');
      // if a station selected set it on map.
      if (inputStation !== '') {
        setSingleMarker();
        newObserver.disconnect();
      }
    });
    setStationObserver(newObserver);
    // what to observe and start observing
    newObserver.observe(elem, {
      attributes: true,
      attributeFilter: ['data-station'],
    });
  }, [currentMarker]);

  /**
   * UseEffect for the markers.
   * This works the same way as the useEffect for current markers, but now we look for
   * changes in map__menu divs attribute data-month. And this data is the month that is
   * selected. We use this value to call the changeDirection that changes the markers.
   * And then we disconnect the observer again, because of the same reasons as in currentMarkers
   * useEffect. Here it is necessary to get the correct markers value.
   */
  useEffect(() => {
    const elem = document.getElementById('map__menu');
    const newObserver = new MutationObserver(() => {
      const dir = $('#map__menu').data('dir');
      // if direction is changed and there is markers on the screen already.
      if (dir !== '' && markers.length !== 0) {
        changeDirection(dir);
        newObserver.disconnect();
      }
    });
    setObserver(newObserver);
    // what to observe and start observing
    newObserver.observe(elem, {
      attributes: true,
      attributeFilter: ['data-month'],
    });
  }, [markers]);

  /**
   * UseEffect for the station.
   * When the app is loaded it gets a new station information. After we get this data we can set
   * the location of the map into the correct position. This is done with the useEffect, because
   * we don't have the data at the render of the page. This also sets the station address and city
   * into the left side of the screen.
   */
  useEffect(() => {
    const getStationData = async () => {
      try {
        // sets adress and city
        $('#station-information__header__name__location').text(`${station[0].Adress_fi},${station[0].City_fi}`);
        await setLng(station[0].x);
        await setLat(station[0].y);
        // map goes into correct position.
        map.current.flyTo({
          center: [station[0].x, station[0].y],
        });
        // station marker.
        // eslint-disable-next-line no-unused-vars
        const stationMarker = new mapboxgl.Marker()
          .setLngLat([station[0].x, station[0].y])
          .addTo(map.current);
      } catch {
        console.log('error with the name in the database, please fix');
      }
    };

    if (station !== '') {
      getStationData();
    }
    // when the map is loaded for the first time resize it. This is because of mapbox/leaflet
    // doesn't fit the map into the div fully with css so we resize it into the div.
    if (map.current) {
      map.current.on('load', () => {
        map.current.resize();
      });
      return;
    }

    const bounds = [
      [24.6, 59.9], // Southwest coordinates for map
      [25.2, 60.4], // Northeast coordinates for map
    ];

    // the map itself.
    map.current = new mapboxgl.Map({
      container: 'map__container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom,
      maxZoom: 20,
      minZoom: 10,
      maxBounds: bounds,
    });
  }, [station]);

  /**
   * clears all markers from the map.
   */
  const clearMap = () => {
    $('#map-departure-btn').removeClass('selected');
    $('#map-return-btn').removeClass('selected');
    if (currentMarker !== '') currentMarker.remove();
    for (let i = 0; i < markers.length; i += 1) {
      markers[i].remove();
    }
  };

  return (
    <div className="map" id="map">
      <div id="map__menu" className="map__menu" data-month="all" data-dir="" data-station="">
        <div className="map__menu__btn-container" id="map__menu__btn-container">
          <button className="map__menu__btn-container__btn" id="map-return-btn" type="button" name="map__menu__btn" onClick={() => changeDirection('return')}> return </button>
          <button className="map__menu__btn-container__btn" id="map-departure-btn" type="button" name="map__menu__btn" onClick={() => changeDirection('departure')}> departure </button>
        </div>
        <button className="map__menu__btn-container__clear-btn" id="map-clear-btn" type="button" name="map__menu__btn" onClick={() => clearMap()}> </button>
      </div>
      <div id="map__container" className="map__container" />
    </div>
  );
};

export default Map;
