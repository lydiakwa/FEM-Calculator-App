import { calculateYears } from './calculator';

describe('calculateYears', () => {
  test('it returns the difference in years', () => {
    expect(calculateYears({ year: 1992, month: 6, day: 3 })).toBe(30);
  });
});
