import { useMemo } from 'react';

const Bauble = ({ name, color }) => {
  const letters = useMemo(() => {
    if (!name) return 'CL';

    const [first, second] = name.split(' ');
    return second ? first[0] + second[0] : first.slice(0, 2);
  }, [name]);

  return (
    <div title={name} className="bauble" style={{ '--bauble-color': color }}>
      {letters}
    </div>
  );
};

export default Bauble;
