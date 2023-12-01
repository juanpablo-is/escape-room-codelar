import { cn } from '@/utils';

const Select = ({
  className,
  placeholder,
  children,
  options = [],
  ...props
}) => {
  const clsx = cn('text-black rounded-md px-3', className);

  return (
    <select required className={clsx} {...props}>
      {placeholder && (
        <option value="" defaultChecked hidden>
          {placeholder}
        </option>
      )}

      {Array.isArray(options) &&
        options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
    </select>
  );
};

export default Select;
