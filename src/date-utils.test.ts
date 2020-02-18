import {addWorkingDaysToDate, isWorkingDay} from './date-utils';

describe('Date Utils', () => {
  it('addWorkingDaysToDate adds 2 more days if end date would be a weekend', () => {
    const aFriday = new Date('2020-02-21 16:59');

    const resultDate = addWorkingDaysToDate(aFriday, 2);

    expect(resultDate.toLocaleString('en-US')).toEqual('2/25/2020, 4:59:00 PM');
  });

  it('addWorkingDaysToDate adds weekends if start date and turnaround time requires it', () => {
    const aFriday = new Date('2020-02-07 16:59');

    const resultDate = addWorkingDaysToDate(aFriday, 11);

    expect(resultDate.toLocaleString('en-US')).toEqual('2/24/2020, 4:59:00 PM');
  });

  test.each`
  day             | expected
  ${'2020-02-03'} | ${true}
  ${'2020-02-04'} | ${true}
  ${'2020-02-05'} | ${true}
  ${'2020-02-06'} | ${true}
  ${'2020-02-07'} | ${true}
  ${'2020-02-08'} | ${false}
  ${'2020-02-09'} | ${false}
  `
  ('isWorkingDay function returns $expected for $day', ({ day, expected }) => {
    const aDay = new Date(day);

    expect(isWorkingDay(aDay)).toEqual(expected);
  });
});
