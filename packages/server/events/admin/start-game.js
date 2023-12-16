import { getRoomsByGame } from '../../room.js'

const event = ({ store, socket, io }, cb = () => {}) => {
  // TODO: mirar si se envia por cb o game:alert

  if (store.teams.size === 0) {
    return cb({
      status: false,
      message: 'Primero debe crear los equipos, para iniciar el juego'
    })
  }

  const roomsGame = getRoomsByGame(store.escapeGame)
  if (!roomsGame || roomsGame.length === 0) {
    return cb({
      status: false,
      message: 'No se puede iniciar el juego, no existe rooms'
    })
  }

  ;[...store.teams.entries()].forEach(([key, team]) => {
    store.teams.set(key, {
      ...team,
      currentRoom: 0,
      rooms: [{ timeStart: +new Date(), attempts: 0, finish: false, points: 0 }]
    })
  })

  const { value, ...response } = roomsGame[0]
  io.to('game').emit('game:start', response)

  cb({ status: true })
}

export default event
