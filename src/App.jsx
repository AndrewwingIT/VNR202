import { useState, useEffect, useRef } from 'react';
import HomePage from './HomePage';
import QuizPage from './QuizPage';
import OverviewPage from './OverviewPage';
import './App.css';

const PIN = ['1', '9', '4', '5'];

function PinModal({ onSuccess, onClose }) {
  const [digits, setDigits] = useState(['', '', '', '']);
  const [shake, setShake] = useState(false);
  const [denied, setDenied] = useState(false);
  const ref0 = useRef(); const ref1 = useRef(); const ref2 = useRef(); const ref3 = useRef();
  const refs = [ref0, ref1, ref2, ref3];

  useEffect(() => { ref0.current?.focus(); }, []);

  const handleChange = (i, val) => {
    const ch = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[i] = ch;
    setDigits(next);
    setDenied(false);
    if (ch && i < 3) refs[i + 1].current?.focus();
    // auto-submit when last digit filled
    if (ch && i === 3) {
      const entered = [...next.slice(0, 3), ch];
      setTimeout(() => checkPin(entered), 80);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      refs[i - 1].current?.focus();
    }
    if (e.key === 'Enter') {
      checkPin(digits);
    }
    if (e.key === 'Escape') onClose();
  };

  const checkPin = (d) => {
    if (d.join('') === PIN.join('')) {
      onSuccess();
    } else {
      setShake(true);
      setDenied(true);
      setTimeout(() => {
        setShake(false);
        setDigits(['', '', '', '']);
        refs[0].current?.focus();
      }, 600);
    }
  };

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{
        background: 'linear-gradient(160deg, #120500, #0d0200)',
        border: '1px solid rgba(255,120,0,0.4)',
        borderRadius: '8px',
        padding: '40px 44px',
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(180,40,0,0.4), 0 0 120px rgba(180,40,0,0.15)',
        animation: shake ? 'shake 0.5s ease' : 'pinFadeIn 0.3s ease',
        minWidth: '280px',
      }}>
        <div style={{
          fontSize: '11px', letterSpacing: '0.3em', color: '#ff8844',
          textTransform: 'uppercase', marginBottom: '16px',
        }}>
          🔐 Xác Thực Đầu Vào
        </div>

        <p style={{
          color: 'rgba(255,210,160,0.85)', fontFamily: 'Georgia, serif',
          fontSize: '14px', lineHeight: 1.7, margin: '0 0 28px',
        }}>
          Nhập mã gồm 4 chữ số để vào khu vực kiểm tra
        </p>

        {/* 4 digit boxes */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              style={{
                width: '52px', height: '60px',
                textAlign: 'center', fontSize: '26px', fontWeight: 'bold',
                fontFamily: 'Georgia, serif',
                background: denied ? 'rgba(180,0,0,0.2)' : 'rgba(255,255,255,0.05)',
                border: '2px solid',
                borderColor: denied ? '#cc2200' : d ? 'rgba(255,180,0,0.7)' : 'rgba(255,150,0,0.3)',
                borderRadius: '6px',
                color: denied ? '#ff8877' : '#fff5e0',
                outline: 'none',
                caretColor: 'transparent',
                transition: 'border-color 0.2s, background 0.2s',
                boxShadow: d && !denied ? '0 0 12px rgba(255,160,0,0.25)' : 'none',
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = denied ? '#cc2200' : '#ffaa00'; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = denied ? '#cc2200' : (digits[i] ? 'rgba(255,180,0,0.7)' : 'rgba(255,150,0,0.3)'); }}
            />
          ))}
        </div>

        {denied && (
          <p style={{
            color: '#ff6655', fontSize: '13px', fontFamily: 'Georgia, serif',
            margin: '0 0 12px', animation: 'pinFadeIn 0.2s ease',
          }}>
            ✗ Mã không đúng — thử lại
          </p>
        )}

        <button
          onClick={onClose}
          style={{
            marginTop: '8px', padding: '8px 24px',
            background: 'none', border: '1px solid rgba(255,150,0,0.3)',
            color: 'rgba(255,180,100,0.5)', borderRadius: '3px',
            cursor: 'pointer', fontSize: '12px', letterSpacing: '0.1em',
            fontFamily: 'Georgia, serif', transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,150,0,0.7)'; e.currentTarget.style.color = 'rgba(255,180,100,0.9)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(255,150,0,0.3)'; e.currentTarget.style.color = 'rgba(255,180,100,0.5)'; }}
        >
          Huỷ
        </button>
      </div>

      <style>{`
        @keyframes pinFadeIn { from { opacity: 0; transform: scale(0.93); } to { opacity: 1; transform: scale(1); } }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-10px); }
          40% { transform: translateX(10px); }
          60% { transform: translateX(-7px); }
          80% { transform: translateX(7px); }
        }
      `}</style>
    </div>
  );
}

function App() {
  const [page, setPage] = useState('home');
  const [easterKey, setEasterKey] = useState(0);
  const [quizSessionKey, setQuizSessionKey] = useState(0);
  const [showPin, setShowPin] = useState(false);
  const [wordguessKey, setWordguessKey] = useState(0);

  const handleNavigate = (target) => {
    if (target === 'quiz') {
      setShowPin(true); // show PIN modal instead of navigating directly
      return;
    }
    setPage(target);
  };

  const handlePinSuccess = () => {
    setShowPin(false);
    setEasterKey(0);
    setWordguessKey(0);
    setQuizSessionKey((k) => k + 1);
    setPage('quiz');
  };

  // ── Hidden trick: Ctrl + L + T → bypass PIN, go to fully-assembled puzzle ──
  useEffect(() => {
    const pressed = new Set();
    const onDown = (e) => {
      pressed.add(e.key.toLowerCase());
      if (e.ctrlKey && pressed.has('a') && pressed.has('q')) {
        e.preventDefault();
        setShowPin(false);
        setWordguessKey(0);
        setEasterKey((k) => k + 1);
        setQuizSessionKey((k) => k + 1);
        setPage('quiz');
      }
    };
    const onUp = (e) => pressed.delete(e.key.toLowerCase());
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  // ── Hidden trick: Ctrl + A + E → bypass PIN, jump to word-guess filled ──
  useEffect(() => {
    const pressed = new Set();
    const onDown = (e) => {
      pressed.add(e.key.toLowerCase());
      if (e.ctrlKey && pressed.has('a') && pressed.has('e')) {
        e.preventDefault();
        setShowPin(false);
        setEasterKey(0);
        setWordguessKey((k) => k + 1);
        setQuizSessionKey((k) => k + 1);
        setPage('quiz');
      }
    };
    const onUp = (e) => pressed.delete(e.key.toLowerCase());
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
  }, []);

  if (page === 'home') {
    return (
      <>
        <HomePage onNavigate={handleNavigate} />
        {showPin && <PinModal onSuccess={handlePinSuccess} onClose={() => setShowPin(false)} />}
      </>
    );
  }

  if (page === 'quiz') {
    return <QuizPage key={quizSessionKey} onNavigate={handleNavigate} easterKey={easterKey} wordguessKey={wordguessKey} />;
  }

  if (page === 'overview') {
    return <OverviewPage onNavigate={handleNavigate} />;
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
