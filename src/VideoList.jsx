import { VideoCard } from "./VideoCard";
import { UnorderedListOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import { videoSelector } from "./redux/videoSlice";

export const VideoList = () => {
  const { value, currentSearch, total, loading, error } =
    useSelector(videoSelector);
  const [isGrid, setISGrid] = useState(true);

  return (
    <>
      {error && (
        <div style={{ color: "red", border: "1px solid red", padding: "10px" }}>
          <strong>Ошибка API:</strong> {error}
          {error.includes("quotaExceeded") && (
            <p>Лимит запросов исчерпан. Попробуйте завтра.</p>
          )}
        </div>
      )}
      <div className="info-search">
        <div
          style={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>Видео по запросу</p>
          <span style={{ fontWeight: "bold" }}>
            &laquo;{currentSearch}&raquo;
          </span>
          <span
            style={{
              fontSize: "15px",
              fontStyle: "italic",
              color: "#aaa0a0",
            }}
          >
            {total}
          </span>
        </div>

        <div className="card-position">
          <button className="btn-position" onClick={() => setISGrid(false)}>
            <UnorderedListOutlined
              style={{
                fontSize: "20px",
                color: !isGrid ? "#272727" : "#0000004d",
              }}
            />
          </button>
          <button className="btn-position" onClick={() => setISGrid(true)}>
            <AppstoreOutlined
              style={{
                fontSize: "20px",
                color: isGrid ? "#272727" : "#0000004d",
              }}
            />
          </button>
        </div>
      </div>
      <Spin spinning={loading} size="large" />
      <div className={isGrid ? "position-grid" : "position-flex"}>
        {value.map((item) => (
          <VideoCard key={item.id} card={item} viewType={isGrid} />
        ))}
      </div>
    </>
  );
};
