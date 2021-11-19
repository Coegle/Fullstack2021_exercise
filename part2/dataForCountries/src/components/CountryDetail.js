import axios from "axios"
import React, { useEffect, useState } from "react"

const LanguagesList = ({ languages }) => (<ul>{Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}</ul>)

const WeatherInfo = ({ data }) => {
    if (data === null) return null

    return (
        <div>
            <h3>Weather in {data.location.name}</h3>
            <p>temperature: {data.current.temperature}</p>
            <img src={data.current.weather_icons} />
            <p>wind: {data.current.wind_speed}</p>
        </div>
    )
}

const CountryDetail = ({ country }) => {
    const [weatherData, setWeatherData] = useState(null)
    useEffect(() => {
        const weatherAPIKey = process.env.REACT_APP_WEATHER_API_KEY
        const baseUrl = 'http://api.weatherstack.com'
        axios
            .get(`${baseUrl}/current?access_key=${weatherAPIKey}&query=${country.name.common}`)
            .then(response => {
                setWeatherData(response.data)
            })
    }, [])
    return (
        <>
            <h2>{country.name.common}</h2>
            <p>Capital: {Object.values(country.capital).join(", ")}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <LanguagesList languages={country.languages} />
            <img src={country.flags.png} />
            <WeatherInfo data={weatherData} />
        </>
    )
}
export default CountryDetail