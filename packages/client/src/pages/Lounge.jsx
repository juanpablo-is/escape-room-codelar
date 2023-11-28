import { useState, useEffect } from 'react';

import { Background, Bauble } from '@/components';
import { useGame } from '@/store';

const Lounge = () => {
  const { socket } = useGame();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit('list-users', (users) => setUsers(users));
    socket.on('list-users', (users) => setUsers(users));

    return () => socket.off('list-users');
  }, [socket]);

  return (
    <Background opacitySnow={0.4}>
      <div className="text-white flex justify-center items-center font-primary flex-col gap-10 z-50 w-full">
        <div className="grid grid-repeat-100 justify-items-center gap-14 w-auto max-w-xl">
          {users.map((user, i) => (
            <Bauble key={i} {...user} />
          ))}
        </div>
      </div>
    </Background>
  );
};

export default Lounge;
