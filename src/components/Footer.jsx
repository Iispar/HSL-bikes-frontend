import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import stationService from '../services/StationService';

const Footer = () => {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;
  const map = useRef(null);
  const [stations, setStations] = useState('');
  const navigate = useNavigate();

  /**
   * Sets all the stations on the map. With popups of their names and also their
   * an onclick which moves to the selected stations single-station-view.
   */
  const setAllStationMarkers = () => {
    for (let i = 0; i < stations.length; i += 1) {
      const stationMarker = new mapboxgl.Marker()
        .setLngLat([stations[i].x, stations[i].y])
        .setPopup(new mapboxgl.Popup()
          .setHTML(`${stations[i].Name}`))
        .addTo(map.current);
      stationMarker._element.id = 'topStationMarker';
      const markerDiv = stationMarker.getElement();
      markerDiv.addEventListener('mouseenter', () => stationMarker.togglePopup());
      markerDiv.addEventListener('mouseleave', () => stationMarker.togglePopup());
      markerDiv.addEventListener('click', () => navigate(`/${stations[i].ID}`));
    }
  };

  /**
   * When all stationdata is reciewed we set the map and also the markers on it.
   */
  useEffect(() => {
    if (stations.length !== 0) setAllStationMarkers();
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
    map.current = new mapboxgl.Map({
      container: 'footer__content__map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [24.95, 60.170],
      zoom: 14,
      maxZoom: 20,
      minZoom: 12,
      maxBounds: bounds,
    });
  }, [stations]);

  /**
   * Gets all the stations when page is loaded.
   */
  useEffect(() => {
    stationService.getFiltered([''])
      .then((stationData) => setStations(stationData));
  }, []);

  return (
    <div className="footer">
      <div className="footer__content">
        <div id="footer__content__map" className="footer__content__map" />
      </div>
    </div>
  );
};
export default Footer;
