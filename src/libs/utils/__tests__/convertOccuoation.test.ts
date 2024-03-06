import { convertOccuoation } from '../convertOccupation';

describe('convertOccuoation', () => {
  it('occupation: working', () => {
    const result = '社会人';
    expect(result).toEqual(convertOccuoation('working'));
  });

  it('occupation: student', () => {
    const result = '学生';
    expect(result).toEqual(convertOccuoation('student'));
  });

  it('occupation: empty', () => {
    const result = '';
    expect(result).toEqual(convertOccuoation(''));
  });
});
