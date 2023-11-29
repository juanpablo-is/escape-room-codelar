const event = ({ io, store }, data, cb) => {
  const { idTeam, nameLeader } = data

  const team = store.teams.get(idTeam)
  if (!team) return

  team.leader = nameLeader
  store.teams.set(idTeam, team)

  io.to(idTeam).emit('game:set-team', team)

  cb()
}

export default event
