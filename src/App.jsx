// App.jsx
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Homepage } from './pages/Homepage';
import { Favoritepage } from './pages/favoritepage';

function App() {
  return (
    <div>
      {/* Define the routes for the app */}
      <Routes>
        {/* Route for the homepage */}
        <Route path="/" element={<Homepage />} />
        {/* Route for the favorites page */}
        <Route path="/favorites" element={<Favoritepage />} />
      </Routes>
    </div>
  );
}

export default App;

