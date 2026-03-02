import { useState } from 'react';
import HomePage from './HomePage';
import QuizPage from './QuizPage';
import './App.css';

function App() {
  const [page, setPage] = useState('home');

  if (page === 'home') {
    return <HomePage onNavigate={setPage} />;
  }

  if (page === 'quiz') {
    return <QuizPage onNavigate={setPage} />;
  }

  // Placeholder for future pages
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0400',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Georgia', 'Times New Roman', serif",
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#ffaa66', marginBottom: '20px', fontSize: '18px' }}>
          Trang "{page}" đang được phát triển
        </p>
        <button
          onClick={() => setPage('home')}
          style={{
            padding: '10px 28px',
            background: 'rgba(180,40,0,0.4)',
            color: '#ffcc88',
            border: '1px solid #cc4400',
            borderRadius: '2px',
            cursor: 'pointer',
            fontFamily: 'inherit',
            fontSize: '14px',
            letterSpacing: '0.1em',
          }}
        >
          ← Quay lại
        </button>
      </div>
    </div>
  );
}

export default App;
