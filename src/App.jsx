import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Countries from './pages/countries/Countries';
import OneCountry from './pages/oneCountry/OneCountry';
function App() {
  const [API, setAPI] = useState('https://restcountries.com/v3.1/all');
  const [countries, setCountries] = useState([]);
  const [countriesBase, setCountriesBase] = useState([]);
  const [mode, setMode] = useState(localStorage.getItem('mode') == 'dark');
  const modeIcon = mode ? '/darkMoon.svg' : '/lightMoon.svg';
  const searchIcon = mode ? '/darkSearch.svg' : '/lightSearch.svg';
  const [continents, setContinents] = useState([
    'All',
    'Africa',
    'Antarctic',
    'Asia',
    'Europe',
    'Americas',
    'Oceania',
  ]);
  const [continentIndex, setContinentIndex] = useState(0);
  const [openSelect, setOpenSelect] = useState(false);
  const getData = async (api) => {
    const req = await fetch(api);
    const data = await req.json();
    setCountries(data);
    setCountriesBase(data);
  };
  const changeMode = () => {
    setMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('mode', newMode ? 'dark' : 'light');
      return newMode;
    });
  };
  const searchFunction = (name) => {
    const searchCountries = countries.filter((country) => {
      return (
        country.name.common.toLowerCase().includes(name.toLowerCase().trim()) &&
        (continents[continentIndex] === 'All' || country.region === continents[continentIndex])
      );
    });
    setCountriesBase(searchCountries);
  };
  const selectOpenFunction = () => {
    setOpenSelect(!openSelect);
  };
  const selectFunction = (index) => {
    setContinentIndex(index);
    const selectCountries = countries.filter((country) => {
      return continents[index] == 'All' || country.region == continents[index];
    });
    setCountriesBase(selectCountries);
  };
  useEffect(() => {
    getData(API);
  }, [API]);
  return (
    <div className={mode ? 'body dark' : 'body'}>
      <BrowserRouter>
        <Navbar changeMode={changeMode} modeImg={modeIcon} />
        <Routes>
          <Route
            path="/"
            element={
              <Countries
                countriesBase={countriesBase}
                searchFunction={searchFunction}
                search={searchIcon}
                continents={continents}
                selectFunction={selectFunction}
                selectOpenFunction={selectOpenFunction}
                openSelect={openSelect}
                continentIndex={continentIndex}
              />
            }
          />
          <Route path='/oneCountry/:name' element={<OneCountry countriesBase={countriesBase}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;