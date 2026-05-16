'use client';

import { useState, useEffect, useRef } from 'react';

const STARTER_QUESTIONS = [
  "How do you bridge business & tech?",
  "What's your strategy at LTH?",
  "Tell me about your side projects",
  "What do you do outside of work?"
];

export function ChatInterface({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState([
    { role: 'bot', content: "Hi! I'm Arnab's digital twin. I'm powered by AI and grounded in his real-world data. How can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [count, setCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (userMsg: string) => {
    if (!userMsg.trim() || count >= 3 || isTyping) return;

    const newMessages = [...messages, { role: 'user', content: userMsg.trim() }];
    setMessages(newMessages);
    setInput("");
    setCount(prev => prev + 1);
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      const data = await response.json();
      let botReply = data.content;

      if (count === 2) {
        botReply += "\n\n(That was my 3rd response! Let's continue this conversation on LinkedIn.)";
      }

      setMessages(prev => [...prev, { role: 'bot', content: botReply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'bot', content: "I'm having a bit of a moment. Please try again or connect with Arnab on LinkedIn!" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
      {!compact && (
        <div className="chat-header" style={{ 
          padding: '1.25rem', 
          background: 'var(--foreground)', 
          color: '#fff', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          flexShrink: 0 
        }}>
           <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', background: '#fff', flexShrink: 0 }}>
             <img src="/profile.jpeg" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Arnab" />
           </div>
           <div>
             <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Arnab AI</div>
             <div style={{ fontSize: '0.7rem', opacity: 0.8 }}>{count}/3 Prompts used</div>
           </div>
        </div>
      )}

      <div className="chat-messages" style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', minHeight: 0 }}>
        {messages.map((msg, i) => (
          <div key={i} className={`chat-bubble ${msg.role === 'user' ? 'user' : ''}`}>
            <div style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</div>
            {(msg.content.includes("LinkedIn") || count >= 3) && msg.role === 'bot' && (
              <div style={{ marginTop: '1rem' }}>
                <a href="https://www.linkedin.com/in/arnab-mitra96/" target="_blank" className="btn" style={{ 
                  background: 'var(--accent)', 
                  color: '#fff', 
                  padding: '0.5rem 1rem', 
                  fontSize: '0.8rem',
                  display: 'inline-block',
                  textDecoration: 'none',
                  borderRadius: '8px'
                }}>Connect on LinkedIn</a>
              </div>
            )}
          </div>
        ))}
        {isTyping && <div className="chat-bubble" style={{ opacity: 0.6 }}>Thinking...</div>}
        
        {count === 0 && messages.length === 1 && (
          <div className="chat-starter-grid">
            {STARTER_QUESTIONS.map((q, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(q)}
                style={{
                  background: '#f0fdf4',
                  border: '1px solid #dcfce7',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  color: 'var(--accent)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textAlign: 'left',
                  transition: 'all 0.2s',
                  lineHeight: '1.2'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'var(--accent)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = '#f0fdf4';
                  e.currentTarget.style.color = 'var(--accent)';
                }}
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="chat-input-area" style={{ flexShrink: 0 }}>
        {count < 3 ? (
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Ask about BCG, LTH, or BITS/IIM..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
          />
        ) : (
          <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--muted)', padding: '0.5rem' }}>
            Limit reached. Let's talk on LinkedIn!
          </div>
        )}
      </form>
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="chat-floating-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✕" : "💬"}
      </div>

      {isOpen && (
        <div className="chat-window">
          <ChatInterface />
        </div>
      )}
    </>
  );
}
