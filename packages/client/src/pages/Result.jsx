import { useState } from 'react';
import { relative } from '@/utils';

const Result = (data) => {
  const [finishGame, setFinishGame] = useState(false);

  if (!data || !data.rooms) return '';

  return (
    <div className="text-white flex h-full justify-center items-center font-primary flex-col gap-2 max-h-[80%] z-50 bg-dark/40 max-w-2xl w-full p-4">
      <header className="flex flex-col justify-center items-center text-5xl sm:text-7xl">
        <h2 className="text-primary">ESCAPE</h2>
        <h2>ROOM</h2>

        <span className="font-tertiary text-5xl">Resultados</span>
      </header>

      <div className="flex gap-2 font-secondary flex-col w-full overflow-auto px-4 py-10">
        {data.rooms.map((room, i) => (
          <div
            key={i}
            className="flex gap-3 decoration-primary"
            style={{
              textDecorationLine: !room.points && 'line-through',
            }}
          >
            <p className="pr-3 border-r-2">{i + 1}</p>
            <h3 className="flex-1 truncate">{room.name}</h3>
            {room.time && <p>{relative(room.time, { prefix: 'en' })}</p>}
            <p className="font-bold text-primary">- {room.points || 0}</p>
          </div>
        ))}
      </div>

      <p className="w-full flex justify-end font-secondary font-bold text-primary text-xl">
        Total de {data.points} puntos
      </p>
    </div>
  );
};

export default Result;
