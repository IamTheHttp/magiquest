(function () {
  'use strict';

  // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
  // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
  // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
  // MIT license
  var windowCopy = window; // TODO this should not be any
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

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  /*
  object-assign
  (c) Sindre Sorhus
  @license MIT
  */
  /* eslint-disable no-unused-vars */
  var getOwnPropertySymbols = Object.getOwnPropertySymbols;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var propIsEnumerable = Object.prototype.propertyIsEnumerable;

  function toObject(val) {
  	if (val === null || val === undefined) {
  		throw new TypeError('Object.assign cannot be called with null or undefined');
  	}

  	return Object(val);
  }

  function shouldUseNative() {
  	try {
  		if (!Object.assign) {
  			return false;
  		}

  		// Detect buggy property enumeration order in older V8 versions.

  		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
  		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
  		test1[5] = 'de';
  		if (Object.getOwnPropertyNames(test1)[0] === '5') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test2 = {};
  		for (var i = 0; i < 10; i++) {
  			test2['_' + String.fromCharCode(i)] = i;
  		}
  		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
  			return test2[n];
  		});
  		if (order2.join('') !== '0123456789') {
  			return false;
  		}

  		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
  		var test3 = {};
  		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
  			test3[letter] = letter;
  		});
  		if (Object.keys(Object.assign({}, test3)).join('') !==
  				'abcdefghijklmnopqrst') {
  			return false;
  		}

  		return true;
  	} catch (err) {
  		// We don't expect any of the above to throw, but better to be safe.
  		return false;
  	}
  }

  var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  	var from;
  	var to = toObject(target);
  	var symbols;

  	for (var s = 1; s < arguments.length; s++) {
  		from = Object(arguments[s]);

  		for (var key in from) {
  			if (hasOwnProperty.call(from, key)) {
  				to[key] = from[key];
  			}
  		}

  		if (getOwnPropertySymbols) {
  			symbols = getOwnPropertySymbols(from);
  			for (var i = 0; i < symbols.length; i++) {
  				if (propIsEnumerable.call(from, symbols[i])) {
  					to[symbols[i]] = from[symbols[i]];
  				}
  			}
  		}
  	}

  	return to;
  };

  var n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x$1=n?Symbol.for("react.concurrent_mode"):60111,y$1=n?Symbol.for("react.forward_ref"):60112,z$1=n?Symbol.for("react.suspense"):60113,aa=n?Symbol.for("react.memo"):
  60115,ba$1=n?Symbol.for("react.lazy"):60116,A="function"===typeof Symbol&&Symbol.iterator;function ca$1(a,b,d,c,e,g,h,f){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {var l=[d,c,e,g,h,f],m=0;a=Error(b.replace(/%s/g,function(){return l[m++]}));a.name="Invariant Violation";}a.framesToPop=1;throw a;}}
  function B(a){for(var b=arguments.length-1,d="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++)d+="&args[]="+encodeURIComponent(arguments[c+1]);ca$1(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",d);}var C$1={isMounted:function(){return !1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},D$1={};
  function E$1(a,b,d){this.props=a;this.context=b;this.refs=D$1;this.updater=d||C$1;}E$1.prototype.isReactComponent={};E$1.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?B("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState");};E$1.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate");};function F$1(){}F$1.prototype=E$1.prototype;function G$1(a,b,d){this.props=a;this.context=b;this.refs=D$1;this.updater=d||C$1;}var H$1=G$1.prototype=new F$1;
  H$1.constructor=G$1;objectAssign(H$1,E$1.prototype);H$1.isPureReactComponent=!0;var I$1={current:null},J$1={current:null},K$1=Object.prototype.hasOwnProperty,L$1={key:!0,ref:!0,__self:!0,__source:!0};
  function M$1(a,b,d){var c=void 0,e={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b)K$1.call(b,c)&&!L$1.hasOwnProperty(c)&&(e[c]=b[c]);var f=arguments.length-2;if(1===f)e.children=d;else if(1<f){for(var l=Array(f),m=0;m<f;m++)l[m]=arguments[m+2];e.children=l;}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===e[c]&&(e[c]=f[c]);return {$$typeof:p,type:a,key:g,ref:h,props:e,_owner:J$1.current}}
  function da$1(a,b){return {$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function N$1(a){return "object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return "$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var O$1=/\/+/g,P$1=[];function Q$1(a,b,d,c){if(P$1.length){var e=P$1.pop();e.result=a;e.keyPrefix=b;e.func=d;e.context=c;e.count=0;return e}return {result:a,keyPrefix:b,func:d,context:c,count:0}}
  function R(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>P$1.length&&P$1.push(a);}
  function S$1(a,b,d,c){var e=typeof a;if("undefined"===e||"boolean"===e)a=null;var g=!1;if(null===a)g=!0;else switch(e){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0;}}if(g)return d(c,a,""===b?"."+T$1(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){e=a[h];var f=b+T$1(e,h);g+=S$1(e,f,d,c);}else if(null===a||"object"!==typeof a?f=null:(f=A&&a[A]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),h=
  0;!(e=a.next()).done;)e=e.value,f=b+T$1(e,h++),g+=S$1(e,f,d,c);else "object"===e&&(d=""+a,B("31","[object Object]"===d?"object with keys {"+Object.keys(a).join(", ")+"}":d,""));return g}function U$1(a,b,d){return null==a?0:S$1(a,"",b,d)}function T$1(a,b){return "object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function ea$1(a,b){a.func.call(a.context,b,a.count++);}
  function fa$1(a,b,d){var c=a.result,e=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?V$1(a,c,d,function(a){return a}):null!=a&&(N$1(a)&&(a=da$1(a,e+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(O$1,"$&/")+"/")+d)),c.push(a));}function V$1(a,b,d,c,e){var g="";null!=d&&(g=(""+d).replace(O$1,"$&/")+"/");b=Q$1(b,g,c,e);U$1(a,fa$1,b);R(b);}function W$1(){var a=I$1.current;null===a?B("307"):void 0;return a}
  var X$1={Children:{map:function(a,b,d){if(null==a)return a;var c=[];V$1(a,c,null,b,d);return c},forEach:function(a,b,d){if(null==a)return a;b=Q$1(null,null,b,d);U$1(a,ea$1,b);R(b);},count:function(a){return U$1(a,function(){return null},null)},toArray:function(a){var b=[];V$1(a,b,null,function(a){return a});return b},only:function(a){N$1(a)?void 0:B("143");return a}},createRef:function(){return {current:null}},Component:E$1,PureComponent:G$1,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,
  _currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a},forwardRef:function(a){return {$$typeof:y$1,render:a}},lazy:function(a){return {$$typeof:ba$1,_ctor:a,_status:-1,_result:null}},memo:function(a,b){return {$$typeof:aa,type:a,compare:void 0===b?null:b}},useCallback:function(a,b){return W$1().useCallback(a,b)},useContext:function(a,b){return W$1().useContext(a,b)},useEffect:function(a,b){return W$1().useEffect(a,b)},useImperativeHandle:function(a,
  b,d){return W$1().useImperativeHandle(a,b,d)},useDebugValue:function(){},useLayoutEffect:function(a,b){return W$1().useLayoutEffect(a,b)},useMemo:function(a,b){return W$1().useMemo(a,b)},useReducer:function(a,b,d){return W$1().useReducer(a,b,d)},useRef:function(a){return W$1().useRef(a)},useState:function(a){return W$1().useState(a)},Fragment:r,StrictMode:t,Suspense:z$1,createElement:M$1,cloneElement:function(a,b,d){null===a||void 0===a?B("267",a):void 0;var c=void 0,e=objectAssign({},a.props),g=a.key,h=a.ref,f=a._owner;if(null!=
  b){void 0!==b.ref&&(h=b.ref,f=J$1.current);void 0!==b.key&&(g=""+b.key);var l=void 0;a.type&&a.type.defaultProps&&(l=a.type.defaultProps);for(c in b)K$1.call(b,c)&&!L$1.hasOwnProperty(c)&&(e[c]=void 0===b[c]&&void 0!==l?l[c]:b[c]);}c=arguments.length-2;if(1===c)e.children=d;else if(1<c){l=Array(c);for(var m=0;m<c;m++)l[m]=arguments[m+2];e.children=l;}return {$$typeof:p,type:a.type,key:g,ref:h,props:e,_owner:f}},createFactory:function(a){var b=M$1.bind(null,a);b.type=a;return b},isValidElement:N$1,version:"16.8.2",
  unstable_ConcurrentMode:x$1,unstable_Profiler:u,__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentDispatcher:I$1,ReactCurrentOwner:J$1,assign:objectAssign}},Y$1={default:X$1},Z$1=Y$1&&X$1||Y$1;var react_production_min=Z$1.default||Z$1;

  var react = createCommonjsModule(function (module) {

  {
    module.exports = react_production_min;
  }
  });
  var react_1 = react.Children;
  react.createRef;
  var react_3 = react.Component;
  react.PureComponent;
  react.createContext;
  react.forwardRef;
  react.lazy;
  react.memo;
  react.useCallback;
  react.useContext;
  react.useEffect;
  react.useImperativeHandle;
  react.useDebugValue;
  react.useLayoutEffect;
  react.useMemo;
  react.useReducer;
  react.useRef;
  var react_18 = react.useState;
  react.Fragment;
  react.StrictMode;
  react.Suspense;
  var react_22 = react.createElement;
  react.cloneElement;
  react.createFactory;
  react.isValidElement;
  react.version;
  react.unstable_ConcurrentMode;
  react.unstable_Profiler;
  react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  var scheduler_production_min = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports,"__esModule",{value:!0});var d=null,e=!1,g=3,k=-1,l=-1,m=!1,n=!1;function p(){if(!m){var a=d.expirationTime;n?q():n=!0;r(t,a);}}
  function u(){var a=d,b=d.next;if(d===b)d=null;else {var c=d.previous;d=c.next=b;b.previous=c;}a.next=a.previous=null;c=a.callback;b=a.expirationTime;a=a.priorityLevel;var f=g,Q=l;g=a;l=b;try{var h=c();}finally{g=f,l=Q;}if("function"===typeof h)if(h={callback:h,priorityLevel:a,expirationTime:b,next:null,previous:null},null===d)d=h.next=h.previous=h;else {c=null;a=d;do{if(a.expirationTime>=b){c=a;break}a=a.next;}while(a!==d);null===c?c=d:c===d&&(d=h,p());b=c.previous;b.next=c.previous=h;h.next=c;h.previous=
  b;}}function v(){if(-1===k&&null!==d&&1===d.priorityLevel){m=!0;try{do u();while(null!==d&&1===d.priorityLevel)}finally{m=!1,null!==d?p():n=!1;}}}function t(a){m=!0;var b=e;e=a;try{if(a)for(;null!==d;){var c=exports.unstable_now();if(d.expirationTime<=c){do u();while(null!==d&&d.expirationTime<=c)}else break}else if(null!==d){do u();while(null!==d&&!w())}}finally{m=!1,e=b,null!==d?p():n=!1,v();}}
  var x=Date,y="function"===typeof setTimeout?setTimeout:void 0,z="function"===typeof clearTimeout?clearTimeout:void 0,A="function"===typeof requestAnimationFrame?requestAnimationFrame:void 0,B="function"===typeof cancelAnimationFrame?cancelAnimationFrame:void 0,C,D;function E(a){C=A(function(b){z(D);a(b);});D=y(function(){B(C);a(exports.unstable_now());},100);}
  if("object"===typeof performance&&"function"===typeof performance.now){var F=performance;exports.unstable_now=function(){return F.now()};}else exports.unstable_now=function(){return x.now()};var r,q,w,G=null;"undefined"!==typeof window?G=window:"undefined"!==typeof commonjsGlobal&&(G=commonjsGlobal);
  if(G&&G._schedMock){var H=G._schedMock;r=H[0];q=H[1];w=H[2];exports.unstable_now=H[3];}else if("undefined"===typeof window||"function"!==typeof MessageChannel){var I=null,J=function(a){if(null!==I)try{I(a);}finally{I=null;}};r=function(a){null!==I?setTimeout(r,0,a):(I=a,setTimeout(J,0,!1));};q=function(){I=null;};w=function(){return !1};}else {"undefined"!==typeof console&&("function"!==typeof A&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"),
  "function"!==typeof B&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"));var K=null,L=!1,M=-1,N=!1,O=!1,P=0,R=33,S=33;w=function(){return P<=exports.unstable_now()};var T=new MessageChannel,U=T.port2;T.port1.onmessage=function(){L=!1;var a=K,b=M;K=null;M=-1;var c=exports.unstable_now(),f=!1;if(0>=P-c)if(-1!==b&&b<=c)f=!0;else {N||(N=!0,E(V));K=a;M=b;return}if(null!==a){O=!0;try{a(f);}finally{O=!1;}}};
  var V=function(a){if(null!==K){E(V);var b=a-P+S;b<S&&R<S?(8>b&&(b=8),S=b<R?R:b):R=b;P=a+S;L||(L=!0,U.postMessage(void 0));}else N=!1;};r=function(a,b){K=a;M=b;O||0>b?U.postMessage(void 0):N||(N=!0,E(V));};q=function(){K=null;L=!1;M=-1;};}exports.unstable_ImmediatePriority=1;exports.unstable_UserBlockingPriority=2;exports.unstable_NormalPriority=3;exports.unstable_IdlePriority=5;exports.unstable_LowPriority=4;
  exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3;}var c=g,f=k;g=a;k=exports.unstable_now();try{return b()}finally{g=c,k=f,v();}};exports.unstable_next=function(a){switch(g){case 1:case 2:case 3:var b=3;break;default:b=g;}var c=g,f=k;g=b;k=exports.unstable_now();try{return a()}finally{g=c,k=f,v();}};
  exports.unstable_scheduleCallback=function(a,b){var c=-1!==k?k:exports.unstable_now();if("object"===typeof b&&null!==b&&"number"===typeof b.timeout)b=c+b.timeout;else switch(g){case 1:b=c+-1;break;case 2:b=c+250;break;case 5:b=c+1073741823;break;case 4:b=c+1E4;break;default:b=c+5E3;}a={callback:a,priorityLevel:g,expirationTime:b,next:null,previous:null};if(null===d)d=a.next=a.previous=a,p();else {c=null;var f=d;do{if(f.expirationTime>b){c=f;break}f=f.next;}while(f!==d);null===c?c=d:c===d&&(d=a,p());
  b=c.previous;b.next=c.previous=a;a.next=c;a.previous=b;}return a};exports.unstable_cancelCallback=function(a){var b=a.next;if(null!==b){if(b===a)d=null;else {a===d&&(d=b);var c=a.previous;c.next=b;b.previous=c;}a.next=a.previous=null;}};exports.unstable_wrapCallback=function(a){var b=g;return function(){var c=g,f=k;g=b;k=exports.unstable_now();try{return a.apply(this,arguments)}finally{g=c,k=f,v();}}};exports.unstable_getCurrentPriorityLevel=function(){return g};
  exports.unstable_shouldYield=function(){return !e&&(null!==d&&d.expirationTime<l||w())};exports.unstable_continueExecution=function(){null!==d&&p();};exports.unstable_pauseExecution=function(){};exports.unstable_getFirstCallbackNode=function(){return d};
  });

  unwrapExports(scheduler_production_min);
  scheduler_production_min.unstable_now;
  scheduler_production_min.unstable_ImmediatePriority;
  scheduler_production_min.unstable_UserBlockingPriority;
  scheduler_production_min.unstable_NormalPriority;
  scheduler_production_min.unstable_IdlePriority;
  scheduler_production_min.unstable_LowPriority;
  scheduler_production_min.unstable_runWithPriority;
  scheduler_production_min.unstable_next;
  scheduler_production_min.unstable_scheduleCallback;
  scheduler_production_min.unstable_cancelCallback;
  scheduler_production_min.unstable_wrapCallback;
  scheduler_production_min.unstable_getCurrentPriorityLevel;
  scheduler_production_min.unstable_shouldYield;
  scheduler_production_min.unstable_continueExecution;
  scheduler_production_min.unstable_pauseExecution;
  scheduler_production_min.unstable_getFirstCallbackNode;

  var scheduler = createCommonjsModule(function (module) {

  {
    module.exports = scheduler_production_min;
  }
  });

  function ba(a,b,c,d,e,f,g,h){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else {var l=[c,d,e,f,g,h],k=0;a=Error(b.replace(/%s/g,function(){return l[k++]}));a.name="Invariant Violation";}a.framesToPop=1;throw a;}}
  function x(a){for(var b=arguments.length-1,c="https://reactjs.org/docs/error-decoder.html?invariant="+a,d=0;d<b;d++)c+="&args[]="+encodeURIComponent(arguments[d+1]);ba(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",c);}react?void 0:x("227");function ca(a,b,c,d,e,f,g,h,l){var k=Array.prototype.slice.call(arguments,3);try{b.apply(c,k);}catch(m){this.onError(m);}}
  var da=!1,ea=null,fa=!1,ha=null,ia={onError:function(a){da=!0;ea=a;}};function ja(a,b,c,d,e,f,g,h,l){da=!1;ea=null;ca.apply(ia,arguments);}function ka(a,b,c,d,e,f,g,h,l){ja.apply(this,arguments);if(da){if(da){var k=ea;da=!1;ea=null;}else x("198"),k=void 0;fa||(fa=!0,ha=k);}}var la=null,ma={};
  function na(){if(la)for(var a in ma){var b=ma[a],c=la.indexOf(a);-1<c?void 0:x("96",a);if(!oa[c]){b.extractEvents?void 0:x("97",a);oa[c]=b;c=b.eventTypes;for(var d in c){var e=void 0;var f=c[d],g=b,h=d;pa.hasOwnProperty(h)?x("99",h):void 0;pa[h]=f;var l=f.phasedRegistrationNames;if(l){for(e in l)l.hasOwnProperty(e)&&qa(l[e],g,h);e=!0;}else f.registrationName?(qa(f.registrationName,g,h),e=!0):e=!1;e?void 0:x("98",d,a);}}}}
  function qa(a,b,c){ra[a]?x("100",a):void 0;ra[a]=b;sa[a]=b.eventTypes[c].dependencies;}var oa=[],pa={},ra={},sa={},ta=null,ua=null,va=null;function wa(a,b,c){var d=a.type||"unknown-event";a.currentTarget=va(c);ka(d,b,void 0,a);a.currentTarget=null;}function xa(a,b){null==b?x("30"):void 0;if(null==a)return b;if(Array.isArray(a)){if(Array.isArray(b))return a.push.apply(a,b),a;a.push(b);return a}return Array.isArray(b)?[a].concat(b):[a,b]}
  function ya(a,b,c){Array.isArray(a)?a.forEach(b,c):a&&b.call(c,a);}var za=null;function Aa(a){if(a){var b=a._dispatchListeners,c=a._dispatchInstances;if(Array.isArray(b))for(var d=0;d<b.length&&!a.isPropagationStopped();d++)wa(a,b[d],c[d]);else b&&wa(a,b,c);a._dispatchListeners=null;a._dispatchInstances=null;a.isPersistent()||a.constructor.release(a);}}
  var Ba={injectEventPluginOrder:function(a){la?x("101"):void 0;la=Array.prototype.slice.call(a);na();},injectEventPluginsByName:function(a){var b=!1,c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];ma.hasOwnProperty(c)&&ma[c]===d||(ma[c]?x("102",c):void 0,ma[c]=d,b=!0);}b&&na();}};
  function Ca(a,b){var c=a.stateNode;if(!c)return null;var d=ta(c);if(!d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1;}if(a)return null;c&&"function"!==typeof c?x("231",b,typeof c):void 0;
  return c}function Da(a){null!==a&&(za=xa(za,a));a=za;za=null;if(a&&(ya(a,Aa),za?x("95"):void 0,fa))throw a=ha,fa=!1,ha=null,a;}var Ea=Math.random().toString(36).slice(2),Fa="__reactInternalInstance$"+Ea,Ga="__reactEventHandlers$"+Ea;function Ha(a){if(a[Fa])return a[Fa];for(;!a[Fa];)if(a.parentNode)a=a.parentNode;else return null;a=a[Fa];return 5===a.tag||6===a.tag?a:null}function Ia(a){a=a[Fa];return !a||5!==a.tag&&6!==a.tag?null:a}
  function Ja(a){if(5===a.tag||6===a.tag)return a.stateNode;x("33");}function Ka(a){return a[Ga]||null}function La(a){do a=a.return;while(a&&5!==a.tag);return a?a:null}function Ma(a,b,c){if(b=Ca(a,c.dispatchConfig.phasedRegistrationNames[b]))c._dispatchListeners=xa(c._dispatchListeners,b),c._dispatchInstances=xa(c._dispatchInstances,a);}
  function Na(a){if(a&&a.dispatchConfig.phasedRegistrationNames){for(var b=a._targetInst,c=[];b;)c.push(b),b=La(b);for(b=c.length;0<b--;)Ma(c[b],"captured",a);for(b=0;b<c.length;b++)Ma(c[b],"bubbled",a);}}function Oa(a,b,c){a&&c&&c.dispatchConfig.registrationName&&(b=Ca(a,c.dispatchConfig.registrationName))&&(c._dispatchListeners=xa(c._dispatchListeners,b),c._dispatchInstances=xa(c._dispatchInstances,a));}function Pa(a){a&&a.dispatchConfig.registrationName&&Oa(a._targetInst,null,a);}
  function Qa(a){ya(a,Na);}var Ra=!("undefined"===typeof window||!window.document||!window.document.createElement);function Sa(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var Ta={animationend:Sa("Animation","AnimationEnd"),animationiteration:Sa("Animation","AnimationIteration"),animationstart:Sa("Animation","AnimationStart"),transitionend:Sa("Transition","TransitionEnd")},Ua={},Va={};
  Ra&&(Va=document.createElement("div").style,"AnimationEvent"in window||(delete Ta.animationend.animation,delete Ta.animationiteration.animation,delete Ta.animationstart.animation),"TransitionEvent"in window||delete Ta.transitionend.transition);function Wa(a){if(Ua[a])return Ua[a];if(!Ta[a])return a;var b=Ta[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Va)return Ua[a]=b[c];return a}
  var Xa=Wa("animationend"),Ya=Wa("animationiteration"),Za=Wa("animationstart"),$a=Wa("transitionend"),ab="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),bb=null,cb=null,db=null;
  function eb(){if(db)return db;var a,b=cb,c=b.length,d,e="value"in bb?bb.value:bb.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return db=e.slice(a,1<d?1-d:void 0)}function fb(){return !0}function gb(){return !1}
  function y(a,b,c,d){this.dispatchConfig=a;this._targetInst=b;this.nativeEvent=c;a=this.constructor.Interface;for(var e in a)a.hasOwnProperty(e)&&((b=a[e])?this[e]=b(c):"target"===e?this.target=d:this[e]=c[e]);this.isDefaultPrevented=(null!=c.defaultPrevented?c.defaultPrevented:!1===c.returnValue)?fb:gb;this.isPropagationStopped=gb;return this}
  objectAssign(y.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&(a.returnValue=!1),this.isDefaultPrevented=fb);},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=fb);},persist:function(){this.isPersistent=fb;},isPersistent:gb,destructor:function(){var a=this.constructor.Interface,
  b;for(b in a)this[b]=null;this.nativeEvent=this._targetInst=this.dispatchConfig=null;this.isPropagationStopped=this.isDefaultPrevented=gb;this._dispatchInstances=this._dispatchListeners=null;}});y.Interface={type:null,target:null,currentTarget:function(){return null},eventPhase:null,bubbles:null,cancelable:null,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:null,isTrusted:null};
  y.extend=function(a){function b(){}function c(){return d.apply(this,arguments)}var d=this;b.prototype=d.prototype;var e=new b;objectAssign(e,c.prototype);c.prototype=e;c.prototype.constructor=c;c.Interface=objectAssign({},d.Interface,a);c.extend=d.extend;hb(c);return c};hb(y);function ib(a,b,c,d){if(this.eventPool.length){var e=this.eventPool.pop();this.call(e,a,b,c,d);return e}return new this(a,b,c,d)}function jb(a){a instanceof this?void 0:x("279");a.destructor();10>this.eventPool.length&&this.eventPool.push(a);}
  function hb(a){a.eventPool=[];a.getPooled=ib;a.release=jb;}var kb=y.extend({data:null}),lb=y.extend({data:null}),mb=[9,13,27,32],nb=Ra&&"CompositionEvent"in window,ob=null;Ra&&"documentMode"in document&&(ob=document.documentMode);
  var pb=Ra&&"TextEvent"in window&&!ob,qb=Ra&&(!nb||ob&&8<ob&&11>=ob),rb=String.fromCharCode(32),sb={beforeInput:{phasedRegistrationNames:{bubbled:"onBeforeInput",captured:"onBeforeInputCapture"},dependencies:["compositionend","keypress","textInput","paste"]},compositionEnd:{phasedRegistrationNames:{bubbled:"onCompositionEnd",captured:"onCompositionEndCapture"},dependencies:"blur compositionend keydown keypress keyup mousedown".split(" ")},compositionStart:{phasedRegistrationNames:{bubbled:"onCompositionStart",
  captured:"onCompositionStartCapture"},dependencies:"blur compositionstart keydown keypress keyup mousedown".split(" ")},compositionUpdate:{phasedRegistrationNames:{bubbled:"onCompositionUpdate",captured:"onCompositionUpdateCapture"},dependencies:"blur compositionupdate keydown keypress keyup mousedown".split(" ")}},tb=!1;
  function ub(a,b){switch(a){case "keyup":return -1!==mb.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "blur":return !0;default:return !1}}function vb(a){a=a.detail;return "object"===typeof a&&"data"in a?a.data:null}var wb=!1;function xb(a,b){switch(a){case "compositionend":return vb(b);case "keypress":if(32!==b.which)return null;tb=!0;return rb;case "textInput":return a=b.data,a===rb&&tb?null:a;default:return null}}
  function yb(a,b){if(wb)return "compositionend"===a||!nb&&ub(a,b)?(a=eb(),db=cb=bb=null,wb=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return qb&&"ko"!==b.locale?null:b.data;default:return null}}
  var zb={eventTypes:sb,extractEvents:function(a,b,c,d){var e=void 0;var f=void 0;if(nb)b:{switch(a){case "compositionstart":e=sb.compositionStart;break b;case "compositionend":e=sb.compositionEnd;break b;case "compositionupdate":e=sb.compositionUpdate;break b}e=void 0;}else wb?ub(a,c)&&(e=sb.compositionEnd):"keydown"===a&&229===c.keyCode&&(e=sb.compositionStart);e?(qb&&"ko"!==c.locale&&(wb||e!==sb.compositionStart?e===sb.compositionEnd&&wb&&(f=eb()):(bb=d,cb="value"in bb?bb.value:bb.textContent,wb=
  !0)),e=kb.getPooled(e,b,c,d),f?e.data=f:(f=vb(c),null!==f&&(e.data=f)),Qa(e),f=e):f=null;(a=pb?xb(a,c):yb(a,c))?(b=lb.getPooled(sb.beforeInput,b,c,d),b.data=a,Qa(b)):b=null;return null===f?b:null===b?f:[f,b]}},Ab=null,Bb=null,Cb=null;function Db(a){if(a=ua(a)){"function"!==typeof Ab?x("280"):void 0;var b=ta(a.stateNode);Ab(a.stateNode,a.type,b);}}function Eb(a){Bb?Cb?Cb.push(a):Cb=[a]:Bb=a;}function Fb(){if(Bb){var a=Bb,b=Cb;Cb=Bb=null;Db(a);if(b)for(a=0;a<b.length;a++)Db(b[a]);}}
  function Gb(a,b){return a(b)}function Hb(a,b,c){return a(b,c)}function Ib(){}var Jb=!1;function Kb(a,b){if(Jb)return a(b);Jb=!0;try{return Gb(a,b)}finally{if(Jb=!1,null!==Bb||null!==Cb)Ib(),Fb();}}var Lb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Mb(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return "input"===b?!!Lb[a.type]:"textarea"===b?!0:!1}
  function Nb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}function Ob(a){if(!Ra)return !1;a="on"+a;var b=a in document;b||(b=document.createElement("div"),b.setAttribute(a,"return;"),b="function"===typeof b[a]);return b}function Pb(a){var b=a.type;return (a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
  function Qb(a){var b=Pb(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a);}});Object.defineProperty(a,b,{enumerable:c.enumerable});return {getValue:function(){return d},setValue:function(a){d=""+a;},stopTracking:function(){a._valueTracker=
  null;delete a[b];}}}}function Rb(a){a._valueTracker||(a._valueTracker=Qb(a));}function Sb(a){if(!a)return !1;var b=a._valueTracker;if(!b)return !0;var c=b.getValue();var d="";a&&(d=Pb(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}var Tb=react.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;Tb.hasOwnProperty("ReactCurrentDispatcher")||(Tb.ReactCurrentDispatcher={current:null});
  var Ub=/^(.*)[\\\/]/,z="function"===typeof Symbol&&Symbol.for,Vb=z?Symbol.for("react.element"):60103,Wb=z?Symbol.for("react.portal"):60106,Xb=z?Symbol.for("react.fragment"):60107,Yb=z?Symbol.for("react.strict_mode"):60108,Zb=z?Symbol.for("react.profiler"):60114,$b=z?Symbol.for("react.provider"):60109,ac=z?Symbol.for("react.context"):60110,bc=z?Symbol.for("react.concurrent_mode"):60111,cc=z?Symbol.for("react.forward_ref"):60112,dc=z?Symbol.for("react.suspense"):60113,ec=z?Symbol.for("react.memo"):
  60115,fc=z?Symbol.for("react.lazy"):60116,gc="function"===typeof Symbol&&Symbol.iterator;function hc(a){if(null===a||"object"!==typeof a)return null;a=gc&&a[gc]||a["@@iterator"];return "function"===typeof a?a:null}
  function ic(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case bc:return "ConcurrentMode";case Xb:return "Fragment";case Wb:return "Portal";case Zb:return "Profiler";case Yb:return "StrictMode";case dc:return "Suspense"}if("object"===typeof a)switch(a.$$typeof){case ac:return "Context.Consumer";case $b:return "Context.Provider";case cc:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+
  ")":"ForwardRef");case ec:return ic(a.type);case fc:if(a=1===a._status?a._result:null)return ic(a)}return null}function jc(a){var b="";do{a:switch(a.tag){case 3:case 4:case 6:case 7:case 10:case 9:var c="";break a;default:var d=a._debugOwner,e=a._debugSource,f=ic(a.type);c=null;d&&(c=ic(d.type));d=f;f="";e?f=" (at "+e.fileName.replace(Ub,"")+":"+e.lineNumber+")":c&&(f=" (created by "+c+")");c="\n    in "+(d||"Unknown")+f;}b+=c;a=a.return;}while(a);return b}
  var kc=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,lc=Object.prototype.hasOwnProperty,mc={},nc={};
  function oc(a){if(lc.call(nc,a))return !0;if(lc.call(mc,a))return !1;if(kc.test(a))return nc[a]=!0;mc[a]=!0;return !1}function pc(a,b,c,d){if(null!==c&&0===c.type)return !1;switch(typeof b){case "function":case "symbol":return !0;case "boolean":if(d)return !1;if(null!==c)return !c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return "data-"!==a&&"aria-"!==a;default:return !1}}
  function qc(a,b,c,d){if(null===b||"undefined"===typeof b||pc(a,b,c,d))return !0;if(d)return !1;if(null!==c)switch(c.type){case 3:return !b;case 4:return !1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return !1}function C(a,b,c,d,e){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;}var D={};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){D[a]=new C(a,0,!1,a,null);});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];D[b]=new C(b,1,!1,a[1],null);});["contentEditable","draggable","spellCheck","value"].forEach(function(a){D[a]=new C(a,2,!1,a.toLowerCase(),null);});
  ["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){D[a]=new C(a,2,!1,a,null);});"allowFullScreen async autoFocus autoPlay controls default defer disabled formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){D[a]=new C(a,3,!1,a.toLowerCase(),null);});["checked","multiple","muted","selected"].forEach(function(a){D[a]=new C(a,3,!0,a,null);});
  ["capture","download"].forEach(function(a){D[a]=new C(a,4,!1,a,null);});["cols","rows","size","span"].forEach(function(a){D[a]=new C(a,6,!1,a,null);});["rowSpan","start"].forEach(function(a){D[a]=new C(a,5,!1,a.toLowerCase(),null);});var rc=/[\-:]([a-z])/g;function sc(a){return a[1].toUpperCase()}
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(rc,
  sc);D[b]=new C(b,1,!1,a,null);});"xlink:actuate xlink:arcrole xlink:href xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(rc,sc);D[b]=new C(b,1,!1,a,"http://www.w3.org/1999/xlink");});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(rc,sc);D[b]=new C(b,1,!1,a,"http://www.w3.org/XML/1998/namespace");});["tabIndex","crossOrigin"].forEach(function(a){D[a]=new C(a,1,!1,a.toLowerCase(),null);});
  function tc(a,b,c,d){var e=D.hasOwnProperty(b)?D[b]:null;var f=null!==e?0===e.type:d?!1:!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1]?!1:!0;f||(qc(b,c,e,d)&&(c=null),d||null===e?oc(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c))));}
  function uc(a){switch(typeof a){case "boolean":case "number":case "object":case "string":case "undefined":return a;default:return ""}}function vc(a,b){var c=b.checked;return objectAssign({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}
  function wc(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=uc(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value};}function xc(a,b){b=b.checked;null!=b&&tc(a,"checked",b,!1);}
  function yc(a,b){xc(a,b);var c=uc(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c;}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?zc(a,b.type,c):b.hasOwnProperty("defaultValue")&&zc(a,b.type,uc(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked);}
  function Ac(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b;}c=a.name;""!==c&&(a.name="");a.defaultChecked=!a.defaultChecked;a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c);}
  function zc(a,b,c){if("number"!==b||a.ownerDocument.activeElement!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c);}var Bc={change:{phasedRegistrationNames:{bubbled:"onChange",captured:"onChangeCapture"},dependencies:"blur change click focus input keydown keyup selectionchange".split(" ")}};function Cc(a,b,c){a=y.getPooled(Bc.change,a,b,c);a.type="change";Eb(c);Qa(a);return a}var Dc=null,Ec=null;function Fc(a){Da(a);}
  function Gc(a){var b=Ja(a);if(Sb(b))return a}function Hc(a,b){if("change"===a)return b}var Ic=!1;Ra&&(Ic=Ob("input")&&(!document.documentMode||9<document.documentMode));function Jc(){Dc&&(Dc.detachEvent("onpropertychange",Kc),Ec=Dc=null);}function Kc(a){"value"===a.propertyName&&Gc(Ec)&&(a=Cc(Ec,a,Nb(a)),Kb(Fc,a));}function Lc(a,b,c){"focus"===a?(Jc(),Dc=b,Ec=c,Dc.attachEvent("onpropertychange",Kc)):"blur"===a&&Jc();}function Mc(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return Gc(Ec)}
  function Nc(a,b){if("click"===a)return Gc(b)}function Oc(a,b){if("input"===a||"change"===a)return Gc(b)}
  var Pc={eventTypes:Bc,_isInputEventSupported:Ic,extractEvents:function(a,b,c,d){var e=b?Ja(b):window,f=void 0,g=void 0,h=e.nodeName&&e.nodeName.toLowerCase();"select"===h||"input"===h&&"file"===e.type?f=Hc:Mb(e)?Ic?f=Oc:(f=Mc,g=Lc):(h=e.nodeName)&&"input"===h.toLowerCase()&&("checkbox"===e.type||"radio"===e.type)&&(f=Nc);if(f&&(f=f(a,b)))return Cc(f,c,d);g&&g(a,e,b);"blur"===a&&(a=e._wrapperState)&&a.controlled&&"number"===e.type&&zc(e,"number",e.value);}},Qc=y.extend({view:null,detail:null}),Rc={Alt:"altKey",
  Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Sc(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Rc[a])?!!b[a]:!1}function Tc(){return Sc}
  var Uc=0,Vc=0,Wc=!1,Xc=!1,Yc=Qc.extend({screenX:null,screenY:null,clientX:null,clientY:null,pageX:null,pageY:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,getModifierState:Tc,button:null,buttons:null,relatedTarget:function(a){return a.relatedTarget||(a.fromElement===a.srcElement?a.toElement:a.fromElement)},movementX:function(a){if("movementX"in a)return a.movementX;var b=Uc;Uc=a.screenX;return Wc?"mousemove"===a.type?a.screenX-b:0:(Wc=!0,0)},movementY:function(a){if("movementY"in a)return a.movementY;
  var b=Vc;Vc=a.screenY;return Xc?"mousemove"===a.type?a.screenY-b:0:(Xc=!0,0)}}),Zc=Yc.extend({pointerId:null,width:null,height:null,pressure:null,tangentialPressure:null,tiltX:null,tiltY:null,twist:null,pointerType:null,isPrimary:null}),$c={mouseEnter:{registrationName:"onMouseEnter",dependencies:["mouseout","mouseover"]},mouseLeave:{registrationName:"onMouseLeave",dependencies:["mouseout","mouseover"]},pointerEnter:{registrationName:"onPointerEnter",dependencies:["pointerout","pointerover"]},pointerLeave:{registrationName:"onPointerLeave",
  dependencies:["pointerout","pointerover"]}},ad={eventTypes:$c,extractEvents:function(a,b,c,d){var e="mouseover"===a||"pointerover"===a,f="mouseout"===a||"pointerout"===a;if(e&&(c.relatedTarget||c.fromElement)||!f&&!e)return null;e=d.window===d?d:(e=d.ownerDocument)?e.defaultView||e.parentWindow:window;f?(f=b,b=(b=c.relatedTarget||c.toElement)?Ha(b):null):f=null;if(f===b)return null;var g=void 0,h=void 0,l=void 0,k=void 0;if("mouseout"===a||"mouseover"===a)g=Yc,h=$c.mouseLeave,l=$c.mouseEnter,k="mouse";
  else if("pointerout"===a||"pointerover"===a)g=Zc,h=$c.pointerLeave,l=$c.pointerEnter,k="pointer";var m=null==f?e:Ja(f);e=null==b?e:Ja(b);a=g.getPooled(h,f,c,d);a.type=k+"leave";a.target=m;a.relatedTarget=e;c=g.getPooled(l,b,c,d);c.type=k+"enter";c.target=e;c.relatedTarget=m;d=b;if(f&&d)a:{b=f;e=d;k=0;for(g=b;g;g=La(g))k++;g=0;for(l=e;l;l=La(l))g++;for(;0<k-g;)b=La(b),k--;for(;0<g-k;)e=La(e),g--;for(;k--;){if(b===e||b===e.alternate)break a;b=La(b);e=La(e);}b=null;}else b=null;e=b;for(b=[];f&&f!==e;){k=
  f.alternate;if(null!==k&&k===e)break;b.push(f);f=La(f);}for(f=[];d&&d!==e;){k=d.alternate;if(null!==k&&k===e)break;f.push(d);d=La(d);}for(d=0;d<b.length;d++)Oa(b[d],"bubbled",a);for(d=f.length;0<d--;)Oa(f[d],"captured",c);return [a,c]}};function bd(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var cd=Object.prototype.hasOwnProperty;
  function dd(a,b){if(bd(a,b))return !0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return !1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return !1;for(d=0;d<c.length;d++)if(!cd.call(b,c[d])||!bd(a[c[d]],b[c[d]]))return !1;return !0}function ed(a){var b=a;if(a.alternate)for(;b.return;)b=b.return;else {if(0!==(b.effectTag&2))return 1;for(;b.return;)if(b=b.return,0!==(b.effectTag&2))return 1}return 3===b.tag?2:3}function fd(a){2!==ed(a)?x("188"):void 0;}
  function gd(a){var b=a.alternate;if(!b)return b=ed(a),3===b?x("188"):void 0,1===b?null:a;for(var c=a,d=b;;){var e=c.return,f=e?e.alternate:null;if(!e||!f)break;if(e.child===f.child){for(var g=e.child;g;){if(g===c)return fd(e),a;if(g===d)return fd(e),b;g=g.sibling;}x("188");}if(c.return!==d.return)c=e,d=f;else {g=!1;for(var h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling;}if(!g){for(h=f.child;h;){if(h===c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling;}g?
  void 0:x("189");}}c.alternate!==d?x("190"):void 0;}3!==c.tag?x("188"):void 0;return c.stateNode.current===c?a:b}function hd(a){a=gd(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else {if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return;}b.sibling.return=b.return;b=b.sibling;}}return null}
  var id=y.extend({animationName:null,elapsedTime:null,pseudoElement:null}),jd=y.extend({clipboardData:function(a){return "clipboardData"in a?a.clipboardData:window.clipboardData}}),kd=Qc.extend({relatedTarget:null});function ld(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}
  var md={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",
  116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},od=Qc.extend({key:function(a){if(a.key){var b=md[a.key]||a.key;if("Unidentified"!==b)return b}return "keypress"===a.type?(a=ld(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?nd[a.keyCode]||"Unidentified":""},location:null,ctrlKey:null,shiftKey:null,altKey:null,metaKey:null,repeat:null,locale:null,getModifierState:Tc,charCode:function(a){return "keypress"===
  a.type?ld(a):0},keyCode:function(a){return "keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return "keypress"===a.type?ld(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),pd=Yc.extend({dataTransfer:null}),qd=Qc.extend({touches:null,targetTouches:null,changedTouches:null,altKey:null,metaKey:null,ctrlKey:null,shiftKey:null,getModifierState:Tc}),rd=y.extend({propertyName:null,elapsedTime:null,pseudoElement:null}),sd=Yc.extend({deltaX:function(a){return "deltaX"in a?a.deltaX:"wheelDeltaX"in
  a?-a.wheelDeltaX:0},deltaY:function(a){return "deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:null,deltaMode:null}),td=[["abort","abort"],[Xa,"animationEnd"],[Ya,"animationIteration"],[Za,"animationStart"],["canplay","canPlay"],["canplaythrough","canPlayThrough"],["drag","drag"],["dragenter","dragEnter"],["dragexit","dragExit"],["dragleave","dragLeave"],["dragover","dragOver"],["durationchange","durationChange"],["emptied","emptied"],["encrypted","encrypted"],
  ["ended","ended"],["error","error"],["gotpointercapture","gotPointerCapture"],["load","load"],["loadeddata","loadedData"],["loadedmetadata","loadedMetadata"],["loadstart","loadStart"],["lostpointercapture","lostPointerCapture"],["mousemove","mouseMove"],["mouseout","mouseOut"],["mouseover","mouseOver"],["playing","playing"],["pointermove","pointerMove"],["pointerout","pointerOut"],["pointerover","pointerOver"],["progress","progress"],["scroll","scroll"],["seeking","seeking"],["stalled","stalled"],
  ["suspend","suspend"],["timeupdate","timeUpdate"],["toggle","toggle"],["touchmove","touchMove"],[$a,"transitionEnd"],["waiting","waiting"],["wheel","wheel"]],ud={},vd={};function wd(a,b){var c=a[0];a=a[1];var d="on"+(a[0].toUpperCase()+a.slice(1));b={phasedRegistrationNames:{bubbled:d,captured:d+"Capture"},dependencies:[c],isInteractive:b};ud[a]=b;vd[c]=b;}
  [["blur","blur"],["cancel","cancel"],["click","click"],["close","close"],["contextmenu","contextMenu"],["copy","copy"],["cut","cut"],["auxclick","auxClick"],["dblclick","doubleClick"],["dragend","dragEnd"],["dragstart","dragStart"],["drop","drop"],["focus","focus"],["input","input"],["invalid","invalid"],["keydown","keyDown"],["keypress","keyPress"],["keyup","keyUp"],["mousedown","mouseDown"],["mouseup","mouseUp"],["paste","paste"],["pause","pause"],["play","play"],["pointercancel","pointerCancel"],
  ["pointerdown","pointerDown"],["pointerup","pointerUp"],["ratechange","rateChange"],["reset","reset"],["seeked","seeked"],["submit","submit"],["touchcancel","touchCancel"],["touchend","touchEnd"],["touchstart","touchStart"],["volumechange","volumeChange"]].forEach(function(a){wd(a,!0);});td.forEach(function(a){wd(a,!1);});
  var xd={eventTypes:ud,isInteractiveTopLevelEventType:function(a){a=vd[a];return void 0!==a&&!0===a.isInteractive},extractEvents:function(a,b,c,d){var e=vd[a];if(!e)return null;switch(a){case "keypress":if(0===ld(c))return null;case "keydown":case "keyup":a=od;break;case "blur":case "focus":a=kd;break;case "click":if(2===c.button)return null;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":a=Yc;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":a=
  pd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":a=qd;break;case Xa:case Ya:case Za:a=id;break;case $a:a=rd;break;case "scroll":a=Qc;break;case "wheel":a=sd;break;case "copy":case "cut":case "paste":a=jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":a=Zc;break;default:a=y;}b=a.getPooled(e,b,c,d);Qa(b);return b}},yd=xd.isInteractiveTopLevelEventType,
  zd=[];function Ad(a){var b=a.targetInst,c=b;do{if(!c){a.ancestors.push(c);break}var d;for(d=c;d.return;)d=d.return;d=3!==d.tag?null:d.stateNode.containerInfo;if(!d)break;a.ancestors.push(c);c=Ha(d);}while(c);for(c=0;c<a.ancestors.length;c++){b=a.ancestors[c];var e=Nb(a.nativeEvent);d=a.topLevelType;for(var f=a.nativeEvent,g=null,h=0;h<oa.length;h++){var l=oa[h];l&&(l=l.extractEvents(d,b,f,e))&&(g=xa(g,l));}Da(g);}}var Bd=!0;
  function E(a,b){if(!b)return null;var c=(yd(a)?Cd:Dd).bind(null,a);b.addEventListener(a,c,!1);}function Ed(a,b){if(!b)return null;var c=(yd(a)?Cd:Dd).bind(null,a);b.addEventListener(a,c,!0);}function Cd(a,b){Hb(Dd,a,b);}
  function Dd(a,b){if(Bd){var c=Nb(b);c=Ha(c);null===c||"number"!==typeof c.tag||2===ed(c)||(c=null);if(zd.length){var d=zd.pop();d.topLevelType=a;d.nativeEvent=b;d.targetInst=c;a=d;}else a={topLevelType:a,nativeEvent:b,targetInst:c,ancestors:[]};try{Kb(Ad,a);}finally{a.topLevelType=null,a.nativeEvent=null,a.targetInst=null,a.ancestors.length=0,10>zd.length&&zd.push(a);}}}var Fd={},Gd=0,Hd="_reactListenersID"+(""+Math.random()).slice(2);
  function Id(a){Object.prototype.hasOwnProperty.call(a,Hd)||(a[Hd]=Gd++,Fd[a[Hd]]={});return Fd[a[Hd]]}function Jd(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}function Kd(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
  function Ld(a,b){var c=Kd(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return {node:c,offset:b-a};a=d;}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode;}c=void 0;}c=Kd(c);}}function Md(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Md(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
  function Nd(){for(var a=window,b=Jd();b instanceof a.HTMLIFrameElement;){try{a=b.contentDocument.defaultView;}catch(c){break}b=Jd(a.document);}return b}function Od(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
  function Pd(){var a=Nd();if(Od(a)){if("selectionStart"in a)var b={start:a.selectionStart,end:a.selectionEnd};else a:{b=(b=a.ownerDocument)&&b.defaultView||window;var c=b.getSelection&&b.getSelection();if(c&&0!==c.rangeCount){b=c.anchorNode;var d=c.anchorOffset,e=c.focusNode;c=c.focusOffset;try{b.nodeType,e.nodeType;}catch(A){b=null;break a}var f=0,g=-1,h=-1,l=0,k=0,m=a,p=null;b:for(;;){for(var t;;){m!==b||0!==d&&3!==m.nodeType||(g=f+d);m!==e||0!==c&&3!==m.nodeType||(h=f+c);3===m.nodeType&&(f+=m.nodeValue.length);
  if(null===(t=m.firstChild))break;p=m;m=t;}for(;;){if(m===a)break b;p===b&&++l===d&&(g=f);p===e&&++k===c&&(h=f);if(null!==(t=m.nextSibling))break;m=p;p=m.parentNode;}m=t;}b=-1===g||-1===h?null:{start:g,end:h};}else b=null;}b=b||{start:0,end:0};}else b=null;return {focusedElem:a,selectionRange:b}}
  function Qd(a){var b=Nd(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Md(c.ownerDocument.documentElement,c)){if(null!==d&&Od(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ld(c,f);var g=Ld(c,
  d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)));}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top;}}
  var Rd=Ra&&"documentMode"in document&&11>=document.documentMode,Sd={select:{phasedRegistrationNames:{bubbled:"onSelect",captured:"onSelectCapture"},dependencies:"blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(" ")}},Td=null,Ud=null,Vd=null,Wd=!1;
  function Xd(a,b){var c=b.window===b?b.document:9===b.nodeType?b:b.ownerDocument;if(Wd||null==Td||Td!==Jd(c))return null;c=Td;"selectionStart"in c&&Od(c)?c={start:c.selectionStart,end:c.selectionEnd}:(c=(c.ownerDocument&&c.ownerDocument.defaultView||window).getSelection(),c={anchorNode:c.anchorNode,anchorOffset:c.anchorOffset,focusNode:c.focusNode,focusOffset:c.focusOffset});return Vd&&dd(Vd,c)?null:(Vd=c,a=y.getPooled(Sd.select,Ud,a,b),a.type="select",a.target=Td,Qa(a),a)}
  var Yd={eventTypes:Sd,extractEvents:function(a,b,c,d){var e=d.window===d?d.document:9===d.nodeType?d:d.ownerDocument,f;if(!(f=!e)){a:{e=Id(e);f=sa.onSelect;for(var g=0;g<f.length;g++){var h=f[g];if(!e.hasOwnProperty(h)||!e[h]){e=!1;break a}}e=!0;}f=!e;}if(f)return null;e=b?Ja(b):window;switch(a){case "focus":if(Mb(e)||"true"===e.contentEditable)Td=e,Ud=b,Vd=null;break;case "blur":Vd=Ud=Td=null;break;case "mousedown":Wd=!0;break;case "contextmenu":case "mouseup":case "dragend":return Wd=!1,Xd(c,d);case "selectionchange":if(Rd)break;
  case "keydown":case "keyup":return Xd(c,d)}return null}};Ba.injectEventPluginOrder("ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(" "));ta=Ka;ua=Ia;va=Ja;Ba.injectEventPluginsByName({SimpleEventPlugin:xd,EnterLeaveEventPlugin:ad,ChangeEventPlugin:Pc,SelectEventPlugin:Yd,BeforeInputEventPlugin:zb});function Zd(a){var b="";react.Children.forEach(a,function(a){null!=a&&(b+=a);});return b}
  function $d(a,b){a=objectAssign({children:void 0},b);if(b=Zd(b.children))a.children=b;return a}function ae(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0);}else {c=""+uc(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e]);}null!==b&&(b.selected=!0);}}
  function be(a,b){null!=b.dangerouslySetInnerHTML?x("91"):void 0;return objectAssign({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function ce(a,b){var c=b.value;null==c&&(c=b.defaultValue,b=b.children,null!=b&&(null!=c?x("92"):void 0,Array.isArray(b)&&(1>=b.length?void 0:x("93"),b=b[0]),c=b),null==c&&(c=""));a._wrapperState={initialValue:uc(c)};}
  function de(a,b){var c=uc(b.value),d=uc(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d);}function ee(a){var b=a.textContent;b===a._wrapperState.initialValue&&(a.value=b);}var fe={html:"http://www.w3.org/1999/xhtml",mathml:"http://www.w3.org/1998/Math/MathML",svg:"http://www.w3.org/2000/svg"};
  function ge(a){switch(a){case "svg":return "http://www.w3.org/2000/svg";case "math":return "http://www.w3.org/1998/Math/MathML";default:return "http://www.w3.org/1999/xhtml"}}function he(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?ge(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
  var ie=void 0,je=function(a){return "undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)});}:a}(function(a,b){if(a.namespaceURI!==fe.svg||"innerHTML"in a)a.innerHTML=b;else {ie=ie||document.createElement("div");ie.innerHTML="<svg>"+b+"</svg>";for(b=ie.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild);}});
  function ke(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b;}
  var le={animationIterationCount:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,
  floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},me=["Webkit","ms","Moz","O"];Object.keys(le).forEach(function(a){me.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);le[b]=le[a];});});function ne(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||le.hasOwnProperty(a)&&le[a]?(""+b).trim():b+"px"}
  function oe(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=ne(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e;}}var pe=objectAssign({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
  function qe(a,b){b&&(pe[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML?x("137",a,""):void 0),null!=b.dangerouslySetInnerHTML&&(null!=b.children?x("60"):void 0,"object"===typeof b.dangerouslySetInnerHTML&&"__html"in b.dangerouslySetInnerHTML?void 0:x("61")),null!=b.style&&"object"!==typeof b.style?x("62",""):void 0);}
  function re(a,b){if(-1===a.indexOf("-"))return "string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return !1;default:return !0}}
  function se(a,b){a=9===a.nodeType||11===a.nodeType?a:a.ownerDocument;var c=Id(a);b=sa[b];for(var d=0;d<b.length;d++){var e=b[d];if(!c.hasOwnProperty(e)||!c[e]){switch(e){case "scroll":Ed("scroll",a);break;case "focus":case "blur":Ed("focus",a);Ed("blur",a);c.blur=!0;c.focus=!0;break;case "cancel":case "close":Ob(e)&&Ed(e,a);break;case "invalid":case "submit":case "reset":break;default:-1===ab.indexOf(e)&&E(e,a);}c[e]=!0;}}}function te(){}var ue=null,ve=null;
  function we(a,b){switch(a){case "button":case "input":case "select":case "textarea":return !!b.autoFocus}return !1}function xe(a,b){return "textarea"===a||"option"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
  var ye="function"===typeof setTimeout?setTimeout:void 0,ze="function"===typeof clearTimeout?clearTimeout:void 0,Ae=scheduler.unstable_scheduleCallback,Be=scheduler.unstable_cancelCallback;
  function Ce(a,b,c,d,e){a[Ga]=e;"input"===c&&"radio"===e.type&&null!=e.name&&xc(a,e);re(c,d);d=re(c,e);for(var f=0;f<b.length;f+=2){var g=b[f],h=b[f+1];"style"===g?oe(a,h):"dangerouslySetInnerHTML"===g?je(a,h):"children"===g?ke(a,h):tc(a,g,h,d);}switch(c){case "input":yc(a,e);break;case "textarea":de(a,e);break;case "select":b=a._wrapperState.wasMultiple,a._wrapperState.wasMultiple=!!e.multiple,c=e.value,null!=c?ae(a,!!e.multiple,c,!1):b!==!!e.multiple&&(null!=e.defaultValue?ae(a,!!e.multiple,e.defaultValue,
  !0):ae(a,!!e.multiple,e.multiple?[]:"",!1));}}function De(a){for(a=a.nextSibling;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}function Ee(a){for(a=a.firstChild;a&&1!==a.nodeType&&3!==a.nodeType;)a=a.nextSibling;return a}var Fe=[],Ge=-1;function F(a){0>Ge||(a.current=Fe[Ge],Fe[Ge]=null,Ge--);}function G(a,b){Ge++;Fe[Ge]=a.current;a.current=b;}var He={},H={current:He},I={current:!1},Ie=He;
  function Je(a,b){var c=a.type.contextTypes;if(!c)return He;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function J(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Ke(a){F(I);F(H);}function Le(a){F(I);F(H);}
  function Me(a,b,c){H.current!==He?x("168"):void 0;G(H,b);G(I,c);}function Ne(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)e in a?void 0:x("108",ic(b)||"Unknown",e);return objectAssign({},c,d)}function Oe(a){var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||He;Ie=H.current;G(H,b);G(I,I.current);return !0}
  function Pe(a,b,c){var d=a.stateNode;d?void 0:x("169");c?(b=Ne(a,b,Ie),d.__reactInternalMemoizedMergedChildContext=b,F(I),F(H),G(H,b)):F(I);G(I,c);}var Qe=null,Re=null;function Se(a){return function(b){try{return a(b)}catch(c){}}}
  function Te(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return !1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return !0;try{var c=b.inject(a);Qe=Se(function(a){return b.onCommitFiberRoot(c,a)});Re=Se(function(a){return b.onCommitFiberUnmount(c,a)});}catch(d){}return !0}
  function Ue(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.contextDependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childExpirationTime=this.expirationTime=0;this.alternate=null;}function K(a,b,c,d){return new Ue(a,b,c,d)}
  function Ve(a){a=a.prototype;return !(!a||!a.isReactComponent)}function We(a){if("function"===typeof a)return Ve(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===cc)return 11;if(a===ec)return 14}return 2}
  function Xe(a,b){var c=a.alternate;null===c?(c=K(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.effectTag=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childExpirationTime=a.childExpirationTime;c.expirationTime=a.expirationTime;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;c.contextDependencies=a.contextDependencies;c.sibling=a.sibling;
  c.index=a.index;c.ref=a.ref;return c}
  function Ye(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)Ve(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case Xb:return Ze(c.children,e,f,b);case bc:return $e(c,e|3,f,b);case Yb:return $e(c,e|2,f,b);case Zb:return a=K(12,c,b,e|4),a.elementType=Zb,a.type=Zb,a.expirationTime=f,a;case dc:return a=K(13,c,b,e),a.elementType=dc,a.type=dc,a.expirationTime=f,a;default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case $b:g=10;break a;case ac:g=9;break a;case cc:g=11;break a;case ec:g=
  14;break a;case fc:g=16;d=null;break a}x("130",null==a?a:typeof a,"");}b=K(g,c,b,e);b.elementType=a;b.type=d;b.expirationTime=f;return b}function Ze(a,b,c,d){a=K(7,a,d,b);a.expirationTime=c;return a}function $e(a,b,c,d){a=K(8,a,d,b);b=0===(b&1)?Yb:bc;a.elementType=b;a.type=b;a.expirationTime=c;return a}function af(a,b,c){a=K(6,a,null,b);a.expirationTime=c;return a}
  function bf(a,b,c){b=K(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}function cf(a,b){a.didError=!1;var c=a.earliestPendingTime;0===c?a.earliestPendingTime=a.latestPendingTime=b:c<b?a.earliestPendingTime=b:a.latestPendingTime>b&&(a.latestPendingTime=b);df(b,a);}
  function ef(a,b){a.didError=!1;if(0===b)a.earliestPendingTime=0,a.latestPendingTime=0,a.earliestSuspendedTime=0,a.latestSuspendedTime=0,a.latestPingedTime=0;else {b<a.latestPingedTime&&(a.latestPingedTime=0);var c=a.latestPendingTime;0!==c&&(c>b?a.earliestPendingTime=a.latestPendingTime=0:a.earliestPendingTime>b&&(a.earliestPendingTime=a.latestPendingTime));c=a.earliestSuspendedTime;0===c?cf(a,b):b<a.latestSuspendedTime?(a.earliestSuspendedTime=0,a.latestSuspendedTime=0,a.latestPingedTime=0,cf(a,b)):
  b>c&&cf(a,b);}df(0,a);}function ff(a,b){a.didError=!1;a.latestPingedTime>=b&&(a.latestPingedTime=0);var c=a.earliestPendingTime,d=a.latestPendingTime;c===b?a.earliestPendingTime=d===b?a.latestPendingTime=0:d:d===b&&(a.latestPendingTime=c);c=a.earliestSuspendedTime;d=a.latestSuspendedTime;0===c?a.earliestSuspendedTime=a.latestSuspendedTime=b:c<b?a.earliestSuspendedTime=b:d>b&&(a.latestSuspendedTime=b);df(b,a);}
  function gf(a,b){var c=a.earliestPendingTime;a=a.earliestSuspendedTime;c>b&&(b=c);a>b&&(b=a);return b}function df(a,b){var c=b.earliestSuspendedTime,d=b.latestSuspendedTime,e=b.earliestPendingTime,f=b.latestPingedTime;e=0!==e?e:f;0===e&&(0===a||d<a)&&(e=d);a=e;0!==a&&c>a&&(a=c);b.nextExpirationTimeToWorkOn=e;b.expirationTime=a;}function L(a,b){if(a&&a.defaultProps){b=objectAssign({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);}return b}
  function hf(a){var b=a._result;switch(a._status){case 1:return b;case 2:throw b;case 0:throw b;default:a._status=0;b=a._ctor;b=b();b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b);},function(b){0===a._status&&(a._status=2,a._result=b);});switch(a._status){case 1:return a._result;case 2:throw a._result;}a._result=b;throw b;}}var jf=(new react.Component).refs;
  function kf(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:objectAssign({},b,c);a.memoizedState=c;d=a.updateQueue;null!==d&&0===a.expirationTime&&(d.baseState=c);}
  var tf={isMounted:function(a){return (a=a._reactInternalFiber)?2===ed(a):!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=lf();d=mf(d,a);var e=nf(d);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);of();pf(a,e);qf(a,d);},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=lf();d=mf(d,a);var e=nf(d);e.tag=rf;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);of();pf(a,e);qf(a,d);},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=lf();c=mf(c,a);var d=nf(c);d.tag=
  sf;void 0!==b&&null!==b&&(d.callback=b);of();pf(a,d);qf(a,c);}};function uf(a,b,c,d,e,f,g){a=a.stateNode;return "function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!dd(c,d)||!dd(e,f):!0}
  function vf(a,b,c){var d=!1,e=He;var f=b.contextType;"object"===typeof f&&null!==f?f=M(f):(e=J(b)?Ie:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Je(a,e):He);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=tf;a.stateNode=b;b._reactInternalFiber=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
  function wf(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&tf.enqueueReplaceState(b,b.state,null);}
  function xf(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=jf;var f=b.contextType;"object"===typeof f&&null!==f?e.context=M(f):(f=J(b)?Ie:H.current,e.context=Je(a,f));f=a.updateQueue;null!==f&&(yf(a,f,c,e,d),e.state=a.memoizedState);f=b.getDerivedStateFromProps;"function"===typeof f&&(kf(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==
  typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&tf.enqueueReplaceState(e,e.state,null),f=a.updateQueue,null!==f&&(yf(a,f,c,e,d),e.state=a.memoizedState));"function"===typeof e.componentDidMount&&(a.effectTag|=4);}var zf=Array.isArray;
  function Af(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;var d=void 0;c&&(1!==c.tag?x("309"):void 0,d=c.stateNode);d?void 0:x("147",a);var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(a){var b=d.refs;b===jf&&(b=d.refs={});null===a?delete b[e]:b[e]=a;};b._stringRef=e;return b}"string"!==typeof a?x("284"):void 0;c._owner?void 0:x("290",a);}return a}
  function Bf(a,b){"textarea"!==a.type&&x("31","[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,"");}
  function Cf(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8;}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b,c){a=Xe(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
  2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=af(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function l(a,b,c,d){if(null!==b&&b.elementType===c.type)return d=e(b,c.props),d.ref=Af(a,b,c),d.return=a,d;d=Ye(c.type,c.key,c.props,null,a.mode,d);d.ref=Af(a,b,c);d.return=a;return d}function k(a,b,c,d){if(null===b||4!==b.tag||b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==
  c.implementation)return b=bf(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Ze(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function p(a,b,c){if("string"===typeof b||"number"===typeof b)return b=af(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case Vb:return c=Ye(b.type,b.key,b.props,null,a.mode,c),c.ref=Af(a,null,b),c.return=a,c;case Wb:return b=bf(b,a.mode,c),b.return=a,b}if(zf(b)||
  hc(b))return b=Ze(b,a.mode,c,null),b.return=a,b;Bf(a,b);}return null}function t(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case Vb:return c.key===e?c.type===Xb?m(a,b,c.props.children,d,e):l(a,b,c,d):null;case Wb:return c.key===e?k(a,b,c,d):null}if(zf(c)||hc(c))return null!==e?null:m(a,b,c,d,null);Bf(a,c);}return null}function A(a,b,c,d,e){if("string"===typeof d||"number"===typeof d)return a=
  a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case Vb:return a=a.get(null===d.key?c:d.key)||null,d.type===Xb?m(b,a,d.props.children,e,d.key):l(b,a,d,e);case Wb:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e)}if(zf(d)||hc(d))return a=a.get(c)||null,m(b,a,d,e,null);Bf(b,d);}return null}function v(e,g,h,k){for(var l=null,m=null,q=g,u=g=0,B=null;null!==q&&u<h.length;u++){q.index>u?(B=q,q=null):B=q.sibling;var w=t(e,q,h[u],k);if(null===w){null===q&&(q=B);break}a&&
  q&&null===w.alternate&&b(e,q);g=f(w,g,u);null===m?l=w:m.sibling=w;m=w;q=B;}if(u===h.length)return c(e,q),l;if(null===q){for(;u<h.length;u++)if(q=p(e,h[u],k))g=f(q,g,u),null===m?l=q:m.sibling=q,m=q;return l}for(q=d(e,q);u<h.length;u++)if(B=A(q,e,u,h[u],k))a&&null!==B.alternate&&q.delete(null===B.key?u:B.key),g=f(B,g,u),null===m?l=B:m.sibling=B,m=B;a&&q.forEach(function(a){return b(e,a)});return l}function R(e,g,h,k){var l=hc(h);"function"!==typeof l?x("150"):void 0;h=l.call(h);null==h?x("151"):void 0;
  for(var m=l=null,q=g,u=g=0,B=null,w=h.next();null!==q&&!w.done;u++,w=h.next()){q.index>u?(B=q,q=null):B=q.sibling;var v=t(e,q,w.value,k);if(null===v){q||(q=B);break}a&&q&&null===v.alternate&&b(e,q);g=f(v,g,u);null===m?l=v:m.sibling=v;m=v;q=B;}if(w.done)return c(e,q),l;if(null===q){for(;!w.done;u++,w=h.next())w=p(e,w.value,k),null!==w&&(g=f(w,g,u),null===m?l=w:m.sibling=w,m=w);return l}for(q=d(e,q);!w.done;u++,w=h.next())w=A(q,e,u,w.value,k),null!==w&&(a&&null!==w.alternate&&q.delete(null===w.key?u:
  w.key),g=f(w,g,u),null===m?l=w:m.sibling=w,m=w);a&&q.forEach(function(a){return b(e,a)});return l}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===Xb&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case Vb:a:{l=f.key;for(k=d;null!==k;){if(k.key===l)if(7===k.tag?f.type===Xb:k.elementType===f.type){c(a,k.sibling);d=e(k,f.type===Xb?f.props.children:f.props);d.ref=Af(a,k,f);d.return=a;a=d;break a}else {c(a,k);break}else b(a,k);k=
  k.sibling;}f.type===Xb?(d=Ze(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Ye(f.type,f.key,f.props,null,a.mode,h),h.ref=Af(a,d,f),h.return=a,a=h);}return g(a);case Wb:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else {c(a,d);break}else b(a,d);d=d.sibling;}d=bf(f,a.mode,h);d.return=a;a=d;}return g(a)}if("string"===typeof f||"number"===typeof f)return f=
  ""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=af(f,a.mode,h),d.return=a,a=d),g(a);if(zf(f))return v(a,d,f,h);if(hc(f))return R(a,d,f,h);l&&Bf(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 0:h=a.type,x("152",h.displayName||h.name||"Component");}return c(a,d)}}var Df=Cf(!0),Ef=Cf(!1),Ff={},N={current:Ff},Gf={current:Ff},Hf={current:Ff};function If(a){a===Ff?x("174"):void 0;return a}
  function Jf(a,b){G(Hf,b);G(Gf,a);G(N,Ff);var c=b.nodeType;switch(c){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:he(null,"");break;default:c=8===c?b.parentNode:b,b=c.namespaceURI||null,c=c.tagName,b=he(b,c);}F(N);G(N,b);}function Kf(a){F(N);F(Gf);F(Hf);}function Lf(a){If(Hf.current);var b=If(N.current);var c=he(b,a.type);b!==c&&(G(Gf,a),G(N,c));}function Mf(a){Gf.current===a&&(F(N),F(Gf));}
  var Nf=0,Of=2,Pf=4,Qf=8,Rf=16,Sf=32,Tf=64,Uf=128,Vf=Tb.ReactCurrentDispatcher,Wf=0,Xf=null,O=null,P=null,Yf=null,Q=null,Zf=null,$f=0,ag=null,bg=0,cg=!1,dg=null,eg=0;function fg(){x("307");}function gg(a,b){if(null===b)return !1;for(var c=0;c<b.length&&c<a.length;c++)if(!bd(a[c],b[c]))return !1;return !0}
  function hg(a,b,c,d,e,f){Wf=f;Xf=b;P=null!==a?a.memoizedState:null;Vf.current=null===P?ig:jg;b=c(d,e);if(cg){do cg=!1,eg+=1,P=null!==a?a.memoizedState:null,Zf=Yf,ag=Q=O=null,Vf.current=jg,b=c(d,e);while(cg);dg=null;eg=0;}Vf.current=kg;a=Xf;a.memoizedState=Yf;a.expirationTime=$f;a.updateQueue=ag;a.effectTag|=bg;a=null!==O&&null!==O.next;Wf=0;Zf=Q=Yf=P=O=Xf=null;$f=0;ag=null;bg=0;a?x("300"):void 0;return b}function lg(){Vf.current=kg;Wf=0;Zf=Q=Yf=P=O=Xf=null;$f=0;ag=null;bg=0;cg=!1;dg=null;eg=0;}
  function mg(){var a={memoizedState:null,baseState:null,queue:null,baseUpdate:null,next:null};null===Q?Yf=Q=a:Q=Q.next=a;return Q}function ng(){if(null!==Zf)Q=Zf,Zf=Q.next,O=P,P=null!==O?O.next:null;else {null===P?x("310"):void 0;O=P;var a={memoizedState:O.memoizedState,baseState:O.baseState,queue:O.queue,baseUpdate:O.baseUpdate,next:null};Q=null===Q?Yf=a:Q.next=a;P=O.next;}return Q}function og(a,b){return "function"===typeof b?b(a):b}
  function pg(a){var b=ng(),c=b.queue;null===c?x("311"):void 0;if(0<eg){var d=c.dispatch;if(null!==dg){var e=dg.get(c);if(void 0!==e){dg.delete(c);var f=b.memoizedState;do f=a(f,e.action),e=e.next;while(null!==e);bd(f,b.memoizedState)||(qg=!0);b.memoizedState=f;b.baseUpdate===c.last&&(b.baseState=f);return [f,d]}}return [b.memoizedState,d]}d=c.last;var g=b.baseUpdate;f=b.baseState;null!==g?(null!==d&&(d.next=null),d=g.next):d=null!==d?d.next:null;if(null!==d){var h=e=null,l=d,k=!1;do{var m=l.expirationTime;
  m<Wf?(k||(k=!0,h=g,e=f),m>$f&&($f=m)):f=l.eagerReducer===a?l.eagerState:a(f,l.action);g=l;l=l.next;}while(null!==l&&l!==d);k||(h=g,e=f);bd(f,b.memoizedState)||(qg=!0);b.memoizedState=f;b.baseUpdate=h;b.baseState=e;c.eagerReducer=a;c.eagerState=f;}return [b.memoizedState,c.dispatch]}
  function rg(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};null===ag?(ag={lastEffect:null},ag.lastEffect=a.next=a):(b=ag.lastEffect,null===b?ag.lastEffect=a.next=a:(c=b.next,b.next=a,a.next=c,ag.lastEffect=a));return a}function sg(a,b,c,d){var e=mg();bg|=a;e.memoizedState=rg(b,c,void 0,void 0===d?null:d);}
  function tg(a,b,c,d){var e=ng();d=void 0===d?null:d;var f=void 0;if(null!==O){var g=O.memoizedState;f=g.destroy;if(null!==d&&gg(d,g.deps)){rg(Nf,c,f,d);return}}bg|=a;e.memoizedState=rg(b,c,f,d);}function ug(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null);};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null;}}function vg(){}
  function wg(a,b,c){25>eg?void 0:x("301");var d=a.alternate;if(a===Xf||null!==d&&d===Xf)if(cg=!0,a={expirationTime:Wf,action:c,eagerReducer:null,eagerState:null,next:null},null===dg&&(dg=new Map),c=dg.get(b),void 0===c)dg.set(b,a);else {for(b=c;null!==b.next;)b=b.next;b.next=a;}else {of();var e=lf();e=mf(e,a);var f={expirationTime:e,action:c,eagerReducer:null,eagerState:null,next:null},g=b.last;if(null===g)f.next=f;else {var h=g.next;null!==h&&(f.next=h);g.next=f;}b.last=f;if(0===a.expirationTime&&(null===
  d||0===d.expirationTime)&&(d=b.eagerReducer,null!==d))try{var l=b.eagerState,k=d(l,c);f.eagerReducer=d;f.eagerState=k;if(bd(k,l))return}catch(m){}finally{}qf(a,e);}}
  var kg={readContext:M,useCallback:fg,useContext:fg,useEffect:fg,useImperativeHandle:fg,useLayoutEffect:fg,useMemo:fg,useReducer:fg,useRef:fg,useState:fg,useDebugValue:fg},ig={readContext:M,useCallback:function(a,b){mg().memoizedState=[a,void 0===b?null:b];return a},useContext:M,useEffect:function(a,b){return sg(516,Uf|Tf,a,b)},useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return sg(4,Pf|Sf,ug.bind(null,b,a),c)},useLayoutEffect:function(a,b){return sg(4,Pf|Sf,a,b)},
  useMemo:function(a,b){var c=mg();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=mg();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={last:null,dispatch:null,eagerReducer:a,eagerState:b};a=a.dispatch=wg.bind(null,Xf,a);return [d.memoizedState,a]},useRef:function(a){var b=mg();a={current:a};return b.memoizedState=a},useState:function(a){var b=mg();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={last:null,dispatch:null,eagerReducer:og,
  eagerState:a};a=a.dispatch=wg.bind(null,Xf,a);return [b.memoizedState,a]},useDebugValue:vg},jg={readContext:M,useCallback:function(a,b){var c=ng();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&gg(b,d[1]))return d[0];c.memoizedState=[a,b];return a},useContext:M,useEffect:function(a,b){return tg(516,Uf|Tf,a,b)},useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return tg(4,Pf|Sf,ug.bind(null,b,a),c)},useLayoutEffect:function(a,b){return tg(4,Pf|Sf,a,b)},
  useMemo:function(a,b){var c=ng();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&gg(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a},useReducer:pg,useRef:function(){return ng().memoizedState},useState:function(a){return pg(og)},useDebugValue:vg},xg=null,yg=null,zg=!1;
  function Ag(a,b){var c=K(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c;}function Bg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,!0):!1;case 13:return !1;default:return !1}}
  function Cg(a){if(zg){var b=yg;if(b){var c=b;if(!Bg(a,b)){b=De(c);if(!b||!Bg(a,b)){a.effectTag|=2;zg=!1;xg=a;return}Ag(xg,c);}xg=a;yg=Ee(b);}else a.effectTag|=2,zg=!1,xg=a;}}function Dg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&18!==a.tag;)a=a.return;xg=a;}function Eg(a){if(a!==xg)return !1;if(!zg)return Dg(a),zg=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!xe(b,a.memoizedProps))for(b=yg;b;)Ag(a,b),b=De(b);Dg(a);yg=xg?De(a.stateNode):null;return !0}function Fg(){yg=xg=null;zg=!1;}
  var Gg=Tb.ReactCurrentOwner,qg=!1;function S(a,b,c,d){b.child=null===a?Ef(b,null,c,d):Df(b,a.child,c,d);}function Hg(a,b,c,d,e){c=c.render;var f=b.ref;Ig(b,e);d=hg(a,b,c,d,f,e);if(null!==a&&!qg)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),Jg(a,b,e);b.effectTag|=1;S(a,b,d,e);return b.child}
  function Kg(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!Ve(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,Lg(a,b,g,d,e,f);a=Ye(c.type,null,d,null,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(e<f&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:dd,c(e,d)&&a.ref===b.ref))return Jg(a,b,f);b.effectTag|=1;a=Xe(g,d);a.ref=b.ref;a.return=b;return b.child=a}
  function Lg(a,b,c,d,e,f){return null!==a&&dd(a.memoizedProps,d)&&a.ref===b.ref&&(qg=!1,e<f)?Jg(a,b,f):Mg(a,b,c,d,f)}function Ng(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128;}function Mg(a,b,c,d,e){var f=J(c)?Ie:H.current;f=Je(b,f);Ig(b,e);c=hg(a,b,c,d,f,e);if(null!==a&&!qg)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),Jg(a,b,e);b.effectTag|=1;S(a,b,c,e);return b.child}
  function Og(a,b,c,d,e){if(J(c)){var f=!0;Oe(b);}else f=!1;Ig(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),vf(b,c,d),xf(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var l=g.context,k=c.contextType;"object"===typeof k&&null!==k?k=M(k):(k=J(c)?Ie:H.current,k=Je(b,k));var m=c.getDerivedStateFromProps,p="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;p||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
  "function"!==typeof g.componentWillReceiveProps||(h!==d||l!==k)&&wf(b,g,d,k);Pg=!1;var t=b.memoizedState;l=g.state=t;var A=b.updateQueue;null!==A&&(yf(b,A,d,g,e),l=b.memoizedState);h!==d||t!==l||I.current||Pg?("function"===typeof m&&(kf(b,c,m,d),l=b.memoizedState),(h=Pg||uf(b,c,h,d,t,l,k))?(p||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&
  g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.effectTag|=4)):("function"===typeof g.componentDidMount&&(b.effectTag|=4),b.memoizedProps=d,b.memoizedState=l),g.props=d,g.state=l,g.context=k,d=h):("function"===typeof g.componentDidMount&&(b.effectTag|=4),d=!1);}else g=b.stateNode,h=b.memoizedProps,g.props=b.type===b.elementType?h:L(b.type,h),l=g.context,k=c.contextType,"object"===typeof k&&null!==k?k=M(k):(k=J(c)?Ie:H.current,k=Je(b,k)),m=c.getDerivedStateFromProps,(p="function"===
  typeof m||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==d||l!==k)&&wf(b,g,d,k),Pg=!1,l=b.memoizedState,t=g.state=l,A=b.updateQueue,null!==A&&(yf(b,A,d,g,e),t=b.memoizedState),h!==d||l!==t||I.current||Pg?("function"===typeof m&&(kf(b,c,m,d),t=b.memoizedState),(m=Pg||uf(b,c,h,d,l,t,k))?(p||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===
  typeof g.componentWillUpdate&&g.componentWillUpdate(d,t,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,t,k)),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&l===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&l===a.memoizedState||(b.effectTag|=256),b.memoizedProps=d,b.memoizedState=
  t),g.props=d,g.state=t,g.context=k,d=m):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&l===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&l===a.memoizedState||(b.effectTag|=256),d=!1);return Qg(a,b,c,d,f,e)}
  function Qg(a,b,c,d,e,f){Ng(a,b);var g=0!==(b.effectTag&64);if(!d&&!g)return e&&Pe(b,c,!1),Jg(a,b,f);d=b.stateNode;Gg.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.effectTag|=1;null!==a&&g?(b.child=Df(b,a.child,null,f),b.child=Df(b,null,h,f)):S(a,b,h,f);b.memoizedState=d.state;e&&Pe(b,c,!0);return b.child}function Rg(a){var b=a.stateNode;b.pendingContext?Me(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Me(a,b.context,!1);Jf(a,b.containerInfo);}
  function Sg(a,b,c){var d=b.mode,e=b.pendingProps,f=b.memoizedState;if(0===(b.effectTag&64)){f=null;var g=!1;}else f={timedOutAt:null!==f?f.timedOutAt:0},g=!0,b.effectTag&=-65;if(null===a)if(g){var h=e.fallback;a=Ze(null,d,0,null);0===(b.mode&1)&&(a.child=null!==b.memoizedState?b.child.child:b.child);d=Ze(h,d,c,null);a.sibling=d;c=a;c.return=d.return=b;}else c=d=Ef(b,null,e.children,c);else null!==a.memoizedState?(d=a.child,h=d.sibling,g?(c=e.fallback,e=Xe(d,d.pendingProps),0===(b.mode&1)&&(g=null!==
  b.memoizedState?b.child.child:b.child,g!==d.child&&(e.child=g)),d=e.sibling=Xe(h,c,h.expirationTime),c=e,e.childExpirationTime=0,c.return=d.return=b):c=d=Df(b,d.child,e.children,c)):(h=a.child,g?(g=e.fallback,e=Ze(null,d,0,null),e.child=h,0===(b.mode&1)&&(e.child=null!==b.memoizedState?b.child.child:b.child),d=e.sibling=Ze(g,d,c,null),d.effectTag|=2,c=e,e.childExpirationTime=0,c.return=d.return=b):d=c=Df(b,h,e.children,c)),b.stateNode=a.stateNode;b.memoizedState=f;b.child=c;return d}
  function Jg(a,b,c){null!==a&&(b.contextDependencies=a.contextDependencies);if(b.childExpirationTime<c)return null;null!==a&&b.child!==a.child?x("153"):void 0;if(null!==b.child){a=b.child;c=Xe(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Xe(a,a.pendingProps,a.expirationTime),c.return=b;c.sibling=null;}return b.child}
  function Tg(a,b,c){var d=b.expirationTime;if(null!==a)if(a.memoizedProps!==b.pendingProps||I.current)qg=!0;else {if(d<c){qg=!1;switch(b.tag){case 3:Rg(b);Fg();break;case 5:Lf(b);break;case 1:J(b.type)&&Oe(b);break;case 4:Jf(b,b.stateNode.containerInfo);break;case 10:Ug(b,b.memoizedProps.value);break;case 13:if(null!==b.memoizedState){d=b.child.childExpirationTime;if(0!==d&&d>=c)return Sg(a,b,c);b=Jg(a,b,c);return null!==b?b.sibling:null}}return Jg(a,b,c)}}else qg=!1;b.expirationTime=0;switch(b.tag){case 2:d=
  b.elementType;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;var e=Je(b,H.current);Ig(b,c);e=hg(null,b,d,a,e,c);b.effectTag|=1;if("object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;lg();if(J(d)){var f=!0;Oe(b);}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;var g=d.getDerivedStateFromProps;"function"===typeof g&&kf(b,d,g,a);e.updater=tf;b.stateNode=e;e._reactInternalFiber=b;xf(b,d,a,c);b=Qg(null,b,d,!0,f,
  c);}else b.tag=0,S(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);f=b.pendingProps;a=hf(e);b.type=a;e=b.tag=We(a);f=L(a,f);g=void 0;switch(e){case 0:g=Mg(null,b,a,f,c);break;case 1:g=Og(null,b,a,f,c);break;case 11:g=Hg(null,b,a,f,c);break;case 14:g=Kg(null,b,a,L(a.type,f),d,c);break;default:x("306",a,"");}return g;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:L(d,e),Mg(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,
  e=b.elementType===d?e:L(d,e),Og(a,b,d,e,c);case 3:Rg(b);d=b.updateQueue;null===d?x("282"):void 0;e=b.memoizedState;e=null!==e?e.element:null;yf(b,d,b.pendingProps,null,c);d=b.memoizedState.element;if(d===e)Fg(),b=Jg(a,b,c);else {e=b.stateNode;if(e=(null===a||null===a.child)&&e.hydrate)yg=Ee(b.stateNode.containerInfo),xg=b,e=zg=!0;e?(b.effectTag|=2,b.child=Ef(b,null,d,c)):(S(a,b,d,c),Fg());b=b.child;}return b;case 5:return Lf(b),null===a&&Cg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,
  g=e.children,xe(d,e)?g=null:null!==f&&xe(d,f)&&(b.effectTag|=16),Ng(a,b),1!==c&&b.mode&1&&e.hidden?(b.expirationTime=b.childExpirationTime=1,b=null):(S(a,b,g,c),b=b.child),b;case 6:return null===a&&Cg(b),null;case 13:return Sg(a,b,c);case 4:return Jf(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Df(b,null,d,c):S(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:L(d,e),Hg(a,b,d,e,c);case 7:return S(a,b,b.pendingProps,c),b.child;case 8:return S(a,b,b.pendingProps.children,
  c),b.child;case 12:return S(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;g=b.memoizedProps;f=e.value;Ug(b,f);if(null!==g){var h=g.value;f=bd(h,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(h,f):1073741823)|0;if(0===f){if(g.children===e.children&&!I.current){b=Jg(a,b,c);break a}}else for(h=b.child,null!==h&&(h.return=b);null!==h;){var l=h.contextDependencies;if(null!==l){g=h.child;for(var k=l.first;null!==k;){if(k.context===d&&0!==
  (k.observedBits&f)){1===h.tag&&(k=nf(c),k.tag=sf,pf(h,k));h.expirationTime<c&&(h.expirationTime=c);k=h.alternate;null!==k&&k.expirationTime<c&&(k.expirationTime=c);k=c;for(var m=h.return;null!==m;){var p=m.alternate;if(m.childExpirationTime<k)m.childExpirationTime=k,null!==p&&p.childExpirationTime<k&&(p.childExpirationTime=k);else if(null!==p&&p.childExpirationTime<k)p.childExpirationTime=k;else break;m=m.return;}l.expirationTime<c&&(l.expirationTime=c);break}k=k.next;}}else g=10===h.tag?h.type===b.type?
  null:h.child:h.child;if(null!==g)g.return=h;else for(g=h;null!==g;){if(g===b){g=null;break}h=g.sibling;if(null!==h){h.return=g.return;g=h;break}g=g.return;}h=g;}}S(a,b,e.children,c);b=b.child;}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,Ig(b,c),e=M(e,f.unstable_observedBits),d=d(e),b.effectTag|=1,S(a,b,d,c),b.child;case 14:return e=b.type,f=L(e,b.pendingProps),f=L(e.type,f),Kg(a,b,e,f,d,c);case 15:return Lg(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===
  d?e:L(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),b.tag=1,J(d)?(a=!0,Oe(b)):a=!1,Ig(b,c),vf(b,d,e),xf(b,d,e,c),Qg(null,b,d,!0,a,c)}x("156");}var Vg={current:null},Wg=null,Xg=null,Yg=null;function Ug(a,b){var c=a.type._context;G(Vg,c._currentValue);c._currentValue=b;}function Zg(a){var b=Vg.current;F(Vg);a.type._context._currentValue=b;}function Ig(a,b){Wg=a;Yg=Xg=null;var c=a.contextDependencies;null!==c&&c.expirationTime>=b&&(qg=!0);a.contextDependencies=null;}
  function M(a,b){if(Yg!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)Yg=a,b=1073741823;b={context:a,observedBits:b,next:null};null===Xg?(null===Wg?x("308"):void 0,Xg=b,Wg.contextDependencies={first:b,expirationTime:0}):Xg=Xg.next=b;}return a._currentValue}var $g=0,rf=1,sf=2,ah=3,Pg=!1;function bh(a){return {baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
  function ch(a){return {baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function nf(a){return {expirationTime:a,tag:$g,payload:null,callback:null,next:null,nextEffect:null}}function dh(a,b){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b);}
  function pf(a,b){var c=a.alternate;if(null===c){var d=a.updateQueue;var e=null;null===d&&(d=a.updateQueue=bh(a.memoizedState));}else d=a.updateQueue,e=c.updateQueue,null===d?null===e?(d=a.updateQueue=bh(a.memoizedState),e=c.updateQueue=bh(c.memoizedState)):d=a.updateQueue=ch(e):null===e&&(e=c.updateQueue=ch(d));null===e||d===e?dh(d,b):null===d.lastUpdate||null===e.lastUpdate?(dh(d,b),dh(e,b)):(dh(d,b),e.lastUpdate=b);}
  function eh(a,b){var c=a.updateQueue;c=null===c?a.updateQueue=bh(a.memoizedState):fh(a,c);null===c.lastCapturedUpdate?c.firstCapturedUpdate=c.lastCapturedUpdate=b:(c.lastCapturedUpdate.next=b,c.lastCapturedUpdate=b);}function fh(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=ch(b));return b}
  function gh(a,b,c,d,e,f){switch(c.tag){case rf:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case ah:a.effectTag=a.effectTag&-2049|64;case $g:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e)break;return objectAssign({},d,e);case sf:Pg=!0;}return d}
  function yf(a,b,c,d,e){Pg=!1;b=fh(a,b);for(var f=b.baseState,g=null,h=0,l=b.firstUpdate,k=f;null!==l;){var m=l.expirationTime;m<e?(null===g&&(g=l,f=k),h<m&&(h=m)):(k=gh(a,b,l,k,c,d),null!==l.callback&&(a.effectTag|=32,l.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=l:(b.lastEffect.nextEffect=l,b.lastEffect=l)));l=l.next;}m=null;for(l=b.firstCapturedUpdate;null!==l;){var p=l.expirationTime;p<e?(null===m&&(m=l,null===g&&(f=k)),h<p&&(h=p)):(k=gh(a,b,l,k,c,d),null!==l.callback&&(a.effectTag|=
  32,l.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=l:(b.lastCapturedEffect.nextEffect=l,b.lastCapturedEffect=l)));l=l.next;}null===g&&(b.lastUpdate=null);null===m?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===m&&(f=k);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=m;a.expirationTime=h;a.memoizedState=k;}
  function hh(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);ih(b.firstEffect,c);b.firstEffect=b.lastEffect=null;ih(b.firstCapturedEffect,c);b.firstCapturedEffect=b.lastCapturedEffect=null;}function ih(a,b){for(;null!==a;){var c=a.callback;if(null!==c){a.callback=null;var d=b;"function"!==typeof c?x("191",c):void 0;c.call(d);}a=a.nextEffect;}}
  function jh(a,b){return {value:a,source:b,stack:jc(b)}}function kh(a){a.effectTag|=4;}var lh=void 0,mh=void 0,nh=void 0,oh=void 0;lh=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}};mh=function(){};
  nh=function(a,b,c,d,e){var f=a.memoizedProps;if(f!==d){var g=b.stateNode;If(N.current);a=null;switch(c){case "input":f=vc(g,f);d=vc(g,d);a=[];break;case "option":f=$d(g,f);d=$d(g,d);a=[];break;case "select":f=objectAssign({},f,{value:void 0});d=objectAssign({},d,{value:void 0});a=[];break;case "textarea":f=be(g,f);d=be(g,d);a=[];break;default:"function"!==typeof f.onClick&&"function"===typeof d.onClick&&(g.onclick=te);}qe(c,d);g=c=void 0;var h=null;for(c in f)if(!d.hasOwnProperty(c)&&f.hasOwnProperty(c)&&null!=f[c])if("style"===
  c){var l=f[c];for(g in l)l.hasOwnProperty(g)&&(h||(h={}),h[g]="");}else "dangerouslySetInnerHTML"!==c&&"children"!==c&&"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&"autoFocus"!==c&&(ra.hasOwnProperty(c)?a||(a=[]):(a=a||[]).push(c,null));for(c in d){var k=d[c];l=null!=f?f[c]:void 0;if(d.hasOwnProperty(c)&&k!==l&&(null!=k||null!=l))if("style"===c)if(l){for(g in l)!l.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(h||(h={}),h[g]="");for(g in k)k.hasOwnProperty(g)&&l[g]!==k[g]&&(h||
  (h={}),h[g]=k[g]);}else h||(a||(a=[]),a.push(c,h)),h=k;else "dangerouslySetInnerHTML"===c?(k=k?k.__html:void 0,l=l?l.__html:void 0,null!=k&&l!==k&&(a=a||[]).push(c,""+k)):"children"===c?l===k||"string"!==typeof k&&"number"!==typeof k||(a=a||[]).push(c,""+k):"suppressContentEditableWarning"!==c&&"suppressHydrationWarning"!==c&&(ra.hasOwnProperty(c)?(null!=k&&se(e,c),a||l===k||(a=[])):(a=a||[]).push(c,k));}h&&(a=a||[]).push("style",h);e=a;(b.updateQueue=e)&&kh(b);}};oh=function(a,b,c,d){c!==d&&kh(b);};
  var ph="function"===typeof WeakSet?WeakSet:Set;function qh(a,b){var c=b.source,d=b.stack;null===d&&null!==c&&(d=jc(c));null!==c&&ic(c.type);b=b.value;null!==a&&1===a.tag&&ic(a.type);try{console.error(b);}catch(e){setTimeout(function(){throw e;});}}function rh(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null);}catch(c){sh(a,c);}else b.current=null;}
  function th(a,b,c){c=c.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do{if((d.tag&a)!==Nf){var e=d.destroy;d.destroy=void 0;void 0!==e&&e();}(d.tag&b)!==Nf&&(e=d.create,d.destroy=e());d=d.next;}while(d!==c)}}
  function uh(a,b){for(var c=a;;){if(5===c.tag){var d=c.stateNode;if(b)d.style.display="none";else {d=c.stateNode;var e=c.memoizedProps.style;e=void 0!==e&&null!==e&&e.hasOwnProperty("display")?e.display:null;d.style.display=ne("display",e);}}else if(6===c.tag)c.stateNode.nodeValue=b?"":c.memoizedProps;else if(13===c.tag&&null!==c.memoizedState){d=c.child.sibling;d.return=c;c=d;continue}else if(null!==c.child){c.child.return=c;c=c.child;continue}if(c===a)break;for(;null===c.sibling;){if(null===c.return||
  c.return===a)return;c=c.return;}c.sibling.return=c.return;c=c.sibling;}}
  function vh(a){"function"===typeof Re&&Re(a);switch(a.tag){case 0:case 11:case 14:case 15:var b=a.updateQueue;if(null!==b&&(b=b.lastEffect,null!==b)){var c=b=b.next;do{var d=c.destroy;if(void 0!==d){var e=a;try{d();}catch(f){sh(e,f);}}c=c.next;}while(c!==b)}break;case 1:rh(a);b=a.stateNode;if("function"===typeof b.componentWillUnmount)try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount();}catch(f){sh(a,f);}break;case 5:rh(a);break;case 4:wh(a);}}
  function xh(a){return 5===a.tag||3===a.tag||4===a.tag}
  function yh(a){a:{for(var b=a.return;null!==b;){if(xh(b)){var c=b;break a}b=b.return;}x("160");c=void 0;}var d=b=void 0;switch(c.tag){case 5:b=c.stateNode;d=!1;break;case 3:b=c.stateNode.containerInfo;d=!0;break;case 4:b=c.stateNode.containerInfo;d=!0;break;default:x("161");}c.effectTag&16&&(ke(b,""),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||xh(c.return)){c=null;break a}c=c.return;}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.effectTag&
  2)continue b;if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child;}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){if(5===e.tag||6===e.tag)if(c)if(d){var f=b,g=e.stateNode,h=c;8===f.nodeType?f.parentNode.insertBefore(g,h):f.insertBefore(g,h);}else b.insertBefore(e.stateNode,c);else d?(g=b,h=e.stateNode,8===g.nodeType?(f=g.parentNode,f.insertBefore(h,g)):(f=g,f.appendChild(h)),g=g._reactRootContainer,null!==g&&void 0!==g||null!==f.onclick||(f.onclick=te)):b.appendChild(e.stateNode);
  else if(4!==e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a)break;for(;null===e.sibling;){if(null===e.return||e.return===a)return;e=e.return;}e.sibling.return=e.return;e=e.sibling;}}
  function wh(a){for(var b=a,c=!1,d=void 0,e=void 0;;){if(!c){c=b.return;a:for(;;){null===c?x("160"):void 0;switch(c.tag){case 5:d=c.stateNode;e=!1;break a;case 3:d=c.stateNode.containerInfo;e=!0;break a;case 4:d=c.stateNode.containerInfo;e=!0;break a}c=c.return;}c=!0;}if(5===b.tag||6===b.tag){a:for(var f=b,g=f;;)if(vh(g),null!==g.child&&4!==g.tag)g.child.return=g,g=g.child;else {if(g===f)break;for(;null===g.sibling;){if(null===g.return||g.return===f)break a;g=g.return;}g.sibling.return=g.return;g=g.sibling;}e?
  (f=d,g=b.stateNode,8===f.nodeType?f.parentNode.removeChild(g):f.removeChild(g)):d.removeChild(b.stateNode);}else if(4===b.tag){if(null!==b.child){d=b.stateNode.containerInfo;e=!0;b.child.return=b;b=b.child;continue}}else if(vh(b),null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return;b=b.return;4===b.tag&&(c=!1);}b.sibling.return=b.return;b=b.sibling;}}
  function zh(a,b){switch(b.tag){case 0:case 11:case 14:case 15:th(Pf,Qf,b);break;case 1:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&Ce(c,f,e,a,d);}break;case 6:null===b.stateNode?x("162"):void 0;b.stateNode.nodeValue=b.memoizedProps;break;case 3:break;case 12:break;case 13:c=b.memoizedState;d=void 0;a=b;null===c?d=!1:(d=!0,a=b.child,0===c.timedOutAt&&(c.timedOutAt=lf()));null!==a&&uh(a,d);c=
  b.updateQueue;if(null!==c){b.updateQueue=null;var g=b.stateNode;null===g&&(g=b.stateNode=new ph);c.forEach(function(a){var c=Ah.bind(null,b,a);g.has(a)||(g.add(a),a.then(c,c));});}break;case 17:break;default:x("163");}}var Bh="function"===typeof WeakMap?WeakMap:Map;function Ch(a,b,c){c=nf(c);c.tag=ah;c.payload={element:null};var d=b.value;c.callback=function(){Dh(d);qh(a,b);};return c}
  function Eh(a,b,c){c=nf(c);c.tag=ah;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===Fh?Fh=new Set([this]):Fh.add(this));var c=b.value,e=b.stack;qh(a,b);this.componentDidCatch(c,{componentStack:null!==e?e:""});});return c}
  function Gh(a){switch(a.tag){case 1:J(a.type)&&Ke();var b=a.effectTag;return b&2048?(a.effectTag=b&-2049|64,a):null;case 3:return Kf(),Le(),b=a.effectTag,0!==(b&64)?x("285"):void 0,a.effectTag=b&-2049|64,a;case 5:return Mf(a),null;case 13:return b=a.effectTag,b&2048?(a.effectTag=b&-2049|64,a):null;case 18:return null;case 4:return Kf(),null;case 10:return Zg(a),null;default:return null}}
  var Hh=Tb.ReactCurrentDispatcher,Ih=Tb.ReactCurrentOwner,Jh=1073741822,Kh=!1,T=null,Lh=null,U=0,Mh=-1,Nh=!1,V=null,Oh=!1,Ph=null,Qh=null,Rh=null,Fh=null;function Sh(){if(null!==T)for(var a=T.return;null!==a;){var b=a;switch(b.tag){case 1:var c=b.type.childContextTypes;null!==c&&void 0!==c&&Ke();break;case 3:Kf();Le();break;case 5:Mf(b);break;case 4:Kf();break;case 10:Zg(b);}a=a.return;}Lh=null;U=0;Mh=-1;Nh=!1;T=null;}
  function Th(){for(;null!==V;){var a=V.effectTag;a&16&&ke(V.stateNode,"");if(a&128){var b=V.alternate;null!==b&&(b=b.ref,null!==b&&("function"===typeof b?b(null):b.current=null));}switch(a&14){case 2:yh(V);V.effectTag&=-3;break;case 6:yh(V);V.effectTag&=-3;zh(V.alternate,V);break;case 4:zh(V.alternate,V);break;case 8:a=V,wh(a),a.return=null,a.child=null,a.memoizedState=null,a.updateQueue=null,a=a.alternate,null!==a&&(a.return=null,a.child=null,a.memoizedState=null,a.updateQueue=null);}V=V.nextEffect;}}
  function Uh(){for(;null!==V;){if(V.effectTag&256)a:{var a=V.alternate,b=V;switch(b.tag){case 0:case 11:case 15:th(Of,Nf,b);break a;case 1:if(b.effectTag&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:L(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b;}break a;case 3:case 5:case 6:case 4:case 17:break a;default:x("163");}}V=V.nextEffect;}}
  function Vh(a,b){for(;null!==V;){var c=V.effectTag;if(c&36){var d=V.alternate,e=V,f=b;switch(e.tag){case 0:case 11:case 15:th(Rf,Sf,e);break;case 1:var g=e.stateNode;if(e.effectTag&4)if(null===d)g.componentDidMount();else {var h=e.elementType===e.type?d.memoizedProps:L(e.type,d.memoizedProps);g.componentDidUpdate(h,d.memoizedState,g.__reactInternalSnapshotBeforeUpdate);}d=e.updateQueue;null!==d&&hh(e,d,g);break;case 3:d=e.updateQueue;if(null!==d){g=null;if(null!==e.child)switch(e.child.tag){case 5:g=
  e.child.stateNode;break;case 1:g=e.child.stateNode;}hh(e,d,g);}break;case 5:f=e.stateNode;null===d&&e.effectTag&4&&we(e.type,e.memoizedProps)&&f.focus();break;case 6:break;case 4:break;case 12:break;case 13:break;case 17:break;default:x("163");}}c&128&&(e=V.ref,null!==e&&(f=V.stateNode,"function"===typeof e?e(f):e.current=f));c&512&&(Ph=a);V=V.nextEffect;}}
  function Wh(a,b){Rh=Qh=Ph=null;var c=W;W=!0;do{if(b.effectTag&512){var d=!1,e=void 0;try{var f=b;th(Uf,Nf,f);th(Nf,Tf,f);}catch(g){d=!0,e=g;}d&&sh(b,e);}b=b.nextEffect;}while(null!==b);W=c;c=a.expirationTime;0!==c&&Xh(a,c);X||W||Yh(1073741823,!1);}function of(){null!==Qh&&Be(Qh);null!==Rh&&Rh();}
  function Zh(a,b){Oh=Kh=!0;a.current===b?x("177"):void 0;var c=a.pendingCommitExpirationTime;0===c?x("261"):void 0;a.pendingCommitExpirationTime=0;var d=b.expirationTime,e=b.childExpirationTime;ef(a,e>d?e:d);Ih.current=null;d=void 0;1<b.effectTag?null!==b.lastEffect?(b.lastEffect.nextEffect=b,d=b.firstEffect):d=b:d=b.firstEffect;ue=Bd;ve=Pd();Bd=!1;for(V=d;null!==V;){e=!1;var f=void 0;try{Uh();}catch(h){e=!0,f=h;}e&&(null===V?x("178"):void 0,sh(V,f),null!==V&&(V=V.nextEffect));}for(V=d;null!==V;){e=!1;
  f=void 0;try{Th();}catch(h){e=!0,f=h;}e&&(null===V?x("178"):void 0,sh(V,f),null!==V&&(V=V.nextEffect));}Qd(ve);ve=null;Bd=!!ue;ue=null;a.current=b;for(V=d;null!==V;){e=!1;f=void 0;try{Vh(a,c);}catch(h){e=!0,f=h;}e&&(null===V?x("178"):void 0,sh(V,f),null!==V&&(V=V.nextEffect));}if(null!==d&&null!==Ph){var g=Wh.bind(null,a,d);Qh=scheduler.unstable_runWithPriority(scheduler.unstable_NormalPriority,function(){return Ae(g)});Rh=g;}Kh=Oh=!1;"function"===typeof Qe&&Qe(b.stateNode);c=b.expirationTime;b=b.childExpirationTime;b=
  b>c?b:c;0===b&&(Fh=null);$h(a,b);}
  function ai(a){for(;;){var b=a.alternate,c=a.return,d=a.sibling;if(0===(a.effectTag&1024)){T=a;a:{var e=b;b=a;var f=U;var g=b.pendingProps;switch(b.tag){case 2:break;case 16:break;case 15:case 0:break;case 1:J(b.type)&&Ke();break;case 3:Kf();Le();g=b.stateNode;g.pendingContext&&(g.context=g.pendingContext,g.pendingContext=null);if(null===e||null===e.child)Eg(b),b.effectTag&=-3;mh(b);break;case 5:Mf(b);var h=If(Hf.current);f=b.type;if(null!==e&&null!=b.stateNode)nh(e,b,f,g,h),e.ref!==b.ref&&(b.effectTag|=
  128);else if(g){var l=If(N.current);if(Eg(b)){g=b;e=g.stateNode;var k=g.type,m=g.memoizedProps,p=h;e[Fa]=g;e[Ga]=m;f=void 0;h=k;switch(h){case "iframe":case "object":E("load",e);break;case "video":case "audio":for(k=0;k<ab.length;k++)E(ab[k],e);break;case "source":E("error",e);break;case "img":case "image":case "link":E("error",e);E("load",e);break;case "form":E("reset",e);E("submit",e);break;case "details":E("toggle",e);break;case "input":wc(e,m);E("invalid",e);se(p,"onChange");break;case "select":e._wrapperState=
  {wasMultiple:!!m.multiple};E("invalid",e);se(p,"onChange");break;case "textarea":ce(e,m),E("invalid",e),se(p,"onChange");}qe(h,m);k=null;for(f in m)m.hasOwnProperty(f)&&(l=m[f],"children"===f?"string"===typeof l?e.textContent!==l&&(k=["children",l]):"number"===typeof l&&e.textContent!==""+l&&(k=["children",""+l]):ra.hasOwnProperty(f)&&null!=l&&se(p,f));switch(h){case "input":Rb(e);Ac(e,m,!0);break;case "textarea":Rb(e);ee(e);break;case "select":case "option":break;default:"function"===typeof m.onClick&&
  (e.onclick=te);}f=k;g.updateQueue=f;g=null!==f?!0:!1;g&&kh(b);}else {m=b;e=f;p=g;k=9===h.nodeType?h:h.ownerDocument;l===fe.html&&(l=ge(e));l===fe.html?"script"===e?(e=k.createElement("div"),e.innerHTML="<script>\x3c/script>",k=e.removeChild(e.firstChild)):"string"===typeof p.is?k=k.createElement(e,{is:p.is}):(k=k.createElement(e),"select"===e&&p.multiple&&(k.multiple=!0)):k=k.createElementNS(l,e);e=k;e[Fa]=m;e[Ga]=g;lh(e,b,!1,!1);p=e;k=f;m=g;var t=h,A=re(k,m);switch(k){case "iframe":case "object":E("load",
  p);h=m;break;case "video":case "audio":for(h=0;h<ab.length;h++)E(ab[h],p);h=m;break;case "source":E("error",p);h=m;break;case "img":case "image":case "link":E("error",p);E("load",p);h=m;break;case "form":E("reset",p);E("submit",p);h=m;break;case "details":E("toggle",p);h=m;break;case "input":wc(p,m);h=vc(p,m);E("invalid",p);se(t,"onChange");break;case "option":h=$d(p,m);break;case "select":p._wrapperState={wasMultiple:!!m.multiple};h=objectAssign({},m,{value:void 0});E("invalid",p);se(t,"onChange");break;case "textarea":ce(p,
  m);h=be(p,m);E("invalid",p);se(t,"onChange");break;default:h=m;}qe(k,h);l=void 0;var v=k,R=p,u=h;for(l in u)if(u.hasOwnProperty(l)){var q=u[l];"style"===l?oe(R,q):"dangerouslySetInnerHTML"===l?(q=q?q.__html:void 0,null!=q&&je(R,q)):"children"===l?"string"===typeof q?("textarea"!==v||""!==q)&&ke(R,q):"number"===typeof q&&ke(R,""+q):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ra.hasOwnProperty(l)?null!=q&&se(t,l):null!=q&&tc(R,l,q,A));}switch(k){case "input":Rb(p);
  Ac(p,m,!1);break;case "textarea":Rb(p);ee(p);break;case "option":null!=m.value&&p.setAttribute("value",""+uc(m.value));break;case "select":h=p;h.multiple=!!m.multiple;p=m.value;null!=p?ae(h,!!m.multiple,p,!1):null!=m.defaultValue&&ae(h,!!m.multiple,m.defaultValue,!0);break;default:"function"===typeof h.onClick&&(p.onclick=te);}(g=we(f,g))&&kh(b);b.stateNode=e;}null!==b.ref&&(b.effectTag|=128);}else null===b.stateNode?x("166"):void 0;break;case 6:e&&null!=b.stateNode?oh(e,b,e.memoizedProps,g):("string"!==
  typeof g&&(null===b.stateNode?x("166"):void 0),e=If(Hf.current),If(N.current),Eg(b)?(g=b,f=g.stateNode,e=g.memoizedProps,f[Fa]=g,(g=f.nodeValue!==e)&&kh(b)):(f=b,g=(9===e.nodeType?e:e.ownerDocument).createTextNode(g),g[Fa]=b,f.stateNode=g));break;case 11:break;case 13:g=b.memoizedState;if(0!==(b.effectTag&64)){b.expirationTime=f;T=b;break a}g=null!==g;f=null!==e&&null!==e.memoizedState;null!==e&&!g&&f&&(e=e.child.sibling,null!==e&&(h=b.firstEffect,null!==h?(b.firstEffect=e,e.nextEffect=h):(b.firstEffect=
  b.lastEffect=e,e.nextEffect=null),e.effectTag=8));if(g||f)b.effectTag|=4;break;case 7:break;case 8:break;case 12:break;case 4:Kf();mh(b);break;case 10:Zg(b);break;case 9:break;case 14:break;case 17:J(b.type)&&Ke();break;case 18:break;default:x("156");}T=null;}b=a;if(1===U||1!==b.childExpirationTime){g=0;for(f=b.child;null!==f;)e=f.expirationTime,h=f.childExpirationTime,e>g&&(g=e),h>g&&(g=h),f=f.sibling;b.childExpirationTime=g;}if(null!==T)return T;null!==c&&0===(c.effectTag&1024)&&(null===c.firstEffect&&
  (c.firstEffect=a.firstEffect),null!==a.lastEffect&&(null!==c.lastEffect&&(c.lastEffect.nextEffect=a.firstEffect),c.lastEffect=a.lastEffect),1<a.effectTag&&(null!==c.lastEffect?c.lastEffect.nextEffect=a:c.firstEffect=a,c.lastEffect=a));}else {a=Gh(a);if(null!==a)return a.effectTag&=1023,a;null!==c&&(c.firstEffect=c.lastEffect=null,c.effectTag|=1024);}if(null!==d)return d;if(null!==c)a=c;else break}return null}
  function bi(a){var b=Tg(a.alternate,a,U);a.memoizedProps=a.pendingProps;null===b&&(b=ai(a));Ih.current=null;return b}
  function ci(a,b){Kh?x("243"):void 0;of();Kh=!0;var c=Hh.current;Hh.current=kg;var d=a.nextExpirationTimeToWorkOn;if(d!==U||a!==Lh||null===T)Sh(),Lh=a,U=d,T=Xe(Lh.current,null),a.pendingCommitExpirationTime=0;var e=!1;do{try{if(b)for(;null!==T&&!di();)T=bi(T);else for(;null!==T;)T=bi(T);}catch(u){if(Yg=Xg=Wg=null,lg(),null===T)e=!0,Dh(u);else {null===T?x("271"):void 0;var f=T,g=f.return;if(null===g)e=!0,Dh(u);else {a:{var h=a,l=g,k=f,m=u;g=U;k.effectTag|=1024;k.firstEffect=k.lastEffect=null;if(null!==
  m&&"object"===typeof m&&"function"===typeof m.then){var p=m;m=l;var t=-1,A=-1;do{if(13===m.tag){var v=m.alternate;if(null!==v&&(v=v.memoizedState,null!==v)){A=10*(1073741822-v.timedOutAt);break}v=m.pendingProps.maxDuration;if("number"===typeof v)if(0>=v)t=0;else if(-1===t||v<t)t=v;}m=m.return;}while(null!==m);m=l;do{if(v=13===m.tag)v=void 0===m.memoizedProps.fallback?!1:null===m.memoizedState;if(v){l=m.updateQueue;null===l?(l=new Set,l.add(p),m.updateQueue=l):l.add(p);if(0===(m.mode&1)){m.effectTag|=
  64;k.effectTag&=-1957;1===k.tag&&(null===k.alternate?k.tag=17:(g=nf(1073741823),g.tag=sf,pf(k,g)));k.expirationTime=1073741823;break a}k=h;l=g;var R=k.pingCache;null===R?(R=k.pingCache=new Bh,v=new Set,R.set(p,v)):(v=R.get(p),void 0===v&&(v=new Set,R.set(p,v)));v.has(l)||(v.add(l),k=ei.bind(null,k,p,l),p.then(k,k));-1===t?h=1073741823:(-1===A&&(A=10*(1073741822-gf(h,g))-5E3),h=A+t);0<=h&&Mh<h&&(Mh=h);m.effectTag|=2048;m.expirationTime=g;break a}m=m.return;}while(null!==m);m=Error((ic(k.type)||"A React component")+
  " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display."+jc(k));}Nh=!0;m=jh(m,k);h=l;do{switch(h.tag){case 3:h.effectTag|=2048;h.expirationTime=g;g=Ch(h,m,g);eh(h,g);break a;case 1:if(t=m,A=h.type,k=h.stateNode,0===(h.effectTag&64)&&("function"===typeof A.getDerivedStateFromError||null!==k&&"function"===typeof k.componentDidCatch&&(null===Fh||!Fh.has(k)))){h.effectTag|=2048;
  h.expirationTime=g;g=Eh(h,t,g);eh(h,g);break a}}h=h.return;}while(null!==h)}T=ai(f);continue}}}break}while(1);Kh=!1;Hh.current=c;Yg=Xg=Wg=null;lg();if(e)Lh=null,a.finishedWork=null;else if(null!==T)a.finishedWork=null;else {c=a.current.alternate;null===c?x("281"):void 0;Lh=null;if(Nh){e=a.latestPendingTime;f=a.latestSuspendedTime;g=a.latestPingedTime;if(0!==e&&e<d||0!==f&&f<d||0!==g&&g<d){ff(a,d);fi(a,c,d,a.expirationTime,-1);return}if(!a.didError&&b){a.didError=!0;d=a.nextExpirationTimeToWorkOn=d;
  b=a.expirationTime=1073741823;fi(a,c,d,b,-1);return}}b&&-1!==Mh?(ff(a,d),b=10*(1073741822-gf(a,d)),b<Mh&&(Mh=b),b=10*(1073741822-lf()),b=Mh-b,fi(a,c,d,a.expirationTime,0>b?0:b)):(a.pendingCommitExpirationTime=d,a.finishedWork=c);}}
  function sh(a,b){for(var c=a.return;null!==c;){switch(c.tag){case 1:var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Fh||!Fh.has(d))){a=jh(b,a);a=Eh(c,a,1073741823);pf(c,a);qf(c,1073741823);return}break;case 3:a=jh(b,a);a=Ch(c,a,1073741823);pf(c,a);qf(c,1073741823);return}c=c.return;}3===a.tag&&(c=jh(b,a),c=Ch(a,c,1073741823),pf(a,c),qf(a,1073741823));}
  function mf(a,b){var c=scheduler.unstable_getCurrentPriorityLevel(),d=void 0;if(0===(b.mode&1))d=1073741823;else if(Kh&&!Oh)d=U;else {switch(c){case scheduler.unstable_ImmediatePriority:d=1073741823;break;case scheduler.unstable_UserBlockingPriority:d=1073741822-10*(((1073741822-a+15)/10|0)+1);break;case scheduler.unstable_NormalPriority:d=1073741822-25*(((1073741822-a+500)/25|0)+1);break;case scheduler.unstable_LowPriority:case scheduler.unstable_IdlePriority:d=1;break;default:x("313");}null!==Lh&&d===U&&--d;}c===scheduler.unstable_UserBlockingPriority&&
  (0===gi||d<gi)&&(gi=d);return d}function ei(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);if(null!==Lh&&U===c)Lh=null;else if(b=a.earliestSuspendedTime,d=a.latestSuspendedTime,0!==b&&c<=b&&c>=d){a.didError=!1;b=a.latestPingedTime;if(0===b||b>c)a.latestPingedTime=c;df(c,a);c=a.expirationTime;0!==c&&Xh(a,c);}}function Ah(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=lf();b=mf(b,a);a=hi(a,b);null!==a&&(cf(a,b),b=a.expirationTime,0!==b&&Xh(a,b));}
  function hi(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);var d=a.return,e=null;if(null===d&&3===a.tag)e=a.stateNode;else for(;null!==d;){c=d.alternate;d.childExpirationTime<b&&(d.childExpirationTime=b);null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);if(null===d.return&&3===d.tag){e=d.stateNode;break}d=d.return;}return e}
  function qf(a,b){a=hi(a,b);null!==a&&(!Kh&&0!==U&&b>U&&Sh(),cf(a,b),Kh&&!Oh&&Lh===a||Xh(a,a.expirationTime),ii>ji&&(ii=0,x("185")));}function ki(a,b,c,d,e){return scheduler.unstable_runWithPriority(scheduler.unstable_ImmediatePriority,function(){return a(b,c,d,e)})}var li=null,Y=null,mi=0,ni=void 0,W=!1,oi=null,Z=0,gi=0,pi=!1,qi=null,X=!1,ri=!1,si=null,ti=scheduler.unstable_now(),ui=1073741822-(ti/10|0),vi=ui,ji=50,ii=0,wi=null;function xi(){ui=1073741822-((scheduler.unstable_now()-ti)/10|0);}
  function yi(a,b){if(0!==mi){if(b<mi)return;null!==ni&&scheduler.unstable_cancelCallback(ni);}mi=b;a=scheduler.unstable_now()-ti;ni=scheduler.unstable_scheduleCallback(zi,{timeout:10*(1073741822-b)-a});}function fi(a,b,c,d,e){a.expirationTime=d;0!==e||di()?0<e&&(a.timeoutHandle=ye(Ai.bind(null,a,b,c),e)):(a.pendingCommitExpirationTime=c,a.finishedWork=b);}function Ai(a,b,c){a.pendingCommitExpirationTime=c;a.finishedWork=b;xi();vi=ui;Bi(a,c);}function $h(a,b){a.expirationTime=b;a.finishedWork=null;}
  function lf(){if(W)return vi;Ci();if(0===Z||1===Z)xi(),vi=ui;return vi}function Xh(a,b){null===a.nextScheduledRoot?(a.expirationTime=b,null===Y?(li=Y=a,a.nextScheduledRoot=a):(Y=Y.nextScheduledRoot=a,Y.nextScheduledRoot=li)):b>a.expirationTime&&(a.expirationTime=b);W||(X?ri&&(oi=a,Z=1073741823,Di(a,1073741823,!1)):1073741823===b?Yh(1073741823,!1):yi(a,b));}
  function Ci(){var a=0,b=null;if(null!==Y)for(var c=Y,d=li;null!==d;){var e=d.expirationTime;if(0===e){null===c||null===Y?x("244"):void 0;if(d===d.nextScheduledRoot){li=Y=d.nextScheduledRoot=null;break}else if(d===li)li=e=d.nextScheduledRoot,Y.nextScheduledRoot=e,d.nextScheduledRoot=null;else if(d===Y){Y=c;Y.nextScheduledRoot=li;d.nextScheduledRoot=null;break}else c.nextScheduledRoot=d.nextScheduledRoot,d.nextScheduledRoot=null;d=c.nextScheduledRoot;}else {e>a&&(a=e,b=d);if(d===Y)break;if(1073741823===
  a)break;c=d;d=d.nextScheduledRoot;}}oi=b;Z=a;}var Ei=!1;function di(){return Ei?!0:scheduler.unstable_shouldYield()?Ei=!0:!1}function zi(){try{if(!di()&&null!==li){xi();var a=li;do{var b=a.expirationTime;0!==b&&ui<=b&&(a.nextExpirationTimeToWorkOn=ui);a=a.nextScheduledRoot;}while(a!==li)}Yh(0,!0);}finally{Ei=!1;}}
  function Yh(a,b){Ci();if(b)for(xi(),vi=ui;null!==oi&&0!==Z&&a<=Z&&!(Ei&&ui>Z);)Di(oi,Z,ui>Z),Ci(),xi(),vi=ui;else for(;null!==oi&&0!==Z&&a<=Z;)Di(oi,Z,!1),Ci();b&&(mi=0,ni=null);0!==Z&&yi(oi,Z);ii=0;wi=null;if(null!==si)for(a=si,si=null,b=0;b<a.length;b++){var c=a[b];try{c._onComplete();}catch(d){pi||(pi=!0,qi=d);}}if(pi)throw a=qi,qi=null,pi=!1,a;}function Bi(a,b){W?x("253"):void 0;oi=a;Z=b;Di(a,b,!1);Yh(1073741823,!1);}
  function Di(a,b,c){W?x("245"):void 0;W=!0;if(c){var d=a.finishedWork;null!==d?Fi(a,d,b):(a.finishedWork=null,d=a.timeoutHandle,-1!==d&&(a.timeoutHandle=-1,ze(d)),ci(a,c),d=a.finishedWork,null!==d&&(di()?a.finishedWork=d:Fi(a,d,b)));}else d=a.finishedWork,null!==d?Fi(a,d,b):(a.finishedWork=null,d=a.timeoutHandle,-1!==d&&(a.timeoutHandle=-1,ze(d)),ci(a,c),d=a.finishedWork,null!==d&&Fi(a,d,b));W=!1;}
  function Fi(a,b,c){var d=a.firstBatch;if(null!==d&&d._expirationTime>=c&&(null===si?si=[d]:si.push(d),d._defer)){a.finishedWork=b;a.expirationTime=0;return}a.finishedWork=null;a===wi?ii++:(wi=a,ii=0);scheduler.unstable_runWithPriority(scheduler.unstable_ImmediatePriority,function(){Zh(a,b);});}function Dh(a){null===oi?x("246"):void 0;oi.expirationTime=0;pi||(pi=!0,qi=a);}function Gi(a,b){var c=X;X=!0;try{return a(b)}finally{(X=c)||W||Yh(1073741823,!1);}}
  function Hi(a,b){if(X&&!ri){ri=!0;try{return a(b)}finally{ri=!1;}}return a(b)}function Ii(a,b,c){X||W||0===gi||(Yh(gi,!1),gi=0);var d=X;X=!0;try{return scheduler.unstable_runWithPriority(scheduler.unstable_UserBlockingPriority,function(){return a(b,c)})}finally{(X=d)||W||Yh(1073741823,!1);}}
  function Ji(a,b,c,d,e){var f=b.current;a:if(c){c=c._reactInternalFiber;b:{2===ed(c)&&1===c.tag?void 0:x("170");var g=c;do{switch(g.tag){case 3:g=g.stateNode.context;break b;case 1:if(J(g.type)){g=g.stateNode.__reactInternalMemoizedMergedChildContext;break b}}g=g.return;}while(null!==g);x("171");g=void 0;}if(1===c.tag){var h=c.type;if(J(h)){c=Ne(c,h,g);break a}}c=g;}else c=He;null===b.context?b.context=c:b.pendingContext=c;b=e;e=nf(d);e.payload={element:a};b=void 0===b?null:b;null!==b&&(e.callback=b);
  of();pf(f,e);qf(f,d);return d}function Ki(a,b,c,d){var e=b.current,f=lf();e=mf(f,e);return Ji(a,b,c,e,d)}function Li(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function Mi(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return {$$typeof:Wb,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
  Ab=function(a,b,c){switch(b){case "input":yc(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Ka(d);e?void 0:x("90");Sb(d);yc(d,e);}}}break;case "textarea":de(a,c);break;case "select":b=c.value,null!=b&&ae(a,!!c.multiple,b,!1);}};
  function Ni(a){var b=1073741822-25*(((1073741822-lf()+500)/25|0)+1);b>=Jh&&(b=Jh-1);this._expirationTime=Jh=b;this._root=a;this._callbacks=this._next=null;this._hasChildren=this._didComplete=!1;this._children=null;this._defer=!0;}Ni.prototype.render=function(a){this._defer?void 0:x("250");this._hasChildren=!0;this._children=a;var b=this._root._internalRoot,c=this._expirationTime,d=new Oi;Ji(a,b,null,c,d._onCommit);return d};
  Ni.prototype.then=function(a){if(this._didComplete)a();else {var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a);}};
  Ni.prototype.commit=function(){var a=this._root._internalRoot,b=a.firstBatch;this._defer&&null!==b?void 0:x("251");if(this._hasChildren){var c=this._expirationTime;if(b!==this){this._hasChildren&&(c=this._expirationTime=b._expirationTime,this.render(this._children));for(var d=null,e=b;e!==this;)d=e,e=e._next;null===d?x("251"):void 0;d._next=e._next;this._next=b;a.firstBatch=this;}this._defer=!1;Bi(a,c);b=this._next;this._next=null;b=a.firstBatch=b;null!==b&&b._hasChildren&&b.render(b._children);}else this._next=
  null,this._defer=!1;};Ni.prototype._onComplete=function(){if(!this._didComplete){this._didComplete=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++)(0, a[b])();}};function Oi(){this._callbacks=null;this._didCommit=!1;this._onCommit=this._onCommit.bind(this);}Oi.prototype.then=function(a){if(this._didCommit)a();else {var b=this._callbacks;null===b&&(b=this._callbacks=[]);b.push(a);}};
  Oi.prototype._onCommit=function(){if(!this._didCommit){this._didCommit=!0;var a=this._callbacks;if(null!==a)for(var b=0;b<a.length;b++){var c=a[b];"function"!==typeof c?x("191",c):void 0;c();}}};
  function Pi(a,b,c){b=K(3,null,null,b?3:0);a={current:b,containerInfo:a,pendingChildren:null,pingCache:null,earliestPendingTime:0,latestPendingTime:0,earliestSuspendedTime:0,latestSuspendedTime:0,latestPingedTime:0,didError:!1,pendingCommitExpirationTime:0,finishedWork:null,timeoutHandle:-1,context:null,pendingContext:null,hydrate:c,nextExpirationTimeToWorkOn:0,expirationTime:0,firstBatch:null,nextScheduledRoot:null};this._internalRoot=b.stateNode=a;}
  Pi.prototype.render=function(a,b){var c=this._internalRoot,d=new Oi;b=void 0===b?null:b;null!==b&&d.then(b);Ki(a,c,null,d._onCommit);return d};Pi.prototype.unmount=function(a){var b=this._internalRoot,c=new Oi;a=void 0===a?null:a;null!==a&&c.then(a);Ki(null,b,null,c._onCommit);return c};Pi.prototype.legacy_renderSubtreeIntoContainer=function(a,b,c){var d=this._internalRoot,e=new Oi;c=void 0===c?null:c;null!==c&&e.then(c);Ki(b,d,a,e._onCommit);return e};
  Pi.prototype.createBatch=function(){var a=new Ni(this),b=a._expirationTime,c=this._internalRoot,d=c.firstBatch;if(null===d)c.firstBatch=a,a._next=null;else {for(c=null;null!==d&&d._expirationTime>=b;)c=d,d=d._next;a._next=d;null!==c&&(c._next=a);}return a};function Qi(a){return !(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}Gb=Gi;Hb=Ii;Ib=function(){W||0===gi||(Yh(gi,!1),gi=0);};
  function Ri(a,b){b||(b=a?9===a.nodeType?a.documentElement:a.firstChild:null,b=!(!b||1!==b.nodeType||!b.hasAttribute("data-reactroot")));if(!b)for(var c;c=a.lastChild;)a.removeChild(c);return new Pi(a,!1,b)}
  function Si(a,b,c,d,e){var f=c._reactRootContainer;if(f){if("function"===typeof e){var g=e;e=function(){var a=Li(f._internalRoot);g.call(a);};}null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e);}else {f=c._reactRootContainer=Ri(c,d);if("function"===typeof e){var h=e;e=function(){var a=Li(f._internalRoot);h.call(a);};}Hi(function(){null!=a?f.legacy_renderSubtreeIntoContainer(a,b,e):f.render(b,e);});}return Li(f._internalRoot)}
  function Ti(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;Qi(b)?void 0:x("200");return Mi(a,b,null,c)}
  var Vi={createPortal:Ti,findDOMNode:function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternalFiber;void 0===b&&("function"===typeof a.render?x("188"):x("268",Object.keys(a)));a=hd(b);a=null===a?null:a.stateNode;return a},hydrate:function(a,b,c){Qi(b)?void 0:x("200");return Si(null,a,b,!0,c)},render:function(a,b,c){Qi(b)?void 0:x("200");return Si(null,a,b,!1,c)},unstable_renderSubtreeIntoContainer:function(a,b,c,d){Qi(c)?void 0:x("200");null==a||void 0===a._reactInternalFiber?
  x("38"):void 0;return Si(a,b,c,!1,d)},unmountComponentAtNode:function(a){Qi(a)?void 0:x("40");return a._reactRootContainer?(Hi(function(){Si(null,null,a,!1,function(){a._reactRootContainer=null;});}),!0):!1},unstable_createPortal:function(){return Ti.apply(void 0,arguments)},unstable_batchedUpdates:Gi,unstable_interactiveUpdates:Ii,flushSync:function(a,b){W?x("187"):void 0;var c=X;X=!0;try{return ki(a,b)}finally{X=c,Yh(1073741823,!1);}},unstable_createRoot:Ui,unstable_flushControlled:function(a){var b=
  X;X=!0;try{ki(a);}finally{(X=b)||W||Yh(1073741823,!1);}},__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{Events:[Ia,Ja,Ka,Ba.injectEventPluginsByName,pa,Qa,function(a){ya(a,Pa);},Eb,Fb,Dd,Da]}};function Ui(a,b){Qi(a)?void 0:x("299","unstable_createRoot");return new Pi(a,!0,null!=b&&!0===b.hydrate)}
  (function(a){var b=a.findFiberByHostInstance;return Te(objectAssign({},a,{overrideProps:null,currentDispatcherRef:Tb.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=hd(a);return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null}}))})({findFiberByHostInstance:Ha,bundleType:0,version:"16.8.2",rendererPackageName:"react-dom"});var Wi={default:Vi},Xi=Wi&&Vi||Wi;var reactDom_production_min=Xi.default||Xi;

  var reactDom = createCommonjsModule(function (module) {

  function checkDCE() {
    /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
    ) {
      return;
    }
    try {
      // Verify that the code above has been dead code eliminated (DCE'd).
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
    } catch (err) {
      // DevTools shouldn't crash React, no matter what.
      // We should still report in case we break this code.
      console.error(err);
    }
  }

  {
    // DCE check should happen before ReactDOM bundle executes so that
    // DevTools can report bad minification during injection.
    checkDCE();
    module.exports = reactDom_production_min;
  }
  });
  reactDom.createPortal;
  reactDom.findDOMNode;
  reactDom.hydrate;
  var reactDom_4 = reactDom.render;
  reactDom.unstable_renderSubtreeIntoContainer;
  reactDom.unmountComponentAtNode;
  reactDom.unstable_createPortal;
  reactDom.unstable_batchedUpdates;
  reactDom.unstable_interactiveUpdates;
  reactDom.flushSync;
  reactDom.unstable_createRoot;
  reactDom.unstable_flushControlled;
  reactDom.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

  /*! *****************************************************************************
  Copyright (c) Microsoft Corporation.

  Permission to use, copy, modify, and/or distribute this software for any
  purpose with or without fee is hereby granted.

  THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
  REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
  AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
  INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
  LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
  OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
  PERFORMANCE OF THIS SOFTWARE.
  ***************************************************************************** */
  /* global Reflect, Promise */

  var extendStatics = function(d, b) {
      extendStatics = Object.setPrototypeOf ||
          ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
          function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
      return extendStatics(d, b);
  };

  function __extends(d, b) {
      if (typeof b !== "function" && b !== null)
          throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
      extendStatics(d, b);
      function __() { this.constructor = d; }
      d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  }

  var __assign = function() {
      __assign = Object.assign || function __assign(t) {
          for (var s, i = 1, n = arguments.length; i < n; i++) {
              s = arguments[i];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
          return t;
      };
      return __assign.apply(this, arguments);
  };

  function __rest(s, e) {
      var t = {};
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
          t[p] = s[p];
      if (s != null && typeof Object.getOwnPropertySymbols === "function")
          for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
              if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                  t[p[i]] = s[p[i]];
          }
      return t;
  }

  function __spreadArray(to, from, pack) {
      if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
          if (ar || !(i in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i);
              ar[i] = from[i];
          }
      }
      return to.concat(ar || from);
  }

  var entityLoop_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.entityLoop = void 0;
  function entityLoop(entities, fn) {
      var ents = [];
      if (Array.isArray(entities)) {
          entities.forEach(function (ent) {
              fn(ent) && ents.push(ent);
          });
      }
      else {
          Object.keys(entities).forEach(function (entID) {
              fn(entities[+entID]) && ents.push(entities[+entID]);
          });
      }
      return ents;
  }
  exports.entityLoop = entityLoop;
  exports.default = entityLoop;
  });

  unwrapExports(entityLoop_1);
  entityLoop_1.entityLoop;

  var Group_1 = createCommonjsModule(function (module, exports) {
  var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  };
  var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
      return to;
  };
  var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var entityLoop_1$1 = __importDefault(entityLoop_1);
  // life cycle of a group!
  // 1. Adding a component adds a group with that one component.
  // 2. Adding 2nd component creates a group with that 2nd component
  // 3. Querying for a list of components should create an group for that list, one off.
  // 4. Adding and removing components will update the above lists as needed.
  var Group = /** @class */ (function () {
      function Group(components, entities, array) {
          if (entities === void 0) { entities = {}; }
          if (array === void 0) { array = []; }
          this.components = components;
          this.entities = entities;
          this.array = array;
      }
      Group.reset = function () {
          Group.groups = {};
      };
      Group.generateGroupKey = function (compNames) {
          var names = [];
          for (var count = 0; count < compNames.length; count++) {
              var name_1 = compNames[count];
              names.push(name_1);
          }
          return names
              .map(function (x) {
              return x.toLowerCase();
          })
              .sort()
              .join('-');
      };
      Group.getGroup = function (compNames) {
          var key = Group.generateGroupKey(compNames);
          return Group.groups[key] || {};
      };
      Group.indexGroup = function (compNames, entities) {
          var compArray = [];
          if (typeof compNames === 'string') {
              compArray = [compNames];
          }
          else {
              compArray = compNames;
          }
          var key = Group.generateGroupKey(compArray);
          var group;
          // if group already exists, return it
          if (Group.groups[key]) {
              return;
          }
          else {
              group = Group.groups[key] = new Group(compArray);
          }
          // insert the provided entities into this group...
          entityLoop_1$1.default(entities, function (entity) {
              if (entity.hasComponents(compArray)) {
                  group.entities[entity.id] = entity;
                  group.array = __spreadArray(__spreadArray([], __read(group.array)), [entity]);
              }
          });
          return group;
      };
      Group.groups = {};
      return Group;
  }());
  exports.default = Group;
  });

  unwrapExports(Group_1);

  var spliceOne_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var spliceOne = function (arr, index) {
      if (index === void 0) { index = 0; }
      var idx = index;
      var len = arr.length;
      if (!len || idx >= len) {
          return;
      }
      while (idx < len) {
          arr[idx] = arr[idx + 1];
          idx++;
      }
      arr.length--;
  };
  exports.default = spliceOne;
  });

  unwrapExports(spliceOne_1);

  var Entity_1 = createCommonjsModule(function (module, exports) {
  var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var Group_1$1 = __importDefault(Group_1);
  var entityLoop_1$1 = __importDefault(entityLoop_1);
  var spliceOne_1$1 = __importDefault(spliceOne_1);
  var Entity = /** @class */ (function () {
      function Entity(classRef) {
          this.id = Entity.counter;
          // @ts-ignore TODO can this be improved?
          this.constructor = classRef;
          this.components = {};
          Entity.entities[this.id] = this;
          Entity.counter++;
      }
      Entity.reset = function () {
          entityLoop_1$1.default(Entity.entities, function (entity) {
              entity.destroy();
          });
          Group_1$1.default.reset();
      };
      Entity.getByComps = function (components, type) {
          if (type === void 0) { type = 'array'; }
          var compNames = components;
          Group_1$1.default.indexGroup(components, Entity.entities);
          var group = Group_1$1.default.getGroup(compNames);
          return type === 'map' ? group.entities : group.array.concat();
      };
      Entity.getByComp = function (compName, type) {
          return Entity.getByComps([compName]);
      };
      Entity.prototype.assignGroup = function (group) {
          group.entities[this.id] = this;
      };
      // A component is added
      // we create a new group index, for exm
      Entity.prototype.addComponent = function (component) {
          this.components[component.name] = component;
          // @ts-ignore TODO can this be improved?
          this[component.name] = component;
          // creates an index group if it does not exist..
          var arr = [];
          for (var compName in this.components) {
              if (this.components.hasOwnProperty(compName)) {
                  arr.push(compName);
              }
          }
          Group_1$1.default.indexGroup(arr, Entity.entities);
          // we need to see if we need to add entity into other groups.
          for (var groupKey in Group_1$1.default.groups) {
              if (!Group_1$1.default.groups.hasOwnProperty(groupKey)) {
                  continue;
              }
              var group = Group_1$1.default.groups[groupKey];
              // if the ent is in this group, skip.
              if (group.entities[this.id]) {
                  continue;
              }
              // if the component is not in this group, skip.
              if (group.components.indexOf(component.name) === -1) {
                  continue;
              }
              // if this ent does not have all the other comps, skip..
              if (this.hasComponents(group.components)) {
                  this.assignGroup(group);
                  var newGroup = this.copyArray(group);
                  group.array = this.extendGroup(newGroup);
              }
          }
      };
      // that's not really copying the array now is it?
      Entity.prototype.copyArray = function (group) {
          return group.array;
      };
      Entity.prototype.extendGroup = function (newGroup) {
          newGroup[newGroup.length] = this;
          return newGroup;
      };
      // mixed, an actual component or just component name
      Entity.prototype.removeComponent = function (comp) {
          var component = this.components[comp] || comp;
          if (!component || typeof component === 'string') {
              return;
          }
          var compName = component.name;
          // we need to see if we need to remove entity from other groups
          for (var groupKey in Group_1$1.default.groups) {
              if (!Group_1$1.default.groups.hasOwnProperty(groupKey)) {
                  continue;
              }
              var group = Group_1$1.default.groups[groupKey];
              // if the ent is in this group, skip.
              var compInGroup = group.components.indexOf(component.name) > -1;
              var entHasReqComps = this.hasComponents(group.components);
              // if this ent does not have all the other comps, skip..
              if (group.entities[this.id] && compInGroup && entHasReqComps) {
                  delete group.entities[this.id];
                  spliceOne_1$1.default(group.array, group.array.indexOf(this));
              }
          }
          delete this.components[compName];
          // @ts-ignore, TODO can we provide types for component properties on the Entity? Entity['MY_COMP']
          delete this[compName];
      };
      /**
       * Destroying an entity means removing all its components and deleting it from the Entity Object
       */
      Entity.prototype.destroy = function () {
          var _this = this;
          Object.keys(this.components).forEach(function (compName) {
              _this.removeComponent(_this.components[compName]);
          });
          delete Entity.entities[this.id];
      };
      Entity.prototype.normalizeToArray = function (compNames) {
          if (typeof compNames === 'string') {
              return [compNames];
          }
          if (!compNames) {
              return [];
          }
          if (compNames instanceof Array) {
              return compNames;
          }
      };
      Entity.prototype.hasComponents = function (compNames) {
          var _this = this;
          this.normalizeToArray(compNames);
          if (!compNames) {
              return false;
          }
          // quick breakout if single
          if (typeof compNames === 'string') {
              if (this.components[compNames]) {
                  return true;
              }
              else {
                  return false;
              }
          }
          else {
              return compNames.reduce(function (agg, compName) {
                  return agg && !!_this.components[compName];
              }, true);
          }
      };
      Entity.counter = 0;
      Entity.entities = {}; // TODO can this be improved?
      return Entity;
  }());
  window.Entity = Entity;
  exports.default = Entity;
  });

  unwrapExports(Entity_1);

  var ObjectPool_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var ObjectPool = /** @class */ (function () {
      function ObjectPool(PooledClass, incrementWhenEmpty) {
          if (incrementWhenEmpty === void 0) { incrementWhenEmpty = 10; }
          this.type = PooledClass;
          new this.type();
          this.freePool = [];
          this.stats = {
              free: 0,
              used: 0
          };
          this.incrementWhenEmpty = incrementWhenEmpty;
      }
      ObjectPool.prototype.reset = function () {
          this.freePool = [];
          this.stats = {
              free: 0,
              used: 0
          };
      };
      // Ensures the pool has at least $amount of free objects
      ObjectPool.prototype.generate = function (amount) {
          var count = amount - this.stats.free > 0 ? amount - this.stats.free : 0;
          // generate a gazzilion fighters?
          while (count > 0) {
              this.freePool.push(new this.type());
              count--;
          }
          this.stats.free = this.freePool.length;
      };
      // acquires an object, marks it as 'used'.
      ObjectPool.prototype.acquire = function () {
          if (this.freePool.length === 0) {
              this.generate(this.incrementWhenEmpty);
          }
          var obj = this.freePool.pop();
          this.stats.free = this.freePool.length;
          return obj;
      };
      // releases an object, marks it as free
      ObjectPool.prototype.release = function (object) {
          // prevent release twice
          if (this.freePool.indexOf(object) === -1) {
              this.freePool.push(object);
              this.stats.free = this.freePool.length;
          }
      };
      return ObjectPool;
  }());
  exports.default = ObjectPool;
  });

  unwrapExports(ObjectPool_1);

  var SelectedBox_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * Class that represents the current selected area by the user
   * Populated when the user click, holds and move the mouse
   */
  var SelectedBox = /** @class */ (function () {
      function SelectedBox() {
          this.reset();
      }
      SelectedBox.prototype.reset = function () {
          this.start = {
              x: 0,
              y: 0
          };
          this.end = {
              x: 0,
              y: 0
          };
      };
      SelectedBox.prototype.getData = function () {
          return {
              start: Object.assign({}, this.start),
              end: Object.assign({}, this.end),
              width: this.getWidth(),
              height: this.getHeight()
          };
      };
      SelectedBox.prototype.getHeight = function () {
          return this.end.y - this.start.y;
      };
      SelectedBox.prototype.getWidth = function () {
          return this.end.x - this.start.x;
      };
      SelectedBox.prototype.setStart = function (x, y) {
          this.start.x = x;
          this.start.y = y;
      };
      SelectedBox.prototype.setEnd = function (x, y) {
          this.end.x = x;
          this.end.y = y;
      };
      return SelectedBox;
  }());
  exports.default = SelectedBox;
  });

  unwrapExports(SelectedBox_1);

  var isPosInsideCircle_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  /**
   * Utility function to detect if a point is inside a circle
   * @param x
   * @param y
   * @param centerX
   * @param centerY
   * @param radius
   * @return {boolean}
   */
  function isPosInsideCircle(x, y, centerX, centerY, radius) {
      return Math.pow((x - centerX), 2) + Math.pow((y - centerY), 2) < Math.pow(radius, 2);
  }
  exports.default = isPosInsideCircle;
  });

  unwrapExports(isPosInsideCircle_1);

  var getShapesFromClick_1 = createCommonjsModule(function (module, exports) {
  var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var isPosInsideCircle_1$1 = __importDefault(isPosInsideCircle_1);
  /**
   * Function used for getting all shapes hit from a single click (not from a selection box)
   */
  function getShapesFromClick(shapes, layerName, x, y) {
      var hits = [];
      shapes.forEach(function (shape, id) {
          if (id === 'selectedBox') {
              return;
          }
          var shapeMetaData = shape.metaData || {};
          var shapeX = shapeMetaData.x;
          var shapeY = shapeMetaData.y;
          var radius = shapeMetaData.radius;
          var width = shapeMetaData.width;
          var height = shapeMetaData.height;
          var type = shapeMetaData.type;
          if (type === 'circle' && isPosInsideCircle_1$1.default(x, y, shapeX, shapeY, radius)) {
              hits.push({
                  id: id,
                  layerName: layerName
              });
          }
          else if (type === 'rect' || type === 'image') {
              if (x >= shapeX && x <= shapeX + width && y >= shapeY && y <= shapeY + height) {
                  hits.push({
                      id: id,
                      layerName: layerName
                  });
                  // do nothing, no support for non circles
              }
          }
          else ;
      });
      return hits;
  }
  exports.default = getShapesFromClick;
  });

  unwrapExports(getShapesFromClick_1);

  var getShapesInSelectionBox_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  function getShapesInSelectionBox(shapes, layerName, selectedData) {
      var minX = Math.min(selectedData.start.x, selectedData.end.x);
      var maxX = Math.max(selectedData.start.x, selectedData.end.x);
      var minY = Math.min(selectedData.start.y, selectedData.end.y);
      var maxY = Math.max(selectedData.start.y, selectedData.end.y);
      var hits = [];
      shapes.forEach(function (shape, id) {
          if (id === 'selectedBox') {
              return;
          }
          var shapeMetaData = shape.metaData || {};
          var shapeX = shapeMetaData.x;
          var shapeY = shapeMetaData.y;
          shapeMetaData.radius;
          var width = shapeMetaData.width;
          var height = shapeMetaData.height;
          var type = shapeMetaData.type;
          if (type === 'circle') {
              var centerX = shapeX;
              var centerY = shapeY;
              if (centerX >= minX && centerX <= maxX && centerY >= minY && centerY <= maxY) {
                  hits.push({
                      id: id,
                      layerName: layerName
                  });
              }
          }
          else if (type === 'rect' || type === 'image') {
              // what is considered the 'centerX' for a rect?
              var centerX = shapeX + width / 2;
              var centerY = shapeY + height / 2;
              if (centerX >= minX && centerX <= maxX && centerY >= minY && centerY <= maxY) {
                  hits.push({
                      id: id,
                      layerName: layerName
                  });
              }
          }
          else ;
      });
      return hits;
  }
  exports.default = getShapesInSelectionBox;
  });

  unwrapExports(getShapesInSelectionBox_1);

  var Shape_1 = createCommonjsModule(function (module, exports) {
  var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
      var extendStatics = function (d, b) {
          extendStatics = Object.setPrototypeOf ||
              ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
              function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
          return extendStatics(d, b);
      };
      return function (d, b) {
          if (typeof b !== "function" && b !== null)
              throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() { this.constructor = d; }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
  })();
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Circle = exports.Shape = void 0;
  var Shape = /** @class */ (function () {
      function Shape(renderFn, metaData) {
          if (metaData === void 0) { metaData = {}; }
          this.layerName = 'initial';
          this.render = renderFn;
          this.metaData = metaData;
      }
      return Shape;
  }());
  exports.Shape = Shape;
  var Circle = /** @class */ (function (_super) {
      __extends(Circle, _super);
      function Circle(id, x, y, radius, lineWidth, fillColor, color, ctx) {
          var _this = this;
          var shapeMetaData = { id: id, x: x, y: y, radius: radius, type: 'circle' };
          _this = _super.call(this, function () { return _this._render(); }, shapeMetaData) || this;
          _this.metaData = shapeMetaData;
          _this.id = id;
          _this.ctx = ctx;
          _this.x = x;
          _this.y = y;
          _this.radius = radius;
          _this.lineWidth = lineWidth;
          _this.fillColor = fillColor;
          _this.color = color;
          return _this;
      }
      Circle.prototype._render = function () {
          var _a = this, ctx = _a.ctx, lineWidth = _a.lineWidth, x = _a.x, y = _a.y, radius = _a.radius, fillColor = _a.fillColor, color = _a.color;
          ctx.strokeStyle = color;
          ctx.lineWidth = lineWidth;
          ctx.moveTo(x, y);
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          if (fillColor) {
              ctx.fillStyle = fillColor;
              ctx.fill();
          }
          ctx.stroke();
          ctx.closePath();
      };
      return Circle;
  }(Shape));
  exports.Circle = Circle;
  });

  unwrapExports(Shape_1);
  Shape_1.Circle;
  Shape_1.Shape;

  var CanvasAPI_1 = createCommonjsModule(function (module, exports) {
  /**
   * Library for working with Canvas,
   * Works by using a 2D context as an argument
   * Provides abstraction for some common shapes in Canvas
   */
  var __values = (commonjsGlobal && commonjsGlobal.__values) || function(o) {
      var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
      if (m) return m.call(o);
      if (o && typeof o.length === "number") return {
          next: function () {
              if (o && i >= o.length) o = void 0;
              return { value: o && o[i++], done: !o };
          }
      };
      throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
  };
  Object.defineProperty(exports, "__esModule", { value: true });

  var CanvasAPI = /** @class */ (function () {
      function CanvasAPI(ctx, strokeStyle) {
          if (strokeStyle === void 0) { strokeStyle = 'white'; }
          if (!ctx) {
              throw 'Cannot create layer, no initial context found';
          }
          this.layers = {
              initial: {
                  ctx: ctx,
                  shapes: new Map()
              }
          };
          this.defaultStrokeStyle = strokeStyle;
          ctx.strokeStyle = strokeStyle;
      }
      CanvasAPI.prototype.addLayer = function (name) {
          var originCanvas = this.layers.initial.ctx.canvas;
          var parentNode = originCanvas.parentNode;
          var newCanvas = originCanvas.cloneNode();
          newCanvas.id = name;
          parentNode.insertBefore(newCanvas, originCanvas);
          this.layers[name] = {
              ctx: newCanvas.getContext('2d'),
              shapes: new Map()
          };
      };
      CanvasAPI.prototype.removeLayer = function (name) {
          var originCanvas = this.layers.initial.ctx.canvas;
          var parentNode = originCanvas.parentNode;
          parentNode.querySelector("#" + name).remove();
          delete this.layers[name];
      };
      /**
       * Clears all the shapes
       */
      CanvasAPI.prototype.clear = function (layerName) {
          if (layerName === void 0) { layerName = 'initial'; }
          var layer = this.layers[layerName];
          layer.shapes = new Map();
      };
      CanvasAPI.prototype.clearAllLayers = function () {
          for (var layerName in this.layers) {
              if (!this.layers.hasOwnProperty(layerName)) {
                  continue;
              }
              this.clear(layerName);
          }
      };
      /**
       * Removes a shape by its ID
       * @param id
       * @param layerName
       */
      CanvasAPI.prototype.remove = function (id, layerName) {
          if (layerName === void 0) { layerName = 'initial'; }
          var layer = this.layers[layerName];
          var shapes = layer.shapes;
          shapes.delete(id);
      };
      /* istanbul ignore next */
      CanvasAPI.prototype.addImage = function (_a) {
          var id = _a.id, image = _a.image, // the image to display
          x = _a.x, y = _a.y, // pos for x,y..
          height = _a.height, width = _a.width, cropStartX = _a.cropStartX, cropStartY = _a.cropStartY, cropSizeX = _a.cropSizeX, cropSizeY = _a.cropSizeY, rotation = _a.rotation, // in radians
          _b = _a.layerName, // in radians
          layerName = _b === void 0 ? 'initial' : _b;
          var layer = this.layers[layerName];
          var ctx = layer.ctx;
          var shapes = layer.shapes;
          shapes.set(id, new Shape_1.Shape(function () {
              ctx.beginPath();
              ctx.save();
              ctx.translate(x + width / 2, y + height / 2);
              ctx.rotate(rotation);
              ctx.drawImage(image, cropStartX, cropStartY, cropSizeX, cropSizeY, -width / 2, -height / 2, // pos in canvas // at the top left of the canvas
              width, height); // size in canvas
              ctx.restore();
              ctx.closePath();
          }, {
              id: id,
              type: 'image',
              x: x,
              y: y,
              height: height,
              width: width
          }));
      };
      CanvasAPI.prototype.addShape = function (_a) {
          var id = _a.id, render = _a.render, _b = _a.layerName, layerName = _b === void 0 ? 'initial' : _b;
          var layer = this.layers[layerName];
          var ctx = layer.ctx;
          var shapes = layer.shapes;
          shapes.set(id, new Shape_1.Shape(function () {
              render(ctx);
          }));
      };
      CanvasAPI.prototype.writeBubble = function (_a) {
          var id = _a.id, text = _a.text, backgroundColor = _a.backgroundColor, borderColor = _a.borderColor, borderWidth = _a.borderWidth, fontSize = _a.fontSize, fontColor = _a.fontColor, x = _a.x, y = _a.y, fontFace = _a.fontFace, height = _a.height, width = _a.width, _b = _a.paddingLeft, paddingLeft = _b === void 0 ? 10 : _b, _c = _a.paddingTop, paddingTop = _c === void 0 ? 10 : _c, _d = _a.layerName, layerName = _d === void 0 ? 'initial' : _d;
          var longestTextWidth = 0;
          var linesOfText = text.split('\n');
          var fontPxSize = fontSize || +this.layers.initial.ctx.font.split('px')[0];
          var fontToUse = fontFace || +this.layers.initial.ctx.font.split('px')[1];
          // set it first for text-width calculations
          this.layers.initial.ctx.font = fontPxSize + "px " + fontToUse;
          for (var i = 0; i < linesOfText.length; i++) {
              var width_1 = this.layers[layerName].ctx.measureText(linesOfText[i]).width;
              longestTextWidth = width_1 > longestTextWidth ? width_1 : longestTextWidth;
          }
          this.addRect({
              id: "" + id,
              x: x,
              y: y,
              height: Math.max(height, linesOfText.length * fontPxSize + paddingTop * 2),
              width: Math.max(width, longestTextWidth + paddingLeft * 2 + borderWidth),
              fillColor: backgroundColor,
              lineWidth: borderWidth,
              strokeStyle: borderColor,
              layerName: layerName
          });
          for (var i = 0; i < linesOfText.length; i++) {
              this.write({
                  id: id + "-bubbleText-" + i,
                  text: linesOfText[i],
                  x: x + paddingLeft,
                  y: y + fontPxSize + paddingTop + i * fontPxSize,
                  fillStyle: fontColor,
                  font: fontPxSize + "px " + fontToUse,
                  layerName: layerName,
                  textBaseline: null,
                  strokeStyle: null
              });
          }
      };
      CanvasAPI.prototype.addRect = function (_a) {
          var id = _a.id, x = _a.x, y = _a.y, width = _a.width, height = _a.height, strokeStyle = _a.strokeStyle, lineWidth = _a.lineWidth, fillColor = _a.fillColor, _b = _a.layerName, layerName = _b === void 0 ? 'initial' : _b;
          var layer = this.layers[layerName];
          if (!layer) {
              throw "Could not find layer '" + layerName + "', are you sure you created the layer?";
          }
          var ctx = layer.ctx;
          var shapes = layer.shapes;
          shapes.set(id, new Shape_1.Shape(function () {
              ctx.strokeStyle = strokeStyle;
              ctx.lineWidth = lineWidth;
              ctx.beginPath();
              ctx.rect(x, y, width, height);
              if (fillColor) {
                  ctx.fillStyle = fillColor;
                  ctx.fill();
              }
              ctx.stroke();
              ctx.closePath();
          }, {
              id: id,
              type: 'rect',
              x: x,
              y: y,
              height: height,
              width: width
          }));
      };
      CanvasAPI.prototype.addArc = function (_a) {
          var id = _a.id, direction = _a.direction, size = _a.size, _b = _a.color, color = _b === void 0 ? 'black' : _b, fillColor = _a.fillColor, _c = _a.lineWidth, lineWidth = _c === void 0 ? 1 : _c, x = _a.x, y = _a.y, radius = _a.radius, _d = _a.layerName, layerName = _d === void 0 ? 'initial' : _d;
          var layer = this.layers[layerName];
          var ctx = layer.ctx;
          var shapes = layer.shapes;
          shapes.set(id, new Shape_1.Shape(function () {
              ctx.strokeStyle = color;
              ctx.lineWidth = lineWidth;
              var startArc = direction - (size / 2);
              var endArc = direction + (size / 2);
              ctx.beginPath();
              ctx.arc(x, y, radius, startArc * Math.PI, endArc * Math.PI);
              if (fillColor) {
                  ctx.fillStyle = fillColor;
                  ctx.fill();
              }
              ctx.stroke();
              ctx.closePath();
          }));
      };
      CanvasAPI.prototype.addCircle = function (_a) {
          var id = _a.id, x = _a.x, y = _a.y, radius = _a.radius, lineWidth = _a.lineWidth, color = _a.color, fillColor = _a.fillColor, _b = _a.layerName, layerName = _b === void 0 ? 'initial' : _b;
          var layer = this.layers[layerName];
          var ctx = layer.ctx;
          var shapes = layer.shapes;
          shapes.set(id, new Shape_1.Circle(id, x, y, radius, lineWidth, fillColor, color, ctx));
      };
      /**
       * Method allows us to pan around the canvas
       */
      CanvasAPI.prototype.pan = function (x, y) {
          this.panX = x;
          this.panY = y;
          for (var layerName in this.layers) {
              if (!this.layers.hasOwnProperty(layerName)) {
                  continue;
              }
              var layer = this.layers[layerName];
              var ctx = layer.ctx;
              ctx.setTransform(1, 0, 0, 1, x, y);
              // non initial layers are drawn much less often, so we need a manual one here.
              if (layerName !== 'initial') {
                  this.draw(layerName); // pan requires a draw to all non initial layers
              }
          }
      };
      CanvasAPI.prototype.getPan = function () {
          return {
              panX: this.panX || 0,
              panY: this.panY || 0,
          };
      };
      CanvasAPI.prototype.write = function (_a) {
          var id = _a.id, text = _a.text, x = _a.x, y = _a.y, _b = _a.font, font = _b === void 0 ? '' : _b, textBaseline = _a.textBaseline, fillStyle = _a.fillStyle, _c = _a.strokeStyle, strokeStyle = _c === void 0 ? '' : _c, _d = _a.layerName, layerName = _d === void 0 ? 'initial' : _d;
          var layer = this.layers[layerName];
          var ctx = layer.ctx;
          var shapes = layer.shapes;
          shapes.set(id, new Shape_1.Shape(function () {
              ctx.beginPath();
              ctx.font = font;
              ctx.textBaseline = textBaseline;
              ctx.fillStyle = fillStyle;
              ctx.strokeStyle = strokeStyle;
              ctx.fillText(text, x, y);
              ctx.closePath();
          }, {
              id: id,
              x: x,
              y: y
          }));
      };
      CanvasAPI.prototype.draw = function (layerName) {
          var e_1, _a;
          if (layerName === void 0) { layerName = 'initial'; }
          var layer = this.layers[layerName];
          var ctx = layer.ctx;
          var shapes = layer.shapes;
          ctx.save();
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          ctx.restore();
          try {
              for (var _b = __values(shapes.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                  var shape = _c.value;
                  shape.render(ctx);
                  ctx.strokeStyle = this.defaultStrokeStyle;
              }
          }
          catch (e_1_1) { e_1 = { error: e_1_1 }; }
          finally {
              try {
                  if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
              }
              finally { if (e_1) throw e_1.error; }
          }
      };
      return CanvasAPI;
  }());
  exports.default = CanvasAPI;
  });

  unwrapExports(CanvasAPI_1);

  var GameCanvas_1 = createCommonjsModule(function (module, exports) {
  var __createBinding = (commonjsGlobal && commonjsGlobal.__createBinding) || (Object.create ? (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
  }) : (function(o, m, k, k2) {
      if (k2 === undefined) k2 = k;
      o[k2] = m[k];
  }));
  var __setModuleDefault = (commonjsGlobal && commonjsGlobal.__setModuleDefault) || (Object.create ? (function(o, v) {
      Object.defineProperty(o, "default", { enumerable: true, value: v });
  }) : function(o, v) {
      o["default"] = v;
  });
  var __importStar = (commonjsGlobal && commonjsGlobal.__importStar) || function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
      __setModuleDefault(result, mod);
      return result;
  };
  var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
      var m = typeof Symbol === "function" && o[Symbol.iterator];
      if (!m) return o;
      var i = m.call(o), r, ar = [], e;
      try {
          while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
      }
      catch (error) { e = { error: error }; }
      finally {
          try {
              if (r && !r.done && (m = i["return"])) m.call(i);
          }
          finally { if (e) throw e.error; }
      }
      return ar;
  };
  var __spreadArray = (commonjsGlobal && commonjsGlobal.__spreadArray) || function (to, from) {
      for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
          to[j] = from[i];
      return to;
  };
  var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  var React = __importStar(react);
  var SelectedBox_1$1 = __importDefault(SelectedBox_1);
  var getShapesFromClick_1$1 = __importDefault(getShapesFromClick_1);
  var getShapesInSelectionBox_1$1 = __importDefault(getShapesInSelectionBox_1);
  var CanvasAPI_1$1 = __importDefault(CanvasAPI_1);
  var GameCanvas = /** @class */ (function () {
      function GameCanvas(options) {
          var _this = this;
          var noop = function () {
          };
          this.selectedBoxColor = options.selectedBoxColor || 'blue';
          this.mapHeight = options.mapHeight;
          this.mapWidth = options.mapWidth;
          this.viewHeight = options.viewHeight;
          this.viewWidth = options.viewWidth;
          this.onViewMapClick = options.onViewMapClick || noop;
          this.onViewMapMove = options.onViewMapMove || noop;
          this.onMiniMapClick = options.onMiniMapClick || noop;
          this.onMiniMapMove = options.onMiniMapMove || noop;
          this.enableSelectBox = options.enableSelectBox;
          this.lastClick = 0;
          this.isMouseDown = false;
          this.dbClick = false;
          this.lastTap = 0;
          this.selectedBox = new SelectedBox_1$1.default();
          [
              'updateViewMapCursorPosition',
              'updateMiniMapCursorPosition',
              'handleMapMouseUp',
              'handleMapMouseDown',
              'handleMapMouseDown',
              'handleMiniMapClick',
              'handleMiniMapMove',
              'handleMapMouseMove',
              'handleMapMouseLeave',
              'handleTouchMove',
              'handleTouchStart',
              'handleMapTouchEnd',
              'handleMiniMapTouchStart'
          ].forEach(function (fn) {
              _this[fn] = _this[fn].bind(_this);
          });
      }
      /**
       * @desc - Gets the x,y position inside the canvas based on a mouse event with clientX and clientY
       *         Will return X,Y values in relative terms to the painted Canvas dimensions and includes panning
       * @param clientInputCoordinates
       * @param canvas
       * @param canvasAPI
       */
      GameCanvas.prototype.getCursorPositionInCanvasTerms = function (clientInputCoordinates, canvas, canvasAPI) {
          var rect = canvas.getBoundingClientRect();
          if (typeof clientInputCoordinates.x !== 'number' || typeof clientInputCoordinates.y !== 'number') {
              throw 'Invalid inputCoordinates provided, missing X or Y';
          }
          // X/Y represent the point inside the client view that was touched.
          // this ignores scrolling, so the top left corner will always be 0,0 no matter the scroll
          // this X,Y is not yet scaled for canvas
          var rawXOnCanvasElement = clientInputCoordinates.x - rect.left;
          var rawYyOnCanvasElement = clientInputCoordinates.y - rect.top;
          // we need to scale the touch point with the real dimensions.
          // the HTML element can be 100px wide, but the Canvas within can be 1000px wide.
          // this ratio will allow us to correctly set the X,Y touch point
          var WIDTH_RATIO = canvas.width / rect.width;
          var HEIGHT_RATIO = canvas.height / rect.height;
          var scaledX = Math.max(0, Math.round(rawXOnCanvasElement * WIDTH_RATIO));
          var scaledY = Math.max(0, Math.round(rawYyOnCanvasElement * HEIGHT_RATIO));
          // Now we're in scaled canvas X,Y terms, we can safely subtract the Pan to get the right position
          var x = scaledX - canvasAPI.getPan().panX;
          var y = scaledY - canvasAPI.getPan().panY;
          return { x: x, y: y };
      };
      GameCanvas.prototype.handleMapMouseMove = function () {
          if (this.isMouseDown) {
              if (this.enableSelectBox === false) {
                  return;
              }
              else {
                  this.selectedBox.setEnd(this.lastKnownPositionInCanvasTermsX, this.lastKnownPositionInCanvasTermsY);
                  var data = this.selectedBox.getData();
                  this.mapAPI.addRect({
                      id: 'selectedBox',
                      x: data.start.x,
                      y: data.start.y,
                      width: data.width,
                      height: data.height,
                      strokeStyle: this.selectedBoxColor,
                      lineWidth: 1,
                      layerName: 'initial',
                      fillColor: null
                  });
              }
          }
          this.onViewMapMove({
              x: this.lastKnownPositionInCanvasTermsX,
              y: this.lastKnownPositionInCanvasTermsY,
              isMouseDown: this.isMouseDown,
              dbClick: this.dbClick,
              selectedBox: this.selectedBox.getData()
          });
      };
      GameCanvas.prototype.handleMapMouseLeave = function () {
          if (this.isMouseDown) {
              this.handleMapMouseUp();
          }
      };
      GameCanvas.prototype.handleMapTouchEnd = function () {
          var _this = this;
          this.isMouseDown = false;
          var selectedData = this.selectedBox.getData();
          var layers = Object.keys(this.mapAPI.layers);
          var hits = [];
          // if a single click...
          layers.forEach(function (layerName) {
              if (selectedData.end.x === selectedData.start.x) {
                  var x = _this.lastKnownPositionInCanvasTermsX;
                  var y = _this.lastKnownPositionInCanvasTermsY;
                  hits = __spreadArray(__spreadArray([], __read(hits)), __read(getShapesFromClick_1$1.default(_this.mapAPI.layers[layerName].shapes, layerName, x, y)));
              }
              else {
                  hits = __spreadArray(__spreadArray([], __read(hits)), __read(getShapesInSelectionBox_1$1.default(_this.mapAPI.layers[layerName].shapes, layerName, selectedData)));
              }
          });
          this.mapAPI.addRect({
              fillColor: null,
              layerName: "initial",
              lineWidth: 1,
              strokeStyle: null,
              id: 'selectedBox',
              x: 0,
              y: 0,
              width: 0,
              height: 0
          });
          this.onViewMapClick({
              x: this.lastKnownPositionInCanvasTermsX,
              y: this.lastKnownPositionInCanvasTermsY,
              isMouseDown: this.isMouseDown,
              dbClick: this.dbTap || this.dbClick,
              selectedBox: selectedData,
              hits: hits
          });
          this.selectedBox.reset();
      };
      GameCanvas.prototype.handleMapMouseUp = function () {
          if (!this.lastTap) {
              this.handleMapTouchEnd();
          }
      };
      GameCanvas.prototype.updateViewMapCursorPosition = function (inputCoordinates) {
          var _a = this.getCursorPositionInCanvasTerms(inputCoordinates, this.viewMapCanvas, this.mapAPI), x = _a.x, y = _a.y;
          this.lastKnownPositionInCanvasTermsX = x;
          this.lastKnownPositionInCanvasTermsY = y;
          return { x: x, y: y };
      };
      GameCanvas.prototype.updateMiniMapCursorPosition = function (inputCoordinates) {
          var _a = this.getCursorPositionInCanvasTerms(inputCoordinates, this.miniMapCanvas, this.miniMapAPI), x = _a.x, y = _a.y;
          this.miniMapX = x;
          this.miniMapY = y;
      };
      GameCanvas.prototype.getNewCanvasPairs = function (_a) {
          var getMapRef = _a.getMapRef, getMiniRef = _a.getMiniRef;
          return {
              map: this.generateMapCanvas(getMapRef),
              minimap: this.generateMiniMapCanvas(getMiniRef)
          };
      };
      GameCanvas.prototype.handleMiniMapMove = function (event) {
          this.onMiniMapMove(event);
      };
      GameCanvas.prototype.handleMiniMapClick = function (event) {
          var x = this.miniMapX;
          var y = this.miniMapY;
          // Handle negative overflows, both numbers should be positive
          // the reason we divide in 2 is because we want to center the view
          var calcPanX = Math.max(x - this.viewWidth / 2, 0);
          var calcPanY = Math.max(y - this.viewHeight / 2, 0);
          // Handle positive overflows, both numbers should not exceed map size
          var width = this.mapWidth;
          var height = this.mapHeight;
          calcPanX = calcPanX + this.viewWidth < width ? calcPanX : width - this.viewWidth;
          calcPanY = calcPanY + this.viewHeight < height ? calcPanY : height - this.viewHeight;
          this.mapAPI.pan(-calcPanX, -calcPanY);
          // draw the minimap square box
          this.updateMiniMapSquare();
          this.onMiniMapClick(event);
      };
      GameCanvas.prototype.updateMiniMapSquare = function () {
          this.miniMapAPI.addRect({
              fillColor: null,
              layerName: "initial",
              id: 'currentMap',
              x: -this.mapAPI.getPan().panX,
              y: -this.mapAPI.getPan().panY,
              width: this.viewWidth,
              height: this.viewHeight,
              strokeStyle: 'green',
              lineWidth: 20
          });
      };
      GameCanvas.prototype.handleMapMouseDown = function () {
          if (!this.lastTap) {
              var now = new Date().getTime();
              this.dbClick = (now - this.lastClick) < 300;
              this.lastClick = now;
              this.isMouseDown = true;
              this.setSelectBox();
          }
      };
      GameCanvas.prototype.setSelectBox = function () {
          if (this.enableSelectBox === false) {
              return;
          }
          this.selectedBox.setStart(this.lastKnownPositionInCanvasTermsX, this.lastKnownPositionInCanvasTermsY);
          this.selectedBox.setEnd(this.lastKnownPositionInCanvasTermsX, this.lastKnownPositionInCanvasTermsY);
      };
      GameCanvas.prototype.handleTouchStart = function (e) {
          var coords = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
          };
          this.updateViewMapCursorPosition(coords);
          var _a = this.getCursorPositionInCanvasTerms(coords, this.viewMapCanvas, this.mapAPI); _a.x; _a.y;
          var now = new Date().getTime();
          this.dbTap = (now - this.lastTap) < 300;
          this.lastTap = now;
          this.setSelectBox();
      };
      GameCanvas.prototype.handleMiniMapTouchStart = function (e) {
          var coords = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
          };
          var _a = this.getCursorPositionInCanvasTerms(coords, this.miniMapCanvas, this.miniMapAPI), x = _a.x, y = _a.y;
          this.miniMapX = x;
          this.miniMapY = y;
          this.handleMiniMapClick(e);
      };
      GameCanvas.prototype.ensureNegative = function (a) {
          return Math.min(a, 0);
      };
      // Clicking / Touching the minimap should pan the main view
      GameCanvas.prototype.handleTouchMove = function (e) {
          e.preventDefault();
          // Canvas terms include
          var coords = {
              x: e.touches[0].clientX,
              y: e.touches[0].clientY
          };
          var _a = this.getCursorPositionInCanvasTerms(coords, this.viewMapCanvas, this.mapAPI), x = _a.x, y = _a.y;
          var _b = this.mapAPI.getPan(), currentPanX = _b.panX, currentPanY = _b.panY;
          // example: current is 5, lastKnown is 20, we moved -15.
          var xPxChange = x - this.lastKnownPositionInCanvasTermsX;
          var yPxChange = y - this.lastKnownPositionInCanvasTermsY;
          // the new pan is the current pan + the change in movement
          var plannedNewPanX = currentPanX + xPxChange;
          var plannedNewPanY = currentPanY + yPxChange;
          // We must ensure we don't escape from the bottom-right
          var IS_PANNING_CONTAINED_WITHIN_MAP_FOR_X = plannedNewPanX + this.viewWidth < this.mapWidth;
          var IS_PANNING_CONTAINED_WITHIN_MAP_FOR_Y = plannedNewPanY + this.viewWidth < this.mapHeight;
          // Max allowed panning will ensure we can't over-pan on the bottom right
          var MAX_ALLOWED_X_PANNING = this.viewWidth - this.mapWidth;
          var MAX_ALLOWED_Y_PANNING = this.viewHeight - this.mapHeight;
          var newPanX = IS_PANNING_CONTAINED_WITHIN_MAP_FOR_X ? plannedNewPanX : MAX_ALLOWED_X_PANNING;
          var newPanY = IS_PANNING_CONTAINED_WITHIN_MAP_FOR_Y ? plannedNewPanY : MAX_ALLOWED_Y_PANNING;
          // SAFETY
          // our panning is always negative, as don't allow to scroll off the edges
          // (if panning could be positive, we the canvas edge would be in the mainView)
          // This is equal to MIN_ALLOWED_X_PANNING = 0;
          this.mapAPI.pan(this.ensureNegative(newPanX), this.ensureNegative(newPanY));
      };
      GameCanvas.prototype.generateMapCanvas = function (getRef) {
          var _this = this;
          return (React.createElement("canvas", { className: 'viewMap', ref: function (el) {
                  if (!el) {
                      return null;
                  }
                  _this.viewMapCanvas = el;
                  document.removeEventListener('mousemove', _this.updateViewMapCursorPosition);
                  document.addEventListener('mousemove', _this.updateViewMapCursorPosition);
                  // @ts-ignore For some reason there's a misamtch between the event types TODO - can this be improved?
                  el.removeEventListener('touchmove', _this.handleTouchMove, false);
                  // @ts-ignore For some reason there's a misamtch between the event types TODO - can this be improved?
                  el.addEventListener('touchmove', _this.handleTouchMove, false);
                  _this.mapAPI = new CanvasAPI_1$1.default(el.getContext('2d'));
                  getRef(_this.mapAPI, el);
              }, height: this.viewHeight, width: this.viewWidth, onMouseDown: this.handleMapMouseDown, onTouchStart: this.handleTouchStart, onTouchEnd: this.handleMapTouchEnd, onMouseMove: this.handleMapMouseMove, onMouseUp: this.handleMapMouseUp, onMouseLeave: this.handleMapMouseLeave }));
      };
      GameCanvas.prototype.generateMiniMapCanvas = function (getRef) {
          var _this = this;
          return (React.createElement("canvas", { className: 'minimap', ref: function (el) {
                  if (!el) {
                      return null;
                  }
                  _this.miniMapCanvas = el;
                  document.removeEventListener('mousemove', _this.updateMiniMapCursorPosition);
                  document.addEventListener('mousemove', _this.updateMiniMapCursorPosition);
                  _this.miniMapAPI = new CanvasAPI_1$1.default(el.getContext('2d'));
                  // updateMiniMapSquare depends on mapAPI to be defined
                  // due to some race conditions this might happen before mapAPI was defined
                  // An interval is used to detect when mapAPI is defined
                  var key = setInterval(function () {
                      if (_this.mapAPI) {
                          _this.updateMiniMapSquare();
                          clearInterval(key);
                      }
                  }, 100);
                  getRef(_this.miniMapAPI, el);
              }, height: this.mapHeight, width: this.mapWidth, onMouseMove: this.handleMiniMapMove, onMouseDown: this.handleMiniMapClick, onTouchStart: this.handleMiniMapTouchStart }));
      };
      return GameCanvas;
  }());
  exports.default = GameCanvas;
  });

  unwrapExports(GameCanvas_1);

  var Engine_1 = createCommonjsModule(function (module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  var Engine = /** @class */ (function () {
      function Engine() {
          this.systems = [];
          this.frameID = null;
      }
      Engine.prototype.addSystem = function (system) {
          this.systems.push(system);
      };
      Engine.prototype.run = function (sysArgs) {
          var _this = this;
          this.frameID = requestAnimationFrame(function () {
              _this.run(sysArgs); // // Load the next frame request, this will allow any system to cancel the frame
              var normalizedSysArgs = typeof sysArgs === 'function' ? sysArgs() : sysArgs;
              _this.runSystems(normalizedSysArgs);
          });
          return this.frameID;
      };
      Engine.prototype.runSystems = function (sysArgs) {
          for (var i = 0; i < this.systems.length; i++) {
              this.systems[i](sysArgs);
          }
      };
      Engine.prototype.stop = function () {
          cancelAnimationFrame(this.frameID);
          return this.frameID;
      };
      return Engine;
  }());
  exports.default = Engine;
  });

  unwrapExports(Engine_1);

  var dist = createCommonjsModule(function (module, exports) {
  var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
  };
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Engine = exports.GameCanvas = exports.ObjectPool = exports.entityLoop = exports.Entity = void 0;
  var Entity_1$1 = __importDefault(Entity_1);
  exports.Entity = Entity_1$1.default;
  var entityLoop_1$1 = __importDefault(entityLoop_1);
  exports.entityLoop = entityLoop_1$1.default;
  var ObjectPool_1$1 = __importDefault(ObjectPool_1);
  exports.ObjectPool = ObjectPool_1$1.default;
  var GameCanvas_1$1 = __importDefault(GameCanvas_1);
  exports.GameCanvas = GameCanvas_1$1.default;
  var Engine_1$1 = __importDefault(Engine_1);
  exports.Engine = Engine_1$1.default;
  });

  unwrapExports(dist);
  var dist_1 = dist.Engine;
  var dist_2 = dist.GameCanvas;
  dist.ObjectPool;
  var dist_4 = dist.entityLoop;
  var dist_5 = dist.Entity;

  /* eslint no-console: "off" */
  function assertType(expectedType, name, type) {
      if (typeof expectedType === 'boolean') {
          console.assert(expectedType === type, "Error, expected " + name + " to be " + type + " but " + expectedType + " received instead");
      }
      else {
          console.assert(typeof expectedType === type, "Error, expected " + name + " to be " + type + " but " + typeof expectedType + " received instead");
      }
  }

  var IS_MOVING_COMP = 'IS_MOVING_COMP';
  var PLAYER_CONTROLLED_COMP = 'PLAYER_CONTROLLED_COMP';
  var BACKGROUND_COMP = 'BACKGROUND_COMP';
  var MOVEMENT_COMP = 'MOVEMENT_COMP';
  var TRAVERSABLE_COMP = 'TRAVERSABLE_COMP';
  var POSITION_COMP = 'POSITION_COMP';
  var UI_COMP = 'UI_COMP';
  var AI_VISION_COMP = 'AI_VISION_COMP';
  var DIALOG_COMP = 'DIALOG_COMP';
  var CAN_SPAWN_COMP = 'CAN_SPAWN_COMP';
  var SPAWNED_COMP = 'SPAWNED_COMP';
  var HEALTH_COMP = 'HEALTH_COMP';
  var AI_CONTROLLED_COMP = 'AI_CONTROLLED_COMP';
  var ATTACK_COMP = 'ATTACK_COMP';
  var IS_ATTACKING_COMP = 'IS_ATTACKING_COMP';
  var ANIMATION_COMP = 'ANIMATION_COMP';
  var CAN_ASSIGN_QUESTS_COMP = 'CAN_ASSIGN_QUESTS_COMP';
  var HAS_ACTION_SIGN_COMP = 'HAS_ACTION_SIGN_COMP';
  var QUEST_DATA_COMP = 'QUEST_DATA_COMP';
  var KILL_QUEST_DATA_COMP = 'KILL_QUEST_DATA_COMP';
  var EXPERIENCE_COMP = 'EXPERIENCE_COMP';
  var LEVEL_COMP = 'LEVEL_COMP';
  var CHARACTER_SKILLS_COMP = 'CHARACTER_SKILLS_COMP';
  var CHARACTER_ATTRIBUTES_COMP = 'CHARACTER_ATTRIBUTES_COMP';

  var _a$4, _b$1;
  var CANVAS_OUTPUT = 'CANVAS_OUTPUT';
  var AllowedLevelLocationIDs;
  (function (AllowedLevelLocationIDs) {
      AllowedLevelLocationIDs["TOWN"] = "TOWN";
      AllowedLevelLocationIDs["SPAWNABLE_1"] = "SPAWNABLE_1";
  })(AllowedLevelLocationIDs || (AllowedLevelLocationIDs = {}));
  var AllowedUIShapes;
  (function (AllowedUIShapes) {
      AllowedUIShapes["CIRCLE_SHAPE"] = "CIRCLE_SHAPE";
      AllowedUIShapes["ARC_SHAPE"] = "ARC_SHAPE";
      AllowedUIShapes["MAP_TILE_SHAPE"] = "MAP_TILE_SHAPE";
      AllowedUIShapes["RECT_SHAPE"] = "RECT_SHAPE";
      AllowedUIShapes["HEALTH_BAR_SHAPE"] = "HEALTH_BAR_SHAPE";
      AllowedUIShapes["CHEST_SHAPE"] = "CHEST_SHAPE";
      AllowedUIShapes["PLAYER_CHAR"] = "PLAYER_CHAR";
  })(AllowedUIShapes || (AllowedUIShapes = {}));
  var AllowedActions;
  (function (AllowedActions) {
      AllowedActions["PERFORM_ACTION"] = "PERFORM_ACTION";
      AllowedActions["MOVE_ACTION"] = "MOVE_ACTION";
      AllowedActions["BUY_SKILL"] = "BUY_SKILL";
      AllowedActions["BUY_ATTR"] = "BUY_ATTR";
  })(AllowedActions || (AllowedActions = {}));
  var AllowedQuestIDs;
  (function (AllowedQuestIDs) {
      AllowedQuestIDs["CLEAR_CAMP"] = "CLEAR_CAMP";
  })(AllowedQuestIDs || (AllowedQuestIDs = {}));
  var CHARACTERS;
  (function (CHARACTERS) {
      CHARACTERS["ENEMY"] = "ENEMY";
      CHARACTERS["FAM_NPC"] = "FAM_NPC";
      CHARACTERS["CHEST"] = "CHEST";
      CHARACTERS["IMP"] = "IMP";
      CHARACTERS["GARGOYLE"] = "GARGOYLE";
      CHARACTERS["DEMON"] = "DEMON";
      CHARACTERS["VAMPIRE"] = "VAMPIRE";
      CHARACTERS["PLAYER"] = "PLAYER";
  })(CHARACTERS || (CHARACTERS = {}));
  // TODO can these two be combined?
  var DIRECTIONS_OPTIONS;
  (function (DIRECTIONS_OPTIONS) {
      DIRECTIONS_OPTIONS["UP"] = "UP";
      DIRECTIONS_OPTIONS["DOWN"] = "DOWN";
      DIRECTIONS_OPTIONS["LEFT"] = "LEFT";
      DIRECTIONS_OPTIONS["RIGHT"] = "RIGHT";
  })(DIRECTIONS_OPTIONS || (DIRECTIONS_OPTIONS = {}));
  // TODO can these two be combined?
  (_a$4 = {},
      _a$4[DIRECTIONS_OPTIONS.UP] = 'UP',
      _a$4[DIRECTIONS_OPTIONS.DOWN] = 'DOWN',
      _a$4[DIRECTIONS_OPTIONS.LEFT] = 'LEFT',
      _a$4[DIRECTIONS_OPTIONS.RIGHT] = 'RIGHT',
      _a$4);
  var ANIMATIONS = {
      MOVE_LEFT: 'MOVE_LEFT',
      MOVE_RIGHT: 'MOVE_RIGHT',
      MOVE_UP: 'MOVE_UP',
      MOVE_DOWN: 'MOVE_DOWN'
  };
  var bit = 32;
  var ATTACK_SPEEDS_OPTIONS;
  (function (ATTACK_SPEEDS_OPTIONS) {
      ATTACK_SPEEDS_OPTIONS["SLOW"] = "SLOW";
      ATTACK_SPEEDS_OPTIONS["FAST"] = "FAST";
      ATTACK_SPEEDS_OPTIONS["FASTER"] = "FASTER";
      ATTACK_SPEEDS_OPTIONS["FASTEST"] = "FASTEST";
  })(ATTACK_SPEEDS_OPTIONS || (ATTACK_SPEEDS_OPTIONS = {}));
  var ATTACK_SPEEDS = (_b$1 = {},
      _b$1[ATTACK_SPEEDS_OPTIONS.SLOW] = 90,
      _b$1[ATTACK_SPEEDS_OPTIONS.FAST] = 70,
      _b$1[ATTACK_SPEEDS_OPTIONS.FASTER] = 60,
      _b$1[ATTACK_SPEEDS_OPTIONS.FASTEST] = 20,
      _b$1);
  var RESOLUTION = {
      width: 400 * 2,
      height: 240 * 2
  };
  var ATTACK_CONFIG = {
      lineWidth: 3
  };
  var CHAR_SPRITE_URL = "src/assets/characters.png";
  var TILESET_IMAGE_URL = "src/assets/tileSet.png";
  var XP_TO_FIRST_LEVEL = 500;

  var PositionComponent = /** @class */ (function () {
      function PositionComponent(_a) {
          var x = _a.x, y = _a.y, _b = _a.radius, radius = _b === void 0 ? -1 : _b, _c = _a.height, height = _c === void 0 ? -1 : _c, _d = _a.width, width = _d === void 0 ? -1 : _d;
          this.name = POSITION_COMP;
          this.x = x;
          this.y = y;
          this.radius = radius;
          this.height = height;
          this.width = width;
          this.destY = null;
          this.destX = null;
          this.originX = null;
          this.originY = null;
      }
      return PositionComponent;
  }());

  var BackgroundComponent = /** @class */ (function () {
      function BackgroundComponent(sections) {
          this.name = BACKGROUND_COMP;
          var sectionsArray = Array.isArray(sections) ? sections : [sections];
          this.sections = sectionsArray.map(function (section) {
              // if it's an object, great, we're done.
              if (typeof section === 'object') {
                  assertType(section.name, 'section.name', 'string');
                  return section;
              }
              else {
                  return {
                      name: section,
                      shape: null,
                      data: {}
                  };
              }
          });
      }
      return BackgroundComponent;
  }());

  // if an entity has this Component, players can walk over it
  var TraversableComponent = /** @class */ (function () {
      function TraversableComponent() {
          this.name = TRAVERSABLE_COMP;
      }
      return TraversableComponent;
  }());

  var HasActionSignComponent = /** @class */ (function () {
      function HasActionSignComponent(symbol) {
          this.symbol = symbol;
          this.name = HAS_ACTION_SIGN_COMP;
          this.symbol = symbol;
      }
      return HasActionSignComponent;
  }());

  var IsMoving = /** @class */ (function () {
      function IsMoving() {
          this.name = IS_MOVING_COMP;
          this.direction = null;
      }
      return IsMoving;
  }());

  var BaseEntity = /** @class */ (function (_super) {
      __extends(BaseEntity, _super);
      function BaseEntity(entity) {
          return _super.call(this, entity) || this;
      }
      BaseEntity.prototype.addAnimation = function (animation) {
          this[ANIMATION_COMP].addAnimationVariant(animation);
      };
      BaseEntity.prototype.isPlayer = function () {
          return !!this[PLAYER_CONTROLLED_COMP];
      };
      BaseEntity.prototype.clearAllAnimations = function () {
          if (!this[ANIMATION_COMP]) {
              return;
          }
          this[ANIMATION_COMP].animations = {};
      };
      BaseEntity.prototype.calcOrientation = function (destX, destY) {
          var _a = this.getPos(), x = _a.x, y = _a.y;
          if (destX > x) {
              return DIRECTIONS_OPTIONS.RIGHT;
          }
          else if (destX < x) {
              return DIRECTIONS_OPTIONS.LEFT;
          }
          else if (destY > y) {
              return DIRECTIONS_OPTIONS.DOWN;
          }
          else if (destY < y) {
              return DIRECTIONS_OPTIONS.UP;
          }
          else {
              return this.getOrientation(); // by default, get current one
          }
      };
      BaseEntity.prototype.getAnimations = function () {
          return (this[ANIMATION_COMP] && this[ANIMATION_COMP].animations) || {};
      };
      BaseEntity.prototype.getAnimationTypes = function () {
          return this[ANIMATION_COMP] && this[ANIMATION_COMP].animationTypes;
      };
      BaseEntity.prototype.hasSpecificAnimation = function (name) {
          return !!this.getAnimations()[name];
      };
      BaseEntity.prototype.getMovementSpeed = function () {
          return this[MOVEMENT_COMP] && this[MOVEMENT_COMP].speed;
      };
      BaseEntity.prototype.removeAnimation = function (animationName) {
          if (!this[ANIMATION_COMP]) {
              return;
          }
          delete this[ANIMATION_COMP].animations[animationName];
      };
      BaseEntity.prototype.getAIVisionRange = function () {
          return this[AI_VISION_COMP] && this[AI_VISION_COMP].range;
      };
      BaseEntity.prototype.isAttacking = function () {
          return !!this[IS_ATTACKING_COMP];
      };
      BaseEntity.prototype.isAttackable = function () {
          return !!this[HEALTH_COMP];
      };
      BaseEntity.prototype.setDest = function (_a) {
          var x = _a.x, y = _a.y;
          if (this[POSITION_COMP]) {
              this[POSITION_COMP].destX = x;
              this[POSITION_COMP].destY = y;
          }
      };
      BaseEntity.prototype.setMoveDirection = function (dir) {
          if (!this[IS_MOVING_COMP]) {
              this.addComponent(new IsMoving());
          }
          this[IS_MOVING_COMP].direction = dir;
      };
      BaseEntity.prototype.getDest = function () {
          return {
              x: this[POSITION_COMP].destX,
              y: this[POSITION_COMP].destY
          };
      };
      BaseEntity.prototype.stop = function () {
          this[POSITION_COMP].originX = null;
          this[POSITION_COMP].originY = null;
          this.removeComponent(IS_MOVING_COMP);
          this.setDest({
              x: null,
              y: null
          });
      };
      BaseEntity.prototype.removeDirection = function () {
          if (this[IS_MOVING_COMP]) {
              this[IS_MOVING_COMP].direction = null;
          }
      };
      BaseEntity.prototype.getMoveDirection = function () {
          return this[IS_MOVING_COMP] && this[IS_MOVING_COMP].direction;
      };
      BaseEntity.prototype.setOrientation = function (direction) {
          this[POSITION_COMP].orientation = direction;
      };
      BaseEntity.prototype.getOrientation = function () {
          return this[POSITION_COMP].orientation;
      };
      BaseEntity.prototype.isMoving = function () {
          return !!this[IS_MOVING_COMP];
      };
      BaseEntity.prototype.setPos = function (_a) {
          var x = _a.x, y = _a.y;
          this[POSITION_COMP].x = x;
          this[POSITION_COMP].y = y;
      };
      BaseEntity.prototype.getQuestsByStatus = function (questState) {
          return this.getQuests().filter(function (quest) {
              return quest.getState() === questState;
          });
      };
      BaseEntity.prototype.setQuestActionSymbol = function (newSymbol) {
          if (!this.hasSpecificAnimation(HAS_ACTION_SIGN_COMP)) {
              this.addComponent(new HasActionSignComponent(newSymbol));
          }
          else {
              this[HAS_ACTION_SIGN_COMP].symbol = newSymbol;
          }
      };
      BaseEntity.prototype.getQuests = function () {
          if (this[CAN_ASSIGN_QUESTS_COMP]) {
              return this[CAN_ASSIGN_QUESTS_COMP].quests;
          }
          else {
              return [];
          }
      };
      BaseEntity.prototype.getPos = function () {
          if (this[POSITION_COMP]) {
              return {
                  x: this[POSITION_COMP].x,
                  y: this[POSITION_COMP].y
              };
          }
      };
      // TODO ensure this works QA
      BaseEntity.prototype.getDestFromDirection = function (dir) {
          var _a = this.getPos(), x = _a.x, y = _a.y;
          if (dir === DIRECTIONS_OPTIONS.UP) {
              return {
                  x: x,
                  y: y - bit
              };
          }
          if (dir === DIRECTIONS_OPTIONS.DOWN) {
              return {
                  x: x,
                  y: y + bit
              };
          }
          if (dir === DIRECTIONS_OPTIONS.LEFT) {
              return {
                  x: x - bit,
                  y: y
              };
          }
          if (dir === DIRECTIONS_OPTIONS.RIGHT) {
              return {
                  x: x + bit,
                  y: y
              };
          }
      };
      BaseEntity.prototype.setDestTo = function (dir) {
          var _a = this.getPos(), x = _a.x, y = _a.y;
          this[POSITION_COMP].originX = x;
          this[POSITION_COMP].originY = y;
          if (dir === DIRECTIONS_OPTIONS.UP) {
              this.setDest({
                  x: x,
                  y: y - bit
              });
          }
          if (dir === DIRECTIONS_OPTIONS.DOWN) {
              this.setDest({
                  x: x,
                  y: y + bit
              });
          }
          if (dir === DIRECTIONS_OPTIONS.LEFT) {
              this.setDest({
                  x: x - bit,
                  y: y
              });
          }
          if (dir === DIRECTIONS_OPTIONS.RIGHT) {
              this.setDest({
                  x: x + bit,
                  y: y
              });
          }
      };
      BaseEntity.prototype.isDestReached = function () {
          var xReached = this.getPos().x === this.getDest().x;
          var yReached = this.getPos().y === this.getDest().y;
          return xReached && yReached;
      };
      return BaseEntity;
  }(dist_5));

  var CanSpawn = /** @class */ (function () {
      function CanSpawn(tileLocation, tileCharacterLevel) {
          this.name = CAN_SPAWN_COMP;
          this.tileLocationID = tileLocation;
          this.tileCharacterLevel = tileCharacterLevel;
      }
      return CanSpawn;
  }());

  /**
   * A tile is an Entity in the game.
   * The Tile is rendered to the background has different states such as "isTraversable"
   */
  var Tile = /** @class */ (function (_super) {
      __extends(Tile, _super);
      function Tile(_a) {
          var x = _a.x, y = _a.y, tileIdx = _a.tileIdx, height = _a.height, width = _a.width, tileType = _a.tileType, tileLocationID = _a.tileLocationID, tileCharacterLevel = _a.tileCharacterLevel;
          var _this = _super.call(this, Tile) || this;
          _this.tileIdx = tileIdx;
          _this.addComponent(new PositionComponent({ x: x, y: y, height: height, width: width }));
          // 1 is grass, 7 is road
          // REFACTOR - Seems strange here.. (if type === 1?)
          // TODO reuse in setTileType
          if (tileType === 1 || tileType === 7 || tileType === 100 || tileType === 13) {
              _this.addComponent(new TraversableComponent());
              _this.addComponent(new CanSpawn(tileLocationID, tileCharacterLevel));
          }
          _this.addComponent(new BackgroundComponent([{
                  name: CANVAS_OUTPUT,
                  shape: AllowedUIShapes.MAP_TILE_SHAPE,
                  data: {
                      tileType: tileType
                  }
              }]));
          return _this;
      }
      // TODO for Editor mode only, change the tile type
      Tile.prototype.setTileType = function (tileType) {
          if (tileType === 1 || tileType === 7 || tileType === 100 || tileType === 13) {
              this.addComponent(new TraversableComponent());
          }
          else {
              this.removeComponent(TRAVERSABLE_COMP);
          }
          this.removeComponent(BACKGROUND_COMP);
          this.addComponent(new BackgroundComponent([{
                  name: CANVAS_OUTPUT,
                  shape: AllowedUIShapes.MAP_TILE_SHAPE,
                  data: {
                      tileType: tileType
                  }
              }]));
      };
      return Tile;
  }(BaseEntity));

  /**
   * An indexedTile is a wrapper around the Tile Entity.
   * The indexedTile is NOT an entity, but provides additional methods and properties that don't belong on an Entity
   */
  var IndexedTile = /** @class */ (function () {
      function IndexedTile(tile, idx) {
          this.idx = idx;
          this.entities = {};
          this.entityCount = 0;
          /**
           * @type {Tile}
           */
          this.tile = tile;
      }
      IndexedTile.prototype.addEnt = function (ent) {
          if (!this.entities[ent.id]) {
              this.entityCount++;
              this.entities[ent.id] = ent;
          }
      };
      IndexedTile.prototype.removeEnt = function (ent) {
          if (this.entities[ent.id]) {
              this.entityCount = Math.max(this.entityCount - 1, 0);
              delete this.entities[ent.id];
          }
      };
      IndexedTile.prototype.getEntCount = function () {
          return this.entityCount;
      };
      return IndexedTile;
  }());

  /**
   *
   * @param a
   * @param x
   * @param b
   * A function that checks of a number is between two other numbers
   */
  function inRange(a, x, b) {
      return x > a && x < b;
  }
  function createTileIndexMap(levelArea, viewSize) {
      var mapHeight = viewSize.mapHeight, mapWidth = viewSize.mapWidth;
      var tileMap = levelArea.tileMap;
      var locations = levelArea.locations;
      // take levelArea
      // If tile is in SAFE area, remove all "spawnable" from it.
      var idx = {};
      var _loop_1 = function (rowIdx) {
          var row = tileMap[rowIdx];
          var _loop_2 = function (colIdx) {
              var numOfCols = row.length;
              var numOfRows = tileMap.length;
              var tileIdx = colIdx + "," + rowIdx; // TODO move to util to abstract the comma
              var tileWidth = mapWidth / numOfCols;
              var tileHeight = mapHeight / numOfRows; // num of cols
              var tileLocationID = null;
              var tileCharacterLevel = 1;
              var locationsFoundForTile = 0;
              locations.forEach(function (levelLocation) {
                  var colStart = levelLocation.start.col;
                  var rowStart = levelLocation.start.row;
                  var colEnd = levelLocation.end.col;
                  var rowEnd = levelLocation.end.row;
                  var inColRange = colIdx >= colStart && colIdx <= colEnd;
                  var inRowRange = rowIdx >= rowStart && rowIdx <= rowEnd;
                  if (inColRange && inRowRange) {
                      tileLocationID = levelLocation.id;
                      tileCharacterLevel = levelLocation.locationCharacterLevel;
                      // if spawnable, it MUST have a levelLocationID
                      if (tileLocationID === null || tileCharacterLevel <= 0) {
                          throw "Invalid tileLocationID or tileCharacterLevel provided in location " + { tileLocationID: tileLocationID, tileCharacterLevel: tileCharacterLevel };
                      }
                      else {
                          locationsFoundForTile++;
                      }
                  }
              });
              if (locationsFoundForTile > 1) {
                  throw 'A LevelLocation cannot overlap over a tile';
              }
              var tile = new Tile({
                  x: colIdx * tileWidth,
                  y: rowIdx * tileHeight,
                  tileIdx: tileIdx,
                  width: tileWidth,
                  height: tileHeight,
                  tileType: tileMap[rowIdx][colIdx],
                  tileLocationID: tileLocationID,
                  tileCharacterLevel: tileCharacterLevel
              });
              // Is the tile location within a safe spot?
              var _a = tile.getPos(), x = _a.x, y = _a.y;
              levelArea.noSpawnLocations.forEach(function (safeLocation) {
                  var withinX = inRange(safeLocation.start.x, x, safeLocation.end.x);
                  var withinY = inRange(safeLocation.start.y, y, safeLocation.end.y);
                  if (withinX && withinY) {
                      tile.removeComponent(CAN_SPAWN_COMP);
                      return;
                  }
              });
              idx[tileIdx] = new IndexedTile(tile, tileIdx);
              Object.defineProperty(idx[tileIdx], 'gameEngine/entities', {
                  writable: false
              });
          };
          for (var colIdx = 0; colIdx < row.length; colIdx++) {
              _loop_2(colIdx);
          }
      };
      for (var rowIdx = 0; rowIdx < tileMap.length; rowIdx++) {
          _loop_1(rowIdx);
      }
      return idx;
  }

  var Dialog = /** @class */ (function () {
      function Dialog(text) {
          this.name = DIALOG_COMP;
          this.text = text + "\n\n\nPress space to continue ...";
      }
      return Dialog;
  }());

  function getTileIdxByPos(x, y) {
      var col = Math.floor(x / bit);
      var row = Math.floor(y / bit);
      return col + "," + row; // TODO move to util to abstract the comma
  }
  function getTileIdxByEnt(entity) {
      var _a = entity.getPos(), x = _a.x, y = _a.y;
      return getTileIdxByPos(x, y);
  }

  function isNonEmptyArray(x) {
      return x && x.length;
  }
  function portalSystem(systemArguments) {
      var levelArea = systemArguments.levelArea, game = systemArguments.game, Entity = systemArguments.Entity;
      var player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0];
      var index = getTileIdxByEnt(player);
      assertType(index, 'level index', 'string');
      var triggers = levelArea.triggers.move[index];
      if (isNonEmptyArray(triggers)) {
          triggers.forEach(function (trigger) {
              // TODO This feels counter intuitive, the triggers should be pushed and the trigger system should decide what to do with active triggers
              if (trigger && trigger.type === 'portal') {
                  var level = trigger.level, area = trigger.area;
                  game.handleAreaChange(level, area, trigger.exitTile);
              }
          });
      }
  }

  var triggers = [];
  function pushTrigger(trigger) {
      triggers.push(trigger);
  }
  var Trigger = /** @class */ (function () {
      function Trigger(_a) {
          var type = _a.type, lines = _a.lines, _b = _a.actedOnEntity, actedOnEntity = _b === void 0 ? null : _b;
          this.type = type;
          this.lines = lines;
          this.actedOnEntity = actedOnEntity;
      }
      return Trigger;
  }());
  function triggerSystem(systemArguments) {
      var player = dist_5.getByComp(PLAYER_CONTROLLED_COMP)[0];
      // loop over all actions
      if (isNonEmptyArray(triggers)) {
          triggers.forEach(function (trigger) {
              if (trigger.type === 'dialog') {
                  // get lines of the dialog
                  var lines = trigger.lines;
                  var line = lines[0];
                  var nextLine = lines[1];
                  if (line) {
                      line.speaker && trigger.actedOnEntity.addComponent(new Dialog(line.text));
                      !line.speaker && player.addComponent(new Dialog(line.text));
                  }
                  else {
                      trigger.actedOnEntity.addComponent(new Dialog('I have nothing to say'));
                  }
                  if (nextLine) {
                      // end of tick
                      var lines_1 = __spreadArray([], trigger.lines);
                      lines_1.shift();
                      Promise.resolve().then(function () {
                          pushTrigger(new Trigger({
                              type: 'dialog',
                              lines: lines_1,
                              actedOnEntity: trigger.actedOnEntity
                          }));
                      });
                  }
              }
          });
      }
      // reset triggers when we're done
      if (triggers.length) {
          triggers = [];
      }
  }

  function filterOutFarEntities(systemArguments, entsToDraw) {
      var buffer = bit * 8;
      var mapAPI = systemArguments.mapAPI;
      var arr = [];
      var _a = mapAPI.getPan(), panX = _a.panX, panY = _a.panY;
      var _b = systemArguments.viewSize, viewWidth = _b.viewWidth, viewHeight = _b.viewHeight;
      for (var i = 0; i < entsToDraw.length; i++) {
          var entity = entsToDraw[i];
          var _c = entity[POSITION_COMP], x = _c.x, y = _c.y, radius = _c.radius, height = _c.height, width = _c.width;
          var entWidth = radius * 2 || width;
          var entHeight = radius * 2 || height;
          // Example
          // We have -100x, which means we move our view screen 100px to the right (the underlying is translated -100 px)
          // x = 0;
          // ent is 50px wide
          // buffer is 0
          // x + width + buffer = 50px;
          // since our view only starts from x = 100, our entity is out of view
          var isEntityTooFarLeft = x + entWidth + buffer < -panX;
          // Same calculation, only we need to take into account the width of what we show (viewWidth).
          // If the entity's X is 'more to the right' than our current pan + the entire view, it's out of view.
          var isEntityTooFarRight = x - entWidth - buffer > -panX + viewWidth;
          var isEntityTooFarUp = y + entHeight + buffer < -panY;
          var isEntityTooFarDown = y - entHeight - buffer > -panY + viewHeight;
          // is out of screen?
          if (isEntityTooFarLeft || isEntityTooFarRight || isEntityTooFarUp || isEntityTooFarDown) ;
          else {
              arr.push(entity);
          }
      }
      return arr;
  }

  function getSpriteCrop(col, row) {
      return {
          cropStartX: bit * col,
          cropStartY: bit * row,
          cropSizeX: bit,
          cropSizeY: bit
      };
  }

  var grassTile = getSpriteCrop(7, 10);
  var mountainTile = getSpriteCrop(7, 11);
  var riverTiles = getSpriteCrop(5, 10);
  var brownBrickDay = getSpriteCrop(17, 2);
  var brownDoorDay = getSpriteCrop(15, 20);
  var redRoofDay = getSpriteCrop(14, 10);
  var monument = getSpriteCrop(22, 7);
  var dirtPath = getSpriteCrop(2, 0);
  var treeGrassTile = getSpriteCrop(1, 1);
  var treeGrassTileGreen = getSpriteCrop(6, 19);
  var treeGrassTilePine = getSpriteCrop(10, 19);
  var sand = getSpriteCrop(9, 10);
  var sea = getSpriteCrop(6, 10);
  var rockGate = getSpriteCrop(0, 19);
  var sandMountain = getSpriteCrop(12, 11);
  var caveFloor = getSpriteCrop(22, 1);
  var caveWall = getSpriteCrop(19, 1);
  var TILE_TYPES = {
      0: mountainTile,
      1: grassTile,
      2: riverTiles,
      3: brownBrickDay,
      4: brownDoorDay,
      5: redRoofDay,
      6: monument,
      7: dirtPath,
      8: treeGrassTile,
      9: treeGrassTileGreen,
      10: treeGrassTilePine,
      11: rockGate,
      12: sandMountain,
      13: caveFloor,
      14: caveWall,
      100: sand,
      1000: sea
  };

  function renderBackgroundLayer(systemArguments) {
      var mapAPI = systemArguments.mapAPI, tileSetSprite = systemArguments.tileSetSprite, Entity = systemArguments.Entity;
      var allBackgroundEnts = Entity.getByComps([BACKGROUND_COMP]);
      var closeBackgroundEnts = filterOutFarEntities(systemArguments, allBackgroundEnts);
      var _loop_1 = function (i) {
          var entity = closeBackgroundEnts[i];
          entity[BACKGROUND_COMP].sections.forEach(function (section) {
              if (section.shape === AllowedUIShapes.MAP_TILE_SHAPE) {
                  // tile type
                  mapAPI.addImage(__assign(__assign({ id: entity.id + "-" + i, image: tileSetSprite, x: entity[POSITION_COMP].x, y: entity[POSITION_COMP].y, height: entity[POSITION_COMP].height, width: entity[POSITION_COMP].width }, TILE_TYPES[section.data.tileType]), { rotation: 0, layerName: 'background' }));
              }
          });
      };
      for (var i = 0; i < closeBackgroundEnts.length; i++) {
          _loop_1(i);
      }
  }

  function renderCircle(systemArguments, entity) {
      var mapAPI = systemArguments.mapAPI;
      var _a = entity[POSITION_COMP], curX = _a.x, curY = _a.y, radius = _a.radius;
      mapAPI.addCircle({
          id: "" + entity.id,
          x: curX,
          y: curY,
          radius: radius,
          fillColor: 'red',
          lineWidth: 1
      });
  }

  function renderHealthBar(systemArguments, entity) {
      assertType(entity[HEALTH_COMP], 'Health Component', 'object');
      var mapAPI = systemArguments.mapAPI;
      var healthWidth = entity[HEALTH_COMP].width;
      var healthMargin = entity[HEALTH_COMP].height;
      var healthHeight = 2;
      var healthPercent = entity[HEALTH_COMP].current / entity[HEALTH_COMP].max;
      mapAPI.addRect({
          id: entity.id + "-full-" + AllowedUIShapes.HEALTH_BAR_SHAPE + "-",
          x: entity[POSITION_COMP].x - healthWidth / 2,
          y: entity[POSITION_COMP].y + healthMargin,
          width: healthWidth,
          height: healthHeight,
          strokeStyle: 'black',
          lineWidth: 2
      });
      mapAPI.addRect({
          id: entity.id + "-damage-" + AllowedUIShapes.HEALTH_BAR_SHAPE,
          x: entity[POSITION_COMP].x - healthWidth / 2,
          y: entity[POSITION_COMP].y + healthMargin,
          width: healthWidth * healthPercent,
          height: healthHeight,
          strokeStyle: 'lime',
          lineWidth: 2
      });
  }

  var charSpriteURL = "./characters.png";

  var miscURL = "./misc.png";

  var AssetLoader = /** @class */ (function () {
      function AssetLoader() {
          this.cache = {};
      }
      AssetLoader.prototype.load = function (assets, onReady) {
          var _this = this;
          assertType(assets.length, 'assets length', 'number');
          var requests = [];
          var _loop_1 = function (i) {
              var asset = assets[i];
              if (asset.type === 'image') {
                  requests.push(new Promise(function (resolve) {
                      console.log('pushing new asset', asset.url);
                      var img = new Image();
                      img.src = asset.url;
                      img.onload = function (e) {
                          _this.cache[asset.name.replace('./', '')] = img;
                          console.log('current cache', _this.cache);
                          resolve(null);
                      };
                  }));
              }
          };
          for (var i = 0; i < assets.length; i++) {
              _loop_1(i);
          }
          Promise.all(requests).then(function () {
              onReady();
          });
          return requests;
      };
      AssetLoader.prototype.getAsset = function (name) {
          var ASSET_NAME = name.replace('src/assets/', '').replace('./', '');
          if (!this.cache[ASSET_NAME]) {
              throw Error("Cannot get asset that was not loaded before hand, assetName attempted: " + ASSET_NAME);
          }
          console.log(ASSET_NAME, this.cache[ASSET_NAME]);
          return this.cache[ASSET_NAME];
      };
      return AssetLoader;
  }());
  var assetLoader = new AssetLoader();

  function renderAnimations(systemArguments, entity) {
      var mapAPI = systemArguments.mapAPI;
      for (var anim in entity.getAnimations()) {
          var _a = entity[ANIMATION_COMP].animations[anim], currentFrame = _a.currentFrame, frames = _a.frames;
          var frame = frames[currentFrame];
          if (frame.spriteURL) {
              mapAPI.addImage({
                  id: "" + entity.id,
                  image: assetLoader.getAsset(frame.spriteURL),
                  x: entity[POSITION_COMP].x - entity[POSITION_COMP].radius,
                  y: entity[POSITION_COMP].y - entity[POSITION_COMP].radius,
                  height: bit,
                  width: bit,
                  cropStartX: frame.cropStartX,
                  cropStartY: frame.cropStartY,
                  cropSizeX: bit,
                  cropSizeY: bit,
                  rotation: 0 // in radians
              });
          }
          if (frame.shape === AllowedUIShapes.ARC_SHAPE) {
              // we either render the X of the entity, or the animation X provided...
              var frameX = frame.x;
              var frameY = frame.y;
              entity[POSITION_COMP].x - entity[POSITION_COMP].radius;
              entity[POSITION_COMP].y - entity[POSITION_COMP].radius;
              mapAPI.addArc({
                  id: "" + entity.id,
                  x: frameX,
                  y: frameY,
                  radius: frame.radius,
                  size: frame.size,
                  direction: frame.direction,
                  lineWidth: ATTACK_CONFIG.lineWidth,
                  color: frame.color
              });
          }
      }
  }

  function renderDialog(systemArguments, entity) {
      var mapAPI = systemArguments.mapAPI, viewSize = systemArguments.viewSize;
      var _a = mapAPI.getPan(), panY = _a.panY, panX = _a.panX;
      var width = 250;
      var x = viewSize.viewWidth - width - panX;
      var y = -panY;
      mapAPI.writeBubble({
          id: 'someText',
          x: x,
          y: y,
          text: entity.name + ":\n" + entity[DIALOG_COMP].text,
          backgroundColor: '#b78846',
          borderColor: '#FFFFFF',
          borderWidth: 1,
          fontColor: '#FFFFFF',
          fontSize: 12,
          paddingTop: 10,
          width: width,
          height: 100 // auto based on height of text
      });
  }

  function renderMainLayer(systemArguments, closeEnts, closeEntsWithAnimation) {
      var mapAPI = systemArguments.mapAPI;
      var _loop_1 = function (i) {
          var entity_1 = closeEnts[i];
          if (entity_1.hasComponents(HAS_ACTION_SIGN_COMP)) {
              var _a = entity_1[POSITION_COMP], x = _a.x, y = _a.y, radius = _a.radius;
              var symbol = entity_1[HAS_ACTION_SIGN_COMP].symbol;
              mapAPI.write({
                  id: entity_1.id + "-assign-quest",
                  text: symbol,
                  textBaseline: 'middle',
                  fillStyle: "yellow",
                  strokeStyle: 'black',
                  font: radius * 2 + "px Arial",
                  x: x + radius / 2,
                  y: y - radius,
              });
          }
          entity_1[UI_COMP].sections.forEach(function (section) {
              var _a;
              if (section.shape === AllowedUIShapes.CIRCLE_SHAPE) {
                  renderCircle(systemArguments, entity_1);
              }
              if (section.shape === AllowedUIShapes.HEALTH_BAR_SHAPE) {
                  renderHealthBar(systemArguments, entity_1);
              }
              if (section.shape === AllowedUIShapes.CHEST_SHAPE) {
                  var crops = {
                      cropStartX: 32,
                      cropStartY: 0
                  };
                  var _b = entity_1[POSITION_COMP], radius = _b.radius, x = _b.x, y = _b.y;
                  // When the player is out of animation phase, this is what we show
                  mapAPI.addImage(__assign(__assign({ id: "" + entity_1.id, image: assetLoader.getAsset(miscURL), x: x - radius, y: y - radius, height: 32, width: 32 }, crops), { cropSizeX: bit, cropSizeY: bit, rotation: 0 // in radians
                   }));
              }
              if (section.shape === AllowedUIShapes.PLAYER_CHAR) {
                  var spriteCrop = (_a = {},
                      _a[DIRECTIONS_OPTIONS.LEFT] = getSpriteCrop(1, 1),
                      _a[DIRECTIONS_OPTIONS.RIGHT] = getSpriteCrop(1, 0),
                      _a[DIRECTIONS_OPTIONS.UP] = getSpriteCrop(1, 3),
                      _a[DIRECTIONS_OPTIONS.DOWN] = getSpriteCrop(1, 2),
                      _a);
                  var crops = spriteCrop[entity_1.getOrientation()] || {
                      cropStartX: 0,
                      cropStartY: 0
                  };
                  var _c = entity_1[POSITION_COMP], radius = _c.radius, x = _c.x, y = _c.y;
                  // When the player is out of animation phase, this is what we show
                  mapAPI.addImage(__assign(__assign({ id: "" + entity_1.id, image: assetLoader.getAsset(charSpriteURL), x: x - radius, y: y - radius, height: 32, width: 32 }, crops), { cropSizeX: bit, cropSizeY: bit, rotation: 0 // in radians
                   }));
              }
          });
      };
      // render entities
      for (var i = 0; i < closeEnts.length; i++) {
          _loop_1(i);
      }
      // render animations
      for (var i = 0; i < closeEntsWithAnimation.length; i++) {
          var entity_2 = closeEntsWithAnimation[i];
          renderAnimations(systemArguments, entity_2);
      }
      // one dialog at a time!
      var entity = dist_5.getByComp(DIALOG_COMP)[0];
      if (entity) {
          renderDialog(systemArguments, entity);
          systemArguments.game.stop();
          entity.removeComponent(DIALOG_COMP);
      }
  }

  function renderSystem(systemArguments) {
      var mapAPI = systemArguments.mapAPI, shouldRenderBackground = systemArguments.shouldRenderBackground, game = systemArguments.game;
      // clear everything before we move forward
      mapAPI.clear();
      // render background
      if (shouldRenderBackground) {
          mapAPI.clear('background');
          renderBackgroundLayer(systemArguments);
          game.notifyBackgroundWasRendered();
          mapAPI.draw('background');
      }
      var allEntsToDraw = dist_5.getByComps([UI_COMP]); // O1 fetching
      var closeEnts = filterOutFarEntities(systemArguments, allEntsToDraw);
      var allAnimationsToDraw = dist_5.getByComps([ANIMATION_COMP]);
      var closeAnimations = filterOutFarEntities(systemArguments, allAnimationsToDraw);
      renderMainLayer(systemArguments, closeEnts, closeAnimations);
      mapAPI.draw();
  }

  var GameEvent = /** @class */ (function () {
      function GameEvent() {
      }
      GameEvent.prototype.readEvent = function () {
          return {
              entity: null
          };
      };
      return GameEvent;
  }());
  var EnemyKilledEvent = /** @class */ (function (_super) {
      __extends(EnemyKilledEvent, _super);
      function EnemyKilledEvent(entity) {
          var _this = _super.call(this) || this;
          _this.entity = entity;
          return _this;
      }
      EnemyKilledEvent.prototype.readEvent = function () {
          return {
              entity: this.entity
          };
      };
      return EnemyKilledEvent;
  }(GameEvent));
  var InteractWithNPC = /** @class */ (function (_super) {
      __extends(InteractWithNPC, _super);
      function InteractWithNPC(entity) {
          var _this = _super.call(this) || this;
          _this.entity = entity;
          return _this;
      }
      InteractWithNPC.prototype.readEvent = function () {
          return {
              entity: this.entity
          };
      };
      return InteractWithNPC;
  }(GameEvent));
  var PlayerIsAttacked = /** @class */ (function (_super) {
      __extends(PlayerIsAttacked, _super);
      function PlayerIsAttacked(entity) {
          var _this = _super.call(this) || this;
          _this.entity = entity;
          return _this;
      }
      PlayerIsAttacked.prototype.readEvent = function () {
          return {
              entity: this.entity
          };
      };
      return PlayerIsAttacked;
  }(GameEvent));
  var PlayerSkillsChangeEvent = /** @class */ (function (_super) {
      __extends(PlayerSkillsChangeEvent, _super);
      function PlayerSkillsChangeEvent(entity) {
          var _this = _super.call(this) || this;
          _this.entity = entity;
          return _this;
      }
      PlayerSkillsChangeEvent.prototype.readEvent = function () {
          return {
              entity: this.entity
          };
      };
      return PlayerSkillsChangeEvent;
  }(GameEvent));
  var PlayerAttributesChangeEvent = /** @class */ (function (_super) {
      __extends(PlayerAttributesChangeEvent, _super);
      function PlayerAttributesChangeEvent(entity) {
          var _this = _super.call(this) || this;
          _this.entity = entity;
          return _this;
      }
      PlayerAttributesChangeEvent.prototype.readEvent = function () {
          return {
              entity: this.entity
          };
      };
      return PlayerAttributesChangeEvent;
  }(GameEvent));
  /** @class */ ((function (_super) {
      __extends(LevelUpEvent, _super);
      function LevelUpEvent() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      LevelUpEvent.prototype.readEvent = function () {
          return {
              entity: null
          };
      };
      return LevelUpEvent;
  })(GameEvent));
  /** @class */ ((function (_super) {
      __extends(QuestCompleteEvent, _super);
      function QuestCompleteEvent() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      QuestCompleteEvent.prototype.readEvent = function () {
          return {
              entity: null
          };
      };
      return QuestCompleteEvent;
  })(GameEvent));
  /**
   *     // Similar to trigger system:

   Example USage
   - User action needs to create a quest. (UserInput)
   - User meets a precondition, update quest state (Quest System)
      This is now an event, "PlayerLeveledUp", that the systems can consume
   - User kills an enemy, the quest is updated
   - User kills another enemy, The quest state is updated

   DeathProcess(previously) dealt with all death related stuff, BUT, this is actually a lot
   - All these and more should happen in death process
       Update quest
       Calculate Drop
       Calculate Exp
     These sound like separate systems, so KillEvent was created.


   attackSystem should dispatch the KillEvent.
   Events are in two lists - events for THIS_TICK and for NEXT_TICK
   Systems read from THIS_TICK list, but they write to NEXT_TICK list
   THIS_TICK list empties at the end of the loop. (in gameloop)
   Every system should extract the events it cares about, and only them - Is this a loop?
   */
  var GameEvents = /** @class */ (function () {
      function GameEvents() {
          this.events = [];
          this.nextEvents = [];
      }
      GameEvents.prototype.getEvents = function () {
          return this.events;
      };
      GameEvents.prototype.pushEvent = function (event) {
          this.nextEvents.push(event);
      };
      GameEvents.prototype.endTick = function () {
          this.events = this.nextEvents;
          this.nextEvents = [];
      };
      return GameEvents;
  }());

  function updateMapTileIdx(_a) {
      // This was due to a bug that caused dead entities
      // that on the next tick needed to change tiles
      // to still move after being dead (since death is async by a tick.
      // TODO all systems actually operate on dead entities, they can still attack for example, this needs to be addressed
      // TODO - A dead Entity should probably not survive the tick...
      var entity = _a.entity, tileIdxMap = _a.tileIdxMap, _b = _a.oldX, oldX = _b === void 0 ? null : _b, _c = _a.oldY, oldY = _c === void 0 ? null : _c, _d = _a.newX, newX = _d === void 0 ? null : _d, _e = _a.newY, newY = _e === void 0 ? null : _e;
      if (entity.hasComponents(HEALTH_COMP) && entity[HEALTH_COMP].current === 0) {
          return;
      }
      /**
       * @type IndexedTile
       */
      var oldIndexedTile = tileIdxMap[getTileIdxByPos(oldX, oldY)];
      var newIndexedTile = tileIdxMap[getTileIdxByPos(newX, newY)];
      oldIndexedTile && oldIndexedTile.removeEnt(entity);
      newIndexedTile && newIndexedTile.addEnt(entity);
  }

  function getCenterPosOfGridIdx(col, row) {
      return {
          x: col * bit + (bit / 2),
          y: row * bit + (bit / 2)
      };
  }
  function getGridIdxFromPos(x, y) {
      var col = Math.floor(x / bit);
      var row = Math.floor(y / bit);
      return { col: col, row: row };
  }

  // row 0 right
  /**
   * @param {string} charSpriteURL
   */
  function commonAnimations(charSpriteURL) {
      var _a;
      return _a = {},
          _a[ANIMATIONS.MOVE_RIGHT] = {
              frames: [
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(0, 0)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(1, 0)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(2, 0)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(3, 0))
              ],
              animationName: ANIMATIONS.MOVE_RIGHT,
              loops: false
          },
          _a[ANIMATIONS.MOVE_LEFT] = {
              frames: [
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(0, 1)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(1, 1)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(2, 1)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(3, 1))
              ],
              animationName: ANIMATIONS.MOVE_LEFT,
              loops: false
          },
          _a[ANIMATIONS.MOVE_UP] = {
              frames: [
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(0, 3)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(1, 3)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(2, 3)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(3, 3))
              ],
              animationName: ANIMATIONS.MOVE_UP,
              loops: false
          },
          _a[ANIMATIONS.MOVE_DOWN] = {
              frames: [
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(0, 2)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(1, 2)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(2, 2)),
                  __assign({ spriteURL: charSpriteURL }, getSpriteCrop(3, 2))
              ],
              animationName: ANIMATIONS.MOVE_DOWN,
              loops: false
          },
          _a;
  }

  var playerAnimations = __assign({}, commonAnimations(charSpriteURL));

  var sentrySpriteURL = "./sentry.png";

  var enemyAnimations = __assign({}, commonAnimations(sentrySpriteURL));

  var PLAYER = {
  	id: "PLAYER",
  	displayName: "'The amazing player'",
  	dmg: 2500,
  	health: 1500,
  	speed: 4,
  	vision: 0,
  	attackSpeed: "FASTEST",
  	radius: 16,
  	animationTypes: "PLAYER_ANIMATION"
  };
  var CHEST = {
  	id: "CHEST",
  	displayName: "'Chest'",
  	dmg: 0,
  	health: 20,
  	speed: 0,
  	vision: 0,
  	attackSpeed: "null",
  	radius: 16,
  	animationTypes: "null"
  };
  var FAM_NPC = {
  	id: "FAM_NPC",
  	displayName: "'An NPC'",
  	dmg: 0,
  	health: 20,
  	speed: 0,
  	vision: 0,
  	attackSpeed: "null",
  	radius: 16,
  	animationTypes: "null"
  };
  var DEMON = {
  	id: "DEMON",
  	displayName: "'A Demon'",
  	dmg: 20,
  	health: 100,
  	speed: 1,
  	vision: 200,
  	attackSpeed: "FAST",
  	radius: 16,
  	animationTypes: "ENEMY_ANIMATION"
  };
  var IMP = {
  	id: "IMP",
  	displayName: "'An Imp'",
  	dmg: 20,
  	health: 100,
  	speed: 1,
  	vision: 200,
  	attackSpeed: "FAST",
  	radius: 16,
  	animationTypes: "ENEMY_ANIMATION"
  };
  var ENEMY = {
  	id: "ENEMY",
  	displayName: "'The Generic Enemy",
  	dmg: 20,
  	health: 1000,
  	speed: 4,
  	vision: 200,
  	attackSpeed: "FAST",
  	radius: 16,
  	animationTypes: "ENEMY_ANIMATION"
  };
  var GARGOYLE = {
  	id: "GARGOYLE",
  	displayName: "'A gargoyle'",
  	dmg: 20,
  	health: 100,
  	speed: 4,
  	vision: 200,
  	attackSpeed: "FAST",
  	radius: 16,
  	animationTypes: "ENEMY_ANIMATION"
  };
  var VAMPIRE = {
  	id: "VAMPIRE",
  	displayName: "'A Vampire'",
  	dmg: 20,
  	health: 100,
  	speed: 1,
  	vision: 200,
  	attackSpeed: "FAST",
  	radius: 16,
  	animationTypes: "ENEMY_ANIMATION"
  };
  var CharacterData = {
  	PLAYER: PLAYER,
  	CHEST: CHEST,
  	FAM_NPC: FAM_NPC,
  	DEMON: DEMON,
  	IMP: IMP,
  	ENEMY: ENEMY,
  	GARGOYLE: GARGOYLE,
  	VAMPIRE: VAMPIRE
  };

  var charactersDataConfig = {};
  Object.keys(CharacterData).forEach(function (char) {
      var animations = null;
      if (CharacterData[char].animationTypes === 'PLAYER_ANIMATION') {
          animations = playerAnimations;
      }
      else if (CharacterData[char].animationTypes === 'ENEMY_ANIMATION') {
          animations = enemyAnimations;
      }
      else ;
      charactersDataConfig[char] = __assign(__assign({}, CharacterData[char]), { animationTypes: animations });
  });

  var LevelComp = /** @class */ (function () {
      function LevelComp(characterLevel) {
          if (characterLevel <= 0) {
              throw 'Character level has to be larger than 0';
          }
          this.name = LEVEL_COMP;
          this.characterLevel = characterLevel;
      }
      return LevelComp;
  }());

  var Health = /** @class */ (function () {
      function Health(maxHealth, width, height) {
          this.name = HEALTH_COMP;
          this.max = maxHealth;
          this.current = maxHealth;
          this.width = width;
          this.height = height;
      }
      return Health;
  }());

  var UIComponent = /** @class */ (function () {
      function UIComponent(sections) {
          if (sections === void 0) { sections = []; }
          this.name = UI_COMP;
          var sectionsArray = Array.isArray(sections) ? sections : [sections];
          this.sections = sectionsArray.map(function (section) {
              // if it's an object, great, we're done.
              if (typeof section === 'object') {
                  assertType(section.name, 'section.name', 'string');
                  return section;
              }
              else {
                  // if it's a string, make it an object..
                  return {
                      name: section,
                      shape: null,
                      data: {}
                  };
              }
          });
      }
      return UIComponent;
  }());

  var AIVisionComponent = /** @class */ (function () {
      function AIVisionComponent(range) {
          this.name = AI_VISION_COMP;
          this.range = range;
      }
      return AIVisionComponent;
  }());

  var MoveComponent = /** @class */ (function () {
      function MoveComponent(speed) {
          this.name = MOVEMENT_COMP;
          this.speed = speed;
      }
      return MoveComponent;
  }());

  var AnimationComp = /** @class */ (function () {
      function AnimationComp(animationTypes) {
          this.name = ANIMATION_COMP;
          this.animations = {};
          this.animationTypes = animationTypes;
      }
      AnimationComp.prototype.addAnimationVariant = function (_a) {
          var _b = _a.animationName, animationName = _b === void 0 ? '' : _b, _c = _a.frames, frames = _c === void 0 ? [] : _c, _d = _a.loops, loops = _d === void 0 ? false : _d, _e = _a.size, size = _e === void 0 ? 0.25 : _e, _f = _a.speed, speed = _f === void 0 ? 1 : _f, _g = _a.animationDuration, animationDuration = _g === void 0 ? 0 : _g, rest = __rest(_a, ["animationName", "frames", "loops", "size", "speed", "animationDuration"]);
          assertType(animationName, 'Name of animation', 'string');
          if (Object.keys(rest).length > 0) {
              throw "Extra arguments not supported to addAnimationVariant " + JSON.stringify(Object.keys(rest));
          }
          this.animations[animationName] = {
              animationName: animationName,
              frames: frames,
              currentFrame: 0,
              loops: loops,
              size: size,
              speed: speed,
              realFrameCount: 0,
              animationDuration: animationDuration
          };
      };
      return AnimationComp;
  }());

  var AttackComponent = /** @class */ (function () {
      /**
       *
       * @param {number} damage
       */
      function AttackComponent(damage, cooldownFrames) {
          this.name = ATTACK_COMP;
          this.damage = damage;
          this.cooldownFrames = cooldownFrames;
      }
      return AttackComponent;
  }());

  var Character = /** @class */ (function (_super) {
      __extends(Character, _super);
      function Character(instanceAttributes, charConfig) {
          var _this = _super.call(this, Character) || this;
          var col = instanceAttributes.col, row = instanceAttributes.row, characterLevel = instanceAttributes.characterLevel; instanceAttributes.spawningTileLocationID;
          var speed = charConfig.speed, health = charConfig.health, radius = charConfig.radius, dmg = charConfig.dmg, attackSpeed = charConfig.attackSpeed, vision = charConfig.vision, animationTypes = charConfig.animationTypes; charConfig.id; charConfig.displayName;
          var _a = getCenterPosOfGridIdx(col, row), x = _a.x, y = _a.y;
          _this.addComponent(new LevelComp(characterLevel));
          _this.addComponent(new PositionComponent({ x: x, y: y, radius: radius }));
          if (speed) {
              _this.addComponent(new MoveComponent(speed));
          }
          if (health) {
              var adjustedHealth = _this.getLevelAdjustedHealth(health, characterLevel);
              _this.addComponent(new Health(adjustedHealth, radius * 2, radius));
              // the UI component can be completely overwritten by the extending class (like Player)
              _this.addComponent(new UIComponent([{
                      name: CANVAS_OUTPUT,
                      shape: AllowedUIShapes.HEALTH_BAR_SHAPE,
                      data: {}
                  }]));
          }
          if (vision) {
              _this.addComponent(new AIVisionComponent(vision));
          }
          if (dmg) {
              var adjustedDmg = _this.getLevelAdjustedDamage(dmg, characterLevel);
              _this.addComponent(new AttackComponent(adjustedDmg, ATTACK_SPEEDS[attackSpeed]));
          }
          if (animationTypes) {
              _this.addComponent(new AnimationComp(animationTypes));
          }
          return _this;
      }
      Character.prototype.getLevelAdjustedHealth = function (health, level) {
          return health + health * level / 100; // base health + 1% per level
      };
      Character.prototype.getLevelAdjustedDamage = function (dmg, level) {
          return dmg + dmg * level / 200; // base damage + 0.5% per level
      };
      return Character;
  }(BaseEntity));

  var _a$3;
  var AllowedAttributes;
  (function (AllowedAttributes) {
      AllowedAttributes["STRENGTH"] = "STRENGTH";
      AllowedAttributes["AGILITY"] = "AGILITY";
      AllowedAttributes["WILL"] = "WILL";
      AllowedAttributes["ENDURANCE"] = "ENDURANCE";
  })(AllowedAttributes || (AllowedAttributes = {}));
  var characterAttributesConfig = (_a$3 = {},
      _a$3[AllowedAttributes.AGILITY] = {
          id: AllowedAttributes.AGILITY,
          displayName: 'Agility',
          description: 'Agility'
      },
      _a$3[AllowedAttributes.STRENGTH] = {
          id: AllowedAttributes.STRENGTH,
          displayName: 'STRENGTH',
          description: 'STRENGTH'
      },
      _a$3[AllowedAttributes.WILL] = {
          id: AllowedAttributes.WILL,
          displayName: 'WILL',
          description: 'WILL'
      },
      _a$3[AllowedAttributes.ENDURANCE] = {
          id: AllowedAttributes.ENDURANCE,
          displayName: 'ENDURANCE',
          description: 'ENDURANCE'
      },
      _a$3);

  var CharacterAttributesComponent = /** @class */ (function () {
      function CharacterAttributesComponent() {
          var _a;
          this.name = CHARACTER_ATTRIBUTES_COMP;
          this.spendableAttributePoints = 0;
          this.attributes = (_a = {},
              _a[AllowedAttributes.AGILITY] = 5,
              _a[AllowedAttributes.STRENGTH] = 5,
              _a[AllowedAttributes.WILL] = 5,
              _a[AllowedAttributes.ENDURANCE] = 5,
              _a);
      }
      return CharacterAttributesComponent;
  }());

  var CharacterSkillsComponent = /** @class */ (function () {
      function CharacterSkillsComponent() {
          this.name = CHARACTER_SKILLS_COMP;
          this.skills = [];
      }
      return CharacterSkillsComponent;
  }());

  var PlayerControlledComponent = /** @class */ (function () {
      function PlayerControlledComponent() {
          this.name = PLAYER_CONTROLLED_COMP;
      }
      return PlayerControlledComponent;
  }());

  // TODO add memoization
  function getXPToLevel(level) {
      if (level <= 1) {
          return 0;
      }
      if (level === 2) {
          return XP_TO_FIRST_LEVEL;
      }
      return 2 * getXPToLevel(level - 1);
  }
  var ExperienceComp = /** @class */ (function () {
      function ExperienceComp(level, XP) {
          if (level === void 0) { level = 1; }
          if (XP === void 0) { XP = 0; }
          this.name = EXPERIENCE_COMP;
          this.XP = XP;
          this.level = level;
      }
      ExperienceComp.prototype.getLevelProgress = function () {
          // next level requirements e.g 5000
          // current level requirements e.g 2500
          // current XP = e.g 3000
          var XPtoNextLevel = getXPToLevel(this.level + 1);
          var XPtoCurrentLevel = getXPToLevel(this.level);
          var currentXP = this.XP; // 3000
          // xp over current level = 3000 - 2500 = 500
          var XPOverLastLevel = Math.max(currentXP - XPtoCurrentLevel, 0);
          // net xp between levels = 5000 - 2500 =  2500
          var netXPNeededToNextLevel = XPtoNextLevel - XPtoCurrentLevel;
          if (netXPNeededToNextLevel === 0) {
              return 0;
          }
          else {
              return XPOverLastLevel / netXPNeededToNextLevel;
          }
      };
      return ExperienceComp;
  }());

  var Player = /** @class */ (function (_super) {
      __extends(Player, _super);
      function Player(instanceAttributes, charConfig) {
          var _this = _super.call(this, instanceAttributes, charConfig) || this;
          _this.addComponent(new CharacterSkillsComponent());
          _this.addComponent(new CharacterAttributesComponent());
          _this.addComponent(new PlayerControlledComponent());
          _this.addComponent(new ExperienceComp(1, 0));
          _this.addComponent(new UIComponent([
              {
                  name: CANVAS_OUTPUT,
                  shape: AllowedUIShapes.PLAYER_CHAR,
                  data: {}
              }
          ]));
          _this.addComponent(new AnimationComp(playerAnimations));
          return _this;
      }
      return Player;
  }(Character));

  function placePlayerInLevel(levelArea, tileIdxMap, targetTile) {
      if (targetTile === void 0) { targetTile = null; }
      var player = dist_5.getByComp(PLAYER_CONTROLLED_COMP)[0];
      var _a = targetTile || levelArea.startPos, col = _a.col, row = _a.row;
      var _b = getCenterPosOfGridIdx(col, row), x = _b.x, y = _b.y;
      if (!player) {
          var playerConfig = charactersDataConfig[CHARACTERS.PLAYER];
          // TODO - when Saving progress, this has to be taken into consideration (characterLevel 1)
          player = new Player({ col: col, row: row, characterLevel: 1, spawningTileLocationID: null }, playerConfig);
      }
      else {
          player.setPos({ x: x, y: y });
          player.stop();
      }
      updateMapTileIdx({ entity: player, tileIdxMap: tileIdxMap, newX: x, newY: y });
      return player;
  }

  function animationSystem(systemArguments) {
      var Entity = systemArguments.Entity;
      // Animation system
      var ents = Entity.getByComps([ANIMATION_COMP]);
      for (var i = 0; i < ents.length; i++) {
          var entity = ents[i];
          var animations = entity[ANIMATION_COMP].animations;
          for (var anim in animations) {
              var animation = animations[anim];
              animation.realFrameCount = animation.realFrameCount || 0;
              var numberOfFrames = animation.frames.length - 1;
              var isOver = animation.currentFrame >= numberOfFrames;
              if (isOver && animation.loops) {
                  animation.currentFrame = 0;
                  animation.realFrameCount = 0;
              }
              else if (isOver && !animation.loops) {
                  entity.removeAnimation(animation.animationName);
              }
              else {
                  // the duration of the animation is the time it takes to cross a bit (32px)
                  var animationDuration = animation.animationDuration || (bit / entity.getMovementSpeed()) / numberOfFrames;
                  animation.realFrameCount++;
                  // the animation lasts for {animationDuration} frames (bigger = longer)
                  // the animation has {numberOfFrames}
                  // each frameDuration is {animationDuration / numberOfFrames}
                  // current frame is Math.min{realFrameCount / frameDuration}
                  var frameDuration = animationDuration / numberOfFrames;
                  animation.currentFrame = Math.floor(animation.realFrameCount / frameDuration);
              }
          }
      }
  }

  /**
   * Pick one from an array
   */
  function oneOf(arr) {
      var len = arr.length;
      return arr[Math.floor(Math.random() * len)];
  }

  var IsAttackingComp = /** @class */ (function () {
      function IsAttackingComp(targetTile) {
          this.name = IS_ATTACKING_COMP;
          this.targetTile = targetTile;
          /**
           * @type {number}
           * @Desc An attack lasts a set amount of frames, specified in the attack_comp
           */
          this.currentFrame = 0;
      }
      return IsAttackingComp;
  }());

  // TODO do this for all systems
  function aiSystem(systemArguments) {
      var entities = dist_5.getByComps([AI_CONTROLLED_COMP, MOVEMENT_COMP, POSITION_COMP]);
      var player = dist_5.getByComp(PLAYER_CONTROLLED_COMP)[0];
      dist_4(entities, function (entity) {
          if (entity.isMoving()) {
              return;
          }
          var visionRange = entity.getAIVisionRange();
          var chaseDirections = [];
          if (visionRange && player) {
              var _a = player.getPos(), playerX = _a.x, playerY = _a.y;
              var _b = entity.getPos(), x = _b.x, y = _b.y;
              var dist = Math.sqrt(Math.pow(playerX - x, 2) + Math.pow(playerY - y, 2));
              // chase
              /* istanbul ignore else */
              if (visionRange > dist) {
                  // go towards the player!
                  if (x < playerX) {
                      chaseDirections.push(DIRECTIONS_OPTIONS.RIGHT);
                  }
                  if (x > playerX) {
                      chaseDirections.push(DIRECTIONS_OPTIONS.LEFT);
                  }
                  if (y < playerY) {
                      chaseDirections.push(DIRECTIONS_OPTIONS.DOWN);
                  }
                  if (y > playerY) {
                      chaseDirections.push(DIRECTIONS_OPTIONS.UP);
                  }
              }
              // attack if close
              var isNextToPlayer = false;
              if (x === playerX) {
                  isNextToPlayer = Math.abs(playerY - y) === bit;
              }
              else if (y === playerY) {
                  isNextToPlayer = Math.abs(playerX - x) === bit;
              }
              var isCurrentlyAttacking = entity.isAttacking();
              if (isNextToPlayer && !isCurrentlyAttacking) {
                  var playerTileIdx = getTileIdxByEnt(player);
                  var tileToAttack = systemArguments.tileIdxMap[playerTileIdx];
                  entity.addComponent(new IsAttackingComp(tileToAttack));
              }
          }
          if (chaseDirections.length === 0) {
              // TODO - Could we implement break this list dynamically instead of listing it all?
              chaseDirections = [
                  DIRECTIONS_OPTIONS.UP,
                  DIRECTIONS_OPTIONS.DOWN,
                  DIRECTIONS_OPTIONS.LEFT,
                  DIRECTIONS_OPTIONS.RIGHT
              ];
          }
          var dir = oneOf(chaseDirections);
          entity.setDestTo(dir);
          entity.addComponent(new IsMoving());
      });
  }

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

  function getColRowByTileIdx(tileIdx) {
      var col = +tileIdx.split(',')[0]; // TODO move to util to abstract the comma
      var row = +tileIdx.split(',')[1]; // TODO move to util to abstract the comma
      return {
          row: row,
          col: col
      };
  }

  function centerCameraOnEntity(entity, mapAPI, game, viewWidth, viewHeight, mapWidth, mapHeight, force) {
      if (force === void 0) { force = false; }
      var _a = entity.getPos(), x = _a.x, y = _a.y;
      var _b = mapAPI.getPan(), panX = _b.panX, panY = _b.panY;
      var panToX = x < viewWidth / 2 ? panX : -x + viewWidth / 2;
      var panToY = y < viewHeight / 2 ? panY : -y + viewHeight / 2;
      // if we don't need to pan, stop
      if (panX === panToX && panY === panToY && !force) {
          return;
      }
      game.requestBackgroundRender();
      // If we reached the edge
      if (mapHeight + panToY < viewHeight) {
          panToY = viewHeight - mapHeight;
      }
      if (mapWidth + panToX < viewWidth) {
          panToX = viewWidth - mapWidth;
      }
      mapAPI.pan(panToX, panToY);
  }

  var AllowedQuestState;
  (function (AllowedQuestState) {
      AllowedQuestState["HIDDEN"] = "HIDDEN";
      AllowedQuestState["AVAILABLE"] = "AVAILABLE";
      AllowedQuestState["IN_PROGRESS"] = "IN_PROGRESS";
      AllowedQuestState["DONE"] = "DONE";
      AllowedQuestState["REWARDED"] = "REWARDED"; // quest is finished, rewarded and done for good.
  })(AllowedQuestState || (AllowedQuestState = {}));
  var QuestDataComponent = /** @class */ (function () {
      function QuestDataComponent(questID, data) {
          this.name = QUEST_DATA_COMP; // component name
          var id = data.id, requiredLevel = data.requiredLevel, preCondition = data.preCondition, reward = data.reward, description = data.description, finishedText = data.finishedText;
          this.data = {
              state: AllowedQuestState.AVAILABLE,
              description: description,
              id: id,
              requiredLevel: requiredLevel,
              preCondition: preCondition,
              reward: reward,
              finishedText: finishedText
          };
      }
      return QuestDataComponent;
  }());
  var KillQuestDataComponent = /** @class */ (function (_super) {
      __extends(KillQuestDataComponent, _super);
      function KillQuestDataComponent(questID, data) {
          var _this = _super.call(this, questID, data) || this;
          var _a = data.kill, killGoal = _a.killGoal, killed = _a.killed, location = _a.location;
          _this.data.kill = {
              killGoal: killGoal,
              killed: killed,
              location: location
          };
          _this.name = KILL_QUEST_DATA_COMP;
          return _this;
      }
      return KillQuestDataComponent;
  }(QuestDataComponent));

  function questSystem(systemArguments) {
      var gameEvents = systemArguments.gameEvents;
      var entitiesThatGiveQuests = dist_5.getByComps([CAN_ASSIGN_QUESTS_COMP, POSITION_COMP, UI_COMP]);
      dist_5.getByComp(PLAYER_CONTROLLED_COMP)[0];
      // Quests are entities that inside a component
      var quests = dist_5.getByComps([QUEST_DATA_COMP]);
      /**
       * System does a few things...
       * 1.
       * 2. Move the Quests state around based on conditions and checks, this is done on -- Entity.getByComp<BaseEntity>([QUEST_DATA_COMP])
       * 3. Assign UI elements to NPCs based on Quest state, this is done on -- Entity.getByComp<BaseEntity>([CAN_ASSIGN_QUESTS_COMP, POSITION_COMP, UI_COMP])
       */
      var killQuests = dist_5.getByComps([KILL_QUEST_DATA_COMP]);
      var eventsToProcess = gameEvents.getEvents();
      // 1. process events
      eventsToProcess.forEach(function (gameEvent) {
          // killing enemies affects some quests
          if (gameEvent instanceof EnemyKilledEvent) {
              var entity_1 = gameEvent.readEvent().entity;
              killQuests.forEach(function (quest) {
                  if (entity_1.hasComponents(SPAWNED_COMP)) {
                      var locationID = entity_1[SPAWNED_COMP].spawningTileLocationID;
                      if (quest.getState() === AllowedQuestState.IN_PROGRESS) {
                          if (locationID === quest[KILL_QUEST_DATA_COMP].data.kill.location) {
                              quest[KILL_QUEST_DATA_COMP].data.kill.killed++;
                              if (quest.isPostReqComplete()) {
                                  quest.setState(AllowedQuestState.DONE);
                              }
                          }
                      }
                  }
              });
          }
          if (gameEvent instanceof InteractWithNPC) {
              var NPCEntity = gameEvent.readEvent().entity;
              var availableQuests = NPCEntity.getQuestsByStatus(AllowedQuestState.AVAILABLE);
              var doneQuests = NPCEntity.getQuestsByStatus(AllowedQuestState.DONE);
              if (isNonEmptyArray(doneQuests)) {
                  var quest = doneQuests[0];
                  quest.setState(AllowedQuestState.REWARDED);
                  pushTrigger(new Trigger({
                      type: 'dialog',
                      lines: [{
                              text: quest.getFinishedText(),
                              speaker: 1
                          }],
                      actedOnEntity: NPCEntity
                  }));
                  return;
              }
              if (isNonEmptyArray(availableQuests)) {
                  var quest = availableQuests[0];
                  quest.setState(AllowedQuestState.IN_PROGRESS);
                  pushTrigger(new Trigger({
                      type: 'dialog',
                      lines: [{
                              text: quest.getDescription(),
                              speaker: 1
                          }],
                      actedOnEntity: NPCEntity
                  }));
                  return;
              }
          }
      });
      // 2. Adjust Quest state
      quests.forEach(function (quest) {
          // Hidden should turn to Available, if quest see-conditions are met.
          if (quest.getState() === AllowedQuestState.HIDDEN) {
              // if precondition is right
              {
                  quest.setState(AllowedQuestState.AVAILABLE);
              }
          }
          // In progress should be done, if quest fulfil-conditions are met
          if (quest.getState() === AllowedQuestState.IN_PROGRESS) {
              // if precondition is right
              if (quest.isPostReqComplete()) {
                  quest.setState(AllowedQuestState.DONE);
              }
          }
      });
      // 3. Assign UI elements to NPCs based on Quest state
      dist_4(entitiesThatGiveQuests, function (entityThatGivesQuest) {
          // Switch of the following:
          // if AVAILABLE, show yellow "?"
          // If done, show yellow "!"
          var doneQuests = entityThatGivesQuest.getQuestsByStatus(AllowedQuestState.DONE);
          var availableQuests = entityThatGivesQuest.getQuestsByStatus(AllowedQuestState.AVAILABLE);
          entityThatGivesQuest.hasComponents(HAS_ACTION_SIGN_COMP);
          if (isNonEmptyArray(availableQuests)) {
              entityThatGivesQuest.setQuestActionSymbol('?');
              return;
          }
          if (isNonEmptyArray(doneQuests)) {
              entityThatGivesQuest.setQuestActionSymbol('!');
              return;
          }
          // default,
          entityThatGivesQuest.removeComponent(HAS_ACTION_SIGN_COMP);
      });
  }

  function destroyAllButPlayer() {
      var player = dist_5.getByComp(PLAYER_CONTROLLED_COMP)[0];
      var allEnts = dist_5.getByComp(POSITION_COMP);
      dist_4(allEnts, function (entity) {
          if (entity !== player) {
              entity.destroy();
          }
      });
  }

  function moveAction(systemArguments, action) {
      var Entity = systemArguments.Entity;
      var direction = action.direction;
      var ent = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0];
      if (typeof direction !== 'undefined' && direction !== null) {
          ent.setMoveDirection(direction);
      }
      else {
          ent.removeDirection();
      }
  }

  var _a$2;
  var questsDataConfig = (_a$2 = {},
      _a$2[AllowedQuestIDs.CLEAR_CAMP] = {
          id: AllowedQuestIDs.CLEAR_CAMP,
          requiredLevel: 1,
          preCondition: '',
          reward: '',
          description: "Help us stranger!\nThe camp outside is filled with ugly monsters!\nKill them all, and I'll get you a reward",
          finishedText: "Thank you so much, here is your reward",
          kill: {
              killed: 0,
              killGoal: 2,
              location: AllowedLevelLocationIDs.SPAWNABLE_1
          }
      },
      _a$2);

  var Quest = /** @class */ (function (_super) {
      __extends(Quest, _super);
      function Quest(questID) {
          var _this = _super.call(this, Quest) || this;
          _this.addComponent(new QuestDataComponent(questID, questsDataConfig[questID]));
          return _this;
      }
      Quest.prototype.getFinishedText = function () {
          return this[QUEST_DATA_COMP].data.finishedText;
      };
      Quest.prototype.getDescription = function () {
          return this[QUEST_DATA_COMP].data.description;
      };
      Quest.prototype.getState = function () {
          return this[QUEST_DATA_COMP].data.state;
      };
      Quest.prototype.setState = function (newState) {
          this[QUEST_DATA_COMP].data.state = newState;
      };
      Quest.prototype.isPostReqComplete = function () {
          return true;
      };
      return Quest;
  }(BaseEntity));
  var KillQuest = /** @class */ (function (_super) {
      __extends(KillQuest, _super);
      function KillQuest(questID) {
          var _this = _super.call(this, questID) || this;
          // This 'Any' is allowed, as technically all this DataConfig will be coming from a JSON in the future
          // That JSON will be 'any'
          _this.addComponent(new KillQuestDataComponent(questID, questsDataConfig[questID]));
          return _this;
      }
      KillQuest.prototype.isPostReqComplete = function () {
          return this[KILL_QUEST_DATA_COMP].data.kill.killed >= this[KILL_QUEST_DATA_COMP].data.kill.killGoal;
      };
      return KillQuest;
  }(Quest));

  var CanAssignQuestsComponent = /** @class */ (function () {
      function CanAssignQuestsComponent(quests) {
          this.name = CAN_ASSIGN_QUESTS_COMP;
          this.quests = quests;
      }
      return CanAssignQuestsComponent;
  }());

  var FamNPC = /** @class */ (function (_super) {
      __extends(FamNPC, _super);
      function FamNPC(instanceAttributes, charConfig) {
          var _this = _super.call(this, instanceAttributes, charConfig) || this;
          _this.addComponent(new CanAssignQuestsComponent([
              new KillQuest(AllowedQuestIDs.CLEAR_CAMP)
          ]));
          _this.addComponent(new UIComponent([{
                  name: CANVAS_OUTPUT,
                  shape: AllowedUIShapes.PLAYER_CHAR,
                  data: {}
              }]));
          return _this;
      }
      return FamNPC;
  }(Character));

  function getEntitiesInTargetTile(systemArguments) {
      var tileIdxMap = systemArguments.tileIdxMap, Entity = systemArguments.Entity; systemArguments.levelArea;
      var entity = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0];
      var curOrientation = entity[POSITION_COMP].orientation;
      // tile to perform action on...
      var tileIdx = getTileIdxByEnt(entity);
      var col = +tileIdx.split(',')[0]; // TODO move to util to abstract the comma
      var row = +tileIdx.split(',')[1]; // TODO move to util to abstract the comma
      if (curOrientation === DIRECTIONS_OPTIONS.LEFT) {
          col -= 1;
      }
      if (curOrientation === DIRECTIONS_OPTIONS.RIGHT) {
          col += 1;
      }
      if (curOrientation === DIRECTIONS_OPTIONS.UP) {
          row -= 1;
      }
      if (curOrientation === DIRECTIONS_OPTIONS.DOWN) {
          row += 1;
      }
      var targetIdx = col + "," + row; // TODO move to util to abstract the comma
      /**
       * @type {IndexedTile}
       */
      var targetTile = tileIdxMap[targetIdx];
      var entities = targetTile && targetTile.entities || [];
      return {
          targetTile: targetTile,
          targetEntities: entities
      };
  }
  function performAction(systemArguments) {
      var _a = getEntitiesInTargetTile(systemArguments), targetEntities = _a.targetEntities, targetTile = _a.targetTile;
      var Entity = systemArguments.Entity, levelArea = systemArguments.levelArea, gameEvents = systemArguments.gameEvents;
      var player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0];
      dist_4(targetEntities, function (targetEnt) {
          // try to attack
          if (targetEnt.isAttackable() && targetTile && !player.isAttacking()) {
              player.addComponent(new IsAttackingComp(targetTile));
          }
          else {
              // try to activate a trigger
              var triggers = levelArea.triggers.actOnEntity[targetEnt.name];
              if (targetEnt instanceof FamNPC) {
                  gameEvents.pushEvent(new InteractWithNPC(targetEnt));
              }
              // TODO should the trigger system listen to Game Events?
              if (isNonEmptyArray(triggers)) {
                  // activate all triggers related to acting on this entity
                  for (var i = 0; i < triggers.length; i++) {
                      var trigger = triggers[i];
                      if (trigger.type === 'dialog') {
                          pushTrigger(new Trigger({
                              type: 'dialog',
                              lines: trigger.lines,
                              actedOnEntity: targetEnt
                          }));
                      }
                  }
                  return;
              }
          }
      });
  }

  var _a$1, _b;
  var AllowedTrees;
  (function (AllowedTrees) {
      AllowedTrees["MAGIC"] = "MAGIC";
      AllowedTrees["TECH"] = "TECH";
      AllowedTrees["ZEN"] = "ZEN";
      AllowedTrees["FORCE"] = "FORCE";
  })(AllowedTrees || (AllowedTrees = {}));
  var AllowedSkills;
  (function (AllowedSkills) {
      AllowedSkills["FIRE_BULLET"] = "FIRE_BULLET";
      AllowedSkills["SUPER_NOVA"] = "SUPER_NOVA";
  })(AllowedSkills || (AllowedSkills = {}));
  var skillsConfig = (_a$1 = {},
      _a$1[AllowedSkills.FIRE_BULLET] = {
          id: AllowedSkills.FIRE_BULLET,
          name: 'Fire Bullet',
          cost: 100,
          description: 'Fire a bullet of fire at your enemies'
      },
      _a$1[AllowedSkills.SUPER_NOVA] = {
          id: AllowedSkills.SUPER_NOVA,
          name: 'SuperNova',
          cost: 550,
          description: 'An engulfing nova to scorch your enemies'
      },
      _a$1);
  var skillTreesConfig = (_b = {},
      _b[AllowedTrees.MAGIC] = {
          id: AllowedTrees.MAGIC,
          name: 'Magic',
          skills: [
              skillsConfig[AllowedSkills.FIRE_BULLET],
              skillsConfig[AllowedSkills.SUPER_NOVA]
          ]
      },
      _b[AllowedTrees.FORCE] = {
          id: AllowedTrees.FORCE,
          name: 'Force',
          skills: []
      },
      _b[AllowedTrees.ZEN] = {
          id: AllowedTrees.ZEN,
          name: 'Zen',
          skills: []
      },
      _b[AllowedTrees.TECH] = {
          id: AllowedTrees.TECH,
          name: 'Tech',
          skills: []
      },
      _b);

  function buySkill(systemArguments, action) {
      var Entity = systemArguments.Entity; systemArguments.levelArea; var gameEvents = systemArguments.gameEvents;
      var player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0];
      // TODO how can we improve type safety here?
      if (action.data && action.data.skillID) {
          var skillID = action.data.skillID;
          var hasSkill = player[CHARACTER_SKILLS_COMP].skills.includes(skillID);
          if (!hasSkill) {
              var skill = skillsConfig[skillID];
              if (player[EXPERIENCE_COMP].XP > skill.cost) {
                  player[CHARACTER_SKILLS_COMP].skills.push(skillID);
                  player[EXPERIENCE_COMP].XP -= skill.cost;
                  gameEvents.pushEvent(new PlayerSkillsChangeEvent(player));
              }
          }
      }
  }

  function buyAttr(systemArguments, action) {
      var Entity = systemArguments.Entity; systemArguments.levelArea; var gameEvents = systemArguments.gameEvents;
      var player = Entity.getByComp(PLAYER_CONTROLLED_COMP)[0];
      // TODO how can we improve type safety here?
      if (action.data && action.data.attrID) {
          var attrID = action.data.attrID;
          if (player[CHARACTER_ATTRIBUTES_COMP].spendableAttributePoints > 0) {
              player[CHARACTER_ATTRIBUTES_COMP].spendableAttributePoints--;
              player[CHARACTER_ATTRIBUTES_COMP].attributes[attrID]++;
              gameEvents.pushEvent(new PlayerAttributesChangeEvent(player));
          }
      }
  }

  var _a;
  var actionMap = (_a = {},
      _a[AllowedActions.MOVE_ACTION] = moveAction,
      _a[AllowedActions.PERFORM_ACTION] = performAction,
      _a[AllowedActions.BUY_SKILL] = buySkill,
      _a[AllowedActions.BUY_ATTR] = buyAttr,
      _a);
  // store our actions, singleton
  var actions = [];
  function userInputSystem(systemArguments) {
      // loop over all actions
      actions.forEach(function (action) {
          if (actionMap[action.name]) {
              actionMap[action.name](systemArguments, action);
          }
      });
      // reset actions when we're done
      if (actions.length) {
          actions = [];
      }
  }
  function pushAction(action) {
      actions.push(action);
  }

  var AIControlledComp = /** @class */ (function () {
      function AIControlledComp() {
          this.name = AI_CONTROLLED_COMP;
      }
      return AIControlledComp;
  }());

  var SpawnedComponent = /** @class */ (function () {
      function SpawnedComponent(spawningTileLocationID) {
          this.name = SPAWNED_COMP;
          this.spawningTileLocationID = spawningTileLocationID;
      }
      return SpawnedComponent;
  }());

  var Enemy = /** @class */ (function (_super) {
      __extends(Enemy, _super);
      function Enemy(instanceAttributes, charConfig) {
          var _this = _super.call(this, instanceAttributes, charConfig) || this;
          instanceAttributes.col; instanceAttributes.row; instanceAttributes.characterLevel; var spawningTileLocationID = instanceAttributes.spawningTileLocationID;
          charConfig.speed; charConfig.health; charConfig.radius; charConfig.dmg; charConfig.attackSpeed; charConfig.vision; charConfig.animationTypes; charConfig.id; charConfig.displayName;
          _this.addComponent(new SpawnedComponent(spawningTileLocationID));
          _this.addComponent(new AIControlledComp());
          return _this;
      }
      return Enemy;
  }(Character));

  function spawnEnemiesSystem(systemArguments) {
      var Entity = systemArguments.Entity;
      var spawningEntities = Entity.getByComps([CAN_SPAWN_COMP]);
      var monsterDensity = systemArguments.levelArea.monsterDensity;
      dist_4(spawningEntities, function (spawningEntity) {
          var _a = spawningEntity.getPos(), x = _a.x, y = _a.y; // for example a tile that can spawn
          var _b = getGridIdxFromPos(x, y), col = _b.col, row = _b.row;
          var spawningTileLocationID = spawningEntity[CAN_SPAWN_COMP].tileLocationID;
          var characterLevel = spawningEntity[CAN_SPAWN_COMP].tileCharacterLevel;
          var spawnableEnemies = systemArguments.levelArea.spawnableEnemies;
          spawnableEnemies.forEach(function (enemyToSpawn) {
              if (Math.random() < monsterDensity) { // TODO refactor to a function "rollDie" or "resolveChance"
                  // Fetch what to spawn from config!
                  var characterConfig = charactersDataConfig[enemyToSpawn];
                  if (characterConfig) {
                      new Enemy({ col: col, row: row, characterLevel: characterLevel, spawningTileLocationID: spawningTileLocationID }, characterConfig);
                      return;
                  }
              }
          });
          spawningEntity.removeComponent(CAN_SPAWN_COMP);
      });
  }

  /**
   * Created by patrik.tolosa on 2019-10-23.

   */
  function getCenterPosOfTile(tileIdx) {
      var _a = getColRowByTileIdx(tileIdx), col = _a.col, row = _a.row;
      return {
          x: col * bit + bit / 2,
          y: row * bit + bit / 2
      };
  }
  var ShockWave = /** @class */ (function () {
      function ShockWave(_a) {
          var x = _a.x, y = _a.y, _b = _a.radius, radius = _b === void 0 ? 16 : _b, fromTileIdx = _a.fromTileIdx, toTileIdx = _a.toTileIdx, _c = _a.color, color = _c === void 0 ? 'red' : _c;
          var entity = new BaseEntity(ShockWave);
          entity.addComponent(new PositionComponent({ x: x, y: y, radius: radius }));
          entity.addComponent(new UIComponent([]));
          var origin = getCenterPosOfTile(fromTileIdx);
          var target = getCenterPosOfTile(toTileIdx);
          var deltaX = target.x - origin.x;
          var deltaY = target.y - origin.y;
          var direction;
          if (deltaX === 0) {
              direction = deltaY > 0 ? 0.5 : -0.5;
          }
          else if (deltaY === 0) {
              direction = deltaX > 0 ? 0 : 1;
          }
          else {
              direction = Math.atan(deltaY / deltaX);
          }
          var frames = [];
          var frameCount = 15;
          var animationDuration = 15;
          var i = 0;
          var sizeToGrow = 0.1;
          var radiusToGrow = 20;
          while (i < frameCount) {
              frames.push({
                  shape: AllowedUIShapes.ARC_SHAPE,
                  direction: direction,
                  size: 0.2 + i * sizeToGrow / frameCount,
                  radius: 16 + i * radiusToGrow / frameCount,
                  x: origin.x,
                  y: origin.y,
                  color: color
              });
              i++;
          }
          entity.addComponent(new AnimationComp({
              SHOCKWAVE: {
                  animationDuration: animationDuration,
                  frames: frames,
                  animationName: 'SHOCKWAVE',
                  loops: false
              }
          }));
          entity.addAnimation(entity.getAnimationTypes().SHOCKWAVE);
          return entity;
      }
      return ShockWave;
  }());

  function attackSystem(systemArguments) {
      var gameEvents = systemArguments.gameEvents;
      var entities = dist_5.getByComps([IS_ATTACKING_COMP, ATTACK_COMP]);
      if (entities.length) {
          dist_4(entities, function (entity) {
              var dmg = entity[ATTACK_COMP].damage;
              var coolDownFrames = entity[ATTACK_COMP].cooldownFrames;
              var targetTile = entity[IS_ATTACKING_COMP].targetTile;
              var currentFrame = entity[IS_ATTACKING_COMP].currentFrame;
              if (currentFrame === coolDownFrames) {
                  entity.removeComponent(IS_ATTACKING_COMP);
                  return;
              }
              if (currentFrame > 0) {
                  entity[IS_ATTACKING_COMP].currentFrame++;
                  return;
              }
              if (targetTile.getEntCount() === 0) {
                  entity.removeComponent(IS_ATTACKING_COMP);
                  return;
              }
              for (var entID in targetTile.entities) {
                  if (entity === targetTile.entities[entID]) {
                      continue; // cannot attack self.
                  }
                  var entTarget = targetTile.entities[entID];
                  // do the attack, ensure health is >= 0
                  entTarget[HEALTH_COMP].current -= dmg;
                  entTarget[HEALTH_COMP].current = Math.max(entTarget[HEALTH_COMP].current, 0);
                  if (entTarget[PLAYER_CONTROLLED_COMP]) {
                      gameEvents.pushEvent(new PlayerIsAttacked(entTarget));
                  }
                  new ShockWave({
                      x: entity.getPos().x,
                      y: entity.getPos().y,
                      fromTileIdx: getTileIdxByEnt(entity),
                      toTileIdx: targetTile.idx
                  });
                  // remove dead entities
                  if (entTarget[HEALTH_COMP].current <= 0) {
                      // remove the entity from the tile...
                      targetTile.removeEnt(entTarget);
                      gameEvents.pushEvent(new EnemyKilledEvent(entTarget));
                  }
              }
              entity[IS_ATTACKING_COMP].currentFrame++;
          });
      }
  }

  var PlayerState = /** @class */ (function () {
      function PlayerState(playerStateProperties) {
          Object.assign(this, playerStateProperties);
      }
      return PlayerState;
  }());
  var PlayerStateChangeEvent = /** @class */ (function (_super) {
      __extends(PlayerStateChangeEvent, _super);
      function PlayerStateChangeEvent(playerStateProperties) {
          var _this = _super.call(this, playerStateProperties) || this;
          _this.type = 'UI_EVENT';
          _this.name = 'PLAYER_STATE_CHANGE';
          return _this;
      }
      return PlayerStateChangeEvent;
  }(PlayerState));

  function experienceSystem(systemArguments) {
      var gameEvents = systemArguments.gameEvents;
      var player = dist_5.getByComps([PLAYER_CONTROLLED_COMP])[0];
      gameEvents.getEvents().forEach(function (event) {
          if (event instanceof EnemyKilledEvent) {
              var currentXP = player[EXPERIENCE_COMP].XP;
              var newXP = event.entity[LEVEL_COMP].characterLevel; // we currently give a certain XP boost per character level
              player[EXPERIENCE_COMP].XP = currentXP + newXP;
          }
      });
      // just in case we advanced several levels during this iteration
      while (player[EXPERIENCE_COMP].getLevelProgress() >= 1) {
          player[EXPERIENCE_COMP].level++;
          player[CHARACTER_ATTRIBUTES_COMP].spendableAttributePoints++;
      }
  }

  function getSafeDest(destX, destY, mapWidth, mapHeight) {
      var marginFromSides = bit / 2;
      // 0 is minY and minX for the map
      return {
          x: Math.max(Math.min(destX, mapWidth - marginFromSides), 0, marginFromSides),
          y: Math.max(Math.min(destY, mapHeight - marginFromSides), 0, marginFromSides)
      };
  }

  // is an x, y traversable for an entity
  function isTraversable(tileIdxMap, x, y, entity) {
      var tileIdx = getTileIdxByPos(x, y);
      if (!tileIdxMap[tileIdx]) {
          return;
      }
      var indexedTile = tileIdxMap[tileIdx];
      if (indexedTile.getEntCount() > 0) {
          // someone is in this tile.. but it's me..
          if (indexedTile.entities[entity.id] && indexedTile.getEntCount() === 1) ;
          else {
              return false;
          }
      }
      var tile = tileIdxMap[tileIdx].tile;
      return tile && tile.hasComponents(TRAVERSABLE_COMP);
  }

  function calcNewPosToMove(entity, originX, originY, destX, destY) {
      assertType(originX, 'originX', 'number');
      assertType(originY, 'originY', 'number');
      assertType(destY, 'destY', 'number');
      assertType(destX, 'destX', 'number');
      var speed = entity[MOVEMENT_COMP].speed;
      var speedX = destX >= originX ? speed : speed * -1;
      var speedY = destY >= originY ? speed : speed * -1;
      var minMaxX = speedX > 0 ? Math.min : Math.max;
      var minMaxY = speedY > 0 ? Math.min : Math.max;
      return {
          x: minMaxX(originX + speedX, destX),
          y: minMaxY(originY + speedY, destY)
      };
  }

  // Allowed 'any' as this is a runtime check
  function isNum(num) {
      return typeof num === 'number';
  }

  // TODO - Sort this mess :) -- ORIENTATION vs DIRECTION vs animation.direction
  /**
   *
   * @param systemArguments
   * @param {BaseEntity} entity
   */
  function moveEntity(systemArguments, entity) {
      var mapAPI = systemArguments.mapAPI, game = systemArguments.game, tileIdxMap = systemArguments.tileIdxMap, viewSize = systemArguments.viewSize, levelArea = systemArguments.levelArea;
      var mapHeight = viewSize.mapHeight, mapWidth = viewSize.mapWidth, viewHeight = viewSize.viewHeight, viewWidth = viewSize.viewWidth;
      var _a = entity.getPos(), currX = _a.x, currY = _a.y;
      var _b = entity.getDest(), desiredDestX = _b.x, desiredDestY = _b.y;
      var direction = entity.getMoveDirection();
      // the user has a desired place he wants to go..
      var modDestX = desiredDestX;
      var modDestY = desiredDestY;
      // Set the modified, safe destination for the user
      if (isNum(desiredDestX) && isNum(desiredDestY)) {
          // make sure the that the desired destination is valid, and doesn't leave the map
          var _c = getSafeDest(desiredDestX, desiredDestY, mapWidth, mapHeight), x = _c.x, y = _c.y;
          modDestY = y;
          modDestX = x;
      }
      else if (typeof direction !== 'undefined' && direction !== null) { // TODO replace with a util? // OR change the ENUM to start from 1?
          // create destination from the direction we want to go
          var _d = entity.getDestFromDirection(direction), x = _d.x, y = _d.y;
          modDestY = y;
          modDestX = x;
      }
      else {
          // no direction, no destination? too bad, stop.
          entity.stop();
          return;
      }
      entity.setOrientation(entity.calcOrientation(modDestX, modDestY));
      var animationName = "MOVE_" + entity.getOrientation();
      var animationToAdd = entity.getAnimationTypes()[animationName];
      // Only add this animation if we don't have it already
      if (animationToAdd && !entity.hasSpecificAnimation(animationName)) {
          entity.clearAllAnimations();
          entity.addAnimation(entity.getAnimationTypes()[animationName]);
      }
      // set destination
      entity.setDest({
          x: modDestX,
          y: modDestY
      });
      /**
       * Stopping Point - Was our destination reached? if it was, we stop.
       */
      if (entity.isDestReached()) {
          // insert the entity as an occupant of the tile
          // since we're moving - make sure the entity leaves the origin tile
          updateMapTileIdx({
              entity: entity,
              tileIdxMap: tileIdxMap,
              newX: entity.getDest().x,
              newY: entity.getDest().y,
              oldX: entity[POSITION_COMP].originX,
              oldY: entity[POSITION_COMP].originY
          });
          // if entity has a direction it wants to go, lets stop it, and reset its movement in the direction
          entity.stop();
          var _e = entity.getPos(), x = _e.x, y = _e.y;
          assertType((x + 16) % 32 === 0, "Entities should be on the grid " + x + " " + y, true);
          assertType((y + 16) % 32 === 0, 'gameEngine/entities should be on the grid', true);
          if (typeof direction !== 'undefined' && direction !== null) {
              entity.setMoveDirection(direction);
          }
          /**
           * Execute possible triggers when movement is done
           */
          var _f = getGridIdxFromPos(x, y); _f.col; _f.row;
          var tileIdx = getTileIdxByPos(x, y);
          var triggers = levelArea.triggers.move[tileIdx];
          if (isNonEmptyArray(triggers)) {
              triggers.forEach(function (trigger) {
                  if (trigger.type === 'dialog') {
                      pushTrigger(new Trigger({
                          type: 'dialog',
                          lines: trigger.lines,
                          actedOnEntity: null
                      }));
                  }
              });
          }
          return;
      }
      /**
       * Stopping Point - Is our (modified) destination traversable? if not, we stop.
       */
      if (!isTraversable(tileIdxMap, modDestX, modDestY, entity)) {
          entity.stop();
          return;
      }
      /**
       * Prep before we move, occupy the target tile
       */
      updateMapTileIdx({ entity: entity, tileIdxMap: tileIdxMap, newX: entity.getDest().x, newY: entity.getDest().y });
      /**
       * Calc the new X,Y to move to
       */
      var _g = calcNewPosToMove(entity, currX, currY, entity.getDest().x, entity.getDest().y), newX = _g.x, newY = _g.y;
      /**
       * Update, at the end of the tick, the indexMap
       *
       * Do not free your tile until the end of the tick
       * If you release it too soon, this situation occures;
       * player -> going from 0 to 1
       * enemy -> going from 1 to 0
       * since at the moment of 'going' the tile is already free, the entities pass through each other
       * by waiting for the next tick(or the end of this one), we guarantee that for the duration of THIS tick
       * both destination and origin are occupied
       */
      Promise.resolve().then(function () {
          updateMapTileIdx({ entity: entity, tileIdxMap: tileIdxMap, oldX: currX, oldY: currY });
      });
      entity.setPos({
          x: newX,
          y: newY
      });
      /**
       * Pan the camera around the player controlled entity
       */
      /* istanbul ignore else */
      if (entity.isPlayer()) {
          centerCameraOnEntity(entity, mapAPI, game, viewWidth, viewHeight, mapWidth, mapHeight);
      }
  }
  function moveSystem(systemArguments) {
      var entities = dist_5.getByComps([MOVEMENT_COMP, POSITION_COMP, IS_MOVING_COMP]);
      if (entities.length) {
          dist_4(entities, function (entity) {
              moveEntity(systemArguments, entity);
          });
      }
  }

  var Chest = /** @class */ (function (_super) {
      __extends(Chest, _super);
      function Chest(instanceAttributes, charConfig) {
          var _this = _super.call(this, instanceAttributes, charConfig) || this;
          _this.addComponent(new UIComponent([{
                  name: CANVAS_OUTPUT,
                  shape: AllowedUIShapes.CHEST_SHAPE,
                  data: {}
              }]));
          return _this;
      }
      return Chest;
  }(Character));

  /**
   * @description Place entities in a given levelArea.
   *              Used to place Enemies as well as Friendly NPCs
   *              enemies placed here are configured in levelArea.entitiesToPlace, including their characterLevel
   * @param {ILevelArea} levelArea
   * @param {ITileIndexMap} tileIdxMap
   */
  function placeLevelEntities(levelArea, tileIdxMap) {
      for (var i = 0; i < levelArea.entitiesToPlace.length; i++) {
          var entityToPlace = levelArea.entitiesToPlace[i];
          var entity = undefined;
          var _a = entityToPlace.pos, col = _a.col, row = _a.row;
          var _b = getCenterPosOfGridIdx(col, row); _b.x; _b.y;
          var characterLevel = entityToPlace.characterLevel;
          // Fetch what to spawn from config!
          var characterConfig = charactersDataConfig[entityToPlace.characterType];
          if (characterConfig) {
              switch (entityToPlace.characterType) {
                  case CHARACTERS.CHEST: {
                      entity = new Chest({ col: col, row: row, characterLevel: characterLevel, spawningTileLocationID: null }, characterConfig);
                      break;
                  }
                  case CHARACTERS.FAM_NPC: {
                      entity = new FamNPC({ col: col, row: row, characterLevel: characterLevel, spawningTileLocationID: null }, characterConfig);
                      break;
                  }
                  default: {
                      entity = new Enemy({ col: col, row: row, characterLevel: characterLevel, spawningTileLocationID: null }, characterConfig);
                  }
              }
          }
          if (!entity) {
              assertType(entity, 'Entity to place', 'object');
              return;
          }
          updateMapTileIdx({ entity: entity, tileIdxMap: tileIdxMap, newX: entity.getPos().x, newY: entity.getPos().y });
      }
  }

  var GameLoop = /** @class */ (function () {
      function GameLoop(_a) {
          var _this = this;
          var getMapAPI = _a.getMapAPI, getMinimapAPI = _a.getMinimapAPI, levelArea = _a.levelArea, viewSize = _a.viewSize, onAreaChange = _a.onAreaChange, gameEventListener = _a.gameEventListener;
          dist_5.reset();
          this.dispatchAction = this.dispatchAction.bind(this);
          var engine = new dist_1();
          this.engine = engine;
          this.getMapAPI = getMapAPI;
          this.getMinimapAPI = getMinimapAPI;
          this.gameEventListener = gameEventListener;
          this.onAreaChange = onAreaChange;
          this.gameEvents = new GameEvents();
          // TODO this probably needs to be related to player movement speed
          // this should also probably be refactored out
          this.requestBackgroundRender = throttle(this.requestBackgroundRender.bind(this), 100);
          this.setLevelArea(levelArea, viewSize);
          engine.addSystem(userInputSystem);
          engine.addSystem(triggerSystem);
          engine.addSystem(spawnEnemiesSystem);
          engine.addSystem(moveSystem);
          engine.addSystem(aiSystem);
          engine.addSystem(attackSystem);
          engine.addSystem(renderSystem);
          engine.addSystem(animationSystem);
          engine.addSystem(portalSystem);
          engine.addSystem(questSystem);
          engine.addSystem(experienceSystem);
          // DestroyEntity system
          // TODO export to a system file
          engine.addSystem(function (systemArguments) {
              var gameEvents = systemArguments.gameEvents;
              var hasEvents = gameEvents.getEvents().length > 0;
              gameEvents.getEvents().forEach(function (event) {
                  if (event instanceof EnemyKilledEvent) {
                      event.readEvent().entity.destroy();
                  }
              });
              if (hasEvents) {
                  _this.dispatchGameEvent(_this.getPlayerStateEvent());
              }
          });
          // End Tick system
          // TODO export to a system file
          engine.addSystem(function (systemArguments) {
              var gameEvents = systemArguments.gameEvents;
              //notify UI (App.tsx) of certain events
              gameEvents.getEvents().forEach(function (event) {
                  // TODO, do we want a more general 'NotifyUISystem' event?
                  // TODO this feels too specific :)
                  // TODO rename PlayerIsAttacked to PlayerIsAttackedEvent
                  if (event instanceof PlayerIsAttacked ||
                      event instanceof PlayerSkillsChangeEvent ||
                      event instanceof PlayerAttributesChangeEvent) {
                      _this.dispatchGameEvent(_this.getPlayerStateEvent());
                  }
              });
              // throw away old events, create a new empty list
              _this.gameEvents.endTick();
          });
          this.dispatchGameEvent(this.getPlayerStateEvent());
          // TODO resume? maybe start()?
          this.resume();
      }
      GameLoop.prototype.dispatchGameEvent = function (event) {
          this.gameEventListener(event);
      };
      GameLoop.prototype.getSystemArguments = function (getMapAPI, getMinimapAPI) {
          return {
              tileIdxMap: this.tileIdxMap,
              levelArea: this.levelArea,
              tileSetSprite: assetLoader.getAsset(TILESET_IMAGE_URL),
              characterSprite: assetLoader.getAsset(CHAR_SPRITE_URL),
              Entity: dist_5,
              viewSize: this.viewSize,
              shouldRenderBackground: this.renderBackground,
              game: this,
              mapAPI: getMapAPI(),
              minimapAPI: getMinimapAPI(),
              gameEvents: this.gameEvents
          };
      };
      // TODO this is for development/ EDITOR mode only!
      GameLoop.prototype.setPlayerPosition = function (col, row) {
          var player = dist_5.getByComp(PLAYER_CONTROLLED_COMP)[0];
          player.setPos({
              x: bit / 2 + col * bit,
              y: bit / 2 + row * bit
          });
          this.centerOnPlayer();
      };
      // TODO this is for development/ EDITOR mode only!
      GameLoop.prototype.centerOnPlayer = function () {
          var player = dist_5.getByComp(PLAYER_CONTROLLED_COMP)[0];
          this.renderBackground = true; // for the first time
          var mapAPI = this.getMapAPI();
          var _a = this.viewSize, viewWidth = _a.viewWidth, viewHeight = _a.viewHeight, mapWidth = _a.mapWidth, mapHeight = _a.mapHeight;
          centerCameraOnEntity(player, mapAPI, this, viewWidth, viewHeight, mapWidth, mapHeight, true);
      };
      GameLoop.prototype.setLevelArea = function (levelArea, viewSize, targetTile) {
          if (targetTile === void 0) { targetTile = null; }
          var viewWidth = viewSize.viewWidth, viewHeight = viewSize.viewHeight, mapWidth = viewSize.mapWidth, mapHeight = viewSize.mapHeight;
          var mapAPI = this.getMapAPI();
          this.renderBackground = true; // for the first time
          this.levelArea = levelArea;
          this.viewSize = viewSize;
          destroyAllButPlayer(); // TODO if we plan to have a single world, this is a problem :)
          this.tileIdxMap = createTileIndexMap(levelArea, viewSize);
          var player = placePlayerInLevel(levelArea, this.tileIdxMap, targetTile);
          placeLevelEntities(levelArea, this.tileIdxMap);
          // set triggers
          if (isNonEmptyArray(levelArea.triggers.levelStart)) {
              levelArea.triggers.levelStart.forEach(function (configuredTrigger) {
                  // activateTrigger ...
                  if (configuredTrigger.type === 'dialog') {
                      pushTrigger(new Trigger({
                          type: 'dialog',
                          lines: configuredTrigger.lines,
                          actedOnEntity: player
                      }));
                  }
              });
          }
          centerCameraOnEntity(player, mapAPI, this, viewWidth, viewHeight, mapWidth, mapHeight, true);
          this.renderBackground = true; // for the first time
      };
      // TODO - EDITOR MODE ONLY
      GameLoop.prototype.changeTileType = function (tile, newType) {
          assertType(tile, 'Tile', 'object');
          tile.setTileType(newType);
          // levelArea.tileMap[row][col], this the RAW json that creates the level - this is what we want to save after..
          var _a = getColRowByTileIdx(tile.tileIdx), col = _a.col, row = _a.row;
          this.levelArea.tileMap[row][col] = +newType;
          this.renderBackground = true; // for the first time
          return this.levelArea;
      };
      GameLoop.prototype.handleAreaChange = function (level, area, newPlayerPosition) {
          this.onAreaChange(level, area, newPlayerPosition);
      };
      GameLoop.prototype.requestBackgroundRender = function () {
          this.renderBackground = true;
      };
      GameLoop.prototype.notifyBackgroundWasRendered = function () {
          this.renderBackground = false;
      };
      GameLoop.prototype.resume = function () {
          var _this = this;
          if (!this.isRunning) {
              this.isRunning = true;
              this.engine.run(function () {
                  return _this.getSystemArguments(_this.getMapAPI, _this.getMinimapAPI);
              });
          }
      };
      GameLoop.prototype.stop = function () {
          this.isRunning = false;
          this.engine.stop();
      };
      GameLoop.prototype.activateTrigger = function (trigger) {
          pushTrigger(trigger);
      };
      GameLoop.prototype.getPlayerStateEvent = function () {
          var player = dist_5.getByComp(PLAYER_CONTROLLED_COMP)[0];
          return new PlayerStateChangeEvent({
              maxHealth: player[HEALTH_COMP].max,
              currentHealth: player[HEALTH_COMP].current,
              percentHealth: player[HEALTH_COMP].current / player[HEALTH_COMP].max,
              skills: __spreadArray([], player[CHARACTER_SKILLS_COMP].skills),
              spendableXP: player[EXPERIENCE_COMP].XP,
              levelProgress: player[EXPERIENCE_COMP].getLevelProgress(),
              attributes: player[CHARACTER_ATTRIBUTES_COMP].attributes,
              spendableAttributePoints: player[CHARACTER_ATTRIBUTES_COMP].spendableAttributePoints
          });
      };
      // TODO trigger vs Action vs GameEvent vs UIEvent - Oh My.
      // Action - Incoming action from the UI. TODO maybe rename to playerAction or userAction or inputEvent
      // GameEvent is relatively clear, an event originated from the game.
      // UIEvent - An event dispatched from the game, to the UI
      // trigger - Triggers game logic within the game (trigger system)
      GameLoop.prototype.dispatchAction = function (action) {
          pushAction(action);
      };
      return GameLoop;
  }());

  var Glob = /** @class */ (function () {
      function Glob() {
      }
      return Glob;
  }());
  function registerUserInputEvents(game) {
      var glob = new Glob();
      document.body.addEventListener('keyup', function (event) {
          glob.keyPressed = false;
          // Stop.. on key up, right?
          game.dispatchAction({
              name: AllowedActions.MOVE_ACTION
          });
      });
      document.body.addEventListener('keydown', function (event) {
          if (glob.keyPressed) {
              return true;
          }
          glob.keyPressed = true;
          var code = +(event.which || event.keyCode || event.code);
          // Support arrow keys and WASD
          var map = {
              37: DIRECTIONS_OPTIONS.LEFT,
              38: DIRECTIONS_OPTIONS.UP,
              39: DIRECTIONS_OPTIONS.RIGHT,
              40: DIRECTIONS_OPTIONS.DOWN,
              65: DIRECTIONS_OPTIONS.LEFT,
              87: DIRECTIONS_OPTIONS.UP,
              68: DIRECTIONS_OPTIONS.RIGHT,
              83: DIRECTIONS_OPTIONS.DOWN
          };
          if (code === 32) {
              if (!game.isRunning) {
                  game.resume(); // if it was paused, this unpauses it..
              }
              else {
                  game.dispatchAction({
                      name: AllowedActions.PERFORM_ACTION
                  });
              }
          }
          else {
              var direction = map[code];
              if (map.hasOwnProperty(code)) {
                  game.dispatchAction({
                      name: AllowedActions.MOVE_ACTION,
                      direction: direction
                  });
              }
          }
      });
  }

  function hasValue(x) {
      return typeof x !== 'undefined' && typeof x !== null;
  }

  var oneMap = [
  	[
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		100,
  		9,
  		8,
  		8,
  		10,
  		9,
  		10,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		100,
  		10,
  		10,
  		10,
  		10,
  		10,
  		9,
  		10,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		9,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		100,
  		9,
  		5,
  		5,
  		5,
  		9,
  		9,
  		10,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		10,
  		100,
  		100,
  		100,
  		100,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		2,
  		2,
  		2,
  		2,
  		2,
  		100,
  		9,
  		3,
  		4,
  		3,
  		9,
  		8,
  		10,
  		10,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		100,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		9,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		100,
  		100,
  		2,
  		2,
  		100,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		2,
  		2,
  		2,
  		100,
  		100,
  		100,
  		9,
  		1,
  		7,
  		1,
  		9,
  		8,
  		8,
  		8,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		100,
  		100,
  		2,
  		100,
  		100,
  		100,
  		1,
  		1,
  		9,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		100,
  		2,
  		2,
  		100,
  		100,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		9,
  		1,
  		7,
  		1,
  		9,
  		8,
  		5,
  		5,
  		5,
  		1,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		9,
  		9,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		100,
  		2,
  		2,
  		100,
  		10,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		100,
  		100,
  		100,
  		100,
  		100,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		3,
  		4,
  		3,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		9,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		9,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		100,
  		100,
  		100,
  		100,
  		10,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		7,
  		7,
  		7,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		9,
  		9,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		7,
  		9,
  		1,
  		1,
  		1,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		1,
  		1,
  		1,
  		9,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		10,
  		1,
  		10,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		7,
  		7,
  		7,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		5,
  		5,
  		5,
  		1,
  		1,
  		1,
  		1,
  		0,
  		9,
  		9,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		9,
  		1,
  		1,
  		7,
  		7,
  		1,
  		1,
  		1,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		3,
  		4,
  		3,
  		1,
  		1,
  		1,
  		1,
  		0,
  		9,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		8,
  		8,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		5,
  		5,
  		5,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		9,
  		9,
  		9,
  		1,
  		1,
  		7,
  		7,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		9,
  		1,
  		9,
  		7,
  		1,
  		1,
  		1,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		3,
  		3,
  		3,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		0,
  		9,
  		9,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		0,
  		0,
  		0,
  		0,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		1,
  		1,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		0,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		8,
  		8,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		9,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		1,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		1,
  		1,
  		1,
  		7,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		6,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		2,
  		2,
  		2,
  		2,
  		0,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		0,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		2,
  		2,
  		2,
  		0,
  		1,
  		1,
  		1,
  		1,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		1,
  		9,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		10,
  		1,
  		10,
  		1,
  		10,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		10,
  		10,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		1,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		8,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		9,
  		9,
  		9,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		10,
  		9,
  		9,
  		9,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		8,
  		8,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		11,
  		0,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		1,
  		1,
  		1,
  		2,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		2,
  		2,
  		0,
  		100,
  		100,
  		100,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		2,
  		2,
  		0,
  		0,
  		100,
  		100,
  		100,
  		100,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0
  	],
  	[
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		2,
  		2,
  		2,
  		2,
  		7,
  		2,
  		2,
  		2,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		8,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		0,
  		0,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		10,
  		10,
  		1,
  		1,
  		1,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		5,
  		5,
  		5,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		9,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		3,
  		4,
  		3,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		9,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		0,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		9,
  		9,
  		9,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		9,
  		9,
  		9,
  		9,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		9,
  		9,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		9,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		1,
  		1,
  		0,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		10,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		7,
  		7,
  		7,
  		7,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		10,
  		1,
  		10,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		100,
  		10,
  		10,
  		10,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		100,
  		2,
  		10,
  		10,
  		2,
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		100,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		100,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		100,
  		100,
  		12,
  		12,
  		100,
  		100,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		100,
  		12,
  		12,
  		12,
  		12,
  		100,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		100,
  		12,
  		12,
  		12,
  		12,
  		100,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		100,
  		12,
  		12,
  		11,
  		12,
  		100,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		100,
  		100,
  		100,
  		100,
  		100,
  		100,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		7,
  		7,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		0,
  		0,
  		0,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		7,
  		7,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		7,
  		7,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		7,
  		7,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		8,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		7,
  		7,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		7,
  		7,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		7,
  		7,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		7,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		8,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		8,
  		8,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		10,
  		10,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	],
  	[
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		100,
  		2,
  		2,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		1000,
  		2,
  		2,
  		100,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1,
  		1
  	]
  ];

  var townLocation;
  townLocation = {
      id: AllowedLevelLocationIDs.TOWN,
      name: 'town',
      locationCharacterLevel: 1,
      start: {
          col: 0,
          row: 0,
      },
      end: {
          col: 32,
          row: 18,
      }
  };
  var townLocation$1 = townLocation;

  var spawnableOneLocation;
  spawnableOneLocation = {
      id: AllowedLevelLocationIDs.SPAWNABLE_1,
      name: 'JUST_LOCATION_NAME',
      start: {
          col: 33,
          row: 0,
      },
      end: {
          col: 100,
          row: 18,
      },
      locationCharacterLevel: 50
  };
  var spawnableOneLocation$1 = spawnableOneLocation;

  var levelsJSON = [
  	{
  		id: "0-0",
  		level: 0,
  		area: 0,
  		description: "Elvenar",
  		player_start_pos: {
  			col: 4,
  			row: 4
  		},
  		monster_spawns: [
  			"IMP",
  			"VAMPIRE"
  		],
  		exits: {
  			"5,5": {
  				area: 1,
  				level: 0,
  				exitTile: {
  					col: 4,
  					row: 95
  				}
  			},
  			"10,10": {
  				area: 1,
  				level: 0,
  				exitTile: {
  					col: 5,
  					row: 5
  				}
  			}
  		},
  		mon_per_tile: 0.05,
  		no_spawn_locations: [
  			{
  				start: {
  					x: 0,
  					y: 0
  				},
  				end: {
  					x: 1000,
  					y: 1000
  				}
  			}
  		]
  	},
  	{
  		id: "0-1",
  		level: 0,
  		area: 1,
  		description: "Sewers",
  		player_start_pos: {
  			col: 5,
  			row: 95
  		},
  		monster_spawns: [
  			"VAMPIRE",
  			"IMP"
  		],
  		exits: {
  			"5,95": {
  				area: 0,
  				level: 0,
  				exitTile: {
  					col: 12,
  					row: 12
  				}
  			},
  			"10,10": {
  				area: 1,
  				level: 0,
  				exitTile: {
  					col: 5,
  					row: 5
  				}
  			}
  		},
  		mon_per_tile: 0.15,
  		no_spawn_locations: [
  			{
  				start: {
  					x: 0,
  					y: 0
  				},
  				end: {
  					x: 50,
  					y: 50
  				}
  			}
  		]
  	}
  ];

  /**
   * This function takes the static levels.json and merges it with real code from the level
   * @param level
   */
  function mergeStaticLevelAreaData(level) {
      var areaLevelRowData = levelsJSON.find(function (levelRow) {
          return levelRow.id && levelRow.id === level.levelAreaID;
      });
      level.levelAreaID = areaLevelRowData.id;
      level.startPos = {
          col: areaLevelRowData.player_start_pos.col,
          row: areaLevelRowData.player_start_pos.row,
      };
      level.noSpawnLocations = areaLevelRowData.no_spawn_locations;
      level.spawnableEnemies = areaLevelRowData.monster_spawns;
      level.monsterDensity = areaLevelRowData.mon_per_tile;
      Object.keys(areaLevelRowData.exits).forEach(function (tileCoordinate) {
          var trigger = {
              oneOff: false,
              type: 'portal',
              level: areaLevelRowData.exits[tileCoordinate].level,
              area: areaLevelRowData.exits[tileCoordinate].area,
              exitTile: areaLevelRowData.exits[tileCoordinate].exitTile
          };
          if (!level.triggers.move[tileCoordinate]) {
              level.triggers.move[tileCoordinate] = [];
          }
          level.triggers.move[tileCoordinate].push(trigger);
      });
      return level;
  }

  var level$1 = {
      levelAreaID: '0-0',
      noSpawnLocations: [],
      monsterDensity: 0,
      spawnableEnemies: [],
      startPos: null,
      locations: [
          townLocation$1,
          spawnableOneLocation$1
      ],
      tileMap: oneMap,
      triggers: {
          levelStart: [{
                  oneOff: true,
                  type: 'dialog',
                  lines: [
                      {
                          text: 'I haven\'t heard from my aunt in a while\nI should go check on her\nMaybe John has seen her?',
                          speaker: 0
                      }
                  ]
              }],
          actOnEntity: {},
          move: {
              '-1,-2': [{
                      oneOff: true,
                      type: 'dialog',
                      lines: [
                          {
                              text: 'I should collect my sword\n(hit space to open chests)',
                              speaker: 0
                          }
                      ]
                  }]
          }
      },
      entitiesToPlace: [
          {
              pos: {
                  col: 6,
                  row: 6
              },
              characterType: CHARACTERS.CHEST,
              characterLevel: 1,
              name: 'Chest 1'
          },
          {
              pos: {
                  col: 8,
                  row: 4
              },
              characterType: CHARACTERS.FAM_NPC,
              characterLevel: 1,
              name: 'NPC_1'
          },
          {
              pos: {
                  col: 13,
                  row: 7
              },
              characterType: CHARACTERS.FAM_NPC,
              characterLevel: 1,
              name: 'NPC_2'
          },
          {
              pos: {
                  col: 18,
                  row: 10
              },
              characterType: CHARACTERS.FAM_NPC,
              characterLevel: 1,
              name: 'NPC_3'
          },
          {
              pos: {
                  col: 5,
                  row: 9
              },
              characterType: CHARACTERS.FAM_NPC,
              characterLevel: 1,
              name: 'NPC_4'
          },
          {
              pos: {
                  col: 62,
                  row: 42
              },
              characterType: CHARACTERS.FAM_NPC,
              characterLevel: 1,
              name: 'NPC_5'
          }
      ],
  };
  var ZERO_ZERO = mergeStaticLevelAreaData(level$1);

  var map = [
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		11,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		13,
  		13,
  		13,
  		13,
  		13,
  		13,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	],
  	[
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14,
  		14
  	]
  ];

  var level = {
      levelAreaID: '0-1',
      noSpawnLocations: [],
      monsterDensity: 0,
      spawnableEnemies: [],
      startPos: null,
      locations: [],
      tileMap: map,
      triggers: {
          levelStart: [],
          actOnEntity: {},
          move: {
              '-1,-2': [{
                      oneOff: true,
                      type: 'dialog',
                      lines: [
                          {
                              text: 'I should collect my sword\n(hit space to open chests)',
                              speaker: 0
                          }
                      ]
                  }]
          }
      },
      entitiesToPlace: []
  };
  var ZERO_ONE = mergeStaticLevelAreaData(level);

  // TODO this should be some interface
  var levelConfig = {};
  function processLevel(levelArea) {
      var _a = levelArea.levelAreaID.split('-'), level = _a[0], area = _a[1];
      if (hasValue(level) && hasValue(area)) {
          var numLevel = +level;
          var numArea = +area;
          levelConfig[numLevel] = levelConfig[numLevel] || { areas: {} };
          levelConfig[numLevel].areas[numArea] = levelArea;
      }
  }
  // TOOD create a live object based on these levels
  function requireAllMapLevels() {
      processLevel(ZERO_ZERO);
      processLevel(ZERO_ONE);
      //
      // // @ts-ignore
      // let ctx = require.context('levels', true, /\.ts$/);
      //
      // ctx.keys().forEach((path: string) => {
      //   let name = path.replace('./', '').replace('.ts', '');
      //
      //   let [dir, file] = name.split('/');
      //   if (file) {
      //     let [level, area] = file.split('-');
      //
      //     if (hasValue(level) && hasValue(area)) {
      //       let numLevel = +level;
      //       let numArea = +area;
      //       levelConfig[numLevel] = levelConfig[numLevel] || {areas: {}};
      //       levelConfig[numLevel].areas[numArea] = ctx(path).default;
      //     }
      //   }
      // });
  }
  requireAllMapLevels();

  var tiles = "./tileSet.png";

  var Editor = /** @class */ (function (_super) {
      __extends(Editor, _super);
      function Editor(props) {
          var _this = _super.call(this, props) || this;
          _this.state = {};
          return _this;
      }
      Editor.prototype.render = function () {
          var _this = this;
          return (react_22("div", { id: 'editor-panel' },
              react_22("h3", null,
                  "Current Level: ",
                  this.props.currentLevel,
                  "-",
                  this.props.currentArea),
              react_22("div", { id: 'tiles' }, Object.keys(TILE_TYPES).map(function (key) {
                  var _a = TILE_TYPES[+key], cropStartX = _a.cropStartX, cropStartY = _a.cropStartY, cropSizeX = _a.cropSizeX, cropSizeY = _a.cropSizeY;
                  var style = {
                      backgroundImage: "url(\"" + tiles + "\")",
                      color: 'black',
                      backgroundPosition: "-" + cropStartX + "px -" + cropStartY + "px",
                      width: cropSizeX + "px",
                      height: cropSizeY + "px",
                      boxSizing: 'border-box'
                  };
                  var active = _this.state.active === key ? 'active' : '';
                  var cls = "tile " + active;
                  return (react_22("div", { key: key, className: cls, style: style, onClick: function () {
                          _this.props.onTileSelect(+key);
                          _this.setState({
                              active: key
                          });
                      } }));
              })),
              react_22("div", null,
                  react_22("div", null,
                      react_22("input", { id: 'level', placeholder: 'Level', type: 'number', min: "0" }),
                      react_22("input", { id: 'area', placeholder: 'Area', type: 'number', min: "0" }),
                      react_22("button", { onClick: function (e) {
                              var levelEl = document.getElementById('level');
                              var areaEl = document.getElementById('area');
                              _this.props.onLevelAreaNav(+levelEl.value, +areaEl.value);
                          } }, "Go")),
                  react_22("div", null,
                      react_22("input", { id: 'col', placeholder: 'Col', type: 'number', min: "0" }),
                      react_22("input", { id: 'row', placeholder: 'Row', type: 'number', min: "0" }),
                      react_22("button", { onClick: function (e) {
                              var colEl = document.getElementById('col');
                              var rowEl = document.getElementById('row');
                              _this.props.onPosNav(+colEl.value, +rowEl.value);
                          } }, "Go"))),
              react_22("div", null,
                  react_22("h3", null,
                      "Clicked Tile - ",
                      this.props.clickedTileIdx || 'N/A'))));
      };
      return Editor;
  }(react_3));

  function saveToServer(levelArea) {
      fetch('http://localhost:3000', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              levelAreaID: levelArea.levelAreaID,
              tileMap: levelArea.tileMap
          }),
      }).catch(function () {
          alert('Could not save to server');
      });
  }

  function resizeGameElements(isEditing) {
      if (isEditing === void 0) { isEditing = false; }
      var gameArea = document.querySelector('.wrapper');
      var gameUI = document.querySelector('.game-ui');
      var widthToHeight = 1.6666; // TODO is this magical ?
      var editorHeight = isEditing ? 170 : 0;
      var gameUIStyles = window.getComputedStyle(gameUI);
      var gameUIWidthStyle = gameUIStyles.getPropertyValue('width');
      var gameUIWidth = +gameUIWidthStyle.replace('px', '');
      var newWidth = window.innerWidth - gameUIWidth;
      var newHeight = window.innerHeight - editorHeight;
      var newWidthToHeight = newWidth / newHeight;
      gameArea.style.marginRight = gameUIWidth + "px";
      if (gameArea) {
          if (newWidthToHeight > widthToHeight) {
              newWidth = newHeight * widthToHeight;
              gameArea.style.height = newHeight + "px";
              gameArea.style.width = newWidth + "px";
          }
          else {
              newHeight = newWidth / widthToHeight;
              gameArea.style.height = newHeight + "px";
              gameArea.style.width = newWidth + "px";
          }
      }
  }

  function GameUI(props) {
      var canAssignAttrsClass = props.spendableAttributePoints > 0 ? 'active' : '';
      return (react_22("div", { className: 'game-ui' },
          react_22("h3", null, "Health"),
          react_22("div", { className: 'bar' },
              react_22("div", { className: 'bar__filled bar__filled health', style: { width: props.percentHealth * 100 + "%" } }),
              react_22("div", { className: 'stats' },
                  Math.floor(props.currentHealth),
                  " / ",
                  props.maxHealth)),
          react_22("h3", null, "Exp"),
          react_22("div", { className: 'bar' },
              react_22("div", { className: 'bar__filled bar__filled xp', style: { width: props.levelProgress * 100 + "%" } }),
              react_22("div", { className: 'stats' }, props.spendableXP)),
          react_22("div", { className: 'game-options' },
              react_22("button", { className: 'game-option', onClick: props.onShowSkillsClicked }, "Skills"),
              react_22("button", { className: 'game-option', onClick: props.onShowSkillsClicked }, "Quests"),
              react_22("button", { className: 'game-option', onClick: props.onShowSkillsClicked }, "Inventory"),
              react_22("button", { className: "game-option " + canAssignAttrsClass, onClick: props.onShowAttributes }, "Attributes"))));
  }

  var OptionsScreen = /** @class */ (function (_super) {
      __extends(OptionsScreen, _super);
      function OptionsScreen() {
          return _super !== null && _super.apply(this, arguments) || this;
      }
      OptionsScreen.prototype.render = function () {
          var children = react_1.toArray(this.props.children);
          return (react_22("div", { className: "options-screen " + this.props.className },
              react_22("div", { className: 'options-screen__header' },
                  react_22("div", { className: 'options-screen__title' }, children[0]),
                  react_22("div", { onClick: this.props.onClose, className: 'close' }, "\u00D7")),
              react_22("div", { className: 'options-screen__body' },
                  react_22("div", null, children[1])),
              react_22("div", { className: 'options-screen__footer' },
                  react_22("div", null, children[2]))));
      };
      return OptionsScreen;
  }(react_3));

  function RenderTitle(props) {
      return react.createElement("h3", null,
          "Purchase Skills ",
          react.createElement("span", { className: 'remaining-xp' },
              "(",
              props.spendableXP,
              " XP remaining)"));
  }

  function skillConfigToArray(skillTreesConfig) {
      var arrSkillTrees = [];
      var treeID;
      for (treeID in skillTreesConfig) {
          if (skillTreesConfig.hasOwnProperty(treeID)) {
              var skillTree = skillTreesConfig[treeID];
              arrSkillTrees.push({
                  id: treeID,
                  name: skillTree.name,
                  skills: skillTree.skills
              });
          }
      }
      return arrSkillTrees;
  }

  function RenderSkillTreeTabs(props) {
      var setActiveSkillTree = props.setActiveSkillTree, activeTreeID = props.activeTreeID;
      var arrSkillTrees = skillConfigToArray(skillTreesConfig);
      return (react_22("div", { className: 'row skill-tabs', onClick: function (e) {
              var el = e.target;
              var treeID = el.getAttribute('data-id');
              setActiveSkillTree(treeID);
          } }, arrSkillTrees.map(function (skillTree) {
          return (react_22("div", { key: skillTree.id, className: "skill-tab " + (activeTreeID === skillTree.id ? 'active' : ''), "data-id": skillTree.id }, skillTree.name));
      })));
  }

  function RenderSkills(props) {
      var skillsToRender = props.skillsToRender;
      if (skillsToRender.length > 0) {
          return react_22("div", { className: 'skills-grid' }, skillsToRender.map(function (skill) {
              var isOwnedClass = props.currentPlayerState.skills.includes(skill.id) ? 'owned' : '';
              var isFocusedClass = skill.id === props.activeSkillID ? 'clicked' : '';
              return react_22("div", { key: skill.id, className: "skill " + isOwnedClass + " " + isFocusedClass, onClick: function () {
                      props.onSkillClick(skill.id);
                  } },
                  react_22("span", null,
                      " ",
                      skill.name,
                      " "),
                  " ",
                  react_22("span", null,
                      " (",
                      skill.cost,
                      " XP) "));
          }));
      }
      else {
          return null;
      }
  }

  function RenderSkillDetails(props) {
      if (props.activeSkillID) {
          var enoughXPToBuy = props.currentPlayerState.spendableXP > props.skill.cost;
          var playerOwnsSkill = props.currentPlayerState.skills.includes(props.skill.id);
          var btnTxt = '';
          if (playerOwnsSkill) {
              btnTxt = 'You own this skill';
          }
          else if (enoughXPToBuy) {
              btnTxt = 'Buy';
          }
          else {
              btnTxt = 'Not enough XP';
          }
          return react_22("div", { className: 'skill-details' },
              react_22("h3", null, props.skill.name),
              react_22("div", null, props.skill.description),
              react_22("div", null,
                  react_22("button", { disabled: !enoughXPToBuy || playerOwnsSkill, onClick: function () {
                          props.onBuySkillClick(props.skill.id);
                      } }, btnTxt)));
      }
      else {
          return null;
      }
  }

  /**
   *
   * @param treeToRender
   * @returns
   */
  function getSkillsToRender(treeToRender) {
      var skillsToRender = [];
      if (treeToRender) {
          skillsToRender = treeToRender.skills;
      }
      return skillsToRender;
  }

  function SkillTree(props) {
      var _a = react_18(''), activeTreeID = _a[0], setActiveSkillTree = _a[1];
      var _b = react_18(''), activeSkillID = _b[0], setActiveSkill = _b[1];
      var skillsToRender = getSkillsToRender(skillTreesConfig[activeTreeID]);
      var currentPlayerState = props.currentPlayerState;
      var skill = skillsConfig[activeSkillID];
      return (react_22(OptionsScreen, { className: 'skills-screen', onClose: props.onCloseSkillTree },
          react_22(RenderTitle, { spendableXP: currentPlayerState.spendableXP }),
          react_22("div", null,
              react_22(RenderSkillTreeTabs, { setActiveSkillTree: function (treeID) {
                      setActiveSkillTree(treeID);
                      setActiveSkill(null);
                  }, activeTreeID: activeTreeID }),
              react_22(RenderSkills, { activeSkillID: activeSkillID, skillsToRender: skillsToRender, currentPlayerState: currentPlayerState, onSkillClick: function (skillID) {
                      setActiveSkill(skillID);
                  } }),
              react_22(RenderSkillDetails, { currentPlayerState: currentPlayerState, skill: skill, activeSkillID: activeSkillID, onBuySkillClick: props.onBuySkillClick }))));
  }

  function Attributes(props) {
      var attributeIDs = Object.keys(props.currentPlayerState.attributes);
      var playerAttributeMap = props.currentPlayerState.attributes;
      var spendableAttributePoints = props.currentPlayerState.spendableAttributePoints;
      return (react_22(OptionsScreen, { className: 'attributes-screen', onClose: props.onCloseAttributes },
          react_22("h3", null,
              "Attributes ",
              react_22("span", null, spendableAttributePoints)),
          react_22("div", null, attributeIDs.map(function (attrID) {
              return (react_22("div", { key: attrID },
                  react_22("span", null, characterAttributesConfig[attrID].displayName),
                  react_22("span", null, playerAttributeMap[attrID]),
                  react_22("span", null,
                      react_22("button", { onClick: function () {
                              props.onBuyAttributeClick(attrID);
                          } }, "+"))));
          }))));
  }

  var App = /** @class */ (function (_super) {
      __extends(App, _super);
      function App(props) {
          var _a;
          var _this = _super.call(this, props) || this;
          setInterval(function () {
              _this.setState({
                  debug: {
                      countOfEnemyEntities: dist_5.getByComp('AI_CONTROLLED_COMP').length,
                      countOfTileEntities: dist_5.getByComp('TRAVERSABLE_COMP').length
                  }
              });
          }, 1000);
          _this.state = {
              mapCanvasEl: null,
              minimapCanvasEl: null,
              currentLevel: 0,
              currentArea: 0,
              mapHeight: null,
              mapWidth: null,
              minimap: null,
              map: null,
              active: null,
              isEditing: null,
              gameStarted: null,
              mapAPI: null,
              clickedTileIdx: null,
              editorTileType: null,
              minimapAPI: null,
              debug: {
                  countOfEnemyEntities: 0,
                  countOfTileEntities: 0
              },
              playerState: {
                  maxHealth: 0,
                  currentHealth: 0,
                  percentHealth: 0,
                  showSkillTree: false,
                  showAttributes: false,
                  skills: [],
                  spendableXP: 0,
                  levelProgress: 0,
                  spendableAttributePoints: 0,
                  attributes: (_a = {},
                      _a[AllowedAttributes.AGILITY] = 0,
                      _a[AllowedAttributes.STRENGTH] = 0,
                      _a[AllowedAttributes.WILL] = 0,
                      _a[AllowedAttributes.ENDURANCE] = 0 // assigned when game starts by game event
                  ,
                      _a)
              }
          };
          // This is the 'Player licked play' button
          setTimeout(function () {
              _this.clickToStartGame();
              _this.resize();
          }, 10);
          window.addEventListener('resize', function () {
              _this.resize();
          });
          window.addEventListener('orientationchange', function () {
              _this.resize();
          });
          return _this;
      }
      App.prototype.initGameCanvas = function (mapWidth, mapHeight) {
          var _this = this;
          return new dist_2({
              mapHeight: mapHeight,
              mapWidth: mapWidth,
              viewHeight: RESOLUTION.height,
              viewWidth: RESOLUTION.width,
              onViewMapClick: function (mouseClickData) {
                  // TODO - this should ONLY work in editor mode
                  mouseClickData.hits.forEach(function (shape) {
                      if (shape.layerName === 'background') {
                          // We need to get the tile here so we can set the state for clickedTileIdx
                          // Ideally this should all be moved internally into game.changeTileType
                          var entityID = +shape.id.split('-')[0];
                          var tile = dist_5.entities[entityID]; // TODO can we change these 'AS' things?
                          if (_this.state.editorTileType !== null) {
                              var levelArea = _this.game.changeTileType(tile, _this.state.editorTileType);
                              saveToServer(levelArea);
                          }
                          _this.setState({ clickedTileIdx: tile.tileIdx });
                      }
                  });
              }
          }).getNewCanvasPairs({
              getMapRef: function (API) {
                  window.API = API;
                  API.addLayer('background');
                  _this.setState({
                      mapAPI: API
                  });
              },
              getMiniRef: function (API) {
                  _this.setState({
                      minimapAPI: API
                  });
              }
          });
      };
      App.prototype.setNewCanvas = function (currentAreaMap) {
          if (this.state.mapAPI) {
              this.state.mapAPI.removeLayer('background');
          }
          var mapWidth = currentAreaMap[0].length * bit;
          var mapHeight = currentAreaMap.length * bit;
          // creates the new canvas
          var gameCanvas = this.initGameCanvas(mapWidth, mapHeight);
          var map = gameCanvas.map, minimap = gameCanvas.minimap;
          this.setState({
              map: map,
              minimap: minimap,
              mapHeight: mapHeight,
              mapWidth: mapWidth
          });
      };
      App.prototype.changeMap = function (levelNum, areaNum, targetTile) {
          if (targetTile === void 0) { targetTile = null; }
          this.setState({
              currentLevel: levelNum,
              currentArea: areaNum
          });
          var nextArea = levelConfig[levelNum].areas[areaNum];
          console.log('level conf', levelConfig);
          var areaTileMap = nextArea.tileMap;
          this.setNewCanvas(areaTileMap);
          var viewSize = {
              viewHeight: RESOLUTION.height,
              viewWidth: RESOLUTION.width,
              mapHeight: this.state.mapHeight,
              mapWidth: this.state.mapWidth
          };
          this.game.setLevelArea(nextArea, viewSize, targetTile);
      };
      App.prototype.startGame = function () {
          var _this = this;
          // Load some initial state, what level are we on?
          var levelNum = this.state.currentLevel; // this should probably be set every time it changes
          var areaNum = this.state.currentArea;
          // Use the level to get the current map for that level
          var areaToLoad = levelConfig[levelNum].areas[areaNum];
          console.log('level Conf', levelConfig);
          var areaTileMap = areaToLoad.tileMap;
          this.setNewCanvas(areaTileMap);
          var mapWidth = areaTileMap[0].length * bit;
          var mapHeight = areaTileMap.length * bit;
          // Start the game loop
          setTimeout(function () {
              _this.game = new GameLoop({
                  levelArea: areaToLoad,
                  onAreaChange: function (level, area, newPlayerPosition) {
                      _this.changeMap(level, area, newPlayerPosition);
                  },
                  getMapAPI: function () {
                      return _this.state.mapAPI;
                  },
                  getMinimapAPI: function () {
                      return _this.state.minimapAPI;
                  },
                  viewSize: {
                      viewHeight: RESOLUTION.height,
                      viewWidth: RESOLUTION.width,
                      mapHeight: mapHeight,
                      mapWidth: mapWidth
                  },
                  gameEventListener: function (event) {
                      var newPlayerState = {
                          maxHealth: event.maxHealth,
                          currentHealth: event.currentHealth,
                          percentHealth: event.percentHealth,
                          skills: event.skills,
                          spendableXP: event.spendableXP,
                          levelProgress: event.levelProgress,
                          attributes: event.attributes,
                          spendableAttributePoints: event.spendableAttributePoints
                      };
                      _this.setState({
                          playerState: Object.assign({}, _this.state.playerState, newPlayerState)
                      });
                  }
              });
              window.game = _this.game;
              registerUserInputEvents(_this.game);
          }, 0);
      };
      App.prototype.clickToStartGame = function () {
          this.startGame();
          this.setState({
              gameStarted: true
          });
      };
      App.prototype.resize = function () {
          resizeGameElements(this.state.isEditing);
      };
      App.prototype.toggleUIPlayerState = function (stateKey) {
          var playerState = __assign({}, this.state.playerState);
          playerState[stateKey] = !playerState[stateKey];
          this.setState({
              playerState: playerState
          });
      };
      App.prototype.render = function () {
          var _this = this;
          var showSkillTree = this.state.playerState.showSkillTree;
          var showAttributes = this.state.playerState.showAttributes;
          var isGameStarted = this.state.gameStarted;
          var isEditing = this.state.isEditing;
          if (!isGameStarted) {
              return (react_22("div", null,
                  react_22("button", { id: 'start', onClick: function () {
                          _this.clickToStartGame();
                      } }, "Start Game")));
          }
          else {
              return (react_22("div", null,
                  react_22("div", { style: { position: 'absolute', bottom: 0, right: 0, zIndex: 100 } },
                      react_22("div", null,
                          "Enemies: ",
                          this.state.debug.countOfEnemyEntities),
                      react_22("div", null,
                          "Tiles: ",
                          this.state.debug.countOfTileEntities)),
                  react_22("button", { id: "toggle-editor", onClick: function () {
                          _this.setState({
                              isEditing: !_this.state.isEditing
                          });
                      } }, "Editor"),
                  isEditing && react_22(Editor, { clickedTileIdx: this.state.clickedTileIdx, currentLevel: this.state.currentLevel, currentArea: this.state.currentArea, onTileSelect: function (tileType) {
                          _this.setState({
                              editorTileType: tileType
                          });
                      }, onLevelAreaNav: function (level, area) {
                          _this.changeMap(level, area);
                          // we're re-writing the canvas, so we need to delay to next tick
                          setTimeout(function () {
                              _this.game.centerOnPlayer();
                          }, 0);
                      }, onPosNav: function (col, row) {
                          _this.game.setPlayerPosition(col, row);
                      } }),
                  react_22(GameUI, __assign({}, this.state.playerState, { onShowSkillsClicked: function () { _this.toggleUIPlayerState('showSkillTree'); }, onShowAttributes: function () { _this.toggleUIPlayerState('showAttributes'); } })),
                  showSkillTree && react_22(SkillTree, { currentPlayerState: __assign({}, this.state.playerState), onCloseSkillTree: function () { _this.toggleUIPlayerState('showSkillTree'); }, onBuySkillClick: function (skillID) {
                          _this.game.dispatchAction({
                              name: AllowedActions.BUY_SKILL,
                              data: {
                                  skillID: skillID
                              }
                          });
                      } }),
                  showAttributes && react_22(Attributes, { currentPlayerState: __assign({}, this.state.playerState), onCloseAttributes: function () { _this.toggleUIPlayerState('showAttributes'); }, onBuyAttributeClick: function (attrID) {
                          _this.game.dispatchAction({
                              name: AllowedActions.BUY_ATTR,
                              data: {
                                  attrID: attrID
                              }
                          });
                      } }),
                  react_22("div", { className: 'wrapper' },
                      react_22("div", { className: 'canvas-main-container' }, this.state.map)),
                  react_22("div", { className: 'canvas-minimap-container' }, this.state.minimap)));
          }
      };
      return App;
  }(react_3));

  // Load RAF polyfill
  if (!document.getElementById('app')) {
      var div = document.createElement('div');
      div.id = 'app';
      document.body.appendChild(div);
  }
  if (!document.getElementById('progress')) {
      var div = document.createElement('div');
      div.id = 'progress';
      document.body.appendChild(div);
  }
  document.title = 'MAGIQUEST!';
  var appDiv = document.getElementById('app');
  appDiv.innerHTML = 'Loading game assets...';
  appDiv.className = 'loaded';
  assetLoader.load([
      {
          type: 'image',
          url: tiles,
          name: tiles
      },
      {
          type: 'image',
          url: charSpriteURL,
          name: charSpriteURL
      },
      {
          type: 'image',
          url: sentrySpriteURL,
          name: sentrySpriteURL
      },
      {
          type: 'image',
          url: miscURL,
          name: miscURL
      }
  ], function () {
      document.body.removeChild(document.getElementById('progress'));
      reactDom_4(react_22(App, null), document.getElementById('app'));
  });

}());
