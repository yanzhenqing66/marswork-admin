const debounce = (fn: any, delay = 300) => {
  let handler: any = null
  return function (this: unknown) {
    if (handler) clearTimeout(handler)
    handler = setTimeout(() => {
      fn.apply(this, arguments)
    }, delay)
  }
}
const throttle = (fn: any, delay = 500) => {
  let lastTime: any = null
  return (...arg: any) => {
    let nowTime = Date.now()
    if (!lastTime || nowTime - lastTime >= delay) {
      fn(...arg)
      lastTime = nowTime
    }
  }
}

export { debounce, throttle }
