import { splitTextByUrl } from '../splitTextByUrl';

describe('splitTextByUrl', () => {
  it('URL を含まない文字列は、全体が 1 つのテキストになる', () => {
    expect(splitTextByUrl('集合は 9 時')).toEqual([{ type: 'text', value: '集合は 9 時' }]);
  });
  it('URL だけの文字列は、全体が 1 つの URL になる', () => {
    expect(splitTextByUrl('https://example.com')).toEqual([
      { type: 'url', value: 'https://example.com' },
    ]);
  });
  it('前後に文字がある場合は、URL の部分だけが URL になる', () => {
    expect(splitTextByUrl('会場: https://example.com/map 参照')).toEqual([
      { type: 'text', value: '会場: ' },
      { type: 'url', value: 'https://example.com/map' },
      { type: 'text', value: ' 参照' },
    ]);
  });
  it('複数の URL を含む場合は、それぞれが URL になる', () => {
    expect(splitTextByUrl('http://a.example.com と https://b.example.com')).toEqual([
      { type: 'url', value: 'http://a.example.com' },
      { type: 'text', value: ' と ' },
      { type: 'url', value: 'https://b.example.com' },
    ]);
  });
  it('javascript: を前に付けても、リンクになるのは http(s) の部分だけ', () => {
    expect(splitTextByUrl('javascript:alert(1)//https://example.com')).toEqual([
      { type: 'text', value: 'javascript:alert(1)//' },
      { type: 'url', value: 'https://example.com' },
    ]);
  });
  it('空文字は空配列になる', () => {
    expect(splitTextByUrl('')).toEqual([]);
  });
});
