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

  const getSquareStyle = (idx) => {
    const isWinning = winningLine.includes(idx);
    const value = board[idx];
    
    const baseClasses = "w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center text-4xl md:text-5xl font-bold rounded-2xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-inner border-2 ";
    
    if (isWinning) {
      return baseClasses + "bg-yellow-400 border-yellow-300 text-yellow-900 shadow-lg scale-105 animate-pulse";
    }
    
    if (value === "X") {
      return baseClasses + "bg-blue-500/20 border-blue-300 text-blue-500 cursor-default shadow-lg";
    }
    
    if (value === "O") {
      return baseClasses + "bg-red-500/20 border-red-300 text-red-500 cursor-default shadow-lg";
    }
    
    return baseClasses + "bg-white/80 border-white/30 text-slate-400 cursor-pointer hover:bg-white hover:shadow-xl backdrop-blur-sm";
  };

  return (
    <div className="flex flex-col items-center w-full max-w-lg mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 text-transparent bg-clip-text mb-2">
          Boter, Kaas & Eieren
        </h1>
        <p className="text-slate-500 text-base">Het klassieke spel voor jong en oud</p>
      </div>

      {/* Status */}
      <div className="mb-6 p-4 bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 min-w-[280px]">
        {winner ? (
          <div className="flex items-center justify-center gap-2 text-xl font-bold animate-bounce">
            <span className="text-yellow-500 text-2xl">🏆</span>
            <span className="text-yellow-600">
              Speler {winner} wint!
            </span>
          </div>
        ) : isDraw ? (
          <div className="text-xl font-bold text-slate-500 text-center">
            🤝 Gelijkspel!
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 text-lg">
            <span className="text-slate-600">Aan zet:</span>
            <span className={`font-bold ${xIsNext ? "text-blue-500" : "text-red-500"}`}>
            {xIsNext ? (
              <span className="flex items-center gap-2">
                <span className="text-blue-500 text-2xl">✕</span> Speler X
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <span className="text-red-500 text-2xl">○</span> Speler O
              </span>
            )}
            </span>
          </div>
        )}
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-3 p-5 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/30">
        {board.map((square, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            disabled={!!square || !!winner}
            className={getSquareStyle(idx)}
          >
            {square}
          </button>
        ))}
      </div>

      {/* Reset Button */}
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2"
      >
        <span className="text-xl">🔄</span>
        <span>Opnieuw Spelen</span>
      </button>
    </div>
  );
}
