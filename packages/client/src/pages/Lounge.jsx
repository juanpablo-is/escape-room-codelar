import { useState, useEffect } from 'react';

import { Bauble } from '@/components';
import { useGame } from '@/store';
import { states } from '@/utils';

const Lounge = () => {
  const { socket, setState } = useGame();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.emit('list-users', (users) => setUsers(users));

    socket.on('list-users', (users) => setUsers(users));
    socket.on('game:order-team', (data) => setState(states.TEAM, data));

    return () => {
      socket.off('list-users');
      socket.off('game:order-team');
    };
  }, [socket]);

  return (
    <div className="text-white flex justify-center items-center font-primary flex-col gap-10 z-50 w-full h-full">
      <div className="grid grid-repeat-120 justify-items-center gap-14 w-full max-w-2xl overflow-auto">
        {users.map((user, i) => (
          <Bauble key={i} {...user} />
        ))}
      </div>
    </div>
  );
};

export default Lounge;
