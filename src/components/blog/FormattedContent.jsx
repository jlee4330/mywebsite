function renderBold(text, baseKey) {
  const segments = text.split(/(\*\*.*?\*\*)/g);
  return segments.map((segment, index) => {
    if (segment.startsWith('**') && segment.endsWith('**')) {
      return <strong key={`${baseKey}-${index}`}>{segment.slice(2, -2)}</strong>;
    }
    return segment;
  });
}

function renderInline(text) {
  const parts = [];
  const linkPattern = /\[(.*?)\]\((.*?)\)/g;
  let lastIndex = 0;
  let keyIndex = 0;
  let match;

  while ((match = linkPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(renderBold(text.slice(lastIndex, match.index), keyIndex++));
    }
    parts.push(
      <a key={keyIndex++} href={match[2]} target="_blank" rel="noopener noreferrer">
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(renderBold(text.slice(lastIndex), keyIndex++));
  }

  return parts.length > 0 ? parts : renderBold(text, 0);
}

export default function FormattedContent({ text }) {
  if (!text) return null;

  return text.split(/\n\s*\n/).map((block, index) => {
    const content = block.trim();
    if (!content) return null;

    if (content.startsWith('### ')) {
      return <h4 key={index}>{renderInline(content.slice(4))}</h4>;
    }
    if (content.startsWith('## ')) {
      return <h3 key={index}>{renderInline(content.slice(3))}</h3>;
    }
    if (content.startsWith('# ')) {
      return <h2 key={index}>{renderInline(content.slice(2))}</h2>;
    }
    if (content.startsWith('> ')) {
      return <blockquote key={index}>{renderInline(content.replace(/^>\s*/gm, ''))}</blockquote>;
    }
    if (content.startsWith('- ') || content.startsWith('* ')) {
      const items = content
        .split('\n')
        .filter(line => line.trim().startsWith('- ') || line.trim().startsWith('* '));
      return (
        <ul key={index}>
          {items.map((item, itemIndex) => (
            <li key={itemIndex}>{renderInline(item.replace(/^[-*]\s+/, ''))}</li>
          ))}
        </ul>
      );
    }

    return <p key={index}>{renderInline(content)}</p>;
  });
}
