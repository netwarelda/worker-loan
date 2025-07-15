import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './pages/DashboardLayout';
import Workers from './pages/Workers';
import Report from './pages/Report';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />} />
        <Route path="/workers" element={<Workers />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;