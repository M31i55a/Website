import React from "react";
import "./styles.css"; // Assuming the styles are saved in a 'styles.css' file

const NavBlockOk = ({ navText, dotColor, barColor }) => {
  return (
    <div className="nav_block_ok">
      <div className="nav_ok">
        <div className="dot_block" style={{ backgroundColor: dotColor }}></div>
        <div className="bar_block" style={{ backgroundColor: barColor }}></div>
      </div>
      <div className="nav_link">{navText}</div>
    </div>
  );
};

export default NavBlockOk;