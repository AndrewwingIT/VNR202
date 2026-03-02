import { useState } from 'react';

export default function NavButtons({ onNavigate }) {
  const [hover1, setHover1] = useState(false);
  const [hover2, setHover2] = useState(false);

  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      flexWrap: 'wrap',
    }}>
      {/* Button 1: Tổng quan */}
      <button
        onMouseEnter={() => setHover1(true)}
        onMouseLeave={() => setHover1(false)}
        onClick={() => onNavigate?.('overview')}
        style={{
          padding: '16px 38px',
          fontSize: '15px',
          letterSpacing: '0.12em',
          fontFamily: 'inherit',
          fontWeight: '700',
          textTransform: 'uppercase',
          cursor: 'pointer',
          border: '2px solid',
          borderColor: hover1 ? '#ffdd00' : '#cc4400',
          color: hover1 ? '#1a0800' : '#ffcc88',
          background: hover1
            ? 'linear-gradient(135deg, #ffdd00, #ff8800)'
            : 'linear-gradient(135deg, rgba(180,40,0,0.3), rgba(120,20,0,0.2))',
          borderRadius: '2px',
          transition: 'all 0.3s ease',
          transform: hover1 ? 'translateY(-3px) scale(1.03)' : 'none',
          boxShadow: hover1
            ? '0 8px 30px rgba(255,200,0,0.4), 0 0 60px rgba(255,150,0,0.2)'
            : '0 4px 20px rgba(180,40,0,0.3)',
          backdropFilter: 'blur(4px)',
          outline: 'none',
        }}
      >
        📜 Tổng Quan Bài Học
      </button>

      {/* Button 2: Quiz */}
      <button
        onMouseEnter={() => setHover2(true)}
        onMouseLeave={() => setHover2(false)}
        onClick={() => onNavigate?.('quiz')}
        style={{
          padding: '16px 38px',
          fontSize: '15px',
          letterSpacing: '0.12em',
          fontFamily: 'inherit',
          fontWeight: '700',
          textTransform: 'uppercase',
          cursor: 'pointer',
          border: '2px solid',
          borderColor: hover2 ? '#ffffff' : 'rgba(255,200,150,0.4)',
          color: hover2 ? '#0a0400' : '#fff5e0',
          background: hover2
            ? 'linear-gradient(135deg, #fff5e0, #ffcc88)'
            : 'rgba(255,255,255,0.05)',
          borderRadius: '2px',
          transition: 'all 0.3s ease',
          transform: hover2 ? 'translateY(-3px) scale(1.03)' : 'none',
          boxShadow: hover2
            ? '0 8px 30px rgba(255,255,200,0.3), 0 0 60px rgba(255,200,100,0.15)'
            : '0 4px 20px rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
          outline: 'none',
        }}
      >
        ⚔️ Kiểm Tra Kiến Thức
      </button>
    </div>
  );
}
