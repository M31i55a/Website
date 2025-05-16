import React, { useEffect } from "react";
import "./DynamicBackground.css"; // External CSS file for styles
// import { div } from "three/tsl";

const DynamicBackground = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty("--x", e.clientX + "px");
      document.documentElement.style.setProperty("--y", e.clientY + "px");
    };

    document.documentElement.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.documentElement.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed" >
        <section>
            <h2 className="light0"></h2>
            <h2 className="dark"></h2>
            <div className="light"></div>
        </section>
    </div>
  );
};

export default DynamicBackground;