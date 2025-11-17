import React from 'react';
import styles from './AppKeywordHighlighter.module.scss';

type AppKeywordHighlighterProps = {
  text: string;
  /**
   * Single keyword or list of keywords to highlight.
   */
  keywords: string | string[];
  /**
   * Optional className applied to each highlighted span in addition
   * to the default highlight style.
   */
  className?: string;
  /**
   * Case-sensitive matching. Defaults to false (case-insensitive).
   */
  caseSensitive?: boolean;
};

function escapeRegex(value: string): string {
  return value.replaceAll(/[.*+?^${}()|[\\]\\\\]/g, `\\$&`);
}

export default function AppKeywordHighlighter({
  text,
  keywords,
  className = '',
  caseSensitive = false,
}: Readonly<AppKeywordHighlighterProps>) {
  const list = (Array.isArray(keywords) ? keywords : [keywords])
    .map((k) => k.trim())
    .filter(Boolean);

  if (!text || list.length === 0) {
    // Nothing to highlight, return original text unchanged
    return <>{text}</>;
  }

  // Sort by length desc to prioritize longer matches over substrings
  const sorted = [...list].sort((a, b) => b.length - a.length);

  const pattern = sorted.map(escapeRegex).join('|');
  const flags = caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(pattern, flags);

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    const [matchedText] = match;
    const matchStart = match.index;

    // Push text before the match (if any) unchanged
    if (matchStart > lastIndex) {
      parts.push(text.slice(lastIndex, matchStart));
    }

    // Push the highlighted match
    parts.push(
      <span key={matchStart} className={`${styles.highlight} ${className || ''}`}>
        {matchedText}
      </span>
    );

    lastIndex = matchStart + matchedText.length;
  }

  // Push remaining text after the last match (if any)
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  // Return a fragment so the original text structure is preserved with only
  // the matched keywords wrapped in spans.
  return <>{parts.length > 0 ? parts : text}</>;
}
