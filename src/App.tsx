import React from 'react';
import Header from "./components/header/header.tsx";
import Board from "./components/board/board.tsx";

function App() {
  return (
    <div className="layout">
      <Header></Header>
      <Board></Board>
    </div>
  );
}

export default App;
