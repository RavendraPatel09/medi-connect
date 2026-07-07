import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import Dashboard from "./pages/Dashboard";
import UploadMedicine from "./pages/UploadMedicine";
import "./index.css";

const queryClient = new QueryClient();

const PageWrapper = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
    className="w-full h-full"
  >
    {children}
  </motion.div>
);
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Dashboard /></PageWrapper>} />
        <Route path="/upload" element={<PageWrapper><UploadMedicine /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};
function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
            <AnimatedRoutes />
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
