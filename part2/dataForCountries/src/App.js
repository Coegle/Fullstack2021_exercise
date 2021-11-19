import React, { useState } from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import CountryDetail from './components/CountryDetail'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState('')

  const onsearchCountryChange = (event) => {
    setSearchCountry(event.target.value)
    axios
      .get("https://restcountries.com/v3.1/name/" + event.target.value)
      .then(repsonse => {
        setCountries(repsonse.data)
      })
      .catch(error => {
        if (error.status === 404) {
          setCountries([])
        }
      })
  }

  const searchResult = () => {
    if (searchCountry.length === 0) {
      return <p>Type to search.</p>
    }

    if (countries.length === 0) {
      return <p>Can't find this country.</p>
    }
    else if (countries.length === 1) {
      return <CountryDetail country={countries[0]} />
    }
    else if (countries.length > 1 && countries.length < 10) {
      return <CountryList countries={countries} showDetail={onClickShow} />
    }

    return <p>Too many matches, specify another filter.</p>
  }

  const onClickShow = (id) => {
    setCountries(countries.filter(it => it.ccn3 === id))
  }

  return (
    <div>
      <div>
        find countries 
        <input value={searchCountry} onInput={onsearchCountryChange} />
      </div>

      {searchResult()}
    </div>
  )
}

export default App