import { shuffle } from '../../utils.js'

const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'gray']

const event = ({ store }, username, cb) => {
  const existUsername = store.users.some(
    u => u.name.toLowerCase() === username.toLowerCase()
  )

  if (!existUsername) {
    store.users.push({ name: username, color: getRandomColor() })
  }

  cb(!existUsername)
}

const getRandomColor = () => {
  return shuffle(COLORS).shift()
}

export default event
