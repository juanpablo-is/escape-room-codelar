const event = ({ io, store }, data, cb) => {
  const { idTeam, name } = data

  const team = store.teams.get(idTeam)
  if (!team) return

  team.name = name
  store.teams.set(idTeam, team)

  io.to(idTeam).emit('game:set-team', team)
}

export default event
