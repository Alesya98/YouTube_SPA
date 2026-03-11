import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideo } from "./api/VideoAPI";
import { VideoList } from "./VideoList";
import { HeartOutlined } from "@ant-design/icons";
import { useSearchParams } from "react-router-dom";
import { ModalFavorites } from "./ModalFavorites";
import { closeModal, modalSelector, openModal } from "./redux/modalSlice";
import { videoSelector } from "./redux/videoSlice";

export const SearchVideo = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const inputFocus = useRef(null);
  const { isSearched } = useSelector(videoSelector);
  const { isOpen } = useSelector(modalSelector);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const count = searchParams.get("maxResults") || "";
  const sort = searchParams.get("order") || "";

  useEffect(() => {
    if (query) { 
      dispatch(getVideo({ query, count, sort }));
      if (query !== search) {
        setSearch(query)
      }
      setSearchParams({})
     
    } 
  }, [query, count, sort, dispatch, setSearchParams]);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);

  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearchClick();
    }
  };

  const onSearchClick = () => {
    if (search.trim()) {
      dispatch(getVideo({ query: search }));
    }
  };

  const onFavorites = () => {
    if (search.trim()) {
      dispatch(openModal(search));
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay" onClick={() => dispatch(closeModal())}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <ModalFavorites />
          </div>
        </div>
      )}
      <div className="section-search ">
        <h2 className="search-title">Поиск видео</h2>
        <div className="search-block">
          <div className="search-favorites">
            <input
              ref={inputFocus}
              className="input-search"
              type="text"
              value={search}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
              placeholder="Поиск видео..."
            />
            <button className="btn-favorites" onClick={onFavorites}>
              <HeartOutlined />
            </button>
          </div>
          <button className="search-btn" onClick={onSearchClick}>
            Найти
          </button>
        </div>
        {isSearched && <VideoList />}
      </div>
    </>
  );
};
