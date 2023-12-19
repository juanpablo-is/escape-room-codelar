import { getRandomColor } from '../../utils.js'

const event = ({ store, socket, io }, username, cb) => {
  if (username !== process.env.ADMIN_USER) {
    return cb({ alert: true, message: 'Username no valido' })
  }
}

export default event
