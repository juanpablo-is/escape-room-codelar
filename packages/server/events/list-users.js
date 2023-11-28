const event = ({ store }, cb) => {
  cb(store.users)
}

export default event
