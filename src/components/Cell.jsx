import React from "react";
import "./Cell.css";

export default function Cell({ lives, setLives, ind }) {
  return (
    <div
      onClick={(e) => {
        const lifeArray = [...lives];
        lifeArray[ind] = !lifeArray[ind];
        setLives(lifeArray);
      }}
      className={lives[ind] ? "cell alive" : "cell"}
    ></div>
  );
}
