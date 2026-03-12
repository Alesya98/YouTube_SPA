import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/router/PrivateRouter";
import { FavoritesVideo } from "./pages/FavoritesVideo";
import { SearchPage } from "./pages/SearchPage";
import { IndexPage } from "./pages/IndexPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/searchvideo" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route element={<PrivateRoute />}>
          <Route element={<IndexPage />}>
            <Route path="/searchvideo" element={<SearchPage />} />
            <Route path="/favorites" element={<FavoritesVideo />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
