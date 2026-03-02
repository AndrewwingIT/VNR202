export default function QuoteBlock() {
  return (
    <div style={{
      padding: '20px 32px',
      border: '1px solid rgba(255,100,0,0.2)',
      borderLeft: '3px solid #cc2200',
      background: 'rgba(150,20,0,0.1)',
      backdropFilter: 'blur(6px)',
      borderRadius: '0 4px 4px 0',
      maxWidth: '600px',
      margin: '52px auto 0',
      textAlign: 'left',
    }}>
      <p style={{
        margin: 0,
        fontSize: '13px',
        color: 'rgba(255,180,120,0.8)',
        fontStyle: 'italic',
        lineHeight: 1.9,
        letterSpacing: '0.04em',
      }}>
        "Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ."
      </p>
      <p style={{
        margin: '10px 0 0',
        fontSize: '11px',
        color: '#ff8844',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}>
        — Hồ Chí Minh, Lời kêu gọi toàn quốc kháng chiến, 1946
      </p>
    </div>
  );
}
