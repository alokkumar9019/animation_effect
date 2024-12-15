import React, { useEffect, useState, useCallback } from 'react';
import './Grid.css';

const rows = 15;
const cols = 20;

function Grid() {
  const [subgridColor, setSubgridColor] = useState([0, 0, 255]);

  const createRaindrop = useCallback((col) => {
    const subgrid = document.createElement('div');
    subgrid.style.position = 'absolute';
    subgrid.style.left = `${col * 31}px`;
    subgrid.style.top = '-150px';
    subgrid.style.width = '30px';
    subgrid.style.height = '150px';
    subgrid.classList.add('falling');

    for (let i = 0; i < 5; i++) {
      const subgridCell = document.createElement('div');
      subgridCell.classList.add('subgrid-cell');
      const intensity = i/4;
      let red = Math.floor(subgridColor[0] * intensity);
      let green = Math.floor(subgridColor[1] * intensity);
      let blue = Math.floor(subgridColor[2] * intensity);
      subgridCell.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
      subgridCell.style.top = `${i * 30}px`;
      subgrid.appendChild(subgridCell);
    }

    const gridContainer = document.getElementById('grid-container');
    gridContainer.appendChild(subgrid);

    setTimeout(() => {
      gridContainer.removeChild(subgrid);
    }, 2000);
  }, [subgridColor]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomColumn = Math.floor(Math.random() * cols);
      createRaindrop(randomColumn);
    }, 200);

    return () => clearInterval(intervalId);
  }, [createRaindrop]); 

  useEffect(() => {
    const colorIntervalId = setInterval(() => {
      setSubgridColor([
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
      ]);
    }, 4000);

    return () => clearInterval(colorIntervalId);
  }, []);

  const gridItems = Array(rows * cols).fill(null);

  return (
    <div id="grid-container" className="grid-container">
      {gridItems.map((_, index) => (
        <div key={index} className="grid-item"></div>
      ))}
    </div>
  );
}

export default Grid;
