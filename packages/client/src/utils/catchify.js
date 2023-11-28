const catchify = promise => {
  return promise.then(d => [null, d]).catch(e => [e, null])
}

export default catchify
