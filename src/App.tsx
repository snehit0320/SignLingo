import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignToText from './pages/SignToText';
import TextToSign from './pages/TextToSign';
import Login from './pages/Login';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-to-text" element={<SignToText />} />
            <Route path="/text-to-sign" element={<TextToSign />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </AnimatePresence>
        <Chatbot />
        <Footer />
      </div>
    </Router>
  );
}

export default App;