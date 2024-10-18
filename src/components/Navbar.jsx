import { NavLink } from "react-router-dom"
import "./Navbar.css"

const Navbar = () => {
  return (
    <header className="header">
      <div className="Logo">
        <NavLink to="/">Vaibhav</NavLink>
      </div>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/services">services</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
          <li><NavLink to="/register">Register</NavLink></li>

        </ul>
      </nav>
    </header>
  )
}

export default Navbar