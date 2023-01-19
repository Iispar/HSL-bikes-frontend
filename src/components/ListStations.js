import React from 'react'
import Station from './OneStation'
import propTypes from 'prop-types'

const ListStations = (props) => {
  const stations = props.stations
  if (stations.length === 0) return <div className = "loading-containter"> Waiting for data... </div>

  const list = []
  for (const i in stations) {
    list.push(<Station
        key = {stations[i].FID}
        id = {stations[i].ID}
        nameFi = {stations[i].Name_fi}
        nameSwe = {stations[i].Name_swe}
        adressFi = {stations[i].Adress_fi}
        adressSwe = {stations[i].Adress}
        cityFi = {stations[i].City_fi}
        citySwe = {stations[i].City_swe}
        operator = {stations[i].Operator}
        capasity = {stations[i].Capasity}
        x = {stations[i].x}
        y = {stations[i].y}
      />)
  }
  return list
}

ListStations.propTypes = {
  stations: propTypes.array
}

export default ListStations
