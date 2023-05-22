import classNames from 'classnames';

export default function FormLabel({ name, errors }) {
  return (
    <label
      className={classNames(
        'p-1 text-xs font-popReg dark:text-gray-300',
        {
          'text-red-600': errors.field,
        },
        { 'text-red-600': errors.invalidDate }
      )}
      htmlFor={name}
    >
      {name.toUpperCase()}
    </label>
  );
}
