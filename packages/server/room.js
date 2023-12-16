import RoomsData from './data/rooms.json.js'

export function getEscapeGame (gameCount = 0) {
  return RoomsData[gameCount] || false
}

export function getRoomsByGame (gameCount) {
  return RoomsData[gameCount] ? RoomsData[gameCount].rooms : false
}

export function hasNextRoom (escape, room) {
  return RoomsData[escape] && room + 1 < RoomsData[escape].rooms.length
}
