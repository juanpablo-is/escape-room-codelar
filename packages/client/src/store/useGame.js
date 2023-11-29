import { create } from 'zustand'
import { io } from 'socket.io-client'

import { states } from '@/utils'

const socket = io(import.meta.env.VITE_URL_SERVER_SOCKET, {
  autoConnect: false,
  closeOnBeforeunload: false
})

export default create((set, get) => ({
  socket: socket,

  state: [states.INITIAL, {}],
  isLeader: false,
  nick: '',

  setState: (newState, props) => {
    const exist = Object.values(states).includes(newState)
    if (exist) return set({ state: [newState, props] })
  },
  setIsLeader: isLeader => set({ isLeader }),
  setNick: nick => set({ nick })
}))
