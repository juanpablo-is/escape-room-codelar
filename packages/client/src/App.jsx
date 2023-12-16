import { useEffect } from 'react';
import { toast } from 'sonner';

import { Cart, Home, Loading, Lounge, Result, Room, Team } from '@/pages';
import { useGame } from '@/store';
import { states } from '@/utils';

function App() {
  const {
    socket,
    state: [STATUS, props],
    nick,
    idTeam,
    setState,
    setIsLeader,
  } = useGame();

  useEffect(() => {
    socket.connect();

    socket.emit('status-server', { nick, idTeam }, ({ state, data }) => {
      if (Object.values(states).includes(state)) {
        setState(state, data);
      }
    });

    socket.on('game:team:set-leader', (leader) => setIsLeader(leader));
    socket.on('game:alert', ({ type, message }) => {
      if (type && message) {
        const alert = toast[type] || toast.info;
        alert(message);
      }
    });

    return () => {
      socket.off('game:team:set-leader');
      socket.off('game:alert');

      socket.disconnect();
    };
  }, [socket]);

  if (STATUS === states.INITIAL) return <Home {...props} />;
  if (STATUS === states.WAIT) return <Lounge {...props} />;
  if (STATUS === states.TEAM) return <Team {...props} />;
  if (STATUS === states.ROOM) return <Room {...props} />;
  if (STATUS === states.CART) return <Cart {...props} />;
  if (STATUS === states.RESULT) return <Result {...props} />;

  return <Loading />;
}

export default App;
