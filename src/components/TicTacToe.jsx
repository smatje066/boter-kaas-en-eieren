import { useState } from "react";

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [isDraw, setIsDraw] = useState(false);

  const calculateWinner = (squares) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { player: squares[a], line: combo };
      }
    }
    return null;
  };

  const handleClick = (idx) => {
    if (board[idx] || winner) return;

    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);

    const result = calculateWinner(newBoard);
    if (result) {
      setWinner(result.player);
      setWinningLine(result.line);
    } else if (!newBoard.includes(null)) {
      setIsDraw(true);
    }

    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
    setWinningLine([]);
    setIsDraw(false);
  };

  const getSquareClass = (idx) => {
    const classes = ["square"];
    const value = board[idx];
    
    if (winningLine.includes(idx)) {
      classes.push("winning");
    } else if (value === "X") {
      classes.push("x");
    } else if (value === "O") {
      classes.push("o");
    }
    
    return classes.join(" ");
  };

  return (
    <div className="game-container">
      {/* Title */}
      <div className="title-section">
        <h1 className="title">Boter, Kaas & Eieren</h1>
        <p className="subtitle">Het klassieke spel voor jong en oud</p>
      </div>

      {/* Status */}
      <div className="status-box">
        {winner ? (
          <div className="winner-display">
            <span className="trophy">🏆</span>
            <span className="winner-text">Speler {winner} wint!</span>
          </div>
        ) : isDraw ? (
          <div className="draw-display">🤝 Gelijkspel!</div>
        ) : (
          <div className="status-content">
            <span className="status-label">Aan zet:</span>
            <span className={`status-player ${xIsNext ? 'x' : 'o'}`}>
              {xIsNext ? '✕ Speler X' : '○ Speler O'}
            </span>
          </div>
        )}
      </div>

      {/* Game Board */}
      <div className="game-board">
        {board.map((square, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            disabled={!!square || !!winner}
            className={getSquareClass(idx)}
          >
            {square === "X" ? "✕" : square === "O" ? "○" : ""}
          </button>
        ))}
      </div>

      {/* Reset Button */}
      <button onClick={resetGame} className="reset-button">
        <span className="reset-icon">🔄</span>
        <span>Opnieuw Spelen</span>
      </button>
    </div>
  );
}
