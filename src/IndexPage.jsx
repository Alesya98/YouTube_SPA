import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const IndexPage = () => {
  return (
    <div className="main">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
