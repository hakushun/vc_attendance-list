import { isHttpUrl } from '../isHttpUrl';

describe('isHttpUrl', () => {
  it('http / https の URL は true', () => {
    expect(isHttpUrl('http://example.com')).toBe(true);
    expect(isHttpUrl('https://example.com/path?q=1#hash')).toBe(true);
  });
  it('http / https 以外のスキームは false', () => {
    expect(isHttpUrl('javascript:alert(1)')).toBe(false);
    expect(isHttpUrl('JavaScript:alert(1)//https://example.com')).toBe(false);
    expect(isHttpUrl('data:text/html,<script>alert(1)</script>')).toBe(false);
    expect(isHttpUrl('ftp://example.com')).toBe(false);
  });
  it('URL として解釈できない文字列は false', () => {
    expect(isHttpUrl('')).toBe(false);
    expect(isHttpUrl('example.com')).toBe(false);
    expect(isHttpUrl('会場: https://example.com')).toBe(false);
  });
});
