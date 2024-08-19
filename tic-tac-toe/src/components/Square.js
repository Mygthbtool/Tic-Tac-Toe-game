// src/components/Square.js
import React from 'react';
import './Square.css'; // Optional: Include this if you want to add custom styles

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
