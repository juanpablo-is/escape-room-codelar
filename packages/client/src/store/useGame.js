import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { io } from 'socket.io-client'

import { states } from '@/utils'

const socket = io(import.meta.env.VITE_URL_SERVER_SOCKET, {
  autoConnect: false,
  closeOnBeforeunload: false,
  extraHeaders: {
    'ngrok-skip-browser-warning': Date.now()
  }
})

// TODO: borrar a futuro
window.socketCL = socket

export default create(
  persist(
    (set, get) => ({
      socket: socket,

      state: ['', {}],
      isLeader: false,
      nick: '',
      idTeam: '',

      setState: (newState, props) => {
        const exist = Object.values(states).includes(newState)
        if (exist) return set({ state: [newState, props] })
      },
      setIsLeader: isLeader => set({ isLeader }),
      setNick: nick => set({ nick }),
      setIdTeam: idTeam => set({ idTeam })
    }),
    {
      name: 'CLER:user',
      storage: createJSONStorage(() => sessionStorage),
      partialize: state => ({ nick: state.nick, idTeam: state.idTeam })
    }
  )
)
