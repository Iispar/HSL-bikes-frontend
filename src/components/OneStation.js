/* eslint-disable no-unused-vars */
import React from 'react'
import propTypes from 'prop-types'
import $ from 'jquery'
import { getCountTripsEnding, getCountTripsStarting } from './stationDataHelpers'

const Station = (props) => {
  const id = props.id
  const nameFi = props.nameFi
  const nameSwe = props.nameSwe
  const adressFi = props.adressFi
  const adressSwe = props.adressSwe
  const cityFi = props.cityFi
  const citySwe = props.citySwe
  const operator = props.operator
  const capasity = props.capasity
  const x = props.x
  const y = props.y

  const setSingleStationThis = async () => {
    $('#list-container').css('display', 'none')
    $('#singleStation-container').css('display', 'flex')
    $('#singleStationHeader').text(nameFi)
    $('#singleStationInfo').text(adressFi + ',' + cityFi)
    $('#singleStationCapasity').text('capasity:' + capasity)
    $('#singleStationTripsDeparture').text('all trips ending here: Waiting for data...')
    $('#singleStationTripsReturn').text('all trips ending here: Waiting for data...')

    const tripsEndingHere = await getCountTripsEnding(id)
    const tripsStartingHere = await getCountTripsStarting(id)

    $('#singleStationTripsDeparture').text('all trips ending here: ' + tripsEndingHere)
    $('#singleStationTripsReturn').text('all trips ending here: ' + tripsStartingHere)
  }

  return (
    <div className = "singleJourney-container" id={id} onClick={() => setSingleStationThis()}>
        Name: {nameFi}, adress: {adressFi}, city: {cityFi}, operator: {operator}, capasity: {capasity}
    </div>
  )
}

Station.propTypes = {
  id: propTypes.string,
  nameFi: propTypes.string,
  nameSwe: propTypes.string,
  adressFi: propTypes.string,
  adressSwe: propTypes.string,
  cityFi: propTypes.string,
  citySwe: propTypes.string,
  operator: propTypes.string,
  capasity: propTypes.number,
  x: propTypes.string,
  y: propTypes.string
}

export default Station
