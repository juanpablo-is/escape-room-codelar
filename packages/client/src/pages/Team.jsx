import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Alert, Bauble } from '@/components';
import { useGame } from '@/store';
import { states } from '@/utils';

const Team = (props) => {
  const { isLeader, setIsLeader, socket, setState, setIdTeam } = useGame();
  const [teamData, setTeamData] = useState(props);

  function changeLeader(idUser) {
    if (!isLeader) return;
    if (socket.id === idUser) {
      return toast.info('Ya tienes rol lider del equipo');
    }

    socket.emit(
      'game:team:set-leader',
      { idTeam: teamData.id, idUser: idUser },
      () => setIsLeader(false)
    );
  }

  function handlerChangeName(e) {
    const value = e.target.innerText.trim();

    if (!value) {
      e.target.innerText = teamData.name;
      return toast.error('Debe ingresar un valor');
    }

    socket.emit('game:team:set-name', { idTeam: teamData.id, name: value });
  }

  useEffect(() => {
    socket.on('game:set-team', (team) => setTeamData(team));
    socket.on('game:start', (data) => setState(states.ROOM, data));

    return () => {
      socket.off('game:set-team');
      socket.off('game:start');
    };
  }, [socket]);

  useEffect(() => {
    if (teamData.leader === socket.id) setIsLeader(true);
    if (teamData.id) setIdTeam(teamData.id);
  }, [teamData]);

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
        {teamData.name}
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
        {teamData.participants
          // .filter((u) => u.name !== nick)
          .map((participant, i) => (
            <Bauble
              key={participant.idSocket}
              name={participant.name}
              color={participant.color}
              onClick={() => changeLeader(participant.idSocket)}
            >
              {teamData.leader === participant.idSocket && '👑'}{' '}
              {participant.name}
            </Bauble>
          ))}
      </div>
    </div>
  );
};

export default Team;
