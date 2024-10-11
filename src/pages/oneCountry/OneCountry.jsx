import { useNavigate, useParams } from "react-router-dom";
import "./OneCountry.css";
function OneCountry({ countriesBase }) {
  const { name } = useParams();
  const navigate = useNavigate();
  const country = countriesBase.find((item) => item.name.common == name);
  console.log(country);
  return (
    <div className="oneCountry">
      <div className="container">
        <button className="back" onClick={() => navigate("/")}>
          <i className="fa-solid fa-arrow-left"></i>
          <span>Back</span>
        </button>
        <div className="countryInfo">
          <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
          <div className="countryDetails">
            <h1>{country.name.common}</h1>
            <div>
            <p>
              <b>Region:</b> {country.region}
            </p>
            <p>
              <b>Population:</b> {country.population.toLocaleString()}
            </p>
            <p>
              <b>Capital:</b>{" "}
              {country.capital ? country.capital[0] : "No capital"}
            </p>
            <p>
              <b>Subregion:</b> {country.subregion}
            </p>
            <p>
              <b>Native name:</b> {country.name.official}
            </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default OneCountry;