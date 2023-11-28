import { toast } from 'sonner';

import { Background, Button } from '@/components';
import { useGame } from '@/store';
import { states } from '@/utils';

const Home = () => {
  const { socket, setState } = useGame();

  function handlerJoin(e) {
    e.preventDefault();

    const username = e.target.username.value;
    socket.emit('game:join-user', username, (status) => {
      if (!status) return toast.error(`Ya existe el nick "${username}"`);

      setState(states.WAIT);
    });
  }

  return (
    <Background>
      <div className="text-white flex justify-center items-center font-primary flex-col gap-10 z-50">
        <header className="flex flex-col justify-center items-center text-8xl">
          <h2 className="text-primary">ESCAPE</h2>
          <h2>ROOM</h2>
        </header>

        <form
          onSubmit={handlerJoin}
          className="flex gap-2 flex-col font-secondary text-2xl"
        >
          <input
            required
            type="text"
            placeholder="Ingrese username"
            className="p-3 rounded-md text-dark"
            name="username"
          />
          <Button>INGRESAR</Button>
        </form>
      </div>
    </Background>
  );
};

export default Home;
