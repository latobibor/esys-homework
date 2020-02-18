import {validateSubmitTime, validateTurnaroundHours} from './validate-input-parameters';

describe('Validate submit time', () => {
  it('throws error for submit time on a non working day', () => {
    const aSaturday = new Date('2020-02-15 14:12');
    const aSunday = new Date('2020-02-16 14:12');

    const fnSaturday = () => validateSubmitTime(aSaturday);
    const fnSunday = () => validateSubmitTime(aSunday);

    expect(fnSaturday).toThrowError('You cannot submit tasks on non-working days (submit day was Saturday)');
    expect(fnSunday).toThrowError('You cannot submit tasks on non-working days (submit day was Sunday)');
  });

  it('throws error for submit time on a working day outside of working hours', () => {
    const tooEarly = new Date('2020-02-18 8:59');
    const tooLate = new Date('2020-02-18 17:01');

    const fnTooEarly = () => validateSubmitTime(tooEarly);
    const fnTooLate = () => validateSubmitTime(tooLate);

    expect(fnTooEarly).toThrowError(
      'You cannot submit tasks outside working hours (9AM to 5PM - submit time was: 8:59:00 AM)',
    );
    expect(fnTooLate).toThrowError(
      'You cannot submit tasks outside working hours (9AM to 5PM - submit time was: 5:01:00 PM)',
    );
  });
});

describe('Validate turnaround time', () => {
  const expectedInvalidTurnaroundTimeMessage = 'Turnaround cannot be 0 or negative! People need time to work ;)';

  it('throws error for negative turnaround time', () => {
    const functionUnderTest = () => validateTurnaroundHours(-123);

    expect(functionUnderTest).toThrowError(expectedInvalidTurnaroundTimeMessage);
  });

  it('throws error for 0 turnaround time', () => {
    const functionUnderTest = () => validateTurnaroundHours(0);

    expect(functionUnderTest).toThrowError(expectedInvalidTurnaroundTimeMessage);
  });

  it('throws error for float values', () => {
    const functionUnderTest = () => validateTurnaroundHours(3.14);

    expect(functionUnderTest).toThrowError('Please do not use fraction values!');
  });
});
