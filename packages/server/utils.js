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

export const COLORS = [
  '#00A543',
  '#D8000A',
  '#007188',
  '#565555',
  '#B78B4C',
  '#0189CC',
  '#E94616',
  '#B12507',
  '#C0C0C0',
  '#800080',
  '#40E0D0',
  '#EAA806'
]

export const getRandomColor = () => shuffle(COLORS).shift()
