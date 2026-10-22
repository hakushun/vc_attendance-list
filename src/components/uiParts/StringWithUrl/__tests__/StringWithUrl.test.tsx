import { renderToStaticMarkup } from 'react-dom/server';
import { StringWithUrl } from '..';

describe('StringWithUrl', () => {
  it('URL の部分だけがリンクになり、前後の文字はそのまま表示される', () => {
    expect(
      renderToStaticMarkup(<StringWithUrl content="会場: https://example.com/map 参照" />),
    ).toBe(
      '会場: <a href="https://example.com/map" target="_blank" rel="noopener noreferrer">https://example.com/map</a> 参照<br/>',
    );
  });
  it('改行ごとに <br/> で区切られる', () => {
    expect(renderToStaticMarkup(<StringWithUrl content={'1 行目\nhttps://example.com'} />)).toBe(
      '1 行目<br/><a href="https://example.com" target="_blank" rel="noopener noreferrer">https://example.com</a><br/>',
    );
  });
  it('javascript: で始まる行でも、href に javascript: が入らない', () => {
    const html = renderToStaticMarkup(
      <StringWithUrl content="javascript:alert(1)//https://example.com" />,
    );
    expect(html).not.toMatch(/href="javascript:/i);
    expect(html).toContain('href="https://example.com"');
  });
});
