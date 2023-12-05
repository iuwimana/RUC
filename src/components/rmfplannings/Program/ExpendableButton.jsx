import React from "react";

export const ExpendableButton = ({ isOpen, toggle }) => {
  return (
    <button onClick={toggle}>
      <span
        className="material-symbols-outlined"
        style={{
          transform: `rotate(${isOpen ? 180 : 0}deg)`,
          transition: "all 0.25s",
          height: 65,
          width: 85,
          backgroundcolor: "white",
        }}
      >
        expand_more
      </span>
    </button>
  );
};
