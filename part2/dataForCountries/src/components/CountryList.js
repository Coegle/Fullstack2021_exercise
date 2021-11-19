import React from "react"

const CountryColumn = ({ country, showDetail }) => {
    return (
        <li>
            {country.name.official}
            <button onClick={() => showDetail(country.ccn3)}>show</button>
        </li>
    )
}

const CountryList = ({ countries, showDetail }) => {
    return (
        <ul>
            {countries.map(it => <CountryColumn key={it.ccn3} country={it} showDetail={showDetail}/>)}
        </ul>
    )
}

export default CountryList