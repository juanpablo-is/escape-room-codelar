import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Alert, Bauble } from '@/components';
import { useGame } from '@/store';
import { states } from '@/utils';

const Team = (props) => {
  const { nick, isLeader, setIsLeader, socket, setState, setIdTeam } =
    useGame();
  const [data, setData] = useState(props);

  function changeLeader(nameLeader) {
    if (!isLeader) return;
    if (nick === nameLeader) {
      return toast.info('Ya tienes rol lider del equipo');
    }

    socket.emit('game:team:set-leader', { idTeam: data.id, nameLeader }, () => {
      setIsLeader(false);
    });
  }

  function handlerChangeName(e) {
    const value = e.target.innerText.trim();

    if (!value) {
      e.target.innerText = data.name;
      return toast.error('Debe ingresar un valor');
    }

    socket.emit('game:team:set-name', { idTeam: data.id, name: value });
  }

  useEffect(() => {
    socket.on('game:set-team', (team) => setData(team));
    socket.on('game:start', (data) => setState(states.ROOM, data));

    return () => {
      socket.off('game:set-team');
      socket.off('game:start');
    };
  }, [socket]);

  useEffect(() => {
    if (data.leader === nick) setIsLeader(true);
    if (data.id) setIdTeam(data.id);
  }, [data]);

  return (
    <div className="w-[90%] font-tertiary h-full text-2xl justify-center max-w-2xl z-50 text-white flex gap-5 items-center flex-col py-4">
      {isLeader && (
        <Alert variant="dark" className="text-lg">
          Eres lider del equipo, puedes cambiar el nombre al equipo y/o
          seleccionar a otro lider
        </Alert>
      )}

      <h2
        suppressContentEditableWarning={isLeader}
        contentEditable={isLeader}
        className="text-4xl font-secondary uppercase"
        onBlur={handlerChangeName}
      >
        {data.name}
      </h2>

      <span className="text-center">
        Participantes:
        {isLeader && (
          <p className="italic text-base">
            Si da clic sobre otro participante, se le dará liderazgo
          </p>
        )}
      </span>

      <div className="gap-10 w-full grid-repeat-120 w-full overflow-auto grid">
        {data.participants
          .filter((u) => u.name !== nick)
          .map((participant, i) => (
            <Bauble
              key={i}
              name={participant.name}
              color={participant.color}
              onClick={() => changeLeader(participant.name)}
            >
              {data.leader === participant.name && '👑'} {participant.name}
            </Bauble>
          ))}
      </div>
    </div>
  );
};

export default Team;
