import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { EnhancedAssessmentResults } from './EnhancedAssessmentResults';

import { CareerInsights } from '../types';

import { Question } from './Question';
import { Dashboard } from './Dashboard';

interface JobPrediction {
  role: string;
  confidence: number;
  description: string;
}

interface QuestionType {
  id: number;
  text: string;
  options: string[];
}

const PsychometricTest: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const [predictions, setPredictions] = useState<JobPrediction[]>([]);
  const [careerInsights, setCareerInsights] = useState<CareerInsights | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/questions');
        setQuestions(response.data);
      } catch (error) {
        setQuestionsError('Failed to load questions. Please try again later.');
        console.error('Error fetching questions:', error);
      } finally {
        setQuestionsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const analyzeResponses = async () => {
    setIsLoading(true);
    try {
      console.log('Sending responses to analyze:', responses);
      const response = await axios.post('http://localhost:5000/api/analyze', { responses });
      console.log('Analysis response:', response.data);
      
      if (!response.data?.predictions) {
        throw new Error('Invalid response format from server');
      }
      
      setPredictions(response.data.predictions);
      
      // Fetch detailed career insights for the top prediction
      if (response.data.predictions.length > 0) {
        const topCareer = response.data.predictions[0].role;
        console.log('Fetching insights for:', topCareer);
        const insightsResponse = await axios.post('http://localhost:5000/api/insights', {
          career: topCareer
        });
        console.log('Insights response:', insightsResponse.data);
        
        if (!insightsResponse.data) {
          throw new Error('No insights data received');
        }
        
        setCareerInsights(insightsResponse.data);
        
        // Ensure all data is available before navigation
      const navigationState = {
        predictions: response.data.predictions,
        insights: insightsResponse.data,
        responses,
        ai_analysis: response.data.ai_analysis
      };

        
        console.log('Navigating with state:', navigationState);
        console.log('Predictions:', navigationState.predictions);
        console.log('Insights:', navigationState.insights);
        console.log('Responses:', navigationState.responses);
        console.log('AI Analysis:', navigationState.ai_analysis);

        
        // Navigate to results page with analysis data
        navigate('/enhanced-results', {
          state: navigationState,
          replace: true // Prevent going back to loading state
        });


      }
    } catch (error) {
      console.error('Error analyzing responses:', error);
      alert('Failed to analyze responses. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponse = (id: number, response: string) => {
    setResponses((prevResponses) => ({
      ...prevResponses,
      [id]: response
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      analyzeResponses();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (questionsLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        Loading questions...
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        Analyzing your responses...
        <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
      </div>
    );
  }

  if (questionsError) {
    return <div className="p-6 text-center text-red-500">{questionsError}</div>;
  }

  return (
    <div className="p-6">
      {currentQuestionIndex < questions.length ? (
        <Question
          question={questions[currentQuestionIndex]}
          handleResponse={handleResponse}
          onNext={handleNext}
          onPrevious={handlePrevious}
          response={responses[questions[currentQuestionIndex].id]}
          onAnalyze={analyzeResponses}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
        />
      ) : (
        <div>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
              Analyzing your responses...
            </div>
          ) : (
            <div>
              <Dashboard responses={responses} insights={careerInsights} />

              {predictions.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4">AI-Powered Career Suggestions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {predictions.map((prediction, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                        <h4 className="text-xl font-semibold mb-2">{prediction.role}</h4>
                        <p className="text-gray-600 mb-4">{prediction.description}</p>
                        <div className="bg-gray-100 rounded-full h-2.5">
                          <div
                            className="bg-blue-500 h-2.5 rounded-full"
                            style={{ width: `${prediction.confidence * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Confidence: {(prediction.confidence * 100).toFixed(1)}%
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PsychometricTest;
