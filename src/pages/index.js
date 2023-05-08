import Image from 'next/image';
import { Inter } from 'next/font/google';
import { calculateYears, calculateMonths, calculateDays } from '@/calculator';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  // const [formData, setFormData] = useState({
  //   day: null,
  //   month: null,
  //   year: null,
  // });

  const [calculation, setCalculation] = useState({
    years: null,
    months: null,
    days: null,
  });

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm({ reValidateMode: 'onSubmit', mode: 'onBlur' });

  const onSubmit = (data) => {
    const dob = new Date(
      parseInt(data.year),
      parseInt(data.month) - 1,
      parseInt(data.day)
    );

    console.log(dob, 'dob');

    if (dob.getMonth() === parseInt(data.month) - 1) {
      calculate(data);
    } else {
      console.log('not valid');
      setError('invalidDate', {
        type: 'custom',
        message: 'Must be a valid date',
      });
    }
  };

  const onSubmitError = (errors) => {
    console.log('hi');
  };

  const calculate = (birthData) => {
    let years = calculateYears(birthData);
    let months = calculateMonths(birthData);
    let days = calculateDays(birthData);

    setCalculation({
      ...calculation,
      years: years,
      months: months,
      days: days,
    });
  };

  console.log(errors);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="p-6 max-w-lg rounded-md rounded-br-3xl bg-white">
        <div>
          <form onSubmit={handleSubmit(onSubmit, onSubmitError)}>
            <label>Day</label>
            <input
              {...register('day', {
                min: { value: 1, message: 'Must be a valid date' },
                max: { value: 31, message: 'Must be a valid date' },
                required: 'This field is required',
                onChange: () => {
                  if (errors.invalidDate) {
                    clearErrors('invalidDate');
                  }
                },
              })}
              placeholder="DD"
            />
            <p>{errors.day?.message}</p>

            <label>Month</label>
            <input
              type="number"
              {...register('month', {
                min: { value: 1, message: 'Must be a valid date' },
                max: { value: 12, message: 'Must be a valid date' },
                required: 'This field is required',
                onChange: () => {
                  if (errors.invalidDate) {
                    clearErrors('invalidDate');
                  }
                },
              })}
              placeholder="MM"
            />
            <p>{errors.month?.message}</p>
            <label>Year</label>
            <input
              type="number"
              {...register('year', {
                max: {
                  value: new Date().getFullYear(),
                  message: 'Must be in the past',
                },
                required: 'This field is required',
                validate: {
                  notInFuture: (v) => parseInt(v) < new Date().getFullYear(),
                },
                onChange: () => {
                  if (errors.invalidDate) {
                    clearErrors('invalidDate');
                  }
                },
              })}
              placeholder="YYYY"
            />
            <p>{errors.year?.message}</p>
            <p>{errors.invalidDate?.message}</p>
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

//form options
/*   const dayOptions = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
    { value: 13, label: '13' },
    { value: 14, label: '14' },
    { value: 15, label: '15' },
    { value: 16, label: '16' },
    { value: 17, label: '17' },
    { value: 18, label: '18' },
    { value: 19, label: '19' },
    { value: 20, label: '20' },
    { value: 21, label: '21' },
    { value: 22, label: '22' },
    { value: 23, label: '23' },
    { value: 24, label: '24' },
    { value: 25, label: '25' },
    { value: 26, label: '26' },
    { value: 27, label: '27' },
    { value: 28, label: '28' },
    { value: 29, label: '29' },
    { value: 30, label: '30' },
    { value: 31, label: '31' },
  ];

  <select {...register('day', { required: true })}>
  {dayOptions.map(({ value, label }, index) => (
    <option key={value} value={value}>
      {label}
    </option>
  ))}
</select> */

/*
blur = when you leave a field after its focused, leaving the field onto the next or whatever
*/
