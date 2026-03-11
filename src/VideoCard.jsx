//отдельный элемнет с превью, названием и описанием видео

export const VideoCard = ({ card, viewType }) => {
  return (
    <>
      <div className={viewType ? "grid-card" : "flex-card"}>
        <img
          src={card.snippet.thumbnails.medium.url}
          alt={card.snippet.title}
        />
        <div className="card-content">
          <h3>{card.snippet.title}</h3>
          <p>{card.snippet.channelTitle}</p>
          <p style={{ color: "#c8c1c1" }}>
            {card.statistics.viewCount} просмотров
          </p>
        </div>
      </div>
    </>
  );
};
