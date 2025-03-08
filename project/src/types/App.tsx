import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import CareerPaths from '../components/CareerPaths';
import Resources from '../components/Resources';
import Footer from '../components/Footer';
import PsychometricTest from '../components/PsychometricTest';
import AssessmentResults from '../components/AssessmentResults';
import { EnhancedAssessmentResults } from '../components/EnhancedAssessmentResults';
import Chart from '../components/Chart';
import JobOpportunities from '../components/JobOpportunities';
import Login from '../components/Login';
import Signup from '../components/Signup';

const sampleResults = [
  { label: 'Result 1', value: 75 },
  { label: 'Result 2', value: 85 },
  { label: 'Result 3', value: 90 },
];

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Features />
                <CareerPaths />
                <Resources />
              </>
            } />
            <Route path="/job-opportunities" element={<JobOpportunities />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chart" element={<Chart data={{ labels: ['January', 'February', 'March'], values: [65, 59, 80] }} />} />
            <Route path="/psychometric-test" element={<PsychometricTest />} />
            <Route path="/assessment-results" element={<AssessmentResults results={sampleResults} />} />
            <Route path="/enhanced-results" element={<EnhancedAssessmentResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
