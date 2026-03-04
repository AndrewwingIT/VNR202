import { useState, useRef, useEffect } from 'react';

const GEMINI_API_KEY = 'AIzaSyBenlDPq7rFfeY-zAeUmTz4IFF2Wa6vda0'; // Replace with your actual API key
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// Fallback responses for demo purposes
const FALLBACK_RESPONSES = [
  // Đoàn kết dân tộc
  'Sức mạnh cốt lõi giúp cách mạng Việt Nam chiến thắng chính là tinh thần đoàn kết toàn dân tộc. Dưới sự lãnh đạo của Đảng Cộng sản Việt Nam và Chủ tịch Hồ Chí Minh, mọi tầng lớp nhân dân — từ nông dân, công nhân đến trí thức — đều hướng về một mục tiêu chung: độc lập, tự do và thống nhất đất nước. Khát vọng ấy đã tạo nên sức mạnh vô địch không kẻ thù nào có thể khuất phục.',

  // Vai trò của Đảng và Hồ Chí Minh
  'Vai trò lãnh đạo của Đảng Cộng sản Việt Nam và Chủ tịch Hồ Chí Minh là nhân tố quyết định hàng đầu. Đảng đã xây dựng đường lối cách mạng đúng đắn, kết hợp sáng tạo chủ nghĩa Mác-Lênin với thực tiễn Việt Nam. Chủ tịch Hồ Chí Minh không chỉ là nhà tư tưởng vĩ đại mà còn là biểu tượng đoàn kết, truyền cảm hứng bất diệt cho toàn dân tộc trong suốt hành trình đấu tranh.',

  // Chiến lược quân sự
  'Nghệ thuật quân sự độc đáo của Việt Nam là một yếu tố then chốt. Chiến lược "chiến tranh nhân dân" — kết hợp chiến tranh du kích với chiến tranh chính quy — đã biến cả đất nước thành một chiến trường rộng lớn. Chiến thắng Điện Biên Phủ năm 1954 là minh chứng rõ nhất: quân và dân ta đã đánh bại đội quân viễn chinh Pháp hùng mạnh bằng ý chí và trí tuệ vượt trội.',

  // Chiến tranh nhân dân
  'Học thuyết "chiến tranh nhân dân toàn dân, toàn diện" là sáng tạo chiến lược vĩ đại của cách mạng Việt Nam. Theo đó, mỗi làng xã là một pháo đài, mỗi người dân là một chiến sĩ. Hậu phương và tiền tuyến hòa quyện vào nhau, tạo nên sức chiến đấu bền bỉ và khó bị tiêu diệt. Đây là điều mà các cường quốc với vũ khí hiện đại nhất cũng không thể dễ dàng đối phó.',

  // Ngoại giao
  'Nền ngoại giao "vừa đánh vừa đàm" linh hoạt của Việt Nam đã phát huy hiệu quả trong cả hai cuộc kháng chiến. Việt Nam khéo léo tranh thủ sự ủng hộ của Liên Xô, Trung Quốc và phong trào phản chiến quốc tế, đồng thời tận dụng mâu thuẫn nội bộ trong lòng kẻ thù. Hiệp định Paris năm 1973 là thắng lợi ngoại giao lịch sử, buộc Mỹ rút quân và tạo điều kiện cho đại thắng mùa Xuân 1975.',

  // Vị thế chính nghĩa
  'Cách mạng Việt Nam luôn đứng trên lập trường chính nghĩa — cuộc đấu tranh vì độc lập dân tộc và quyền tự quyết của nhân dân — điều đó tạo nên sức mạnh tinh thần không thể bị bẻ gãy. Tính chính nghĩa không chỉ củng cố ý chí chiến đấu trong nước mà còn thu hút sự đồng cảm và ủng hộ rộng rãi từ nhân dân tiến bộ trên toàn thế giới.',

  // Yếu tố địa lý và chiến tranh du kích
  'Địa hình đặc thù của Việt Nam — rừng núi hiểm trở, sông ngòi chằng chịt — đã được khai thác tối đa trong chiến thuật chiến tranh du kích. Quân và dân ta biến bất lợi thành lợi thế, sử dụng địa hình để vô hiệu hóa ưu thế vũ khí và công nghệ của kẻ thù. Đây là bài học chiến lược "lấy nhỏ thắng lớn, lấy ít địch nhiều" đặc sắc của quân sự Việt Nam.',

  // Tinh thần bất khuất
  'Tinh thần bất khuất, kiên cường của dân tộc Việt Nam được hun đúc qua hàng nghìn năm lịch sử chống giặc ngoại xâm. Từ chống Bắc thuộc, kháng Mông Nguyên đến đánh đuổi Thực dân Pháp và Đế quốc Mỹ — mỗi thế hệ người Việt đều kế thừa và phát huy truyền thống ấy. Ý chí "Không có gì quý hơn độc lập, tự do" của Hồ Chí Minh đã trở thành kim chỉ nam cho toàn dân tộc.',

  // Mặt trận đoàn kết
  'Mặt trận Dân tộc Thống nhất — từ Mặt trận Việt Minh đến Mặt trận Giải phóng miền Nam — là vũ khí chính trị sắc bén của cách mạng. Bằng cách tập hợp mọi giai cấp, tầng lớp, tôn giáo và dân tộc vào một mặt trận chung, Đảng đã xây dựng khối đại đoàn kết rộng rãi nhất, cô lập kẻ thù về chính trị và phát huy sức mạnh tổng hợp của toàn dân.',

  // Sự ủng hộ quốc tế
  'Sự ủng hộ quốc tế — từ viện trợ vật chất của Liên Xô, Trung Quốc đến làn sóng phản chiến mạnh mẽ tại chính nước Mỹ và châu Âu — đã tạo ra áp lực chính trị khổng lồ. Phong trào "Việt Nam — Anh hùng" lan rộng toàn cầu, biến cuộc kháng chiến của nhân dân Việt Nam thành biểu tượng của cuộc đấu tranh chống áp bức, giành quyền tự do của các dân tộc bị áp bức trên thế giới.',

  // Cải cách ruộng đất và gắn kết nông dân
  'Cải cách ruộng đất và chính sách "người cày có ruộng" đã gắn kết hàng triệu nông dân — lực lượng đông đảo nhất — với sự nghiệp cách mạng. Khi người dân thực sự được hưởng thành quả từ cách mạng, họ sẵn sàng hy sinh và đóng góp mọi thứ cho kháng chiến. Đây là nền tảng kinh tế-xã hội vững chắc nuôi dưỡng cuộc chiến tranh trường kỳ.',

  // Hậu phương vững chắc
  'Xây dựng hậu phương vững chắc là một trong những bài học chiến lược quan trọng nhất. Trong kháng chiến chống Mỹ, miền Bắc xã hội chủ nghĩa vừa xây dựng kinh tế, vừa chi viện sức người sức của cho tiền tuyến miền Nam. Tuyến đường Hồ Chí Minh — huyết mạch chiến lược xuyên Trường Sơn — là biểu tượng của ý chí và sức sáng tạo phi thường của quân dân ta.',

  // Đại thắng mùa Xuân 1975
  'Đại thắng mùa Xuân 1975 là thắng lợi tất yếu của một dân tộc kiên cường sau 30 năm kháng chiến gian khổ. Chiến dịch Hồ Chí Minh lịch sử kết thúc bằng việc giải phóng hoàn toàn miền Nam ngày 30/4/1975, thống nhất đất nước. Đây không chỉ là chiến thắng của Việt Nam mà còn là thắng lợi của chủ nghĩa nhân văn — minh chứng rằng dù kẻ thù có mạnh đến đâu, ý chí và tinh thần dân tộc của nhân dân không bao giờ có thể bị tiêu diệt.',
];

const SYSTEM_PROMPT = `Bạn là một chuyên gia lịch sử Việt Nam, chuyên về chủ đề "Điều gì đã giúp cách mạng Việt Nam vượt qua những thách thức tưởng chừng không thể vượt qua, để đi đến thắng lợi vĩ đại nhất thế kỷ XX?". 

Hãy trả lời các câu hỏi một cách chính xác, chi tiết và có tính giáo dục. Tập trung vào:
- Tinh thần đoàn kết dân tộc
- Vai trò lãnh đạo của Đảng Cộng Sản Việt Nam và Chủ tịch Hồ Chí Minh
- Chiến lược quân sự và ngoại giao thông minh
- Sức mạnh của nhân dân
- Yếu tố quốc tế thuận lợi

Hãy trả lời bằng tiếng Việt và giữ giọng điệu tôn trọng, học thuật phù hợp với sinh viên đại học.`;

export default function AIChatboxModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Xin chào! Tôi là trợ lý AI chuyên về lịch sử cách mạng Việt Nam. Bạn có thể hỏi tôi về những yếu tố đã giúp cách mạng Việt Nam đạt được thắng lợi vĩ đại. Bạn muốn tìm hiểu về điều gì?',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      // Focus input when modal opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    // Check if API key is configured
    if (GEMINI_API_KEY === 'YOUR_API_KEY_HERE') {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: '⚠️ API key chưa được cấu hình. Vui lòng thay thế "YOUR_API_KEY_HERE" trong file AIChatboxModal.jsx bằng API key Gemini thật của bạn.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const currentInput = inputValue;
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: currentInput,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // First, try the real Gemini API
      const requestBody = {
        contents: [
          {
            parts: [
              {
                text: `${SYSTEM_PROMPT}\n\nCâu hỏi của người dùng: ${currentInput}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      };

      console.log('Sending request to Gemini API...');
      
      // Add timeout and better error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText, 'Status:', response.status);
        // All non-OK responses fall back to demo mode
        throw new Error('FALLBACK_MODE');
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      let botResponse = 'Xin lỗi, tôi không thể trả lời câu hỏi này lúc này.';
      
      if (data.candidates && data.candidates.length > 0) {
        const candidate = data.candidates[0];
        if (candidate.content && candidate.content.parts && candidate.content.parts.length > 0) {
          botResponse = candidate.content.parts[0].text;
        } else if (candidate.finishReason === 'SAFETY') {
          botResponse = '⚠️ Câu hỏi của bạn không thể được trả lời do vi phạm chính sách an toàn. Vui lòng thử với câu hỏi khác liên quan đến lịch sử cách mạng Việt Nam.';
        }
      }
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: botResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botMessage]);
      
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      let errorContent = error.message;
      let useFallback = false;
      
      // Check for common CORS/network errors
      if (error.name === 'TypeError' || 
          error.message.includes('fetch') ||
          error.message.includes('CORS') ||
          error.message.includes('FALLBACK_MODE') ||
          error.name === 'AbortError') {
        useFallback = true;
      }
      
      if (useFallback) {
        // Use fallback demo response
        const randomResponse = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
        const fallbackMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: `🤖${randomResponse}`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, fallbackMessage]);
      } else {
        // Show specific error message
        if (!errorContent.includes('❌') && !errorContent.includes('🚫') && !errorContent.includes('⏱️') && !errorContent.includes('🔧')) {
          errorContent = `❓ Lỗi không xác định: ${errorContent}. Vui lòng thử lại hoặc kiểm tra console để biết thêm chi tiết.`;
        }
        
        const errorMessage = {
          id: Date.now() + 1,
          type: 'bot',
          content: errorContent,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        content: 'Xin chào! Tôi là trợ lý AI chuyên về lịch sử cách mạng Việt Nam. Bạn có thể hỏi tôi về những yếu tố đã giúp cách mạng Việt Nam đạt được thắng lợi vĩ đại. Bạn muốn tìm hiểu về điều gì?',
        timestamp: new Date(),
      }
    ]);
  };

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
        width: '90%',
        maxWidth: '600px',
        height: '80vh',
        maxHeight: '700px',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 0 60px rgba(180,40,0,0.4), 0 0 120px rgba(180,40,0,0.15)',
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px 16px',
          borderBottom: '1px solid rgba(255,120,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontSize: '11px',
              letterSpacing: '0.3em',
              color: '#ff8844',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
              🤖 AI Chatbox
            </div>
            <h3 style={{
              color: '#fff5e0',
              fontFamily: 'Georgia, serif',
              fontSize: '18px',
              margin: 0,
              fontWeight: 'normal',
            }}>
              Trợ Lý Lịch Sử Việt Nam
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={clearChat}
              style={{
                background: 'rgba(255,120,0,0.2)',
                border: '1px solid rgba(255,120,0,0.4)',
                color: 'rgba(255,180,100,0.8)',
                padding: '6px 12px',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,120,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,120,0,0.2)';
              }}
            >
              Xóa Chat
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(255,180,100,0.7)',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '4px 8px',
                borderRadius: '4px',
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
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {messages.map((message) => (
            <div
              key={message.id}
              style={{
                display: 'flex',
                justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              <div style={{
                maxWidth: '80%',
                background: message.type === 'user' 
                  ? 'linear-gradient(135deg, #ff6600, #cc4400)'
                  : 'rgba(255,150,0,0.1)',
                border: `1px solid ${message.type === 'user' 
                  ? 'rgba(255,120,0,0.6)' 
                  : 'rgba(255,150,0,0.3)'}`,
                borderRadius: message.type === 'user' ? '12px 4px 12px 12px' : '4px 12px 12px 12px',
                padding: '12px 16px',
                color: message.type === 'user' ? '#fff' : 'rgba(255,210,160,0.9)',
                fontSize: '14px',
                lineHeight: 1.5,
                fontFamily: 'Georgia, serif',
                whiteSpace: 'pre-wrap',
              }}>
                {message.content}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
            }}>
              <div style={{
                background: 'rgba(255,150,0,0.1)',
                border: '1px solid rgba(255,150,0,0.3)',
                borderRadius: '4px 12px 12px 12px',
                padding: '12px 16px',
                color: 'rgba(255,210,160,0.7)',
                fontSize: '14px',
              }}>
                <div style={{
                  display: 'flex',
                  gap: '4px',
                  alignItems: 'center',
                }}>
                  <span>AI đang suy nghĩ</span>
                  <div style={{
                    display: 'flex',
                    gap: '2px',
                  }}>
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        style={{
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: 'rgba(255,150,0,0.6)',
                          animation: `bounce 1.4s infinite ease-in-out ${i * 0.16}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '16px 20px',
          borderTop: '1px solid rgba(255,120,0,0.3)',
          display: 'flex',
          gap: '12px',
          alignItems: 'flex-end',
        }}>
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Nhập câu hỏi về lịch sử cách mạng Việt Nam..."
            disabled={isLoading}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '2px solid rgba(255,150,0,0.3)',
              borderRadius: '8px',
              padding: '12px',
              color: '#fff5e0',
              fontSize: '14px',
              fontFamily: 'Georgia, serif',
              resize: 'none',
              minHeight: '44px',
              maxHeight: '120px',
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,150,0,0.7)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,150,0,0.3)';
            }}
          />
          <button
            onClick={sendMessage}
            disabled={!inputValue.trim() || isLoading}
            style={{
              background: inputValue.trim() && !isLoading 
                ? 'linear-gradient(135deg, #ff6600, #cc4400)'
                : 'rgba(255,120,0,0.2)',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 16px',
              color: inputValue.trim() && !isLoading ? '#fff' : 'rgba(255,180,100,0.5)',
              cursor: inputValue.trim() && !isLoading ? 'pointer' : 'not-allowed',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.2s',
              minWidth: '60px',
            }}
          >
            Gửi
          </button>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
          }
        `}</style>
      </div>
    </div>
  );
}