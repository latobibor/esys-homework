import {validateInputParameters} from './validate-input-parameters';
import {endHourOfWorkDay, dailyMaxWorkHours, startHourOfWorkDay, minutesPerHour} from './constants';
import {addHoursToDate, addWorkingDaysToDate} from './date-utils';

export function calculateDueDate(submitTime: Date, turnaroundInHours: number): string {
  validateInputParameters(submitTime, turnaroundInHours);

  const calculateDate = doTheCalculation(submitTime, turnaroundInHours);

  return calculateDate.toLocaleString('en-US');
}

function doTheCalculation(submitTime: Date, turnaroundInHours: number): Date {
  const remainingHoursFromWorkDay = endHourOfWorkDay - submitTime.getHours();

  if (canTheTaskBeFinishedOnSameDay(submitTime, turnaroundInHours)) {
    return addHoursToDate(submitTime, turnaroundInHours);
  }

  const remainingWorkTimeInHours = turnaroundInHours - remainingHoursFromWorkDay;
  const numberOfFullWorkingDaysRequired = countNumberOfFullWorkingDaysRequired(remainingWorkTimeInHours);

  const remainingWorkTimeOnLastDay = remainingWorkTimeInHours % dailyMaxWorkHours;

  return calculateEndTimeOnLastRequiredDay({
    submitTime,
    daysToBeAdded: numberOfFullWorkingDaysRequired,
    remainingHours: remainingWorkTimeOnLastDay,
  });
}

function canTheTaskBeFinishedOnSameDay(submitTime: Date, turnaroundInHours: number): boolean {
  const submitTimeInMinutes = submitTime.getHours() * minutesPerHour + submitTime.getMinutes();

  const copyDate = new Date(submitTime);
  copyDate.setHours(endHourOfWorkDay);
  copyDate.setMinutes(0);

  const endHourInMinutes = copyDate.getHours() * minutesPerHour + copyDate.getMinutes();
  const turnaroundInMinutes = turnaroundInHours * minutesPerHour;

  return endHourInMinutes - submitTimeInMinutes > turnaroundInMinutes;
}

function countNumberOfFullWorkingDaysRequired(remainingWorkTimeInHours: number): number {
  return Math.floor(remainingWorkTimeInHours / dailyMaxWorkHours);
}

interface CalculateEndTimeOnLastRequiredDayParams {
  submitTime: Date;
  daysToBeAdded: number;
  remainingHours: number;
}

// in case when there are multiple parameters with the same type (i.e. 2 parameters defined as numbers)
// I prefer using object destructuring, since you are less likely to swap parameter order
function calculateEndTimeOnLastRequiredDay({
  submitTime,
  daysToBeAdded,
  remainingHours,
}: CalculateEndTimeOnLastRequiredDayParams): Date {
  const dateSetToExactHourAndMinute = new Date(submitTime);
  dateSetToExactHourAndMinute.setHours(startHourOfWorkDay + remainingHours);
  dateSetToExactHourAndMinute.setMinutes(submitTime.getMinutes());

  let result = addWorkingDaysToDate(dateSetToExactHourAndMinute, daysToBeAdded);

  // there is remaining working time to do for one more days so...
  result = addWorkingDaysToDate(result, 1);

  return result;
}
