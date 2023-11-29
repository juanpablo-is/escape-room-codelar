import SnowReact from 'react-snowfall';

const images = ['snowfall.png', 'snowfall-yellow.png'].map((image) => {
  const snowflake = document.createElement('img');
  snowflake.src = image;
  return snowflake;
});

const Snowfall = () => {
  return (
    <SnowReact
      speed={[0, 1]}
      wind={[0, 2]}
      radius={[5, 10]}
      images={images}
      style={{ opacity: 0.6 }}
    />
  );
};

export default Snowfall;
