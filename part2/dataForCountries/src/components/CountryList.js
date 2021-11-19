import React from "react"

const CountryList = ({ countries }) => {
    return (
        <>
            {countries.map(it => <p key={it.ccn3}>{it.name.official}</p>)}
        </>
    )
}

export default CountryList