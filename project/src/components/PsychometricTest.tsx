import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [questionsLoading, setQuestionsLoading] = useState(true);
  const [questionsError, setQuestionsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        setQuestionsError('Failed to load questions. Please try again later.');
        console.error('Error fetching questions:', error);
      } finally {
        setQuestionsLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const analyzeResponses = () => {
    const defaultJob = {
      predictions: [
        {
          role: "Software Engineer",
          confidence: 0.85,
          description: "A role focused on developing software applications.",
          ai_confidence: 0.80
        }
      ],
      insights: {
        overview: {
          description: "Software engineering is a high-demand field.",
          demand: "High",
          workEnvironment: "Remote or in-office"
        },
        skills: {
          technical: ["JavaScript", "React", "Node.js"],
          soft: ["Communication", "Teamwork"]
        },
        salary: {
          entryLevel: 60000,
          midLevel: 90000,
          seniorLevel: 120000
        },
        growth: {
          outlook: "Positive",
          growthRate: "10% annually"
        }
      },
      responses
    };

    // Navigate to results page with default job data
    navigate('/enhanced-results', {
      state: defaultJob,
      replace: true // Prevent going back to loading state
    });
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
          <Dashboard responses={responses} insights={null} />
        </div>
      )}
    </div>
  );
};

export default PsychometricTest;
