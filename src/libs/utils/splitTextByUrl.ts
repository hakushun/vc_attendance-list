import { isHttpUrl } from './isHttpUrl';

export type TextSegment = {
  type: 'text' | 'url';
  value: string;
};

// 日本語の文章では URL の直後に「を参照」などが空白なしで続くことが多く、非 ASCII まで含めると
// そこまでリンクになってしまうため、URL として扱うのは ASCII の範囲までにする
const urlRegexp = /https?:\/\/[\x21-\x7e]+/g;

const trailingPunctuations = ['.', ',', ';', ':', '!', '?', "'", '"'];
const bracketPairs: Record<string, string> = { ')': '(', ']': '[' };

const countChar = (value: string, char: string): number => value.split(char).length - 1;

const trimTrailingPunctuation = (url: string): string => {
  if (url === '') return url;
  const last = url.slice(-1);
  if (trailingPunctuations.includes(last)) return trimTrailingPunctuation(url.slice(0, -1));
  const open = bracketPairs[last];
  // 閉じ括弧は、URL 内の括弧と対になっている場合（Wikipedia の URL など）だけ URL の一部として残す
  if (open && countChar(url, open) < countChar(url, last)) {
    return trimTrailingPunctuation(url.slice(0, -1));
  }
  return url;
};

export const splitTextByUrl = (text: string): TextSegment[] => {
  const segments: TextSegment[] = [];
  let cursor = 0;
  for (const match of text.matchAll(urlRegexp)) {
    const url = trimTrailingPunctuation(match[0]);
    // URL として解釈できない候補は、次のテキストにそのまま含める
    if (!isHttpUrl(url)) continue;
    if (match.index > cursor)
      segments.push({ type: 'text', value: text.slice(cursor, match.index) });
    segments.push({ type: 'url', value: url });
    cursor = match.index + url.length;
  }
  if (cursor < text.length) segments.push({ type: 'text', value: text.slice(cursor) });
  return segments;
};
