import React, { useState, useEffect } from 'react'
import bikeService from '../services/BikeService'
import ListJourneys from './listJourneys'
import $ from 'jquery'
import 'jquery-ui-bundle'
import 'jquery-ui-bundle/jquery-ui.css'

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
        // TODO: error handling here
        console.log('too low')
        return
      }
      filter.push(`skip=${page * 10 - 20}`)
      setPage(page - 1)
      bikeService.getFiltered(filter)
        .then(filteredJourneys => setJourneys(filteredJourneys))
    }
  }

  $(function () {
    const stations = ['Hanasaari', 'Keilalahti', 'Westendinasema', 'Golfpolku', 'Revontulentie', 'Sateentie', 'Hakalehto', 'Oravannahkatori', 'Länsituuli', 'Tuulimäki', 'Tapionaukio', 'Kulttuuriaukio', 'Ahertajantie', 'Mäntyviita', 'Otsolahti', 'Keilaniemi (M)', 'Keilaranta', 'Betonimies', 'Tekniikantie', 'Innopoli', 'Hagalundsparken', 'nan', 'nan', 'Otaranta', 'Sähkömies', 'Jämeräntaival', 'Maarinranta', 'Tietäjä', 'Metsänneidonpolku', 'Kalevalantie', 'Louhentori', 'Pohjankulma', 'Koivu-Mankkaa', 'Mankkaanlaaksontie', 'Mankkaanaukio', 'Tapiola Sports Park', 'Sports Park (M)', 'Tontunmäentie', 'Olarinluoma', 'Niittymaa', 'Niittykumpu (M)', 'Haukilahdenkatu', 'Haukilahdenaukio', 'Hauenkallio', 'Haukilahdenranta', 'Mellstenintie', 'Toppelundintie', 'Westendintie', 'Toppelundinportti', 'Linnakepolku', 'Nokkala', 'Matinlahdenranta', 'Nuottaniementie', 'Sepetlahdentie', 'Matinkartanontie', 'Matinkyläntie', 'Tiistiläntie', 'Tiistinkallio', 'Etuniementie', 'Hauenkalliontie', 'Nelikkotie', 'Suomenlahdentie', 'Piispansilta', 'Piispanportti', 'Friisilänaukio', 'Avaruuskatu', 'Kuunkatu', 'Ruomelantie', 'Itäportti', 'Komeetankatu', 'Auringonkatu', 'Piispankallio', 'Lystimäki', 'Lystimäensilta', 'Suurpellonaukio', 'Lukutori', 'Gallen-Kallelan tie', 'Elfvik', 'Laajalahden keskus', 'Majurinkulma', 'Yhdyskunnankuja', 'Kirjurinkuja', 'Upseerinkatu', 'Komentajankatu', 'Säteri', 'Säterinrinne', 'Säterinniitty', 'Rummunlyöjänkatu', 'Ratsutori', 'Leppävaaranaukio', 'Leppävaarankäytävä', 'Läkkitori', 'Armas Launiksen katu', 'Muurarinkuja', 'Postipuun koulu', 'Gransinmäki', 'Leppävaaran urheilupuisto', 'Leppävaaran uimahalli', 'Vallikatu', 'Vallipolku', 'Linnuntie', 'Kutsuntatie', 'Painiitty', 'Mäkkylän asema', 'Kalkkipellonmäki', 'Ruutikatu', 'Tiurintie', 'Orionintie', 'Bike Station', 'Derby Business Park', 'Kaivopuisto', 'Laivasillankatu', 'Kapteeninpuistikko', 'Viiskulma', 'Sepänkatu', 'Hietalahdentori', 'Design Museum', 'Vanha kirkkopuisto', 'Erottajan aukio', 'Kasarmitori', 'Unioninkatu', 'Kanavaranta', 'Merisotilaantori', 'Senate Square', 'Ritarikatu', 'Liisanpuistikko', 'Varsapuistikko', 'Porthania', 'Central Railway Station/East', 'Kaisaniemenpuisto', 'Töölönlahdenkatu', 'Central Railway Station/West', 'Kiasma', 'Mannerheimintie', 'Narinkka', 'Kamppi (M)', 'Eerikinkatu', 'Lastenlehto', 'Baana', 'Itämerentori', 'Maria Hospital', 'Finnish Museum of Natural History', 'Hanken School of Economics', 'National Museum', 'Cygnaeuksenkatu', 'Apollonkatu', 'Töölönkatu', 'Töölöntori', 'Opera', 'Hakaniemi (M)', 'Ympyrätalo', 'Haapaniemenkatu', 'Karhupuisto', 'Sörnäinen (M)', 'Brahen kenttä', 'Diakoniapuisto', 'Market Square', 'Mastokatu', 'Annankatu', 'Melkonkuja', 'Itälahdenkatu', 'Heikkilänaukio', 'Heikkiläntie', 'Gyldenintie', 'Puistokaari', 'Luoteisväylä', 'Lauttasaari Shopping Center', 'Lauttasaarensilta', 'Salmisaarenranta', 'Cable Factory', 'Länsisatamankatu', 'Välimerenkatu', 'Jätkäsaarenlaituri', 'Tyynenmerenkatu', 'Hernesaarenranta', 'Ehrenströmintie', 'Perämiehenkatu', 'Albertinkatu', 'Kalevankatu', 'Sammonpuistikko', 'Hietaniemenkatu', 'Eteläinen Hesperiankatu', 'Kesäkatu', 'Rajasaarentie', 'Korjaamo', 'Olympic Stadium', 'Nordenskiöldinaukio', 'Messeniuksenkatu', 'Swimming Stadium', 'Ice hall', 'Stenbäckinkatu', 'Töölöntulli', 'Meilahti Hospital', 'Paciuksenkatu', 'Jalavatie', 'Kuusitie', 'Kustaankatu', 'Kiskontie', 'Tilkanvierto', 'Paciuksenkaari', 'Seurasaari', 'Saunalahdentie', 'Torpanranta', 'Laajalahden aukio', 'Munkkiniemen aukio', 'Huopalahdentie', 'Ulvilantie', 'Muusantori', 'Teljäntie', 'Munkkivuori Shopping Center', 'Vihdintie', 'Kriikunakuja', 'Tilkantori', 'Korppaanmäentie', 'Tenholantie', 'Radiokatu', 'Hertanmäenkatu', 'Maistraatintori', 'Esterinportti', 'Rautatieläisenkatu', 'Pasila railway station', 'Ratapihantie', 'Venttiilikuja', 'Linnanmäki Amusement Park', 'Brahen puistikko', 'Fleminginkatu', 'Gebhardinaukio', 'Mäkelänkatu', 'Vilhonvuorenkatu', 'Lintulahdenkatu', 'Näkinsilta', 'Isoisänsilta', 'Arielinkatu', 'Kalasatama (M)', 'Teurastamo', 'Päijänteentie', 'Pernajantie', 'Teollisuuskatu', 'Elimäenkatu', 'Hollolantie', 'Paavalinpuisto', 'Haukilahdenkatu', 'Velodrominrinne', 'Sofianlehdonkatu', 'Arabia Shopping Center', 'Arabiankatu', 'Kaironkatu', 'Verkatehtaanpuisto', 'Intiankatu', 'Koskelantie', 'Kuikkarinne', 'Käpyläntie', 'Pohjolankatu', 'Pohjolanaukio', 'Käpylä station', 'Juhana Herttuan tie', 'Toinen linja', 'Töölönlahden puisto', 'Eteläesplanadi', 'Leppäsuonaukio', 'Lehtisaarentie', 'West Terminal', 'Länsisatamankuja', 'Merihaka', 'Opastinsilta', 'A.I. Virtasen aukio', 'Ilmala Station', 'Ruskeasuo depot', 'Vanha Viertotie', 'Valimotie', 'Takomotie', 'Pajamäki', 'Haagan tori', 'Tunnelitie', 'Huopalahti Station', 'Valimo Station', 'Pitäjänmäki Station', 'Jännetie', 'Marttila', 'Pohjois-Haaga Station', 'Näyttelijäntie', 'Ida Aalbergin tie', 'Thalianaukio', 'Huovitie', 'Hämeenlinnanväylä', 'Vesakkotie', 'Maunula', 'Lepolantie', 'Kylävoudintie', 'Kustaankartano', 'Käskynhaltijantie', 'Mäkitorpantie', 'Siltavoudintie', 'Oulunkylä Station', 'Kirkkoherrantie', 'Otto Brandtin tie', 'Katariina Saksilaisen katu', 'Hernepellontie', 'Aulangontie', 'Pihlajamäki', 'Viikki Science Park', 'Viikki Teacher Training School', 'Agronominkatu', 'Von Daehnin katu', 'Mustikkamaa', 'Relanderinaukio', 'Kulosaari (M)', 'Tupasaarentie', 'Haakoninlahdenkatu', 'Gunillantie', 'Isosaarentie', 'Reiherintie', 'Laajasalo shopping center', 'Humalniementie', 'Tammisalon aukio', 'Agnetankuja', 'Laivalahden puistotie', 'Herttoniemenranta', 'Margareetankuja', 'Abraham Wetterin tie', 'Petter Wetterin tie', 'Herttoniemi (M)', 'Asentajanpuisto', 'Siilitie (M)', 'Herttoniemi Church', 'Eränkävijäntori', 'Siilitie 9', 'Siilitie 13', 'Roihupelto', 'Porolahti school', 'Peukaloisentie', 'Tulisuontie', 'Prinsessantie', 'Marjaniementie', 'Voikukantie', 'Itäkeskus (M)', 'Puotinharju', 'Marjaniemi', 'Puotilantie', 'Puotinkylä Manor', 'Puotila shopping center', 'Puotila (M)', 'Karhulantie', 'Alakiventie', 'Myllypuro (M)', 'Orpaanporras', 'Mamsellimyllynkatu', 'Vallilan varikko', 'Itäkeskus Metrovarikko', 'Koskelan varikko', 'Korkeasaari', 'Postipuisto', 'Aurinkotuulenkatu', 'Sumukuja', 'Leikosaarentie', 'Aurinkolahdenaukio', 'Kalkkihiekantie', 'Shopping Center Columbus', 'Vuosaaren liikuntapuisto', 'Mosaiikkitori', 'Kaivonkatsojanpuisto', 'Halkaisijantie', 'Ramsinniementie', 'Meri-Rastilan tori', 'Rastila (M)', 'Lokitie', 'Punakiventie', 'Haapasaarentie', 'Vuosaaren puistopolku', 'Purjetie', 'Koukkusaarentie', 'Vartioharjuntie', 'Rukatunturintie', 'Sallatunturintie', 'Mellunmäki (M)', 'Sinkilätie', 'Humikkalankuja', 'Lallukankuja', 'Kurkimäki', 'Kontula (M)', 'Tuukkalantie', 'Lettopolku', 'Kontulankaari', 'nan', 'Varustuksentie', 'Kurkimäentie', 'Kivikonlaita', 'Kivikko sports park', 'Jakomäentie', 'Jakomäki', 'Alppikylä', 'Heikinlaakso', 'Puistolan VPK', 'Puistolantori', 'Puistolan asema', 'Maatullinkuja', 'Sateenkaarentie', 'Siltamäki', 'Töyrynummentie', 'Töyrynummi', 'Kotinummentie', 'Porvarintie', 'Helluntairaitti', 'Tapanila railway station', 'Saniaiskuja', 'Halmetie', 'Laulurastaantie', 'Vanha Tapanilantie', 'Syystie', 'Malmi Hospital', 'Malmi railway station', 'Huhtakuja', 'Teerisuontie', 'Ala-Malmin tori', 'Väärämäentie', 'Karviaistie', 'Tilketori', 'Karhusuontie', 'Jokipellontie', 'Pukinmäki sports park', 'Pukinmäki railway station', 'Rapakiventie', 'Tollinpolku', 'Mikkolantie', 'Etupellonpuisto', 'Piikintie', 'Torpparinmäentie', 'Paloheinän kirjasto', 'Paloheinän maja', 'Paloheinäntie', 'Pirkkolan liikuntapuisto', 'Maununneva', 'Ulappasilta', 'Hakuninmaa', 'Kuninkaantammi', 'Kalannintie', 'Kannelmäen liikuntapuisto', 'Pajupillintie', 'Shopping Center Kaari', 'Kaustisentie', 'Kannelmäki railway station', 'Savela', 'Trumpettikuja', 'Viljelijäntie', 'Malminkartano railway station', 'Tuohipolku', 'Honkasuo', 'Malminkartano Hill', 'Hankasuontie', 'Ajomiehentie', 'Vähäntuvantie', 'Kuusisaari', 'Koivusaari metro station', 'Välimerenkatu', 'Verkkosaari', 'Sompasaari', 'Jollas']
    $('#stations').autocomplete({
      source: stations
    })
  })

  return (
    <div className = "journeys-container">
        <div className = "filters-container">
            <div className = "stationSearch-container">
                <input id="stations"></input>
            </div>

            <div className = "dropdown-container">
            <button className = "dropdown-button"> Sort </button>
            <div className = "dropdown-content">
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

        <div className = "pagination-container">
        <button onClick = {() => changePage('b', page)}> previous </button>
            <button onClick = {() => changePage('f', page)}> next </button>
        </div>
    </div>
  )
}

export default Journeys
