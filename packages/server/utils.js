export const shuffle = array => {
  const cloned = structuredClone(array)

  let currentIndex = cloned.length
  let randomIndex

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    ;[cloned[currentIndex], cloned[randomIndex]] = [
      cloned[randomIndex],
      cloned[currentIndex]
    ]
  }

  return cloned
}

export const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'gray']

export const getRandomColor = () => shuffle(COLORS).shift()
