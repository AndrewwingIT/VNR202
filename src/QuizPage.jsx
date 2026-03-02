import { useState, useEffect, useRef, useCallback } from "react";

// ─── PUZZLE PIECE IMAGES ─────────────────────────────────────────────────────
import _p0 from "./assets/images/row-1-column-1.webp";
import _p1 from "./assets/images/row-1-column-2.webp";
import _p2 from "./assets/images/row-1-column-3.webp";
import _p3 from "./assets/images/row-2-column-1.webp";
import _p4 from "./assets/images/row-2-column-2.webp";
import _p5 from "./assets/images/row-2-column-3.webp";
import _p6 from "./assets/images/row-3-column-1.webp";
import _p7 from "./assets/images/row-3-column-2.webp";
import _p8 from "./assets/images/row-3-column-3.webp";
const PIECE_IMAGES = [_p0, _p1, _p2, _p3, _p4, _p5, _p6, _p7, _p8];

// ─── DATA ───────────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    q: "Yếu tố nào dưới đây phản ánh đúng nhất bản chất tình thế \"ngàn cân treo sợi tóc\" của Việt Nam sau Cách mạng Tháng Tám 1945?",
    opts: [
      "A. Địch trong, giặc ngoài bủa vây.",
      "B. Chính quyền còn non trẻ.",
      "C. Nền kinh tế kiệt quệ.",
      "D. Nhân dân thiếu kinh nghiệm chính trị.",
    ],
    ans: 0,
    explain: "Tình thế \"ngàn cân treo sợi tóc\" phản ánh rõ nhất qua cảnh địch trong (phản động), giặc ngoài (Pháp, Tưởng) đồng thời bao vây chính quyền cách mạng non trẻ.",
  },
  {
    q: "Việc ký Hiệp định Sơ bộ (6/3/1946) và Tạm ước (14/9/1946) với Pháp thể hiện sách lược chiến lược nào của Đảng?",
    opts: [
      "A. Thiết lập liên minh quân sự bền vững với chính phủ Pháp.",
      "B. Thực hiện chính sách trung lập hóa để tránh bùng nổ chiến tranh.",
      "C. Nhượng bộ mọi quyền lợi kinh tế và chính trị cho thực dân Pháp.",
      "D. Hòa hoãn để củng cố lực lượng lâu dài.",
    ],
    ans: 3,
    explain: "Đảng chủ trương hòa hoãn có nguyên tắc với Pháp nhằm tranh thủ thời gian củng cố lực lượng, chuẩn bị cho cuộc kháng chiến lâu dài.",
  },
  {
    q: "Điểm cốt lõi làm nên ý nghĩa lịch sử lớn nhất của Chiến thắng Việt Bắc Thu – Đông 1947 là gì?",
    opts: [
      "A. Mở rộng đáng kể địa bàn vùng giải phóng tại căn cứ địa Việt Bắc.",
      "B. Tiêu diệt bộ phận lớn nhất sinh lực của quân viễn chinh Pháp.",
      "C. Bảo toàn cơ quan đầu não và làm phá sản chiến lược \"đánh nhanh thắng nhanh\".",
      "D. Buộc thực dân Pháp ngay lập tức phải ngồi vào bàn đàm phán hòa bình.",
    ],
    ans: 2,
    explain: "Chiến thắng Việt Bắc 1947 bảo vệ được căn cứ địa và cơ quan đầu não kháng chiến, đồng thời đập tan hoàn toàn chiến lược \"đánh nhanh thắng nhanh\" của Pháp.",
  },
  {
    q: "Vì sao Chiến dịch Biên giới Thu – Đông 1950 được xem là bước ngoặt chiến lược của cuộc kháng chiến?",
    opts: [
      "A. Tiêu diệt toàn bộ quân Pháp ở biên giới.",
      "B. Phá thế bao vây, khai thông đường liên lạc quốc tế và giành thế chủ động.",
      "C. Thu được nhiều vũ khí.",
      "D. Kết thúc chiến tranh.",
    ],
    ans: 1,
    explain: "Chiến dịch Biên giới 1950 phá vỡ thế bao vây của Pháp, khai thông biên giới Việt – Trung, mở đường nhận viện trợ quốc tế và giúp ta giành quyền chủ động chiến lược.",
  },
  {
    q: "Việc tiến hành cải cách ruộng đất năm 1953 có tác động chiến lược chủ yếu nào đối với cuộc kháng chiến?",
    opts: [
      "A. Phát triển công nghiệp quốc phòng.",
      "B. Mở rộng quan hệ ngoại giao.",
      "C. Bồi dưỡng sức dân, tạo hậu phương vững chắc cho tiền tuyến.",
      "D. Củng cố lực lượng chính trị ở đô thị.",
    ],
    ans: 2,
    explain: "Cải cách ruộng đất 1953 giải phóng sức sản xuất nông nghiệp, bồi dưỡng sức dân và tạo ra nguồn nhân lực, vật lực dồi dào cho tiền tuyến.",
  },
  {
    q: "Trong kế hoạch Navarre của Pháp, mục tiêu chiến lược cơ bản là gì?",
    opts: [
      "A. Chuyển bại thành thắng trong thời gian ngắn.",
      "B. Kéo dài chiến tranh.",
      "C. Chia cắt lâu dài lãnh thổ Việt Nam thành hai vùng riêng biệt.",
      "D. Thực hiện cuộc rút quân trong danh dự để bảo toàn lực lượng còn lại.",
    ],
    ans: 0,
    explain: "Kế hoạch Navarre (1953) đặt mục tiêu trong 18 tháng tập trung lực lượng cơ động mạnh để chuyển bại thành thắng, giành thắng lợi quyết định trước khi đàm phán.",
  },
  {
    q: "Nguyên nhân mang tính quyết định hàng đầu giúp cách mạng Việt Nam chuyển từ thế bị động sang chủ động là gì?",
    opts: [
      "A. Sự giúp đỡ của quốc tế.",
      "B. Tinh thần yêu nước của nhân dân.",
      "C. Ưu thế về địa hình.",
      "D. Đường lối lãnh đạo đúng đắn, sáng tạo của Đảng.",
    ],
    ans: 3,
    explain: "Đường lối lãnh đạo đúng đắn, sáng tạo của Đảng là nhân tố quyết định hàng đầu giúp cách mạng chuyển từ thế bị động sang chủ động trong suốt cuộc kháng chiến.",
  },
  {
    q: "Đường lối \"kháng chiến toàn dân, toàn diện, trường kỳ, tự lực cánh sinh\" phản ánh tư duy chiến lược nào của Đảng?",
    opts: [
      "A. Chiến tranh nhân dân.",
      "B. Đấu tranh chính trị là chủ yếu.",
      "C. Đánh nhanh thắng nhanh.",
      "D. Lấy ngoại giao làm trung tâm.",
    ],
    ans: 0,
    explain: "Đường lối kháng chiến toàn dân, toàn diện, trường kỳ, tự lực cánh sinh là biểu hiện tập trung nhất của tư duy chiến tranh nhân dân — huy động toàn bộ sức mạnh của dân tộc.",
  },
  {
    q: "Ý nghĩa quốc tế to lớn nhất của Chiến thắng Điện Biên Phủ là gì?",
    opts: [
      "A. Làm suy yếu hệ thống NATO.",
      "B. Làm thay đổi cục diện Chiến tranh Lạnh.",
      "C. Thúc đẩy phong trào giải phóng dân tộc trên thế giới.",
      "D. Kết thúc hoàn toàn chủ nghĩa thực dân.",
    ],
    ans: 2,
    explain: "Chiến thắng Điện Biên Phủ 1954 là \"tiếng sét\" cổ vũ mạnh mẽ phong trào giải phóng dân tộc ở châu Á, châu Phi và Mỹ Latinh — lần đầu tiên một dân tộc thuộc địa đánh bại hoàn toàn một đội quân viễn chinh của thực dân.",
  },
];

// ─── PUZZLE IMAGE (CSS-drawn map of Vietnam as the 'picture') ────────────────
const GRID = 3; // 3×3 = 9 pieces
const TOTAL = GRID * GRID;

// ─── HELPERS ─────────────────────────────────────────────────────────────────
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

const STARS_BG = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  s: 0.5 + Math.random() * 1.5,
  d: Math.random() * 4,
}));

function StarsBg() {
  const stars = STARS_BG;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.s,
            height: s.s,
            borderRadius: "50%",
            background: "#fff",
            opacity: 0.35,
            animation: `twinkle ${2 + s.d}s ease-in-out infinite alternate`,
            animationDelay: `${s.d}s`,
          }}
        />
      ))}
    </div>
  );
}

// Full assembled puzzle image — renders all 9 pieces as a 3×3 grid
function PuzzleImage({ style }) {
  return (
    <div style={{ width: "100%", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", ...style }}>
      {PIECE_IMAGES.map((src, i) => (
        <img key={i} src={src} alt="" draggable={false}
          style={{ width: "100%", height: "auto", display: "block" }} />
      ))}
    </div>
  );
}

// ─── SCREENS ─────────────────────────────────────────────────────────────────

function WelcomeScreen({ onStart }) {
  const [hover, setHover] = useState(false);
  const [in_, setIn] = useState(false);
  useEffect(() => { setTimeout(() => setIn(true), 80); }, []);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      minHeight: "100vh", padding: "40px 20px", textAlign: "center",
      opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(24px)",
      transition: "all 1s cubic-bezier(.16,1,.3,1)",
    }}>
      {/* Picture clue strip — blurred thumbnails of actual images */}
      <div style={{
        display: "flex", gap: "6px", marginBottom: "36px",
        background: "rgba(0,0,0,0.4)", padding: "12px", borderRadius: "6px",
        border: "1px solid rgba(255,150,0,0.3)",
      }}>
        {PIECE_IMAGES.map((src, i) => (
          <div key={i} style={{
            width: 28, height: 28, borderRadius: "3px", overflow: "hidden",
            border: "1px solid rgba(255,180,0,0.4)", position: "relative",
          }}>
            <img src={src} alt="" draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "blur(2px) brightness(0.4)" }} />
            <span style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "10px", color: "rgba(255,220,0,0.6)",
            }}>?</span>
          </div>
        ))}
      </div>

      <div style={{ fontSize: "13px", letterSpacing: "0.25em", color: "#ff8844", marginBottom: "16px", textTransform: "uppercase" }}>
        ✦ Đuổi Hình Bắt Chữ ✦
      </div>

      <h1 style={{
        fontSize: "clamp(26px, 5vw, 56px)", fontFamily: "Georgia, serif", fontWeight: 900,
        lineHeight: 1.15, margin: "0 0 16px",
        background: "linear-gradient(135deg, #ff4400, #ff9900, #ffee00, #ff9900, #ff4400)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        filter: "drop-shadow(0 0 20px rgba(255,120,0,0.5))",
      }}>
        Giải Mã<br />Lịch Sử Hào Hùng
      </h1>

      <p style={{
        maxWidth: 480, color: "rgba(255,200,140,0.8)", fontSize: "15px",
        lineHeight: 1.8, fontFamily: "Georgia, serif", fontStyle: "italic",
        margin: "0 auto 16px",
      }}>
        Trả lời đúng <strong style={{ color: "#ffcc44" }}>9 câu hỏi</strong> về cách mạng Việt Nam
        để nhận từng mảnh ghép — rồi ráp lại bức tranh lịch sử!
      </p>

      <div style={{
        display: "flex", gap: "24px", margin: "8px 0 36px",
        color: "rgba(255,180,100,0.7)", fontSize: "13px", flexWrap: "wrap", justifyContent: "center",
      }}>
        <span>⭐ 9 câu hỏi</span>
        <span>🧩 9 mảnh ghép</span>
        <span>⚔️ Sai → Làm lại</span>
      </div>

      <button
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onStart}
        style={{
          padding: "18px 52px", fontSize: "16px", letterSpacing: "0.15em",
          fontFamily: "Georgia, serif", fontWeight: 700, textTransform: "uppercase",
          cursor: "pointer", border: "2px solid",
          borderColor: hover ? "#ffee00" : "#cc4400",
          color: hover ? "#1a0800" : "#ffcc88",
          background: hover
            ? "linear-gradient(135deg, #ffee00, #ff8800)"
            : "linear-gradient(135deg, rgba(180,40,0,0.3), rgba(120,20,0,0.2))",
          borderRadius: "2px",
          transition: "all 0.3s ease",
          transform: hover ? "translateY(-3px) scale(1.04)" : "none",
          boxShadow: hover
            ? "0 8px 30px rgba(255,200,0,0.4)"
            : "0 4px 20px rgba(180,40,0,0.3)",
        }}
      >
        🎯 Bắt Đầu Ngay
      </button>
    </div>
  );
}

function QuestionScreen({ question, index, total, collectedPieces, onCorrect, onWrong }) {
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null); // null | 'correct' | 'wrong'
  const [in_, setIn] = useState(false);

  // Component remounts on each question (key prop), so useEffect runs once per question
  useEffect(() => {
    const timer = setTimeout(() => setIn(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (i) => {
    if (feedback) return;
    setSelected(i);
    if (i === question.ans) {
      setFeedback("correct");
      setTimeout(() => onCorrect(), 1600);
    } else {
      setFeedback("wrong");
    }
  };

  const optColors = ["#cc2200", "#e07000", "#007acc", "#228b22"];
  const optLetters = ["A", "B", "C", "D"];

  return (
    <div style={{
      maxWidth: 680, width: "100%", margin: "0 auto", padding: "24px 20px",
      opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(20px)",
      transition: "all 0.6s cubic-bezier(.16,1,.3,1)",
    }}>
      {/* Progress */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
          <span style={{ color: "rgba(255,180,100,0.7)", fontSize: "12px", letterSpacing: "0.15em" }}>
            CÂU HỎI {index + 1} / {total}
          </span>
          <span style={{ color: "#ffaa44", fontSize: "12px" }}>🧩 {collectedPieces} / {total} mảnh</span>
        </div>
        <div style={{ height: "4px", background: "rgba(255,255,255,0.1)", borderRadius: "2px", overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: "2px",
            width: `${((index) / total) * 100}%`,
            background: "linear-gradient(90deg, #cc2200, #ffaa00)",
            transition: "width 0.5s ease",
          }} />
        </div>
        {/* Piece indicators — show actual image thumbnails for collected pieces */}
        <div style={{ display: "flex", gap: "4px", marginTop: "10px", flexWrap: "wrap" }}>
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} style={{
              width: 28, height: 28, borderRadius: "3px", overflow: "hidden",
              border: "1px solid",
              borderColor: i < collectedPieces ? "#ffcc00" : "rgba(255,255,255,0.15)",
              position: "relative",
              transition: "all 0.4s ease",
              boxShadow: i < collectedPieces ? "0 0 8px rgba(255,180,0,0.5)" : "none",
            }}>
              {i < collectedPieces ? (
                <img src={PIECE_IMAGES[i]} alt="" draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              ) : (
                <div style={{
                  width: "100%", height: "100%",
                  background: "rgba(255,255,255,0.05)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "9px", color: "rgba(255,255,255,0.2)",
                }}>{i + 1}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Question card */}
      <div style={{
        background: "rgba(20,5,0,0.7)", backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,120,0,0.3)", borderRadius: "8px",
        padding: "28px", marginBottom: "20px",
        boxShadow: "0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,180,80,0.1)",
      }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.2em", color: "#ff7744", marginBottom: "14px", textTransform: "uppercase" }}>
          ⚔️ Câu hỏi chiến lược
        </div>
        <p style={{
          fontSize: "clamp(15px, 2.5vw, 19px)", color: "#fff5e0",
          fontFamily: "Georgia, serif", lineHeight: 1.7, margin: 0,
        }}>{question.q}</p>
      </div>

      {/* Options */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
        {question.opts.map((opt, i) => {
          let bg = "rgba(255,255,255,0.04)";
          let borderColor = "rgba(255,255,255,0.15)";
          let color = "rgba(255,220,170,0.9)";
          let glow = "none";

          if (feedback === "correct" && i === question.ans) {
            bg = "rgba(0,180,60,0.25)"; borderColor = "#00cc44"; color = "#88ffaa";
            glow = "0 0 20px rgba(0,200,80,0.4)";
          } else if (feedback === "wrong" && i === selected) {
            bg = "rgba(200,0,0,0.25)"; borderColor = "#ff2200"; color = "#ff8888";
            glow = "0 0 20px rgba(200,0,0,0.4)";
          } else if (feedback === "wrong" && i === question.ans) {
            bg = "rgba(0,180,60,0.15)"; borderColor = "rgba(0,200,80,0.5)";
          } else if (selected === i && !feedback) {
            borderColor = optColors[i]; bg = `rgba(${i === 0 ? "200,34,0" : i === 1 ? "224,112,0" : i === 2 ? "0,122,204" : "34,139,34"},0.2)`;
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={!!feedback}
              style={{
                background: bg, border: `2px solid ${borderColor}`,
                borderRadius: "6px", padding: "14px 16px",
                color, fontFamily: "Georgia, serif", fontSize: "14px",
                textAlign: "left", cursor: feedback ? "default" : "pointer",
                transition: "all 0.25s ease",
                boxShadow: glow,
                transform: selected === i && !feedback ? "scale(1.02)" : "none",
                lineHeight: 1.5,
              }}
            >
              <span style={{
                display: "inline-block", width: 22, height: 22, borderRadius: "50%",
                background: `rgba(${i === 0 ? "200,34,0" : i === 1 ? "224,112,0" : i === 2 ? "0,122,204" : "34,139,34"},0.4)`,
                textAlign: "center", lineHeight: "22px", fontSize: "11px",
                fontWeight: "bold", marginRight: "10px", flexShrink: 0,
                border: "1px solid currentColor", verticalAlign: "middle",
              }}>
                {optLetters[i]}
              </span>
              {opt.replace(/^[A-D]\. /, "")}
            </button>
          );
        })}
      </div>

      {/* Feedback overlay — fullscreen centered modal */}
      {feedback === "correct" && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 100,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(4px)",
          animation: "fadeIn 0.3s ease",
        }}>
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: "20px",
            padding: "40px", textAlign: "center", maxWidth: 480,
          }}>
            <div style={{ fontSize: "14px", letterSpacing: "0.25em", color: "#00ee66", textTransform: "uppercase" }}>
              ✅ Chính xác! +1 mảnh ghép
            </div>
            {/* Large shimmering piece image */}
            <div style={{
              width: 320,
              borderRadius: "8px", overflow: "hidden",
              border: "3px solid #ffcc00",
              boxShadow: "0 0 60px rgba(255,200,0,0.7), 0 0 120px rgba(255,150,0,0.4)",
              position: "relative",
              animation: "piecePop 0.5s cubic-bezier(.16,1,.3,1)",
            }}>
              <img src={PIECE_IMAGES[index]} alt="" draggable={false}
                style={{ width: "100%", height: "auto", display: "block" }} />
              {/* shimmer sweep */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                animation: "shimmer 1.2s ease-in-out infinite",
                pointerEvents: "none",
              }} />
            </div>
            <div style={{
              color: "rgba(255,220,160,0.9)", fontFamily: "Georgia, serif",
              fontSize: "14px", lineHeight: 1.7, maxWidth: 360,
            }}>{question.explain}</div>
          </div>
        </div>
      )}

      {feedback === "wrong" && (
        <div style={{
          marginTop: "20px", padding: "16px 20px",
          background: "rgba(180,0,0,0.2)", border: "1px solid #cc2200",
          borderRadius: "6px", color: "#ff9988", fontFamily: "Georgia, serif",
          animation: "shake 0.4s ease",
        }}>
          <div style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px" }}>
            ❌ Sai rồi! Cách mạng không có chỗ cho sai lầm...
          </div>
          <div style={{ fontSize: "13px", marginBottom: "12px", opacity: 0.85 }}>
            Bạn phải bắt đầu lại từ đầu. Hãy ôn lại kiến thức!
          </div>
          <button
            onClick={onWrong}
            style={{
              padding: "8px 20px", background: "rgba(200,30,0,0.4)",
              border: "1px solid #cc2200", color: "#ffbbaa", borderRadius: "4px",
              cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "13px",
              letterSpacing: "0.1em",
            }}
          >
            🔄 Bắt đầu lại
          </button>
        </div>
      )}
    </div>
  );
}

// ─── WORD GUESS SCREEN ───────────────────────────────────────────────────────
const ANSWER_WORDS = ["Chien", "thang", "dien", "bien", "phu"];
const ANSWER_FLAT = ANSWER_WORDS.join("").split(""); // all letters flat

// Pick exactly 1 random letter index per word to pre-reveal
function pickRevealedIndices() {
  const total = ANSWER_FLAT.length;
  const indices = new Set();
  while (indices.size < 2) {
    indices.add(Math.floor(Math.random() * total));
  }
  return indices;
}

const REVEALED_INDICES = pickRevealedIndices();

function WordGuessScreen({ onRestart, autoFill }) {
  // Build per-word letter states
  const [inputs, setInputs] = useState(() => {
    let flatIdx = 0;
    return ANSWER_WORDS.map((word) =>
      word.split("").map((ch) => {
        const idx = flatIdx++;
        const isRevealed = REVEALED_INDICES.has(idx);
        return { char: ch, value: isRevealed || autoFill ? ch.toUpperCase() : "", revealed: isRevealed };
      })
    );
  });

  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [wrong, setWrong] = useState(false);
  const [in_, setIn] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => { setTimeout(() => setIn(true), 80); }, []);

  const getFlatIdx = (wi, li) => {
    let idx = 0;
    for (let i = 0; i < wi; i++) idx += ANSWER_WORDS[i].length;
    return idx + li;
  };

  const handleChange = (wi, li, val) => {
    if (submitted) return;
    const ch = val.slice(-1).toUpperCase();
    const newInputs = inputs.map((word) => word.map((cell) => ({ ...cell })));
    newInputs[wi][li].value = ch;
    setInputs(newInputs);
    // Auto-advance focus
    if (ch) {
      const next = getFlatIdx(wi, li) + 1;
      for (let skip = next; skip < ANSWER_FLAT.length; skip++) {
        // find next non-revealed cell
        let fw = 0, fl = skip;
        for (let w = 0; w < ANSWER_WORDS.length; w++) {
          if (fl < ANSWER_WORDS[w].length) { fw = w; break; }
          fl -= ANSWER_WORDS[w].length;
        }
        if (!inputs[fw][fl].revealed && inputRefs.current[skip]) {
          inputRefs.current[skip].focus();
          break;
        }
      }
    }
  };

  const handleKeyDown = (wi, li, e) => {
    if (e.key === "Backspace" && !inputs[wi][li].value) {
      // Move focus backward
      const prev = getFlatIdx(wi, li) - 1;
      for (let skip = prev; skip >= 0; skip--) {
        let fw = 0, fl = skip;
        for (let w = 0; w < ANSWER_WORDS.length; w++) {
          if (fl < ANSWER_WORDS[w].length) { fw = w; break; }
          fl -= ANSWER_WORDS[w].length;
        }
        if (!inputs[fw][fl].revealed && inputRefs.current[skip]) {
          inputRefs.current[skip].focus();
          break;
        }
      }
    }
  };

  const handleSubmit = () => {
    const userAnswer = inputs.map((word) => word.map((c) => c.value).join("")).join("").toUpperCase();
    const expected = ANSWER_WORDS.join("").toUpperCase();
    if (userAnswer === expected) {
      setCorrect(true);
      setSubmitted(true);
    } else {
      // Flash red then clear all non-revealed inputs
      setWrong(true);
      setTimeout(() => {
        setWrong(false);
        setInputs((prev) =>
          prev.map((word) =>
            word.map((cell) => cell.revealed ? cell : { ...cell, value: "" })
          )
        );
        // Re-focus first non-revealed input
        const firstBlank = inputRefs.current.find((el) => el);
        if (firstBlank) firstBlank.focus();
      }, 700);
    }
  };

  const cellSize = 38;
  const gap = 4;

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "100vh", padding: "40px 20px",
      textAlign: "center",
      opacity: in_ ? 1 : 0, transform: in_ ? "none" : "translateY(20px)",
      transition: "all 0.8s cubic-bezier(.16,1,.3,1)",
    }}>
      {/* Header */}
      <div style={{ fontSize: "40px", marginBottom: "8px" }}>🏆</div>
      <div style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#ff8844", marginBottom: "10px", textTransform: "uppercase" }}>
        Bức tranh đã hoàn thành · Đuổi Hình Bắt Chữ
      </div>
      <h2 style={{
        fontSize: "clamp(20px, 4vw, 36px)", fontFamily: "Georgia, serif", fontWeight: 900,
        background: "linear-gradient(135deg, #ff4400, #ffcc00, #ffffff)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        margin: "0 0 8px",
      }}>Điền Vào Ô Trống</h2>
      <p style={{ color: "rgba(255,180,100,0.7)", fontSize: "13px", fontFamily: "Georgia, serif", marginBottom: "28px", maxWidth: 480 }}>
        Nhìn vào bức tranh, điền tên sự kiện lịch sử vào các ô trống bên dưới
      </p>

      {/* Puzzle image preview + word grid side by side */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "48px", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}>

        {/* Puzzle image */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", flexShrink: 0 }}>
          <div style={{
            width: "min(90vw, 320px)",
            borderRadius: "8px", overflow: "hidden",
            border: "2px solid rgba(255,150,0,0.55)",
            boxShadow: "0 0 40px rgba(180,40,0,0.55), 0 0 0 1px rgba(255,200,0,0.15)",
            position: "relative",
          }}>
            <PuzzleImage style={{ width: "100%", height: "100%" }} />
            {/* 3×3 grid overlay to show puzzle seams */}
            <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
              {[1, 2].map((n) => (
                <div key={`v${n}`} style={{
                  position: "absolute", top: 0, bottom: 0,
                  left: `${(n / 3) * 100}%`, width: "1px",
                  background: "rgba(0,0,0,0.35)",
                }} />
              ))}
              {[1, 2].map((n) => (
                <div key={`h${n}`} style={{
                  position: "absolute", left: 0, right: 0,
                  top: `${(n / 3) * 100}%`, height: "1px",
                  background: "rgba(0,0,0,0.35)",
                }} />
              ))}
            </div>
          </div>
          <p style={{
            margin: 0, fontSize: "11px", letterSpacing: "0.2em",
            color: "rgba(255,180,80,0.5)", fontFamily: "Georgia, serif",
            textTransform: "uppercase",
          }}>✦ Bức tranh gợi ý ✦</p>
        </div>

        {/* Word rows — 2-row layout, no numbering */}
        <div style={{
          animation: wrong ? "shake 0.5s ease" : "none",
          display: "flex", flexDirection: "column", gap: "20px", alignItems: "center",
        }}>
        {[[0, 1], [2, 3, 4]].map((rowWords, rowIdx) => (
          <div key={rowIdx} style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>
            {rowWords.map((wi) => {
              const word = ANSWER_WORDS[wi];
              return (
                <div key={wi} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  {/* Letter cells */}
                  <div style={{ display: "flex", gap: `${gap}px` }}>
                    {word.split("").map((ch, li) => {
                      const flatIdx = getFlatIdx(wi, li);
                      const cell = inputs[wi][li];
                      const isRevealed = cell.revealed;
                      const isCorrectCell = submitted && correct;

                      return (
                        <div key={li} style={{ position: "relative" }}>
                          {isRevealed ? (
                            <div style={{
                              width: cellSize, height: cellSize,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              fontSize: "18px", fontWeight: "bold",
                              fontFamily: "Georgia, serif",
                              color: submitted && correct ? "#88ffaa" : wrong ? "#ff6655" : "#ffcc44",
                              borderBottom: `3px solid ${submitted && correct ? "#00dd55" : wrong ? "#dd2200" : "#ffaa00"}`,
                              background: submitted && correct ? "rgba(0,180,60,0.15)" : wrong ? "rgba(200,0,0,0.15)" : "rgba(255,180,0,0.08)",
                              borderRadius: "3px 3px 0 0",
                              letterSpacing: 0,
                              userSelect: "none",
                              transition: "all 0.3s",
                            }}>
                              {ch.toUpperCase()}
                            </div>
                          ) : (
                            <input
                              ref={(el) => { inputRefs.current[flatIdx] = el; }}
                              maxLength={2}
                              value={cell.value}
                              onChange={(e) => handleChange(wi, li, e.target.value)}
                              onKeyDown={(e) => handleKeyDown(wi, li, e)}
                              disabled={submitted}
                              style={{
                                width: cellSize, height: cellSize,
                                textAlign: "center", fontSize: "18px", fontWeight: "bold",
                                fontFamily: "Georgia, serif",
                                background: submitted && correct
                                  ? "rgba(0,180,60,0.2)"
                                  : wrong
                                    ? "rgba(200,0,0,0.2)"
                                    : "rgba(255,255,255,0.06)",
                                border: "2px solid",
                                borderColor: submitted && correct
                                  ? "#00dd55"
                                  : wrong
                                    ? "#dd2200"
                                    : cell.value
                                      ? "rgba(255,180,0,0.6)"
                                      : "rgba(255,255,255,0.2)",
                                borderRadius: "4px",
                                color: submitted && correct ? "#88ffaa" : wrong ? "#ff8877" : "#fff5e0",
                                outline: "none",
                                cursor: submitted ? "default" : "text",
                                transition: "all 0.3s",
                                boxShadow: submitted && correct
                                  ? "0 0 10px rgba(0,220,80,0.4)"
                                  : wrong
                                    ? "0 0 10px rgba(220,0,0,0.4)"
                                    : cell.value && !submitted ? "0 0 8px rgba(255,160,0,0.3)" : "none",
                                textTransform: "uppercase",
                              }}
                              onFocus={(e) => { if (!submitted) e.currentTarget.style.borderColor = "#ffaa00"; }}
                              onBlur={(e) => { if (!submitted && !cell.value) e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        </div>
      </div>

      {/* Submit / result */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          style={{
            marginTop: "32px", padding: "14px 44px",
            fontSize: "15px", letterSpacing: "0.15em",
            fontFamily: "Georgia, serif", fontWeight: 700,
            textTransform: "uppercase", cursor: "pointer",
            border: "2px solid #cc4400", borderRadius: "2px",
            color: "#ffcc88",
            background: "linear-gradient(135deg, rgba(180,40,0,0.35), rgba(120,20,0,0.2))",
            transition: "all 0.3s",
            boxShadow: "0 4px 20px rgba(180,40,0,0.3)",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#ffee00"; e.currentTarget.style.color = "#1a0800"; e.currentTarget.style.background = "linear-gradient(135deg,#ffee00,#ff8800)"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "#cc4400"; e.currentTarget.style.color = "#ffcc88"; e.currentTarget.style.background = "linear-gradient(135deg,rgba(180,40,0,0.35),rgba(120,20,0,0.2))"; }}
        >
          ✅ Xác Nhận Đáp Án
        </button>
      ) : correct ? (
        <div style={{ marginTop: "32px", animation: "fadeIn 0.6s ease" }}>
          <div style={{ fontSize: "48px", marginBottom: "8px" }}>🎉</div>
          <p style={{
            fontSize: "22px", fontWeight: "bold", fontFamily: "Georgia, serif",
            background: "linear-gradient(135deg, #ffee00, #ffffff)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            margin: "0 0 8px",
          }}>Xuất Sắc!</p>
          <p style={{ color: "rgba(255,200,140,0.8)", fontSize: "15px", fontFamily: "Georgia, serif", marginBottom: "24px" }}>
            🇻🇳 Chiến thắng Điện Biên Phủ — Lừng lẫy năm châu, chấn động địa cầu!
          </p>
          <button
            onClick={onRestart}
            style={{
              padding: "12px 32px", background: "rgba(180,40,0,0.3)",
              border: "1px solid #cc4400", color: "#ffcc88", borderRadius: "4px",
              cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "14px",
              letterSpacing: "0.1em",
            }}
          >🔄 Chơi lại từ đầu</button>
        </div>
      ) : null}

      {/* Hint */}
      {!submitted && (
        <p style={{
          marginTop: "20px", color: "rgba(255,150,80,0.4)", fontSize: "12px",
          fontFamily: "Georgia, serif", fontStyle: "italic",
        }}>
          Gợi ý: Một sự kiện lịch sử năm 1954 ✦
        </p>
      )}
    </div>
  );
}

// ─── PUZZLE SCREEN ────────────────────────────────────────────────────────────
function PuzzleScreen({ onComplete, autoSolve = false }) {
  const CELL_W = 126; // ~3:2 ratio matching actual images (853/3≈284, 569/3≈190)
  const CELL_H = 84;
  const SIZE_W = CELL_W * GRID; // 378
  const SIZE_H = CELL_H * GRID; // 252

  // positions[i] = index of piece currently in slot i (or null)
  const [slots, setSlots] = useState(() =>
    autoSolve ? Array.from({ length: TOTAL }, (_, i) => i) : Array(TOTAL).fill(null)
  );
  // unplaced pieces shuffled
  const [tray, setTray] = useState(() =>
    autoSolve ? [] : shuffle(Array.from({ length: TOTAL }, (_, i) => i))
  );
  const [dragging, setDragging] = useState(null); // { piece, from: 'tray'|'slot', idx }
  const [won, setWon] = useState(autoSolve);
  const [in_, setIn] = useState(false);

  useEffect(() => { setTimeout(() => setIn(true), 80); }, []);

  useEffect(() => {
    if (slots.every((s, i) => s === i)) {
      setTimeout(() => setWon(true), 800);
    }
  }, [slots]);

  const handleDragStart = (piece, from, idx) => setDragging({ piece, from, idx });

  const handleDropOnSlot = (slotIdx) => {
    if (!dragging) return;
    const { piece, from, idx } = dragging;
    const newSlots = [...slots];
    const newTray = [...tray];

    // Remove piece from source
    if (from === "tray") {
      const ti = newTray.indexOf(piece);
      if (ti !== -1) newTray.splice(ti, 1);
    } else {
      newSlots[idx] = null;
    }

    // If slot occupied, send displaced piece back to tray
    if (newSlots[slotIdx] !== null) {
      newTray.push(newSlots[slotIdx]);
    }

    newSlots[slotIdx] = piece;
    setSlots(newSlots);
    setTray(newTray);
    setDragging(null);
  };

  const handleDropOnTray = () => {
    if (!dragging || dragging.from === "tray") { setDragging(null); return; }
    const { piece, idx } = dragging;
    const newSlots = [...slots];
    newSlots[idx] = null;
    setTray([...tray, piece]);
    setSlots(newSlots);
    setDragging(null);
  };

  const PieceDiv = ({ piece, draggable = true, size = CELL }) => (
    <div
      draggable={draggable}
      onDragStart={() => handleDragStart(piece, "slot", null)}
      style={{
        width: size, height: size,
        overflow: "hidden", cursor: "grab",
        border: "1px solid rgba(255,200,0,0.5)",
        userSelect: "none",
        flexShrink: 0,
        position: "relative",
      }}
    >
      <img
        src={PIECE_IMAGES[piece]}
        alt={`mảnh ${piece + 1}`}
        draggable={false}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
      />
    </div>
  );

  // When all pieces placed correctly, show overlay then transition
  if (won) {
    return (
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: "100vh", padding: "40px 20px",
        textAlign: "center", animation: "fadeIn 0.8s ease",
      }}>
        <div style={{ fontSize: "60px", marginBottom: "12px", animation: "pulse 2s infinite" }}>🧩</div>
        <h2 style={{
          fontSize: "clamp(24px, 4vw, 44px)", fontFamily: "Georgia, serif", fontWeight: 900,
          background: "linear-gradient(135deg, #ffee00, #ff8800, #ffffff)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          margin: "0 0 12px",
        }}>Ghép Hình Hoàn Chỉnh!</h2>
        {/* Full image preview */}
        <div style={{
          width: "min(90vw, 480px)",
          borderRadius: "8px", overflow: "hidden",
          border: "3px solid #ffcc00", margin: "16px 0",
          boxShadow: "0 0 50px rgba(255,180,0,0.5)",
        }}>
          <PuzzleImage style={{ width: "100%", height: "auto" }} />
        </div>
        <p style={{ color: "rgba(255,200,140,0.85)", fontFamily: "Georgia, serif", fontSize: "15px", marginBottom: "24px" }}>
          Bức tranh lịch sử đã hiện ra — Hãy đoán tên sự kiện!
        </p>
        <button
          onClick={() => onComplete()}
          style={{
            padding: "14px 44px", fontSize: "15px", letterSpacing: "0.15em",
            fontFamily: "Georgia, serif", fontWeight: 700, textTransform: "uppercase",
            cursor: "pointer", border: "2px solid #ffcc00", borderRadius: "2px",
            color: "#1a0800",
            background: "linear-gradient(135deg, #ffee00, #ff8800)",
            boxShadow: "0 8px 30px rgba(255,200,0,0.4)",
            animation: "pulse 2s ease-in-out infinite",
          }}
        >✍️ Điền Tên Sự Kiện →</button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 720, width: "100%", margin: "0 auto", padding: "24px 16px",
      opacity: in_ ? 1 : 0, transition: "opacity 0.8s ease",
    }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <div style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#ff8844", marginBottom: "8px", textTransform: "uppercase" }}>
          🧩 Ghép Hình · Hoàn Thành Lịch Sử
        </div>
        <h2 style={{
          fontSize: "clamp(20px, 4vw, 36px)", fontFamily: "Georgia, serif", fontWeight: 900,
          background: "linear-gradient(135deg, #ff4400, #ffcc00)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          margin: 0,
        }}>Tái Hiện Bức Tranh Lịch Sử</h2>
        <p style={{ color: "rgba(255,180,100,0.7)", fontSize: "13px", fontFamily: "Georgia, serif", marginTop: "8px" }}>
          Kéo và thả các mảnh ghép vào đúng vị trí
        </p>
      </div>

      {/* Grid board */}
      <div style={{
        display: "grid", gridTemplateColumns: `repeat(${GRID}, ${CELL_W}px)`,
        gridTemplateRows: `repeat(${GRID}, ${CELL_H}px)`,
        gap: 0, margin: "0 auto 28px",
        width: SIZE_W, maxWidth: "90vw",
        border: "2px solid rgba(255,180,0,0.4)",
        borderRadius: "4px", overflow: "hidden",
        boxShadow: "0 0 40px rgba(200,0,0,0.2)",
      }}>
        {slots.map((piece, slotIdx) => (
          <div
            key={slotIdx}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDropOnSlot(slotIdx)}
            style={{
              width: CELL_W, height: CELL_H,
              background: piece !== null
                ? "transparent"
                : `repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 10px)`,
              border: "1px solid rgba(255,150,0,0.2)",
              position: "relative",
              boxSizing: "border-box",
            }}
          >
            {/* Slot number hint */}
            {piece === null && (
              <div style={{
                position: "absolute", top: "50%", left: "50%",
                transform: "translate(-50%,-50%)",
                fontSize: "12px", color: "rgba(255,150,80,0.2)",
                fontFamily: "Georgia, serif",
              }}>{slotIdx + 1}</div>
            )}
            {piece !== null && (
              <div
                draggable
                onDragStart={() => handleDragStart(piece, "slot", slotIdx)}
                style={{ width: "100%", height: "100%", overflow: "hidden", cursor: "grab", position: "relative" }}
              >
                <img
                  src={PIECE_IMAGES[piece]}
                  alt={`mảnh ${piece + 1}`}
                  draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
                />

              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tray */}
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDropOnTray}
        style={{
          background: "rgba(10,4,0,0.7)", border: "1px dashed rgba(255,150,0,0.3)",
          borderRadius: "8px", padding: "16px", minHeight: "80px",
          display: "flex", flexWrap: "wrap", gap: "8px", justifyContent: "center",
        }}
      >
        <div style={{
          width: "100%", textAlign: "center",
          fontSize: "11px", letterSpacing: "0.15em", color: "rgba(255,150,80,0.5)",
          marginBottom: tray.length ? "8px" : 0, textTransform: "uppercase",
        }}>
          {tray.length === 0 ? "✅ Tất cả mảnh đã đặt vào bảng!" : "Kho mảnh ghép — Kéo vào bảng"}
        </div>
        {tray.map((piece) => (
          <div
            key={piece}
            draggable
            onDragStart={() => handleDragStart(piece, "tray", null)}
            style={{
              width: CELL_W, height: CELL_H,
              overflow: "hidden", cursor: "grab",
              border: "1px solid rgba(255,200,0,0.4)",
              borderRadius: "3px", flexShrink: 0, position: "relative",
              boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
              background: "rgba(0,0,0,0.3)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 0 16px rgba(255,180,0,0.5)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.5)"; }}
          >
            <img
              src={PIECE_IMAGES[piece]}
              alt={`mảnh ${piece + 1}`}
              draggable={false}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", pointerEvents: "none" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function QuizPage({ onNavigate, easterKey = 0, wordguessKey = 0 }) {
  const [screen, setScreen] = useState("welcome");
  const [qIdx, setQIdx] = useState(0);
  const [collected, setCollected] = useState(0);
  const [quizKey, setQuizKey] = useState(0);
  const [autoFill, setAutoFill] = useState(false);
  const [puzzleAutoSolve, setPuzzleAutoSolve] = useState(false);
  const [shuffledOrder, setShuffledOrder] = useState(() => shuffle(Array.from({ length: QUESTIONS.length }, (_, i) => i)));

  const reshuffle = useCallback(() => {
    setShuffledOrder(shuffle(Array.from({ length: QUESTIONS.length }, (_, i) => i)));
  }, []);

  // ── Ctrl+Q (from App.jsx) → jump straight to puzzle screen, already assembled ──
  useEffect(() => {
    if (easterKey > 0) {
      setPuzzleAutoSolve(true);
      setScreen("puzzle");
    }
  }, [easterKey]);

  // ── wordguessKey from App.jsx (Ctrl+A+E) → jump to word-guess, all filled ──
  useEffect(() => {
    if (wordguessKey > 0) {
      setAutoFill(true);
      setQIdx(0);
      setCollected(0);
      setQuizKey((k) => k + 1);
      setScreen("wordguess");
    }
  }, [wordguessKey]);

  const handleCorrect = useCallback(() => {
    const next = collected + 1;
    setCollected(next);
    if (next >= TOTAL) {
      setScreen("puzzle");
    } else {
      setQIdx((i) => i + 1);
    }
  }, [collected]);

  const handleWrong = useCallback(() => {
    reshuffle();
    setQIdx(0);
    setCollected(0);
    setQuizKey((k) => k + 1);
    setScreen("quiz");
  }, [reshuffle]);

  const handleRestart = useCallback(() => {
    reshuffle();
    setQIdx(0);
    setCollected(0);
    setQuizKey((k) => k + 1);
    setAutoFill(false);
    setPuzzleAutoSolve(false);
    setScreen("welcome");
  }, [reshuffle]);



  const startQuiz = () => { reshuffle(); setQIdx(0); setCollected(0); setQuizKey((k) => k + 1); setPuzzleAutoSolve(false); setScreen("quiz"); };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #0a0400 0%, #1a0800 30%, #0d0200 60%, #050000 100%)",
      fontFamily: "Georgia, serif",
      position: "relative",
      color: "#fff5e0",
    }}>
      <StarsBg />

      {/* Red glow */}
      <div style={{
        position: "fixed", bottom: "-10%", left: "50%", transform: "translateX(-50%)",
        width: "120%", height: "50%",
        background: "radial-gradient(ellipse at center bottom, rgba(180,20,0,0.25) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Top bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 20,
        background: "rgba(10,4,0,0.85)", backdropFilter: "blur(8px)",
        borderBottom: "1px solid rgba(255,100,0,0.2)",
        padding: "12px 24px", display: "flex", alignItems: "center", gap: "16px",
      }}>
        <button
          onClick={() => onNavigate && onNavigate("home")}
          style={{
            background: "none", border: "1px solid rgba(255,150,0,0.3)",
            color: "rgba(255,180,100,0.7)", padding: "6px 14px",
            borderRadius: "3px", cursor: "pointer", fontSize: "12px",
            letterSpacing: "0.1em", fontFamily: "Georgia, serif",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = "#ff8800"; e.currentTarget.style.color = "#ffcc88"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,150,0,0.3)"; e.currentTarget.style.color = "rgba(255,180,100,0.7)"; }}
        >
          ← Trang chủ
        </button>
        <span style={{ fontSize: "13px", color: "#ffaa55", letterSpacing: "0.15em" }}>
          ⚔️ Đuổi Hình Bắt Chữ · Lịch Sử Việt Nam
        </span>
      </div>

      <div style={{ paddingTop: "64px", position: "relative", zIndex: 2 }}>
        {screen === "welcome" && <WelcomeScreen onStart={startQuiz} />}
        {screen === "quiz" && (
          <QuestionScreen
            key={`${quizKey}-${qIdx}`}
            question={QUESTIONS[shuffledOrder[qIdx]]}
            index={qIdx}
            total={TOTAL}
            collectedPieces={collected}
            onCorrect={handleCorrect}
            onWrong={handleWrong}
          />
        )}
        {screen === "puzzle" && <PuzzleScreen onComplete={() => setScreen("wordguess")} autoSolve={puzzleAutoSolve} />}
        {screen === "wordguess" && <WordGuessScreen onRestart={handleRestart} autoFill={autoFill} />}
      </div>

      {/* Top/bottom accent lines */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #cc2200, #ffcc00, #cc2200, transparent)", zIndex: 30 }} />
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #cc2200, #ffcc00, #cc2200, transparent)", zIndex: 30 }} />

      <style>{`
        @keyframes twinkle { from { opacity: 0.15; } to { opacity: 0.8; } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
        @keyframes pulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.1); } }
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes piecePop { 0% { transform: scale(0.5); opacity: 0; } 60% { transform: scale(1.08); } 100% { transform: scale(1); opacity: 1; } }
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        * { box-sizing: border-box; }
        button:focus { outline: none; }
      `}</style>
    </div>
  );
}