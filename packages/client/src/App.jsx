import { useEffect } from 'react';

import { Home, Lounge } from '@/pages';
import { useGame } from '@/store';
import { states } from '@/utils';

function App() {
  const { socket, state } = useGame();

  useEffect(() => {
    socket.connect();
  }, [socket]);

  if (state === states.INITIAL) return <Home />;
  return <Lounge />;
}

export default App;
