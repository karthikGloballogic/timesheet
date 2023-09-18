import React from "react";
import "./index.css";

const Button = (props) => {
  const { title, background = "#6863f0", type, style, onClick } = props;
  return (
    <button
      className={`button ${type == "bare" ? "bareButton" : "normal"}`}
      style={{ background: background, ...style }}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
