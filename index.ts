import {calculateDueDate} from './src/calculator';

function log(turnaround: number, day: Date, dueDate: string) {
  const localeStringForDay = day.toLocaleString('en-US');

  console.log(`A ${turnaround} hour task on ${localeStringForDay} is due by ${dueDate}`);
}

// see tests for all corner cases
const aTuesday = new Date('2020-02-18 16:23');
const turnaroundForTuesdayTask = 16;
const dueDateForATuesdayTask = calculateDueDate(aTuesday, turnaroundForTuesdayTask);

log(turnaroundForTuesdayTask, aTuesday, dueDateForATuesdayTask);

const aFriday = new Date('2020-02-14 16:23');
const turnaroundForFridayTask = 2;
const dueDateForAFridayTask = calculateDueDate(aTuesday, turnaroundForFridayTask);

log(turnaroundForFridayTask, aFriday, dueDateForAFridayTask);

const aThursday = new Date('2020-02-14 16:23');
const turnaroundForLongTask = 100;
const dueDateForMultiweekTask = calculateDueDate(aTuesday, turnaroundForLongTask);

log(turnaroundForLongTask, aThursday, dueDateForMultiweekTask);

// you cannot submit tasks outside working hours
const outsideWorkingHours = new Date('2020-03-14 23:23');

try {
  calculateDueDate(outsideWorkingHours, 126);
} catch (error) {
  console.error(`WARNING! ${error.message}`);
}
