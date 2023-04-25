import Image from 'next/image';
import { Inter } from 'next/font/google';
import differenceInYears from 'date-fns/differenceInYears';
import differenceInMonths from 'date-fns/differenceInMonths';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import differenceInDays from 'date-fns/differenceInDays';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [formData, setFormData] = useState({
    day: null,
    month: null,
    year: null,
  });

  const [calculation, setCalculation] = useState({
    years: null,
    months: null,
    days: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setFormData(data);
    calculate(data);
    // calculateMonths(data);
  };

  const calculate = (birthData) => {
    const today = new Date();
    const thisMonth = today.getMonth() + 1;

    let years = calculateYears(birthData);
    let months = calculateMonths(birthData);
    let days = calculateDays(birthData);

    // console.log(years, 'years');
    // console.log(months, 'months');
    // console.log(days, 'days');
    if (months > 12) {
      months -= 12;
    }

    console.log(years, 'years');
    console.log(months, 'months');
    console.log(days, 'days');
    // if (birthData.month > thisMonth) {
    //   setCalculation({
    //     ...calculation,
    //     years: result - 1,
    //   });
    // } else {
    //   setCalculation({
    //     ...calculation,
    //     years: result,
    //   });
    // }
  };

  const calculateYears = (birthData) => {
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

  const calculateMonths = (birthData) => {
    const thisYear = new Date().getFullYear();
    const result = differenceInMonths(
      new Date(),
      new Date(thisYear - 1, birthData.month, birthData.day)
    );
    return result + 1;
  };

  const calculateDays = (birthData) => {
    const result = differenceInCalendarDays(
      new Date(),
      new Date(
        parseInt(birthData.year),
        parseInt(birthData.month) - 1,
        parseInt(birthData.day),
        0,
        0
      )
    );
    return result + 1;
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="p-6 max-w-lg rounded-md rounded-br-3xl bg-white">
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>Day</label>
            <input
              type="number"
              {...register('day', { min: 1, max: 31, required: true })}
            />
            <label>Month</label>
            <input
              type="number"
              {...register('month', { min: 1, max: 12, required: true })}
            />
            <label>Year</label>
            <input type="number" {...register('year', { required: true })} />
            <button className="p-1 rounded-md bg-blue-500" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="bg-slate-100">
          <div>
            {calculation.years === null ? '--' : calculation.years} years
          </div>
          <div>
            {calculation.months === null ? '--' : calculation.months} months
          </div>
          <div>{calculation.days === null ? '--' : calculation.days} days</div>
        </div>
      </div>
    </main>
  );
}
