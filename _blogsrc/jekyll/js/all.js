/*! jQuery.tinyscroller - v0.2.3 -  4/8/2012
 * https://github.com/Takazudo/jQuery.tinyscroller
 * Copyright (c) 2012 "Takazudo" Takeshi Takatsudo; Licensed MIT */(function(){var a=Array.prototype.slice,b=function(a,b){return function(){return a.apply(b,arguments)}},c=Object.prototype.hasOwnProperty,d=function(a,b){function e(){this.constructor=a}for(var d in b)c.call(b,d)&&(a[d]=b[d]);return e.prototype=b.prototype,a.prototype=new e,a.__super__=b.prototype,a};(function(c,e,f){var g,h,i,j,k,l;return k={},h=c(e),g=c(f),l=Math.round,j=Math.min,i=Math.abs,k.yOf=function(a){var b;b=0;while(a.offsetParent)b+=a.offsetTop,a=a.offsetParent;return b},k.isHash=function(a){return/^#.+$/.test(a)},k.getWhereTo=function(a){var b;return b=c(a),b.data("scrollto")||b.attr("href")},k.calcY=function(a){var b,d;if(c.type(a)==="number")return a;if(c.type(a)==="string"){if(!k.isHash(a))return!1;b=g.find(a)}else b=c(a);return b.size()?(d=k.yOf(b[0]),d):null},k.scrollTop=function(){return g.scrollTop()||f.documentElement.scrollTop||f.body.scrollTop||e.pageYOffset||0},k.ua=function(){var a,b,d;return b={},d=navigator.userAgent,a=function(a){var e;return e=!1,c.each(a,function(a,c){var f;return f=new RegExp(c,"i"),Boolean(d.match(f))?(b[c]=!0,e=!0):b[c]=!1,!0}),e},a(["iphone","ipod","ipad"]||a(["android"]))&&(b.mobile=!0),b}(),k.Event=function(){function b(){this._callbacks={}}return b.prototype.bind=function(a,b){var c,d,e,f,g;c=a.split(" ");for(f=0,g=c.length;f<g;f++)d=c[f],(e=this._callbacks)[d]||(e[d]=[]),this._callbacks[d].push(b);return this},b.prototype.one=function(a,b){return this.bind(a,function(){return this.unbind(a,arguments.callee),b.apply(this,arguments)})},b.prototype.trigger=function(){var b,c,d,e,f,g,h;b=1<=arguments.length?a.call(arguments,0):[],d=b.shift(),e=(h=this._callbacks)!=null?h[d]:void 0;if(!e)return;for(f=0,g=e.length;f<g;f++){c=e[f];if(c.apply(this,b)===!1)break}return this},b.prototype.unbind=function(a,b){var c,d,e,f,g;if(!a)return this._callbacks={},this;e=(g=this._callbacks)!=null?g[a]:void 0;if(!e)return this;if(!b)return delete this._callbacks[a],this;for(d=0,f=e.length;d<f;d++){c=e[d];if(c!==b)continue;e=e.slice(),e.splice(d,1),this._callbacks[a]=e;break}return this},b}(),k.Scroller=function(a){function f(a){this._stepToNext=b(this._stepToNext,this),a&&this.option(a),this._handleMobile(),f.__super__.constructor.apply(this,arguments)}return d(f,a),f.prototype.options={speed:30,maxStep:2e3,slowdownRate:3,changehash:!0,userskip:!0,selector:"a[href^=#]:not(.apply-noscroll)"},f.prototype._handleMobile=function(){return k.ua.mobile?(this.options.userskip=!1,this):this},f.prototype._invokeScroll=function(){var a=this;return this.trigger("scrollstart",this._endY,this._reservedHash),this._scrollDefer.then(function(){return a.options.changehash&&a._reservedHash&&(location.hash=a._reservedHash),a.trigger("scrollend",a._endY,a._reservedHash)},function(){return a.trigger("scrollcancel",a._endY,a._reservedHash)}).always(function(){return a._reservedHash&&(a._reservedHash=null),a._scrollDefer=null}),this._stepToNext(),this},f.prototype._stepToNext=function(){var a,b,c,d,f,m,n,o,p,q,r,s;return o=k.scrollTop(),d=this.options,d.userskip&&this._prevY&&o!==this._prevY?(e.scrollTo(0,this._endY),(q=this._scrollDefer)!=null&&q.resolve(),this._prevY=null,this):(this._endY>o?(a=g.height(),p=h.height(),m=l((a-o-p)/d.slowdownRate),n=l((this._endY-o)/d.slowdownRate),b=j(m,n),f=j(b,d.maxStep),f<2&&(f=2)):f=-j(i(l((this._endY-o)/d.slowdownRate)),d.maxStep),c=o+f,e.scrollTo(0,c),this._prevY=c,this._cancelNext?(this._cancelNext=!1,(r=this._scrollDefer)!=null&&r.reject()):i(o-self._endY)<=1||k.scrollTop()===o?(e.scrollTo(0,this._endY),this._prevY=null,(s=this._scrollDefer)!=null&&s.resolve()):setTimeout(this._stepToNext,d.speed),this)},f.prototype.scrollTo=function(a){var b;return k.isHash(a)&&(this._reservedHash=a),b=k.calcY(a),b===!1?this:(this._endY=b,this._scrollDefer=c.Deferred(),this._invokeScroll(),this._scrollDefer)},f.prototype.stop=function(){return this._scrollDefer&&(this._cancelNext=!0),this},f.prototype.option=function(a){return a?(c.extend(this.options,a),this._handleMobile(),this):this.options},f.prototype.live=function(a){var b;return a=a||this.options.selector,b=this,g.on("click",a,function(a){return a.preventDefault(),b.scrollTo(k.getWhereTo(this))}),this},f}(k.Event),c.tinyscroller=new k.Scroller,c.fn.tinyscrollable=function(){return this.each(function(){var a;return a=c(this),a.data("tinyscrollerattached")?this:(a.on("click",function(a){return a.preventDefault(),c.tinyscroller.scrollTo(k.getWhereTo(this))}),a.data("tinyscrollerattached",!0))})},c.TinyscrollerNs=k,c.Tinyscroller=k.Scroller})(jQuery,this,this.document)}).call(this);
//fgnass.github.com/spin.js#v1.2.5
(function(a,b,c){function g(a,c){var d=b.createElement(a||"div"),e;for(e in c)d[e]=c[e];return d}function h(a){for(var b=1,c=arguments.length;b<c;b++)a.appendChild(arguments[b]);return a}function j(a,b,c,d){var g=["opacity",b,~~(a*100),c,d].join("-"),h=.01+c/d*100,j=Math.max(1-(1-a)/b*(100-h),a),k=f.substring(0,f.indexOf("Animation")).toLowerCase(),l=k&&"-"+k+"-"||"";return e[g]||(i.insertRule("@"+l+"keyframes "+g+"{"+"0%{opacity:"+j+"}"+h+"%{opacity:"+a+"}"+(h+.01)+"%{opacity:1}"+(h+b)%100+"%{opacity:"+a+"}"+"100%{opacity:"+j+"}"+"}",0),e[g]=1),g}function k(a,b){var e=a.style,f,g;if(e[b]!==c)return b;b=b.charAt(0).toUpperCase()+b.slice(1);for(g=0;g<d.length;g++){f=d[g]+b;if(e[f]!==c)return f}}function l(a,b){for(var c in b)a.style[k(a,c)||c]=b[c];return a}function m(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];for(var e in d)a[e]===c&&(a[e]=d[e])}return a}function n(a){var b={x:a.offsetLeft,y:a.offsetTop};while(a=a.offsetParent)b.x+=a.offsetLeft,b.y+=a.offsetTop;return b}var d=["webkit","Moz","ms","O"],e={},f,i=function(){var a=g("style");return h(b.getElementsByTagName("head")[0],a),a.sheet||a.styleSheet}(),o={lines:12,length:7,width:5,radius:10,rotate:0,color:"#000",speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"auto",left:"auto"},p=function q(a){if(!this.spin)return new q(a);this.opts=m(a||{},q.defaults,o)};p.defaults={},m(p.prototype,{spin:function(a){this.stop();var b=this,c=b.opts,d=b.el=l(g(0,{className:c.className}),{position:"relative",zIndex:c.zIndex}),e=c.radius+c.length+c.width,h,i;a&&(a.insertBefore(d,a.firstChild||null),i=n(a),h=n(d),l(d,{left:(c.left=="auto"?i.x-h.x+(a.offsetWidth>>1):c.left+e)+"px",top:(c.top=="auto"?i.y-h.y+(a.offsetHeight>>1):c.top+e)+"px"})),d.setAttribute("aria-role","progressbar"),b.lines(d,b.opts);if(!f){var j=0,k=c.fps,m=k/c.speed,o=(1-c.opacity)/(m*c.trail/100),p=m/c.lines;!function q(){j++;for(var a=c.lines;a;a--){var e=Math.max(1-(j+a*p)%m*o,c.opacity);b.opacity(d,c.lines-a,e,c)}b.timeout=b.el&&setTimeout(q,~~(1e3/k))}()}return b},stop:function(){var a=this.el;return a&&(clearTimeout(this.timeout),a.parentNode&&a.parentNode.removeChild(a),this.el=c),this},lines:function(a,b){function e(a,d){return l(g(),{position:"absolute",width:b.length+b.width+"px",height:b.width+"px",background:a,boxShadow:d,transformOrigin:"left",transform:"rotate("+~~(360/b.lines*c+b.rotate)+"deg) translate("+b.radius+"px"+",0)",borderRadius:(b.width>>1)+"px"})}var c=0,d;for(;c<b.lines;c++)d=l(g(),{position:"absolute",top:1+~(b.width/2)+"px",transform:b.hwaccel?"translate3d(0,0,0)":"",opacity:b.opacity,animation:f&&j(b.opacity,b.trail,c,b.lines)+" "+1/b.speed+"s linear infinite"}),b.shadow&&h(d,l(e("#000","0 0 4px #000"),{top:"2px"})),h(a,h(d,e(b.color,"0 0 1px rgba(0,0,0,.1)")));return a},opacity:function(a,b,c){b<a.childNodes.length&&(a.childNodes[b].style.opacity=c)}}),!function(){function a(a,b){return g("<"+a+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',b)}var b=l(g("group"),{behavior:"url(#default#VML)"});!k(b,"transform")&&b.adj?(i.addRule(".spin-vml","behavior:url(#default#VML)"),p.prototype.lines=function(b,c){function f(){return l(a("group",{coordsize:e+" "+e,coordorigin:-d+" "+ -d}),{width:e,height:e})}function k(b,e,g){h(i,h(l(f(),{rotation:360/c.lines*b+"deg",left:~~e}),h(l(a("roundrect",{arcsize:1}),{width:d,height:c.width,left:c.radius,top:-c.width>>1,filter:g}),a("fill",{color:c.color,opacity:c.opacity}),a("stroke",{opacity:0}))))}var d=c.length+c.width,e=2*d,g=-(c.width+c.length)*2+"px",i=l(f(),{position:"absolute",top:g,left:g}),j;if(c.shadow)for(j=1;j<=c.lines;j++)k(j,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(j=1;j<=c.lines;j++)k(j);return h(b,i)},p.prototype.opacity=function(a,b,c,d){var e=a.firstChild;d=d.shadow&&d.lines||0,e&&b+d<e.childNodes.length&&(e=e.childNodes[b+d],e=e&&e.firstChild,e=e&&e.firstChild,e&&(e.opacity=c))}):f=k(b,"animation")}(),a.Spinner=p})(window,document);
/*!
 * Davis - http://davisjs.com - JavaScript Routing - 0.9.5
 * Copyright (C) 2011 Oliver Nightingale
 * MIT Licensed
 */Davis=function(a){var b=new Davis.App;return a&&a.call(b),Davis.$(function(){b.start()}),b},window.jQuery?Davis.$=jQuery:Davis.$=null,Davis.supported=function(){return typeof window.history.pushState=="function"},Davis.noop=function(){},Davis.extend=function(a){a(Davis)},Davis.version="0.9.5",Davis.utils=function(){if(Array.prototype.every)var a=function(a,b){return a.every(b,arguments[2])};else var a=function(a,b){if(a===void 0||a===null)throw new TypeError;var c=Object(a),d=c.length>>>0;if(typeof b!="function")throw new TypeError;var e=arguments[2];for(var f=0;f<d;f++)if(f in c&&!b.call(e,c[f],f,c))return!1;return!0};if(Array.prototype.forEach)var b=function(a,b){return a.forEach(b,arguments[2])};else var b=function(a,b){if(a===void 0||a===null)throw new TypeError;var c=Object(a),d=c.length>>>0;if(typeof b!="function")throw new TypeError;var e=arguments[2];for(var f=0;f<d;f++)f in c&&b.call(e,c[f],f,c)};if(Array.prototype.filter)var c=function(a,b){return a.filter(b,arguments[2])};else var c=function(a,b){if(a===void 0||a===null)throw new TypeError;var c=Object(a),d=c.length>>>0;if(typeof b!="function")throw new TypeError;var e=[],f=arguments[2];for(var g=0;g<d;g++)if(g in c){var h=c[g];b.call(f,h,g,c)&&e.push(h)}return e};if(Array.prototype.map)var d=function(a,b){return a.map(b,arguments[2])};else var d=function(a,b){if(a===void 0||a===null)throw new TypeError;var c=Object(a),d=c.length>>>0;if(typeof b!="function")throw new TypeError;var e=new Array(d),f=arguments[2];for(var g=0;g<d;g++)g in c&&(e[g]=b.call(f,c[g],g,c));return e};var e=function(a,b){var b=b||0;return Array.prototype.slice.call(a,b)};return{every:a,forEach:b,filter:c,toArray:e,map:d}}(),Davis.listener=function(){var a={A:function(a){return a.host!==window.location.host||a.protocol!==window.location.protocol},FORM:function(a){var b=document.createElement("a");return b.href=a.action,this.A(b)}},b=function(b){return a[b.nodeName.toUpperCase()]?a[b.nodeName.toUpperCase()](b):!0},c=function(a){return a.altKey||a.ctrlKey||a.metaKey||a.shiftKey},d=function(a){return function(d){if(c(d))return!0;if(b(this))return!0;var e=new Davis.Request(a.call(Davis.$(this)));return Davis.location.assign(e),d.stopPropagation(),d.preventDefault(),!1}},e=d(function(){var a=this;return{method:"get",fullPath:this.attr("href"),title:this.attr("title"),delegateToServer:function(){window.location=a.attr("href")}}}),f=function(a){return decodeURIComponent(a.replace(/\+/g,"%20"))},g=d(function(){var a=this;return{method:this.attr("method"),fullPath:f(this.serialize()?[this.attr("action"),this.serialize()].join("?"):this.attr("action")),title:this.attr("title"),delegateToServer:function(){a.submit()}}});this.listen=function(){Davis.$(document).delegate(this.settings.formSelector,"submit",g),Davis.$(document).delegate(this.settings.linkSelector,"click",e)},this.unlisten=function(){Davis.$(document).undelegate(this.settings.linkSelector,"click",e),Davis.$(document).undelegate(this.settings.formSelector,"submit",g)}},Davis.event=function(){var a={};this.bind=function(b,c){return(a[b]=a[b]||[]).push(c),this},this.trigger=function(b){var c=Davis.utils.toArray(arguments,1),d=a[b];if(!d)return this;for(var e=0,f=d.length;e<f;++e)d[e].apply(this,c);return this}},Davis.logger=function(){function a(){return"["+Date()+"]"}function b(b){var c=Davis.utils.toArray(b);return c.unshift(a()),c.join(" ")}var c=function(a){return function(){window.console&&console[a](b(arguments))}},d=c("error"),e=c("info"),f=c("warn");this.logger={error:d,info:e,warn:f}},Davis.Route=function(){var a=/:([\w\d]+)/g,b="([^/]+)",c=/\*([\w\d]+)/g,d="(.*)",e=/[:|\*]([\w\d]+)/g,f=function(f,g,h){var i=function(){if(g instanceof RegExp)return g;var e=g.replace(a,b).replace(c,d);return g.lastIndex=0,new RegExp("^"+e+"$","gi")},j=function(){return f instanceof RegExp?f:new RegExp("^"+f+"$","i")},k=function(){var a=[],b;while(b=e.exec(g))a.push(b[1]);return a};this.paramNames=k(),this.path=i(),this.method=j(),typeof h=="function"?this.handlers=[h]:this.handlers=h};return f.prototype.match=function(a,b){return this.reset(),this.method.test(a)&&this.path.test(b)},f.prototype.reset=function(){this.method.lastIndex=0,this.path.lastIndex=0},f.prototype.run=function(a){this.reset();var b=this.path.exec(a.path);if(b){b.shift();for(var c=0;c<b.length;c++)a.params[this.paramNames[c]]=b[c]}var d=Davis.utils.map(this.handlers,function(a,b){return function(c){return a.call(c,c,d[b+1])}});return d[0](a)},f.prototype.toString=function(){return[this.method,this.path].join(" ")},f}(),Davis.router=function(){this.route=function(b,d){var e=function(d){var e=Davis.utils.toArray(arguments,1),f=c.join(""),g,h;return typeof d=="string"?g=f+d:g=d,h=new Davis.Route(b,g,e),a.push(h),h};return arguments.length==1?e:e.apply(this,Davis.utils.toArray(arguments,1))},this.get=this.route("get"),this.post=this.route("post"),this.put=this.route("put"),this.del=this.route("delete"),this.state=this.route("state"),this.scope=function(a,b){c.push(a);if(arguments.length==1)return;b.call(this,this),c.pop()},this.trans=function(a,b){if(b)var c=[a,decodeURIComponent(Davis.$.param(b))].join("?");else var c=a;var d=new Davis.Request({method:"state",fullPath:c,title:""});Davis.location.assign(d)},this.filter=function(a){return function(){var d=/.+/;if(arguments.length==1)var e=/.+/,f=arguments[0];else if(arguments.length==2)var e=c.join("")+arguments[0],f=arguments[1];var g=new Davis.Route(d,e,f);return b[a].push(g),g}},this.lookupFilter=function(a){return function(c,d){return Davis.utils.filter(b[a],function(a){return a.match(c,d)})}},this.before=this.filter("before"),this.after=this.filter("after"),this.lookupBeforeFilter=this.lookupFilter("before"),this.lookupAfterFilter=this.lookupFilter("after");var a=[],b={before:[],after:[]},c=[];this.lookupRoute=function(b,c){return Davis.utils.filter(a,function(a){return a.match(b,c)})[0]}},Davis.history=function(){function c(b){a.push(b)}function d(a){window.addEventListener("popstate",a,!0)}function e(a){return function(c){c.state&&c.state._davis?a(new Davis.Request(c.state._davis)):b&&a(Davis.Request.forPageLoad()),b=!0}}function f(a){return{_davis:a}}function g(a){c(a),d(e(a))}function h(c){return function(d,e){b=!0,history[c](f(d.toJSON()),d.title,d.location());if(e&&e.silent)return;Davis.utils.forEach(a,function(a){a(d)})}}function k(){return window.location.pathname+(window.location.search?window.location.search:"")}var a=[],b=!1,i=h("pushState"),j=h("replaceState");return{onChange:g,current:k,assign:i,replace:j}}(),Davis.location=function(){function b(b){a=b}function c(){return a.current()}function d(b){return function(c){typeof c=="string"&&(c=new Davis.Request(c)),a[b](c)}}function g(b){a.onChange(b)}var a=Davis.history,e=d("assign"),f=d("replace");return{setLocationDelegate:b,current:c,assign:e,replace:f,onChange:g}}(),Davis.Request=function(){var a=function(b,c){typeof b=="object"&&(c=b,b=c.fullPath,delete c.fullPath);var d=Davis.$.extend({},{title:"",fullPath:b,method:"get",timestamp:+(new Date)},c),e=this;this.raw=d,this.params={},this.title=d.title,this.queryString=d.fullPath.split("?")[1],this.timestamp=d.timestamp,this._staleCallback=function(){},this.queryString&&Davis.utils.forEach(this.queryString.split("&"),function(a){var b=a.split("=")[0],c=a.split("=")[1],d=/^(\w+)\[(\w+)?\](\[\])?/,f;if(f=d.exec(b)){var g=f[1],b=f[2],h=!!f[3],i=e.params[g]||{};h?(i[b]=i[b]||[],i[b].push(decodeURIComponent(c)),e.params[g]=i):!b&&!h?(i=e.params[g]||[],i.push(decodeURIComponent(c)),e.params[g]=i):(i[b]=decodeURIComponent(c),e.params[g]=i)}else e.params[b]=decodeURIComponent(c)}),d.fullPath=d.fullPath.replace(/^https?:\/\/.+?\//,"/"),this.method=(this.params._method||d.method).toLowerCase(),this.path=d.fullPath.replace(/\?.+$/,"").replace(/^https?:\/\/[^\/]+/,""),this.fullPath=d.fullPath,this.delegateToServer=d.delegateToServer||Davis.noop,this.isForPageLoad=d.forPageLoad||!1,a.prev&&a.prev.makeStale(this),a.prev=this};return a.prototype.redirect=function(b){Davis.location.replace(new a({method:"get",fullPath:b,title:this.title}))},a.prototype.whenStale=function(a){this._staleCallback=a},a.prototype.makeStale=function(a){this._staleCallback.call(a,a)},a.prototype.location=function(){return this.method==="get"?this.fullPath:""},a.prototype.toString=function(){return[this.method.toUpperCase(),this.path].join(" ")},a.prototype.toJSON=function(){return{title:this.raw.title,fullPath:this.raw.fullPath,method:this.raw.method,timestamp:this.raw.timestamp}},a.forPageLoad=function(){return new this({method:"get",fullPath:Davis.location.current(),title:document.title,forPageLoad:!0})},a.prev=null,a}(),Davis.App=function(){function a(){this.running=!1,this.boundToInternalEvents=!1,this.use(Davis.listener),this.use(Davis.event),this.use(Davis.router),this.use(Davis.logger)}return a.prototype.configure=function(a){a.call(this.settings,this.settings)},a.prototype.use=function(a){a.apply(this,Davis.utils.toArray(arguments,1))},a.prototype.helpers=function(a){for(property in a)a.hasOwnProperty(property)&&(Davis.Request.prototype[property]=a[property])},a.prototype.settings={linkSelector:"a",formSelector:"form",throwErrors:!0,handleRouteNotFound:!1,generateRequestOnPageLoad:!1},a.prototype.start=function(){var a=this;if(this.running)return;if(!Davis.supported()){this.trigger("unsupported");return}var b=function(a){return function(b){var c=b.run(a,a);return typeof c=="undefined"||c}},c=function(c){return Davis.utils.every(a.lookupBeforeFilter(c.method,c.path),b(c))},d=function(d){if(c(d)){a.trigger("lookupRoute",d);var e=a.lookupRoute(d.method,d.path);if(e){a.trigger("runRoute",d,e);try{e.run(d),a.trigger("routeComplete",d,e)}catch(f){a.trigger("routeError",d,e,f)}Davis.utils.every(a.lookupAfterFilter(d.method,d.path),b(d))}else a.trigger("routeNotFound",d)}else a.trigger("requestHalted",d)},e=function(){a.bind("runRoute",function(b){a.logger.info("runRoute: "+b.toString())}).bind("routeNotFound",function(b){!a.settings.handleRouteNotFound&&!b.isForPageLoad&&(a.stop(),b.delegateToServer()),a.logger.warn("routeNotFound: "+b.toString())}).bind("start",function(){a.logger.info("application started")}).bind("stop",function(){a.logger.info("application stopped")}).bind("routeError",function(b,c,d){if(a.settings.throwErrors)throw d;a.logger.error(d.message,d.stack)}),Davis.location.onChange(function(a){d(a)}),a.boundToInternalEvents=!0};this.boundToInternalEvents||e(),this.listen(),this.trigger("start"),this.running=!0,this.settings.generateRequestOnPageLoad&&d(Davis.Request.forPageLoad())},a.prototype.stop=function(){this.unlisten(),this.trigger("stop"),this.running=!1},a}();

/*! jQuery.LazyJaxDavis - v0.1.3 -  11/4/2012
 * https://github.com/Takazudo/jQuery.LazyJaxDavix
 * Copyright (c) 2012 "Takazudo" Takeshi Takatsudo; Licensed MIT */// Generated by CoffeeScript 1.4.0
(function(){var e=[].slice,t={}.hasOwnProperty,n=function(e,n){function i(){this.constructor=e}for(var r in n)t.call(n,r)&&(e[r]=n[r]);return i.prototype=n.prototype,e.prototype=new i,e.__super__=n.prototype,e};(function(t,r,i){var s,o,u,a,f;return a={},s=t(i),f=a.wait=function(e){return t.Deferred(function(t){return setTimeout(function(){return t.resolve()},e)})},t.support.pushstate=t.isFunction(r.history.pushState),a.isToId=function(e){return e.charAt(0)==="#"?!0:!1},a.trimGetVals=function(e){return e.replace(/\?.*/,"")},a.tryParseAnotherPageAnchor=function(e){var t,n;return a.isToId(e)?!1:e.indexOf("#")===-1?!1:(t=e.match(/^([^#]+)#(.+)/),n={path:t[1]},t[2]&&(n.hash="#"+t[2]),n)},a.filterStr=function(e,n,r){var i;return r?(i=[],e.replace(n,function(e,t){return i.push(t)}),i):(i=e.match(n),i&&i[1]?t.trim(i[1]):null)},a.logger=r.Davis?(new Davis.logger).logger:null,a.info=u=function(e){if(!a.logger)return;return a.logger.info(e)},a.error=o=function(e){if(!a.logger)return;return a.logger.error(e)},a.fetchPage=function(){var e;return e=null,function(n,r){var i;return i=t.Deferred(function(i){var s;return(e!=null?e.abort:void 0)!=null&&e.abort(),s={url:n},r=t.extend(s,r),e=t.ajax(r),e.then(function(t){return e=null,i.resolve(t)},function(e,t){var n;return n=t==="abort",i.reject(n)})}).promise(),i.abort=function(){return e!=null?typeof e.abort=="function"?e.abort():void 0:void 0},i}}(),a.Event=function(){function t(){this._callbacks={}}return t.prototype.bind=function(e,t){var n,r,i,s,o;n=e.split(" ");for(s=0,o=n.length;s<o;s++)r=n[s],(i=this._callbacks)[r]||(i[r]=[]),this._callbacks[r].push(t);return this},t.prototype.one=function(e,t){return this.bind(e,function(){return this.unbind(e,arguments.callee),t.apply(this,arguments)})},t.prototype.trigger=function(){var t,n,r,i,s,o,u;t=1<=arguments.length?e.call(arguments,0):[],r=t.shift(),i=(u=this._callbacks)!=null?u[r]:void 0;if(!i)return;for(s=0,o=i.length;s<o;s++){n=i[s];if(n.apply(this,t)===!1)break}return this},t.prototype.unbind=function(e,t){var n,r,i,s,o,u;if(!e)return this._callbacks={},this;i=(u=this._callbacks)!=null?u[e]:void 0;if(!i)return this;if(!t)return delete this._callbacks[e],this;for(r=s=0,o=i.length;s<o;r=++s){n=i[r];if(n!==t)continue;i=i.slice(),i.splice(r,1),this._callbacks[e]=i;break}return this},t}(),a.HistoryLogger=function(){function e(){this._items=[],this._items.push(location.pathname.replace(/#.*/,""))}return e.prototype.push=function(e){return this._items.push(e),this},e.prototype.last=function(){var e;return e=this._items.length,e?this._items[e-1]:null},e.prototype.isToSamePageRequst=function(e){var t;return t=this.last(),t?e===t?!0:!1:!1},e.prototype.size=function(){return this._items.length},e}(),a.Page=function(e){function f(e,n,r,i,s,o){var a,l,c,h=this;this.request=e,this.routed=r,this.router=i,this.hash=o,f.__super__.constructor.apply(this,arguments),this.config=t.extend({},this.config,n),this.options=t.extend(!0,{},this.options,s),t.type(this.config.path)==="string"?this.path=this.config.path:this.path=this.request.path,t.each(u,function(e,n){return t.each(h.config,function(e,t){return n!==e?!0:h.bind(n,t)})}),a=((l=this.config)!=null?l.anchorhandler:void 0)||((c=this.options)!=null?c.anchorhandler:void 0),a&&(this._anchorhandler=a),this.bind("pageready",function(){if(!h.hash)return;return h._anchorhandler.call(h,h.hash)})}var u;return n(f,e),u=["fetchstart","fetchsuccess","fetchabort","fetchfail","pageready","anchorhandler"],f.prototype.options={ajxoptions:{dataType:"text",cache:!0},expr:null,updatetitle:!0,title:null},f.prototype.router=null,f.prototype.config=null,f.prototype._text=null,f.prototype._anchorhandler=function(e){var t;return e?(t=s.find(e).offset().top,r.scrollTo(0,t),this):this},f.prototype.fetch=function(){var e,n,r,i,s,o,u=this;e=null,r=this.request.path,n=((i=this.options)!=null?i.ajaxoptions:void 0)||{};if((s=this.config)!=null?s.method:void 0)n.type=this.config.method;if((o=this.request)!=null?o.params:void 0)n.data=t.extend(!0,{},n.data,this.request.params);return this._fetchDefer=t.Deferred(function(t){return e=a.fetchPage(r,n),e.then(function(e){return u._text=e,u.updatetitle(),t.resolve()},function(e){return t.reject({aborted:e})}).always(function(){return u._fetchDefer=null})}),this._fetchDefer.abort=function(){return e.abort()},this._fetchDefer},f.prototype.abort=function(){var e;return(e=this._fetchDefer)!=null&&e.abort(),this},f.prototype.rip=function(e,t){var n,r,i,s;return this._text?e?(n=(i=this.options)!=null?(s=i.expr)!=null?s[e]:void 0:void 0,n?(r=a.filterStr(this._text,n,t),r||o("ripper could not find the text for key: "+e),r):null):this._text:null},f.prototype.ripAll=function(e){return this.rip(e,!0)},f.prototype.updatetitle=function(){var e;return this.options.updatetitle?(e=null,!e&&this._text&&(e=this.rip("title")),e?(i.title=e,this):this):this},f}(a.Event),a.Router=function(r){function i(e){if(!(this instanceof arguments.callee))return new a.Router(e);i.__super__.constructor.apply(this,arguments),this.history=new a.HistoryLogger,e.call(this,this),this.options.davis&&this._setupDavis(),this.firePageready(!this.options.firereadyonstart),this.fireTransPageready()}return n(i,r),i.prototype.options={ajaxoptions:{dataType:"text",cache:!0,type:"GET"},expr:{title:/<title[^>]*>([^<]*)<\/title>/,content:/<!-- LazyJaxDavis start -->([\s\S]*)<!-- LazyJaxDavis end -->/},davis:{linkSelector:"a:not([href^=#]):not(.apply-nolazy)",formSelector:"form:not(.apply-nolazy)",throwErrors:!1,handleRouteNotFound:!0},minwaittime:0,updatetitle:!0,firereadyonstart:!0,ignoregetvals:!1},i.prototype._createPage=function(e,t,n,r){var i,s;return i={expr:this.options.expr,updatetitle:this.options.updatetitle},this.options.anchorhandler&&(i.anchorhandler=this.options.anchorhandler),(t!=null?t.ajaxoptions:void 0)?i.ajaxoptions=t.ajaxoptions:this.options.ajaxoptions&&(i.ajaxoptions=this.options.ajaxoptions),!r&&(e!=null?e.path:void 0)&&(s=a.tryParseAnotherPageAnchor(e.path),r=s.hash||null),new a.Page(e,t,n,this,i,r)},i.prototype._setupDavis=function(){var e,n,r=this;if(!t.support.pushstate)return;return n=this,e=function(e){return e.bind("pageready",function(){return n._findWhosePathMatches("page",e.path),n.trigger("everypageready"),n.fireTransPageready()}),n.history.push(e.path),n.fetch(e)},this.davis=new Davis(function(){var r,i;return r=this,n.pages&&t.each(n.pages,function(i,s){var o;if(t.type(s.path)==="regexp")return;return o=(s.method||"get").toLowerCase(),r[o](s.path,function(t){var r;if(n.history.isToSamePageRequst(t.path))return;return r=n._createPage(t,s,!0),e(r)}),!0}),(i=n.davisInitializer)!=null?i.call(r):void 0}),this.options.davis.handleRouteNotFound&&this.davis.bind("routeNotFound",function(t){var r,i,s,o,u,f;if(a.isToId(t.path)){n.trigger("toid",t.path);return}u=a.tryParseAnotherPageAnchor(t.path),i=u.hash||null,o=u.path||t.path;if(n.history.isToSamePageRequst(o))return;return r=n._findWhosePathMatches("page",o)||null,f=r?!0:!1,s=n._createPage(t,r,f,i),e(s)}),this.davis.configure(function(e){return t.each(r.options.davis,function(t,n){return e[t]=n,!0})}),this._tweakDavis(),this},i.prototype._tweakDavis=function(){var t,n=this;return t=this.davis.logger.warn,u=this.davis.logger.info,this.davis.logger.warn=function(){var r;return r=1<=arguments.length?e.call(arguments,0):[],r[0].indexOf("routeNotFound")!==-1?(r[0]=r[0].replace(/routeNotFound/,"unRouted"),u.apply(n.davis.logger,r)):t.apply(n.davis.logger,r)},this},i.prototype._findWhosePathMatches=function(e,n,r){var i,s,u,f=this;if(e==="page"){if(!this.pages||!this.pages.length)return null;i=this.pages}else if(e==="transRoutes"){if(!this.transRoutes||!this.transRoutes.length)return null;i=this.transRoutes,r=!0}return s=[],u=a.trimGetVals(n),t.each(i,function(e,i){var o;f.options.ignoregetvals||i.ignoregetvals?o=u:o=n;if(t.type(i.path)==="regexp"){if(!i.path.test(o))return!0;s.push(i);if(r)return!0}if(i.path===o){s.push(i);if(r)return!0}return!0}),!r&&s.length>1?(o("2 or more expr was matched about: "+n),t.each(s,function(e,t){return o("dumps detected page configs - path:"+t.path)}),!1):r?s:s[0]||null},i.prototype.fetch=function(e){var n=this;return t.Deferred(function(r){return e.trigger("fetchstart",e),n.trigger("everyfetchstart",e),t.when(e.fetch(),f(n.options.minwaittime)).then(function(){return e.trigger("fetchsuccess",e),n.trigger("everyfetchsuccess",e),r.resolve()},function(t){return t.aborted?(e.trigger("fetchabort",e),n.trigger("everyfetchabort",e)):(e.trigger("fetchfil",e),n.trigger("everyfetchfail",e))})}).promise()},i.prototype.stop=function(){var e;return(e=this.davis)!=null&&e.stop(),this},i.prototype.navigate=function(e,t){var n;return this.davis?(n=new Davis.Request({method:t||"get",fullPath:e,title:""}),Davis.location.assign(n)):location.href=e,this},i.prototype.firePageready=function(e){var t,n;if((n=this.pages)!=null?n.length:void 0)t=this._findWhosePathMatches("page",location.pathname),t&&typeof t.pageready=="function"&&t.pageready();return e?this:(this.trigger("everypageready"),this)},i.prototype.fireTransPageready=function(){var e,n;if((n=this.transRoutes)!=null?n.length:void 0){e=this._findWhosePathMatches("transRoutes",location.pathname);if(!e.length)return this;t.each(e,function(e,t){return typeof t.pageready=="function"?t.pageready():void 0})}return this},i.prototype.route=function(e){return this.pages=e,this},i.prototype.routeTransparents=function(e){return this.transRoutes=e,this},i.prototype.routeDavis=function(e){return this.davisInitializer=e,this},i.prototype.option=function(e){return e?this.options=t.extend(!0,{},this.options,e):this.options},i}(a.Event),t.LazyJaxDavisNs=a,t.LazyJaxDavis=a.Router})(jQuery,this,this.document)}).call(this);

(function(){var t,n,e,r,i,o;o=function(t){return $.Deferred(function(n){return setTimeout(function(){return n.resolve()},t)})},$.tinyscroller.option({changehash:!1}),$.tinyscroller.live(),t=function(t){return t=t||location.href,window._gaq.push(["_trackPageview",t])},n=function(){window.disqus_shortname="takazudolog",window.disqus_identifier=location.href,window.disqus_url=location.href,window.disqus_script="embed.js";try{return function(){var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src="http://"+disqus_shortname+".disqus.com/"+disqus_script,(document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0]).appendChild(t)}()}catch(t){}},e=function(){var t,n;return t=!1,n=function(){return function(t,n,e){var r,i=t.getElementsByTagName(n)[0];t.getElementById(e)||(r=t.createElement(n),r.id=e,r.src="//connect.facebook.net/en_US/all.js#appId=121042718060158&xfbml=1",i.parentNode.insertBefore(r,i))}(document,"script","facebook-jssdk"),t=!0},function(e){return t?FB.XFBML.parse(e[0]):n()}}(),r=function(){var t,n;return t=!1,window.___gcfg={lang:"en"},n=function(){return $.getScript("https://apis.google.com/js/plusone.js"),t=!0},function(){return t?gapi&&gapi.plusone.go():n(),this}}(),i=function(){var t;return t=!1,function(){return t?twttr.widgets.load():($.getScript("https://platform.twitter.com/widgets.js"),t=!0),this}}(),$.fn.disableCurrentLinks=function(){var t;return t="state-disabled",this.each(function(){return $("a",this).each(function(){var n;return n=$(this),n.attr("href")===location.pathname?n.addClass(t):n.removeClass(t),this})})},$.fn.handleCodeHighlight=function(){return this.each(function(){var t,n,e,r,i;return t=$(this),n=$("pre",t),r=n.html(),i=r.split(/\n\r?/),i=$.map(i,function(t){return"<div class='line'>"+(t||" ")+"</div>"}),n.html(i.join("")),e=$("<table><tr><td></td></tr></table>"),e.find("td").append(n),t.append(e),t.after('<div style="height:0;"></div>')})},$(function(){return $.LazyJaxDavis(function(a){var s,c,u,l,d,f;return c=$("#loadingplacer"),u=$("#lazyjaxdavisroot"),s=$("body"),f=null,l=null,d=function(){var t,n;return n={color:"#878C8C",length:20,radius:30},t=new Spinner(n).spin(c[0]),l=$(t.el)},a.option({ignoregetvals:!0,anchorhandler:function(t){return $.tinyscroller.scrollTo(t)}}),a.bind("everyfetchstart",function(){return u.removeClass("state-animenabled"),c.show(),d(),o(0).done(function(){return u.css("opacity",.3),f=$.tinyscroller.scrollTo(0)})}),a.bind("everyfetchsuccess",function(n){return t(),$.when(f).done(function(){return l.remove(),c.hide(),u.css("opacity",0),o(0).done(function(){return u.addClass("state-animenabled"),u.html(n.rip("content")),u.css("opacity",1),n.trigger("pageready"),f=null})})}),a.bind("everypageready",function(){return s.disableCurrentLinks(),u.find(".highlight").handleCodeHighlight(),this}),a.routeTransparents([{path:/^\/blog\/entry\/.+/,pageready:function(){return i(),r(),e(u.find(".fb-likewrap")),n()}}])})})}).call(this);