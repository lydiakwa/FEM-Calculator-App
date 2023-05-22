import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { calculateYears, calculateMonths, calculateDays } from '@/calculator';
import FormGroup from '@/components/form-group';
import FormLabel from '@/components/form-label';
import FormInput from '@/components/form-input';
import FormError from '@/components/form-error';

import IconArrow from '../../assets/images/icon-arrow.svg';

export default function Home() {
  const [calculation, setCalculation] = useState({
    years: null,
    months: null,
    days: null,
  });

  const {
    register,
    handleSubmit,
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

    if (dob.getMonth() === parseInt(data.month) - 1) {
      calculate(data);
    } else {
      setError('invalidDate', {
        type: 'custom',
        message: 'Must be a valid date',
      });
    }
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
    <main className={`flex justify-center p-3`}>
      <div className="p-6 mt-20 lg:w-2/5 rounded-lg rounded-br-4xl bg-white">
        <div>
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 lg:mr-32 ">
              <FormGroup>
                <FormLabel
                  name={'day'}
                  errors={{
                    field: errors.day,
                    invalidDate: errors.invalidDate,
                  }}
                />
                <FormInput
                  errors={{
                    field: errors.day,
                    invalidDate: errors.invalidDate,
                  }}
                  placeholder={'DD'}
                  {...register('day', {
                    min: { value: 1, message: 'Must be a valid day' },
                    max: { value: 31, message: 'Must be a valid day' },
                    required: 'This field is required',
                    onChange: () => {
                      if (errors.invalidDate) {
                        clearErrors('invalidDate');
                      }
                    },
                  })}
                />
                <FormError errorMessage={errors.day?.message} />
                <FormError errorMessage={errors.invalidDate?.message} />
              </FormGroup>
              <FormGroup>
                <FormLabel
                  name={'month'}
                  errors={{
                    field: errors.month,
                    invalidDate: errors.invalidDate,
                  }}
                />
                <FormInput
                  errors={{
                    field: errors.month,
                    invalidDate: errors.invalidDate,
                  }}
                  placeholder={'MM'}
                  {...register('month', {
                    min: { value: 1, message: 'Must be a valid month' },
                    max: { value: 12, message: 'Must be a valid month' },
                    required: 'This field is required',
                    onChange: () => {
                      if (errors.invalidDate) {
                        clearErrors('invalidDate');
                      }
                    },
                  })}
                />
                <FormError errorMessage={errors.month?.message} />
              </FormGroup>
              <FormGroup>
                <FormLabel
                  name={'year'}
                  errors={{
                    field: errors.year,
                    invalidDate: errors.invalidDate,
                  }}
                />
                <FormInput
                  errors={{
                    field: errors.year,
                    invalidDate: errors.invalidDate,
                  }}
                  placeholder={'YYYY'}
                  {...register('year', {
                    max: {
                      value: new Date().getFullYear(),
                      message: 'Must be in the past',
                    },
                    required: 'This field is required',
                    validate: {
                      notInFuture: (v) =>
                        parseInt(v) < new Date().getFullYear(),
                    },
                    onChange: () => {
                      if (errors.invalidDate) {
                        clearErrors('invalidDate');
                      }
                    },
                  })}
                />
                <FormError errorMessage={errors.year?.message} />
              </FormGroup>
            </div>
            <div className="flex items-center p-3">
              <hr className="grow" />
              <button
                className="p-2 w-10 rounded-full bg-purple text-white  "
                type="submit"
              >
                <Image src={IconArrow} width={50} height={50} alt="arrow" />
              </button>
              <hr className="grow lg:grow-0	" />
            </div>
          </form>
        </div>
        <div>
          <div className="flex font-extraBoldItalic text-5xl lg:text-6xl">
            <p className="text-purple">
              {calculation.years === null ? '- -' : calculation.years}
            </p>
            <p>&nbsp;years</p>
          </div>
          <div className="flex font-extraBoldItalic text-5xl  lg:text-6xl">
            <p className="text-purple">
              {calculation.months === null ? '- -' : calculation.months}
            </p>
            <p>&nbsp;months</p>
          </div>
          <div className="flex font-extraBoldItalic text-5xl  lg:text-6xl">
            <p className="text-purple">
              {calculation.days === null ? '- -' : calculation.days}
            </p>
            <p>&nbsp;days</p>
          </div>
        </div>
      </div>
    </main>
  );
}
