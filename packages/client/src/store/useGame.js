import { create } from 'zustand'
import { io } from 'socket.io-client'

import { states } from '@/utils'

export default create((set, get) => ({
  socket: io(import.meta.env.VITE_URL_SERVER_SOCKET, {
    autoConnect: false,
    closeOnBeforeunload: false
  }),

  state: states.INITIAL,
  setState: newState => {
    const exist = Object.values(states).includes(newState)
    if (exist) return set({ state: newState })
  }
}))
