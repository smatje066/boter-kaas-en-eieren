import TicTacToe from "./components/TicTacToe";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 flex items-center justify-center p-4">
      <div className="p-6 md:p-8 bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 max-w-2xl w-full">
        <TicTacToe />
      </div>
    </div>
  );
}

export default App;
