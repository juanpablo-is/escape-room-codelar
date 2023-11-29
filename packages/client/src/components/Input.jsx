import { cn } from '@/utils';

const Input = ({ className, ...props }) => {
  const clsx = cn('p-3 rounded-md text-dark', className);
  return <input required className={clsx} {...props} />;
};

export default Input;
