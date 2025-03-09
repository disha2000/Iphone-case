import { useState, useEffect, useRef } from "react";

const SPEEDS = ["12s", "14s", "10s", "13s", "15s"];

const FogEffect = ({ position }) => (
  <div
    style={{
      position: "absolute",
      width: "100%",
      height: "200px",
      background:
        position === "top"
          ? "linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(255, 255, 0, 0))"
          : "linear-gradient(to top, rgba(255, 255, 255, 1), rgba(255, 255, 0, 0))",
      pointerEvents: "none",
      zIndex: 10,
      filter: "blur(20px)",
      opacity: 1,
      [position]: 0,
    }}
  />
);

const ReviewColumn = ({ phones = [], index, columnCount }) => {
  const duration = SPEEDS[index % columnCount];

  return (
    <div className="review-column">
      <div className="review-content" style={{ "--duration": duration }}>
        {[...phones, ...phones].map((src, idx) => (
          <div className="testimonial w-9/12 lg:w-[250px]" key={idx}>
            <div className="relative w-full">
              <img className="absolute" src="/phone-template-white-edges.png" alt="Phone" />
              <img src={src} alt="Testimonial" />
            </div>
          </div>
        ))}
      </div>
      <FogEffect position="top" />
      <FogEffect position="bottom" />
    </div>
  );
};

const ReviewMotion = () => {
  const containerRef = useRef(null);
  const [columnCount, setColumnCount] = useState(3);

  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width >= 1024) setColumnCount(3); // Large screens
      else if (width >= 768) setColumnCount(2); // Tablets
      else setColumnCount(1); // Mobile
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const phoneGroups = [
    ["/testimonials/1.jpg", "/testimonials/2.jpg"],
    ["/testimonials/3.jpg", "/testimonials/5.jpg"],
    ["/testimonials/4.jpg", "/testimonials/6.jpg"],
  ];

  return (
    <div ref={containerRef} className="h-screen flex justify-center items-center overflow-hidden">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 h-full gap-3 place-content-center">
        {phoneGroups.slice(0, columnCount).map((phoneGroup, index) => (
          <ReviewColumn key={index} phones={phoneGroup} index={index} columnCount={columnCount} />
        ))}
      </div>
    </div>
  );
};

export default ReviewMotion;
