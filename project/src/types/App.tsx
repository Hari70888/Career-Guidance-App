import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CareerPaths from '../components/CareerPaths';
import Resources from '../components/Resources';
import Footer from '../components/Footer';
import JobOpportunities from '../components/JobOpportunities';
import Login from '../components/Login';
import Signup from '../components/Signup';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/job-opportunities" element={<JobOpportunities />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            {/* other routes */}
          </Routes>
          <Features />
          <CareerPaths />
          <Resources />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;