import { useNavigate } from "react-router-dom";

export const LoginOut = () => {
  const navigate = useNavigate();

  const hendleLoginOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <button className="btn-out" onClick={hendleLoginOut}>Выйти</button>
    </>
  );
};
