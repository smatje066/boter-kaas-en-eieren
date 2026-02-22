import TicTacToe from "./components/TicTacToe";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 bg-white rounded shadow-md">
        <TicTacToe />
      </div>
    </div>
  );
}

export default App;
