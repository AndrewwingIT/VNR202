import { useState, useEffect } from 'react';
import ParticlesBackground from './components/ParticlesBackground';
import HeroTitle from './components/HeroTitle';
import NavButtons from './components/NavButtons';
import QuoteBlock from './components/QuoteBlock';

export default function HomePage({ onNavigate }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: "linear-gradient(160deg, #0a0400 0%, #1a0800 30%, #0d0200 60%, #050000 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <ParticlesBackground />

      {/* Main content */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        textAlign: 'center',
        padding: '40px 20px',
        maxWidth: '900px',
        width: '100%',
        opacity: loaded ? 1 : 0,
        transform: loaded ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 1.2s cubic-bezier(0.16,1,0.3,1)',
      }}>
        <HeroTitle loaded={loaded} />
        <NavButtons onNavigate={onNavigate} />
        <QuoteBlock />
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'rgba(255,150,80,0.4)',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
        zIndex: 5,
        whiteSpace: 'nowrap',
      }}>
        Chọn một hành trình ↑
      </div>

      <style>{`
        @keyframes twinkle {
          from { opacity: 0.2; }
          to { opacity: 0.8; }
        }
        @keyframes pulse {
          0%, 100% { filter: drop-shadow(0 0 15px #ff8800); transform: scale(1); }
          50% { filter: drop-shadow(0 0 35px #ffcc00); transform: scale(1.08); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
        }
      `}</style>
    </div>
  );
}