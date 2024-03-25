var ze = Object.defineProperty;
var Le = (r, e, t) => e in r ? ze(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var l = (r, e, t) => (Le(r, typeof e != "symbol" ? e + "" : e, t), t);
import { ref as L, readonly as Ie, nextTick as _, isRef as U, watch as E, isReactive as T, watchEffect as D, toRaw as x, reactive as W, createVNode as m, mergeProps as $, withDirectives as He, vShow as De, createTextVNode as Ge, isVNode as Be, defineComponent as Ke } from "vue";
var We = typeof global == "object" && global && global.Object === Object && global, Xe = typeof self == "object" && self && self.Object === Object && self, A = We || Xe || Function("return this")(), R = A.Symbol, we = Object.prototype, Ye = we.hasOwnProperty, Ze = we.toString, N = R ? R.toStringTag : void 0;
function Je(r) {
  var e = Ye.call(r, N), t = r[N];
  try {
    r[N] = void 0;
    var i = !0;
  } catch {
  }
  var s = Ze.call(r);
  return i && (e ? r[N] = t : delete r[N]), s;
}
var Qe = Object.prototype, Ae = Qe.toString;
function ke(r) {
  return Ae.call(r);
}
var et = "[object Null]", tt = "[object Undefined]", Ce = R ? R.toStringTag : void 0;
function je(r) {
  return r == null ? r === void 0 ? tt : et : Ce && Ce in Object(r) ? Je(r) : ke(r);
}
function rt(r) {
  return r != null && typeof r == "object";
}
var it = "[object Symbol]";
function k(r) {
  return typeof r == "symbol" || rt(r) && je(r) == it;
}
function st(r, e) {
  for (var t = -1, i = r == null ? 0 : r.length, s = Array(i); ++t < i; )
    s[t] = e(r[t], t, r);
  return s;
}
var ee = Array.isArray, nt = 1 / 0, Se = R ? R.prototype : void 0, Oe = Se ? Se.toString : void 0;
function Me(r) {
  if (typeof r == "string")
    return r;
  if (ee(r))
    return st(r, Me) + "";
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
var mt = /[\\^$.*+?()[\]{}|]/g, gt = /^\[object .+?Constructor\]$/, vt = Function.prototype, bt = Object.prototype, yt = vt.toString, _t = bt.hasOwnProperty, Pt = RegExp(
  "^" + yt.call(_t).replace(mt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function It(r) {
  if (!G(r) || ct(r))
    return !1;
  var e = ft(r) ? Pt : gt;
  return e.test(ht(r));
}
function Ct(r, e) {
  return r == null ? void 0 : r[e];
}
function te(r, e) {
  var t = Ct(r, e);
  return It(t) ? t : void 0;
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
  var i = r[e];
  (!(jt.call(r, e) && xe(i, t)) || t === void 0 && !(e in r)) && Ft(r, e, t);
}
var xt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Rt = /^\w*$/;
function Vt(r, e) {
  if (ee(r))
    return !1;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || k(r) ? !0 : Rt.test(r) || !xt.test(r) || e != null && r in Object(e);
}
var z = te(Object, "create");
function qt() {
  this.__data__ = z ? z(null) : {}, this.size = 0;
}
function Nt(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
var $t = "__lodash_hash_undefined__", Ut = Object.prototype, Tt = Ut.hasOwnProperty;
function zt(r) {
  var e = this.__data__;
  if (z) {
    var t = e[r];
    return t === $t ? void 0 : t;
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
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
F.prototype.clear = qt;
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
  var i = e.length - 1;
  return t == i ? e.pop() : Xt.call(e, t, 1), --this.size, !0;
}
function Zt(r) {
  var e = this.__data__, t = B(e, r);
  return t < 0 ? void 0 : e[t][1];
}
function Jt(r) {
  return B(this.__data__, r) > -1;
}
function Qt(r, e) {
  var t = this.__data__, i = B(t, r);
  return i < 0 ? (++this.size, t.push([r, e])) : t[i][1] = e, this;
}
function V(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
V.prototype.clear = Kt;
V.prototype.delete = Yt;
V.prototype.get = Zt;
V.prototype.has = Jt;
V.prototype.set = Qt;
var At = te(A, "Map");
function kt() {
  this.size = 0, this.__data__ = {
    hash: new F(),
    map: new (At || V)(),
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
function ir(r) {
  return K(this, r).has(r);
}
function sr(r, e) {
  var t = K(this, r), i = t.size;
  return t.set(r, e), this.size += t.size == i ? 0 : 1, this;
}
function w(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
w.prototype.clear = kt;
w.prototype.delete = tr;
w.prototype.get = rr;
w.prototype.has = ir;
w.prototype.set = sr;
var nr = "Expected a function";
function re(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(nr);
  var t = function() {
    var i = arguments, s = e ? e.apply(this, i) : i[0], n = t.cache;
    if (n.has(s))
      return n.get(s);
    var a = r.apply(this, i);
    return t.cache = n.set(s, a) || n, a;
  };
  return t.cache = new (re.Cache || w)(), t;
}
re.Cache = w;
var or = 500;
function ar(r) {
  var e = re(r, function(i) {
    return t.size === or && t.clear(), i;
  }), t = e.cache;
  return e;
}
var lr = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ur = /\\(\\)?/g, fr = ar(function(r) {
  var e = [];
  return r.charCodeAt(0) === 46 && e.push(""), r.replace(lr, function(t, i, s, n) {
    e.push(s ? n.replace(ur, "$1") : i || t);
  }), e;
});
function cr(r) {
  return r == null ? "" : Me(r);
}
function Re(r, e) {
  return ee(r) ? r : Vt(r, e) ? [r] : fr(cr(r));
}
var dr = 1 / 0;
function Ve(r) {
  if (typeof r == "string" || k(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -dr ? "-0" : e;
}
function pr(r, e) {
  e = Re(e, r);
  for (var t = 0, i = e.length; r != null && t < i; )
    r = r[Ve(e[t++])];
  return t && t == i ? r : void 0;
}
function H(r, e, t) {
  var i = r == null ? void 0 : pr(r, e);
  return i === void 0 ? t : i;
}
function hr(r, e, t, i) {
  if (!G(r))
    return r;
  e = Re(e, r);
  for (var s = -1, n = e.length, a = n - 1, u = r; u != null && ++s < n; ) {
    var f = Ve(e[s]), d = t;
    if (f === "__proto__" || f === "constructor" || f === "prototype")
      return r;
    if (s != a) {
      var p = u[f];
      d = i ? i(p, f, u) : void 0, d === void 0 && (d = G(p) ? p : Et(e[s + 1]) ? [] : {});
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
function v(r, ...e) {
  return e.forEach((t) => {
    if (Array.isArray(t))
      Array.isArray(r) || (r = []), t.forEach((i, s) => {
        typeof i == "object" && i !== null ? r[s] = v(Array.isArray(i) ? [] : {}, i) : r[s] = i;
      });
    else
      for (const i in t)
        t.hasOwnProperty(i) && (typeof t[i] == "object" && t[i] !== null ? r[i] = v(r[i] || {}, t[i]) : r[i] = t[i]);
  }), r;
}
function I(r) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(i) {
    if (i === null || typeof i != "object")
      return i;
    if (i instanceof Date)
      return new Date(i);
    if (i instanceof RegExp)
      return new RegExp(i);
    if (i instanceof Map) {
      const n = /* @__PURE__ */ new Map();
      for (const [a, u] of i)
        n.set(t(a), t(u));
      return n;
    }
    if (i instanceof Set) {
      const n = /* @__PURE__ */ new Set();
      for (const a of i)
        n.add(t(a));
      return n;
    }
    if (e.has(i))
      return e.get(i);
    if (Array.isArray(i)) {
      const n = [];
      e.set(i, n);
      for (let a = 0; a < i.length; a++)
        n[a] = t(i[a]);
      return n;
    }
    const s = Object.create(Object.getPrototypeOf(i));
    e.set(i, s);
    for (const n in i)
      i.hasOwnProperty(n) && (s[n] = t(i[n]));
    return s;
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
    return this.runtimeCore = e, this.readonlyReactiveModel.value = Ie(e.model.value), Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var i;
    const e = (i = c.getPreset(this.runtimeCore.ui)) == null ? void 0 : i.adapter, t = C.adapters[c.getUI(this.runtimeCore.ui)];
    return (e == null ? void 0 : e.validateForm(this)) ?? (t == null ? void 0 : t.validateForm(this));
  }
  hydrate(e) {
    _(() => {
      this.runtimeCore.hydrateEffect.trackEffect(
        () => {
          U(e) ? E(
            () => e.value,
            () => {
              v(this.runtimeCore.model.value, e.value);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : T(e) ? E(
            () => e,
            () => {
              v(this.runtimeCore.model.value, e);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : v(this.runtimeCore.model.value, e);
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
        (i) => {
          e(i, {
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
    (e = this.runtimeCore) != null && e.model.value && (this.runtimeCore.model.value = I(
      this.runtimeCore.processor.stableModel
    ), this.readonlyReactiveModel.value = Ie(this.runtimeCore.model.value), this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore));
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
    l(this, "schemaPreset", C.schemaPreset);
    l(this, "componentPropsPreset", C.componentPropsPreset);
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
    e.forEach((i, s) => {
      this.parseItem(i, s, t);
    });
  }
  // 初始化空数据结构，避免后续复杂的 if else
  initSchemas(e) {
    return e.map((t) => {
      const i = {};
      return t.children && (i.children = this.initSchemas(t.children)), i;
    });
  }
  countFunctionDefaultValues(e) {
    let t = 0;
    const i = /* @__PURE__ */ new Set();
    function s(n) {
      if (!i.has(n) && (Array.isArray(n) || n !== null && typeof n == "object")) {
        i.add(n);
        for (const a in n)
          n.hasOwnProperty(a) && (a === "defaultValue" && typeof n[a] == "function" && !n[a].toString().includes("[native code]") && t++, s(n[a]));
      }
    }
    return s(e), t;
  }
  // 派生过程，用于外部应用
  parseSchemas(e, t) {
    o.isArrayEmpty(this.processedSchemas.value) && (this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
      I(e)
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
  parseItem(e, t, i) {
    const s = this, n = Array.from({
      length: Object.keys(e).filter((u) => u !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: a, parentMeta: i });
    function a(u) {
      const f = u.index, d = u.key, p = u.keyIndex;
      if (o.isUndefined(u.stable))
        return;
      const h = s.parseStable(u.stable), b = i == null ? void 0 : i.index, S = i == null ? void 0 : i.key;
      let y = h;
      if (o.isProcessInprogress(y) || (n[p] = !0), i) {
        const g = s.processedSchemas.value[b][S][f][d];
        g && o.isObject(g) && d !== "component" && (y = v(g, y)), s.processedSchemas.value[b][S][f][d] = y, s.stableUpdater(n);
      } else {
        const g = s.processedSchemas.value[f][d];
        g && o.isObject(g) && d !== "component" && (y = v(g, y)), s.processedSchemas.value[f][d] = y, s.stableUpdater(n);
      }
    }
  }
  // 只做基本的对象 parser
  objectParser(e) {
    const t = e.data;
    Object.keys(t).forEach((s, n) => {
      var a, u;
      if (s === "children")
        this.parseSchemas(t[s], {
          ...e,
          key: s,
          keyIndex: n
        });
      else {
        const f = (d) => {
          e.updater({
            ...e,
            key: s,
            keyIndex: n,
            stable: d
          });
        };
        o.isFunction(t[s]) ? s !== "defaultValue" ? this.schemaEffect.trackEffect(
          () => {
            if (s === "component") {
              const d = t[s](this.getRuntimeMeta());
              this.promiseFieldParser(d, f, !1, {
                rootIndex: e.index,
                parentMeta: e.parentMeta
              });
            } else
              this.fieldParser(t[s], f, {
                rootIndex: e.index,
                parentMeta: e.parentMeta
              });
          },
          {
            lazy: !1,
            identifier: `${(a = e.parentMeta) == null ? void 0 : a.key}${(u = e.parentMeta) == null ? void 0 : u.index}${e.index}${s}${n}`
          }
        ) : this.defaultValueEffect.trackEffect(
          () => {
            const d = this.schemaEffect.trackEffect(
              () => {
                /\{\s*model\s*\}/.test(t[s].toString()) ? this.fieldParser(
                  t[s],
                  (p) => {
                    if (!p)
                      return f(p);
                    this.defaultValueInprogressMap.set(t[s], p), !o.isProcessInprogress(p) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                      this.defaultValueInprogressMap.values()
                    ).every((h) => {
                      var b;
                      return !((b = h == null ? void 0 : h.includes) != null && b.call(h, "undefined"));
                    }) ? (f(p), this.defaultValueEffect.clearEffects(), _(() => {
                      d();
                    })) : f(p);
                  },
                  {
                    rootIndex: e.index,
                    parentMeta: e.parentMeta
                  }
                ) : this.fieldParser(
                  t[s],
                  (p) => {
                    this.defaultValueInprogressMap.set(t[s], p), !o.isProcessInprogress(p) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                      this.defaultValueInprogressMap.values()
                    ).every((h) => {
                      var b;
                      return !((b = h == null ? void 0 : h.includes) != null && b.call(h, "undefined"));
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
        ) : s === "component" || s === "slots" || s === "runtime" ? this.promiseFieldParser(t[s], f, !1, {
          rootIndex: e.index,
          parentMeta: e.parentMeta
        }) : this.fieldParser(t[s], f, {
          rootIndex: e.index,
          parentMeta: e.parentMeta
        });
      }
    });
  }
  promiseFieldParser(e, t, i, s) {
    o.isPromise(e) ? e.then((n) => {
      o.isString(n) && (n = Z(n, "")), i && o.isObject(n) && !o.isNativeObject(n) ? this.objectParser({
        data: n,
        updater: t,
        index: s.rootIndex,
        parentMeta: s.parentMeta
      }) : t(n);
    }) : (o.isString(e) && (e = Z(e, "")), i && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
      data: e,
      updater: t,
      index: s.rootIndex,
      parentMeta: s.parentMeta
    }) : t(e));
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(e, t, i, s = !0) {
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
        this.promiseFieldParser(n, t, s, i);
      } else {
        const n = e(this.getRuntimeMeta());
        e.name.startsWith("__proform_onetime_") && (e.__proform_cached_result = n), this.promiseFieldParser(n, t, s, i);
      }
    else
      U(e) ? E(
        () => e.value,
        () => {
          o.isUndefined(e.value) || (s && o.isObject(e.value) && !o.isNativeObject(e.value) ? this.objectParser({
            data: e.value,
            updater: t,
            index: i.rootIndex,
            parentMeta: i.parentMeta
          }) : t(e.value));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : T(e) ? E(
        () => e,
        () => {
          o.isUndefined(e) || (s && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
            data: e,
            updater: t,
            index: i.rootIndex,
            parentMeta: i.parentMeta
          }) : t(e));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : s && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
        data: e,
        updater: t,
        index: i.rootIndex,
        parentMeta: i.parentMeta
      }) : t(e);
  }
  modelProcessor(e) {
    e.map(
      (t) => this.createModel(t, this.processedModel.value)
    ), o.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && _(() => {
      this.stableModel = I(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects();
    });
  }
  setModel(e, t, i) {
    o.isFunction(t) ? P(e, t(), i) : v(e, {
      [t]: i
    });
  }
  createModel(e, t) {
    o.isListSchema(e) && (t[e.field] || this.setModel(t, e.field, [{}]), e.children.forEach((i) => {
      this.createModel(i, t[e.field][0]);
    })), o.isGroupSchema(e) && e.children.forEach((i) => {
      this.createModel(i, t);
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
class vr {
  constructor(e) {
    this.ui = e;
  }
  getRuntimeNative() {
    var t;
    return (t = c.presets.uiPresets[this.ui]) == null ? void 0 : t.native;
  }
  getRuntimeField(e) {
    var s;
    const t = (s = c.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeField(e)) ?? (i == null ? void 0 : i.getRuntimeField(e));
  }
  getRuntimeRequired(e) {
    var s;
    const t = (s = c.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeRequired(e)) ?? (i == null ? void 0 : i.getRuntimeRequired(e));
  }
  getFormModelPropName() {
    var i;
    const e = (i = c.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, t = C.adapters[c.getUI(this.ui)];
    return (e == null ? void 0 : e.getFormModelPropName()) ?? (t == null ? void 0 : t.getFormModelPropName());
  }
  formComponentRenderer(e) {
    var s;
    const t = (s = c.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.formComponentRenderer(e)) ?? (i == null ? void 0 : i.formComponentRenderer(e));
  }
  clearValidate(e) {
    var s;
    const t = (s = c.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.clearValidate(e)) ?? (i == null ? void 0 : i.clearValidate(e));
  }
}
function br(r) {
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
    if (this.ui = t.ui ?? c.presets.ui, this.runtimeAdapter = new vr(this.ui), Object.assign(this.globalNativeFormOverride, this.runtimeAdapter.getRuntimeNative()), U(t.schemas))
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
      const i = E(() => t.schemas, () => {
        this.processor.parseSchemas(t.schemas), _(() => {
          i();
        });
      }, {
        deep: !0
      });
    } else
      this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    return {
      model: x(I(this.model.value)),
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (t) => {
        _(() => {
          Object.keys(t).forEach((i) => {
            U(t[i]) ? D(() => {
              P(this.shared, i, t[i].value), this.shareHistory.get(i) !== t[i].value && (this.shareHistory.set(i, t[i].value), this.processor.schemaEffect.triggerEffects());
            }) : T(t[i]) ? D(() => {
              P(this.shared, i, t[i]), this.shareHistory.get(i) !== t[i] && (this.shareHistory.set(i, t[i]), this.processor.schemaEffect.triggerEffects());
            }) : (P(this.shared, i, t[i]), this.shareHistory.get(i) !== t[i] && (this.shareHistory.set(i, t[i]), this.processor.schemaEffect.triggerEffects()));
          });
        });
      }
    };
  }
  runtimeItemProcessor(e, t, i = this.model.value, s) {
    var se, ne, oe, ae, le, ue, fe, ce, de, pe, he, me, ge, ve, be, ye, _e;
    const n = x(e.component);
    if (!n)
      return;
    (ne = (se = e.native) == null ? void 0 : se.props) != null && ne.Form && v(this.globalNativeFormOverride.props.Form, (ae = (oe = e.native) == null ? void 0 : oe.props) == null ? void 0 : ae.Form), (ue = (le = e.native) == null ? void 0 : le.slots) != null && ue.Form && v(this.globalNativeFormOverride.slots.Form, (ce = (fe = e.native) == null ? void 0 : fe.slots) == null ? void 0 : ce.Form);
    const a = v(I((pe = (de = this.native) == null ? void 0 : de.slots) == null ? void 0 : pe.FormItem) ?? {}, (me = (he = e.native) == null ? void 0 : he.slots) == null ? void 0 : me.FormItem), u = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, f = v(I((ve = (ge = this.native) == null ? void 0 : ge.props) == null ? void 0 : ve.FormItem) ?? {}, (ye = (be = e.native) == null ? void 0 : be.props) == null ? void 0 : ye.FormItem), d = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: s,
      index: t
    }), p = n.name, h = e.componentProps ?? {}, b = C.placeholderPresetByComponentName;
    let S = e.placeholder, y = e.show;
    y === void 0 && (y = !0);
    let g = e.label ?? "", O;
    if (e.runtime ? O = e.runtime : O = (s == null ? void 0 : s.runtime) ?? this.runtime, !o.isUndefined(t) && !o.isObjectEmpty(O) && (g = Z((_e = O == null ? void 0 : O.customizeListItemLabel) == null ? void 0 : _e.call(O, e.label ?? "", t + 1), "")), !S) {
      let q = "请输入";
      o.isUndefined(p) ? S = `${q}${g}` : /* @ts-expect-error */ b[p.toLowerCase()] ? (q = // @ts-expect-error
      b[p.toLowerCase()], S = `${q}${g}`) : (Object.keys(b).forEach((Pe) => {
        p.toLowerCase().includes(Pe.toLowerCase()) && (q = b[Pe]);
      }), S = `${q}${g}`);
    }
    const qe = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: g
    }), Ne = j.getItemContainer(this), $e = j.getFormItemContainer(this), Ue = this, Te = e.componentSlots;
    return m("div", {
      style: u
    }, [m(Ne, {
      show: y
    }, {
      default() {
        return y && m($e, $(f, {
          label: `${g ? `${g}:` : ""}`
        }, d, qe), {
          default() {
            return Ue.runtimeAdapter.formComponentRenderer({
              Component: n,
              schema: e,
              baseModel: i,
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
    const i = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, s = j.getGroupContainer(this);
    let n = e.show;
    return n === void 0 && (n = !0), m("div", {
      style: i
    }, [n && m(s, {
      schema: e
    }, br(t = e.children.map((a) => this.runtimeItemProcessor(a))) ? t : {
      default: () => [t]
    })]);
  }
  addListItem(e) {
    var t;
    console.log("this", this.processor.stableModel, e.field), (t = this.processor.stableModel[e.field]) != null && t[0] && this.model.value[e.field].push(I(this.processor.stableModel[e.field][0])), this.runtimeAdapter.clearValidate(this);
  }
  deleteListItem(e, t) {
    this.model.value[e.field].splice(t, 1), this.runtimeAdapter.clearValidate(this);
  }
  runtimeListProcessor(e) {
    const t = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, i = this;
    i.model.value[e.field] || (i.model.value[e.field] = [{}]);
    let s = e.show;
    s === void 0 && (s = !0);
    const n = j.getListContainer(this), a = j.getListItemContainer(this);
    return m("div", {
      style: t
    }, [s && m(n, {
      schema: e
    }, {
      default() {
        return i.model.value[e.field].map((u, f) => m(a, null, {
          default() {
            return e.children.map((d) => i.runtimeItemProcessor(d, f, u, e));
          },
          delete({
            container: d
          } = {}) {
            var h;
            const p = d ?? m("button", null, null);
            return He(m(p, {
              onClick: () => i.deleteListItem(e, f)
            }, null), [[De, ((h = i.model.value[e.field]) == null ? void 0 : h.length) > 1]]);
          }
        }));
      },
      add({
        container: u
      } = {}) {
        const f = u ?? m("button", null, [Ge("添加")]);
        return m(f, {
          onClick: () => i.addListItem(e)
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
    }, t = this, i = v(this.globalNativeFormOverride.props.Form, I((f = (u = this.native) == null ? void 0 : u.props) == null ? void 0 : f.Form) ?? {}), s = v(this.globalNativeFormOverride.slots.Form, I((p = (d = this.native) == null ? void 0 : d.slots) == null ? void 0 : p.Form) ?? {}), n = j.getFormContainer(this), a = this.runtimeAdapter.getFormModelPropName();
    return m(n, $(i, {
      ref: this.formRef
    }, {
      [a]: this.model.value
    }), {
      default() {
        return m("div", {
          style: e
        }, [t.runtimeProcessor(t.schemas.value)]);
      },
      ...s
    });
  }
}
class c {
  static getPreset(e) {
    var t, i, s;
    return (i = (t = this.presets.uiPresets) == null ? void 0 : t[e]) != null && i.extend ? this.presets.uiPresets[(s = this.presets.uiPresets[e]) == null ? void 0 : s.extend] : this.presets.uiPresets[e];
  }
  static getUI(e) {
    var t, i, s;
    return (i = (t = this.presets.uiPresets) == null ? void 0 : t[e]) != null && i.extend ? (s = this.presets.uiPresets[e]) == null ? void 0 : s.extend : e;
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
      var t;
      let e = `${r.label}是必填项`;
      if (r.required)
        if (o.isString(r.required) && (e = r.required), !r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: e
          });
        else {
          const i = r.rules.findIndex((s) => !o.isUndefined(s.required));
          i !== -1 ? (r.rules[i].required = !0, r.rules[i].message = e) : r.rules.unshift({
            required: !0,
            message: e
          });
        }
      else
        r.rules && ((t = r.rules) == null ? void 0 : t.findIndex((s) => !!s.required)) === -1 && r.rules.unshift({
          required: !0,
          message: e
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
      placeholder: i,
      componentSlots: s,
      props: n
    }) {
      let a;
      return o.isFunction(t.field) ? a = H(e, t.field()) : a = e[t.field], m(r, $({
        modelValue: a,
        "onUpdate:modelValue": (u) => {
          o.isFunction(t.field) ? P(e, t.field(), u) : e[t.field] = u;
        },
        placeholder: i
      }, n), {
        ...s
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((i) => i ? t(i) : e(r.cleanFallbackFields(x(r.runtimeCore.processor.processedModel.value))));
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
      var t;
      let e = `${r.label}是必填项`;
      if (r.required)
        if (o.isString(r.required) && (e = r.required), !r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: e
          });
        else {
          const i = r.rules.findIndex((s) => !o.isUndefined(s.required));
          i !== -1 ? (r.rules[i].required = !0, r.rules[i].message = e) : r.rules.unshift({
            required: !0,
            message: e
          });
        }
      else
        r.rules && ((t = r.rules) == null ? void 0 : t.findIndex((s) => !!s.required)) === -1 && r.rules.unshift({
          required: !0,
          message: e
        });
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
      placeholder: i,
      componentSlots: s,
      props: n
    }) {
      let a;
      return o.isFunction(t.field) ? a = H(e, t.field()) : a = e[t.field], m(r, $({
        modelValue: a,
        "onUpdate:modelValue": (u) => {
          o.isFunction(t.field) ? P(e, t.field(), u) : e[t.field] = u;
        },
        placeholder: i
      }, n), {
        ...s
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate().then(({
          valid: i,
          errors: s
        }) => {
          i ? e(r.cleanFallbackFields(x(r.runtimeCore.processor.processedModel.value))) : t(s);
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
      var t;
      let e = `${r.label}是必填项`;
      if (r.required)
        if (o.isString(r.required) && (e = r.required), !r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: e,
            trigger: ["input", "blur"]
          });
        else {
          const i = r.rules.findIndex((s) => !o.isUndefined(s.required));
          i !== -1 ? (r.rules[i].required = !0, r.rules[i].message = e) : r.rules.unshift({
            required: !0,
            message: e,
            trigger: ["input", "blur"]
          });
        }
      else
        r.rules && ((t = r.rules) == null ? void 0 : t.findIndex((s) => !!s.required)) === -1 && r.rules.unshift({
          required: !0,
          message: e,
          trigger: ["input", "blur"]
        });
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
      placeholder: i,
      componentSlots: s,
      props: n
    }) {
      let a;
      return o.isFunction(t.field) ? a = H(e, t.field()) : a = e[t.field], m(r, $({
        value: a,
        "onUpdate:value": (u) => {
          o.isFunction(t.field) ? P(e, t.field(), u) : e[t.field] = u;
        },
        placeholder: i
      }, n), {
        ...s
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((i) => i ? t(i) : e(r.cleanFallbackFields(x(r.runtimeCore.processor.processedModel.value))));
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
    for (const i in e)
      e[i].forEach((s) => {
        t[s] = i;
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
const C = {
  ...Q,
  adapters: {
    ..._r
  }
}, Cr = /* @__PURE__ */ Ke({
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
function ie(r, e) {
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
  return ie(r, "native");
}
function Fr(r) {
  return r.__proform_raw_object = !0, r;
}
function wr(r) {
  return ie(r, "onetime");
}
function jr(r) {
  function e() {
    return r;
  }
  return ie(
    e,
    "structured_path_parsing_mark"
  );
}
export {
  Cr as ProForm,
  Er as markNativeFunction,
  Fr as markNativeObject,
  wr as markOnetimeFunction,
  jr as markStructuredPathParsing,
  Sr as useForm,
  Or as useFormPresetConfigurer,
  ie as useModifiers
};
