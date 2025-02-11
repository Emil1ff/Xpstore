import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "./detail.css";

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((data) => {
        setGame(data);
      })
      .catch((error) => console.error("Error fetching game details:", error));
  }, [id]);

  if (!game) return <p className="loading">Loading...</p>;

  return (
    <div className="game-detail">
      <div
        className="background"
        style={{ backgroundImage: `url(${game.image || "default-image.jpg"})` }}
      ></div>
      <div className="content">
        <div className="game-header">
          <img src={game.image} alt="" />
          <div className="content-body">
            <h1>{game.name || "No Name"}</h1>
            <p className="category">{game.category || "No Category"}</p>
            <p className="descr">{game.descr || "No description available"}</p>
            <span className="price">${game.price || "0.00"}</span>
          <button className="buy-btn">Buy Now</button>
          </div>
        </div>

        {game.media && game.media.length > 0 && (
          <div className="carousel-container">
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              effect="coverflow"
              navigation
              loop={true}
              slidesPerView={3}
              spaceBetween={30}
              centeredSlides={true}
              coverflowEffect={{
                rotate: 30,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: true,
              }}
              className="swiper-container"
            >
              {game.media.map((item, index) => (
                <SwiperSlide key={index} className="carousel-slide">
                  <img
                    src={item}
                    alt={`Screenshot ${index + 1}`}
                    className="carousel-image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        <div className="buttons">
          <Link to="/" className="back-btn">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
