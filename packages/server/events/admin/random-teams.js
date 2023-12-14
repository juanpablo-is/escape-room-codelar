import { shuffle } from '../../utils.js'

const event = ({ store, io }) => {
  const randomTeams = getRandomTeams({
    users: [...store.users.values()],
    count: 2
  })

  Object.assign(store, {
    teams: randomTeams
  })
  ;[...randomTeams.values()].forEach(teams => {
    const { id, participants } = teams

    io.socketsLeave(id)

    participants.forEach(participant => {
      const _socket = io.sockets.sockets.get(participant.idSocket)
      if (_socket) {
        _socket.join(id)
        _socket.join('game')
      }
    })

    io.to(id).emit('game:order-team', teams)
  })
}

export default event

function getRandomTeams ({ users = [], count = 0 }) {
  const _users = shuffle(users)

  return Array.from({ length: count }).reduce((acc, _, i) => {
    const participants = _users.splice(0, Math.ceil(users.length / count))

    if (participants.length > 0) {
      const idTeam = `team-${i + 1}`

      acc.set(idTeam, {
        name: `Equipo #${i + 1}`,
        id: idTeam,
        participants,
        leader: participants[0].idSocket,
        points: 0
      })
    }

    return acc
  }, new Map())
}
