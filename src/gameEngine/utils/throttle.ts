function throttle(fn, msDelay) {
  let lastRun = Date.now();
  
  return function(...args) {
    let now = Date.now();
    
    if (now > lastRun + msDelay) {
      // we can run
      lastRun = Date.now();
      fn.apply(this, args);
    }
  };
}

export default throttle;