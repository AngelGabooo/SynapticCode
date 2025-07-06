import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage';
import Planes from './components/organisms/Planes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/planes" element={<Planes />} />
      </Routes>
    </Router>
  );
}

export default App;