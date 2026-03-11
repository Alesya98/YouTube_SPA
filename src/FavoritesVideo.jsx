import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FavoritesButton } from "./ButtonFavorites";
import { selectorFavorite } from "./redux/favoritesSlice";

export const FavoritesVideo = () => {
  const items = useSelector(selectorFavorite);
  const navigate = useNavigate();

  const handleFavoriteClick = (item) => {
    navigate(
      `/searchVideo?q=${item.query}&maxResults=${item.sliderValue}&order=${item.sort}`,
    );
  };

  return (
    <div className="favorite-section">
      <h2 className="favorite-title">Избранное</h2>
      <div className="favorite-list">
        {items.map((item) => (
          <div
            key={item.id}
            className="favorite-item"
            onClick={() => handleFavoriteClick(item)}
          >
            <p className="favorite-text">{item.query}</p>

            <FavoritesButton item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
