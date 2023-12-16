import { shuffle } from '../utils.js'

const event = ({ store, io, socket }) => {
  const user = store.users.get(socket.id)
  if (!user) return

  store.users.delete(socket.id)

  const team = store.teams.get(user.team)
  if (!team) return

  const removeParticipant = team.participants.filter(
    p => p.idSocket !== socket.id
  )
  team.participants = removeParticipant

  const isLeader = team.leader === socket.id
  if (isLeader) {
    const [newLeader] = shuffle(removeParticipant)

    if (newLeader) {
      team.leader = newLeader.idSocket

      io.to(team.id).emit('game:set-team', team)
      io.to(team.id).emit('game:alert', {
        type: 'info',
        message: `Su lider se ha desconectado, el nuevo lider es ${newLeader.name}`
      })

      socket.emit('game:team:set-leader', false)
      io.to(newLeader.idSocket).emit('game:team:set-leader', true)
    }
  }

  io.emit('list-users', [...store.users.values()])
}

export default event
