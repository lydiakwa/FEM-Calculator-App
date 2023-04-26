import Image from 'next/image';
import { Inter } from 'next/font/google';
import { calculateYears, calculateMonths, calculateDays } from '@/calculator';

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
