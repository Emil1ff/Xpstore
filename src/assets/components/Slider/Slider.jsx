import React, { useState, useEffect, useRef } from "react";
import "./slider.css";

const Slider = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [targetPosition, setTargetPosition] = useState(0);
  const [targetVelocity, setTargetVelocity] = useState(0);
  const contentRef = useRef(null);

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
      setLastMousePos({ x: event.touches[0].clientX, y: event.touches[0].clientY });
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
      requestAnimationFrame(frame);
      const contentEl = contentRef.current;

      if (isMouseDown) {
        const rect = contentEl.getBoundingClientRect();
        setTargetVelocity(
          (-1 * (mousePos.x - lastMousePos.x)) / rect.width
        );
        setLastMousePos(mousePos);
        setTargetPosition(targetPosition + targetVelocity);
        setScrollPosition(scrollPosition * 0.8 + targetPosition * 0.2);
      } else {
        const snappingPosition = Math.min(
          Math.max(0, Math.round(targetPosition)),
          8
        );
        const snappingForce = 0.05;
        setTargetVelocity(targetVelocity + (snappingPosition - targetPosition) * snappingForce);
        const damping = 0.8;
        setTargetVelocity(targetVelocity * damping);
        setTargetPosition(targetPosition + targetVelocity);
        setScrollPosition(scrollPosition * 0.9 + targetPosition * 0.1);
      }

      contentEl.style.setProperty("--scroll", scrollPosition);
      contentEl.querySelectorAll("section").forEach((el) => {
        const relativePosition = parseInt(
          getComputedStyle(el).getPropertyValue("--position")
        ) - scrollPosition;

        if (relativePosition > 0) {
          el.style.setProperty(
            "--relPosition",
            relativePosition ** 0.75
          );
        } else if (relativePosition < 0) {
          el.style.setProperty(
            "--relPosition",
            -1 * ((-1 * relativePosition) ** 0.75)
          );
        } else {
          el.style.setProperty("--relPosition", 0);
        }
      });
    };
    frame();
  }, [mousePos, lastMousePos, isMouseDown, targetPosition, targetVelocity, scrollPosition]);

  return (
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
      <section id="stargazing" style={{ "--position": 5 }}>
        <div className="image"></div>
        <div className="title">Stargazing</div>
        <div className="button">Book now</div>
      </section>
      <section id="hiking" style={{ "--position": 6 }}>
        <div className="image"></div>
        <div className="title">Hiking</div>
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
  );
};

export default Slider;
