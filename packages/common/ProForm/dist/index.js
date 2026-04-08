var Qe = Object.defineProperty;
var Ae = (r, e, t) => e in r ? Qe(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var u = (r, e, t) => (Ae(r, typeof e != "symbol" ? e + "" : e, t), t);
import { ref as L, readonly as Ve, nextTick as S, isRef as T, watch as E, isReactive as U, watchEffect as K, toRaw as M, reactive as D, createVNode as m, mergeProps as q, withDirectives as ke, vShow as et, createTextVNode as tt, isVNode as rt, defineComponent as it } from "vue";
var st = typeof global == "object" && global && global.Object === Object && global, nt = typeof self == "object" && self && self.Object === Object && self, re = st || nt || Function("return this")(), $ = re.Symbol, ze = Object.prototype, ot = ze.hasOwnProperty, at = ze.toString, N = $ ? $.toStringTag : void 0;
function lt(r) {
  var e = ot.call(r, N), t = r[N];
  try {
    r[N] = void 0;
    var i = !0;
  } catch {
  }
  var s = at.call(r);
  return i && (e ? r[N] = t : delete r[N]), s;
}
var ut = Object.prototype, ct = ut.toString;
function ft(r) {
  return ct.call(r);
}
var dt = "[object Null]", ht = "[object Undefined]", Ne = $ ? $.toStringTag : void 0;
function He(r) {
  return r == null ? r === void 0 ? ht : dt : Ne && Ne in Object(r) ? lt(r) : ft(r);
}
function pt(r) {
  return r != null && typeof r == "object";
}
var mt = "[object Symbol]";
function ie(r) {
  return typeof r == "symbol" || pt(r) && He(r) == mt;
}
function gt(r, e) {
  for (var t = -1, i = r == null ? 0 : r.length, s = Array(i); ++t < i; )
    s[t] = e(r[t], t, r);
  return s;
}
var se = Array.isArray, Pt = 1 / 0, Le = $ ? $.prototype : void 0, qe = Le ? Le.toString : void 0;
function De(r) {
  if (typeof r == "string")
    return r;
  if (se(r))
    return gt(r, De) + "";
  if (ie(r))
    return qe ? qe.call(r) : "";
  var e = r + "";
  return e == "0" && 1 / r == -Pt ? "-0" : e;
}
function W(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
var vt = "[object AsyncFunction]", bt = "[object Function]", yt = "[object GeneratorFunction]", _t = "[object Proxy]";
function G(r) {
  if (!W(r))
    return !1;
  var e = He(r);
  return e == bt || e == yt || e == vt || e == _t;
}
var J = re["__core-js_shared__"], Te = function() {
  var r = /[^.]+$/.exec(J && J.keys && J.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function Ct(r) {
  return !!Te && Te in r;
}
var It = Function.prototype, St = It.toString;
function Ft(r) {
  if (r != null) {
    try {
      return St.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
var Ot = /[\\^$.*+?()[\]{}|]/g, Et = /^\[object .+?Constructor\]$/, wt = Function.prototype, jt = Object.prototype, xt = wt.toString, Rt = jt.hasOwnProperty, Mt = RegExp(
  "^" + xt.call(Rt).replace(Ot, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function $t(r) {
  if (!W(r) || Ct(r))
    return !1;
  var e = G(r) ? Mt : Et;
  return e.test(Ft(r));
}
function Vt(r, e) {
  return r == null ? void 0 : r[e];
}
function ne(r, e) {
  var t = Vt(r, e);
  return $t(t) ? t : void 0;
}
var Ue = function() {
  try {
    var r = ne(Object, "defineProperty");
    return r({}, "", {}), r;
  } catch {
  }
}(), Nt = 9007199254740991, Lt = /^(?:0|[1-9]\d*)$/;
function qt(r, e) {
  var t = typeof r;
  return e = e ?? Nt, !!e && (t == "number" || t != "symbol" && Lt.test(r)) && r > -1 && r % 1 == 0 && r < e;
}
function Tt(r, e, t) {
  e == "__proto__" && Ue ? Ue(r, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : r[e] = t;
}
function Ge(r, e) {
  return r === e || r !== r && e !== e;
}
var Ut = Object.prototype, zt = Ut.hasOwnProperty;
function Ht(r, e, t) {
  var i = r[e];
  (!(zt.call(r, e) && Ge(i, t)) || t === void 0 && !(e in r)) && Tt(r, e, t);
}
var Dt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Gt = /^\w*$/;
function Bt(r, e) {
  if (se(r))
    return !1;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || ie(r) ? !0 : Gt.test(r) || !Dt.test(r) || e != null && r in Object(e);
}
var z = ne(Object, "create");
function Kt() {
  this.__data__ = z ? z(null) : {}, this.size = 0;
}
function Wt(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
var Xt = "__lodash_hash_undefined__", Yt = Object.prototype, Zt = Yt.hasOwnProperty;
function Jt(r) {
  var e = this.__data__;
  if (z) {
    var t = e[r];
    return t === Xt ? void 0 : t;
  }
  return Zt.call(e, r) ? e[r] : void 0;
}
var Qt = Object.prototype, At = Qt.hasOwnProperty;
function kt(r) {
  var e = this.__data__;
  return z ? e[r] !== void 0 : At.call(e, r);
}
var er = "__lodash_hash_undefined__";
function tr(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = z && e === void 0 ? er : e, this;
}
function w(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
w.prototype.clear = Kt;
w.prototype.delete = Wt;
w.prototype.get = Jt;
w.prototype.has = kt;
w.prototype.set = tr;
function rr() {
  this.__data__ = [], this.size = 0;
}
function X(r, e) {
  for (var t = r.length; t--; )
    if (Ge(r[t][0], e))
      return t;
  return -1;
}
var ir = Array.prototype, sr = ir.splice;
function nr(r) {
  var e = this.__data__, t = X(e, r);
  if (t < 0)
    return !1;
  var i = e.length - 1;
  return t == i ? e.pop() : sr.call(e, t, 1), --this.size, !0;
}
function or(r) {
  var e = this.__data__, t = X(e, r);
  return t < 0 ? void 0 : e[t][1];
}
function ar(r) {
  return X(this.__data__, r) > -1;
}
function lr(r, e) {
  var t = this.__data__, i = X(t, r);
  return i < 0 ? (++this.size, t.push([r, e])) : t[i][1] = e, this;
}
function V(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
V.prototype.clear = rr;
V.prototype.delete = nr;
V.prototype.get = or;
V.prototype.has = ar;
V.prototype.set = lr;
var ur = ne(re, "Map");
function cr() {
  this.size = 0, this.__data__ = {
    hash: new w(),
    map: new (ur || V)(),
    string: new w()
  };
}
function fr(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
function Y(r, e) {
  var t = r.__data__;
  return fr(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function dr(r) {
  var e = Y(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
function hr(r) {
  return Y(this, r).get(r);
}
function pr(r) {
  return Y(this, r).has(r);
}
function mr(r, e) {
  var t = Y(this, r), i = t.size;
  return t.set(r, e), this.size += t.size == i ? 0 : 1, this;
}
function j(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
j.prototype.clear = cr;
j.prototype.delete = dr;
j.prototype.get = hr;
j.prototype.has = pr;
j.prototype.set = mr;
var gr = "Expected a function";
function oe(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(gr);
  var t = function() {
    var i = arguments, s = e ? e.apply(this, i) : i[0], n = t.cache;
    if (n.has(s))
      return n.get(s);
    var o = r.apply(this, i);
    return t.cache = n.set(s, o) || n, o;
  };
  return t.cache = new (oe.Cache || j)(), t;
}
oe.Cache = j;
var Pr = 500;
function vr(r) {
  var e = oe(r, function(i) {
    return t.size === Pr && t.clear(), i;
  }), t = e.cache;
  return e;
}
var br = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, yr = /\\(\\)?/g, _r = vr(function(r) {
  var e = [];
  return r.charCodeAt(0) === 46 && e.push(""), r.replace(br, function(t, i, s, n) {
    e.push(s ? n.replace(yr, "$1") : i || t);
  }), e;
});
function Cr(r) {
  return r == null ? "" : De(r);
}
function Be(r, e) {
  return se(r) ? r : Bt(r, e) ? [r] : _r(Cr(r));
}
var Ir = 1 / 0;
function Ke(r) {
  if (typeof r == "string" || ie(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -Ir ? "-0" : e;
}
function Sr(r, e) {
  e = Be(e, r);
  for (var t = 0, i = e.length; r != null && t < i; )
    r = r[Ke(e[t++])];
  return t && t == i ? r : void 0;
}
function B(r, e, t) {
  var i = r == null ? void 0 : Sr(r, e);
  return i === void 0 ? t : i;
}
function Fr(r, e, t, i) {
  if (!W(r))
    return r;
  e = Be(e, r);
  for (var s = -1, n = e.length, o = n - 1, l = r; l != null && ++s < n; ) {
    var f = Ke(e[s]), d = t;
    if (f === "__proto__" || f === "constructor" || f === "prototype")
      return r;
    if (s != o) {
      var h = l[f];
      d = i ? i(h, f, l) : void 0, d === void 0 && (d = W(h) ? h : qt(e[s + 1]) ? [] : {});
    }
    Ht(l, f, d), l = l[f];
  }
  return r;
}
function y(r, e, t) {
  return r == null ? r : Fr(r, e, t);
}
class a {
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
  static isNull(e) {
    return e === null;
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
      if (e.__proform_raw_object)
        return !1;
      for (const t in e) {
        if (t === "componentProps")
          return !1;
        if (e.hasOwnProperty(t)) {
          if (e[t] instanceof Date)
            return !1;
          if (this.isProcessInprogress(e[t]))
            return !0;
        }
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
function P(r, ...e) {
  return e.forEach((t) => {
    if (Array.isArray(t))
      r = [...t];
    else
      for (const i in t)
        t.hasOwnProperty(i) && t[i] !== void 0 && (typeof t[i] == "object" && t[i] !== null && !(t[i] instanceof Date) && !(t[i] instanceof RegExp) ? Array.isArray(t[i]) ? r[i] = [...t[i]] : r[i] = P(r[i] || {}, t[i]) : r[i] = t[i]);
  }), r;
}
function C(r) {
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
      for (const [o, l] of i)
        n.set(t(o), t(l));
      return n;
    }
    if (i instanceof Set) {
      const n = /* @__PURE__ */ new Set();
      for (const o of i)
        n.add(t(o));
      return n;
    }
    if (e.has(i))
      return e.get(i);
    if (Array.isArray(i)) {
      const n = [];
      e.set(i, n);
      for (let o = 0; o < i.length; o++)
        n[o] = t(i[o]);
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
function k(r, e) {
  return r.replace(/undefined/g, e);
}
class Or {
  constructor(e) {
    u(this, "runtimeCore");
    u(this, "readonlyReactiveModel", L({}));
    u(this, "shareHistory", /* @__PURE__ */ new Map());
    this.formCustomization = e;
  }
  // happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
  cleanFallbackFields(e) {
    return e !== null && typeof e == "object" && (delete e.__yiwwhl_async_field_fallback, Object.values(e).forEach((t) => {
      this.cleanFallbackFields(t);
    })), e;
  }
  setup(e) {
    return this.runtimeCore = e, this.readonlyReactiveModel.value = Ve(e.model.value), Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var i;
    const e = (i = c.getPreset(this.runtimeCore.ui)) == null ? void 0 : i.adapter, t = I.adapters[c.getUI(this.runtimeCore.ui)];
    return (e == null ? void 0 : e.validateForm(this)) ?? (t == null ? void 0 : t.validateForm(this));
  }
  hydrate(e) {
    S(() => {
      this.runtimeCore.hydrateEffect.trackEffect(
        () => {
          T(e) ? E(
            () => e.value,
            () => {
              P(this.runtimeCore.model.value, e.value);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : U(e) ? E(
            () => e,
            () => {
              P(this.runtimeCore.model.value, e);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : P(this.runtimeCore.model.value, e);
        },
        {
          lazy: !1
        }
      );
    });
  }
  share(e) {
    S(() => {
      Object.keys(e).forEach((t) => {
        T(e[t]) ? K(() => {
          y(this.runtimeCore.shared, t, e[t].value), this.shareHistory.get(t) !== e[t].value && (this.shareHistory.set(t, e[t].value), this.runtimeCore.processor.schemaEffect.triggerEffects());
        }) : U(e[t]) ? K(() => {
          y(this.runtimeCore.shared, t, e[t]), this.shareHistory.get(t) !== e[t] && (this.shareHistory.set(t, e[t]), this.runtimeCore.processor.schemaEffect.triggerEffects());
        }) : (y(this.runtimeCore.shared, t, e[t]), this.shareHistory.get(t) !== e[t] && (this.shareHistory.set(t, e[t]), this.runtimeCore.processor.schemaEffect.triggerEffects()));
      });
    });
  }
  subscribeModel(e) {
    S(() => {
      const t = E(
        () => this.readonlyReactiveModel.value,
        (i) => {
          e(i, {
            reactiveModel: this.runtimeCore.model.value,
            stopSubscribe() {
              S(() => {
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
    ), this.readonlyReactiveModel.value = Ve(this.runtimeCore.model.value), this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore));
  }
}
class ee {
  constructor() {
    u(this, "effects", /* @__PURE__ */ new Set());
    u(this, "tempClonedEffects", /* @__PURE__ */ new Set());
    u(this, "identifierMap", /* @__PURE__ */ new Map());
    u(this, "timer");
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
    return t.identifier ? this.identifierMap.get(t.identifier) || (this.identifierMap.set(t.identifier, !0), !t.lazy && e(), this.effects.add(e)) : (!t.lazy && e(), this.effects.add(e)), () => this.effects.delete(e);
  }
}
class Er {
  constructor(e) {
    u(this, "runtimeCore");
    u(this, "processedSchemas");
    u(this, "processedModel");
    u(this, "getRuntimeMeta");
    u(this, "stableSchemas", []);
    u(this, "stableModel", {});
    u(this, "schemaPreset", I.schemaPreset);
    u(this, "componentPropsPreset", I.componentPropsPreset);
    u(this, "stableUpdaterProcessProgress");
    u(this, "stableUpdaterTimes", 0);
    u(this, "schemaEffect", new ee());
    u(this, "defaultValueEffect", new ee());
    u(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    u(this, "baseDefaultValueFunctionsLength");
    u(this, "isModelInitialized", !0);
    u(this, "schemaEffectHistory", /* @__PURE__ */ new Map());
    u(this, "stableUpdaterHistory", /* @__PURE__ */ new Map());
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
        for (const o in n)
          n.hasOwnProperty(o) && (o === "defaultValue" && typeof n[o] == "function" && !n[o].toString().includes("[native code]") && t++, s(n[o]));
      }
    }
    return s(e), t;
  }
  // 派生过程，用于外部应用
  parseSchemas(e, t) {
    a.isArrayEmpty(this.processedSchemas.value) && (this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
      C(e)
    ), this.processedSchemas.value = this.initSchemas(e)), this.parse(e, t);
  }
  parseStable(e) {
    const t = {};
    if (!a.isUndefined(e.stable) && !a.isNull(e.stable))
      t[e.key] = this.parseStable(e.stable);
    else
      return e;
    return t;
  }
  // 对于稳定初始化更新的抽象
  stableUpdater(e = [], t, i, s, n) {
    if (e.every(Boolean)) {
      const o = M(this.processedSchemas.value);
      !a.isProcessInprogress(o) && a.isObjectEmpty(this.stableModel), !this.stableUpdaterHistory.get(
        `${t == null ? void 0 : t.key}parentIndex:${t == null ? void 0 : t.index}childIndex:${i}${s}${n}`
      ) && (this.stableUpdaterHistory.set(
        `${t == null ? void 0 : t.key}parentIndex:${t == null ? void 0 : t.index}childIndex:${i}${s}${n}`,
        !0
      ), this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: o.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(o));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, t, i) {
    const s = this, n = Array.from({
      length: Object.keys(e).filter((l) => l !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: o, parentMeta: i });
    function o(l) {
      const f = l.index, d = l.key, h = l.keyIndex;
      if (a.isUndefined(l.stable) || a.isNull(l.stable))
        return;
      const p = s.parseStable(l.stable), b = i == null ? void 0 : i.index, H = i == null ? void 0 : i.key;
      let g = p;
      if (a.isProcessInprogress(g) || (n[h] = !0), i) {
        const v = s.processedSchemas.value[b][H][f][d];
        v && a.isObject(v) && d !== "component" && (g = P(v, g)), s.processedSchemas.value[b][H][f][d] = g, s.stableUpdater(
          n,
          i,
          t,
          d,
          f
        );
      } else {
        const v = s.processedSchemas.value[f][d];
        v && a.isObject(v) && d !== "component" && (g = P(v, g)), s.processedSchemas.value[f][d] = g, s.stableUpdater(
          n,
          i,
          t,
          d,
          f
        );
      }
    }
  }
  // 只做基本的对象 parser
  objectParser(e) {
    const t = e.data;
    Object.keys(t).forEach((s, n) => {
      var o, l;
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
        a.isFunction(t[s]) ? s !== "defaultValue" ? this.schemaEffect.trackEffect(
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
            identifier: `${(o = e.parentMeta) == null ? void 0 : o.key}parentIndex:${(l = e.parentMeta) == null ? void 0 : l.index}childIndex:${e.index}${s}${n}`
          }
        ) : this.defaultValueEffect.trackEffect(
          () => {
            const d = this.schemaEffect.trackEffect(
              () => {
                /\{\s*model\s*\}/.test(t[s].toString()) ? this.fieldParser(
                  t[s],
                  (h) => {
                    if (!h)
                      return f(h);
                    this.defaultValueInprogressMap.set(t[s], h), !a.isProcessInprogress(h) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                      this.defaultValueInprogressMap.values()
                    ).every((p) => {
                      var b;
                      return !((b = p == null ? void 0 : p.includes) != null && b.call(p, "undefined"));
                    }) ? (f(h), this.defaultValueEffect.clearEffects(), S(() => {
                      d();
                    })) : f(h);
                  },
                  {
                    rootIndex: e.index,
                    parentMeta: e.parentMeta
                  }
                ) : this.fieldParser(
                  t[s],
                  (h) => {
                    this.defaultValueInprogressMap.set(t[s], h), !a.isProcessInprogress(h) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                      this.defaultValueInprogressMap.values()
                    ).every((p) => {
                      var b;
                      return !((b = p == null ? void 0 : p.includes) != null && b.call(p, "undefined"));
                    }) ? (f(h), this.defaultValueEffect.clearEffects(), S(() => {
                      d();
                    })) : f(h);
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
    a.isPromise(e) ? e.then((n) => {
      a.isString(n) && (n = k(n, "")), i && a.isObject(n) && !a.isNativeObject(n) ? this.objectParser({
        data: n,
        updater: t,
        index: s.rootIndex,
        parentMeta: s.parentMeta
      }) : t(n);
    }) : (a.isString(e) && (e = k(e, "")), i && a.isObject(e) && !a.isNativeObject(e) ? this.objectParser({
      data: e,
      updater: t,
      index: s.rootIndex,
      parentMeta: s.parentMeta
    }) : t(e));
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(e, t, i, s = !0) {
    if (a.isFunction(e))
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
      T(e) ? E(
        () => e.value,
        () => {
          a.isUndefined(e.value) || (s && a.isObject(e.value) && !a.isNativeObject(e.value) ? this.objectParser({
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
      ) : U(e) ? E(
        () => e,
        () => {
          a.isUndefined(e) || (s && a.isObject(e) && !a.isNativeObject(e) ? this.objectParser({
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
      ) : s && a.isObject(e) && !a.isNativeObject(e) ? this.objectParser({
        data: e,
        updater: t,
        index: i.rootIndex,
        parentMeta: i.parentMeta
      }) : t(e);
  }
  modelProcessor(e) {
    e.map((t) => {
      this.createModel(t, this.processedModel.value);
    }), a.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && S(() => {
      this.stableModel = C(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects();
    });
  }
  setModel(e, t, i) {
    a.isFunction(t) ? y(e, t(), i) : P(e, {
      [t]: i
    });
  }
  createModel(e, t) {
    a.isListSchema(e) && (t[e.field] || this.setModel(t, e.field, [{}]), e.children.forEach((i) => {
      this.createModel(i, t[e.field][0]);
    })), a.isGroupSchema(e) && e.children.forEach((i) => {
      this.createModel(i, t);
    }), a.isItemSchema(e) && S(() => {
      if ("defaultValue" in e && !t[e.field])
        this.setModel(t, e.field, e.defaultValue);
      else {
        if (a.isFunction(e.field) && B(t, e.field()))
          return;
        if (a.isString(e.field) && t[e.field])
          return;
        this.setModel(t, e.field, void 0);
      }
    });
  }
}
class x {
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
class wr {
  constructor(e) {
    this.ui = e;
  }
  getRuntimeNative() {
    var t;
    return (t = c.presets.uiPresets[this.ui]) == null ? void 0 : t.native;
  }
  getRuntimeField(e) {
    var s;
    const t = (s = c.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = I.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeField(e)) ?? (i == null ? void 0 : i.getRuntimeField(e));
  }
  getRuntimeRequired(e) {
    var s;
    const t = (s = c.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = I.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeRequired(e)) ?? (i == null ? void 0 : i.getRuntimeRequired(e));
  }
  getFormModelPropName() {
    var i;
    const e = (i = c.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, t = I.adapters[c.getUI(this.ui)];
    return (e == null ? void 0 : e.getFormModelPropName()) ?? (t == null ? void 0 : t.getFormModelPropName());
  }
  formComponentRenderer(e) {
    var s;
    const t = (s = c.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = I.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.formComponentRenderer(e)) ?? (i == null ? void 0 : i.formComponentRenderer(e));
  }
  clearValidate(e) {
    var s;
    const t = (s = c.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = I.adapters[c.getUI(this.ui)];
    return (t == null ? void 0 : t.clearValidate(e)) ?? (i == null ? void 0 : i.clearValidate(e));
  }
}
function jr(r) {
  return typeof r == "function" || Object.prototype.toString.call(r) === "[object Object]" && !rt(r);
}
class xr {
  constructor(e) {
    u(this, "schemas", L([]));
    u(this, "model", L({}));
    u(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    u(this, "formRef", L(null));
    u(this, "hydrateEffect", new ee());
    u(this, "native", D({}));
    u(this, "grid", {});
    u(this, "runtime", {});
    u(this, "globalNativeFormOverride", D({
      props: {
        Form: {},
        FormItem: {}
      },
      slots: {
        Form: {},
        FormItem: {}
      }
    }));
    u(this, "shared", D({}));
    u(this, "shareHistory", /* @__PURE__ */ new Map());
    u(this, "specialFormIdPrefix", "");
    this.setup = e, this.processor = new Er(this);
    const t = this.setup(this);
    this.ui = t.ui ?? c.presets.ui, this.runtimeAdapter = new wr(this.ui), this.specialFormIdPrefix = t.specialFormIdPrefix ?? "", Object.assign(this.globalNativeFormOverride, this.runtimeAdapter.getRuntimeNative()), T(t.schemas) ? E(
      // @ts-expect-error
      () => t.schemas.value,
      () => {
        this.processor.parseSchemas(t.schemas.value);
      },
      {
        deep: !0
      }
    ) : U(t.schemas) ? E(() => t.schemas, () => {
      this.processor.parseSchemas(t.schemas);
    }, {
      deep: !0
    }) : this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    return {
      model: M(C(this.model.value)),
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (t) => {
        S(() => {
          Object.keys(t).forEach((i) => {
            T(t[i]) ? K(() => {
              y(this.shared, i, t[i].value), this.shareHistory.get(i) !== t[i].value && (this.shareHistory.set(i, t[i].value), this.processor.schemaEffect.triggerEffects());
            }) : U(t[i]) ? K(() => {
              y(this.shared, i, t[i]), this.shareHistory.get(i) !== t[i] && (this.shareHistory.set(i, t[i]), this.processor.schemaEffect.triggerEffects());
            }) : (y(this.shared, i, t[i]), this.shareHistory.get(i) !== t[i] && (this.shareHistory.set(i, t[i]), this.processor.schemaEffect.triggerEffects()));
          });
        });
      }
    };
  }
  runtimeItemProcessor(e, t, i = this.model.value, s) {
    var le, ue, ce, fe, de, he, pe, me, ge, Pe, ve, be, ye, _e, Ce, Ie, Se, Fe, Oe, Ee, we, je, xe, Re, Me, $e;
    const n = M(e.component);
    if (!n)
      return;
    (ue = (le = e.native) == null ? void 0 : le.props) != null && ue.Form && P(this.globalNativeFormOverride.props.Form, (fe = (ce = e.native) == null ? void 0 : ce.props) == null ? void 0 : fe.Form), (he = (de = e.native) == null ? void 0 : de.slots) != null && he.FormItem && P(this.globalNativeFormOverride.slots.FormItem, (me = (pe = e.native) == null ? void 0 : pe.slots) == null ? void 0 : me.FormItem);
    const o = P(C((Pe = (ge = this.native) == null ? void 0 : ge.slots) == null ? void 0 : Pe.FormItem) ?? {}, (be = (ve = e.native) == null ? void 0 : ve.slots) == null ? void 0 : be.FormItem), l = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    };
    let f = {
      ...(_e = (ye = e.native) == null ? void 0 : ye.props) == null ? void 0 : _e.FormItem
    };
    G((Se = (Ie = (Ce = e.native) == null ? void 0 : Ce.props) == null ? void 0 : Ie.FormItem) == null ? void 0 : Se.tooltip) && (f = {
      ...(Oe = (Fe = e.native) == null ? void 0 : Fe.props) == null ? void 0 : Oe.FormItem,
      tooltip: (je = (we = (Ee = e.native) == null ? void 0 : Ee.props) == null ? void 0 : we.FormItem) == null ? void 0 : je.tooltip()
    });
    const d = P(C((Re = (xe = this.native) == null ? void 0 : xe.props) == null ? void 0 : Re.FormItem) ?? {}, f), h = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: s,
      index: t
    }), p = n.name, b = e.componentProps ?? {}, H = I.placeholderPresetByComponentName;
    let g = G(e.placeholder) ? e.placeholder() : e.placeholder, v = e.show;
    v === void 0 && (v = !0);
    let F = (G(e.label) ? e.label() : e.label) ?? "", O;
    e.runtime ? O = e.runtime : O = (s == null ? void 0 : s.runtime) ?? this.runtime, !a.isUndefined(t) && !a.isObjectEmpty(O) && (F = k((Me = O == null ? void 0 : O.customizeListItemLabel) == null ? void 0 : Me.call(O, e.label ?? "", t + 1), "")), F = c.translateLabel(F), a.isString(g) && (g = c.translateMessage(g)), g || (g = c.buildPlaceholder(p, F, H));
    const We = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: F
    }), Xe = x.getItemContainer(this), Ye = x.getFormItemContainer(this), Ze = this, Je = e.componentSlots, _ = ($e = c.presets.uiPresets[this.ui]) == null ? void 0 : $e.display;
    let Z;
    return !a.isUndefined(_ == null ? void 0 : _.labelPrefix) && !a.isNull(_ == null ? void 0 : _.labelPrefix) ? Z = `${F}${_ == null ? void 0 : _.labelPrefix}` : Z = `${F}:`, m("div", {
      style: l
    }, [m(Xe, {
      show: v,
      schema: e,
      id: t ? `${this.specialFormIdPrefix}${e.field}-${t}` : `${this.specialFormIdPrefix}${e.field}`
    }, {
      default() {
        return v && m(Ye, q(d, {
          label: `${F ? Z : ""}`
        }, h, We), {
          default() {
            return Ze.runtimeAdapter.formComponentRenderer({
              Component: n,
              schema: e,
              baseModel: i,
              placeholder: g,
              componentSlots: Je,
              props: b
            });
          },
          ...o
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
    }, s = x.getGroupContainer(this);
    let n = e.show;
    return n === void 0 && (n = !0), m("div", {
      style: i
    }, [n && m(s, {
      schema: e
    }, jr(t = e.children.map((o) => this.runtimeItemProcessor(o))) ? t : {
      default: () => [t]
    })]);
  }
  addListItem(e) {
    var t;
    (t = this.processor.stableModel[e.field]) != null && t[0] && this.model.value[e.field].push(C(this.processor.stableModel[e.field][0])), this.runtimeAdapter.clearValidate(this);
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
    const n = x.getListContainer(this), o = x.getListItemContainer(this);
    return m("div", {
      style: t
    }, [s && m(n, {
      schema: e
    }, {
      default() {
        return i.model.value[e.field].map((l, f) => m(o, null, {
          default() {
            return e.children.map((d) => i.runtimeItemProcessor(d, f, l, e));
          },
          delete({
            container: d
          } = {}) {
            var p;
            const h = d ?? m("button", null, null);
            return ke(m(h, {
              onClick: () => i.deleteListItem(e, f)
            }, null), [[et, ((p = i.model.value[e.field]) == null ? void 0 : p.length) > 1]]);
          }
        }));
      },
      add({
        container: l
      } = {}) {
        const f = l ?? m("button", null, [tt("添加")]);
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
    var l, f, d, h;
    const e = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.grid
    }, t = this, i = P(this.globalNativeFormOverride.props.Form, C((f = (l = this.native) == null ? void 0 : l.props) == null ? void 0 : f.Form) ?? {}), s = P(this.globalNativeFormOverride.slots.Form, C((h = (d = this.native) == null ? void 0 : d.slots) == null ? void 0 : h.Form) ?? {}), n = x.getFormContainer(this), o = this.runtimeAdapter.getFormModelPropName();
    return m(n, q(i, {
      ref: this.formRef
    }, {
      [o]: this.model.value
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
  static setPresets(e) {
    var i, s;
    this.presets = e;
    const t = (s = (i = e.i18n) == null ? void 0 : i.localeRef) == null ? void 0 : s.value;
    t && this.ensureLocalePackLoaded(t);
  }
  static getPreset(e) {
    var t, i, s;
    return (i = (t = this.presets.uiPresets) == null ? void 0 : t[e]) != null && i.extend ? this.presets.uiPresets[(s = this.presets.uiPresets[e]) == null ? void 0 : s.extend] : this.presets.uiPresets[e];
  }
  static getUI(e) {
    var t, i, s;
    return (i = (t = this.presets.uiPresets) == null ? void 0 : t[e]) != null && i.extend ? (s = this.presets.uiPresets[e]) == null ? void 0 : s.extend : e;
  }
  static getI18nConfig() {
    var e;
    return (e = this.presets) == null ? void 0 : e.i18n;
  }
  static getCurrentLocale() {
    var e, t;
    return ((t = (e = this.getI18nConfig()) == null ? void 0 : e.localeRef) == null ? void 0 : t.value) ?? "";
  }
  static getLocalePack(e = this.getCurrentLocale()) {
    var i;
    const t = this.getI18nConfig();
    if ((i = t == null ? void 0 : t.versionRef) == null || i.value, this.internalI18nVersion.value, !!e)
      return this.ensureLocalePackLoaded(e), this.localePackCache[e];
  }
  static async ensureLocalePackLoaded(e = this.getCurrentLocale()) {
    const t = this.getI18nConfig();
    if (!(t != null && t.loadLocalePack) || !e)
      return this.localePackCache[e];
    if (this.localePackCache[e])
      return this.localePackCache[e];
    const i = this.localePackPromiseCache.get(e);
    if (i)
      return i;
    const s = t.loadLocalePack(e).then((n) => (n && (this.localePackCache[e] = n), this.localePackCache[e])).catch(() => {
    }).finally(() => {
      this.localePackPromiseCache.delete(e), this.internalI18nVersion.value += 1;
    });
    return this.localePackPromiseCache.set(e, s), s;
  }
  static formatTemplate(e, t) {
    return Object.entries(t).reduce((i, [s, n]) => i.split(`{${s}}`).join(`${n ?? ""}`), e);
  }
  static translateMessage(e) {
    var i;
    if (!e)
      return e ?? "";
    const t = this.getLocalePack();
    return ((i = t == null ? void 0 : t.messages) == null ? void 0 : i[e]) ?? e;
  }
  static translateLabel(e) {
    var s, n, o;
    if (!e)
      return e ?? "";
    const t = this.getCurrentLocale(), i = this.getLocalePack(t);
    return ((n = (s = this.getI18nConfig()) == null ? void 0 : s.translateLabel) == null ? void 0 : n.call(s, e, {
      locale: t,
      pack: i
    })) ?? ((o = i == null ? void 0 : i.messages) == null ? void 0 : o[e]) ?? e;
  }
  static buildRequiredMessage(e) {
    var n;
    const t = this.translateLabel(e), i = this.getLocalePack(), s = (n = i == null ? void 0 : i.templates) == null ? void 0 : n.required;
    return s ? this.formatTemplate(s, {
      label: t
    }) : `${t}是必填项`;
  }
  static buildPlaceholder(e, t, i) {
    const s = this.translateLabel(t), n = this.getLocalePack(), o = (n == null ? void 0 : n.placeholderPrefixByComponentName) ?? i ?? {};
    let l = this.translateMessage("请输入") || "请输入";
    if (!e)
      return this.applyPlaceholderTemplate(l, s);
    const f = e.toLowerCase();
    return o[f] ? (l = o[f], this.applyPlaceholderTemplate(l, s)) : (Object.keys(o).forEach((d) => {
      f.includes(d.toLowerCase()) && (l = o[d]);
    }), this.applyPlaceholderTemplate(l, s));
  }
  static applyPlaceholderTemplate(e, t) {
    var n;
    const i = this.getLocalePack(), s = (n = i == null ? void 0 : i.templates) == null ? void 0 : n.placeholder;
    return s ? this.formatTemplate(s, {
      prefix: e,
      label: t
    }) : `${e}${t}`;
  }
}
u(c, "presets"), u(c, "localePackCache", D({})), u(c, "localePackPromiseCache", /* @__PURE__ */ new Map()), u(c, "internalI18nVersion", L(0));
function Q(r) {
  return a.isString(r.required) ? c.translateMessage(r.required) : a.isFunction(r.required) ? r.required() : c.buildRequiredMessage(r.label);
}
function A({
  parentSchema: r,
  schema: e,
  index: t
}) {
  return r ? `${r.field}.${t}.${e.field}` : e.field;
}
const Rr = {
  ArcoVue: {
    getRuntimeField(r) {
      const e = A(r);
      return a.isFunction(e) ? {
        field: e()
      } : {
        field: e
      };
    },
    getRuntimeRequired(r) {
      let e = c.buildRequiredMessage(r.label);
      if (r.required)
        if (e = Q(r), !r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: e
          });
        else {
          const t = r.rules.findIndex((i) => !a.isUndefined(i.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = e) : r.rules.unshift({
            required: !0,
            message: e
          });
        }
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
      let o;
      return a.isFunction(t.field) ? o = B(e, t.field()) : o = e[t.field], m(r, q({
        modelValue: o,
        "onUpdate:modelValue": (l) => {
          a.isFunction(t.field) ? y(e, t.field(), l) : e[t.field] = l;
        },
        placeholder: i
      }, n), {
        ...s
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((i) => i ? t(i) : e(r.cleanFallbackFields(M(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      var e, t;
      (t = (e = r.formRef.value) == null ? void 0 : e.clearValidate) == null || t.call(e);
    }
  },
  NutUI: {
    getRuntimeField(r) {
      const e = A(r);
      return a.isFunction(e) ? {
        prop: e()
      } : {
        prop: e
      };
    },
    getRuntimeRequired(r) {
      let e = c.buildRequiredMessage(r.label);
      if (r.required)
        if (e = Q(r), !r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: e
          });
        else {
          const t = r.rules.findIndex((i) => !a.isUndefined(i.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = e) : r.rules.unshift({
            required: !0,
            message: e
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
      placeholder: i,
      componentSlots: s,
      props: n
    }) {
      let o;
      return a.isFunction(t.field) ? o = B(e, t.field()) : o = e[t.field], m(r, q({
        modelValue: o,
        "onUpdate:modelValue": (l) => {
          a.isFunction(t.field) ? y(e, t.field(), l) : e[t.field] = l;
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
          i ? e(r.cleanFallbackFields(M(r.runtimeCore.processor.processedModel.value))) : t(s);
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
      const e = A(r);
      return a.isFunction(e) ? {
        path: e()
      } : {
        path: e
      };
    },
    getRuntimeRequired(r) {
      let e = c.buildRequiredMessage(r.label);
      if (r.required)
        if (e = Q(r), !r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: e,
            trigger: ["input", "blur"]
          });
        else {
          const t = r.rules.findIndex((i) => !a.isUndefined(i.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = e) : r.rules.unshift({
            required: !0,
            message: e,
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
      placeholder: i,
      componentSlots: s,
      props: n
    }) {
      let o;
      return a.isFunction(t.field) ? o = B(e, t.field()) : o = e[t.field], m(r, q({
        value: o,
        "onUpdate:value": (l) => {
          a.isFunction(t.field) ? y(e, t.field(), l) : e[t.field] = l;
        },
        placeholder: i
      }, n), {
        ...s
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((i) => i ? t(i) : e(r.cleanFallbackFields(M(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      var e, t;
      (t = (e = r.formRef.value) == null ? void 0 : e.restoreValidation) == null || t.call(e);
    }
  }
}, R = class R {
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
u(R, "schemaPreset", {
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
}), u(R, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
u(R, "placeholderPresetByComponentName", R.getPlaceholderPrefixPresetByComponentName());
let te = R;
const I = {
  ...te,
  adapters: {
    ...Rr
  }
}, Vr = /* @__PURE__ */ it({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(r) {
    const e = new xr(r.setup);
    return () => e.exec();
  }
});
function Nr(r) {
  console.log("new ffffffffffff========123===");
  const e = new Or(r);
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
function Lr(r) {
  c.setPresets(r);
}
function ae(r, e) {
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
function qr(r) {
  return ae(r, "native");
}
function Tr(r) {
  return r.__proform_raw_object = !0, r;
}
function Ur(r) {
  return ae(r, "onetime");
}
function zr(r) {
  function e() {
    return r;
  }
  return ae(
    e,
    "structured_path_parsing_mark"
  );
}
export {
  Vr as ProForm,
  qr as markNativeFunction,
  Tr as markNativeObject,
  Ur as markOnetimeFunction,
  zr as markStructuredPathParsing,
  Nr as useForm,
  Lr as useFormPresetConfigurer,
  ae as useModifiers
};
