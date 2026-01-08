// src/App.jsx
import { useState } from 'react';
import UploadZone from './components/UploadZone';
import Dashboard from './components/Dashboard';

function App() {
  const [datasetInfo, setDatasetInfo] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {!datasetInfo ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md">
            <h1 className="text-5xl font-bold text-center mb-8 text-indigo-700">
              DataOracle
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Upload your CSV and let AI reveal insights
            </p>
            <UploadZone onUpload={setDatasetInfo} />
          </div>
        </div>
      ) : (
        <Dashboard
          datasetId={datasetInfo.dataset_id}
          columns={datasetInfo.columns}
        />
      )}
    </div>
  );
}

export default App;