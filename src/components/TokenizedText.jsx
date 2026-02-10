import { useState, useMemo, useCallback } from 'react';
import './TokenizedText.css';

// Simple tokenizer that mimics BPE-style tokenization
function tokenize(text) {
    const tokens = [];
    let id = 0;

    // Split by spaces first, keeping spaces as separate tokens
    const parts = text.split(/(\s+)/);

    parts.forEach(part => {
        if (part.match(/^\s+$/)) {
            // Space token
            tokens.push({
                id: id++,
                text: part,
                type: 'space',
                display: '·'.repeat(part.length)
            });
        } else if (part.length > 0) {
            // For longer words, split into subword-like chunks
            const subTokens = splitIntoSubwords(part);
            subTokens.forEach((subToken, idx) => {
                tokens.push({
                    id: id++,
                    text: subToken,
                    type: getTokenType(subToken),
                    display: subToken,
                    isSubword: idx > 0
                });
            });
        }
    });

    return tokens;
}

function splitIntoSubwords(word) {
    // Simulate BPE-like splitting for visual effect
    if (word.length <= 3) return [word];

    const subwords = [];
    let remaining = word;

    while (remaining.length > 0) {
        // Take chunks of 2-4 characters
        const chunkSize = Math.min(
            remaining.length,
            Math.floor(Math.random() * 3) + 2
        );
        subwords.push(remaining.slice(0, chunkSize));
        remaining = remaining.slice(chunkSize);
    }

    return subwords;
}

function getTokenType(token) {
    if (/^\d+$/.test(token)) return 'number';
    if (/^[^\w\s]+$/.test(token)) return 'special';
    return 'text';
}

export default function TokenizedText({
    text,
    showMetadata = true,
    animateOnHover = true,
    className = '',
    as: Component = 'span'
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredToken, setHoveredToken] = useState(null);

    // Memoize tokenization to avoid recalculating on every render
    const tokens = useMemo(() => tokenize(text), [text]);

    const handleMouseEnter = useCallback(() => {
        if (animateOnHover) setIsHovered(true);
    }, [animateOnHover]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        setHoveredToken(null);
    }, []);

    return (
        <Component
            className={`tokenized-text ${isHovered ? 'tokenized' : ''} ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Original text (shown when not hovered) */}
            <span className="original-text">{text}</span>

            {/* Tokenized view */}
            <span className="tokens-container">
                {tokens.map((token, index) => (
                    <span
                        key={token.id}
                        className={`token token-${token.type} ${token.isSubword ? 'subword' : ''}`}
                        style={{ '--token-delay': `${index * 0.03}s` }}
                        onMouseEnter={() => setHoveredToken(token)}
                        onMouseLeave={() => setHoveredToken(null)}
                    >
                        <span className="token-text">
                            {token.type === 'space' ? token.display : token.text}
                        </span>
                        {showMetadata && (
                            <span className="token-meta">
                                <span className="token-id">{token.id}</span>
                            </span>
                        )}
                    </span>
                ))}
            </span>

            {/* Floating metadata tooltip */}
            {hoveredToken && showMetadata && (
                <span className="token-tooltip">
                    <span className="tooltip-row">
                        <span className="tooltip-label">id:</span>
                        <span className="tooltip-value">{hoveredToken.id}</span>
                    </span>
                    <span className="tooltip-row">
                        <span className="tooltip-label">type:</span>
                        <span className="tooltip-value">{hoveredToken.type}</span>
                    </span>
                    <span className="tooltip-row">
                        <span className="tooltip-label">len:</span>
                        <span className="tooltip-value">{hoveredToken.text.length}</span>
                    </span>
                </span>
            )}
        </Component>
    );
}
