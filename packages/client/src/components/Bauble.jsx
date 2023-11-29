import { useMemo } from 'react';
import { cn } from '@/utils';

const Bauble = ({ name, color, className, onClick, children }) => {
  const clsx = cn('bauble font-primary', className);

  const letters = useMemo(() => {
    if (!name) return 'CL';

    const [first, second] = name.split(' ');
    return second ? first[0] + second[0] : first.slice(0, 2);
  }, [name]);

  return (
    <div className="flex flex-col gap-2 items-center py-2">
      <div
        title={name}
        className={clsx}
        style={{ '--bauble-color': color }}
        onClick={onClick}
      >
        {letters}
      </div>

      {children && <p className="w-full text-center truncate">{children}</p>}
    </div>
  );
};

export default Bauble;
