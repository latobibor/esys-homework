import {calculateDueDate} from './calculator';

describe('Calculate Due Date - positive cases', () => {
  it('returns 4:22PM Tuesday for a 2 hour task reported at 2:22PM', () => {
    const aTaskOnADay = new Date('2020-02-18 14:22');
    const taskLength = 2;

    const result = calculateDueDate(aTaskOnADay, taskLength);

    expect(result).toEqual('2/18/2020, 4:22:00 PM');
  });

  // test.each
  it('returns 2:12PM Thursday for a 16 hours task submitted on 2:12PM Tuesday', () => {
    const aTuesday = new Date('2020-02-18 14:12');
    const aThursday2DaysLater = new Date('2020-02-20 14:12');

    const result = calculateDueDate(aTuesday, 16);

    expect(result).toEqual(aThursday2DaysLater.toLocaleString('en-US'));
  });

  it('returns 11:31AM Wednesday for a 5 hours task submitted on 2:31PM Tuesday', () => {
    const aNonWeekendDay = new Date('2020-02-18 14:31');
    const theNextDay = new Date('2020-02-19 11:31');

    const result = calculateDueDate(aNonWeekendDay, 5);

    expect(result).toEqual(theNextDay.toLocaleString('en-US'));
  });

  it('returns 9:13AM Wednesday for an hour long task submitted on 4:13PM Tuesday', () => {
    const aNonWeekendDay = new Date('2020-02-18 16:13');
    const theNextDay = new Date('2020-02-19 09:13');

    const result = calculateDueDate(aNonWeekendDay, 1);

    expect(result).toEqual(theNextDay.toLocaleString('en-US'));
  });

  it('returns 10:23AM Monday for a 2 hour task submitted on 4:23PM Friday', () => {
    const aFriday = new Date('2020-02-07 16:15');
    const theNextMonday = new Date('2020-02-10 10:15');

    const result = calculateDueDate(aFriday, 2);

    expect(result).toEqual(theNextMonday.toLocaleString('en-US'));
  });

  it('can handle end of February in leap years', () => {
    const aFriday = new Date('2020-02-28 16:23');
    const theNextMonday = new Date('2020-03-02 10:23');

    const result = calculateDueDate(aFriday, 2);

    expect(result).toEqual(theNextMonday.toLocaleString('en-US'));
  });
});
