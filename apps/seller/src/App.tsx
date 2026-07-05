import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UploadMedicine from "./pages/UploadMedicine";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-gray-100 flex flex-col">
        <header className="border-b border-white/5 bg-surface/50 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-white">MediCycle Seller</span>
          </div>
          <nav className="flex gap-4 text-sm font-medium">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">Dashboard</a>
            <a href="/upload" className="text-gray-300 hover:text-white transition-colors">Upload Medicine</a>
          </nav>
        </header>
        <main className="flex-1 p-6 relative overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<UploadMedicine />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
