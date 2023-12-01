import RoomsData from '../../../data/rooms.json.js'
import { MAX_POINT, MIN_POINT, SECOND_POINT } from '../../../const.js'

const event = ({ io, store }, data) => {
  const { escapeGame, teams } = store
  const { words = [], idTeam } = data

  const team = teams.get(idTeam)
  const roomLevel = team.currentRoom

  const { rooms, cartMessage } = RoomsData[escapeGame]
  const { isCorrect, message } = isCorrectCart(cartMessage, words)

  if (!isCorrect) {
    return io.to(idTeam).emit('game:alert', {
      type: 'error',
      message
    })
  }

  const timeFinish = +new Date()

  team.rooms[roomLevel].finish = true
  team.rooms[roomLevel].timeFinish = timeFinish

  const diffSeconds =
    getSecondsDiff({
      timeStart: team.rooms[roomLevel].timeStart,
      timeFinish: timeFinish
    }) * SECOND_POINT

  const diffPoints = MAX_POINT - diffSeconds
  const points = Math.max(MIN_POINT, Math.round(diffPoints))

  team.rooms[roomLevel].points = points
  team.points += points

  io.to(idTeam).emit('game:alert', {
    type: 'success',
    message
  })

  const roomsResults = rooms.map((room, i) => ({
    name: room.name,
    points: team.rooms[i] ? team.rooms[i].points : 0,
    time: team.rooms[i]
      ? getSecondsDiff({
          timeStart: team.rooms[i].timeStart,
          timeFinish: team.rooms[i].timeFinish
        })
      : 0
  }))

  roomsResults.push({
    name: 'Carta CodeLar',
    points: team.rooms[roomLevel] ? team.rooms[roomLevel].points : 0,
    time: team.rooms[roomLevel]
      ? getSecondsDiff({
          timeStart: team.rooms[roomLevel].timeStart,
          timeFinish: team.rooms[roomLevel].timeFinish
        })
      : 0
  })

  const results = {
    points: team.points,
    teamName: team.name,
    rooms: roomsResults
  }

  io.to('game')
    .except(idTeam)
    .emit('game:alert', {
      type: 'info',
      message: `El equipo '${team.name}' ya ha terminado`
    })
  io.to(idTeam).emit('game:team:show-results', results)
}

function getSecondsDiff ({ timeStart, timeFinish }) {
  return (timeFinish - timeStart) / 1000
}

function isCorrectCart (cartMessage, words) {
  const regex = /<hide>(.*?)<\/hide>/g
  const matchMessage = cartMessage.match(regex)

  const countWords = matchMessage.filter((word, index) => {
    const palabra = word.replace(/<\/?hide>/g, '').replaceAll(' ', '')

    return words[index] === palabra
  })

  const isCorrect = countWords.length === matchMessage.length
  const diffWords = countWords.length

  const message = isCorrect
    ? `Felicitaciones!`
    : `Incorrecto, tienen ${diffWords} palabra${
        diffWords !== 1 ? 's' : ''
      } correcta${diffWords !== 1 ? 's' : ''}`

  return { isCorrect, message }
}

export default event
