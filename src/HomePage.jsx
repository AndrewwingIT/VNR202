import { useState, useEffect } from 'react';
import ParticlesBackground from './components/ParticlesBackground';
import HeroTitle from './components/HeroTitle';
import NavButtons from './components/NavButtons';
import QuoteBlock from './components/QuoteBlock';
import AIUsageModal from './components/AIUsageModal';
import AIChatboxModal from './components/AIChatboxModal';

export default function HomePage({ onNavigate }) {
  const [loaded, setLoaded] = useState(false);
  const [showAIUsage, setShowAIUsage] = useState(false);
  const [showAIChatbox, setShowAIChatbox] = useState(false);

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

      {/* Float Buttons */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}>
        {/* AI Usage Button */}
        <button
          onClick={() => setShowAIUsage(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ff6600, #cc4400)',
            border: '2px solid rgba(255,120,0,0.6)',
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(255,120,0,0.4), 0 0 40px rgba(255,120,0,0.2)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'float 3s ease-in-out infinite',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 30px rgba(255,120,0,0.6), 0 0 60px rgba(255,120,0,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,120,0,0.4), 0 0 40px rgba(255,120,0,0.2)';
          }}
          title="AI Usage Information"
        >
          🤖
        </button>

        {/* AI Chatbox Button */}
        <button
          onClick={() => setShowAIChatbox(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0066ff, #0044cc)',
            border: '2px solid rgba(0,120,255,0.6)',
            color: '#fff',
            fontSize: '20px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,120,255,0.4), 0 0 40px rgba(0,120,255,0.2)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'float 3s ease-in-out infinite 1.5s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 6px 30px rgba(0,120,255,0.6), 0 0 60px rgba(0,120,255,0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,120,255,0.4), 0 0 40px rgba(0,120,255,0.2)';
          }}
          title="Chat with AI Assistant"
        >
          💬
        </button>
      </div>

      {/* Modals */}
      <AIUsageModal 
        isOpen={showAIUsage} 
        onClose={() => setShowAIUsage(false)} 
      />
      <AIChatboxModal 
        isOpen={showAIChatbox} 
        onClose={() => setShowAIChatbox(false)} 
      />

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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}