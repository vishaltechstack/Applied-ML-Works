// src/components/NLPQuery.jsx
import { useState } from 'react';
import axios from 'axios';

export default function NLPQuery({ datasetId }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/nlp', {
        dataset_id: datasetId,
        question
      });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer('Sorry, I couldn’t process that.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Ask in Plain English</h3>
      <div className="flex gap-2">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && ask()}
          placeholder="e.g., Predict sales for December"
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={ask}
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? '...' : 'Ask'}
        </button>
      </div>
      {answer && (
        <div className="mt-4 p-4 bg-indigo-50 rounded-lg text-sm">
          <p className="font-medium text-indigo-800">Answer:</p>
          <p className="mt-1 text-gray-700">{answer}</p>
        </div>
      )}
    </div>
  );
}