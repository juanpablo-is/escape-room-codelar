import RoomsData from '../../data/rooms.json.js'

const event = ({ store }, cb) => {
  const { escapeGame } = store

  const rooms = RoomsData[escapeGame].rooms
  console.log(rooms[0]);
  cb(rooms[0])
}

export default event
