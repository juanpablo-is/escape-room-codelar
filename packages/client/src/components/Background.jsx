import { Snowfall } from '@/components';

const Background = ({ children }) => {
  return (
    <div className="w-screen h-screen bg-dark flex justify-center items-center overflow-auto">
      {children}

      <Snowfall />
    </div>
  );
};

export default Background;
