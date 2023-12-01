function relative (elapsed, { prefix = '', suffix = '', divider = ' ' } = {}) {
  const units = [
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ]

  if (!window.Intl) return ''

  for (const [unit, amount] of units) {
    if (Math.abs(elapsed) > amount || unit === 'second') {
      const value = Intl.NumberFormat('es', {
        style: 'unit',
        unit: unit,
        unitDisplay: 'short'
      }).format(Math.round(elapsed / amount))

      return [prefix, value, suffix].filter(s => s).join(divider)
    }
  }

  return ''
}

export default relative
