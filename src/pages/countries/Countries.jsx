import React, { useState } from "react";
import "./Countries.css";
function Countries({
  continentCountry,
  search,
  continents,
  continentFilter,
  selectBtn,
  continentBtn,
  continentIndex,
  searchInput,
  searchCountry
}) 
{
  return (
    <div className="countries">
      <div className="container">
        <div className="filterCountries">
          <form onSubmit={(e) => e.preventDefault()}>
            <button>
              <img src={search} alt="Search Icon" />
            </button>
            <input
              type="text"
              placeholder="Search for a country…"
              value={searchCountry}
              onInput={(e) => searchInput(e.target.value)}
            />
          </form>
          <button
            onClick={() => selectBtn()}
            className={continentBtn ? "select active" : "select"}>
            <span>{continents[continentIndex]}</span>
            <i className="fa-solid fa-chevron-up"></i>
            <div className="continent">
              {continents.map((continent, index) => (
                <div onClick={() => continentFilter(index)} key={index}>
                  {continent}
                </div>
              ))}
            </div>
          </button>
        </div>
        <div className="countriesPage">
          {continentCountry.map((country, index) => {
            return (
              <div key={index} className="country">
                <img src={country.flags.svg} alt={country.flags.alt} />
                <div className="countryInfo">
                  <h3>{country.name.common}</h3>
                  <div>
                    <p>
                      <b>Population: </b>
                      {country.population.toLocaleString("ru")}
                    </p>
                    <p>
                      <b>Region: </b>
                      {country.region}
                    </p>
                    <p>
                      <b>Capital: </b>
                      {country.capital?country.capital:'No capital'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Countries;
