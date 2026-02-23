import { useState, useEffect } from "react";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // columns
  [0, 4, 8],
  [2, 4, 6], // diagonals
];

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [scores, setScores] = useState({ X: 0, O: 0, ties: 0 });
  const [isDraw, setIsDraw] = useState(false);

  const calculateWinner = (squares) => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
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
      setScores((prev) => ({
        ...prev,
        [result.player]: prev[result.player] + 1,
      }));
    } else if (!newBoard.includes(null)) {
      setIsDraw(true);
      setScores((prev) => ({ ...prev, ties: prev.ties + 1 }));
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

  const getSquareStyle = (idx) => {
    const isWinning = winningLine.includes(idx);
    const baseStyle =
      "w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-3xl md:text-4xl font-bold rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg ";

    if (isWinning) {
      return baseStyle + "bg-gradient-to-br from-yellow-400 to-orange-500 text-white scale-110 shadow-yellow-400/50 shadow-2xl animate-pulse";
    }

    const value = board[idx];
    if (value === "X") {
      return baseStyle + "bg-gradient-to-br from-blue-500 to-blue-700 text-white shadow-blue-500/30";
    }
    if (value === "O") {
      return baseStyle + "bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-rose-500/30";
    }

    return baseStyle + "bg-gradient-to-br from-slate-700 to-slate-800 text-slate-400 hover:from-slate-600 hover:to-slate-700 cursor-pointer";
  };

  const getCurrentPlayerEmoji = () => {
    return xIsNext ? "❌" : "⭕";
  };

  return (
    <div className="flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-rose-400 text-transparent bg-clip-text mb-2">
          🎮 Boter Kaas en Eieren
        </h1>
        <p className="text-slate-400 text-sm">Het klassieke spel</p>
      </div>

      {/* Score Board */}
      <div className="flex gap-4 mb-6 p-4 bg-slate-800/50 rounded-2xl backdrop-blur-sm">
        <div className="text-center px-4 py-2 bg-blue-500/20 rounded-xl border border-blue-500/30">
          <div className="text-2xl font-bold text-blue-400">{scores.X}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Speler X</div>
        </div>
        <div className="text-center px-4 py-2 bg-slate-700/30 rounded-xl border border-slate-600/30">
          <div className="text-2xl font-bold text-slate-300">{scores.ties}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Gelijk</div>
        </div>
        <div className="text-center px-4 py-2 bg-rose-500/20 rounded-xl border border-rose-500/30">
          <div className="text-2xl font-bold text-rose-400">{scores.O}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wider">Speler O</div>
        </div>
      </div>

      {/* Status */}
      <div className="mb-6">
        {winner ? (
          <div className="flex items-center gap-2 text-xl md:text-2xl font-bold animate-bounce">
            <span className="text-yellow-400">🏆</span>
            <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text">
              {winner} wint!
            </span>
          </div>
        ) : isDraw ? (
          <div className="text-xl md:text-2xl font-bold text-slate-400">
            🤝 Gelijkspel!
          </div>
        ) : (
          <div className="flex items-center gap-3 text-lg">
            <span className="text-slate-400">Aan zet:</span>
            <span className="text-2xl">{getCurrentPlayerEmoji()}</span>
            <span className={xIsNext ? "text-blue-400 font-bold" : "text-rose-400 font-bold"}>
              {xIsNext ? "Speler X" : "Speler O"}
            </span>
          </div>
        )}
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-3 p-4 bg-slate-800/30 rounded-2xl backdrop-blur-sm border border-slate-700/50">
        {board.map((square, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            disabled={square || winner}
            className={getSquareStyle(idx)}
          >
            {square === "X" && <span className="drop-shadow-lg">✕</span>}
            {square === "O" && <span className="drop-shadow-lg">○</span>}
          </button>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="mt-8 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:from-emerald-400 hover:to-teal-500 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2"
      >
        <span>🔄</span> Nieuw Spel
      </button>
    </div>
  );
}
