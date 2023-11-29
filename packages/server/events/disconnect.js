const event = ({ store, io, socket }) => {
  store.users.delete(socket.id)
  io.emit('list-users', [...store.users.values()])
}

export default event
