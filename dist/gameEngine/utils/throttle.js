function throttle(fn, msDelay) {
    var lastRun = Date.now();
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        if (now > lastRun + msDelay) {
            // we can run
            lastRun = Date.now();
            fn.apply(this, args);
        }
    };
}
export default throttle;
