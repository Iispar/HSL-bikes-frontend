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

  const changeDirection = async (direction) => {
    $('button[name=map__menu__btn').prop('disabled', true);
    if (direction === 'return') {
      $('#map-departure-btn').removeClass('selected');
      $('#map-return-btn').addClass('selected');
    } else {
      $('#map-departure-btn').addClass('selected');
      $('#map-return-btn').removeClass('selected');
    }
    const val = $('#map__menu').data('month');
    $('#map__menu').data('dir', direction);
    for (let i = 0; i < markers.length; i += 1) {
      markers[i].remove();
    }
    const newMarkers = await setTopOnMap(map.current, direction, id, val);
    setMarkers(newMarkers);
    if (observer !== '') observer.disconnect();
    $('button[name=map__menu__btn').prop('disabled', false);
  };

  const setSingleMarker = async () => {
    const inputStation = $('#map__menu').attr('data-station');
    if (currentMarker !== '') currentMarker.remove();
    const coords = await getLngLat(inputStation);
    const stationMarker = new mapboxgl.Marker()
      .setLngLat(coords)
      .addTo(map.current);
    setCurrentMarker(stationMarker);
    if (stationObserver !== '') stationObserver.disconnect();
  };

  useEffect(() => {
    stationService.getFiltered([`Name=${nameEng}`])
      .then((stationData) => setStation(stationData));
  }, []);

  useEffect(() => {
    const elem = document.getElementById('map__menu');
    const newObserver = new MutationObserver(() => {
      const inputStation = $('#map__menu').data('station');
      if (inputStation !== '') {
        setSingleMarker();
        newObserver.disconnect();
      }
    });
    setStationObserver(newObserver);
    newObserver.observe(elem, {
      attributes: true,
      attributeFilter: ['data-station'],
    });
  }, [currentMarker]);

  useEffect(() => {
    const elem = document.getElementById('map__menu');
    const newObserver = new MutationObserver(() => {
      const dir = $('#map__menu').data('dir');
      if (dir !== '' && markers.length !== 0) {
        changeDirection(dir);
        newObserver.disconnect();
      }
    });
    setObserver(newObserver);
    newObserver.observe(elem, {
      attributes: true,
      attributeFilter: ['data-month'],
    });
  }, [markers]);

  useEffect(() => {
    const getStationData = async () => {
      try {
        $('#station-information__header__name__location').text(`${station[0].Adress_fi},${station[0].City_fi}`);
        await setLng(station[0].x);
        await setLat(station[0].y);
        map.current.flyTo({
          center: [station[0].x, station[0].y],
        });
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
    if (map.current) {
      map.current.on('load', () => {
        map.current.resize();
      });
      return;
    }

    const bounds = [
      [24.6, 59.9], // Southwest coordinates
      [25.2, 60.4], // Northeast coordinates
    ];

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

  return (
    <div className="map" id="map">
      <div id="map__menu" className="map__menu" data-month="all" data-dir="" data-station="">
        <div className="map__menu__btn-container">
          <button className="map__menu__btn-container__btn" id="map-return-btn" type="button" name="map__menu__btn" onClick={() => changeDirection('return')}> return </button>
          <button className="map__menu__btn-container__btn" id="map-departure-btn" type="button" name="map__menu__btn" onClick={() => changeDirection('departure')}> departure </button>
        </div>
      </div>
      <div id="map__container" className="map__container" />
    </div>
  );
};

export default Map;
