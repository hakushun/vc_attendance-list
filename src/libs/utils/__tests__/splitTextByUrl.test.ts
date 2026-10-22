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
  it('URL の直後に空白なしで日本語が続く場合は、日本語の手前までが URL になる', () => {
    expect(splitTextByUrl('https://example.com/mapを参照')).toEqual([
      { type: 'url', value: 'https://example.com/map' },
      { type: 'text', value: 'を参照' },
    ]);
  });
  it('複数の URL を含む場合は、それぞれが URL になる', () => {
    expect(splitTextByUrl('http://a.example.com と https://b.example.com')).toEqual([
      { type: 'url', value: 'http://a.example.com' },
      { type: 'text', value: ' と ' },
      { type: 'url', value: 'https://b.example.com' },
    ]);
  });
  it('URL の末尾の句読点は URL に含めない', () => {
    expect(
      splitTextByUrl('詳細は https://example.com/a. と https://example.com/b, を参照'),
    ).toEqual([
      { type: 'text', value: '詳細は ' },
      { type: 'url', value: 'https://example.com/a' },
      { type: 'text', value: '. と ' },
      { type: 'url', value: 'https://example.com/b' },
      { type: 'text', value: ', を参照' },
    ]);
  });
  it('URL を囲む括弧の閉じ側は URL に含めない', () => {
    expect(splitTextByUrl('(https://example.com)')).toEqual([
      { type: 'text', value: '(' },
      { type: 'url', value: 'https://example.com' },
      { type: 'text', value: ')' },
    ]);
  });
  it('URL 内の括弧と対になる閉じ括弧は URL に含める', () => {
    expect(splitTextByUrl('https://en.wikipedia.org/wiki/Foo_(bar)')).toEqual([
      { type: 'url', value: 'https://en.wikipedia.org/wiki/Foo_(bar)' },
    ]);
  });
  it('http(s):// で始まっても URL として解釈できないものはテキストのままになる', () => {
    expect(splitTextByUrl('https://[ を参照')).toEqual([
      { type: 'text', value: 'https://[ を参照' },
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
