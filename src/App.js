import React, { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home';
import Detail from './pages/Details/Detail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
