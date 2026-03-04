import { useState } from 'react';

export default function AIUsageModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'fadeIn 0.3s ease',
      }}
    >
      <div style={{
        background: 'linear-gradient(160deg, #120500, #0d0200)',
        border: '2px solid rgba(255,120,0,0.6)',
        borderRadius: '12px',
        padding: '32px',
        textAlign: 'center',
        boxShadow: '0 0 60px rgba(180,40,0,0.4), 0 0 120px rgba(180,40,0,0.15)',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '80vh',
        overflowY: 'auto',
        position: 'relative',
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: 'rgba(255,180,100,0.7)',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '50%',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,120,0,0.2)';
            e.currentTarget.style.color = 'rgba(255,180,100,1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'none';
            e.currentTarget.style.color = 'rgba(255,180,100,0.7)';
          }}
        >
          ×
        </button>

        {/* Header */}
        <div style={{
          fontSize: '13px',
          letterSpacing: '0.3em',
          color: '#ff8844',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>
          🤖 AI Usage
        </div>

        {/* Title */}
        <h2 style={{
          color: '#fff5e0',
          fontFamily: 'Georgia, serif',
          fontSize: '24px',
          marginBottom: '24px',
          fontWeight: 'normal',
        }}>
          Hỗ Trợ AI Trong Dự Án
        </h2>

        {/* Content */}
        <div style={{
          textAlign: 'left',
          color: 'rgba(255,210,160,0.85)',
          fontFamily: 'Georgia, serif',
          fontSize: '16px',
          lineHeight: 1.7,
          marginBottom: '32px',
        }}>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              color: '#ffaa66',
              fontSize: '18px',
              marginBottom: '12px',
              fontWeight: 'bold',
            }}>
              🎯 Mục Đích Sử Dụng AI
            </h3>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li>Tóm tắt và phân tích nội dung bài học về cách mạng Việt Nam</li>
              <li>Thiết kế giao diện website với trải nghiệm người dùng tốt nhất</li>
              <li>Tối ưu hóa cấu trúc thông tin và luồng học tập</li>
              <li>Hỗ trợ trả lời câu hỏi học thuật liên quan đến chủ đề</li>
            </ul>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              color: '#ffaa66',
              fontSize: '18px',
              marginBottom: '12px',
              fontWeight: 'bold',
            }}>
              ⚡ Công Nghệ AI Được Sử Dụng
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ color: '#ff9955' }}>• Google Gemini AI:</strong> Xử lý ngôn ngữ tự nhiên và trả lời câu hỏi chuyên sâu
            </div>
            <div style={{ marginBottom: '16px' }}>
              <strong style={{ color: '#ff9955' }}>• Claude AI:</strong> Thiết kế và phát triển website, tối ưu UX/UI
            </div>
            <div>
              <strong style={{ color: '#ff9955' }}>• ChatGPT:</strong> Nghiên cứu và tổng hợp nội dung học thuật
            </div>
          </div>

          <div style={{ marginBottom: '24px' }}>
            <h3 style={{
              color: '#ffaa66',
              fontSize: '18px',
              marginBottom: '12px',
              fontWeight: 'bold',
            }}>
              📚 Lĩnh Vực Ứng Dụng
            </h3>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              <li><strong>Nghiên cứu lịch sử:</strong> Phân tích tài liệu và sự kiện lịch sử</li>
              <li><strong>Thiết kế web:</strong> Tạo giao diện tương tác và thân thiện</li>
              <li><strong>Giáo dục:</strong> Xây dựng hệ thống câu hỏi và bài kiểm tra</li>
              <li><strong>Tương tác người dùng:</strong> Chatbot hỗ trợ học tập 24/7</li>
            </ul>
          </div>

          <div style={{
            background: 'rgba(255,150,0,0.1)',
            border: '1px solid rgba(255,150,0,0.3)',
            borderRadius: '8px',
            padding: '16px',
            marginTop: '20px',
          }}>
            <p style={{
              margin: 0,
              fontSize: '14px',
              fontStyle: 'italic',
              color: 'rgba(255,210,160,0.9)',
            }}>
              💡 <strong>Lưu ý:</strong> AI được sử dụng như một công cụ hỗ trợ để nâng cao chất lượng học tập 
              và trải nghiệm người dùng. Tất cả nội dung đều được kiểm duyệt và xác thực bởi con người.
            </p>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}