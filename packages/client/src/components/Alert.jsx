import { cn } from '@/utils';

const VARIANTS = {
  info: 'text-blue-800 bg-blue-300 border-blue-300 dark:text-blue-300 dark:border-blue-300',
  danger:
    'text-red-800 bg-red-300 border-red-300 dark:text-red-300 dark:border-red-300',
  success:
    'text-green-800 bg-green-300 border-green-300 dark:text-green-300 dark:border-green-300',
  warning:
    'text-yellow-800 bg-yellow-300 border-yellow-300 dark:text-yellow-300 dark:border-yellow-300',
  dark: 'text-gray-800 bg-gray-300 border-gray-300 dark:text-gray-300 dark:border-gray-300',
};

const Alert = ({ variant: _variant = 'info', className, children }) => {
  const variant = VARIANTS[_variant] || VARIANTS.warning;
  const clsx = cn(
    'flex items-center gap-2 my-1 p-2 text-sm rounded-lg border-2 dark:bg-dark',
    variant,
    className
  );

  return (
    <div className={clsx} role="alert">
      <span className="i-lucide-badge-alert" />
      <span className="sr-only">Info</span>
      <div>{children}</div>
    </div>
  );
};

export default Alert;
