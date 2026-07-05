import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-background text-gray-100">
        <aside className="w-64 border-r border-white/5 bg-surface/50 p-6 backdrop-blur-xl">
          <div className="mb-8 flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">MediCycle Admin</span>
          </div>
          <nav className="space-y-2">
            <a href="/" className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              Users
            </a>
            <a href="#" className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              Medicines
            </a>
            <a href="#" className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors">
              Reports
            </a>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
