import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CareerPaths from '../components/CareerPaths';
import Resources from '../components/Resources';
import Footer from '../components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <CareerPaths />
        <Resources />
      </main>
      <Footer />
    </div>
  );
}

export default App;