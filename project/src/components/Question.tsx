import React from 'react';

export interface QuestionProps {
  question?: { id: number; text: string; options: string[] }; // Make it optional
  handleResponse: (id: number, response: string) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  response?: string;
  setResponse?: (response: string) => void;
  onAnalyze?: () => void;
  isLastQuestion?: boolean;
}


export const Question: React.FC<QuestionProps> = ({
  question,
  handleResponse,
  onNext,
  onPrevious,
  response,
  setResponse,
  onAnalyze,
  isLastQuestion,
}) => {

  // If `question` is undefined, prevent rendering error
  if (!question) {
    return <p>Loading question...</p>;
  }

  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    handleResponse(question.id, value);
    setResponse?.(value);
  };

  return (
    <div>
      <p>{question.text}</p>
      <select onChange={onChange} value={response || ''}>
        <option value="">Select...</option>
        {/* Ensure `options` is an array before mapping */}
        {question.options?.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <div className="mt-4 flex gap-2">
        {onPrevious && (
          <button
            onClick={onPrevious}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Previous
          </button>
        )}
        {onNext && (
          <button
            onClick={onNext}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Next
          </button>
        )}
        {isLastQuestion && onAnalyze && (
          <button
            onClick={onAnalyze}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Analyze Results
          </button>
        )}

      </div>

    </div>
  );
};
