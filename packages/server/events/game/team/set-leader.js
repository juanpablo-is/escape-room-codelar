const event = ({ io, store }, data, cb) => {
  const { idTeam, idUser } = data

  const team = store.teams.get(idTeam)
  if (!team) return

  team.leader = idUser
  store.teams.set(idTeam, team)

  io.to(idTeam).emit('game:set-team', team)

  const user = store.users.get(idUser)
  io.to(idTeam).emit('game:alert', {
    type: 'info',
    message: `Lider del equipo es ${user.name}`
  })

  cb()
}

export default event
