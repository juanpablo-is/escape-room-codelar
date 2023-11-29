import { useEffect } from 'react';

import { Home, Lounge, Room, Team } from '@/pages';
import { useGame } from '@/store';
import { states } from '@/utils';

function App() {
  const {
    socket,
    state: [STATUS, props],
  } = useGame();

  useEffect(() => {
    socket.connect();
  }, [socket]);

  if (STATUS === states.INITIAL) return <Home {...props} />;
  if (STATUS === states.WAIT) return <Lounge {...props} />;
  if (STATUS === states.TEAM) return <Team {...props} />;
  if (STATUS === states.ROOM) return <Room {...props} />;
}

export default App;
