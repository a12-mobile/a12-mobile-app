!function (e) { var n = {}; function t(o) { if (n[o]) return n[o].exports; var r = n[o] = { i: o, l: !1, exports: {} }; return e[o].call(r.exports, r, r.exports, t), r.l = !0, r.exports } t.m = e, t.c = n, t.d = function (e, n, o) { t.o(e, n) || Object.defineProperty(e, n, { configurable: !1, enumerable: !0, get: o }) }, t.r = function (e) { Object.defineProperty(e, "__esModule", { value: !0 }) }, t.n = function (e) { var n = e && e.__esModule ? function () { return e.default } : function () { return e }; return t.d(n, "a", n), n }, t.o = function (e, n) { return Object.prototype.hasOwnProperty.call(e, n) }, t.p = "", t(t.s = 1) }([function (e, n, t) { "use strict"; Object.defineProperty(n, "__esModule", { value: !0 }); var o = function () { function e(e, n) { for (var t = 0; t < n.length; t++) { var o = n[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o) } } return function (n, t, o) { return t && e(n.prototype, t), o && e(n, o), n } }(); n.rtData = function () { function e() { arguments.length > 0 && void 0 !== arguments[0] && arguments[0]; if (function (e, n) { if (!(e instanceof n)) throw new TypeError("Cannot call a class as a function") }(this, e), void 0 === new.target) throw new Error("Constructor must be called!"); if (e.isCreated) throw new Error("rtData instance can be created only one!"); e.isCreated = !0 } return o(e, [{ key: "update", value: function (e) { void 0 != this.callback && this.callback(e) } }, { key: "afterSessionCreated", value: function () { void 0 != this.sessionOpen && this.sessionOpen() } }]), e }() }, function (e, n, t) { "use strict"; var o = null, r = new (t(0).rtData); window.rtDataInstance = r, window.webSocket = o, window.initWebSocket = function () { var e = location.host; (o = new WebSocket("ws://localhost:8002/websocket/websocket")).onmessage = function (e) { r.update(e.data) }, o.onopen = function (e) { r.afterSessionCreated() }, o.onclose = function (e) { } } }]);