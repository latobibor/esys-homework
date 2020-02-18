import {workDaysInAWeek, weekendLength} from './constants';

export function addHoursToDate(date: Date, hoursToAdd: number): Date {
  const dateCopy = new Date(date);

  // returning here would return timestamp number instead of Date object
  dateCopy.setHours(date.getHours() + hoursToAdd);

  return dateCopy;
}

export function addWorkingDaysToDate(date: Date, daysToAdd: number): Date {
  // copy date value, since many date functions mutate the original object and I don't want side effects
  let resultDate = new Date(date);
  resultDate = addDaysToDate(resultDate, daysToAdd);

  if (daysToAdd >= workDaysInAWeek) {
    const extraDaysToAdd = getMinimumNumberOfWeekends(daysToAdd) * weekendLength;

    resultDate = addDaysToDate(resultDate, extraDaysToAdd);
  }

  if (!isWorkingDay(resultDate)) {
    resultDate = addDaysToDate(resultDate, weekendLength);
  }

  return resultDate;
}

export function isWorkingDay(submitTime: Date): boolean {
  const submitDayIndex = submitTime.getDay();
  const sundayIndex = 0;
  const saturdayIndex = 6;

  return submitDayIndex > sundayIndex && submitDayIndex < saturdayIndex;
}

export function addDaysToDate(date: Date, numberOfDays: number): Date {
  const dateCopy = new Date(date);

  dateCopy.setDate(dateCopy.getDate() + numberOfDays);

  return dateCopy;
}

function getMinimumNumberOfWeekends(daysToAdd: number): number {
  const getMinimumAmountOfWeekends = Math.floor(daysToAdd / workDaysInAWeek);

  return getMinimumAmountOfWeekends;
}
