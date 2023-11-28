import { Snowfall } from '@/components';

const Background = ({ children, opacitySnow = 1 }) => {
  return (
    <div className="w-screen h-screen bg-dark flex justify-center items-center">
      {children}

      <Snowfall opacity={opacitySnow} />
    </div>
  );
};

export default Background;
