import { useState, useEffect } from 'react';
import './ChatMessage.css';

export default function ChatMessage({ message, isTyping = false, onTypingComplete }) {
    const [displayedContent, setDisplayedContent] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (message.type === 'ai' && isTyping) {
            let index = 0;
            const content = message.content;
            const speed = 15; // ms per character

            const timer = setInterval(() => {
                if (index < content.length) {
                    setDisplayedContent(content.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(timer);
                    setIsComplete(true);
                    onTypingComplete?.();
                }
            }, speed);

            return () => clearInterval(timer);
        } else {
            setDisplayedContent(message.content);
            setIsComplete(true);
        }
    }, [message, isTyping, onTypingComplete]);

    // Parse markdown-like content (bold text)
    const formatContent = (text) => {
        return text.split(/(\*\*[^*]+\*\*)/).map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return (
        <div className={`chat-message ${message.type}`}>
            {message.type === 'ai' && (
                <div className="message-avatar">
                    <span className="avatar-emoji">🤖</span>
                </div>
            )}
            <div className="message-bubble">
                <div className="message-content">
                    {displayedContent.split('\n').map((line, i) => (
                        <p key={i}>{formatContent(line)}</p>
                    ))}
                    {!isComplete && <span className="typing-cursor">|</span>}
                </div>
            </div>
        </div>
    );
}
