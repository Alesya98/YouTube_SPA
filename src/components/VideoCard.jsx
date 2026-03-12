import { CaretRightOutlined } from "@ant-design/icons";

export const VideoCard = ({ card, viewType }) => {
  const videoURL = `https://youtube.com/watch?v=${card.id}`;

  return (
    <>
      <div
        className={viewType ? "grid-card" : "flex-card"}
      >
        <a href={videoURL} target="_blank">
          <div className='video-wrapper'>
          <img style={{display: 'block', width: "100%"}}
            src={card.snippet.thumbnails.medium.url}
            alt={card.snippet.title}
          />
          
          <div className="video-play">
            <CaretRightOutlined />
          </div>
           
          <div className="card-content">
            <h3>{card.snippet.title}</h3>
            <p>{card.snippet.channelTitle}</p>
            <p style={{ color: "#c8c1c1" }}>
              {card.statistics.viewCount} просмотров
            </p>
            </div>
         </div>
        </a>
      </div>
    </>
  );
};
