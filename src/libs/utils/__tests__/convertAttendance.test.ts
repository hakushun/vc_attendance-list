import { convertAttendance } from '../convertAttendance';

describe('convertAttendance', () => {
  it('type: presence', () => {
    const result = '○';
    expect(result).toEqual(convertAttendance('presence'));
  });

  it('type: late', () => {
    const result = '遅刻';
    expect(result).toEqual(convertAttendance('late'));
  });

  it('type: leavingEarly', () => {
    const result = '早退';
    expect(result).toEqual(convertAttendance('leavingEarly'));
  });

  it('type: undecided', () => {
    const result = '未定';
    expect(result).toEqual(convertAttendance('undecided'));
  });

  it('type: absence', () => {
    const result = '×';
    expect(result).toEqual(convertAttendance('absence'));
  });
});
