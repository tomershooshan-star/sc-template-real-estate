import { useState, useEffect, useRef } from 'react';
import { siteConfig } from '../config';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
}

type QuickReply = {
  label: string;
  response: string;
};

const QUICK_REPLIES: QuickReply[] = [
  {
    label: 'Schedule a Tour',
    response: "We'd love to show you around! You can book a consultation at " + siteConfig.ctaUrl + " or call us at " + siteConfig.phone + ". Our agents are available 7 days a week.",
  },
  {
    label: 'View Properties',
    response: 'We have an excellent portfolio of commercial and residential listings across the metro area. Visit our Properties page or call ' + siteConfig.phone + ' and an agent can match you with the right options.',
  },
  {
    label: 'Talk to an Agent',
    response: "Absolutely. Reach us at " + siteConfig.phone + " or " + siteConfig.email + ". Our agents are available Monday–Saturday, 9am–7pm, and are happy to answer any questions.",
  },
];

const BOT_INITIAL = "Welcome! How can we help you today? Whether you're buying, selling, or looking for an investment property — our team is here for you.";

// Real-estate uses a light site background, so the chat uses the primary (dark navy) color
const PANEL_BG = siteConfig.colors.primary;
const PANEL_BORDER = 'rgba(255,255,255,0.12)';
const PANEL_INPUT_BG = 'rgba(255,255,255,0.08)';
const PANEL_TEXT = 'rgba(255,255,255,0.75)';
const INDICATOR_BG = 'rgba(255,255,255,0.15)';

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-2">
      <div
        className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: siteConfig.colors.accent }}
      >
        <svg className="w-3 h-3" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      </div>
      <div className="px-4 py-3 flex items-center gap-1.5" style={{ background: INDICATOR_BG, border: `1px solid ${PANEL_BORDER}` }}>
        <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(false);
  const [quickRepliesUsed, setQuickRepliesUsed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isPulsing, setIsPulsing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) return;
    const interval = setInterval(() => {
      setIsPulsing(true);
      setTimeout(() => setIsPulsing(false), 1000);
    }, 5000);
    return () => clearInterval(interval);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    if (messages.length > 0) return;

    setShowTyping(true);
    const t = setTimeout(() => {
      setShowTyping(false);
      setMessages([{ id: 1, text: BOT_INITIAL, sender: 'bot' }]);
      setShowQuickReplies(true);
    }, 1500);
    return () => clearTimeout(t);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showTyping]);

  function handleQuickReply(reply: QuickReply) {
    setQuickRepliesUsed(true);
    setShowQuickReplies(false);
    setMessages(prev => [...prev, { id: Date.now(), text: reply.label, sender: 'user' }]);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply.response, sender: 'bot' }]);
    }, 1400);
  }

  function handleSend() {
    const text = inputValue.trim();
    if (!text) return;
    setInputValue('');
    setShowQuickReplies(false);
    setQuickRepliesUsed(true);
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thank you for reaching out! One of our agents will be in touch shortly. You can also call us at " + siteConfig.phone + " for immediate assistance.",
          sender: 'bot',
        },
      ]);
    }, 1400);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSend();
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat panel */}
      <div
        className="mb-4 w-80 shadow-2xl overflow-hidden flex flex-col"
        style={{
          background: PANEL_BG,
          border: `1px solid ${PANEL_BORDER}`,
          maxHeight: '480px',
          transformOrigin: 'bottom right',
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(16px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 0.22s cubic-bezier(0.34,1.56,0.64,1), opacity 0.18s ease',
        }}
        aria-hidden={!open}
      >
        {/* Header */}
        <div
          className="px-4 py-3.5 flex items-center justify-between flex-shrink-0"
          style={{ borderBottom: `1px solid ${PANEL_BORDER}` }}
        >
          <div className="flex items-center gap-2.5">
            <div className="relative flex-shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: siteConfig.colors.accent }}
              >
                <svg className="w-4 h-4" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400"
                style={{ border: `2px solid ${PANEL_BG}` }}
              />
            </div>
            <div>
              <p className="text-white font-semibold text-sm leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                {siteConfig.companyName}
              </p>
              <p className="text-green-400 text-[10px] font-medium">Online now</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="text-white/30 hover:text-white text-xl transition-colors leading-none"
            aria-label="Close chat"
          >
            &times;
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2" style={{ minHeight: '200px' }}>
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {msg.sender === 'bot' && (
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: siteConfig.colors.accent }}
                >
                  <svg className="w-3 h-3" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
              )}
              <div
                className="px-3.5 py-2.5 max-w-[78%] text-sm leading-relaxed"
                style={
                  msg.sender === 'user'
                    ? { background: siteConfig.colors.accent, color: '#fff', fontWeight: 500 }
                    : { background: INDICATOR_BG, border: `1px solid ${PANEL_BORDER}`, color: PANEL_TEXT }
                }
              >
                {msg.text}
              </div>
            </div>
          ))}

          {showTyping && <TypingIndicator />}

          {showQuickReplies && !quickRepliesUsed && (
            <div className="flex flex-wrap gap-2 mt-2">
              {QUICK_REPLIES.map(reply => (
                <button
                  key={reply.label}
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs px-3 py-1.5 transition-colors"
                  style={{
                    border: `1px solid rgba(255,255,255,0.25)`,
                    color: 'rgba(255,255,255,0.65)',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = '#fff';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.5)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.65)';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.25)';
                  }}
                >
                  {reply.label}
                </button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div
          className="px-3 pb-3 pt-3 flex-shrink-0"
          style={{ borderTop: `1px solid ${PANEL_BORDER}` }}
        >
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-3.5 py-2.5 text-sm text-white outline-none transition-colors"
              style={{
                background: PANEL_INPUT_BG,
                border: `1px solid ${PANEL_BORDER}`,
                color: '#fff',
              }}
            />
            <button
              onClick={handleSend}
              className="px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 flex-shrink-0"
              style={{ background: siteConfig.colors.accent, color: '#fff' }}
              aria-label="Send message"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 relative"
        style={{ background: siteConfig.colors.accent }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {!open && isPulsing && (
          <span
            className="absolute inset-0 animate-ping opacity-40"
            style={{ background: siteConfig.colors.accent }}
          />
        )}
        {open ? (
          <svg className="w-5 h-5 relative z-10" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5 relative z-10" fill="none" stroke="#fff" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
