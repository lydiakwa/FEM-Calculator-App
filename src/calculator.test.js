import { calculateYears, calculateMonths, calculateDays } from './calculator';

describe('calculateYears', () => {
  test('it returns the difference in years if the year is 2023', () => {
    expect(calculateYears({ year: 1992, month: 6, day: 3 })).toBe(30);
    expect(calculateYears({ year: 1986, month: 1, day: 24 })).toBe(37);
    expect(calculateYears({ year: 2022, month: 4, day: 24 })).toBe(1);
  });
});

describe('calculateMonths', () => {
  test('it returns the remainder in months if the year is 2023', () => {
    expect(calculateMonths({ year: 1992, month: 6, day: 3 })).toBe(10);
    expect(calculateMonths({ year: 1986, month: 1, day: 24 })).toBe(3);
    expect(calculateMonths({ year: 2022, month: 4, day: 24 })).toBe(0);
  });
});

describe('calculateDays', () => {
  test('it returns the remainder in days if the year is 2023', () => {
    expect(calculateDays({ year: 1992, month: 6, day: 3 })).toBe(26);
    expect(calculateDays({ year: 1986, month: 1, day: 24 })).toBe(26);
    expect(calculateDays({ year: 2022, month: 4, day: 24 })).toBe(2);
    expect(calculateDays({ year: 2008, month: 1, day: 1 })).toBe(26);
    expect(calculateDays({ year: 2022, month: 4, day: 31 })).toBe(26);
  });
});
