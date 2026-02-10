import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const profileImage = '/donggun.png';

// Predefined responses about Donggun Lee
const RESPONSES = {
    greeting: "Hi! I'm Donggun's AI assistant. Ask me about his research, background, or interests!",
    research: "Donggun's research focuses on **Human-AI Interaction**, treating **AI as design material**. He's interested in how people perceive and interact with AI systems.",
    background: "Donggun is a Ph.D. student at **KAIST Industrial Design**, working at the **AI Experience Lab**. He has a background in industrial design.",
    interests: "His research interests include: **design**, **data**, **artificial intelligence**, and **posthuman design**.",
    contact: "You can reach Donggun at **donggun@kaist.ac.kr**. He's open to research collaborations!",
    publications: "Donggun has published papers at top HCI venues like **CHI** and **DIS**. Check the Publications section for more details.",
    lab: "The **AI Experience Lab** was founded in 2021 at KAIST. The lab explores innovation through design, data, and AI.",
    default: "I'm not sure about that. Try asking about: research, background, interests, publications, or contact info!"
};

function getResponse(message) {
    const lower = message.toLowerCase();

    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        return RESPONSES.greeting;
    }
    if (lower.includes('research') || lower.includes('work') || lower.includes('study')) {
        return RESPONSES.research;
    }
    if (lower.includes('background') || lower.includes('education') || lower.includes('who')) {
        return RESPONSES.background;
    }
    if (lower.includes('interest') || lower.includes('topic')) {
        return RESPONSES.interests;
    }
    if (lower.includes('contact') || lower.includes('email') || lower.includes('reach')) {
        return RESPONSES.contact;
    }
    if (lower.includes('paper') || lower.includes('publication') || lower.includes('publish')) {
        return RESPONSES.publications;
    }
    if (lower.includes('lab') || lower.includes('experience')) {
        return RESPONSES.lab;
    }

    return RESPONSES.default;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(true);
    const [messages, setMessages] = useState([
        { type: 'bot', text: RESPONSES.greeting }
    ]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMessage = input.trim();
        setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
        setInput('');

        // Simulate typing delay
        setTimeout(() => {
            const response = getResponse(userMessage);
            setMessages(prev => [...prev, { type: 'bot', text: response }]);
        }, 500);
    };

    const suggestedQuestions = [
        "What's your research about?",
        "Tell me about your background",
        "How can I contact you?"
    ];

    return (
        <div className={`chatbot ${isOpen ? 'open' : 'closed'}`}>
            <button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? '×' : '💬'}
            </button>

            {isOpen && (
                <div className="chatbot-container">
                    <div className="chatbot-header">
                        <img src={profileImage} alt="Donggun" className="chatbot-avatar" />
                        <span className="chatbot-title">Chat with Donggun's AI</span>
                    </div>

                    <div className="chatbot-messages">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`message ${msg.type}`}
                                dangerouslySetInnerHTML={{
                                    __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                }}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length === 1 && (
                        <div className="suggested-questions">
                            {suggestedQuestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    className="suggested-btn"
                                    onClick={() => {
                                        setMessages(prev => [...prev, { type: 'user', text: q }]);
                                        setTimeout(() => {
                                            setMessages(prev => [...prev, { type: 'bot', text: getResponse(q) }]);
                                        }, 500);
                                    }}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    <form className="chatbot-input" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask me anything..."
                        />
                        <button type="submit">→</button>
                    </form>
                </div>
            )}
        </div>
    );
}
