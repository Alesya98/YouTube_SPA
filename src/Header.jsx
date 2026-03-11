import { NavLink } from "react-router-dom";
import { LoginOut } from "./LoginOut";
import logo from "./assets/logo.svg";

export const Header = () => {
  return (
    <header className="header">
      <a href="#">
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
