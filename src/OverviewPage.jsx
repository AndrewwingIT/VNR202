import { useState, useEffect, useRef } from 'react';
import ParticlesBackground from './components/ParticlesBackground';

// ── Data ─────────────────────────────────────────────────────────────────────

const CHALLENGES = [
  { icon: '⚔️', label: 'Quân ngoại xâm', value: '28 vạn+', sub: 'Tưởng, Nhật, Anh, Pháp' },
  { icon: '📉', label: 'Ruộng bỏ hoang', value: '50%', sub: 'Nông nghiệp xơ xác' },
  { icon: '💀', label: 'Chết đói', value: '2 triệu', sub: 'Nạn đói 1944–1945' },
  { icon: '📚', label: 'Mù chữ', value: '95%', sub: 'Dân số thất học' },
];

const PHASES = [
  {
    id: 1,
    year: '1945 – 1946',
    title: 'Xây dựng & Bảo vệ Chính quyền Non Trẻ',
    color: '#ff8800',
    glow: 'rgba(255,136,0,0.4)',
    icon: '🏛️',
    quote: '"Diệt giặc đói, diệt giặc dốt, diệt giặc ngoại xâm"',
    items: [
      {
        icon: '🗳️',
        title: 'Tổng tuyển cử 6/1/1946',
        desc: 'Khẩn trương tổ chức Quốc hội khóa I, lập Chính phủ chính thức, thông qua Hiến pháp đầu tiên ngày 9/11/1946 — củng cố tính hợp pháp của chính quyền.',
      },
      {
        icon: '🌾',
        title: 'Diệt giặc đói & Giặc dốt',
        desc: 'Phát động "Tuần lễ vàng", Quỹ Độc lập, hũ gạo tiết kiệm. Triển khai Bình dân học vụ. Đầu 1946, nạn đói cơ bản được đẩy lùi.',
      },
      {
        icon: '🤝',
        title: '"Hòa để Tiến" — Ngoại giao khôn khéo',
        desc: 'Nhân nhượng Tưởng ở miền Bắc để tập trung chống Pháp ở miền Nam. Ký Hiệp định sơ bộ (6/3/1946) và Tạm ước (14/9/1946) — đuổi Tưởng, tranh thủ thời gian củng cố lực lượng.',
      },
    ],
  },
  {
    id: 2,
    year: '1946 – 1950',
    title: 'Kháng chiến Bùng nổ — Từ Bị động sang Chủ động',
    color: '#cc3300',
    glow: 'rgba(204,51,0,0.4)',
    icon: '🔥',
    quote: '"Kháng chiến toàn dân, toàn diện, lâu dài, tự lực cánh sinh"',
    items: [
      {
        icon: '📣',
        title: 'Lời kêu gọi Toàn quốc kháng chiến 19/12/1946',
        desc: 'Pháp phá bỏ hiệp ước, liên tục gây hấn. Đảng phát động Toàn quốc kháng chiến với đường lối: kháng chiến toàn dân, toàn diện, trường kỳ, tự lực cánh sinh.',
      },
      {
        icon: '🏔️',
        title: 'Chiến dịch Việt Bắc Thu Đông 1947',
        desc: 'Đánh bại âm mưu "đánh nhanh, thắng nhanh" của Pháp — bảo toàn cơ quan đầu não và căn cứ địa kháng chiến tại Việt Bắc.',
      },
      {
        icon: '🎯',
        title: 'Chiến dịch Biên giới Thu Đông 1950 — Bước ngoặt',
        desc: 'Chiến dịch quân sự lớn đầu tiên ta chủ động tiến công. Xoay chuyển tình thế, giành thế chủ động chiến trường — bước ngoặt từ phòng ngự sang tấn công.',
      },
    ],
  },
  {
    id: 3,
    year: '1951 – 1954',
    title: 'Đẩy mạnh Kháng chiến đến Thắng lợi Hoàn toàn',
    color: '#ffcc00',
    glow: 'rgba(255,200,0,0.4)',
    icon: '⭐',
    quote: '"Nên vành hoa đỏ, nên thiên sử vàng"',
    items: [
      {
        icon: '📋',
        title: 'Đại hội Đảng lần II (2/1951)',
        desc: 'Ban hành Chính cương Đảng Lao động Việt Nam, xác định rõ tính chất, nhiệm vụ và động lực cách mạng. Tăng cường vai trò lãnh đạo toàn diện.',
      },
      {
        icon: '🌱',
        title: 'Cải cách ruộng đất từ 1953',
        desc: 'Triệt để giảm tô, giảm tức, thực hiện "người cày có ruộng". Đáp ứng nguyện vọng triệu nông dân — tạo động lực to lớn chi viện tiền tuyến.',
      },
      {
        icon: '🏆',
        title: 'Điện Biên Phủ 1954 — Chấn động Địa cầu',
        desc: 'Pháp dựa Mỹ đẻ ra Kế hoạch Navarre. Đảng mở Tiến công Đông Xuân 1953–1954, buộc địch phân tán lực lượng. Đỉnh cao: Chiến thắng Điện Biên Phủ — đánh bại hoàn toàn ý chí xâm lược của Pháp → Hiệp định Geneve ký kết.',
      },
    ],
  },
];

const FACTORS = [
  {
    icon: '🧭',
    title: 'Đường lối Đúng đắn, Sáng tạo',
    desc: 'Kim chỉ nam "kháng chiến, kiến quốc": vừa đánh giặc, vừa xây dựng đất nước. Chiến lược kháng chiến toàn dân, toàn diện, trường kỳ và tự lực cánh sinh.',
    color: '#ff8800',
  },
  {
    icon: '🌾',
    title: 'Kết hợp Hai Nhiệm vụ Cốt lõi',
    desc: 'Gắn chặt chống đế quốc (độc lập dân tộc) với chống phong kiến (ruộng đất cho dân cày) — tạo ra động lực bùng cháy từ quần chúng nhân dân.',
    color: '#cc3300',
  },
  {
    icon: '⚔️',
    title: 'Lực lượng Vũ trang Mạnh mẽ',
    desc: 'Xây dựng ba thứ quân: bộ đội chủ lực, bộ đội địa phương, dân quân du kích. Mỗi người dân là chiến sĩ — mỗi làng xã là pháo đài.',
    color: '#ffcc00',
  },
  {
    icon: '🤝',
    title: 'Ngoại giao Khôn khéo',
    desc: '"Hòa để tiến", thêm bạn bớt thù. Tranh thủ ủng hộ quốc tế từ Liên Xô, Trung Quốc và phong trào hòa bình thế giới — cô lập kẻ thù về chính trị.',
    color: '#ff8800',
  },
  {
    icon: '🏗️',
    title: 'Hoàn thiện Phương thức Lãnh đạo',
    desc: 'Đảng không ngừng chỉnh đốn, nâng cao năng lực lãnh đạo phù hợp từng giai đoạn. Xây dựng Đảng trong sạch, vững mạnh làm hạt nhân chỉ đạo kháng chiến.',
    color: '#cc3300',
  },
  {
    icon: '❤️',
    title: 'Sức mạnh Lòng Dân',
    desc: 'Khát vọng độc lập, tự do đã hun đúc qua ngàn năm lịch sử. Toàn dân, toàn quân một lòng — đó là thứ vũ khí mà không đội quân nào trên trái đất có thể đánh bại.',
    color: '#ffcc00',
  },
];

// ── Hook: Scroll visible ──────────────────────────────────────────────────────
function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Components ────────────────────────────────────────────────────────────────

function StatCard({ icon, label, value, sub, delay }) {
  const [ref, visible] = useVisible(0.2);
  const [count, setCount] = useState(false);
  useEffect(() => { if (visible) setTimeout(() => setCount(true), delay * 120); }, [visible]);

  return (
    <div ref={ref} style={{
      background: 'rgba(255,80,0,0.08)',
      border: '1px solid rgba(255,100,0,0.3)',
      borderRadius: '12px',
      padding: '28px 20px',
      textAlign: 'center',
      flex: '1 1 160px',
      maxWidth: '200px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.6s ease ${delay * 0.12}s`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ fontSize: '32px', marginBottom: '10px' }}>{icon}</div>
      <div style={{
        fontSize: '30px',
        fontWeight: 'bold',
        color: '#ffdd44',
        fontFamily: 'Georgia, serif',
        transition: 'all 0.5s ease',
        filter: count ? 'none' : 'blur(6px)',
        transform: count ? 'scale(1)' : 'scale(0.8)',
      }}>{value}</div>
      <div style={{ color: '#ff9966', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '6px' }}>{label}</div>
      <div style={{ color: 'rgba(255,200,150,0.6)', fontSize: '11px', marginTop: '4px' }}>{sub}</div>
    </div>
  );
}

function PhaseCard({ phase, idx }) {
  const [ref, visible] = useVisible(0.1);
  const [openItem, setOpenItem] = useState(null);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateX(0)' : `translateX(${idx % 2 === 0 ? '-60px' : '60px'})`,
      transition: `all 0.7s ease ${idx * 0.15}s`,
    }}>
      {/* Phase header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
        marginBottom: '24px',
      }}>
        <div style={{
          width: '64px', height: '64px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${phase.glow}, transparent)`,
          border: `2px solid ${phase.color}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '28px',
          flexShrink: 0,
          boxShadow: `0 0 24px ${phase.glow}`,
        }}>
          {phase.icon}
        </div>
        <div>
          <div style={{
            fontSize: '11px', letterSpacing: '0.3em',
            color: phase.color, textTransform: 'uppercase', marginBottom: '4px',
          }}>Giai đoạn {phase.id} · {phase.year}</div>
          <h3 style={{
            color: '#fff5e0', fontFamily: 'Georgia, serif',
            fontSize: 'clamp(16px, 2.5vw, 20px)', margin: 0, fontWeight: 'normal',
          }}>{phase.title}</h3>
        </div>
      </div>

      {/* Quote */}
      <div style={{
        borderLeft: `3px solid ${phase.color}`,
        paddingLeft: '20px',
        margin: '0 0 24px 84px',
        color: 'rgba(255,210,160,0.7)',
        fontStyle: 'italic',
        fontSize: '14px',
        fontFamily: 'Georgia, serif',
      }}>
        {phase.quote}
      </div>

      {/* Expandable items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginLeft: '84px' }}>
        {phase.items.map((item, i) => (
          <div key={i}
            onClick={() => setOpenItem(openItem === i ? null : i)}
            style={{
              background: openItem === i ? `rgba(${phase.color === '#ffcc00' ? '255,200,0' : phase.color === '#cc3300' ? '204,51,0' : '255,136,0'},0.12)` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${openItem === i ? phase.color : 'rgba(255,150,80,0.2)'}`,
              borderRadius: '8px',
              cursor: 'pointer',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{
              padding: '14px 18px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: '12px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '20px' }}>{item.icon}</span>
                <span style={{
                  color: openItem === i ? '#fff5e0' : 'rgba(255,210,160,0.85)',
                  fontFamily: 'Georgia, serif',
                  fontSize: '14px', fontWeight: openItem === i ? 'bold' : 'normal',
                  transition: 'all 0.2s',
                }}>
                  {item.title}
                </span>
              </div>
              <span style={{
                color: phase.color, fontSize: '18px',
                transform: openItem === i ? 'rotate(45deg)' : 'none',
                transition: 'transform 0.3s ease',
                flexShrink: 0,
              }}>+</span>
            </div>
            {openItem === i && (
              <div style={{
                padding: '0 18px 16px 56px',
                color: 'rgba(255,210,160,0.8)',
                fontFamily: 'Georgia, serif',
                fontSize: '14px',
                lineHeight: 1.75,
                animation: 'expandDown 0.3s ease',
              }}>
                {item.desc}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FactorCard({ factor, idx }) {
  const [ref, visible] = useVisible(0.15);
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '1 1 280px',
        background: hovered ? `rgba(${factor.color === '#ffcc00' ? '255,200,0' : factor.color === '#cc3300' ? '204,51,0' : '255,136,0'},0.15)` : 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? factor.color : 'rgba(255,150,80,0.2)'}`,
        borderRadius: '12px',
        padding: '28px 24px',
        cursor: 'default',
        transition: 'all 0.35s ease',
        transform: visible ? (hovered ? 'translateY(-6px)' : 'translateY(0)') : 'translateY(40px)',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${idx * 0.1}s` : '0s',
        boxShadow: hovered ? `0 12px 40px ${factor.color}33` : 'none',
      }}>
      <div style={{ fontSize: '36px', marginBottom: '14px' }}>{factor.icon}</div>
      <h4 style={{
        color: hovered ? '#fff5e0' : 'rgba(255,220,160,0.9)',
        fontFamily: 'Georgia, serif',
        fontSize: '15px',
        margin: '0 0 10px',
        transition: 'color 0.2s',
      }}>{factor.title}</h4>
      <p style={{
        color: 'rgba(255,200,150,0.7)',
        fontSize: '13px',
        lineHeight: 1.7,
        margin: 0,
        fontFamily: 'Georgia, serif',
      }}>{factor.desc}</p>
    </div>
  );
}

function EnemyCard({ icon, title, color, desc, delay }) {
  const [ref, visible] = useVisible(0.2);
  const rgb = color === '#cc3300' ? '204,51,0' : color === '#ff8800' ? '255,136,0' : '255,204,0';
  return (
    <div ref={ref} style={{
      flex: '1 1 240px',
      background: `rgba(${rgb},0.08)`,
      border: `1px solid ${color}44`,
      borderTop: `3px solid ${color}`,
      borderRadius: '8px',
      padding: '28px 24px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(30px)',
      transition: `all 0.6s ease ${delay * 0.15}s`,
    }}>
      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
      <h4 style={{ color, margin: '0 0 10px', fontSize: '16px', letterSpacing: '0.05em' }}>{title}</h4>
      <p style={{ color: 'rgba(255,200,150,0.75)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>{desc}</p>
    </div>
  );
}

const ENEMIES = [
  { icon: '⚔️', title: 'Giặc Ngoại Xâm', color: '#cc3300', desc: '20 vạn quân Tưởng (Bắc), 6 vạn quân Nhật + 2 vạn Anh-Ấn + Pháp (Nam). Đế quốc âm mưu chia lại thuộc địa.' },
  { icon: '💸', title: 'Giặc Đói', color: '#ff8800', desc: 'Kinh tế kiệt quệ, kho bạc trống rỗng, lạm phát tăng cao. 50% ruộng đất bỏ hoang. Hậu quả 2 triệu người chết đói.' },
  { icon: '📚', title: 'Giặc Dốt', color: '#ffcc00', desc: '95% dân số mù chữ. Hủ tục lạc hậu còn nặng nề. Chính quyền mới, non trẻ, thiếu thốn mọi mặt.' },
];

function SectionTitle({ children, sub }) {
  const [ref, visible] = useVisible();
  return (
    <div ref={ref} style={{
      textAlign: 'center', marginBottom: '48px',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'all 0.7s ease',
    }}>
      {sub && <div style={{
        fontSize: '11px', letterSpacing: '0.35em', color: '#ff8844',
        textTransform: 'uppercase', marginBottom: '12px',
      }}>{sub}</div>}
      <h2 style={{
        color: '#fff5e0', fontFamily: 'Georgia, serif',
        fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 'normal',
        margin: 0, lineHeight: 1.3,
      }}>{children}</h2>
      <div style={{
        margin: '16px auto 0', width: '60px', height: '2px',
        background: 'linear-gradient(90deg, transparent, #ff8800, transparent)',
      }} />
    </div>
  );
}

// ── Progress Nav ──────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: 'crisis', label: 'Bối cảnh' },
  { id: 'phase1', label: 'GĐ 1' },
  { id: 'phase2', label: 'GĐ 2' },
  { id: 'phase3', label: 'GĐ 3' },
  { id: 'factors', label: 'Yếu tố' },
  { id: 'conclusion', label: 'Kết luận' },
];

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function OverviewPage({ onNavigate }) {
  const [activeSection, setActiveSection] = useState('crisis');
  const containerRef = useRef(null);

  // Track active section from scroll
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: '-40% 0px -50% 0px' }
    );
    NAV_SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const [introRef, introVisible] = useVisible(0.1);
  const [conclusionRef, conclusionVisible] = useVisible(0.2);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0a0400 0%, #1a0800 30%, #0d0200 60%, #050000 100%)',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      position: 'relative',
      color: '#fff5e0',
    }}>
      <ParticlesBackground />

      {/* ── Side Nav ── */}
      <div style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-end',
      }}>
        {NAV_SECTIONS.map(s => (
          <div
            key={s.id}
            onClick={() => scrollTo(s.id)}
            title={s.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              position: 'relative',
            }}
            className={`sidenav-item ${activeSection === s.id ? 'active' : ''}`}
          >
            {/* Label — hiện khi hover */}
            <span style={{
              fontSize: '10px',
              letterSpacing: '0.1em',
              color: activeSection === s.id ? '#ffcc66' : 'rgba(255,180,100,0.5)',
              fontFamily: 'Georgia, serif',
              whiteSpace: 'nowrap',
              opacity: 0,
              transition: 'opacity 0.2s ease',
              pointerEvents: 'none',
            }} className="sidenav-label">
              {s.label}
            </span>
            {/* Dot */}
            <div style={{
              width: activeSection === s.id ? '10px' : '7px',
              height: activeSection === s.id ? '10px' : '7px',
              borderRadius: '50%',
              background: activeSection === s.id ? '#ff8800' : 'rgba(255,136,0,0.35)',
              border: `1px solid ${activeSection === s.id ? '#ff8800' : 'rgba(255,136,0,0.4)'}`,
              transition: 'all 0.3s ease',
              boxShadow: activeSection === s.id ? '0 0 8px #ff880088' : 'none',
              flexShrink: 0,
            }} />
          </div>
        ))}
      </div>

      <style>{`
        .sidenav-item:hover .sidenav-label { opacity: 1 !important; }
        .sidenav-item.active .sidenav-label { opacity: 0.8 !important; }
        @keyframes expandDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Back button ── */}
      <div style={{ position: 'fixed', top: '24px', left: '24px', zIndex: 50 }}>
        <button
          onClick={() => onNavigate('home')}
          style={{
            background: 'rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,150,80,0.4)',
            color: 'rgba(255,180,100,0.8)',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '13px',
            fontFamily: 'Georgia, serif',
            backdropFilter: 'blur(8px)',
            transition: 'all 0.2s',
            letterSpacing: '0.08em',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff8800'; e.currentTarget.style.color = '#ffcc66'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,150,80,0.4)'; e.currentTarget.style.color = 'rgba(255,180,100,0.8)'; }}
        >
          ← Trang chủ
        </button>
      </div>

      <div ref={containerRef} style={{ position: 'relative', zIndex: 5 }}>

        {/* ══════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════ */}
        <section style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '80px 40px',
          textAlign: 'center',
        }}>
          <div ref={introRef}>
            <div style={{
              fontSize: '11px', letterSpacing: '0.4em', color: '#ff8844',
              textTransform: 'uppercase', marginBottom: '24px',
              opacity: introVisible ? 1 : 0,
              transition: 'opacity 1s ease 0.2s',
            }}>
              VNR202 · Lịch sử Đảng Cộng sản Việt Nam
            </div>
            <h1 style={{
              fontSize: 'clamp(32px, 6vw, 48px)',
              color: '#fff5e0',
              fontWeight: 'normal',
              lineHeight: 1.2,
              margin: '0 0px 16px 0px',
              opacity: introVisible ? 1 : 0,
              transform: introVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s ease 0.4s',
              maxWidth: '900px',
            }}>
              Điều Gì Đã Giúp Cách Mạng Việt Nam
            </h1>
            <h1 style={{
              fontSize: 'clamp(28px, 5vw, 54px)',
              background: 'linear-gradient(90deg, #ff8800, #ffdd44, #ff8800)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontWeight: 'normal',
              lineHeight: 1.2,
              margin: '0 -160px 40px',
              opacity: introVisible ? 1 : 0,
              transform: introVisible ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s ease 0.6s',
            }}>
              Vượt Qua Thách Thức Tưởng Chừng Không Thể?
            </h1>
            <p style={{
              color: 'rgba(255,200,150,0.75)',
              fontSize: 'clamp(14px, 2vw, 17px)',
              lineHeight: 1.8,
              maxWidth: '680px',
              margin: '0 auto 48px',
              opacity: introVisible ? 1 : 0,
              transition: 'opacity 1s ease 0.8s',
            }}>
              Hành trình từ thế <em style={{ color: '#ff9966' }}>"Ngàn cân treo sợi tóc"</em> năm 1945
              đến Chiến thắng Điện Biên Phủ <em style={{ color: '#ffdd44' }}>"Chấn động Địa cầu"</em> năm 1954.
            </p>
            <button
              onClick={() => scrollTo('crisis')}
              style={{
                padding: '16px 40px',
                background: 'linear-gradient(135deg, rgba(180,40,0,0.4), rgba(120,20,0,0.3))',
                border: '2px solid #cc4400',
                color: '#ffcc88',
                fontSize: '14px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                borderRadius: '2px',
                cursor: 'pointer',
                fontFamily: 'Georgia, serif',
                opacity: introVisible ? 1 : 0,
                transition: 'all 1s ease 1s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, #ffdd00, #ff8800)';
                e.currentTarget.style.color = '#1a0800';
                e.currentTarget.style.borderColor = '#ffdd00';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(180,40,0,0.4), rgba(120,20,0,0.3))';
                e.currentTarget.style.color = '#ffcc88';
                e.currentTarget.style.borderColor = '#cc4400';
              }}
            >
              Bắt đầu hành trình ↓
            </button>
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            SECTION 1: CRISIS
        ══════════════════════════════════════════════ */}
        <section id="crisis" style={{ padding: 'clamp(60px,8vw,100px) clamp(20px,6vw,80px)' }}>
          <SectionTitle sub="Bối cảnh · 1945">
            "Ngàn Cân Treo Sợi Tóc"
          </SectionTitle>

          <div style={{
            maxWidth: '800px', margin: '0 auto 60px',
            textAlign: 'center',
            color: 'rgba(255,200,150,0.8)',
            fontSize: '16px', lineHeight: 1.8,
            fontFamily: 'Georgia, serif',
          }}>
            Ngay sau Cách mạng Tháng Tám 1945, chính quyền non trẻ đứng trước muôn vàn hiểm nguy.
            Đất nước đối mặt đồng thời với <strong style={{ color: '#ff9966' }}>ba thứ giặc</strong> tưởng chừng không thể vượt qua.
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '20px',
            justifyContent: 'center', maxWidth: '900px', margin: '0 auto',
          }}>
            {CHALLENGES.map((c, i) => (
              <StatCard key={i} {...c} delay={i} />
            ))}
          </div>

          {/* Three enemies */}
          <div style={{ maxWidth: '900px', margin: '60px auto 0', display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {ENEMIES.map((e, i) => <EnemyCard key={i} {...e} delay={i} />)}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            PHASES TIMELINE
        ══════════════════════════════════════════════ */}
        {PHASES.map((phase, idx) => (
          <section key={phase.id} id={`phase${phase.id}`} style={{
            padding: 'clamp(60px,8vw,100px) clamp(20px,6vw,80px)',
            background: idx % 2 === 1 ? 'rgba(255,100,0,0.03)' : 'transparent',
            borderTop: '1px solid rgba(255,100,0,0.08)',
          }}>
            <SectionTitle sub={`Giai đoạn ${phase.id} · ${phase.year}`}>
              {phase.title}
            </SectionTitle>
            <div style={{ maxWidth: '860px', margin: '0 auto' }}>
              <PhaseCard phase={phase} idx={idx} />
            </div>
          </section>
        ))}

        {/* ══════════════════════════════════════════════
            FACTORS
        ══════════════════════════════════════════════ */}
        <section id="factors" style={{
          padding: 'clamp(60px,8vw,100px) clamp(20px,6vw,80px)',
          borderTop: '1px solid rgba(255,100,0,0.08)',
          background: 'rgba(255,100,0,0.03)',
        }}>
          <SectionTitle sub="Phân tích · Bài học lịch sử">
            6 Yếu Tố Quyết Định Tạo Nên Bước Chuyển Kỳ Diệu
          </SectionTitle>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '20px',
            maxWidth: '1040px', margin: '0 auto',
          }}>
            {FACTORS.map((f, i) => <FactorCard key={i} factor={f} idx={i} />)}
          </div>
        </section>

        {/* ══════════════════════════════════════════════
            CONCLUSION
        ══════════════════════════════════════════════ */}
        <section id="conclusion" style={{
          padding: 'clamp(80px,10vw,120px) clamp(20px,6vw,80px)',
          borderTop: '1px solid rgba(255,100,0,0.08)',
          textAlign: 'center',
        }}>
          <div ref={conclusionRef}>
            <div style={{
              fontSize: '11px', letterSpacing: '0.35em', color: '#ff8844',
              textTransform: 'uppercase', marginBottom: '20px',
              opacity: conclusionVisible ? 1 : 0,
              transition: 'opacity 0.7s ease',
            }}>Kết luận</div>
            <h2 style={{
              color: '#fff5e0', fontFamily: 'Georgia, serif',
              fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 'normal',
              lineHeight: 1.4, maxWidth: '780px', margin: '0 auto 40px',
              opacity: conclusionVisible ? 1 : 0,
              transform: conclusionVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease 0.2s',
            }}>
              Thắng lợi không phải ngẫu nhiên —<br />
              <span style={{
                background: 'linear-gradient(90deg, #ff8800, #ffdd44)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Đó là kết quả của đường lối tài tình, ý chí bất khuất.</span>
            </h2>

            {/* Quote block */}
            <div style={{
              maxWidth: '700px', margin: '0 auto 60px',
              padding: '36px 40px',
              background: 'rgba(255,136,0,0.06)',
              border: '1px solid rgba(255,136,0,0.25)',
              borderLeft: '4px solid #ff8800',
              borderRadius: '0 12px 12px 0',
              textAlign: 'left',
              opacity: conclusionVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.4s',
            }}>
              <p style={{
                color: 'rgba(255,210,160,0.9)',
                fontStyle: 'italic', lineHeight: 1.8,
                fontSize: '15px', margin: '0 0 16px',
              }}>
                Thắng lợi Điện Biên Phủ đã bảo vệ thành quả Cách mạng Tháng Tám, chấm dứt ách nô lệ thực dân,
                đưa Việt Nam trở thành quốc gia độc lập và tạo tiền đề vững chắc cho
                công cuộc tiến lên Chủ nghĩa xã hội.
              </p>
              <p style={{
                color: 'rgba(255,180,100,0.6)',
                fontSize: '13px', margin: 0,
              }}>
                Chiến thắng ấy trở thành biểu tượng lan tỏa tinh thần đấu tranh giải phóng dân tộc trên toàn thế giới.
              </p>
            </div>

            {/* CTA */}
            <div style={{
              display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap',
              opacity: conclusionVisible ? 1 : 0,
              transition: 'opacity 0.8s ease 0.6s',
            }}>
              <button
                onClick={() => onNavigate('quiz')}
                style={{
                  padding: '16px 40px',
                  background: 'linear-gradient(135deg, rgba(180,40,0,0.4), rgba(120,20,0,0.3))',
                  border: '2px solid #cc4400',
                  color: '#ffcc88',
                  fontSize: '14px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #ffdd00, #ff8800)';
                  e.currentTarget.style.color = '#1a0800';
                  e.currentTarget.style.borderColor = '#ffdd00';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, rgba(180,40,0,0.4), rgba(120,20,0,0.3))';
                  e.currentTarget.style.color = '#ffcc88';
                  e.currentTarget.style.borderColor = '#cc4400';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                ⚔️ Kiểm Tra Kiến Thức
              </button>
              <button
                onClick={() => scrollTo('crisis')}
                style={{
                  padding: '16px 40px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,200,150,0.3)',
                  color: 'rgba(255,200,150,0.7)',
                  fontSize: '14px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  fontFamily: 'Georgia, serif',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,200,150,0.6)'; e.currentTarget.style.color = 'rgba(255,200,150,1)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,200,150,0.3)'; e.currentTarget.style.color = 'rgba(255,200,150,0.7)'; }}
              >
                ↑ Đọc lại từ đầu
              </button>
            </div>
          </div>
        </section>

      </div>


    </div>
  );
}
