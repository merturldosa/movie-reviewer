import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './utils/sampleData.js'; // 개발 모드에서 샘플 데이터 함수 로드

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
