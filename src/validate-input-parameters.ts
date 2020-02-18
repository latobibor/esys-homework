import {startHourOfWorkDay, endHourOfWorkDay} from './constants';
import {isWorkingDay} from './date-utils';

export function validateInputParameters(submitTime: Date, turnaround: number): void {
  validateTurnaroundHours(turnaround);
  validateSubmitTime(submitTime);
}

export function validateTurnaroundHours(turnaround: number) {
  if (turnaround <= 0) {
    throw new Error('Turnaround cannot be 0 or negative! People need time to work ;)');
  }

  if (!Number.isSafeInteger(turnaround)) {
    throw new Error('Please do not use fraction values!');
  }
}

export function validateSubmitTime(submitTime: Date) {
  if (!isWorkingDay(submitTime)) {
    const humanReadableWorkDay = submitTime.toLocaleDateString('en', {weekday: 'long'});

    throw new Error(`You cannot submit tasks on non-working days (submit day was ${humanReadableWorkDay})`);
  }

  if (!isInsideWorkingHours(submitTime)) {
    const humanReadableWorkingHour = submitTime.toLocaleTimeString('en-US');
    throw new Error(
      `You cannot submit tasks outside working hours (9AM to 5PM - submit time was: ${humanReadableWorkingHour})`,
    );
  }
}

function isInsideWorkingHours(submitTime: Date): boolean {
  const submitHour = submitTime.getHours();

  return submitHour >= startHourOfWorkDay && submitHour < endHourOfWorkDay;
}
