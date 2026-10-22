// 正規表現での判定では javascript: などのスキームや「URL を含むだけの文字列」を通してしまうため、
// URL として解釈できるかとスキームを URL API で確認する
export const isHttpUrl = (value: string): boolean => {
  try {
    const { protocol } = new URL(value);
    return protocol === 'http:' || protocol === 'https:';
  } catch {
    return false;
  }
};
