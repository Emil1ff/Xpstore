import React, { useState, useEffect, useRef } from "react";
import "./custom.css";

const CustomSlider = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);

  const contentRef = useRef(null);
  const targetPosition = useRef(4);
  const scrollPosition = useRef(0);
  const targetVelocity = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleTouchMove = (event) => {
      setMousePos({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
    };

    const handleMouseDown = (event) => {
      setIsMouseDown(true);
      setLastMousePos({ x: event.clientX, y: event.clientY });
    };

    const handleTouchStart = (event) => {
      setIsMouseDown(true);
      setLastMousePos({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
    };

    const handleMouseUp = () => setIsMouseDown(false);
    const handleTouchEnd = () => setIsMouseDown(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const frame = () => {
      animationFrameRef.current = requestAnimationFrame(frame);
      const contentEl = contentRef.current;
      if (!contentEl) return;

      if (isMouseDown) {
        const rect = contentEl.getBoundingClientRect();
        targetVelocity.current =
          (-1 * (mousePos.x - lastMousePos.x)) / rect.width;
        setLastMousePos(mousePos);
        targetPosition.current += targetVelocity.current;
        scrollPosition.current =
          scrollPosition.current * 0.8 + targetPosition.current * 0.2;
      } else {
        const snappingPosition = Math.min(
          Math.max(0, Math.round(targetPosition.current)),
          8
        );
        const snappingForce = 0.05;
        targetVelocity.current +=
          (snappingPosition - targetPosition.current) * snappingForce;
        targetVelocity.current *= 0.8; // Damping
        targetPosition.current += targetVelocity.current;
        scrollPosition.current =
          scrollPosition.current * 0.9 + targetPosition.current * 0.1;
      }

      contentEl.style.setProperty("--scroll", scrollPosition.current);
      contentEl.querySelectorAll("section").forEach((el) => {
        const relativePosition =
          parseInt(getComputedStyle(el).getPropertyValue("--position")) -
          scrollPosition.current;
        el.style.setProperty(
          "--relPosition",
          Math.sign(relativePosition) * Math.abs(relativePosition) ** 0.75
        );
      });
    };

    animationFrameRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animationFrameRef.current);
  }, [mousePos, lastMousePos, isMouseDown]);

  return (
    <div className="custom-swiper">
      <div className="content" ref={contentRef}>
        <section id="hiking" style={{ "--position": 0 }}>
          <div className="image"></div>
          <div className="title">Hiking</div>
          <div className="button">Book now</div>
        </section>
        <section id="camping" style={{ "--position": 1 }}>
          <div className="image"></div>
          <div className="title">Camping</div>
          <div className="button">Book now</div>
        </section>
        <section id="stargazing" style={{ "--position": 2 }}>
          <div className="image"></div>
          <div className="title">Stargazing</div>
          <div className="button">Book now</div>
        </section>
        <section id="hiking" style={{ "--position": 3 }}>
          <div className="image"></div>
          <div className="title">Hiking</div>
          <div className="button">Book now</div>
        </section>
        <section id="camping" style={{ "--position": 4 }}>
          <div className="image"></div>
          <div className="title">Camping</div>
          <div className="button">Book now</div>
        </section>
        <section id="camping" style={{ "--position": 5 }}>
          <div className="image"></div>
          <div className="title">Camping</div>
          <div className="button">Book now</div>
        </section>
        <section id="camping" style={{ "--position": 6 }}>
          <div className="image"></div>
          <div className="title">Camping</div>
          <div className="button">Book now</div>
        </section>
        <section id="camping" style={{ "--position": 7 }}>
          <div className="image"></div>
          <div className="title">Camping</div>
          <div className="button">Book now</div>
        </section>
        <section id="stargazing" style={{ "--position": 8 }}>
          <div className="image"></div>
          <div className="title">Stargazing</div>
          <div className="button">Book now</div>
        </section>
      </div>
    </div>
  );
};

export default CustomSlider;
