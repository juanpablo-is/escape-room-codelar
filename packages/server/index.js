import express from 'express'
import http from 'http'
import { Server } from 'socket.io'

import { registerEvent } from '@juanpablo.is/filevent'

const app = express()
const server = http.createServer(app)

app.set('PORT', process.env.PORT || 5000)

const io = new Server(server, {
  cors: { origin: '*' }
})

const store = {
  users: new Map(),
  teams: new Map(),
  escapeGame: 0 // que juego se usará
}

io.use(registerEvent({ store: store }))

io.on('connection', socket => {})

server.listen(app.get('PORT'), async () => {
  console.log(`✔️ Server listening on port ${app.get('PORT')}`)
})
