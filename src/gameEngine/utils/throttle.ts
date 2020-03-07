function throttle(fn: () => {}, msDelay: number) {
  let lastRun = Date.now();
  
  return function(...args: any[]) {
    let now = Date.now();
    
    if (now > lastRun + msDelay) {
      // we can run
      lastRun = Date.now();
      fn.apply(this, args);
    }
  };
}

export default throttle;