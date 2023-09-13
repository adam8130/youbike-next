export function throttle(cb, delay) {
  let lastTime = 0
  
  return function(...args) {
    const now = new Date().getTime()

    if (now - lastTime > delay) {
      cb.apply(this, args)
      lastTime = now
    }
  }
}