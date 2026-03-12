import { NavLink, useNavigate } from "react-router-dom";
import { LoginOut } from "./LoginOut";
import logo from "../assets/logo.svg";

export const Header = () => {
  const navigate = useNavigate()
  const token = localStorage.getItem('token')

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (token) {
      navigate('/searchvideo')
    } else {
      navigate('/login')
    }
  }

  return (
    <header className="header">
      <a href="/" onClick={handleLogoClick}>
        <img className="logo-header" src={logo} alt="logo" />
      </a>

      <nav className="nav-link">
        <NavLink className="link link-search" to="/searchvideo">
          Поиск
        </NavLink>
        <NavLink className="link link-favorite" to="/favorites">
          Избранное
        </NavLink>
      </nav>
      <LoginOut />
    </header>
  );
};
