import { NavLink } from 'react-router-dom'
import './Navbar.css'
function Navbar({changeMode, modeImg}) {
  return (
    <nav>
        <div className="container">
            <NavLink>Where in the world?</NavLink>
            <button onClick={()=>changeMode()}><img src={modeImg} alt="" /><span>Change mode</span></button>
        </div>
    </nav>
  )
}
export default Navbar