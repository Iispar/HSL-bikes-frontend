import React, { useState, useEffect } from 'react'
import bikeService from '../services/BikeService'
import ListJourneys from './listJourneys'

/**
 * method for creating the list of journeys.
 * @returns the journeys
 */
const Journeys = () => {
  const [journeys, setJourneys] = useState([])
  const [page, setPage] = useState(1)
  const [filterNow, setFilterNow] = useState(['limit=10'])

  useEffect(() => {
    bikeService.getAll()
      .then(journeysData => setJourneys(journeysData))
  }, [])

  /**
   * method for changing the filter. And setting the journeydata as instructed by the filtering.
   * @param {Array} filter
   */
  const changeFilter = (addToFilter) => {
    const newFilter = [...filterNow]
    for (const i in addToFilter) {
      const adding = addToFilter[i].split('=')[0]
      for (const i in newFilter) {
        if (newFilter[i].includes(adding)) {
          newFilter.pop(i)
        }
      }
      newFilter.push(addToFilter[i])
    }
    setFilterNow(newFilter)
    bikeService.getFiltered(newFilter)
      .then(filteredJourneys => setJourneys(filteredJourneys))
  }

  /**
   * method for moving forwards and backwords pages of journeydata.
   * @param {String} direction
   * @param {Integer} page
   * @returns set journeydata as filtered
   */
  const changePage = (direction, page) => {
    if (direction === 'f') {
      const filter = [...filterNow]
      filter.push(`skip=${page * 10}`)
      setPage(page + 1)
      bikeService.getFiltered(filter)
        .then(filteredJourneys => setJourneys(filteredJourneys))
    } else {
      const filter = [...filterNow]
      if (page * 10 - 20 < 0) {
        // error handling
        console.log('too low')
        return
      }
      filter.push(`skip=${page * 10 - 20}`)
      setPage(page - 1)
      bikeService.getFiltered(filter)
        .then(filteredJourneys => setJourneys(filteredJourneys))
    }
  }

  return (
    <div className = "journeys-container">
        <div className = "filters-container">
            <button onClick={() => changeFilter()}> Espoo </button>
            <div className = "sortDropdown-container">
                <button className = "sortDropdown-button"> Sort </button>
                <div className = "sortDropdown-content">
                    <button className = "sort-button" onClick={() => changeFilter(['sort=-Covered_distance'])}> Furthest </button>
                    <button className = "sort-button" onClick={() => changeFilter(['sort=+Covered_distance'])}> Shortest </button>
                    <button className = "sort-button" onClick={() => changeFilter(['sort=-Duration'])}> Longest </button>
                    <button className = "sort-button" onClick={() => changeFilter(['sort=+Duration'])}> Fastest </button>
                </div>
            </div>
        </div>

        <div className = "listOfJourneys-container">
            <ListJourneys journeys = {journeys} />
        </div>

        <div className = "pageing-container">
        <button onClick = {() => changePage('b', page)}> previous </button>
            <button onClick = {() => changePage('f', page)}> next </button>
        </div>
    </div>
  )
}

export default Journeys
