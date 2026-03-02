import { useEffect, useRef } from 'react';

const STARS = Array.from({ length: 80 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: 0.5 + Math.random() * 1.5,
  delay: Math.random() * 5,
}));

export default function ParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const embers = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 100,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -(0.5 + Math.random() * 1.5),
      size: 1 + Math.random() * 2.5,
      life: Math.random(),
      maxLife: 0.6 + Math.random() * 0.4,
    }));

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      embers.forEach((e) => {
        e.x += e.vx;
        e.y += e.vy;
        e.life += 0.003;
        if (e.life > e.maxLife) {
          e.x = Math.random() * canvas.width;
          e.y = canvas.height + 10;
          e.life = 0;
        }
        const alpha = Math.sin((e.life / e.maxLife) * Math.PI) * 0.9;
        const g = Math.floor(140 + (e.life / e.maxLife) * 60);
        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,${g},30,${alpha})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(255,160,0,${alpha})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <>
      {/* Stars */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0 }}>
        {STARS.map((s) => (
          <div
            key={s.id}
            style={{
              position: 'absolute',
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
              borderRadius: '50%',
              background: '#fff',
              opacity: 0.4,
              animation: `twinkle ${2 + s.delay}s ease-in-out infinite alternate`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Ember canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Atmospheric glow – bottom */}
      <div style={{
        position: 'absolute',
        bottom: '-10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120%',
        height: '60%',
        background: 'radial-gradient(ellipse at center bottom, rgba(180,20,0,0.35) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Atmospheric glow – center */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
        height: '40%',
        background: 'radial-gradient(ellipse, rgba(220,60,0,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 1,
      }} />

      {/* Top border */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #cc2200, #ff6600, #ffcc00, #ff6600, #cc2200, transparent)',
        zIndex: 10,
      }} />

      {/* Bottom border */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, transparent, #cc2200, #ff6600, #ffcc00, #ff6600, #cc2200, transparent)',
        zIndex: 10,
      }} />
    </>
  );
}
