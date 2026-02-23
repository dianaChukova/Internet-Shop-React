import React from 'react';
import ShopApp from './components/Shop';
import CartApp from './components/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'; 

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ShopApp />} /> 
          <Route path="/cart" element={<CartApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

