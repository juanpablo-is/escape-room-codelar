function relative (
  elapsed,
  { prefix = '', suffix = '', divider = ' ', useRound = true } = {}
) {
  const units = [
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ]

  if (!window.Intl) return ''

  for (const [unit, amount] of units) {
    if (Math.abs(elapsed) > amount || unit === 'second') {
      const time = elapsed / amount
      const value = Intl.NumberFormat('es', {
        style: 'unit',
        unit: unit,
        unitDisplay: 'short'
      }).format(useRound ? Math.round(time) : time)

      return [prefix, value, suffix].filter(s => s).join(divider)
    }
  }

  return ''
}

export default relative
