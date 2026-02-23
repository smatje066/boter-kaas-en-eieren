import { useState } from "react";

const winningCombinations = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // columns
  [0,4,8],[2,4,6] // diagonals
];

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (idx) => {
    if (board[idx] || winner) return;
    const newBoard = board.slice();
    newBoard[idx] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    const win = calculateWinner(newBoard);
    if (win) setWinner(win);
    setXIsNext(!xIsNext);
  };

  const calculateWinner = (squares) => {
    for (const combo of winningCombinations) {
      const [a,b,c] = combo;
      if (squares[a] && squares[a]===squares[b] && squares[a]===squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const renderSquare = (i) => (
    <button
      onClick={() => handleClick(i)}
      className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 flex items-center justify-center text-2xl md:text-3xl lg:text-4xl border border-gray-400"
    >
      {board[i]}
    </button>
  );

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">🎮 Boter Kaas en Eieren</h2>
      {winner ? (
        <p className="text-lg font-medium mb-2">Winner: {winner}</p>
      ) : (
        <p className="text-lg mb-2">Next: {xIsNext ? "X" : "O"}</p>
      )}
      <div className="grid grid-cols-3 gap-1">
        {Array.from({length:9}).map((_,i) => renderSquare(i))}
      </div>
      <button onClick={resetGame} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
        Reset
      </button>
    </div>
  );
}
