import { Link } from "react-router-dom";
import "./Countries.css";
function Countries({
  countriesBase,
  search,
  searchFunction,
  continents,
  selectFunction,
  selectOpenFunction,
  openSelect,
  continentIndex,
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
              onInput={(e)=>searchFunction(e.target.value)}
              type="text"
              placeholder="Search for a country…"/>
          </form>
          <button onClick={()=>selectOpenFunction()} className={openSelect?'select active':'select'}>
            <span>{continents[continentIndex]}</span>
            <i className="fa-solid fa-chevron-up"></i>
            <div className="continent">
              {
                continents.map((continent, index)=>{
                  return <div onClick={()=>selectFunction(index)} key={index}>{continent}</div>
                })
              }
            </div>
          </button>
        </div>
        <div className="countriesPage">
          {countriesBase.length?countriesBase.map((country, index) => {            
            return <div key={index} className="country">
              <Link to={`/oneCountry/${country.name.common}`}><img src={country.flags.svg} alt={country.flags.alt} /></Link>
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
          }):<h1>Not found country</h1>}
        </div>
      </div>
    </div>
  );
}
export default Countries;