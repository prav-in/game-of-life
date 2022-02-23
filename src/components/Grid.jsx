import React, { useState, useRef } from "react";
import Cell from "./Cell";
import "./Grid.css";

export default function Grid() {
  // hooks
  const [lives, setLives] = useState(Array(900).fill(false));
  const [start, setStart] = useState(false);
  const startRef = useRef(start);

  startRef.current = start;
  // definations
  const cells = Array(900).fill("");

  //functions
  const handleReset = () => {
    setLives(Array(900).fill(false));
  };

  const handleRandom = () => {
    setLives(cells.map((cell) => Math.round(Math.random() * 4) === 1));
  };

  const handleStart = () => {
    if (!startRef.current) {
      return;
    }

    setLives((prevLives) => {
      return getModifiedArray(prevLives).every((l, i) => l === prevLives[i])
        ? prevLives
        : getModifiedArray(prevLives);
    });

    setTimeout(handleStart, 150);
  };

  const getNeighbours = (x, la) => {
    let sum = 0;

    if (la[x - 31]) sum += 1;
    if (la[x - 30]) sum += 1;
    if (la[x - 29]) sum += 1;
    if (la[x - 1]) sum += 1;
    if (la[x + 1]) sum += 1;
    if (la[x + 29]) sum += 1;
    if (la[x + 30]) sum += 1;
    if (la[x + 31]) sum += 1;
    return sum;
  };

  const getModifiedArray = (lives) => {
    let lifeArray = [...lives];

    for (let i = 0; i < 900; i++) {
      const n = getNeighbours(i, lives);
      if (n < 2 || n > 3) lifeArray[i] = false;
      else if (n === 3 && lifeArray[i] === false) lifeArray[i] = true;
    }

    return lifeArray;
  };

  const handleNext = () => {
    setLives(getModifiedArray);
  };

  return (
    <div className="content">
      <div className="grid">
        {cells.map((cell, index) => (
          <Cell key={index} ind={index} setLives={setLives} lives={lives} />
        ))}
      </div>

      <div className="btn-container">
        <button className="btn" onClick={handleReset}>
          Clear
        </button>
        <button className="btn" onClick={handleNext}>
          Next Gen
        </button>
        <button
          className="btn"
          onClick={() => {
            setStart(!start);
            if (!start) {
              startRef.current = true;
              handleStart();
            }
          }}
        >
          {start ? "Stop" : "Start"}
        </button>
        <button className="btn" onClick={handleRandom}>
          Random
        </button>
      </div>
    </div>
  );
}
