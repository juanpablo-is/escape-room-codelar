import { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { toast } from 'sonner';

import { Button, Input } from '@/components';
import { useGame } from '@/store';

const Room = (props) => {
  const { socket, isLeader, idTeam } = useGame();
  const [room, setRoom] = useState(props);

  useEffect(() => {
    socket.on('game:get-room', setRoom);
    return () => socket.off('game:get-room');
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
      className="w-[90%] max-w-2xl bg-dark z-50 h-full text-white flex gap-3 items-center flex-col py-4 animate-opacity"
    >
      <h1 className="font-tertiary uppercase text-4xl">{room.name}</h1>
      <hr className="w-full" />

      <div className="flex-1 w-full font-tertiary p-3 text-xl overflow-auto">
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
