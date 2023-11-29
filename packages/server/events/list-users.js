const event = ({ store }, cb) => {
  cb([...store.users.values()])
}

export default event
