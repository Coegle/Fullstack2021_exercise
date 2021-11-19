import React from "react"

const LanguagesList = ({ languages }) => (<ul>{Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}</ul>)

const CountryDetail = ({ country }) => {
    return (
        <>
            <h2>{country.name.common}</h2>
            <p>Capital: {Object.values(country.capital).join(", ")}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <LanguagesList languages={country.languages} />
            <img src={country.flags.png} />
        </>
    )
}
export default CountryDetail