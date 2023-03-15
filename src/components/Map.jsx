import React, { useRef, useEffect, useState } from 'react';
import $ from 'jquery';
import { useParams } from 'react-router-dom';
import stationService from '../services/StationService';
import { stationsAndIds } from '../data/stationsData';
import { getKeyByValue } from './helpers/stationDataHelpers';
// eslint-disable-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import mapboxgl from '!mapbox-gl';

const Map = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaWlzcGFyIiwiYSI6ImNsZjZ2ZjNtbDB6MHczd3FoemJiYjYwNDIifQ.MHK5AW08xBT6JgTuYfBJTg';

  const map = useRef(null);
  const [lng, setLng] = useState(24.9000000000);
  const [lat, setLat] = useState(60.2000000000);
  const [zoom] = useState(18);
  const [station, setStation] = useState('');
  const { id } = useParams();
  const nameFi = getKeyByValue(stationsAndIds, id);

  const getStationData = async () => {
    await stationService.getFiltered([`Name_fi=${nameFi}`])
      .then((stationData) => setStation(stationData));
    try {
      $('#station-information__header__name__location').text(`${station[0].Adress_fi},${station[0].City_fi}`);
      if (lng !== station[0].x) {
        await setLng(station[0].x);
        await setLat(station[0].y);
        map.current.flyTo({
          center: [station[0].x, station[0].y],
        });
      }
    } catch {
      console.log('no x');
    }
  };

  useEffect(() => {
    getStationData();
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
    // map.current.on('load', () => {
    //   // Add a new vector tile source with ID 'mapillary'.
    //   map.current.addSource('mapillary', {
    //     type: 'vector',
    //     tiles: [
    //       'https://cdn.digitransit.fi/map/v2/hsl-stop-map/{z}/{x}/{y}.pbf',
    //     ],
    //     minzoom: 6,
    //     maxzoom: 14,
    //   });
    //   map.current.addLayer(
    //     {
    //       id: 'mapillary', // Layer ID
    //       type: 'line',
    //       source: 'mapillary', // ID of the tile source created above
    //       // Source has several layers. We visualize the one with name 'sequence'.
    //       'source-layer': 'sequence',
    //       layout: {
    //         'line-cap': 'round',
    //         'line-join': 'round',
    //       },
    //       paint: {
    //         'line-opacity': 0.6,
    //         'line-color': 'rgb(53, 175, 109)',
    //         'line-width': 2,
    //       },
    //     },
    //   );
    // });
  });

  return (
    <div className="map" id="map">
      <div id="map__container" className="map__container" />
    </div>
  );
};

export default Map;
