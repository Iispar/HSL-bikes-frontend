import React, { useRef, useEffect, useState } from 'react';
// eslint-disable-line import/no-webpack-loader-syntax
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
import mapboxgl from '!mapbox-gl';

const Map = () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiaWlzcGFyIiwiYSI6ImNsZjZ2ZjNtbDB6MHczd3FoemJiYjYwNDIifQ.MHK5AW08xBT6JgTuYfBJTg';
  const map = useRef(null);
  const [lng] = useState(25);
  const [lat] = useState(60);
  const [zoom] = useState(9);

  useEffect(() => {
    if (map.current) {
      map.current.on('load', () => {
        map.current.resize();
      });
      return;
    }
    map.current = new mapboxgl.Map({
      container: 'map__container',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom,
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
