import bikeService from '../../services/BikeService';
import { stationsAndIds } from '../../data/stationsData';
// eslint-disable-next-line import/no-unresolved, import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';
import stationService from '../../services/StationService';

export const getKeyByValue = (object, value) => Object
  .keys(object)
  .find((key) => object[key] === value);

export const getStationInfo = async (name) => {
  let station = '';
  await stationService.getFiltered([`Name_fi=${name}`])
    .then((stationData) => {
      station = stationData;
    });
  return station;
};

/**
 * Calls the count api and return count of all trips in given direction
 * @param {String} stationId
 * @returns
 */
export const getCountTrips = async (direction, stationId, month) => {
  const id = parseInt(stationId, 10);
  const filter = `${id}/${month}`;
  const result = await bikeService.getCount(direction, filter);
  return result;
};

/**
 * Calls the average api and returns average distance of trips from or to station.
 * @param {String} stationId
 * @returns
 */
export const getAverageDistance = async (direction, stationId, month) => {
  const id = parseInt(stationId, 10);
  const result = await bikeService.getAverage(direction, id, month);
  return result[0].average;
};

/**
 * Calls the top api and returns top 5 returning or deparute stations for this station.
 * @param {String} stationId
 * @returns
 */
export const setTop = async (elementId, direction, stationId, month) => {
  const id = parseInt(stationId, 10);
  const result = await bikeService.getTop(direction, id, month);
  const list = document.getElementById(elementId);
  for (let i = 0; i < result.length; i += 1) {
    const name = getKeyByValue(stationsAndIds, result[i]._id);
    const li = document.createElement('li');
    li.innerHTML = name;
    list.appendChild(li);
  }
  return list;
};

export const setTopOnMap = async (map, direction, stationId, month, list) => {
  const toCall = [];
  const id = parseInt(stationId, 10);
  const result = await bikeService.getTop(direction, id, month);
  for (let i = 0; i < result.length; i += 1) {
    const name = getKeyByValue(stationsAndIds, result[i]._id);
    toCall.push(getStationInfo(name));
  }
  const responses = await Promise.all(toCall);
  for (let i = 0; i < responses.length; i += 1) {
    const stationMarker = new mapboxgl.Marker()
      .setLngLat([responses[i][0].x, responses[i][0].y])
      .setPopup(new mapboxgl.Popup()
        .setHTML(`${responses[i][0].Name_fi} is the ${i + 1} top ${direction} station`))
      .addTo(map);
    list.push(stationMarker);
    const markerDiv = stationMarker.getElement();
    markerDiv.addEventListener('mouseenter', () => stationMarker.togglePopup());
    markerDiv.addEventListener('mouseleave', () => stationMarker.togglePopup());
  }
  return list;
};

/**
 * Returns the name of the integer month.
 * @param {int} month
 * @returns months name
 */
export const getMonthName = (month) => {
  if (month === 5) return 'may';
  if (month === 6) return 'june';
  if (month === 7) return 'july';
  return 'all';
};
