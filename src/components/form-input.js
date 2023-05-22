import classNames from 'classnames';
import { forwardRef } from 'react';

const FormInput = forwardRef(function FormInput(
  { name, errors, placeholder, onBlur, onChange },
  ref
) {
  return (
    <input
      className={classNames(
        'w-full h-10 border border-grey-100 rounded-md p-1 pl-3 font-popBold',
        {
          'border-red-600': errors.field,
        },
        { 'border-red-600': errors.invalidDate }
      )}
      placeholder={placeholder}
      id={name}
      ref={ref}
      onBlur={onBlur}
      name={name}
      onChange={onChange}
      type="number"
    />
  );
});

export default FormInput;
