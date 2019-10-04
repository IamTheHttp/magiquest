function throttle(fn, msDelay) {
  let lastRun = Date.now();
  
  return function() {
    let now = Date.now();
    
    if (now > lastRun + msDelay) {
      // we can run
      lastRun = Date.now();
      fn();
    }
  };
}

export default throttle;