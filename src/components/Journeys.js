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
  const stations = ['Hanasaari', 'Keilalahti', 'Westendinasema', 'Golfpolku', 'Revontulentie', 'Sateentie', 'Hakalehto', 'Oravannahkatori', 'Lnsituuli', 'Tuulimki', 'Tapionaukio', 'Kulttuuriaukio', 'Ahertajantie', 'Mntyviita', 'Otsolahti', 'Keilaniemi (M)', 'Keilaranta', 'Betonimies', 'Tekniikantie', 'Innopoli', 'Hagalundinpuisto', 'nan', 'nan', 'Otaranta', 'Shkmies', 'Jmerntaival', 'Maarinranta', 'Tietj', 'Metsnneidonpolku', 'Kalevalantie', 'Louhentori', 'Pohjankulma', 'Koivu-Mankkaa', 'Mankkaanlaaksontie', 'Mankkaanaukio', 'Tapiolan urheilupuisto', 'Urheilupuisto (M)', 'Tontunmentie', 'Olarinluoma', 'Niittymaa', 'Niittykumpu (M)', 'Haukilahdenkatu', 'Haukilahdenaukio', 'Hauenkallio', 'Haukilahdenranta', 'Mellstenintie', 'Toppelundintie', 'Westendintie', 'Toppelundinportti', 'Linnakepolku', 'Nokkala', 'Matinlahdenranta', 'Nuottaniementie', 'Sepetlahdentie', 'Matinkartanontie', 'Matinkylntie', 'Tiistilntie', 'Tiistinkallio', 'Etuniementie', 'Hauenkalliontie', 'Nelikkotie', 'Suomenlahdentie', 'Piispansilta', 'Piispanportti', 'Friisilnaukio', 'Avaruuskatu', 'Kuunkatu', 'Ruomelantie', 'Itportti', 'Komeetankatu', 'Auringonkatu', 'Piispankallio', 'Lystimki', 'Lystimensilta', 'Suurpellonaukio', 'Lukutori', 'Gallen-Kallelan tie', 'Elfvik', 'Laajalahden keskus', 'Majurinkulma', 'Yhdyskunnankuja', 'Kirjurinkuja', 'Upseerinkatu', 'Komentajankatu', 'Steri', 'Sterinrinne', 'Sterinniitty', 'Rummunlyjnkatu', 'Ratsutori', 'Leppvaaranaukio', 'Leppvaarankytv', 'Lkkitori', 'Armas Launiksen katu', 'Muurarinkuja', 'Postipuun koulu', 'Gransinmki', 'Leppvaaran urheilupuisto', 'Leppvaaran uimahalli', 'Vallikatu', 'Vallipolku', 'Linnuntie', 'Kutsuntatie', 'Painiitty', 'Mkkyln asema', 'Kalkkipellonmki', 'Ruutikatu', 'Tiurintie', 'Orionintie', 'Bike Station', 'Derby Business Park', 'Kaivopuisto', 'Laivasillankatu', 'Kapteeninpuistikko', 'Viiskulma', 'Sepnkatu', 'Hietalahdentori', 'Designmuseo', 'Vanha kirkkopuisto', 'Erottajan aukio', 'Kasarmitori', 'Unioninkatu', 'Kanavaranta', 'Merisotilaantori', 'Senaatintori', 'Ritarikatu', 'Liisanpuistikko', 'Varsapuistikko', 'Porthania', 'Rautatientori / it', 'Kaisaniemenpuisto', 'Tlnlahdenkatu', 'Rautatientori / lnsi', 'Kiasma', 'Mannerheimintie', 'Narinkka', 'Kamppi (M)', 'Eerikinkatu', 'Lastenlehto', 'Baana', 'Itmerentori', 'Marian sairaala', 'Elinmuseo', 'Kauppakorkeakoulu', 'Kansallismuseo', 'Cygnaeuksenkatu', 'Apollonkatu', 'Tlnkatu', 'Tlntori', 'Ooppera', 'Hakaniemi (M)', 'Ympyrtalo', 'Haapaniemenkatu', 'Karhupuisto', 'Srninen (M)', 'Brahen kentt', 'Diakoniapuisto', 'Vanha Kauppahalli', 'Mastokatu', 'Annankatu', 'Melkonkuja', 'Itlahdenkatu', 'Heikkilnaukio', 'Heikkilntie', 'Gyldenintie', 'Puistokaari', 'Luoteisvyl', 'Lauttasaaren ostoskeskus', 'Lauttasaarensilta', 'Salmisaarenranta', 'Kaapelitehdas', 'Lnsisatamankatu', 'Vlimerenkatu', 'Jtksaarenlaituri', 'Tyynenmerenkatu', 'Hernesaarenranta', 'Ehrenstrmintie', 'Permiehenkatu', 'Albertinkatu', 'Kalevankatu', 'Sammonpuistikko', 'Hietaniemenkatu', 'Etelinen Hesperiankatu', 'Keskatu', 'Rajasaarentie', 'Korjaamo', 'Olympiastadion', 'Nordenskildinaukio', 'Messeniuksenkatu', 'Uimastadion', 'Jhalli', 'Stenbckinkatu', 'Tlntulli', 'Meilahden sairaala', 'Paciuksenkatu', 'Jalavatie', 'Kuusitie', 'Kustaankatu', 'Kiskontie', 'Tilkanvierto', 'Paciuksenkaari', 'Seurasaari', 'Saunalahdentie', 'Torpanranta', 'Laajalahden aukio', 'Munkkiniemen aukio', 'Huopalahdentie', 'Ulvilantie', 'Muusantori', 'Teljntie', 'Munkkivuoren ostoskeskus', 'Vihdintie', 'Kriikunakuja', 'Tilkantori', 'Korppaanmentie', 'Tenholantie', 'Radiokatu', 'Hertanmenkatu', 'Maistraatintori', 'Esterinportti', 'Rautatielisenkatu', 'Pasilan asema', 'Ratapihantie', 'Venttiilikuja', 'Linnanmki', 'Brahen puistikko', 'Fleminginkatu', 'Gebhardinaukio', 'Mkelnkatu', 'Vilhonvuorenkatu', 'Lintulahdenkatu', 'Nkinsilta', 'Isoisnsilta', 'Arielinkatu', 'Kalasatama (M)', 'Teurastamo', 'Pijnteentie', 'Pernajantie', 'Teollisuuskatu', 'Elimenkatu', 'Hollolantie', 'Paavalinpuisto', 'Haukilahdenkatu', 'Velodrominrinne', 'Sofianlehdonkatu', 'Arabian kauppakeskus', 'Arabiankatu', 'Muotoilijankatu', 'Verkatehtaanpuisto', 'Intiankatu', 'Koskelantie', 'Kuikkarinne', 'Kpylntie', 'Pohjolankatu', 'Pohjolanaukio', 'Kpyln asema', 'Juhana Herttuan tie', 'Toinen linja', 'Tlnlahden puisto', 'Etelesplanadi', 'Leppsuonaukio', 'Lehtisaarentie', 'Lnsiterminaali', 'Lnsisatamankuja', 'Merihaka', 'Opastinsilta', 'A.I. Virtasen aukio', 'Ilmalan asema', 'Ruskeasuon varikko', 'Vanha Viertotie', 'Valimotie', 'Takomotie', 'Pajamki', 'Haagan tori', 'Tunnelitie', 'Huopalahden asema', 'Valimon asema', 'Pitjnmen asema', 'Jnnetie', 'Marttila', 'Pohjois-Haagan asema', 'Nyttelijntie', 'Ida Aalbergin tie', 'Thalianaukio', 'Huovitie', 'Hmeenlinnanvyl', 'Vesakkotie', 'Maunula', 'Lepolantie', 'Kylvoudintie', 'Kustaankartano', 'Kskynhaltijantie', 'Mkitorpantie', 'Siltavoudintie', 'Oulunkyln asema', 'Kirkkoherrantie', 'Otto Brandtin tie', 'Katariina Saksilaisen katu', 'Hernepellontie', 'Aulangontie', 'Pihlajamki', 'Viikin tiedepuisto', 'Viikin normaalikoulu', 'Agronominkatu', 'Von Daehnin katu', 'Mustikkamaa', 'Relanderinaukio', 'Kulosaari (M)', 'Tupasaarentie', 'Haakoninlahdenkatu', 'Gunillantie', 'Isosaarentie', 'Reiherintie', 'Laajasalon ostoskeskus', 'Humalniementie', 'Tammisalon aukio', 'Agnetankuja', 'Laivalahden puistotie', 'Herttoniemenranta', 'Margareetankuja', 'Abraham Wetterin tie', 'Petter Wetterin tie', 'Herttoniemi (M)', 'Asentajanpuisto', 'Siilitie (M)', 'Herttoniemen kirkko', 'Ernkvijntori', 'Siilitie 9', 'Siilitie 13', 'Roihupelto', 'Porolahden koulu', 'Peukaloisentie', 'Tulisuontie', 'Prinsessantie', 'Marjaniementie', 'Voikukantie', 'Itkeskus (M)', 'Puotinharju', 'Marjaniemi', 'Puotilantie', 'Puotinkyln kartano', 'Puotilan ostoskeskus', 'Puotila (M)', 'Karhulantie', 'Alakiventie', 'Myllypuro (M)', 'Orpaanporras', 'Mamsellimyllynkatu', 'Vallilan varikko', 'Itkeskus Metrovarikko', 'Koskelan varikko', 'Korkeasaari', 'Postipuisto', 'Aurinkotuulenkatu', 'Sumukuja', 'Leikosaarentie', 'Aurinkolahdenaukio', 'Kalkkihiekantie', 'Kauppakeskus Columbus', 'Vuosaaren liikuntapuisto', 'Mosaiikkitori', 'Kaivonkatsojanpuisto', 'Halkaisijantie', 'Ramsinniementie', 'Meri-Rastilan tori', 'Rastila (M)', 'Lokitie', 'Punakiventie', 'Haapasaarentie', 'Vuosaaren puistopolku', 'Purjetie', 'Koukkusaarentie', 'Vartioharjuntie', 'Rukatunturintie', 'Sallatunturintie', 'Mellunmki (M)', 'Sinkiltie', 'Humikkalankuja', 'Lallukankuja', 'Kurkimki', 'Kontula (M)', 'Tuukkalantie', 'Lettopolku', 'Kontulankaari', 'nan', 'Varustuksentie', 'Kurkimentie', 'Kivikonlaita', 'Kivikon liikuntapuisto', 'Jakomentie', 'Jakomki', 'Alppikyl', 'Heikinlaakso', 'Puistolan VPK', 'Puistolantori', 'Puistolan asema', 'Maatullinkuja', 'Sateenkaarentie', 'Siltamki', 'Tyrynummentie', 'Tyrynummi', 'Kotinummentie', 'Porvarintie', 'Helluntairaitti', 'Tapanilan asema', 'Saniaiskuja', 'Halmetie', 'Laulurastaantie', 'Vanha Tapanilantie', 'Syystie', 'Malmin sairaala', 'Malmin asema', 'Huhtakuja', 'Teerisuontie', 'Ala-Malmin tori', 'Vrmentie', 'Karviaistie', 'Tilketori', 'Karhusuontie', 'Jokipellontie', 'Pukinmen liikuntapuisto', 'Pukinmen asema', 'Rapakiventie', 'Tollinpolku', 'Mikkolantie', 'Etupellonpuisto', 'Piikintie', 'Torpparinmentie', 'Paloheinn kirjasto', 'Paloheinn maja', 'Paloheinntie', 'Pirkkolan liikuntapuisto', 'Maununneva', 'Ulappasilta', 'Hakuninmaa', 'Kuninkaantammi', 'Kalannintie', 'Kannelmen liikuntapuisto', 'Pajupillintie', 'Kauppakeskus Kaari', 'Kaustisentie', 'Kannelmen asema', 'Savela', 'Trumpettikuja', 'Viljelijntie', 'Malminkartanon asema', 'Tuohipolku', 'Honkasuo', 'Malminkartanonhuippu', 'Hankasuontie', 'Ajomiehentie', 'Vhntuvantie', 'Kuusisaari', 'Koivusaari (M)', 'Bermudankuja', 'Verkkosaari', 'Sompasaari', 'Jollas']

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

  /**
   * Check if there is a match with the input and our stations
   * @param {String} input
   * @returns term that matches or nothing
   */
  const autocomplete = (input) => {
    if (input === '') return []
    const regexp = new RegExp('^' + input)
    return (
      stations.filter((term) => {
        if (term.match(regexp)) {
          return term
        } return ''
      })
    )
  }

  /**
   * Check and display if input matches our terms.
   */
  const showResults = () => {
    const input = document.getElementById('stationFilter').value
    const res = document.getElementById('result')
    res.innerHTML = ''
    let list = ''
    const terms = autocomplete(input)
    for (const i in terms) {
      list += '<li>' + terms[i] + '</li>'
    }
    res.innerHTML = '<ul>' + list + '</ul>'
  }

  return (
    <div className = "journeys-container">
        <div className = "filters-container">

        <form autoComplete="off">
            <input id="stationFilter" type="text" name="stationFilter" placeholder="station" onKeyUp={() => showResults()}></input>
            <div id="result"></div>
        </form>

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
