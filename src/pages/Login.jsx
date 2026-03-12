import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";

const LOGIN_URL = import.meta.env.VITE_LOGIN_URL;

export const Login = () => {
  const navigate = useNavigate();

  const [dataUp, setDataUp] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataUp({
      ...dataUp,
      [name]: value,
    });
  };

  const handleAutorizete = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${LOGIN_URL}/auth/login`, {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dataUp),
          },
        );
        if (!response.ok) {
            alert('Неверный логин или пароль')
            return
        }

        const data = await response.json()
        localStorage.setItem('token', data.token)
        navigate("/searchvideo");
    } catch (error) {
        console.log('Ошибка сети', error)
    }
   
  };

  return (
    <div className="login">
      <a href="#">
        <img className="logo" src={logo} alt="logo" />
      </a>
      <h2>Вход</h2>
      <form className="login-form" onSubmit={handleAutorizete}>
        <div className="form-block">
          <label htmlFor="login">Логин</label>
          <input
            className="form-input"
            type="text"
            id="login"
            value={dataUp.email}
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="form-block">
          <label htmlFor="password">Пароль</label>
          <input
            className="form-input"
            type="password"
            id="password"
            value={dataUp.password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <button className="form-btn btn" type="submit">Войти</button>
      </form>
    </div>
  );
};
