export default function HeroTitle({ loaded }) {
  return (
    <>
      {/* Era badge */}
      <div style={{
        display: 'inline-block',
        border: '1px solid rgba(255,180,0,0.5)',
        padding: '6px 20px',
        marginBottom: '28px',
        letterSpacing: '0.25em',
        fontSize: '11px',
        color: '#ffcc66',
        textTransform: 'uppercase',
        opacity: loaded ? 1 : 0,
        transition: 'opacity 1s ease 0.3s',
      }}>
        ✦ Lịch Sử Việt Nam · 1930–1975 ✦
      </div>

      {/* Star icon */}
      <div style={{
        fontSize: '42px',
        marginBottom: '12px',
        filter: 'drop-shadow(0 0 20px #ff8800)',
        animation: 'pulse 3s ease-in-out infinite',
      }}>⭐</div>

      {/* Title 1 */}
      <h1 style={{
        fontSize: 'clamp(32px, 6vw, 72px)',
        fontWeight: '900',
        lineHeight: 1.1,
        margin: '0 0 16px',
        background: 'linear-gradient(135deg, #ff4400 0%, #ff8800 30%, #ffdd00 55%, #ff8800 80%, #ff4400 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: 'drop-shadow(0 0 30px rgba(255,120,0,0.5))',
        letterSpacing: '-0.5px',
      }}>
        Từ Ngàn Cân<br />Treo Sợi Tóc
      </h1>

      {/* Arrow divider */}
      <div style={{
        fontSize: '28px',
        color: '#ff6600',
        margin: '8px 0',
        filter: 'drop-shadow(0 0 10px #ff4400)',
        animation: 'bounce 2s ease-in-out infinite',
      }}>↓</div>

      {/* Title 2 */}
      <h1 style={{
        fontSize: 'clamp(28px, 5vw, 62px)',
        fontWeight: '900',
        lineHeight: 1.1,
        margin: '0 0 28px',
        background: 'linear-gradient(135deg, #ffdd00 0%, #ffffff 40%, #ffdd00 70%, #ff9900 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        filter: 'drop-shadow(0 0 25px rgba(255,220,0,0.6))',
        letterSpacing: '-0.5px',
      }}>
        Lừng Lẫy Năm Châu<br />Chấn Động Địa Cầu
      </h1>

      {/* Ornamental divider */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        margin: '0 auto 28px',
        maxWidth: '500px',
      }}>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,150,0,0.6))' }} />
        <div style={{ color: '#ffaa00', fontSize: '18px' }}>✦</div>
        <div style={{ color: '#ffaa00', fontSize: '12px', letterSpacing: '0.15em' }}>❖</div>
        <div style={{ color: '#ffaa00', fontSize: '18px' }}>✦</div>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, rgba(255,150,0,0.6), transparent)' }} />
      </div>

      {/* Subtitle */}
      <p style={{
        fontSize: 'clamp(14px, 2vw, 18px)',
        color: 'rgba(255,210,150,0.85)',
        maxWidth: '620px',
        margin: '0 auto 44px',
        lineHeight: 1.8,
        fontStyle: 'italic',
        letterSpacing: '0.03em',
      }}>
        Điều gì đã giúp cách mạng Việt Nam vượt qua những thách thức tưởng chừng không thể vượt qua,
        để đi đến thắng lợi vĩ đại nhất thế kỷ XX?
      </p>
    </>
  );
}
