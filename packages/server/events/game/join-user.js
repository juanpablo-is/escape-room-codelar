import { getRandomColor } from '../../utils.js'

const event = ({ store, socket, io }, username, cb) => {
  const existUsername = [...store.users.values()].some(
    u => u.name.toLowerCase() === username.toLowerCase()
  )

  if (!existUsername) {
    store.users.set(socket.id, {
      idSocket: socket.id,
      name: username,
      color: getRandomColor()
    })

    io.emit('list-users', [...store.users.values()])
  }

  cb(!existUsername)
}

export default event
