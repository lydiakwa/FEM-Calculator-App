import differenceInYears from 'date-fns/differenceInYears';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import differenceInDays from 'date-fns/differenceInDays';

export const calculateYears = (birthData) => {
  const result = differenceInYears(
    new Date(),
    new Date(
      parseInt(birthData.year),
      parseInt(birthData.month) - 1,
      parseInt(birthData.day)
    )
  );
  return result;
};

export const calculateMonths = (birthData) => {
  const thisYear = new Date().getFullYear();
  let result = differenceInMonths(
    new Date(),
    new Date(thisYear - 1, birthData.month, birthData.day)
  );
  if (result >= 11) {
    result -= 12;
  }
  return result + 1;
};

export const calculateDays = (birthData) => {
  const today = new Date(new Date().setHours(0, 0, 0, 0));
  const dob = new Date(
    parseInt(birthData.year),
    parseInt(birthData.month) - 1,
    parseInt(birthData.day),
    0,
    0
  );

  if (
    parseInt(birthData.month) === today.getMonth() + 1 &&
    birthData.day < today.getDate()
  ) {
    return today.getDate() - dob.getDate();
  } else {
    return today.getDate();
  }
};
