import React, { useState, useEffect, useRef } from 'react'
import stationService from '../services/StationService'
import ListStations from './ListStations'
import $ from 'jquery'
import { stations, stationsAndIds } from '../data/stationsData'
import { newFilter, getPageFilter } from './filterHelpers'
import SingleStationInfo from './SingleStationInfo.js'

/**
 * method for creating the list of stations.
 * @returns the stations
 */
const Stations = () => {
  const [stationsDisplay, setStationsDisplay] = useState([])
  const [name, setName] = useState('')
  const [filterNow, setFilterNow] = useState(['limit=10'])
  const page = useRef(0)

  /**
   * useEffect hook that retrieves the data when the app is opened.
   */
  useEffect(() => {
    stationService.getAll()
      .then(stationData => setStationsDisplay(stationData))
    $('#backwardsStation-button').prop('disabled', true)
  }, [])

  /**
   * method for changing the filter. And setting the journeydata as instructed by the filtering.
   * @param {Array} filter
   */
  const changeFilter = (addToFilter) => {
    const filter = newFilter(filterNow, addToFilter)
    setFilterNow(filter)
    stationService.getFiltered(filter)
      .then(filteredJourneys => setStationsDisplay(filteredJourneys))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const stationId = stationsAndIds[name]
    console.log(stationId)
    const filterToChange = ['ID=' + stationId]
    changeFilter(filterToChange)
    setName('')
  }

  const changePage = (direction, page) => {
    if (direction === 'f') page.current = page.current + 1
    else page.current = page.current - 1
    page.current === 0 ? $('#backwardsStation-button').prop('disabled', true) : $('#backwardsStation-button').prop('disabled', false)
    const filter = getPageFilter(direction, page.current, filterNow)
    stationService.getFiltered(filter)
      .then(filteredJourneys => setStationsDisplay(filteredJourneys))
  }

  /**
   * Using jQuery autocomplete which also sets the inputfield data into the city variable.
   * Can this be done with const(?)
   */
  $(() => {
    $('#StationInput').autocomplete({
      source: stations,
      select: (event, ui) => {
        setName(ui.item.value)
      },
      change: (event, ui) => {
        setName(ui.item.value)
      }
    })
  })

  return (
    <div className="station-container">
      <div className="list-container" id="list-container">
        <div className="stationFilter-container">
        <div className = "stationSearch-container">
          <form onSubmit={handleSubmit}>
              <input id="StationInput" placeholder="Station name"></input>
          </form>
        </div>
        </div>
        <div className = "listOfStations-container">
          <ListStations stations = {stationsDisplay}/>
        </div>
        <div className = "pagination-container">
        <button id = "backwardsStation-button" onClick = {() => changePage('b', page)}> previous </button>
        <button id = "forwardsStation-button" onClick = {() => changePage('f', page)}> next </button>
      </div>
      </div>
      <div className="singleStation-container" id="singleStation-container">
        <SingleStationInfo/>
      </div>
    </div>
  )
}

export default Stations
