import React, { useMemo } from 'react';
import { marked } from 'marked';

interface FormattedTextProps {
  content: string;
  className?: string;
}

export const FormattedText: React.FC<FormattedTextProps> = ({ content, className = '' }) => {
  const html = useMemo(() => {
    if (!content) return '';
    return marked.parse(content, { breaks: true, gfm: true }) as string;
  }, [content]);

  return (
    <div
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default FormattedText;
