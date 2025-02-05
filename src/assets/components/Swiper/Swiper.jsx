import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./swiper.css"

const Swiper = () => {
  return (
    <div  style={{ width: "80%", margin: "auto", padding: "20px" }}>
      <Swiper
      className="custom"
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true} 
        autoplay={{
          delay: 5000, 
          disableOnInteraction: false,
        }}        
        style={{
          borderRadius: "15px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <SwiperSlide style={slideStyle}>Slide 1</SwiperSlide>
        <SwiperSlide style={slideStyle}>Slide 2</SwiperSlide>
        <SwiperSlide style={slideStyle}>Slide 3</SwiperSlide>
        <SwiperSlide style={slideStyle}>Slide 4</SwiperSlide>
        <SwiperSlide style={slideStyle}>Slide 5</SwiperSlide>
      </Swiper>
    </div>
  );
};

const slideStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "400px",
  background: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)",
  color: "#fff",
  fontSize: "24px",
  fontWeight: "bold",
  borderRadius: "10px",
  textAlign: "center",
};

export default Swiper;
