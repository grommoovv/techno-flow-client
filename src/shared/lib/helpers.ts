export const formatData = new Intl.DateTimeFormat('ru-RU', {
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
})

export const calcPercent = (a: number, b: number) => {
  if (a === 0) {
    a = 1
  }
  if (b === 0) {
    b = 1
  }
  let result = (a / b) * 100
  return result.toFixed(1)
}
