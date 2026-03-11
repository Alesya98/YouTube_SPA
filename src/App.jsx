import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Login } from "./Login";
import { PrivateRoute } from "./PrivateRouter";
import { IndexPage } from "./IndexPage";
import { FavoritesVideo } from "./FavoritesVideo";
import { SearchPage } from "./SearchPage";

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
