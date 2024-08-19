// src/App.js
import React from 'react';
import Board from './components/Board';
import './App.css'; // Optional: Include this if you want to add custom styles

function App() {
  return (
    <div className="App">
      <h1>Tic-Tac-Toe</h1>
      <Board />
    </div>
  );
}

export default App;
