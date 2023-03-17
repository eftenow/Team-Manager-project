/*! For license information please see main.js.LICENSE.txt */
(()=>{"use strict";var e=Array.isArray||function(e){return"[object Array]"==Object.prototype.toString.call(e)},t=function t(n,i,a){return e(i=i||[])?a||(a={}):(a=i,i=[]),n instanceof RegExp?function(e,t){var n=e.source.match(/\((?!\?)/g);if(n)for(var i=0;i<n.length;i++)t.push({name:i,prefix:null,delimiter:null,optional:!1,repeat:!1,pattern:null});return h(e,t)}(n,i):e(n)?function(e,n,i){for(var a=[],s=0;s<e.length;s++)a.push(t(e[s],n,i).source);return h(new RegExp("(?:"+a.join("|")+")",d(i)),n)}(n,i,a):function(e,t,n){for(var i=r(e),a=u(i,n),s=0;s<i.length;s++)"string"!=typeof i[s]&&t.push(i[s]);return h(a,t)}(n,i,a)},n=r,i=o,a=u,s=new RegExp(["(\\\\.)","([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))"].join("|"),"g");function r(e){for(var t,n=[],i=0,a=0,r="";null!=(t=s.exec(e));){var o=t[0],l=t[1],h=t.index;if(r+=e.slice(a,h),a=h+o.length,l)r+=l[1];else{r&&(n.push(r),r="");var d=t[2],u=t[3],p=t[4],m=t[5],f=t[6],g=t[7],v="+"===f||"*"===f,y="?"===f||"*"===f,$=d||"/",w=p||m||(g?".*":"[^"+$+"]+?");n.push({name:u||i++,prefix:d||"",delimiter:$,optional:y,repeat:v,pattern:c(w)})}}return a<e.length&&(r+=e.substr(a)),r&&n.push(r),n}function o(t){for(var n=new Array(t.length),i=0;i<t.length;i++)"object"==typeof t[i]&&(n[i]=new RegExp("^"+t[i].pattern+"$"));return function(i){for(var a="",s=i||{},r=0;r<t.length;r++){var o=t[r];if("string"!=typeof o){var l,c=s[o.name];if(null==c){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to be defined')}if(e(c)){if(!o.repeat)throw new TypeError('Expected "'+o.name+'" to not repeat, but received "'+c+'"');if(0===c.length){if(o.optional)continue;throw new TypeError('Expected "'+o.name+'" to not be empty')}for(var h=0;h<c.length;h++){if(l=encodeURIComponent(c[h]),!n[r].test(l))throw new TypeError('Expected all "'+o.name+'" to match "'+o.pattern+'", but received "'+l+'"');a+=(0===h?o.prefix:o.delimiter)+l}}else{if(l=encodeURIComponent(c),!n[r].test(l))throw new TypeError('Expected "'+o.name+'" to match "'+o.pattern+'", but received "'+l+'"');a+=o.prefix+l}}else a+=o}return a}}function l(e){return e.replace(/([.+*?=^!:${}()[\]|\/])/g,"\\$1")}function c(e){return e.replace(/([=!:$\/()])/g,"\\$1")}function h(e,t){return e.keys=t,e}function d(e){return e.sensitive?"":"i"}function u(e,t){for(var n=(t=t||{}).strict,i=!1!==t.end,a="",s=e[e.length-1],r="string"==typeof s&&/\/$/.test(s),o=0;o<e.length;o++){var c=e[o];if("string"==typeof c)a+=l(c);else{var h=l(c.prefix),u=c.pattern;c.repeat&&(u+="(?:"+h+u+")*"),a+=u=c.optional?h?"(?:"+h+"("+u+"))?":"("+u+")?":h+"("+u+")"}}return n||(a=(r?a.slice(0,-2):a)+"(?:\\/(?=$))?"),a+=i?"$":n&&r?"":"(?=\\/|$)",new RegExp("^"+a,d(t))}t.parse=n,t.compile=function(e){return o(r(e))},t.tokensToFunction=i,t.tokensToRegExp=a;var p,m="undefined"!=typeof document,f="undefined"!=typeof window,g="undefined"!=typeof history,v="undefined"!=typeof process,y=m&&document.ontouchstart?"touchstart":"click",$=f&&!(!window.history.location&&!window.location);function w(){this.callbacks=[],this.exits=[],this.current="",this.len=0,this._decodeURLComponents=!0,this._base="",this._strict=!1,this._running=!1,this._hashbang=!1,this.clickHandler=this.clickHandler.bind(this),this._onpopstate=this._onpopstate.bind(this)}function _(e,t){if("function"==typeof e)return _.call(this,"*",e);if("function"==typeof t)for(var n=new x(e,null,this),i=1;i<arguments.length;++i)this.callbacks.push(n.middleware(arguments[i]));else"string"==typeof e?this["string"==typeof t?"redirect":"show"](e,t):this.start(e)}function b(e){if(!e.handled){var t=this,n=t._window;(t._hashbang?$&&this._getBase()+n.location.hash.replace("#!",""):$&&n.location.pathname+n.location.search)!==e.canonicalPath&&(t.stop(),e.handled=!1,$&&(n.location.href=e.canonicalPath))}}function A(e,t,n){var i=this.page=n||_,a=i._window,s=i._hashbang,r=i._getBase();"/"===e[0]&&0!==e.indexOf(r)&&(e=r+(s?"#!":"")+e);var o=e.indexOf("?");this.canonicalPath=e;var l=new RegExp("^"+function(e){return e.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}(r));if(this.path=e.replace(l,"")||"/",s&&(this.path=this.path.replace("#!","")||"/"),this.title=m&&a.document.title,this.state=t||{},this.state.path=e,this.querystring=~o?i._decodeURLEncodedURIComponent(e.slice(o+1)):"",this.pathname=i._decodeURLEncodedURIComponent(~o?e.slice(0,o):e),this.params={},this.hash="",!s){if(!~this.path.indexOf("#"))return;var c=this.path.split("#");this.path=this.pathname=c[0],this.hash=i._decodeURLEncodedURIComponent(c[1])||"",this.querystring=this.querystring.split("#")[0]}}function x(e,n,i){var a=this.page=i||E,s=n||{};s.strict=s.strict||a._strict,this.path="*"===e?"(.*)":e,this.method="GET",this.regexp=t(this.path,this.keys=[],s)}w.prototype.configure=function(e){var t=e||{};this._window=t.window||f&&window,this._decodeURLComponents=!1!==t.decodeURLComponents,this._popstate=!1!==t.popstate&&f,this._click=!1!==t.click&&m,this._hashbang=!!t.hashbang;var n=this._window;this._popstate?n.addEventListener("popstate",this._onpopstate,!1):f&&n.removeEventListener("popstate",this._onpopstate,!1),this._click?n.document.addEventListener(y,this.clickHandler,!1):m&&n.document.removeEventListener(y,this.clickHandler,!1),this._hashbang&&f&&!g?n.addEventListener("hashchange",this._onpopstate,!1):f&&n.removeEventListener("hashchange",this._onpopstate,!1)},w.prototype.base=function(e){if(0===arguments.length)return this._base;this._base=e},w.prototype._getBase=function(){var e=this._base;if(e)return e;var t=f&&this._window&&this._window.location;return f&&this._hashbang&&t&&"file:"===t.protocol&&(e=t.pathname),e},w.prototype.strict=function(e){if(0===arguments.length)return this._strict;this._strict=e},w.prototype.start=function(e){var t=e||{};if(this.configure(t),!1!==t.dispatch){var n;if(this._running=!0,$){var i=this._window.location;n=this._hashbang&&~i.hash.indexOf("#!")?i.hash.substr(2)+i.search:this._hashbang?i.search+i.hash:i.pathname+i.search+i.hash}this.replace(n,null,!0,t.dispatch)}},w.prototype.stop=function(){if(this._running){this.current="",this.len=0,this._running=!1;var e=this._window;this._click&&e.document.removeEventListener(y,this.clickHandler,!1),f&&e.removeEventListener("popstate",this._onpopstate,!1),f&&e.removeEventListener("hashchange",this._onpopstate,!1)}},w.prototype.show=function(e,t,n,i){var a=new A(e,t,this),s=this.prevContext;return this.prevContext=a,this.current=a.path,!1!==n&&this.dispatch(a,s),!1!==a.handled&&!1!==i&&a.pushState(),a},w.prototype.back=function(e,t){var n=this;if(this.len>0){var i=this._window;g&&i.history.back(),this.len--}else e?setTimeout((function(){n.show(e,t)})):setTimeout((function(){n.show(n._getBase(),t)}))},w.prototype.redirect=function(e,t){var n=this;"string"==typeof e&&"string"==typeof t&&_.call(this,e,(function(e){setTimeout((function(){n.replace(t)}),0)})),"string"==typeof e&&void 0===t&&setTimeout((function(){n.replace(e)}),0)},w.prototype.replace=function(e,t,n,i){var a=new A(e,t,this),s=this.prevContext;return this.prevContext=a,this.current=a.path,a.init=n,a.save(),!1!==i&&this.dispatch(a,s),a},w.prototype.dispatch=function(e,t){var n=0,i=0,a=this;function s(){var t=a.callbacks[n++];if(e.path===a.current)return t?void t(e,s):b.call(a,e);e.handled=!1}t?function e(){var n=a.exits[i++];if(!n)return s();n(t,e)}():s()},w.prototype.exit=function(e,t){if("function"==typeof e)return this.exit("*",e);for(var n=new x(e,null,this),i=1;i<arguments.length;++i)this.exits.push(n.middleware(arguments[i]))},w.prototype.clickHandler=function(e){if(1===this._which(e)&&!(e.metaKey||e.ctrlKey||e.shiftKey||e.defaultPrevented)){var t=e.target,n=e.path||(e.composedPath?e.composedPath():null);if(n)for(var i=0;i<n.length;i++)if(n[i].nodeName&&"A"===n[i].nodeName.toUpperCase()&&n[i].href){t=n[i];break}for(;t&&"A"!==t.nodeName.toUpperCase();)t=t.parentNode;if(t&&"A"===t.nodeName.toUpperCase()){var a="object"==typeof t.href&&"SVGAnimatedString"===t.href.constructor.name;if(!t.hasAttribute("download")&&"external"!==t.getAttribute("rel")){var s=t.getAttribute("href");if((this._hashbang||!this._samePath(t)||!t.hash&&"#"!==s)&&!(s&&s.indexOf("mailto:")>-1)&&!(a?t.target.baseVal:t.target)&&(a||this.sameOrigin(t.href))){var r=a?t.href.baseVal:t.pathname+t.search+(t.hash||"");r="/"!==r[0]?"/"+r:r,v&&r.match(/^\/[a-zA-Z]:\//)&&(r=r.replace(/^\/[a-zA-Z]:\//,"/"));var o=r,l=this._getBase();0===r.indexOf(l)&&(r=r.substr(l.length)),this._hashbang&&(r=r.replace("#!","")),(!l||o!==r||$&&"file:"===this._window.location.protocol)&&(e.preventDefault(),this.show(o))}}}}},w.prototype._onpopstate=(p=!1,f?(m&&"complete"===document.readyState?p=!0:window.addEventListener("load",(function(){setTimeout((function(){p=!0}),0)})),function(e){if(p){var t=this;if(e.state){var n=e.state.path;t.replace(n,e.state)}else if($){var i=t._window.location;t.show(i.pathname+i.search+i.hash,void 0,void 0,!1)}}}):function(){}),w.prototype._which=function(e){return null==(e=e||f&&this._window.event).which?e.button:e.which},w.prototype._toURL=function(e){var t=this._window;if("function"==typeof URL&&$)return new URL(e,t.location.toString());if(m){var n=t.document.createElement("a");return n.href=e,n}},w.prototype.sameOrigin=function(e){if(!e||!$)return!1;var t=this._toURL(e),n=this._window.location;return n.protocol===t.protocol&&n.hostname===t.hostname&&(n.port===t.port||""===n.port&&(80==t.port||443==t.port))},w.prototype._samePath=function(e){if(!$)return!1;var t=this._window.location;return e.pathname===t.pathname&&e.search===t.search},w.prototype._decodeURLEncodedURIComponent=function(e){return"string"!=typeof e?e:this._decodeURLComponents?decodeURIComponent(e.replace(/\+/g," ")):e},A.prototype.pushState=function(){var e=this.page,t=e._window,n=e._hashbang;e.len++,g&&t.history.pushState(this.state,this.title,n&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},A.prototype.save=function(){var e=this.page;g&&e._window.history.replaceState(this.state,this.title,e._hashbang&&"/"!==this.path?"#!"+this.path:this.canonicalPath)},x.prototype.middleware=function(e){var t=this;return function(n,i){if(t.match(n.path,n.params))return n.routePath=t.path,e(n,i);i()}},x.prototype.match=function(e,t){var n=this.keys,i=e.indexOf("?"),a=~i?e.slice(0,i):e,s=this.regexp.exec(decodeURIComponent(a));if(!s)return!1;delete t[0];for(var r=1,o=s.length;r<o;++r){var l=n[r-1],c=this.page._decodeURLEncodedURIComponent(s[r]);void 0===c&&hasOwnProperty.call(t,l.name)||(t[l.name]=c)}return!0};var E=function e(){var t=new w;function n(){return _.apply(t,arguments)}return n.callbacks=t.callbacks,n.exits=t.exits,n.base=t.base.bind(t),n.strict=t.strict.bind(t),n.start=t.start.bind(t),n.stop=t.stop.bind(t),n.show=t.show.bind(t),n.back=t.back.bind(t),n.redirect=t.redirect.bind(t),n.replace=t.replace.bind(t),n.dispatch=t.dispatch.bind(t),n.exit=t.exit.bind(t),n.configure=t.configure.bind(t),n.sameOrigin=t.sameOrigin.bind(t),n.clickHandler=t.clickHandler.bind(t),n.create=e,Object.defineProperty(n,"len",{get:function(){return t.len},set:function(e){t.len=e}}),Object.defineProperty(n,"current",{get:function(){return t.current},set:function(e){t.current=e}}),n.Context=A,n.Route=x,n}(),C=E,S=E;C.default=S;const T=C;var I;const k=window,N=k.trustedTypes,U=N?N.createPolicy("lit-html",{createHTML:e=>e}):void 0,R=`lit$${(Math.random()+"").slice(9)}$`,L="?"+R,H=`<${L}>`,D=document,O=(e="")=>D.createComment(e),P=e=>null===e||"object"!=typeof e&&"function"!=typeof e,B=Array.isArray,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,M=/-->/g,q=/>/g,z=RegExp(">|[ \t\n\f\r](?:([^\\s\"'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r\"'`<>=]|(\"|')|))|$)","g"),J=/'/g,W=/"/g,V=/^(?:script|style|textarea|title)$/i,Z=e=>(t,...n)=>({_$litType$:e,strings:t,values:n}),X=Z(1),F=(Z(2),Symbol.for("lit-noChange")),K=Symbol.for("lit-nothing"),Y=new WeakMap,G=D.createTreeWalker(D,129,null,!1),Q=(e,t)=>{const n=e.length-1,i=[];let a,s=2===t?"<svg>":"",r=j;for(let t=0;t<n;t++){const n=e[t];let o,l,c=-1,h=0;for(;h<n.length&&(r.lastIndex=h,l=r.exec(n),null!==l);)h=r.lastIndex,r===j?"!--"===l[1]?r=M:void 0!==l[1]?r=q:void 0!==l[2]?(V.test(l[2])&&(a=RegExp("</"+l[2],"g")),r=z):void 0!==l[3]&&(r=z):r===z?">"===l[0]?(r=null!=a?a:j,c=-1):void 0===l[1]?c=-2:(c=r.lastIndex-l[2].length,o=l[1],r=void 0===l[3]?z:'"'===l[3]?W:J):r===W||r===J?r=z:r===M||r===q?r=j:(r=z,a=void 0);const d=r===z&&e[t+1].startsWith("/>")?" ":"";s+=r===j?n+H:c>=0?(i.push(o),n.slice(0,c)+"$lit$"+n.slice(c)+R+d):n+R+(-2===c?(i.push(void 0),t):d)}const o=s+(e[n]||"<?>")+(2===t?"</svg>":"");if(!Array.isArray(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==U?U.createHTML(o):o,i]};class ee{constructor({strings:e,_$litType$:t},n){let i;this.parts=[];let a=0,s=0;const r=e.length-1,o=this.parts,[l,c]=Q(e,t);if(this.el=ee.createElement(l,n),G.currentNode=this.el.content,2===t){const e=this.el.content,t=e.firstChild;t.remove(),e.append(...t.childNodes)}for(;null!==(i=G.nextNode())&&o.length<r;){if(1===i.nodeType){if(i.hasAttributes()){const e=[];for(const t of i.getAttributeNames())if(t.endsWith("$lit$")||t.startsWith(R)){const n=c[s++];if(e.push(t),void 0!==n){const e=i.getAttribute(n.toLowerCase()+"$lit$").split(R),t=/([.?@])?(.*)/.exec(n);o.push({type:1,index:a,name:t[2],strings:e,ctor:"."===t[1]?se:"?"===t[1]?oe:"@"===t[1]?le:ae})}else o.push({type:6,index:a})}for(const t of e)i.removeAttribute(t)}if(V.test(i.tagName)){const e=i.textContent.split(R),t=e.length-1;if(t>0){i.textContent=N?N.emptyScript:"";for(let n=0;n<t;n++)i.append(e[n],O()),G.nextNode(),o.push({type:2,index:++a});i.append(e[t],O())}}}else if(8===i.nodeType)if(i.data===L)o.push({type:2,index:a});else{let e=-1;for(;-1!==(e=i.data.indexOf(R,e+1));)o.push({type:7,index:a}),e+=R.length-1}a++}}static createElement(e,t){const n=D.createElement("template");return n.innerHTML=e,n}}function te(e,t,n=e,i){var a,s,r,o;if(t===F)return t;let l=void 0!==i?null===(a=n._$Co)||void 0===a?void 0:a[i]:n._$Cl;const c=P(t)?void 0:t._$litDirective$;return(null==l?void 0:l.constructor)!==c&&(null===(s=null==l?void 0:l._$AO)||void 0===s||s.call(l,!1),void 0===c?l=void 0:(l=new c(e),l._$AT(e,n,i)),void 0!==i?(null!==(r=(o=n)._$Co)&&void 0!==r?r:o._$Co=[])[i]=l:n._$Cl=l),void 0!==l&&(t=te(e,l._$AS(e,t.values),l,i)),t}class ne{constructor(e,t){this.u=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}v(e){var t;const{el:{content:n},parts:i}=this._$AD,a=(null!==(t=null==e?void 0:e.creationScope)&&void 0!==t?t:D).importNode(n,!0);G.currentNode=a;let s=G.nextNode(),r=0,o=0,l=i[0];for(;void 0!==l;){if(r===l.index){let t;2===l.type?t=new ie(s,s.nextSibling,this,e):1===l.type?t=new l.ctor(s,l.name,l.strings,this,e):6===l.type&&(t=new ce(s,this,e)),this.u.push(t),l=i[++o]}r!==(null==l?void 0:l.index)&&(s=G.nextNode(),r++)}return a}p(e){let t=0;for(const n of this.u)void 0!==n&&(void 0!==n.strings?(n._$AI(e,n,t),t+=n.strings.length-2):n._$AI(e[t])),t++}}class ie{constructor(e,t,n,i){var a;this.type=2,this._$AH=K,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=n,this.options=i,this._$Cm=null===(a=null==i?void 0:i.isConnected)||void 0===a||a}get _$AU(){var e,t;return null!==(t=null===(e=this._$AM)||void 0===e?void 0:e._$AU)&&void 0!==t?t:this._$Cm}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=te(this,e,t),P(e)?e===K||null==e||""===e?(this._$AH!==K&&this._$AR(),this._$AH=K):e!==this._$AH&&e!==F&&this.g(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>B(e)||"function"==typeof(null==e?void 0:e[Symbol.iterator]))(e)?this.k(e):this.g(e)}O(e,t=this._$AB){return this._$AA.parentNode.insertBefore(e,t)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}g(e){this._$AH!==K&&P(this._$AH)?this._$AA.nextSibling.data=e:this.T(D.createTextNode(e)),this._$AH=e}$(e){var t;const{values:n,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=ee.createElement(i.h,this.options)),i);if((null===(t=this._$AH)||void 0===t?void 0:t._$AD)===a)this._$AH.p(n);else{const e=new ne(a,this),t=e.v(this.options);e.p(n),this.T(t),this._$AH=e}}_$AC(e){let t=Y.get(e.strings);return void 0===t&&Y.set(e.strings,t=new ee(e)),t}k(e){B(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let n,i=0;for(const a of e)i===t.length?t.push(n=new ie(this.O(O()),this.O(O()),this,this.options)):n=t[i],n._$AI(a),i++;i<t.length&&(this._$AR(n&&n._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){var n;for(null===(n=this._$AP)||void 0===n||n.call(this,!1,!0,t);e&&e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){var t;void 0===this._$AM&&(this._$Cm=e,null===(t=this._$AP)||void 0===t||t.call(this,e))}}class ae{constructor(e,t,n,i,a){this.type=1,this._$AH=K,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=a,n.length>2||""!==n[0]||""!==n[1]?(this._$AH=Array(n.length-1).fill(new String),this.strings=n):this._$AH=K}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,t=this,n,i){const a=this.strings;let s=!1;if(void 0===a)e=te(this,e,t,0),s=!P(e)||e!==this._$AH&&e!==F,s&&(this._$AH=e);else{const i=e;let r,o;for(e=a[0],r=0;r<a.length-1;r++)o=te(this,i[n+r],t,r),o===F&&(o=this._$AH[r]),s||(s=!P(o)||o!==this._$AH[r]),o===K?e=K:e!==K&&(e+=(null!=o?o:"")+a[r+1]),this._$AH[r]=o}s&&!i&&this.j(e)}j(e){e===K?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=e?e:"")}}class se extends ae{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===K?void 0:e}}const re=N?N.emptyScript:"";class oe extends ae{constructor(){super(...arguments),this.type=4}j(e){e&&e!==K?this.element.setAttribute(this.name,re):this.element.removeAttribute(this.name)}}class le extends ae{constructor(e,t,n,i,a){super(e,t,n,i,a),this.type=5}_$AI(e,t=this){var n;if((e=null!==(n=te(this,e,t,0))&&void 0!==n?n:K)===F)return;const i=this._$AH,a=e===K&&i!==K||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==K&&(i===K||a);a&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t,n;"function"==typeof this._$AH?this._$AH.call(null!==(n=null===(t=this.options)||void 0===t?void 0:t.host)&&void 0!==n?n:this.element,e):this._$AH.handleEvent(e)}}class ce{constructor(e,t,n){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=n}get _$AU(){return this._$AM._$AU}_$AI(e){te(this,e)}}const he=k.litHtmlPolyfillSupport;null==he||he(ee,ie),(null!==(I=k.litHtmlVersions)&&void 0!==I?I:k.litHtmlVersions=[]).push("2.6.1");const de=(e,t,n)=>{var i,a;const s=null!==(i=null==n?void 0:n.renderBefore)&&void 0!==i?i:t;let r=s._$litPart$;if(void 0===r){const e=null!==(a=null==n?void 0:n.renderBefore)&&void 0!==a?a:null;s._$litPart$=r=new ie(t.insertBefore(O(),e),e,void 0,null!=n?n:{})}return r._$AI(e),r},ue="http://localhost:3030/users",pe="/users/logout";function me(e){localStorage.setItem("accessToken",JSON.stringify(e.accessToken)),localStorage.setItem("username",JSON.stringify(e.username)),localStorage.setItem("email",JSON.stringify(e.email)),localStorage.setItem("_id",JSON.stringify(e._id))}function fe(){return JSON.parse(localStorage.getItem("accessToken"))}function ge(){return JSON.parse(localStorage.getItem("_id"))}function ve(){return JSON.parse(localStorage.getItem("username"))}function ye(e){e.target.style.display="none"}document.getElementById("content");const $e=document.querySelector("main"),we=(e,t)=>X`
    <section id="home">
        <article class="hero layout">
            <img src="./assets/team.png" class="left-col pad-med">
            <div class="pad-med tm-hero-col">
                <h2>Welcome to Team Manager!</h2>
                <p>Want to organize your peers? Create and manage a team for free.</p>
                <p>Looking for a team to join? Browse our communities and find like-minded people!</p>
                ${null===e?X`<a href="/register" class="action cta">Sign Up Now</a>`:X`<a href="/teams" class="action cta">Browse Teams</a>`}


            </div>
        </article>
       
    </section>
`;function _e(e){let t=ve(),n=we(t);e.render(n)}let be=5;const Ae="http://localhost:3030/data";async function xe(e){let t=`/teams?offset=${(e-1)*be}&pageSize=5`;return(await fetch(Ae+t)).json()}async function Ee(e){return(await fetch(`${Ae}/teams/${e}`)).json()}async function Ce(e){return(await fetch(`${Ae}/members?where=teamId%3D%22${e}%22&load=user%3D_ownerId%3Ausers`)).json()}async function Se(e){const t=fe();let n=await fetch(`${Ae}/members`,{method:"POST",headers:{"content-type":"application/json","X-Authorization":t},body:JSON.stringify({teamId:e})});return await n.json()}async function Te(e){let t={method:"DELETE",headers:{}};const n=fe();null!==n&&(t.headers["X-Authorization"]=n),await fetch(`${Ae}/members/${e}`,t)}async function Ie(e,t){const n=fe();let i=await fetch(`${Ae}/members/${e}`,{method:"PUT",headers:{"content-type":"application/json","X-Authorization":n},body:JSON.stringify(t)});(await i.json())._id}async function ke(){return(await fetch(Ae+"/teams?count")).json()}function Ne(){let e=document.getElementById("email"),t=document.querySelector(".error");const n=document.createElement("p");n.id="wrong-email";let i=!1;return/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(e.value)?i=!0:(n.textContent="Invalid email input!",t.appendChild(n)),i}function Ue(){try{document.getElementById("wrong-email").remove()}catch{}}function Re(){try{document.getElementById("wrong-username").remove()}catch{}}function Le(){let e=document.getElementById("username"),t=document.querySelector(".error");const n=document.createElement("p");n.id="wrong-username";let i=!1;return e.value.length<3?(n.textContent="Username has to be atleast 3 characters long!",t.appendChild(n)):i=!0,i}function He(){let e=document.querySelector(".error"),t=document.getElementById("pass");const n=document.createElement("p");n.id="wrong-pass";let i=!1;return t.value.length<3?(n.textContent="Password must to be atleast 3 characters long!",e.appendChild(n)):i=!0,i}function De(){let e=document.getElementById("pass"),t=document.getElementById("rePass"),n=document.querySelector(".error");const i=document.createElement("p");i.id="wrong-rePass";let a=!1;return e.value!=t.value?(i.textContent="Passwords must match!",n.appendChild(i)):a=!0,a}function Oe(){try{document.getElementById("wrong-password").remove()}catch{}}function Pe(){try{document.getElementById("wrong-rePass").remove()}catch{}}function Be(e){try{document.getElementById("wrong-login").remove()}catch{}}function je(e,t,n,i){i.replaceChildren();let a=function(e,t){const n=document.createElement("p");let i=!1;if(e.length<4)n.textContent="Team name has to be atleast 4 characters long!",t.appendChild(n);else{i=!0;try{t.removeChild(n)}catch{}}return i}(e,i),s=function(e,t){const n=document.createElement("p");let i=!1;if(e){i=!0;try{t.removeChild(n)}catch{}}else n.textContent="Logo URL is a required field!",t.appendChild(n);return i}(t,i),r=function(e,t){const n=document.createElement("p");let i=!1;if(e.length<10)n.textContent="Team description has to be atleast 10 characters long!",t.appendChild(n);else{i=!0;try{t.removeChild(n)}catch{}}return i}(n,i);if(!a||!s||!r)throw new Error}let Me=document.createElement("div");Me.id="modal",Me.innerHTML='\n    <div class="modal-content">\n        <p class="modal-msg"></p>\n        <button  class="action" id="confirm-remove">Yes</button>\n        <button  class="action" id="cancel-remove">No</button>    \n</div>',Me.querySelector("#confirm-remove").addEventListener("click",(()=>Je(!0))),Me.querySelector("#cancel-remove").addEventListener("click",(()=>Je(!1)));let qe=null;const ze=Me.querySelector("p");function Je(e){Me.remove(),qe(e)}function We(e,t){return t.find((t=>t.user.username===e))}async function Ve(e){return(await Ce(e)).filter((e=>"member"==e.status))}async function Ze(e){return(await Ce(e)).filter((e=>"pending"==e.status))}async function Xe(e,t){e.preventDefault(),e.target;const n=t.params.id;await Se(n),t.redirect(`/teamDetails/${n}`)}async function Fe(e,t){e.preventDefault();const n=e.target.id,i=t.params.id;await Te(n),t.redirect(`/teamDetails/${i}`)}async function Ke(e,t){e.preventDefault();const n=new FormData(e.target),i=t.params.id,a=n.get("name"),s=n.get("logoUrl"),r=n.get("description"),o={name:a,logoUrl:s,description:r};je(a,s,r,document.querySelector(".error")),async function(e,t){const n=fe();await fetch(`${Ae}/teams/${e}`,{method:"PUT",headers:{"content-type":"application/json","X-Authorization":n},body:JSON.stringify(t)})}(i,o),t.redirect(`/teamDetails/${i}`)}async function Ye(e,t){e.preventDefault();const n=e.target.parentNode.children[0].textContent;var i;i=`Are you sure you want to remove ${n} from the team?`,qe=async function(e){if(e){const e=t.params.id,s=await Ve(e),r=(i=n,a=s,a.find((e=>e.user.username===i)))._id;await Te(r),t.redirect(`/teamDetails/${t.params.id}`)}var i,a},ze.textContent=i,document.body.appendChild(Me)}async function Ge(e){e.preventDefault();const t=e.target.previousElementSibling;T.redirect(`/teams/search?match=${encodeURIComponent(t.value)}`),t.value=""}const Qe=document.querySelector("#back-to-top-btn");window.addEventListener("scroll",(()=>{window.pageYOffset>100?Qe.style.display="inline-flex":Qe.style.display="none"}));const et=(e,t,n,i)=>X`
<section id="browse">

    <article class="pad-med browse-section">
        <h1>Team Browser</h1>

        <div>
            <input id="searchInput" type="text" name="search" placeholder="Search teams...">
            <a href="#" @click="${Ge}" id='searchBtn' class='action searchBtn'>Search</a>
        </div>

    </article>

    ${null!==t?X`<article class="layout narrow">
        <div class="pad-small"><a href="/createView" class="action cta">Create Team</a></div>
    </article>`:""}

    ${e.map((e=>{return X`
<article class="layout">
    <img src="${(t=e).logoUrl}" class="team-logo left-col"
        onerror="this.onerror=null;this.src='../../assets/base-grp.png';">
    <div class="tm-preview">
        <h2>${t.name}</h2>
        <p>${t.description}</p>
        <span class="details">${t.membersCount} Members</span>
        <div><a href="/teamDetails/${t._id}" class="action">See details</a></div>
        <p></p>
    </div>
</article>`;var t}))}

    <ul class="pagination">
        ${n>1?X`<li class="page-item action"><a href="?page=${n-1}" class="page-link">Previous</a></li>`:""}
        ${function(e,t){let n=Math.max(e-1,1),i=n+1,a=n+2,s=[n];return i<=t&&s.push(i),a<=t?s.push(a):a>t&&n-1>0&&s.unshift(n-1),s}(n,i).map((e=>X`
        <li class="page-item action"><a href="?page=${e}" class="page-link">${e}</a></li>`))}

        ${n<i?X`<li class="page-item action"><a href="?page=${n+1}" class="page-link">Next</a></li>`:""}
        
    </ul>
</section>

</section>`;async function tt(e,t,n,i){let a=ve();for(const t of e){let e=await Ve(t._id);t.membersCount=e.length}let s=et(e,a,n,i);t.render(s)}async function nt(e,t){e.preventDefault();const n=new FormData(e.target),i=n.get("email"),a=n.get("password"),s=document.querySelector(".error");let r=await async function(e,t){const n=await fetch(`${ue}/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})}),i=await n.json();if(!n.ok)return i.message;me(i)}(i,a);if(r){let e=document.createElement("p");throw e.textContent=r,e.id="wrong-login",s.replaceChildren(e),new Error}t.redirect("/");let o=document.getElementById("login-message");document.getElementById("logout-message").style.display="none",o.style.display="flex",setTimeout((function(){o.style.display="none"}),2e3)}const it=e=>X`
<section id="register">
    <article class="narrow">
        <header class="pad-med">
            <h1>Register</h1>
        </header>
        <form  @submit="${e}" id="register-form" class="main-form pad-large">
            <div class="error"></div>
            <label >E-mail: <input id = "email" @focus = "${Ue}" @blur="${Ne}" type="text" name="email"></label>
            <label>Username: <input id = "username" @focus = "${Re}" @blur="${Le}" type="text" name="username"></label>
            <label>Password: <input id = "pass" @focus = "${Oe}" type="password" @blur="${He}" name="password"></label>
            <label>Repeat: <input id = "rePass" type="password" @focus = "${Pe}" @blur="${De}" name="repass"></label>
            <input class="action cta" type="submit" value="Create Account">
        </form>
        <footer class="pad-small">Already have an account? <a href="/login" class="invert">Sign in here</a>
        </footer>
    </article>
</section>`;encodeURIComponent("=Storm Troopers");const at=(e,t,n,i,a)=>X`
<a href="#" @click="${t=>async function(e,t){e.preventDefault();const n=t.params.id,i=((e,t,n)=>X`
<section id="edit">
    <article class="narrow">
        <header class="pad-med">
            <h1>Edit Team</h1>
        </header>
        <form @submit="${e=>t(e,n)}" id="edit-form" class="main-form pad-large">
            <div class="error"></div>
            <label>Team name:<input value="${e.name}" type="text" name="name"></label>
            <label>Logo URL:<input value="${e.logoUrl}" type="text" name="logoUrl"></label>
            <label>Description:<textarea name="description">${e.description}</textarea></label>
            <input class="action cta" type="submit" value="Save Changes">
        </form>
    </article>
    
</section>`)(await Ee(n),Ke,t);t.render(i)}(t,e)}" class="action">Edit Team</a>
<div class="pad-large">
    <h3>Members</h3>
    
    
    <ul class="tm-members">
        ${t.map((t=>X`
        <li> <span class='memberName'>${t.user.username}</span>
            ${i!==t.user._id?X`<a href="#" class="tm-control action"
                @click="${t=>Ye(t,e)}">Remove from team</a>`:""} </li>`))}
    </ul>
</div>

<section @click="${ye}" id="remove-message" class="remove">
    <p>You have removed ${a} from the team!</p>
</section>

<div class="pad-large">
    <h3>Membership Requests</h3>
    <ul class="tm-members">

        ${n.map((t=>X`
        <li><span class='candidateName'>${t.user.username}</span>
            <a href="#" @click="${t=>async function(e,t){e.preventDefault();const n=t.params.id,i=await Ze(n),a=We(e.target.parentNode.children[0].textContent,i),s=a._id;a.status="member",Ie(s,a),t.redirect(`/teamDetails/${n}`)}(t,e)}" class="tm-control action">Approve</a>
            <a @click="${t=>async function(e,t){e.preventDefault();const n=t.params.id,i=await Ze(n);Te(We(e.target.parentNode.children[0].textContent,i)._id),t.redirect(`/teamDetails/${n}`)}(t,e)}" href="#" class="tm-control action">Decline</a></li>`))}
    </ul>
</div>
`,st=(e,t,n,i)=>X`
${!0===i?"":X`<a href="#" @click="${t=>n(t,e)}" class="action">Join team</a>`}
<div class="pad-large">
    <h3>Members</h3>
    <ul class="tm-members">
        ${t.map((e=>X`
        <li id="${e._id}"> ${e.user.username} </li>`))}
    </ul>
</div>
`,rt=(e,t,n,i,a,s)=>X`
${s?X`<a id="${a}" @click="${t=>i(t,e)}" href="#" class="action invert">Leave team</a>`:X`<span>Membership pending.</span> <a id="${a}" @click="${t=>i(t,e)}" href="#">Cancel
    request</a>`}

<div class="pad-large">
    <h3>Members</h3>
    <ul class="tm-members">
        ${t.map((e=>X`
        <li id="${e._id}"> ${e.user.username}</li>`))}
    </ul>
</div>
<div class="pad-large">
    <h3>Membership Requests</h3>
    <ul class="tm-members">

        ${n.map((e=>X`
        <li>${e.user.username}</li>`))}
    </ul>
</div>
`;T((function(e,t){!async function(e){let t=((e,t)=>X`
    <a href="/" class="site-logo">Team Manager</a>
    <nav>
        <a href="/teams" class="action">Browse Teams</a>

        ${null===e?X`<a href="/login" class="action">Login</a>
        <a href="/register" class="action">Register</a>`:X`
        <a href="/myTeams/${e}" class="action">My Teams</a>
        <a href="/logout" class="action">Logout</a>`}

    </nav>

    <section @click="${ye}" id="login-message" class="action">
        <p>Welcome, ${t}!</p>
    </section>
    <section @click="${ye}" id="logout-message" class="action">
        <p>You have successfully logged out!</p>
    </section>
    

`)(ge(),ve());de(t,document.querySelector("header"))}(),e.render=e=>de(e,$e),e.redirect=e=>T.redirect(e),t()})),T("/",_e),T("/index.html",_e),T("/teams",(async function(e){let t=new URLSearchParams(e.querystring),n=Number(t.get("page")||1),i=Promise.all([ke(),xe(n)]),[a,s]=await i;tt(s,e,n,Math.ceil(Number(a)/be))})),T("/login",(function(e){let t=((e,t)=>X`
<section id="login">
    <article class="narrow">
        <header class="pad-med">
            <h1>Login</h1>
        </header>
        <form @submit="${n=>e(n,t)}" id="login-form" class="main-form pad-large">
            <div class="error"></div>
            <label>E-mail: <input @focus="${Be}" type="text" name="email"></label>
            <label>Password: <input @focus="${Be}" type="password" name="password"></label>
            <input class="action cta" type="submit" value="Sign In">
        </form>
        <footer class="pad-small">Don't have an account? <a href="/register" class="invert">Sign up here</a>
        </footer>
    </article>
    
</section>`)(nt,e);e.render(t)})),T("/register",(function(e){let t=it((async function(t){t.preventDefault();const n=new FormData(t.target),i=n.get("email"),a=n.get("username"),s=n.get("password"),r=(n.get("repass"),document.querySelector(".error"));!function(e,t,n,i,a){a.replaceChildren();let s=Ne(),r=Le(),o=De();if(!s||!r||!o)throw new Error}(0,0,0,0,r);let o=await async function(e,t,n){const i=await fetch(`${ue}/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e,email:t,password:n})}),a=await i.json();if(!i.ok)return a.message;me(a)}(a,i,s),l=document.createElement("p");if(o)throw l.textContent=o,r.replaceChildren(l),new Error;e.redirect("/")}));e.render(t)})),T("/myTeams/:id",(async function(e){let t=ge(),n=(await async function(e){return console.log(e),(await fetch(`${Ae}/members?where=_ownerId%3D%22${e}%22%20AND%20status%3D%22member%22&load=team%3DteamId%3Ateams`)).json()}(t)).map((e=>e.team));tt(n,e)})),T("/logout",(async function(e){await async function(){const e=fe();let t=await fetch(ue+pe,{method:"GET",headers:{"X-Authorization":e}});if(localStorage.clear(),!t.ok)throw new Error}(),e.redirect("/"),localStorage.clear();let t=document.getElementById("logout-message");document.getElementById("login-message").style.display="none",t.style.display="flex",setTimeout((function(){t.style.display="none"}),2e3)})),T("/createView",(function(e){let t=(n=async function(t){t.preventDefault();const n=new FormData(t.target),i=n.get("name"),a=n.get("logoUrl"),s=n.get("description"),r={name:i,logoUrl:a,description:s};je(i,a,s,document.querySelector(".error")),async function(e,t){let n=await Se(e);const i=(await Ze(e))[0];i.status="member",Ie(n._id,i),t.redirect(`/teamDetails/${e}`)}((await async function(e){let t=fe();return console.log(e),(await fetch(`${Ae}/teams`,{method:"POST",headers:{"content-type":"application/json","X-Authorization":t},body:JSON.stringify(e)})).json()}(r))._id,e)},X`

    <section id="create">
        <article class="narrow">
            <header class="pad-med">
                <h1>New Team</h1>
            </header>
            <form @submit="${n}" id="create-form" class="main-form pad-large">
                <div class="error"></div>
                <label>Team name: <input type="text" name="name"></label>
                <label>Logo URL: <input type="text" name="logoUrl"></label>
                <label>Description: <textarea name="description"></textarea></label>
                <input class="action cta" type="submit" value="Create Team">
            </form>
        </article>
        
    </section>
`);var n;e.render(t)})),T("/teamDetails/:id",(async function(e){let t,n=await Ee(e.params.id),i=n._id,a=n._ownerId,s=ge(),r=await Ve(i),o=await Ze(i),l=a===s,c=r.some((e=>e._ownerId===s&&"member"==e.status&&!1===l)),h=null===s,d=o.some((e=>e._ownerId===s)),u=0==c&&0==h&&0==d&&0==l,p=await localStorage.getItem("removedMember");if(l)t=at(e,r,o,a,p);else if(u)t=st(e,r,Xe);else if(d){const n=o.find((e=>e._ownerId===s))._id;t=rt(e,r,o,Fe,n)}else if(h)t=st(e,r,null,!0);else if(c){let n=!0;const i=r.find((e=>e._ownerId===s))._id;t=rt(e,r,o,Fe,i,n)}let m=((e,t,n)=>X`
<section id="team-home">
    <article class="layout">
        <img src="${e.logoUrl}" class="team-logo left-col" onerror="this.onerror=null;this.src='../../../assets/base-grp.png';">
        <div class="tm-preview">
            <h2>${e.name}</h2>
            <p>${e.description}</p>
            <span class="details">${t.length} Members</span>
            <div>

            </div>
        </div>
        ${n}
    </article>
</section>`)(n,r,t);e.render(m)})),T("/teams/search",(async function(e){console.log(e.querystring);const t=new URLSearchParams(e.querystring).get("match"),n=await async function(e){let t="?where="+encodeURIComponent(`name LIKE "${e}"`),n="http://localhost:3030/data/teams";console.log(n+t);let i=await fetch(n+t);return await i.json()}(t);tt(n,e)})),T.start()})();