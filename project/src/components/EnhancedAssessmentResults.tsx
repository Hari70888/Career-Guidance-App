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

  const predictions = [
    {
      role: "Software Engineer",
      confidence: 0.85,
      description: "A role focused on developing software applications.",
      ai_confidence: 0.80
    }
  ];
  
  const insights = {
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
  };

  if (!insights) {
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
        
        {/* Career Suggestions Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Career Suggestions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div key={0} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{predictions[0].role}</h3>
              <p className="text-gray-600 mb-4">{predictions[0].description}</p>
              <div className="space-y-2">
                <div className="bg-gray-100 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${predictions[0].confidence * 100}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500">
                  System Confidence: {(predictions[0].confidence * 100).toFixed(1)}%
                </p>
                
                {predictions[0].ai_confidence && (
                  <>
                    <div className="bg-gray-100 rounded-full h-2.5">
                      <div
                        className="bg-green-500 h-2.5 rounded-full"
                        style={{ width: `${predictions[0].ai_confidence * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-500">
                      AI Confidence: {(predictions[0].ai_confidence * 100).toFixed(1)}%
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

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

