import { useEffect } from 'react';
import { toast } from 'sonner';

import { Home, Lounge, Result, Room, Team } from '@/pages';
import { useGame } from '@/store';
import { states } from '@/utils';

function App() {
  const {
    socket,
    state: [STATUS, props],
  } = useGame();

  useEffect(() => {
    socket.connect();

    socket.on('game:alert', ({ type, message }) => {
      if (type && message) {
        const alert = toast[type] || toast.info;
        alert(message);
      }
    });

    return () => socket.off('game:alert');
  }, [socket]);

  if (STATUS === states.INITIAL) return <Home {...props} />;
  if (STATUS === states.WAIT) return <Lounge {...props} />;
  if (STATUS === states.TEAM) return <Team {...props} />;
  if (STATUS === states.ROOM) return <Room {...props} />;
  if (STATUS === states.RESULT) return <Result {...props} />;
}

export default App;
