import RoomsData from '../../../data/rooms.json.js'
import {
  MAX_POINT,
  MIN_POINT,
  ATTEMPT_POINT,
  SECOND_POINT
} from '../../../const.js'

const event = ({ io, store }, data, cb) => {
  const { escapeGame, teams } = store
  const { value, idTeam } = data

  const team = teams.get(idTeam)
  const roomLevel = team.currentRoom

  if (team.rooms[roomLevel].finish) {
    return cb({ status: false, message: 'Ya ha respondido a esta sala' })
  }

  const { rooms, cartMessage } = RoomsData[escapeGame]
  const room = rooms[roomLevel]

  if (!room || !room.response?.value) {
    return cb({ status: false, message: 'Se ha presentado un error' })
  }

  const isCorrect = isCorrectAnswer({
    value: value.toLowerCase(),
    options: room.response.value
  })

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

    const diffSeconds =
      getSecondsDiff({
        timeStart: team.rooms[roomLevel].timeStart,
        timeFinish: timeFinish
      }) * SECOND_POINT

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
      const { value, ...response } = roomData.response
      io.to(idTeam).emit('game:get-room', { ...roomData, response })
    } else {
      io.to(idTeam).emit('game:team:show-cart', { message: cartMessage })
    }

    team.currentRoom++
    team.rooms.push({
      timeStart: +new Date(),
      attempts: 0,
      points: 0,
      finish: false
    })
  }
}

function hasNextRoom (escape, room) {
  return RoomsData[escape] && room + 1 < RoomsData[escape].rooms.length
}

function getSecondsDiff ({ timeStart, timeFinish }) {
  return (timeFinish - timeStart) / 1000
}

function isCorrectAnswer ({ value, options }) {
  const values = Array.isArray(options) ? options : [options]
  return values.some(v => v.toLowerCase() === value)
}

export default event
