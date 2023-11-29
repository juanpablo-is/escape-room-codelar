import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

import { Button, Input } from '@/components';
import { useGame } from '@/store';

const Room = () => {
  const { socket, isLeader } = useGame();
  const [room, setRoom] = useState();

  useEffect(() => {
    socket.emit('game:get-room', setRoom);

    socket.on('game:get-room', setRoom);
    return () => socket.off('game:get-room');
  }, [socket]);

  function handlerResponse(value) {
    socket.emit('game:response-room', { value, idRoom: 1 }, ({ status }) => {
      if (!status) return toast.error('Respuesta incorrecta');

      return toast.success('Respuesta correcta');
    });
  }

  if (!room) return '';

  return (
    <div className="w-[90%] max-w-2xl bg-dark z-50 h-full text-white flex gap-3 items-center flex-col py-4">
      <h1 className="font-tertiary uppercase text-4xl">{room.name}</h1>
      <hr className="w-full" />

      <div className="flex-1 w-full font-tertiary p-3 text-xl">
        <Markdown remarkPlugins={[remarkGfm]}>{room.statement}</Markdown>
      </div>

      {isLeader && <Response type="input" onResponse={handlerResponse} />}
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
        />
      )}

      {type === 'select' && (
        <select className="text-black flex-1 rounded-md px-3" name="response">
          <option value="" defaultChecked hidden>
            Seleccione respuesta
          </option>
          {options.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      <Button>Enviar respuesta</Button>
    </form>
  );
};
