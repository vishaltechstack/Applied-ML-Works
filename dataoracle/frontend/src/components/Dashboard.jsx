import { useState, useEffect } from 'react';
import axios from 'axios';
import LineChart from './Charts/LineChart';
import AnomalyChart from './Charts/AnomalyChart';
import NLPQuery from './NLPQuery';
import {
  RefreshCw,
  AlertCircle,
  Brain,
  TrendingUp,
  Zap,
  Sun,
  Moon,
} from 'lucide-react';

export default function Dashboard({ datasetId, columns }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const [anomalies, setAnomalies] = useState([]);
  const [modelUri, setModelUri] = useState(null);
  const [target, setTarget] = useState(columns[1] || '');
  const [task, setTask] = useState('regression');

  useEffect(() => {
    if (datasetId) {
      fetchData();
    }
  }, [datasetId]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Mock endpoint — replace with real one if needed
      const res = await axios.get(`http://localhost:8000/dataset/${datasetId}`).catch(() => ({
        data: { data: [] },
      }));
      setData(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  const trainModel = async () => {
    if (!target) return alert('Select a target column');
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8000/train', {
        dataset_id: datasetId,
        target,
        task,
      });
      setModelUri(res.data.model_uri);
      alert('Model trained successfully!');
    } catch (err) {
      alert('Training failed: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  const runPrediction = async () => {
    if (!modelUri) return;
    const sampleInput = data[0] ? { ...data[0] } : {};
    delete sampleInput[target];

    try {
      const res = await axios.post('http://localhost:8000/predict', {
        model_uri: modelUri,
        input: sampleInput,
      });
      setPrediction(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const detectAnomalies = async () => {
    try {
      const res = await axios.post('http://localhost:8000/anomaly', {
        dataset_id: datasetId,
      });
      setAnomalies(res.data.anomalies || []);
    } catch (err) {
      console.error(err);
    }
  };

  const isDark = document.documentElement.classList.contains('dark');

  if (loading && data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-8">

      {/* === HERO: Gradient AI Card === */}
      <div className="bg-gradient-oracle text-white p-6 rounded-2xl shadow-card animate-fade-in">
        <h2 className="text-2xl font-bold font-sans flex items-center gap-3">
          <Brain className="w-8 h-8" />
          DataOracle AI
        </h2>
        <p className="mt-2 opacity-90">Upload • Ask • Predict • Explain • Detect</p>
      </div>

      {/* === HEADER: Title + Controls === */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Brain className="w-8 h-8" /> Dashboard
        </h1>

        <div className="flex gap-2">
          {/* Refresh */}
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-lg transition"
          >
            <RefreshCw className="w-5 h-5" /> Refresh
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => document.documentElement.classList.toggle('dark')}
            className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-yellow-500" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* === MODEL TRAINING PANEL === */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
          <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" /> Train AutoML Model
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-oracle-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">Select Target</option>
            {columns.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>

          <select
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-oracle-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="regression">Regression</option>
            <option value="classification">Classification</option>
          </select>

          <button
            onClick={trainModel}
            disabled={!target || loading}
            className="px-6 py-2 bg-oracle-600 hover:bg-oracle-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? 'Training...' : 'Train Model'}
          </button>
        </div>

        {modelUri && (
          <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg animate-fade-in">
            <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Model Ready!</p>
            <code className="font-mono text-ai-500 bg-neutral-100 dark:bg-gray-700 px-2 py-1 rounded text-xs">
              {modelUri.split('/').pop()}
            </code>
          </div>
        )}
      </div>

      {/* === CHARTS GRID === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trend Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">Trend Analysis</h3>
          <div className="h-64">
            <LineChart data={data.slice(0, 100)} target={target || columns[1]} />
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <AlertCircle className="w-5 h-5 text-red-500 dark:text-red-400" /> Anomaly Detection
          </h3>
          <button
            onClick={detectAnomalies}
            className="mb-4 px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition"
          >
            Detect Outliers
          </button>
          {anomalies.length > 0 && (
            <div className="text-sm">
              <p className="font-medium text-gray-700 dark:text-gray-300">{anomalies.length} anomalies found</p>
              <div className="h-48 mt-3">
                <AnomalyChart data={data} anomalies={anomalies} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === PREDICTION & NLP GRID === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Live Prediction */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800 dark:text-gray-100">
            <Zap className="w-6 h-6 text-yellow-500 dark:text-yellow-400" /> Live Prediction
          </h3>

          <button
            onClick={runPrediction}
            disabled={!modelUri || loading}
            className="w-full bg-oracle-600 hover:bg-oracle-700 text-white px-6 py-3 rounded-xl shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Zap className="w-5 h-5" />
            Predict Future
          </button>

          {prediction && (
            <div className="mt-6 p-5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl animate-slide-up text-center">
              <p className="text-3xl font-bold text-indigo-700 dark:text-indigo-300">
                {Number(prediction.prediction).toFixed(2)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">SHAP explains top drivers</p>
            </div>
          )}
        </div>

        {/* NLP Query */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <NLPQuery datasetId={datasetId} />
        </div>
      </div>
    </div>
  );
}