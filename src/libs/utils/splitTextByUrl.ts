import { isHttpUrl } from './isHttpUrl';

export type TextSegment = {
  type: 'text' | 'url';
  value: string;
};

const urlRegexp = /(https?:\/\/[\x21-\x7e]+)/;

export const splitTextByUrl = (text: string): TextSegment[] =>
  text
    .split(urlRegexp)
    // キャプチャグループ付きの split は、マッチした部分を奇数番目の要素として返す
    .map((value, index) => ({
      type: index % 2 === 1 && isHttpUrl(value) ? ('url' as const) : ('text' as const),
      value,
    }))
    .filter((segment) => segment.value !== '');
