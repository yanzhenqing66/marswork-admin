function formatPriceK(p: number) {
  if (!p) {
    return p
  }
  return (p / 1000).toFixed(0) + 'k'
}

export function formatThousands(num: number | string) {
  const str = num.toString()
  const reg = str.indexOf('.') > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g
  return str.replace(reg, '$1,')
}

export function sliceToZero(num: number | string) {
  const str = num.toString()
  if (str.length < 3) return '1000'
  return str.slice(0, -3) + '000'
}

export default formatPriceK
