import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const Countries = ({ matches, setMatches }) => {
  const [weather, setWeather] = useState([])

  if (matches.length === 1 && weather.length === 0) {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${matches[0].capital}&appid=${api_key}`)
      .then(response => setWeather(weather.concat(response.data)))
  }
  
  console.log(weather)

  if (matches.length > 10) {
    return (
      <div>
        <br /> Too many matches, be more specific
      </div>
    )
  } else if (matches.length <= 10 && matches.length > 1) {
    return (
      <div>
        <ul>
          {matches.map(match => 
            <li key={match.ccn3}>
              {match.name.common}
              &nbsp; <button type='button' 
                             onClick={() => setMatches([match])}>
                             show {match.name.common}
                     </button>
            </li>
            )
          }
        </ul>
      </div>
    )
  } else if (matches.length === 1) {
    const country = matches[0]
    const languages = Object.values(country.languages)
    const flagStuff = matches[0].flags
    const icon = `https://openweathermap.org/img/wn/${weather[0].weather.icon}@2x.png`

    return (
      <div>
        <h1>{country.name.common}</h1>
        <b>Capital</b>: {country.capital}<br /> 
        <b>Area</b>: {country.area}<br />
        <h3>Languages: </h3>
        <ul>
        {languages.map(language => <li key={(language.substring(0,3)) + language.length}><b>{language}</b></li>)}
        </ul>
        <img src={flagStuff.png} alt={flagStuff.alt} height='200' width='200'></img>
        <h2>Weather in {country.capital}</h2>
        <b>Temperature:</b> {weather[0].main.temp}
        <img src={icon}></img>
      </div>
    )
  }
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [matches, setMatches] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleSearch = (event) => {
    const input = event.target.value

    setSearch(input)

    if (input === '' || input === ' ') {
      setMatches([])
    } else {
      setMatches(countries.filter(country => country.name.common.toLowerCase().includes(input.toLowerCase())))
    }
  }
  
  return (
    <>
      Find countries <input onChange={handleSearch} value={search} />
      <Countries matches={matches} setMatches={setMatches} />
    </>
  )
}

export default App