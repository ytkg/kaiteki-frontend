import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import DashboardPage from './pages/DashboardPage';
import RemotePage from './pages/RemotePage';
import DataPage from './pages/DataPage';

const AppContent = () => {
  const location = useLocation();
  const isRemotePage = location.pathname === '/remote';

  const mainClassName = `flex-grow px-4 pt-20 pb-20 ${
    isRemotePage ? 'flex items-center justify-center' : ''
  }`;

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className={mainClassName}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/remote" element={<RemotePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
