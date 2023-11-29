import RoomsData from './data/rooms.json.js'

export function getEscapeGame (gameCount = 0) {
  return RoomsData[gameCount] || false
}

export function getRoomsByGame (gameCount) {
  return RoomsData[gameCount] ? RoomsData[gameCount].rooms : false
}
