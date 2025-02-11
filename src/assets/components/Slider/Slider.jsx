import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./slider.css";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";

const Carousel = () => {
  const [items, setItems] = useState([]);
  const [currIndex, setCurrIndex] = useState(Math.floor(items.length / 2));
  const sliderRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const navigate = useNavigate();
  let interval;

  useEffect(() => {
    fetch("https://673a25baa3a36b5a62f0de6a.mockapi.io/New-Games/")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setCurrIndex(Math.floor(data.length / 2));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    resize();
    move(currIndex);
    bindEvents();
    timer();
    return () => clearInterval(interval);
  }, [currIndex]);

  const resize = () => {
    const width = Math.max(window.innerWidth * 0.25, 275);
    const height = window.innerHeight * 0.5;
    const totalWidth = width * items.length;

    if (sliderRef.current) {
      sliderRef.current.style.width = `${totalWidth}px`;
    }

    items.forEach((_, i) => {
      const item = document.querySelectorAll(".carousel__slider__item")[i];
      if (item) {
        item.style.width = `${width - 40}px`;
        item.style.height = `${height}px`;
      }
    });
  };

  const move = (index) => {
    if (index < 1) index = items.length;
    if (index > items.length) index = 1;
    setCurrIndex(index);
    const width = Math.max(window.innerWidth * 0.25, 275);

    items.forEach((_, i) => {
      const item = document.querySelectorAll(".carousel__slider__item")[i];
      const box = item?.querySelector(".item__3d-frame");
      if (i === index - 1) {
        item?.classList.add("carousel__slider__item--active");
        if (box) box.style.transform = "perspective(1200px)";
      } else {
        item?.classList.remove("carousel__slider__item--active");
        if (box)
          box.style.transform = `perspective(1200px) rotateY(${
            i < index - 1 ? 40 : -40
          }deg)`;
      }
    });

    if (sliderRef.current) {
      sliderRef.current.style.transform = `translate3d(${
        index * -width + width / 2 + window.innerWidth / 2
      }px, 0, 0)`;
    }
  };

  const timer = () => {
    clearInterval(interval);
    interval = setInterval(() => {
      move(currIndex + 1);
    }, 4000);
  };

  const prev = () => {
    move(currIndex - 1);
    timer();
  };

  const next = () => {
    move(currIndex + 1);
    timer();
  };

  const bindEvents = () => {
    window.addEventListener("resize", resize);
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    sliderRef.current.style.cursor = "pointer";
  };

  const handleCardClick = (id) => {
    navigate(`/game/${id}`);
    console.log(id);
  };

  return (
    <div className="slider">
      <div className="carousel">
        <div className="carousel__body">
          <div className="carousel__prev" onClick={prev}>
            <GrLinkPrevious />
          </div>
          <div className="carousel__next" onClick={next}>
            <GrLinkNext />
          </div>
          <div
            className="carousel__slider"
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {items.map((val, index) => (
              <div
                key={index}
                className="carousel__slider__item"
                onClick={() => handleCardClick(val.id)}
              >
                <div className="item__3d-frame">
                  <div className="item__3d-frame__box item__3d-frame__box--front">
                    <img src={val.image} alt={val.name} />
                    <div className="card-info">
                      <h1>{val.name}</h1>
                      {/* <p>{val.descr}...</p> */}
                      <span>${val.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
