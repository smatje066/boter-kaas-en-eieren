import TicTacToe from "./components/TicTacToe";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="p-6 md:p-8 bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-slate-700/50 max-w-lg w-full">
        <TicTacToe />
      </div>
    </div>
  );
}

export default App;
