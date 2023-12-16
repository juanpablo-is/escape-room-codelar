import states from '../states.js'
import { getRandomColor } from '../utils.js'
import { getEscapeGame, getRoomsByGame, hasNextRoom } from '../room.js'

const event = ({ store, io, socket }, data, cb) => {
  const { idTeam, nick } = data
  const team = store.teams.get(idTeam)

  if (team) {
    const user = {
      idSocket: socket.id,
      name: nick,
      color: getRandomColor(),
      team: idTeam
    }

    store.users.set(socket.id, user)

    team.participants ||= []
    team.participants.push(user)

    socket.join(idTeam)
    socket.join('game')

    io.to(idTeam).emit('game:set-team', team)

    const { currentRoom } = team
    if (currentRoom >= 0) {
      if (hasNextRoom(store.escapeGame, currentRoom)) {
        const roomsGame = getRoomsByGame(store.escapeGame)
        const { value, ...response } = roomsGame[team.currentRoom]

        return cb({
          state: states.ROOM,
          data: response
        })
      }

      const escapeGame = getEscapeGame()
      return cb({
        state: states.CART,
        data: { message: escapeGame.cartMessage }
      })
    }

    return cb({ state: states.TEAM, data: team })
  }

  cb({ state: states.INITIAL })
}

export default event
