/* eslint-disable no-unused-vars */
import React from 'react'
import propTypes from 'prop-types'

const Station = (props) => {
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

  return (
    <div className = "singleJourney-container">
        Name: {nameFi}, adress: {adressFi}, city: {cityFi}, operator: {operator}, capasity: {capasity}
    </div>
  )
}

Station.propTypes = {
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
