import React, { useState } from 'react';

interface FormData {
  [key: string]: string; // Allow dynamic keys
}

const AssessmentForm: React.FC<{ onSubmit: (data: FormData) => void }> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    question6: '',
    question7: '',
    question8: '',
    question9: '',
    question10: '',
    question11: '',
    question12: '',
    question13: '',
    question14: '',
    question15: '',
    question16: '',
    question17: '',
    question18: '',
    question19: '',
    question20: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {Array.from({ length: 20 }, (_, index) => (
        <div key={`question${index + 1}`}>
          <label htmlFor={`question${index + 1}`}>Question {index + 1}:</label>
          <input
            type="text"
            id={`question${index + 1}`}
            name={`question${index + 1}`}
            value={formData[`question${index + 1}`]}
            onChange={handleInputChange}
            required
          />
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default AssessmentForm;
