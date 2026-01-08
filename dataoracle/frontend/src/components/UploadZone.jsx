import { useState } from 'react';
import axios from 'axios';

export default function UploadZone({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    const form = new FormData();
    form.append('file', file);
    const res = await axios.post('http://localhost:8000/upload', form);
    onUpload(res.data);
  };

  return (
    <div className="p-6 border-2 border-dashed rounded-xl">
      <input type="file" accept=".csv" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg">
        Upload & Analyze
      </button>
    </div>
  );
}