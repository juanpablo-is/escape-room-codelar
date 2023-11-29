import RoomsData from '../../../data/rooms.json.js'
import {
  MAX_POINT,
  MIN_POINT,
  ATTEMPT_POINT,
  SECOND_POINT
} from '../../../const.js'

const event = ({ io, store }, response, cb) => {
  const { escapeGame, teams } = store
  const { value, idTeam } = response

  const team = teams.get(idTeam)
  const roomLevel = team.currentRoom

  if (team.rooms[roomLevel].finish) {
    return cb({ status: false, message: 'Ya ha respondido a esta sala' })
  }

  const rooms = RoomsData[escapeGame].rooms
  const room = rooms[roomLevel]

  const isCorrect = room.response.toLowerCase() === value.toLowerCase()

  if (!isCorrect) {
    team.rooms[roomLevel].attempts++
    io.to(idTeam).emit('game:alert', {
      type: 'error',
      message: `Incorrecto, menos ${ATTEMPT_POINT} puntos`
    })
  } else {
    const timeFinish = +new Date()

    team.rooms[roomLevel].finish = true
    team.rooms[roomLevel].timeFinish = timeFinish

    const lessAttemptPoints = team.rooms[roomLevel].attempts * ATTEMPT_POINT

    const diff = timeFinish - team.rooms[roomLevel].timeStart
    const diffSeconds = (diff / 1000) * SECOND_POINT

    const diffPoints = MAX_POINT - lessAttemptPoints - diffSeconds
    const points = Math.max(MIN_POINT, Math.round(diffPoints))

    team.rooms[roomLevel].points = points
    team.points += points

    io.to(idTeam).emit('game:alert', {
      type: 'success',
      message: `Correcto, han ganado ${points} puntos`
    })

    if (hasNextRoom(escapeGame, roomLevel)) {
      const roomData = rooms[team.currentRoom + 1]
      io.to(idTeam).emit('game:get-room', roomData)

      team.currentRoom++
      team.rooms.push({ timeStart: +new Date(), attempts: 0, finish: false })
    }
  }
}

function hasNextRoom (escape, room) {
  return RoomsData[escape] && room + 1 < RoomsData[escape].rooms.length
}

export default event
