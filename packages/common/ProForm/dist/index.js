var ze = Object.defineProperty;
var Le = (r, e, t) => e in r ? ze(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var l = (r, e, t) => (Le(r, typeof e != "symbol" ? e + "" : e, t), t);
import { ref as L, readonly as Ce, nextTick as _, isRef as U, watch as E, isReactive as T, watchEffect as D, toRaw as x, reactive as W, createVNode as m, mergeProps as q, withDirectives as He, vShow as De, createTextVNode as Ge, isVNode as Be, defineComponent as Ke } from "vue";
var We = typeof global == "object" && global && global.Object === Object && global, Xe = typeof self == "object" && self && self.Object === Object && self, A = We || Xe || Function("return this")(), R = A.Symbol, we = Object.prototype, Ye = we.hasOwnProperty, Ze = we.toString, N = R ? R.toStringTag : void 0;
function Je(r) {
  var e = Ye.call(r, N), t = r[N];
  try {
    r[N] = void 0;
    var s = !0;
  } catch {
  }
  var i = Ze.call(r);
  return s && (e ? r[N] = t : delete r[N]), i;
}
var Qe = Object.prototype, Ae = Qe.toString;
function ke(r) {
  return Ae.call(r);
}
var et = "[object Null]", tt = "[object Undefined]", Ie = R ? R.toStringTag : void 0;
function je(r) {
  return r == null ? r === void 0 ? tt : et : Ie && Ie in Object(r) ? Je(r) : ke(r);
}
function rt(r) {
  return r != null && typeof r == "object";
}
var st = "[object Symbol]";
function k(r) {
  return typeof r == "symbol" || rt(r) && je(r) == st;
}
function it(r, e) {
  for (var t = -1, s = r == null ? 0 : r.length, i = Array(s); ++t < s; )
    i[t] = e(r[t], t, r);
  return i;
}
var ee = Array.isArray, nt = 1 / 0, Se = R ? R.prototype : void 0, Oe = Se ? Se.toString : void 0;
function Me(r) {
  if (typeof r == "string")
    return r;
  if (ee(r))
    return it(r, Me) + "";
  if (k(r))
    return Oe ? Oe.call(r) : "";
  var e = r + "";
  return e == "0" && 1 / r == -nt ? "-0" : e;
}
function G(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
var ot = "[object AsyncFunction]", at = "[object Function]", lt = "[object GeneratorFunction]", ut = "[object Proxy]";
function ft(r) {
  if (!G(r))
    return !1;
  var e = je(r);
  return e == at || e == lt || e == ot || e == ut;
}
var X = A["__core-js_shared__"], Ee = function() {
  var r = /[^.]+$/.exec(X && X.keys && X.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function ct(r) {
  return !!Ee && Ee in r;
}
var dt = Function.prototype, pt = dt.toString;
function ht(r) {
  if (r != null) {
    try {
      return pt.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
var mt = /[\\^$.*+?()[\]{}|]/g, gt = /^\[object .+?Constructor\]$/, bt = Function.prototype, vt = Object.prototype, yt = bt.toString, _t = vt.hasOwnProperty, Pt = RegExp(
  "^" + yt.call(_t).replace(mt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ct(r) {
  if (!G(r) || ct(r))
    return !1;
  var e = ft(r) ? Pt : gt;
  return e.test(ht(r));
}
function It(r, e) {
  return r == null ? void 0 : r[e];
}
function te(r, e) {
  var t = It(r, e);
  return Ct(t) ? t : void 0;
}
var Fe = function() {
  try {
    var r = te(Object, "defineProperty");
    return r({}, "", {}), r;
  } catch {
  }
}(), St = 9007199254740991, Ot = /^(?:0|[1-9]\d*)$/;
function Et(r, e) {
  var t = typeof r;
  return e = e ?? St, !!e && (t == "number" || t != "symbol" && Ot.test(r)) && r > -1 && r % 1 == 0 && r < e;
}
function Ft(r, e, t) {
  e == "__proto__" && Fe ? Fe(r, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : r[e] = t;
}
function xe(r, e) {
  return r === e || r !== r && e !== e;
}
var wt = Object.prototype, jt = wt.hasOwnProperty;
function Mt(r, e, t) {
  var s = r[e];
  (!(jt.call(r, e) && xe(s, t)) || t === void 0 && !(e in r)) && Ft(r, e, t);
}
var xt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Rt = /^\w*$/;
function $t(r, e) {
  if (ee(r))
    return !1;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || k(r) ? !0 : Rt.test(r) || !xt.test(r) || e != null && r in Object(e);
}
var z = te(Object, "create");
function Vt() {
  this.__data__ = z ? z(null) : {}, this.size = 0;
}
function Nt(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
var qt = "__lodash_hash_undefined__", Ut = Object.prototype, Tt = Ut.hasOwnProperty;
function zt(r) {
  var e = this.__data__;
  if (z) {
    var t = e[r];
    return t === qt ? void 0 : t;
  }
  return Tt.call(e, r) ? e[r] : void 0;
}
var Lt = Object.prototype, Ht = Lt.hasOwnProperty;
function Dt(r) {
  var e = this.__data__;
  return z ? e[r] !== void 0 : Ht.call(e, r);
}
var Gt = "__lodash_hash_undefined__";
function Bt(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = z && e === void 0 ? Gt : e, this;
}
function F(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var s = r[e];
    this.set(s[0], s[1]);
  }
}
F.prototype.clear = Vt;
F.prototype.delete = Nt;
F.prototype.get = zt;
F.prototype.has = Dt;
F.prototype.set = Bt;
function Kt() {
  this.__data__ = [], this.size = 0;
}
function B(r, e) {
  for (var t = r.length; t--; )
    if (xe(r[t][0], e))
      return t;
  return -1;
}
var Wt = Array.prototype, Xt = Wt.splice;
function Yt(r) {
  var e = this.__data__, t = B(e, r);
  if (t < 0)
    return !1;
  var s = e.length - 1;
  return t == s ? e.pop() : Xt.call(e, t, 1), --this.size, !0;
}
function Zt(r) {
  var e = this.__data__, t = B(e, r);
  return t < 0 ? void 0 : e[t][1];
}
function Jt(r) {
  return B(this.__data__, r) > -1;
}
function Qt(r, e) {
  var t = this.__data__, s = B(t, r);
  return s < 0 ? (++this.size, t.push([r, e])) : t[s][1] = e, this;
}
function $(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var s = r[e];
    this.set(s[0], s[1]);
  }
}
$.prototype.clear = Kt;
$.prototype.delete = Yt;
$.prototype.get = Zt;
$.prototype.has = Jt;
$.prototype.set = Qt;
var At = te(A, "Map");
function kt() {
  this.size = 0, this.__data__ = {
    hash: new F(),
    map: new (At || $)(),
    string: new F()
  };
}
function er(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
function K(r, e) {
  var t = r.__data__;
  return er(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function tr(r) {
  var e = K(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
function rr(r) {
  return K(this, r).get(r);
}
function sr(r) {
  return K(this, r).has(r);
}
function ir(r, e) {
  var t = K(this, r), s = t.size;
  return t.set(r, e), this.size += t.size == s ? 0 : 1, this;
}
function w(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var s = r[e];
    this.set(s[0], s[1]);
  }
}
w.prototype.clear = kt;
w.prototype.delete = tr;
w.prototype.get = rr;
w.prototype.has = sr;
w.prototype.set = ir;
var nr = "Expected a function";
function re(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(nr);
  var t = function() {
    var s = arguments, i = e ? e.apply(this, s) : s[0], n = t.cache;
    if (n.has(i))
      return n.get(i);
    var a = r.apply(this, s);
    return t.cache = n.set(i, a) || n, a;
  };
  return t.cache = new (re.Cache || w)(), t;
}
re.Cache = w;
var or = 500;
function ar(r) {
  var e = re(r, function(s) {
    return t.size === or && t.clear(), s;
  }), t = e.cache;
  return e;
}
var lr = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ur = /\\(\\)?/g, fr = ar(function(r) {
  var e = [];
  return r.charCodeAt(0) === 46 && e.push(""), r.replace(lr, function(t, s, i, n) {
    e.push(i ? n.replace(ur, "$1") : s || t);
  }), e;
});
function cr(r) {
  return r == null ? "" : Me(r);
}
function Re(r, e) {
  return ee(r) ? r : $t(r, e) ? [r] : fr(cr(r));
}
var dr = 1 / 0;
function $e(r) {
  if (typeof r == "string" || k(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -dr ? "-0" : e;
}
function pr(r, e) {
  e = Re(e, r);
  for (var t = 0, s = e.length; r != null && t < s; )
    r = r[$e(e[t++])];
  return t && t == s ? r : void 0;
}
function H(r, e, t) {
  var s = r == null ? void 0 : pr(r, e);
  return s === void 0 ? t : s;
}
function hr(r, e, t, s) {
  if (!G(r))
    return r;
  e = Re(e, r);
  for (var i = -1, n = e.length, a = n - 1, u = r; u != null && ++i < n; ) {
    var f = $e(e[i]), d = t;
    if (f === "__proto__" || f === "constructor" || f === "prototype")
      return r;
    if (i != a) {
      var p = u[f];
      d = s ? s(p, f, u) : void 0, d === void 0 && (d = G(p) ? p : Et(e[i + 1]) ? [] : {});
    }
    Mt(u, f, d), u = u[f];
  }
  return r;
}
function P(r, e, t) {
  return r == null ? r : hr(r, e, t);
}
class o {
  static typeChecker(e) {
    return {}.toString.call(e);
  }
  static isString(e) {
    return typeof e == "string";
  }
  static isArray(e) {
    return this.typeChecker(e) === "[object Array]";
  }
  static isFunction(e) {
    return this.typeChecker(e) === "[object Function]";
  }
  static isPromise(e) {
    return e instanceof Promise;
  }
  static isObject(e) {
    return this.typeChecker(e) === "[object Object]";
  }
  static isAsyncFunction(e) {
    return this.typeChecker(e) === "[object AsyncFunction]";
  }
  static isUndefined(e) {
    return e === void 0;
  }
  static isArrayEmpty(e) {
    return (e == null ? void 0 : e.length) < 1;
  }
  static isObjectEmpty(e) {
    return this.isArrayEmpty(Object.keys(e));
  }
  static isListSchema(e) {
    return e.type === "list";
  }
  static isGroupSchema(e) {
    return e.type === "group";
  }
  static isItemSchema(e) {
    return this.isUndefined(e.type) || e.type === "item";
  }
  static isProcessInprogress(e) {
    if (e === void 0)
      return !0;
    if (this.isObject(e)) {
      if (e.setup || this.isFunction(e.setup) || e.props)
        return !1;
      if (this.isObjectEmpty(e))
        return !0;
      for (const t in e) {
        if (t === "componentProps")
          return !1;
        if (e.hasOwnProperty(t) && this.isProcessInprogress(e[t]))
          return !0;
      }
    } else if (this.isArray(e)) {
      if (this.isArrayEmpty(e))
        return !0;
      for (const t of e)
        return this.isProcessInprogress(t);
    }
    return !1;
  }
  static isNativeObject(e) {
    return !!e.__proform_raw_object;
  }
}
function b(r, ...e) {
  return e.forEach((t) => {
    if (Array.isArray(t))
      Array.isArray(r) || (r = []), t.forEach((s, i) => {
        typeof s == "object" && s !== null ? r[i] = b(Array.isArray(s) ? [] : {}, s) : r[i] = s;
      });
    else
      for (const s in t)
        t.hasOwnProperty(s) && (typeof t[s] == "object" && t[s] !== null ? r[s] = b(r[s] || {}, t[s]) : r[s] = t[s]);
  }), r;
}
function C(r) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(s) {
    if (s === null || typeof s != "object")
      return s;
    if (s instanceof Date)
      return new Date(s);
    if (s instanceof RegExp)
      return new RegExp(s);
    if (s instanceof Map) {
      const n = /* @__PURE__ */ new Map();
      for (const [a, u] of s)
        n.set(t(a), t(u));
      return n;
    }
    if (s instanceof Set) {
      const n = /* @__PURE__ */ new Set();
      for (const a of s)
        n.add(t(a));
      return n;
    }
    if (e.has(s))
      return e.get(s);
    if (Array.isArray(s)) {
      const n = [];
      e.set(s, n);
      for (let a = 0; a < s.length; a++)
        n[a] = t(s[a]);
      return n;
    }
    const i = Object.create(Object.getPrototypeOf(s));
    e.set(s, i);
    for (const n in s)
      s.hasOwnProperty(n) && (i[n] = t(s[n]));
    return i;
  }
  return t(r);
}
function Z(r, e) {
  return r.replace(/undefined/g, e);
}
class mr {
  constructor(e) {
    l(this, "runtimeCore");
    l(this, "readonlyReactiveModel", L({}));
    l(this, "shareHistory", /* @__PURE__ */ new Map());
    this.formCustomization = e;
  }
  // happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
  cleanFallbackFields(e) {
    return e !== null && typeof e == "object" && (delete e.__yiwwhl_async_field_fallback, Object.values(e).forEach((t) => {
      this.cleanFallbackFields(t);
    })), e;
  }
  setup(e) {
    return this.runtimeCore = e, this.readonlyReactiveModel.value = Ce(e.model.value), Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var s;
    const e = (s = c.getPreset(this.runtimeCore.ui)) == null ? void 0 : s.adapter, t = I.adapters[c.getUI(this.runtimeCore.ui)];
    return (e == null ? void 0 : e.validateForm(this)) ?? (t == null ? void 0 : t.validateForm(this));
  }
  hydrate(e) {
    _(() => {
      this.runtimeCore.hydrateEffect.trackEffect(
        () => {
          U(e) ? E(
            () => e.value,
            () => {
              b(this.runtimeCore.model.value, e.value);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : T(e) ? E(
            () => e,
            () => {
              b(this.runtimeCore.model.value, e);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : b(this.runtimeCore.model.value, e);
        },
        {
          lazy: !1
        }
      );
    });
  }
  share(e) {
    _(() => {
      Object.keys(e).forEach((t) => {
        U(e[t]) ? D(() => {
          P(this.runtimeCore.shared, t, e[t].value), this.shareHistory.get(t) !== e[t].value && (this.shareHistory.set(t, e[t].value), this.runtimeCore.processor.schemaEffect.triggerEffects());
        }) : T(e[t]) ? D(() => {
          P(this.runtimeCore.shared, t, e[t]), this.shareHistory.get(t) !== e[t] && (this.shareHistory.set(t, e[t]), this.runtimeCore.processor.schemaEffect.triggerEffects());
        }) : (P(this.runtimeCore.shared, t, e[t]), this.shareHistory.get(t) !== e[t] && (this.shareHistory.set(t, e[t]), this.runtimeCore.processor.schemaEffect.triggerEffects()));
      });
    });
  }
  subscribeModel(e) {
    _(() => {
      const t = E(
        () => this.readonlyReactiveModel.value,
        (s) => {
          e(s, {
            stopSubscribe() {
              _(() => {
                t();
              });
            }
          });
        },
        {
          immediate: !0,
          deep: !0
        }
      );
    });
  }
  resetModel() {
    var e;
    (e = this.runtimeCore) != null && e.model.value && (this.runtimeCore.model.value = C(
      this.runtimeCore.processor.stableModel
    ), this.readonlyReactiveModel.value = Ce(this.runtimeCore.model.value), this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore));
  }
}
class J {
  constructor() {
    l(this, "effects", /* @__PURE__ */ new Set());
    l(this, "tempClonedEffects", /* @__PURE__ */ new Set());
    l(this, "identifierMap", /* @__PURE__ */ new Map());
    l(this, "timer");
  }
  clearEffects() {
    this.effects.clear();
  }
  triggerEffects() {
    Array.from(this.effects).forEach((e) => e());
  }
  trackEffect(e, t = {
    lazy: !0
  }) {
    return !t.lazy && e(), t.identifier ? this.identifierMap.get(t.identifier) || (this.effects.add(e), this.identifierMap.set(t.identifier, !0)) : this.effects.add(e), () => this.effects.delete(e);
  }
}
class gr {
  constructor(e) {
    l(this, "runtimeCore");
    l(this, "processedSchemas");
    l(this, "processedModel");
    l(this, "getRuntimeMeta");
    l(this, "stableSchemas", []);
    l(this, "stableModel", {});
    l(this, "schemaPreset", I.schemaPreset);
    l(this, "componentPropsPreset", I.componentPropsPreset);
    l(this, "stableUpdaterProcessProgress");
    l(this, "stableUpdaterTimes", 0);
    l(this, "schemaEffect", new J());
    l(this, "defaultValueEffect", new J());
    l(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    l(this, "baseDefaultValueFunctionsLength");
    l(this, "isModelInitialized", !0);
    this.runtimeCore = e, this.processedSchemas = e.schemas, this.processedModel = e.model, this.getRuntimeMeta = e.getRuntimeMeta.bind(e), E(
      () => this.processedModel.value,
      () => {
        this.schemaEffect.triggerEffects();
      },
      {
        deep: !0
      }
    );
  }
  // 核心处理过程，接收一个初始的代理数据结构,由其衍生的有 parseSchema
  parse(e, t) {
    e.forEach((s, i) => {
      this.parseItem(s, i, t);
    });
  }
  // 初始化空数据结构，避免后续复杂的 if else
  initSchemas(e) {
    return e.map((t) => {
      const s = {};
      return t.children && (s.children = this.initSchemas(t.children)), s;
    });
  }
  countFunctionDefaultValues(e) {
    let t = 0;
    const s = /* @__PURE__ */ new Set();
    function i(n) {
      if (!s.has(n) && (Array.isArray(n) || n !== null && typeof n == "object")) {
        s.add(n);
        for (const a in n)
          n.hasOwnProperty(a) && (a === "defaultValue" && typeof n[a] == "function" && !n[a].toString().includes("[native code]") && t++, i(n[a]));
      }
    }
    return i(e), t;
  }
  // 派生过程，用于外部应用
  parseSchemas(e, t) {
    o.isArrayEmpty(this.processedSchemas.value) && (this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
      C(e)
    ), this.processedSchemas.value = this.initSchemas(e)), this.parse(e, t);
  }
  parseStable(e) {
    const t = {};
    if (!o.isUndefined(e.stable))
      t[e.key] = this.parseStable(e.stable);
    else
      return e;
    return t;
  }
  // 对于稳定初始化更新的抽象
  stableUpdater(e = []) {
    if (e.every(Boolean)) {
      const t = x(this.processedSchemas.value);
      !o.isProcessInprogress(t) && o.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: t.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(t));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, t, s) {
    const i = this, n = Array.from({
      length: Object.keys(e).filter((u) => u !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: a, parentMeta: s });
    function a(u) {
      const f = u.index, d = u.key, p = u.keyIndex;
      if (o.isUndefined(u.stable))
        return;
      const h = i.parseStable(u.stable), v = s == null ? void 0 : s.index, S = s == null ? void 0 : s.key;
      let y = h;
      if (o.isProcessInprogress(y) || (n[p] = !0), s) {
        const g = i.processedSchemas.value[v][S][f][d];
        g && o.isObject(g) && d !== "component" && (y = b(g, y)), i.processedSchemas.value[v][S][f][d] = y, i.stableUpdater(n);
      } else {
        const g = i.processedSchemas.value[f][d];
        g && o.isObject(g) && d !== "component" && (y = b(g, y)), i.processedSchemas.value[f][d] = y, i.stableUpdater(n);
      }
    }
  }
  // 只做基本的对象 parser
  objectParser(e) {
    const t = e.data;
    Object.keys(t).forEach((i, n) => {
      var a, u;
      if (i === "children")
        this.parseSchemas(t[i], {
          ...e,
          key: i,
          keyIndex: n
        });
      else {
        const f = (d) => {
          e.updater({
            ...e,
            key: i,
            keyIndex: n,
            stable: d
          });
        };
        o.isFunction(t[i]) ? i !== "defaultValue" ? this.schemaEffect.trackEffect(
          () => {
            if (i === "component") {
              const d = t[i](this.getRuntimeMeta());
              this.promiseFieldParser(d, f, !1, {
                rootIndex: e.index,
                parentMeta: e.parentMeta
              });
            } else
              this.fieldParser(t[i], f, {
                rootIndex: e.index,
                parentMeta: e.parentMeta
              });
          },
          {
            lazy: !1,
            identifier: `${(a = e.parentMeta) == null ? void 0 : a.key}${(u = e.parentMeta) == null ? void 0 : u.index}${e.index}${i}${n}`
          }
        ) : this.defaultValueEffect.trackEffect(
          () => {
            const d = this.schemaEffect.trackEffect(
              () => {
                /\{\s*model\s*\}/.test(t[i].toString()) ? this.fieldParser(
                  t[i],
                  (p) => {
                    if (!p)
                      return f(p);
                    this.defaultValueInprogressMap.set(t[i], p), !o.isProcessInprogress(p) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                      this.defaultValueInprogressMap.values()
                    ).every((h) => {
                      var v;
                      return !((v = h == null ? void 0 : h.includes) != null && v.call(h, "undefined"));
                    }) ? (f(p), this.defaultValueEffect.clearEffects(), _(() => {
                      d();
                    })) : f(p);
                  },
                  {
                    rootIndex: e.index,
                    parentMeta: e.parentMeta
                  }
                ) : this.fieldParser(
                  t[i],
                  (p) => {
                    this.defaultValueInprogressMap.set(t[i], p), !o.isProcessInprogress(p) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                      this.defaultValueInprogressMap.values()
                    ).every((h) => {
                      var v;
                      return !((v = h == null ? void 0 : h.includes) != null && v.call(h, "undefined"));
                    }) ? (f(p), this.defaultValueEffect.clearEffects(), _(() => {
                      d();
                    })) : f(p);
                  },
                  {
                    rootIndex: e.index,
                    parentMeta: e.parentMeta
                  }
                );
              },
              {
                lazy: !1
              }
            );
          },
          {
            lazy: !1
          }
        ) : i === "component" || i === "slots" || i === "runtime" ? this.promiseFieldParser(t[i], f, !1, {
          rootIndex: e.index,
          parentMeta: e.parentMeta
        }) : this.fieldParser(t[i], f, {
          rootIndex: e.index,
          parentMeta: e.parentMeta
        });
      }
    });
  }
  promiseFieldParser(e, t, s, i) {
    o.isPromise(e) ? e.then((n) => {
      o.isString(n) && (n = Z(n, "")), s && o.isObject(n) && !o.isNativeObject(n) ? this.objectParser({
        data: n,
        updater: t,
        index: i.rootIndex,
        parentMeta: i.parentMeta
      }) : t(n);
    }) : (o.isString(e) && (e = Z(e, "")), s && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
      data: e,
      updater: t,
      index: i.rootIndex,
      parentMeta: i.parentMeta
    }) : t(e));
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(e, t, s, i = !0) {
    if (o.isFunction(e))
      if (e.name.startsWith("__proform_raw_"))
        t(
          (...n) => e({
            rawArgs: n,
            ...this.getRuntimeMeta()
          })
        );
      else if (e.name.startsWith("__proform_structured_path_parsing_mark_"))
        t(e);
      else if (e.__proform_cached_result) {
        const n = e.__proform_cached_result;
        this.promiseFieldParser(n, t, i, s);
      } else {
        const n = e(this.getRuntimeMeta());
        e.name.startsWith("__proform_onetime_") && (e.__proform_cached_result = n), this.promiseFieldParser(n, t, i, s);
      }
    else
      U(e) ? E(
        () => e.value,
        () => {
          o.isUndefined(e.value) || (i && o.isObject(e.value) && !o.isNativeObject(e.value) ? this.objectParser({
            data: e.value,
            updater: t,
            index: s.rootIndex,
            parentMeta: s.parentMeta
          }) : t(e.value));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : T(e) ? E(
        () => e,
        () => {
          o.isUndefined(e) || (i && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
            data: e,
            updater: t,
            index: s.rootIndex,
            parentMeta: s.parentMeta
          }) : t(e));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : i && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
        data: e,
        updater: t,
        index: s.rootIndex,
        parentMeta: s.parentMeta
      }) : t(e);
  }
  modelProcessor(e) {
    e.map(
      (t) => this.createModel(t, this.processedModel.value)
    ), o.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && _(() => {
      this.stableModel = C(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects();
    });
  }
  setModel(e, t, s) {
    o.isFunction(t) ? P(e, t(), s) : b(e, {
      [t]: s
    });
  }
  createModel(e, t) {
    o.isListSchema(e) && (t[e.field] || this.setModel(t, e.field, [{}]), e.children.forEach((s) => {
      this.createModel(s, t[e.field][0]);
    })), o.isGroupSchema(e) && e.children.forEach((s) => {
      this.createModel(s, t);
    }), o.isItemSchema(e) && _(() => {
      if ("defaultValue" in e)
        this.setModel(t, e.field, e.defaultValue);
      else {
        if (o.isFunction(e.field) && H(t, e.field()))
          return;
        if (o.isString(e.field) && t[e.field])
          return;
        this.setModel(t, e.field, void 0);
      }
    });
  }
}
class j {
  static getFormContainer({ ui: e } = {}) {
    return c.presets.uiPresets[e ?? c.presets.ui].container.Form;
  }
  static getFormItemContainer({ ui: e } = {}) {
    return c.presets.uiPresets[e ?? c.presets.ui].container.FormItem;
  }
  static getItemContainer({ ui: e } = {}) {
    return c.presets.uiPresets[e ?? c.presets.ui].container.Item;
  }
  static getGroupContainer({ ui: e } = {}) {
    return c.presets.uiPresets[e ?? c.presets.ui].container.Group;
  }
  static getListContainer({ ui: e } = {}) {
    return c.presets.uiPresets[e ?? c.presets.ui].container.List;
  }
  static getListItemContainer({ ui: e } = {}) {
    return c.presets.uiPresets[e ?? c.presets.ui].container.ListItem;
  }
}
class br {
  constructor(e) {
    this.ui = e;
  }
  getRuntimeNative() {
    var t;
    return (t = c.presets.uiPresets[this.ui]) == null ? void 0 : t.native;
  }
  getRuntimeField(e) {
    var i;
    const t = (i = c.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = I.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeField(e)) ?? (s == null ? void 0 : s.getRuntimeField(e));
  }
  getRuntimeRequired(e) {
    var i;
    const t = (i = c.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = I.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeRequired(e)) ?? (s == null ? void 0 : s.getRuntimeRequired(e));
  }
  getFormModelPropName() {
    var s;
    const e = (s = c.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, t = I.adapters[c.getUI(this.ui)];
    return (e == null ? void 0 : e.getFormModelPropName()) ?? (t == null ? void 0 : t.getFormModelPropName());
  }
  formComponentRenderer(e) {
    var i;
    const t = (i = c.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = I.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.formComponentRenderer(e)) ?? (s == null ? void 0 : s.formComponentRenderer(e));
  }
  clearValidate(e) {
    var i;
    const t = (i = c.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = I.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.clearValidate(e)) ?? (s == null ? void 0 : s.clearValidate(e));
  }
}
function vr(r) {
  return typeof r == "function" || Object.prototype.toString.call(r) === "[object Object]" && !Be(r);
}
class yr {
  constructor(e) {
    l(this, "schemas", L([]));
    l(this, "model", L({}));
    l(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    l(this, "formRef", L(null));
    l(this, "hydrateEffect", new J());
    l(this, "native", W({}));
    l(this, "grid", {});
    l(this, "runtime", {});
    l(this, "globalNativeFormOverride", W({
      props: {
        Form: {},
        FormItem: {}
      },
      slots: {
        Form: {},
        FormItem: {}
      }
    }));
    l(this, "shared", W({}));
    l(this, "shareHistory", /* @__PURE__ */ new Map());
    this.setup = e, this.processor = new gr(this);
    const t = this.setup(this);
    if (this.ui = t.ui ?? c.presets.ui, this.runtimeAdapter = new br(this.ui), Object.assign(this.globalNativeFormOverride, this.runtimeAdapter.getRuntimeNative()), U(t.schemas))
      E(
        // @ts-expect-error
        () => t.schemas.value,
        () => {
          this.processor.parseSchemas(t.schemas.value);
        },
        {
          deep: !0
        }
      );
    else if (T(t.schemas)) {
      const s = E(() => t.schemas, () => {
        this.processor.parseSchemas(t.schemas), _(() => {
          s();
        });
      }, {
        deep: !0
      });
    } else
      this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    return {
      model: x(C(this.model.value)),
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (t) => {
        _(() => {
          Object.keys(t).forEach((s) => {
            U(t[s]) ? D(() => {
              P(this.shared, s, t[s].value), this.shareHistory.get(s) !== t[s].value && (this.shareHistory.set(s, t[s].value), this.processor.schemaEffect.triggerEffects());
            }) : T(t[s]) ? D(() => {
              P(this.shared, s, t[s]), this.shareHistory.get(s) !== t[s] && (this.shareHistory.set(s, t[s]), this.processor.schemaEffect.triggerEffects());
            }) : (P(this.shared, s, t[s]), this.shareHistory.get(s) !== t[s] && (this.shareHistory.set(s, t[s]), this.processor.schemaEffect.triggerEffects()));
          });
        });
      }
    };
  }
  runtimeItemProcessor(e, t, s = this.model.value, i) {
    var ie, ne, oe, ae, le, ue, fe, ce, de, pe, he, me, ge, be, ve, ye, _e;
    const n = x(e.component);
    if (!n)
      return;
    (ne = (ie = e.native) == null ? void 0 : ie.props) != null && ne.Form && b(this.globalNativeFormOverride.props.Form, (ae = (oe = e.native) == null ? void 0 : oe.props) == null ? void 0 : ae.Form), (ue = (le = e.native) == null ? void 0 : le.slots) != null && ue.Form && b(this.globalNativeFormOverride.slots.Form, (ce = (fe = e.native) == null ? void 0 : fe.slots) == null ? void 0 : ce.Form);
    const a = b(C((pe = (de = this.native) == null ? void 0 : de.slots) == null ? void 0 : pe.FormItem) ?? {}, (me = (he = e.native) == null ? void 0 : he.slots) == null ? void 0 : me.FormItem), u = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, f = b(C((be = (ge = this.native) == null ? void 0 : ge.props) == null ? void 0 : be.FormItem) ?? {}, (ye = (ve = e.native) == null ? void 0 : ve.props) == null ? void 0 : ye.FormItem), d = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: i,
      index: t
    }), p = n.name, h = e.componentProps ?? {}, v = I.placeholderPresetByComponentName;
    let S = e.placeholder, y = e.show;
    y === void 0 && (y = !0);
    let g = e.label ?? "", O;
    if (e.runtime ? O = e.runtime : O = (i == null ? void 0 : i.runtime) ?? this.runtime, !o.isUndefined(t) && !o.isObjectEmpty(O) && (g = Z((_e = O == null ? void 0 : O.customizeListItemLabel) == null ? void 0 : _e.call(O, e.label ?? "", t + 1), "")), !S) {
      let V = "请输入";
      o.isUndefined(p) ? S = `${V}${g}` : /* @ts-expect-error */ v[p.toLowerCase()] ? (V = // @ts-expect-error
      v[p.toLowerCase()], S = `${V}${g}`) : (Object.keys(v).forEach((Pe) => {
        p.toLowerCase().includes(Pe.toLowerCase()) && (V = v[Pe]);
      }), S = `${V}${g}`);
    }
    const Ve = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: g
    }), Ne = j.getItemContainer(this), qe = j.getFormItemContainer(this), Ue = this, Te = e.componentSlots;
    return m("div", {
      style: u
    }, [m(Ne, {
      show: y
    }, {
      default() {
        return y && m(qe, q(f, {
          label: `${g ? `${g}:` : ""}`
        }, d, Ve), {
          default() {
            return Ue.runtimeAdapter.formComponentRenderer({
              Component: n,
              schema: e,
              baseModel: s,
              placeholder: S,
              componentSlots: Te,
              props: h
            });
          },
          ...a
        });
      }
    })]);
  }
  runtimeGroupProcessor(e) {
    let t;
    const s = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, i = j.getGroupContainer(this);
    let n = e.show;
    return n === void 0 && (n = !0), m("div", {
      style: s
    }, [n && m(i, {
      schema: e
    }, vr(t = e.children.map((a) => this.runtimeItemProcessor(a))) ? t : {
      default: () => [t]
    })]);
  }
  addListItem(e) {
    var t;
    console.log("this", this.processor.stableModel, e.field), (t = this.processor.stableModel[e.field]) != null && t[0] && this.model.value[e.field].push(C(this.processor.stableModel[e.field][0])), this.runtimeAdapter.clearValidate(this);
  }
  deleteListItem(e, t) {
    this.model.value[e.field].splice(t, 1), this.runtimeAdapter.clearValidate(this);
  }
  runtimeListProcessor(e) {
    const t = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, s = this;
    s.model.value[e.field] || (s.model.value[e.field] = [{}]);
    let i = e.show;
    i === void 0 && (i = !0);
    const n = j.getListContainer(this), a = j.getListItemContainer(this);
    return m("div", {
      style: t
    }, [i && m(n, {
      schema: e
    }, {
      default() {
        return s.model.value[e.field].map((u, f) => m(a, null, {
          default() {
            return e.children.map((d) => s.runtimeItemProcessor(d, f, u, e));
          },
          delete({
            container: d
          } = {}) {
            var h;
            const p = d ?? m("button", null, null);
            return He(m(p, {
              onClick: () => s.deleteListItem(e, f)
            }, null), [[De, ((h = s.model.value[e.field]) == null ? void 0 : h.length) > 1]]);
          }
        }));
      },
      add({
        container: u
      } = {}) {
        const f = u ?? m("button", null, [Ge("添加")]);
        return m(f, {
          onClick: () => s.addListItem(e)
        }, null);
      }
    })]);
  }
  runtimeProcessor(e) {
    return e.map((t) => (t.type || (t.type = "item"), this.processorBySchemaType[t.type](t)));
  }
  exec() {
    var u, f, d, p;
    const e = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.grid
    }, t = this, s = b(this.globalNativeFormOverride.props.Form, C((f = (u = this.native) == null ? void 0 : u.props) == null ? void 0 : f.Form) ?? {}), i = b(this.globalNativeFormOverride.slots.Form, C((p = (d = this.native) == null ? void 0 : d.slots) == null ? void 0 : p.Form) ?? {}), n = j.getFormContainer(this), a = this.runtimeAdapter.getFormModelPropName();
    return m(n, q(s, {
      ref: this.formRef
    }, {
      [a]: this.model.value
    }), {
      default() {
        return m("div", {
          style: e
        }, [t.runtimeProcessor(t.schemas.value)]);
      },
      ...i
    });
  }
}
class c {
  static getPreset(e) {
    var t, s, i;
    return (s = (t = this.presets.uiPresets) == null ? void 0 : t[e]) != null && s.extend ? this.presets.uiPresets[(i = this.presets.uiPresets[e]) == null ? void 0 : i.extend] : this.presets.uiPresets[e];
  }
  static getUI(e) {
    var t, s, i;
    return (s = (t = this.presets.uiPresets) == null ? void 0 : t[e]) != null && s.extend ? (i = this.presets.uiPresets[e]) == null ? void 0 : i.extend : e;
  }
}
l(c, "presets");
function Y({
  parentSchema: r,
  schema: e,
  index: t
}) {
  return r ? `${r.field}.${t}.${e.field}` : e.field;
}
const _r = {
  ArcoVue: {
    getRuntimeField(r) {
      const e = Y(r);
      return o.isFunction(e) ? {
        field: e()
      } : {
        field: e
      };
    },
    getRuntimeRequired(r) {
      var e;
      if (r.required)
        if (!r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: `${r.label}是必填项`
          });
        else {
          const t = r.rules.findIndex((s) => !o.isUndefined(s.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = `${r.label}是必填项`) : r.rules.unshift({
            required: !0,
            message: `${r.label}是必填项`
          });
        }
      else
        r.rules && ((e = r.rules) == null ? void 0 : e.findIndex((s) => !!s.required)) === -1 && r.rules.unshift({
          required: !0,
          message: `${r.label}是必填项`
        });
      return {
        rules: r.rules
      };
    },
    getFormModelPropName() {
      return "model";
    },
    formComponentRenderer({
      Component: r,
      baseModel: e,
      schema: t,
      placeholder: s,
      componentSlots: i,
      props: n
    }) {
      let a;
      return o.isFunction(t.field) ? a = H(e, t.field()) : a = e[t.field], m(r, q({
        modelValue: a,
        "onUpdate:modelValue": (u) => {
          o.isFunction(t.field) ? P(e, t.field(), u) : e[t.field] = u;
        },
        placeholder: s
      }, n), {
        ...i
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((s) => s ? t(s) : e(r.cleanFallbackFields(x(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      var e, t;
      (t = (e = r.formRef.value) == null ? void 0 : e.clearValidate) == null || t.call(e);
    }
  },
  NutUI: {
    getRuntimeField(r) {
      const e = Y(r);
      return o.isFunction(e) ? {
        prop: e()
      } : {
        prop: e
      };
    },
    getRuntimeRequired(r) {
      var e;
      if (r.required)
        if (!r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: `${r.label}是必填项`
          });
        else {
          const t = r.rules.findIndex((s) => !o.isUndefined(s.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = `${r.label}是必填项`) : r.rules.unshift({
            required: !0,
            message: `${r.label}是必填项`
          });
        }
      else if (r.rules) {
        const t = (e = r.rules) == null ? void 0 : e.findIndex((s) => !!s.required);
        t !== -1 ? r.rules[t].required = !1 : r.rules.unshift({
          required: !0,
          message: `${r.label}是必填项`
        });
      }
      return {
        rules: r.rules,
        required: r.required
      };
    },
    getFormModelPropName() {
      return "modelValue";
    },
    formComponentRenderer({
      Component: r,
      baseModel: e,
      schema: t,
      placeholder: s,
      componentSlots: i,
      props: n
    }) {
      let a;
      return o.isFunction(t.field) ? a = H(e, t.field()) : a = e[t.field], m(r, q({
        modelValue: a,
        "onUpdate:modelValue": (u) => {
          o.isFunction(t.field) ? P(e, t.field(), u) : e[t.field] = u;
        },
        placeholder: s
      }, n), {
        ...i
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate().then(({
          valid: s,
          errors: i
        }) => {
          s ? e(r.cleanFallbackFields(x(r.runtimeCore.processor.processedModel.value))) : t(i);
        });
      });
    },
    clearValidate(r) {
      var e, t;
      (t = (e = r.formRef.value) == null ? void 0 : e.reset) == null || t.call(e);
    }
  },
  NaiveUI: {
    getRuntimeField(r) {
      const e = Y(r);
      return o.isFunction(e) ? {
        path: e()
      } : {
        path: e
      };
    },
    getRuntimeRequired(r) {
      var e;
      if (r.required)
        if (!r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: `${r.label}是必填项`,
            trigger: ["input", "blur"]
          });
        else {
          const t = r.rules.findIndex((s) => !o.isUndefined(s.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = `${r.label}是必填项`) : r.rules.unshift({
            required: !0,
            message: `${r.label}是必填项`,
            trigger: ["input", "blur"]
          });
        }
      else if (r.rules) {
        const t = (e = r.rules) == null ? void 0 : e.findIndex((s) => !!s.required);
        t !== -1 ? r.rules[t].required = !1 : r.rules.unshift({
          required: !0,
          message: `${r.label}是必填项`,
          trigger: ["input", "blur"]
        });
      }
      return {
        rule: r.rules
      };
    },
    getFormModelPropName() {
      return "model";
    },
    formComponentRenderer({
      Component: r,
      baseModel: e,
      schema: t,
      placeholder: s,
      componentSlots: i,
      props: n
    }) {
      let a;
      return o.isFunction(t.field) ? a = H(e, t.field()) : a = e[t.field], m(r, q({
        value: a,
        "onUpdate:value": (u) => {
          o.isFunction(t.field) ? P(e, t.field(), u) : e[t.field] = u;
        },
        placeholder: s
      }, n), {
        ...i
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((s) => s ? t(s) : e(r.cleanFallbackFields(x(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      var e, t;
      (t = (e = r.formRef.value) == null ? void 0 : e.restoreValidation) == null || t.call(e);
    }
  }
}, M = class M {
  static getPlaceholderPrefixPresetByComponentName() {
    const e = {
      请选择: ["select", "tree"],
      请输入: ["input"]
    }, t = {};
    for (const s in e)
      e[s].forEach((i) => {
        t[i] = s;
      });
    return t;
  }
};
l(M, "schemaPreset", {
  type: {
    defaultValue: "item"
  },
  component: {
    defaultValue: void 0
  },
  componentProps: {
    defaultValue: void 0
  },
  componentSlots: {
    defaultValue: void 0
  },
  defaultValue: {
    defaultValue: void 0
  },
  label: {
    defaultValue: ""
  },
  field: {
    defaultValue: "__yiwwhl_async_field_fallback"
  },
  rules: {
    defaultValue: []
  },
  show: {
    defaultValue: !0
  },
  required: {
    defaultValue: !1
  },
  placeholder: {
    defaultValue: void 0
  },
  children: {
    defaultValue: []
  },
  native: {
    defaultValue: void 0
  },
  grid: {
    default: void 0
  },
  runtime: {
    default: void 0
  }
}), l(M, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
l(M, "placeholderPresetByComponentName", M.getPlaceholderPrefixPresetByComponentName());
let Q = M;
const I = {
  ...Q,
  adapters: {
    ..._r
  }
}, Ir = /* @__PURE__ */ Ke({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(r) {
    const e = new yr(r.setup);
    return () => e.exec();
  }
});
function Sr(r) {
  const e = new mr(r);
  return [
    e.setup.bind(e),
    {
      submit: e.submit.bind(e),
      hydrate: e.hydrate.bind(e),
      share: e.share.bind(e),
      subscribeModel: e.subscribeModel.bind(e),
      resetModel: e.resetModel.bind(e)
    }
  ];
}
function Or(r) {
  c.presets = r;
}
function se(r, e) {
  return e === "native" && Object.defineProperty(r, "name", {
    value: `__proform_raw_${r.name}`,
    writable: !0
  }), e === "structured_path_parsing_mark" && Object.defineProperty(r, "name", {
    value: `__proform_structured_path_parsing_mark_${r.name}`,
    writable: !0
  }), e === "onetime" && Object.defineProperty(r, "name", {
    value: `__proform_onetime_${r.name}`,
    writable: !0
  }), r;
}
function Er(r) {
  return se(r, "native");
}
function Fr(r) {
  return r.__proform_raw_object = !0, r;
}
function wr(r) {
  return se(r, "onetime");
}
function jr(r) {
  function e() {
    return r;
  }
  return se(
    e,
    "structured_path_parsing_mark"
  );
}
export {
  Ir as ProForm,
  Er as markNativeFunction,
  Fr as markNativeObject,
  wr as markOnetimeFunction,
  jr as markStructuredPathParsing,
  Sr as useForm,
  Or as useFormPresetConfigurer,
  se as useModifiers
};
