import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Countries from './pages/countries/Countries'
function App() {
  const [API, setAPI] = useState('https://restcountries.com/v3.1/all')
  const [countries, setCountries] = useState([])
  const getData = async (api) => {
    const req = await fetch(api)
    const data = await req.json()
    setCountries(data)
  }
  useEffect(()=>{
    getData(API)
  },[])
  const [mode, setMode] = useState(false)
  const [modeImg, setModeImg] = useState('/ligtMode.svg')
  const [search, setSearch] = useState('/lightSearch.svg')
  const [continents, setContinents] = useState(["All","Africa","Antarctic","Asia","Europe", "Americas","Oceania"])
  const [continentBtn, setContinentBtn] = useState(false)
  const [continentIndex, setContinentIndex] = useState(0)
  const changeMode = () => {
    setMode(!mode)
    if(mode){
      setSearch('/lightSearch.svg')
      setModeImg('/lightMoon.svg')
    }else{
      setSearch('/darkSearch.svg')
      setModeImg('/darkMoon.svg')
    }
  }
  const selectBtn = () => {
    setContinentBtn(!continentBtn)
  }
  const continentFilter = (index) => {
    setContinentIndex(index);
    const filterCountries = countries.filter((country) => {
      switch(continents[index]){
        case 'All': return country.region != "All"
        case 'Africa': return country.region == "Africa"
        case 'Antarctic': return country.region == "Antarctic"
        case 'Asia': return country.region == "Asia"
        case 'Europe': return country.region == "Europe"
        case 'Americas': return country.region == "Americas"
        case 'Oceania': return country.region == "Oceania"
      }
    });
    console.log(filterCountries);
  };  
  return (
    <div className={mode?'body dark':'body'}>
    <BrowserRouter>
    <Navbar changeMode={changeMode} modeImg={modeImg}/>
    <Routes>
      <Route path='/' element={<Countries countries={countries} continentIndex={continentIndex} continentBtn={continentBtn} selectBtn={selectBtn} search={search} continents={continents} continentFilter={continentFilter}/>}/>
    </Routes>
    </BrowserRouter>
    </div>
  )
}
export default App