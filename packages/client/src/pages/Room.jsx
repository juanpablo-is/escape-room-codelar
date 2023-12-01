import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { toast } from 'sonner';

import { Button, Input, Select, Snowfall } from '@/components';
import { useGame } from '@/store';
import { states } from '@/utils';

const Room = (props) => {
  const { socket, isLeader, idTeam, setState } = useGame();
  const [room, setRoom] = useState(props);

  useEffect(() => {
    // socket.emit('game:get-room', setRoom);
    socket.on('game:get-room', setRoom);
    socket.on('game:team:show-cart', (data) => setState(states.CART, data));

    return () => {
      socket.off('game:get-room');
      socket.off('game:team:show-cart');
    };
  }, [socket]);

  function handlerResponse(value) {
    socket.emit(
      'game:team:answer-room',
      { value, idTeam },
      ({ status, message }) => {
        if (!status) return toast.error(message);

        return toast.success(message);
      }
    );
  }

  if (!room || !room.id) return '';

  return (
    <div
      key={room.id}
      className="w-[90%] max-w-4xl bg-dark/60 z-50 h-full text-white flex gap-3 items-center flex-col py-4 animate-opacity"
    >
      <h1 className="font-tertiary text-center uppercase text-4xl">
        {room.name}
      </h1>
      <hr className="w-full" />

      <div className="flex-1 w-full font-tertiary p-3 text-xl overflow-auto markdown">
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            snowfall: Snowfall,
            buttons: Button,
          }}
        >
          {room.statement}
        </Markdown>
      </div>

      {isLeader && !room.finish && (
        <Response {...room.response} onResponse={handlerResponse} />
      )}
    </div>
  );
};

export default Room;

const Response = ({ type = 'input', options = [], onResponse }) => {
  function handlerResponse(e) {
    e.preventDefault();

    const value = e.target.response.value;
    onResponse(value);
  }

  if (!['input', 'select'].includes(type)) return;

  return (
    <form
      onSubmit={handlerResponse}
      className="w-full flex-col sm:flex-row flex gap-2 font-secondary"
    >
      {type === 'input' && (
        <Input
          name="response"
          placeholder="Ingrese respuesta"
          className="flex-1"
          autoFocus
        />
      )}

      {type === 'select' && (
        <Select
          name="response"
          className="flex-1"
          placeholder="Seleccione respuesta"
          options={options}
        />
      )}

      <Button>Enviar respuesta</Button>
    </form>
  );
};
