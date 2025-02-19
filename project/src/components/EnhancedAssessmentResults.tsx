import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface Prediction {
  role: string;
  confidence: number;
  description: string;
  ai_confidence?: number;
}

interface Insights {
  overview: {
    description: string;
    demand: string;
    workEnvironment: string;
  };
  skills: {
    technical: string[];
    soft: string[];
  };
  salary: {
    entryLevel: number;
    midLevel: number;
    seniorLevel: number;
  };
  growth: {
    outlook: string;
    growthRate: string;
  };
}

interface AIAnalysis {
  classifications: {
    confidence: number;
    input: string;
    label: string;
  }[];
}

interface ResultState {
  predictions: Prediction[];
  insights: Insights;
  responses: { [key: number]: string };
  ai_analysis?: AIAnalysis;
}

export const EnhancedAssessmentResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  if (!location.state) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8">Error</h1>
          <p className="text-red-500 mb-4">No results data found. Please complete the assessment first.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const { predictions, insights, responses, ai_analysis } = location.state as ResultState;

  if (!predictions || !insights || !responses) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-8">Error</h1>
          <p className="text-red-500 mb-4">Invalid results data. Please try the assessment again.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8">Enhanced Assessment Results</h1>
        
        {/* AI Analysis Section */}
        {ai_analysis && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">AI-Powered Analysis</h2>
            <div className="space-y-4">
              {ai_analysis.classifications.map((classification, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium">{classification.input}</h3>
                    <span className="text-sm text-gray-500">Category: {classification.label}</span>
                  </div>
                  <div className="bg-gray-100 rounded-full h-2.5">
                    <div
                      className="bg-purple-500 h-2.5 rounded-full"
                      style={{ width: `${classification.confidence * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    AI Confidence: {(classification.confidence * 100).toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Suggestions Section */}
        {predictions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Career Suggestions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {predictions.map((prediction, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">{prediction.role}</h3>
                  <p className="text-gray-600 mb-4">{prediction.description}</p>
                  <div className="space-y-2">
                    <div className="bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${prediction.confidence * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">
                      System Confidence: {(prediction.confidence * 100).toFixed(1)}%
                    </p>
                    
                    {prediction.ai_confidence && (
                      <>
                        <div className="bg-gray-100 rounded-full h-2.5">
                          <div
                            className="bg-green-500 h-2.5 rounded-full"
                            style={{ width: `${prediction.ai_confidence * 100}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-500">
                          AI Confidence: {(prediction.ai_confidence * 100).toFixed(1)}%
                        </p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Career Insights Section */}
        {insights && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Career Insights</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-medium mb-2">Overview</h3>
                <p className="text-gray-600">{insights.overview.description}</p>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p className="font-medium">Demand:</p>
                    <p>{insights.overview.demand}</p>
                  </div>
                  <div>
                    <p className="font-medium">Work Environment:</p>
                    <p>{insights.overview.workEnvironment}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Skills</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Technical:</p>
                    <ul className="list-disc list-inside">
                      {insights.skills.technical.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Soft Skills:</p>
                    <ul className="list-disc list-inside">
                      {insights.skills.soft.map((skill, i) => (
                        <li key={i}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-medium mb-2">Salary & Growth</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">Salary Range:</p>
                    <p>${insights.salary.entryLevel} - ${insights.salary.seniorLevel}</p>
                  </div>
                  <div>
                    <p className="font-medium">Growth Outlook:</p>
                    <p>{insights.growth.outlook} ({insights.growth.growthRate})</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};
