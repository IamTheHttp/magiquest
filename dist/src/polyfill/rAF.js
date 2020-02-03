// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// MIT license
var windowCopy = window;
(function () {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !windowCopy.requestAnimationFrame; ++x) {
        windowCopy.requestAnimationFrame = windowCopy[vendors[x] + "RequestAnimationFrame"];
        windowCopy.cancelAnimationFrame = windowCopy[vendors[x] + "CancelAnimationFrame"]
            || windowCopy[vendors[x] + "CancelRequestAnimationFrame"];
    }
    if (!windowCopy.requestAnimationFrame) {
        windowCopy.requestAnimationFrame = function (callback) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = windowCopy.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!windowCopy.cancelAnimationFrame) {
        windowCopy.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
    }
})();
