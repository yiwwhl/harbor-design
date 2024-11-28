var Ae = Object.defineProperty;
var ke = (r, e, t) => e in r ? Ae(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var l = (r, e, t) => (ke(r, typeof e != "symbol" ? e + "" : e, t), t);
import { ref as D, readonly as Ne, nextTick as S, isRef as z, watch as O, isReactive as L, watchEffect as K, toRaw as M, reactive as J, createVNode as m, mergeProps as T, withDirectives as et, vShow as tt, createTextVNode as rt, isVNode as it, defineComponent as st } from "vue";
var nt = typeof global == "object" && global && global.Object === Object && global, ot = typeof self == "object" && self && self.Object === Object && self, re = nt || ot || Function("return this")(), V = re.Symbol, He = Object.prototype, at = He.hasOwnProperty, lt = He.toString, q = V ? V.toStringTag : void 0;
function ut(r) {
  var e = at.call(r, q), t = r[q];
  try {
    r[q] = void 0;
    var i = !0;
  } catch {
  }
  var s = lt.call(r);
  return i && (e ? r[q] = t : delete r[q]), s;
}
var ft = Object.prototype, ct = ft.toString;
function dt(r) {
  return ct.call(r);
}
var ht = "[object Null]", pt = "[object Undefined]", Ue = V ? V.toStringTag : void 0;
function De(r) {
  return r == null ? r === void 0 ? pt : ht : Ue && Ue in Object(r) ? ut(r) : dt(r);
}
function mt(r) {
  return r != null && typeof r == "object";
}
var gt = "[object Symbol]";
function ie(r) {
  return typeof r == "symbol" || mt(r) && De(r) == gt;
}
function vt(r, e) {
  for (var t = -1, i = r == null ? 0 : r.length, s = Array(i); ++t < i; )
    s[t] = e(r[t], t, r);
  return s;
}
var se = Array.isArray, bt = 1 / 0, qe = V ? V.prototype : void 0, Te = qe ? qe.toString : void 0;
function Ge(r) {
  if (typeof r == "string")
    return r;
  if (se(r))
    return vt(r, Ge) + "";
  if (ie(r))
    return Te ? Te.call(r) : "";
  var e = r + "";
  return e == "0" && 1 / r == -bt ? "-0" : e;
}
function W(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
var yt = "[object AsyncFunction]", _t = "[object Function]", Pt = "[object GeneratorFunction]", It = "[object Proxy]";
function G(r) {
  if (!W(r))
    return !1;
  var e = De(r);
  return e == _t || e == Pt || e == yt || e == It;
}
var Q = re["__core-js_shared__"], ze = function() {
  var r = /[^.]+$/.exec(Q && Q.keys && Q.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function Ct(r) {
  return !!ze && ze in r;
}
var St = Function.prototype, Ft = St.toString;
function Et(r) {
  if (r != null) {
    try {
      return Ft.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
var Ot = /[\\^$.*+?()[\]{}|]/g, wt = /^\[object .+?Constructor\]$/, jt = Function.prototype, xt = Object.prototype, Rt = jt.toString, $t = xt.hasOwnProperty, Mt = RegExp(
  "^" + Rt.call($t).replace(Ot, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Vt(r) {
  if (!W(r) || Ct(r))
    return !1;
  var e = G(r) ? Mt : wt;
  return e.test(Et(r));
}
function Nt(r, e) {
  return r == null ? void 0 : r[e];
}
function ne(r, e) {
  var t = Nt(r, e);
  return Vt(t) ? t : void 0;
}
var Le = function() {
  try {
    var r = ne(Object, "defineProperty");
    return r({}, "", {}), r;
  } catch {
  }
}(), Ut = 9007199254740991, qt = /^(?:0|[1-9]\d*)$/;
function Tt(r, e) {
  var t = typeof r;
  return e = e ?? Ut, !!e && (t == "number" || t != "symbol" && qt.test(r)) && r > -1 && r % 1 == 0 && r < e;
}
function zt(r, e, t) {
  e == "__proto__" && Le ? Le(r, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : r[e] = t;
}
function Be(r, e) {
  return r === e || r !== r && e !== e;
}
var Lt = Object.prototype, Ht = Lt.hasOwnProperty;
function Dt(r, e, t) {
  var i = r[e];
  (!(Ht.call(r, e) && Be(i, t)) || t === void 0 && !(e in r)) && zt(r, e, t);
}
var Gt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Bt = /^\w*$/;
function Kt(r, e) {
  if (se(r))
    return !1;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || ie(r) ? !0 : Bt.test(r) || !Gt.test(r) || e != null && r in Object(e);
}
var H = ne(Object, "create");
function Wt() {
  this.__data__ = H ? H(null) : {}, this.size = 0;
}
function Xt(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
var Yt = "__lodash_hash_undefined__", Zt = Object.prototype, Jt = Zt.hasOwnProperty;
function Qt(r) {
  var e = this.__data__;
  if (H) {
    var t = e[r];
    return t === Yt ? void 0 : t;
  }
  return Jt.call(e, r) ? e[r] : void 0;
}
var At = Object.prototype, kt = At.hasOwnProperty;
function er(r) {
  var e = this.__data__;
  return H ? e[r] !== void 0 : kt.call(e, r);
}
var tr = "__lodash_hash_undefined__";
function rr(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = H && e === void 0 ? tr : e, this;
}
function j(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
j.prototype.clear = Wt;
j.prototype.delete = Xt;
j.prototype.get = Qt;
j.prototype.has = er;
j.prototype.set = rr;
function ir() {
  this.__data__ = [], this.size = 0;
}
function X(r, e) {
  for (var t = r.length; t--; )
    if (Be(r[t][0], e))
      return t;
  return -1;
}
var sr = Array.prototype, nr = sr.splice;
function or(r) {
  var e = this.__data__, t = X(e, r);
  if (t < 0)
    return !1;
  var i = e.length - 1;
  return t == i ? e.pop() : nr.call(e, t, 1), --this.size, !0;
}
function ar(r) {
  var e = this.__data__, t = X(e, r);
  return t < 0 ? void 0 : e[t][1];
}
function lr(r) {
  return X(this.__data__, r) > -1;
}
function ur(r, e) {
  var t = this.__data__, i = X(t, r);
  return i < 0 ? (++this.size, t.push([r, e])) : t[i][1] = e, this;
}
function N(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
N.prototype.clear = ir;
N.prototype.delete = or;
N.prototype.get = ar;
N.prototype.has = lr;
N.prototype.set = ur;
var fr = ne(re, "Map");
function cr() {
  this.size = 0, this.__data__ = {
    hash: new j(),
    map: new (fr || N)(),
    string: new j()
  };
}
function dr(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
function Y(r, e) {
  var t = r.__data__;
  return dr(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function hr(r) {
  var e = Y(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
function pr(r) {
  return Y(this, r).get(r);
}
function mr(r) {
  return Y(this, r).has(r);
}
function gr(r, e) {
  var t = Y(this, r), i = t.size;
  return t.set(r, e), this.size += t.size == i ? 0 : 1, this;
}
function x(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
x.prototype.clear = cr;
x.prototype.delete = hr;
x.prototype.get = pr;
x.prototype.has = mr;
x.prototype.set = gr;
var vr = "Expected a function";
function oe(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(vr);
  var t = function() {
    var i = arguments, s = e ? e.apply(this, i) : i[0], n = t.cache;
    if (n.has(s))
      return n.get(s);
    var a = r.apply(this, i);
    return t.cache = n.set(s, a) || n, a;
  };
  return t.cache = new (oe.Cache || x)(), t;
}
oe.Cache = x;
var br = 500;
function yr(r) {
  var e = oe(r, function(i) {
    return t.size === br && t.clear(), i;
  }), t = e.cache;
  return e;
}
var _r = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Pr = /\\(\\)?/g, Ir = yr(function(r) {
  var e = [];
  return r.charCodeAt(0) === 46 && e.push(""), r.replace(_r, function(t, i, s, n) {
    e.push(s ? n.replace(Pr, "$1") : i || t);
  }), e;
});
function Cr(r) {
  return r == null ? "" : Ge(r);
}
function Ke(r, e) {
  return se(r) ? r : Kt(r, e) ? [r] : Ir(Cr(r));
}
var Sr = 1 / 0;
function We(r) {
  if (typeof r == "string" || ie(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -Sr ? "-0" : e;
}
function Fr(r, e) {
  e = Ke(e, r);
  for (var t = 0, i = e.length; r != null && t < i; )
    r = r[We(e[t++])];
  return t && t == i ? r : void 0;
}
function B(r, e, t) {
  var i = r == null ? void 0 : Fr(r, e);
  return i === void 0 ? t : i;
}
function Er(r, e, t, i) {
  if (!W(r))
    return r;
  e = Ke(e, r);
  for (var s = -1, n = e.length, a = n - 1, u = r; u != null && ++s < n; ) {
    var f = We(e[s]), c = t;
    if (f === "__proto__" || f === "constructor" || f === "prototype")
      return r;
    if (s != a) {
      var h = u[f];
      c = i ? i(h, f, u) : void 0, c === void 0 && (c = W(h) ? h : Tt(e[s + 1]) ? [] : {});
    }
    Dt(u, f, c), u = u[f];
  }
  return r;
}
function _(r, e, t) {
  return r == null ? r : Er(r, e, t);
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
function v(r, ...e) {
  return e.forEach((t) => {
    if (Array.isArray(t))
      r = [...t];
    else
      for (const i in t)
        t.hasOwnProperty(i) && t[i] !== void 0 && (typeof t[i] == "object" && t[i] !== null && !(t[i] instanceof Date) && !(t[i] instanceof RegExp) ? Array.isArray(t[i]) ? r[i] = [...t[i]] : r[i] = v(r[i] || {}, t[i]) : r[i] = t[i]);
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
function k(r, e) {
  return r.replace(/undefined/g, e);
}
class Or {
  constructor(e) {
    l(this, "runtimeCore");
    l(this, "readonlyReactiveModel", D({}));
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
    return this.runtimeCore = e, this.readonlyReactiveModel.value = Ne(e.model.value), Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var i;
    const e = (i = d.getPreset(this.runtimeCore.ui)) == null ? void 0 : i.adapter, t = C.adapters[d.getUI(this.runtimeCore.ui)];
    return (e == null ? void 0 : e.validateForm(this)) ?? (t == null ? void 0 : t.validateForm(this));
  }
  hydrate(e) {
    S(() => {
      this.runtimeCore.hydrateEffect.trackEffect(
        () => {
          z(e) ? O(
            () => e.value,
            () => {
              v(this.runtimeCore.model.value, e.value);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : L(e) ? O(
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
    S(() => {
      Object.keys(e).forEach((t) => {
        z(e[t]) ? K(() => {
          _(this.runtimeCore.shared, t, e[t].value), this.shareHistory.get(t) !== e[t].value && (this.shareHistory.set(t, e[t].value), this.runtimeCore.processor.schemaEffect.triggerEffects());
        }) : L(e[t]) ? K(() => {
          _(this.runtimeCore.shared, t, e[t]), this.shareHistory.get(t) !== e[t] && (this.shareHistory.set(t, e[t]), this.runtimeCore.processor.schemaEffect.triggerEffects());
        }) : (_(this.runtimeCore.shared, t, e[t]), this.shareHistory.get(t) !== e[t] && (this.shareHistory.set(t, e[t]), this.runtimeCore.processor.schemaEffect.triggerEffects()));
      });
    });
  }
  subscribeModel(e) {
    S(() => {
      const t = O(
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
    (e = this.runtimeCore) != null && e.model.value && (this.runtimeCore.model.value = I(
      this.runtimeCore.processor.stableModel
    ), this.readonlyReactiveModel.value = Ne(this.runtimeCore.model.value), this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore));
  }
}
class ee {
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
    return t.identifier ? this.identifierMap.get(t.identifier) || (this.identifierMap.set(t.identifier, !0), !t.lazy && e(), this.effects.add(e)) : (!t.lazy && e(), this.effects.add(e)), () => this.effects.delete(e);
  }
}
class wr {
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
    l(this, "schemaEffect", new ee());
    l(this, "defaultValueEffect", new ee());
    l(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    l(this, "baseDefaultValueFunctionsLength");
    l(this, "isModelInitialized", !0);
    l(this, "schemaEffectHistory", /* @__PURE__ */ new Map());
    l(this, "stableUpdaterHistory", /* @__PURE__ */ new Map());
    this.runtimeCore = e, this.processedSchemas = e.schemas, this.processedModel = e.model, this.getRuntimeMeta = e.getRuntimeMeta.bind(e), O(
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
    if (!o.isUndefined(e.stable) && !o.isNull(e.stable))
      t[e.key] = this.parseStable(e.stable);
    else
      return e;
    return t;
  }
  // 对于稳定初始化更新的抽象
  stableUpdater(e = [], t, i, s, n) {
    if (e.every(Boolean)) {
      const a = M(this.processedSchemas.value);
      !o.isProcessInprogress(a) && o.isObjectEmpty(this.stableModel), !this.stableUpdaterHistory.get(
        `${t == null ? void 0 : t.key}parentIndex:${t == null ? void 0 : t.index}childIndex:${i}${s}${n}`
      ) && (this.stableUpdaterHistory.set(
        `${t == null ? void 0 : t.key}parentIndex:${t == null ? void 0 : t.index}childIndex:${i}${s}${n}`,
        !0
      ), this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: a.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(a));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, t, i) {
    const s = this, n = Array.from({
      length: Object.keys(e).filter((u) => u !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: a, parentMeta: i });
    function a(u) {
      const f = u.index, c = u.key, h = u.keyIndex;
      if (o.isUndefined(u.stable) || o.isNull(u.stable))
        return;
      const p = s.parseStable(u.stable), y = i == null ? void 0 : i.index, w = i == null ? void 0 : i.key;
      let g = p;
      if (o.isProcessInprogress(g) || (n[h] = !0), i) {
        const b = s.processedSchemas.value[y][w][f][c];
        b && o.isObject(b) && c !== "component" && (g = v(b, g)), s.processedSchemas.value[y][w][f][c] = g, s.stableUpdater(
          n,
          i,
          t,
          c,
          f
        );
      } else {
        const b = s.processedSchemas.value[f][c];
        b && o.isObject(b) && c !== "component" && (g = v(b, g)), s.processedSchemas.value[f][c] = g, s.stableUpdater(
          n,
          i,
          t,
          c,
          f
        );
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
        const f = (c) => {
          e.updater({
            ...e,
            key: s,
            keyIndex: n,
            stable: c
          });
        };
        o.isFunction(t[s]) ? s !== "defaultValue" ? this.schemaEffect.trackEffect(
          () => {
            if (s === "component") {
              const c = t[s](this.getRuntimeMeta());
              this.promiseFieldParser(c, f, !1, {
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
            identifier: `${(a = e.parentMeta) == null ? void 0 : a.key}parentIndex:${(u = e.parentMeta) == null ? void 0 : u.index}childIndex:${e.index}${s}${n}`
          }
        ) : this.defaultValueEffect.trackEffect(
          () => {
            const c = this.schemaEffect.trackEffect(
              () => {
                /\{\s*model\s*\}/.test(t[s].toString()) ? this.fieldParser(
                  t[s],
                  (h) => {
                    if (!h)
                      return f(h);
                    this.defaultValueInprogressMap.set(t[s], h), !o.isProcessInprogress(h) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                      this.defaultValueInprogressMap.values()
                    ).every((p) => {
                      var y;
                      return !((y = p == null ? void 0 : p.includes) != null && y.call(p, "undefined"));
                    }) ? (f(h), this.defaultValueEffect.clearEffects(), S(() => {
                      c();
                    })) : f(h);
                  },
                  {
                    rootIndex: e.index,
                    parentMeta: e.parentMeta
                  }
                ) : this.fieldParser(
                  t[s],
                  (h) => {
                    this.defaultValueInprogressMap.set(t[s], h), !o.isProcessInprogress(h) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                      this.defaultValueInprogressMap.values()
                    ).every((p) => {
                      var y;
                      return !((y = p == null ? void 0 : p.includes) != null && y.call(p, "undefined"));
                    }) ? (f(h), this.defaultValueEffect.clearEffects(), S(() => {
                      c();
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
    o.isPromise(e) ? e.then((n) => {
      o.isString(n) && (n = k(n, "")), i && o.isObject(n) && !o.isNativeObject(n) ? this.objectParser({
        data: n,
        updater: t,
        index: s.rootIndex,
        parentMeta: s.parentMeta
      }) : t(n);
    }) : (o.isString(e) && (e = k(e, "")), i && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
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
      z(e) ? O(
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
      ) : L(e) ? O(
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
    e.map((t) => {
      this.createModel(t, this.processedModel.value);
    }), o.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && S(() => {
      this.stableModel = I(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects();
    });
  }
  setModel(e, t, i) {
    o.isFunction(t) ? _(e, t(), i) : v(e, {
      [t]: i
    });
  }
  createModel(e, t) {
    o.isListSchema(e) && (t[e.field] || this.setModel(t, e.field, [{}]), e.children.forEach((i) => {
      this.createModel(i, t[e.field][0]);
    })), o.isGroupSchema(e) && e.children.forEach((i) => {
      this.createModel(i, t);
    }), o.isItemSchema(e) && S(() => {
      if ("defaultValue" in e && !t[e.field])
        this.setModel(t, e.field, e.defaultValue);
      else {
        if (o.isFunction(e.field) && B(t, e.field()))
          return;
        if (o.isString(e.field) && t[e.field])
          return;
        this.setModel(t, e.field, void 0);
      }
    });
  }
}
class R {
  static getFormContainer({ ui: e } = {}) {
    return d.presets.uiPresets[e ?? d.presets.ui].container.Form;
  }
  static getFormItemContainer({ ui: e } = {}) {
    return d.presets.uiPresets[e ?? d.presets.ui].container.FormItem;
  }
  static getItemContainer({ ui: e } = {}) {
    return d.presets.uiPresets[e ?? d.presets.ui].container.Item;
  }
  static getGroupContainer({ ui: e } = {}) {
    return d.presets.uiPresets[e ?? d.presets.ui].container.Group;
  }
  static getListContainer({ ui: e } = {}) {
    return d.presets.uiPresets[e ?? d.presets.ui].container.List;
  }
  static getListItemContainer({ ui: e } = {}) {
    return d.presets.uiPresets[e ?? d.presets.ui].container.ListItem;
  }
}
class jr {
  constructor(e) {
    this.ui = e;
  }
  getRuntimeNative() {
    var t;
    return (t = d.presets.uiPresets[this.ui]) == null ? void 0 : t.native;
  }
  getRuntimeField(e) {
    var s;
    const t = (s = d.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[d.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeField(e)) ?? (i == null ? void 0 : i.getRuntimeField(e));
  }
  getRuntimeRequired(e) {
    var s;
    const t = (s = d.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[d.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeRequired(e)) ?? (i == null ? void 0 : i.getRuntimeRequired(e));
  }
  getFormModelPropName() {
    var i;
    const e = (i = d.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, t = C.adapters[d.getUI(this.ui)];
    return (e == null ? void 0 : e.getFormModelPropName()) ?? (t == null ? void 0 : t.getFormModelPropName());
  }
  formComponentRenderer(e) {
    var s;
    const t = (s = d.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[d.getUI(this.ui)];
    return (t == null ? void 0 : t.formComponentRenderer(e)) ?? (i == null ? void 0 : i.formComponentRenderer(e));
  }
  clearValidate(e) {
    var s;
    const t = (s = d.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[d.getUI(this.ui)];
    return (t == null ? void 0 : t.clearValidate(e)) ?? (i == null ? void 0 : i.clearValidate(e));
  }
}
function xr(r) {
  return typeof r == "function" || Object.prototype.toString.call(r) === "[object Object]" && !it(r);
}
class Rr {
  constructor(e) {
    l(this, "schemas", D([]));
    l(this, "model", D({}));
    l(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    l(this, "formRef", D(null));
    l(this, "hydrateEffect", new ee());
    l(this, "native", J({}));
    l(this, "grid", {});
    l(this, "runtime", {});
    l(this, "globalNativeFormOverride", J({
      props: {
        Form: {},
        FormItem: {}
      },
      slots: {
        Form: {},
        FormItem: {}
      }
    }));
    l(this, "shared", J({}));
    l(this, "shareHistory", /* @__PURE__ */ new Map());
    this.setup = e, this.processor = new wr(this);
    const t = this.setup(this);
    this.ui = t.ui ?? d.presets.ui, this.runtimeAdapter = new jr(this.ui), Object.assign(this.globalNativeFormOverride, this.runtimeAdapter.getRuntimeNative()), z(t.schemas) ? O(
      // @ts-expect-error
      () => t.schemas.value,
      () => {
        this.processor.parseSchemas(t.schemas.value);
      },
      {
        deep: !0
      }
    ) : L(t.schemas) ? O(() => t.schemas, () => {
      this.processor.parseSchemas(t.schemas);
    }, {
      deep: !0
    }) : this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    return {
      model: M(I(this.model.value)),
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (t) => {
        S(() => {
          Object.keys(t).forEach((i) => {
            z(t[i]) ? K(() => {
              _(this.shared, i, t[i].value), this.shareHistory.get(i) !== t[i].value && (this.shareHistory.set(i, t[i].value), this.processor.schemaEffect.triggerEffects());
            }) : L(t[i]) ? K(() => {
              _(this.shared, i, t[i]), this.shareHistory.get(i) !== t[i] && (this.shareHistory.set(i, t[i]), this.processor.schemaEffect.triggerEffects());
            }) : (_(this.shared, i, t[i]), this.shareHistory.get(i) !== t[i] && (this.shareHistory.set(i, t[i]), this.processor.schemaEffect.triggerEffects()));
          });
        });
      }
    };
  }
  runtimeItemProcessor(e, t, i = this.model.value, s) {
    var le, ue, fe, ce, de, he, pe, me, ge, ve, be, ye, _e, Pe, Ie, Ce, Se, Fe, Ee, Oe, we, je, xe, Re, $e, Me;
    const n = M(e.component);
    if (!n)
      return;
    (ue = (le = e.native) == null ? void 0 : le.props) != null && ue.Form && v(this.globalNativeFormOverride.props.Form, (ce = (fe = e.native) == null ? void 0 : fe.props) == null ? void 0 : ce.Form), (he = (de = e.native) == null ? void 0 : de.slots) != null && he.FormItem && v(this.globalNativeFormOverride.slots.FormItem, (me = (pe = e.native) == null ? void 0 : pe.slots) == null ? void 0 : me.FormItem);
    const a = v(I((ve = (ge = this.native) == null ? void 0 : ge.slots) == null ? void 0 : ve.FormItem) ?? {}, (ye = (be = e.native) == null ? void 0 : be.slots) == null ? void 0 : ye.FormItem), u = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    };
    let f = {
      ...(Pe = (_e = e.native) == null ? void 0 : _e.props) == null ? void 0 : Pe.FormItem
    };
    G((Se = (Ce = (Ie = e.native) == null ? void 0 : Ie.props) == null ? void 0 : Ce.FormItem) == null ? void 0 : Se.tooltip) && (f = {
      ...(Ee = (Fe = e.native) == null ? void 0 : Fe.props) == null ? void 0 : Ee.FormItem,
      tooltip: (je = (we = (Oe = e.native) == null ? void 0 : Oe.props) == null ? void 0 : we.FormItem) == null ? void 0 : je.tooltip()
    });
    const c = v(I((Re = (xe = this.native) == null ? void 0 : xe.props) == null ? void 0 : Re.FormItem) ?? {}, f), h = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: s,
      index: t
    }), p = n.name, y = e.componentProps ?? {}, w = C.placeholderPresetByComponentName;
    let g = G(e.placeholder) ? e.placeholder() : e.placeholder, b = e.show;
    b === void 0 && (b = !0);
    let F = (G(e.label) ? e.label() : e.label) ?? "", E;
    if (e.runtime ? E = e.runtime : E = (s == null ? void 0 : s.runtime) ?? this.runtime, !o.isUndefined(t) && !o.isObjectEmpty(E) && (F = k(($e = E == null ? void 0 : E.customizeListItemLabel) == null ? void 0 : $e.call(E, e.label ?? "", t + 1), "")), !g) {
      let U = "请输入";
      o.isUndefined(p) ? g = `${U}${F}` : /* @ts-expect-error */ w[p.toLowerCase()] ? (U = // @ts-expect-error
      w[p.toLowerCase()], g = `${U}${F}`) : (Object.keys(w).forEach((Ve) => {
        p.toLowerCase().includes(Ve.toLowerCase()) && (U = w[Ve]);
      }), g = `${U}${F}`);
    }
    const Xe = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: F
    }), Ye = R.getItemContainer(this), Ze = R.getFormItemContainer(this), Je = this, Qe = e.componentSlots, P = (Me = d.presets.uiPresets[this.ui]) == null ? void 0 : Me.display;
    let Z;
    return !o.isUndefined(P == null ? void 0 : P.labelPrefix) && !o.isNull(P == null ? void 0 : P.labelPrefix) ? Z = `${F}${P == null ? void 0 : P.labelPrefix}` : Z = `${F}:`, m("div", {
      style: u
    }, [m(Ye, {
      show: b
    }, {
      default() {
        return b && m(Ze, T(c, {
          label: `${F ? Z : ""}`
        }, h, Xe), {
          default() {
            return Je.runtimeAdapter.formComponentRenderer({
              Component: n,
              schema: e,
              baseModel: i,
              placeholder: g,
              componentSlots: Qe,
              props: y
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
    }, s = R.getGroupContainer(this);
    let n = e.show;
    return n === void 0 && (n = !0), m("div", {
      style: i
    }, [n && m(s, {
      schema: e
    }, xr(t = e.children.map((a) => this.runtimeItemProcessor(a))) ? t : {
      default: () => [t]
    })]);
  }
  addListItem(e) {
    var t;
    (t = this.processor.stableModel[e.field]) != null && t[0] && this.model.value[e.field].push(I(this.processor.stableModel[e.field][0])), this.runtimeAdapter.clearValidate(this);
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
    const n = R.getListContainer(this), a = R.getListItemContainer(this);
    return m("div", {
      style: t
    }, [s && m(n, {
      schema: e
    }, {
      default() {
        return i.model.value[e.field].map((u, f) => m(a, null, {
          default() {
            return e.children.map((c) => i.runtimeItemProcessor(c, f, u, e));
          },
          delete({
            container: c
          } = {}) {
            var p;
            const h = c ?? m("button", null, null);
            return et(m(h, {
              onClick: () => i.deleteListItem(e, f)
            }, null), [[tt, ((p = i.model.value[e.field]) == null ? void 0 : p.length) > 1]]);
          }
        }));
      },
      add({
        container: u
      } = {}) {
        const f = u ?? m("button", null, [rt("添加")]);
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
    var u, f, c, h;
    const e = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.grid
    }, t = this, i = v(this.globalNativeFormOverride.props.Form, I((f = (u = this.native) == null ? void 0 : u.props) == null ? void 0 : f.Form) ?? {}), s = v(this.globalNativeFormOverride.slots.Form, I((h = (c = this.native) == null ? void 0 : c.slots) == null ? void 0 : h.Form) ?? {}), n = R.getFormContainer(this), a = this.runtimeAdapter.getFormModelPropName();
    return m(n, T(i, {
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
class d {
  static getPreset(e) {
    var t, i, s;
    return (i = (t = this.presets.uiPresets) == null ? void 0 : t[e]) != null && i.extend ? this.presets.uiPresets[(s = this.presets.uiPresets[e]) == null ? void 0 : s.extend] : this.presets.uiPresets[e];
  }
  static getUI(e) {
    var t, i, s;
    return (i = (t = this.presets.uiPresets) == null ? void 0 : t[e]) != null && i.extend ? (s = this.presets.uiPresets[e]) == null ? void 0 : s.extend : e;
  }
}
l(d, "presets");
function A({
  parentSchema: r,
  schema: e,
  index: t
}) {
  return r ? `${r.field}.${t}.${e.field}` : e.field;
}
const $r = {
  ArcoVue: {
    getRuntimeField(r) {
      const e = A(r);
      return o.isFunction(e) ? {
        field: e()
      } : {
        field: e
      };
    },
    getRuntimeRequired(r) {
      let e = `${r.label}是必填项`;
      if (r.required)
        if (o.isString(r.required) && (e = r.required), o.isFunction(r.required) && (e = r.required()), !r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: e
          });
        else {
          const t = r.rules.findIndex((i) => !o.isUndefined(i.required));
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
      let a;
      return o.isFunction(t.field) ? a = B(e, t.field()) : a = e[t.field], m(r, T({
        modelValue: a,
        "onUpdate:modelValue": (u) => {
          o.isFunction(t.field) ? _(e, t.field(), u) : e[t.field] = u;
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
      return o.isFunction(e) ? {
        prop: e()
      } : {
        prop: e
      };
    },
    getRuntimeRequired(r) {
      let e = `${r.label}是必填项`;
      if (r.required)
        if (o.isString(r.required) && (e = r.required), !r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: e
          });
        else {
          const t = r.rules.findIndex((i) => !o.isUndefined(i.required));
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
      let a;
      return o.isFunction(t.field) ? a = B(e, t.field()) : a = e[t.field], m(r, T({
        modelValue: a,
        "onUpdate:modelValue": (u) => {
          o.isFunction(t.field) ? _(e, t.field(), u) : e[t.field] = u;
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
      return o.isFunction(e) ? {
        path: e()
      } : {
        path: e
      };
    },
    getRuntimeRequired(r) {
      let e = `${r.label}是必填项`;
      if (r.required)
        if (o.isString(r.required) && (e = r.required), !r.rules)
          r.rules = [], r.rules.push({
            required: !0,
            message: e,
            trigger: ["input", "blur"]
          });
        else {
          const t = r.rules.findIndex((i) => !o.isUndefined(i.required));
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
      let a;
      return o.isFunction(t.field) ? a = B(e, t.field()) : a = e[t.field], m(r, T({
        value: a,
        "onUpdate:value": (u) => {
          o.isFunction(t.field) ? _(e, t.field(), u) : e[t.field] = u;
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
}, $ = class $ {
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
l($, "schemaPreset", {
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
}), l($, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
l($, "placeholderPresetByComponentName", $.getPlaceholderPrefixPresetByComponentName());
let te = $;
const C = {
  ...te,
  adapters: {
    ...$r
  }
}, Nr = /* @__PURE__ */ st({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(r) {
    const e = new Rr(r.setup);
    return () => e.exec();
  }
});
function Ur(r) {
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
function qr(r) {
  d.presets = r;
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
function Tr(r) {
  return ae(r, "native");
}
function zr(r) {
  return r.__proform_raw_object = !0, r;
}
function Lr(r) {
  return ae(r, "onetime");
}
function Hr(r) {
  function e() {
    return r;
  }
  return ae(
    e,
    "structured_path_parsing_mark"
  );
}
export {
  Nr as ProForm,
  Tr as markNativeFunction,
  zr as markNativeObject,
  Lr as markOnetimeFunction,
  Hr as markStructuredPathParsing,
  Ur as useForm,
  qr as useFormPresetConfigurer,
  ae as useModifiers
};
