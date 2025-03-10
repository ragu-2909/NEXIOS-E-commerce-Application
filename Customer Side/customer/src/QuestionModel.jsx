import React, { useState } from 'react';

const QuestionModal = ({ productId, isOpen, onClose, token }) => {
  const [question, setQuestion] = useState('');

  const handleSubmitQuestion = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/user/addQuestion/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'token': token
        },
        body: JSON.stringify({ question })
      });

      if (response.ok) {
        setQuestion('');
        onClose();
      } else {
        console.error('Failed to submit question');
      }
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Add Question</h3>
        <input
          type="text"
          placeholder="Ask your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border text-black border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmitQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;