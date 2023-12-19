import { Home } from '@/layouts/admin';
import { useGame } from '@/store';
import { useEffect } from 'react';

const Admin = () => {
  const { socket } = useGame();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return <Home />;
};

export default Admin;
