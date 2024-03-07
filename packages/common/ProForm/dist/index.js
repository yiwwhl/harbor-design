var Ue = Object.defineProperty;
var ze = (t, e, r) => e in t ? Ue(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var c = (t, e, r) => (ze(t, typeof e != "symbol" ? e + "" : e, r), r);
import { ref as z, readonly as _e, nextTick as v, isRef as q, watch as b, isReactive as T, toRaw as R, reactive as Pe, createVNode as m, mergeProps as x, withDirectives as Le, vShow as De, createTextVNode as Ge, isVNode as ke, defineComponent as Be } from "vue";
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
      for (const r in e) {
        if (r === "componentProps")
          return !1;
        if (e.hasOwnProperty(r) && this.isProcessInprogress(e[r]))
          return !0;
      }
    } else if (this.isArray(e)) {
      if (this.isArrayEmpty(e))
        return !0;
      for (const r of e)
        if (this.isProcessInprogress(r))
          return !0;
    }
    return !1;
  }
  static isNativeObject(e) {
    return !!e.__proform_raw_object;
  }
}
function h(t, ...e) {
  return e.forEach((r) => {
    if (Array.isArray(r))
      Array.isArray(t) || (t = []), r.forEach((s, i) => {
        typeof s == "object" && s !== null ? t[i] = h(Array.isArray(s) ? [] : {}, s) : t[i] = s;
      });
    else
      for (const s in r)
        r.hasOwnProperty(s) && (typeof r[s] == "object" && r[s] !== null ? t[s] = h(t[s] || {}, r[s]) : t[s] = r[s]);
  }), t;
}
function _(t) {
  const e = /* @__PURE__ */ new WeakMap();
  function r(s) {
    if (s === null || typeof s != "object")
      return s;
    if (s instanceof Date)
      return new Date(s);
    if (s instanceof RegExp)
      return new RegExp(s);
    if (s instanceof Map) {
      const n = /* @__PURE__ */ new Map();
      for (const [o, l] of s)
        n.set(r(o), r(l));
      return n;
    }
    if (s instanceof Set) {
      const n = /* @__PURE__ */ new Set();
      for (const o of s)
        n.add(r(o));
      return n;
    }
    if (e.has(s))
      return e.get(s);
    if (Array.isArray(s)) {
      const n = [];
      e.set(s, n);
      for (let o = 0; o < s.length; o++)
        n[o] = r(s[o]);
      return n;
    }
    const i = Object.create(Object.getPrototypeOf(s));
    e.set(s, i);
    for (const n in s)
      s.hasOwnProperty(n) && (i[n] = r(s[n]));
    return i;
  }
  return r(t);
}
function K(t, e) {
  return t.replace(/undefined/g, e);
}
class He {
  constructor(e) {
    c(this, "runtimeCore");
    c(this, "readonlyReactiveModel", z({}));
    this.formCustomization = e;
  }
  // happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
  cleanFallbackFields(e) {
    return e !== null && typeof e == "object" && (delete e.__yiwwhl_async_field_fallback, Object.values(e).forEach((r) => {
      this.cleanFallbackFields(r);
    })), e;
  }
  setup(e) {
    return this.runtimeCore = e, this.readonlyReactiveModel.value = _e(e.model.value), Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var s;
    const e = (s = d.getPreset(this.runtimeCore.ui)) == null ? void 0 : s.adapter, r = P.adapters[d.getUI(this.runtimeCore.ui)];
    return (e == null ? void 0 : e.validateForm(this)) ?? (r == null ? void 0 : r.validateForm(this));
  }
  hydrate(e) {
    v(() => {
      this.runtimeCore.hydrateEffect.trackEffect(
        () => {
          q(e) ? b(
            () => e.value,
            () => {
              h(this.runtimeCore.model.value, e.value);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : T(e) ? b(
            () => e,
            () => {
              h(this.runtimeCore.model.value, e);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : h(this.runtimeCore.model.value, e);
        },
        {
          lazy: !1
        }
      );
    });
  }
  share(e) {
    v(() => {
      if (q(e)) {
        const r = b(
          () => e.value,
          () => {
            h(this.runtimeCore.shared, e.value), this.runtimeCore.processor.schemaEffect.triggerEffects(), v(() => {
              r();
            });
          },
          {
            deep: !0,
            immediate: !0
          }
        );
      } else if (T(e)) {
        const r = b(
          () => e,
          () => {
            h(this.runtimeCore.shared, e), this.runtimeCore.processor.schemaEffect.triggerEffects(), v(() => {
              r();
            });
          },
          {
            deep: !0,
            immediate: !0
          }
        );
      } else
        h(this.runtimeCore.shared, e), this.runtimeCore.processor.schemaEffect.triggerEffects();
    });
  }
  subscribeModel(e) {
    v(() => {
      const r = b(
        () => this.readonlyReactiveModel.value,
        (s) => {
          e(s, {
            stopSubscribe() {
              v(() => {
                r();
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
    (e = this.runtimeCore) != null && e.model.value && (this.runtimeCore.model.value = _(
      this.runtimeCore.processor.stableModel
    ), this.readonlyReactiveModel.value = _e(this.runtimeCore.model.value), this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore));
  }
}
class X {
  constructor() {
    c(this, "effects", /* @__PURE__ */ new Set());
  }
  clearEffects() {
    this.effects.clear();
  }
  triggerEffects() {
    Array.from(this.effects).forEach((e) => e());
  }
  trackEffect(e, r = {
    lazy: !0
  }) {
    return !r.lazy && e(), this.effects.add(e), () => this.effects.delete(e);
  }
}
var We = typeof global == "object" && global && global.Object === Object && global, Ke = typeof self == "object" && self && self.Object === Object && self, Z = We || Ke || Function("return this")(), V = Z.Symbol, Ee = Object.prototype, Xe = Ee.hasOwnProperty, Ye = Ee.toString, M = V ? V.toStringTag : void 0;
function Ze(t) {
  var e = Xe.call(t, M), r = t[M];
  try {
    t[M] = void 0;
    var s = !0;
  } catch {
  }
  var i = Ye.call(t);
  return s && (e ? t[M] = r : delete t[M]), i;
}
var Je = Object.prototype, Qe = Je.toString;
function Ae(t) {
  return Qe.call(t);
}
var et = "[object Null]", tt = "[object Undefined]", Ce = V ? V.toStringTag : void 0;
function je(t) {
  return t == null ? t === void 0 ? tt : et : Ce && Ce in Object(t) ? Ze(t) : Ae(t);
}
function rt(t) {
  return t != null && typeof t == "object";
}
var st = "[object Symbol]";
function J(t) {
  return typeof t == "symbol" || rt(t) && je(t) == st;
}
function it(t, e) {
  for (var r = -1, s = t == null ? 0 : t.length, i = Array(s); ++r < s; )
    i[r] = e(t[r], r, t);
  return i;
}
var Q = Array.isArray, nt = 1 / 0, Ie = V ? V.prototype : void 0, Se = Ie ? Ie.toString : void 0;
function we(t) {
  if (typeof t == "string")
    return t;
  if (Q(t))
    return it(t, we) + "";
  if (J(t))
    return Se ? Se.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -nt ? "-0" : e;
}
function D(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var ot = "[object AsyncFunction]", at = "[object Function]", lt = "[object GeneratorFunction]", ut = "[object Proxy]";
function ct(t) {
  if (!D(t))
    return !1;
  var e = je(t);
  return e == at || e == lt || e == ot || e == ut;
}
var B = Z["__core-js_shared__"], Oe = function() {
  var t = /[^.]+$/.exec(B && B.keys && B.keys.IE_PROTO || "");
  return t ? "Symbol(src)_1." + t : "";
}();
function ft(t) {
  return !!Oe && Oe in t;
}
var dt = Function.prototype, pt = dt.toString;
function ht(t) {
  if (t != null) {
    try {
      return pt.call(t);
    } catch {
    }
    try {
      return t + "";
    } catch {
    }
  }
  return "";
}
var mt = /[\\^$.*+?()[\]{}|]/g, yt = /^\[object .+?Constructor\]$/, gt = Function.prototype, bt = Object.prototype, vt = gt.toString, _t = bt.hasOwnProperty, Pt = RegExp(
  "^" + vt.call(_t).replace(mt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ct(t) {
  if (!D(t) || ft(t))
    return !1;
  var e = ct(t) ? Pt : yt;
  return e.test(ht(t));
}
function It(t, e) {
  return t == null ? void 0 : t[e];
}
function A(t, e) {
  var r = It(t, e);
  return Ct(r) ? r : void 0;
}
var Fe = function() {
  try {
    var t = A(Object, "defineProperty");
    return t({}, "", {}), t;
  } catch {
  }
}(), St = 9007199254740991, Ot = /^(?:0|[1-9]\d*)$/;
function Ft(t, e) {
  var r = typeof t;
  return e = e ?? St, !!e && (r == "number" || r != "symbol" && Ot.test(t)) && t > -1 && t % 1 == 0 && t < e;
}
function Et(t, e, r) {
  e == "__proto__" && Fe ? Fe(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function Re(t, e) {
  return t === e || t !== t && e !== e;
}
var jt = Object.prototype, wt = jt.hasOwnProperty;
function Rt(t, e, r) {
  var s = t[e];
  (!(wt.call(t, e) && Re(s, r)) || r === void 0 && !(e in t)) && Et(t, e, r);
}
var Vt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, $t = /^\w*$/;
function Nt(t, e) {
  if (Q(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || J(t) ? !0 : $t.test(t) || !Vt.test(t) || e != null && t in Object(e);
}
var U = A(Object, "create");
function Mt() {
  this.__data__ = U ? U(null) : {}, this.size = 0;
}
function xt(t) {
  var e = this.has(t) && delete this.__data__[t];
  return this.size -= e ? 1 : 0, e;
}
var qt = "__lodash_hash_undefined__", Tt = Object.prototype, Ut = Tt.hasOwnProperty;
function zt(t) {
  var e = this.__data__;
  if (U) {
    var r = e[t];
    return r === qt ? void 0 : r;
  }
  return Ut.call(e, t) ? e[t] : void 0;
}
var Lt = Object.prototype, Dt = Lt.hasOwnProperty;
function Gt(t) {
  var e = this.__data__;
  return U ? e[t] !== void 0 : Dt.call(e, t);
}
var kt = "__lodash_hash_undefined__";
function Bt(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = U && e === void 0 ? kt : e, this;
}
function O(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var s = t[e];
    this.set(s[0], s[1]);
  }
}
O.prototype.clear = Mt;
O.prototype.delete = xt;
O.prototype.get = zt;
O.prototype.has = Gt;
O.prototype.set = Bt;
function Ht() {
  this.__data__ = [], this.size = 0;
}
function G(t, e) {
  for (var r = t.length; r--; )
    if (Re(t[r][0], e))
      return r;
  return -1;
}
var Wt = Array.prototype, Kt = Wt.splice;
function Xt(t) {
  var e = this.__data__, r = G(e, t);
  if (r < 0)
    return !1;
  var s = e.length - 1;
  return r == s ? e.pop() : Kt.call(e, r, 1), --this.size, !0;
}
function Yt(t) {
  var e = this.__data__, r = G(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function Zt(t) {
  return G(this.__data__, t) > -1;
}
function Jt(t, e) {
  var r = this.__data__, s = G(r, t);
  return s < 0 ? (++this.size, r.push([t, e])) : r[s][1] = e, this;
}
function $(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var s = t[e];
    this.set(s[0], s[1]);
  }
}
$.prototype.clear = Ht;
$.prototype.delete = Xt;
$.prototype.get = Yt;
$.prototype.has = Zt;
$.prototype.set = Jt;
var Qt = A(Z, "Map");
function At() {
  this.size = 0, this.__data__ = {
    hash: new O(),
    map: new (Qt || $)(),
    string: new O()
  };
}
function er(t) {
  var e = typeof t;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? t !== "__proto__" : t === null;
}
function k(t, e) {
  var r = t.__data__;
  return er(e) ? r[typeof e == "string" ? "string" : "hash"] : r.map;
}
function tr(t) {
  var e = k(this, t).delete(t);
  return this.size -= e ? 1 : 0, e;
}
function rr(t) {
  return k(this, t).get(t);
}
function sr(t) {
  return k(this, t).has(t);
}
function ir(t, e) {
  var r = k(this, t), s = r.size;
  return r.set(t, e), this.size += r.size == s ? 0 : 1, this;
}
function F(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var s = t[e];
    this.set(s[0], s[1]);
  }
}
F.prototype.clear = At;
F.prototype.delete = tr;
F.prototype.get = rr;
F.prototype.has = sr;
F.prototype.set = ir;
var nr = "Expected a function";
function ee(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(nr);
  var r = function() {
    var s = arguments, i = e ? e.apply(this, s) : s[0], n = r.cache;
    if (n.has(i))
      return n.get(i);
    var o = t.apply(this, s);
    return r.cache = n.set(i, o) || n, o;
  };
  return r.cache = new (ee.Cache || F)(), r;
}
ee.Cache = F;
var or = 500;
function ar(t) {
  var e = ee(t, function(s) {
    return r.size === or && r.clear(), s;
  }), r = e.cache;
  return e;
}
var lr = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ur = /\\(\\)?/g, cr = ar(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(lr, function(r, s, i, n) {
    e.push(i ? n.replace(ur, "$1") : s || r);
  }), e;
});
function fr(t) {
  return t == null ? "" : we(t);
}
function Ve(t, e) {
  return Q(t) ? t : Nt(t, e) ? [t] : cr(fr(t));
}
var dr = 1 / 0;
function $e(t) {
  if (typeof t == "string" || J(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -dr ? "-0" : e;
}
function pr(t, e) {
  e = Ve(e, t);
  for (var r = 0, s = e.length; t != null && r < s; )
    t = t[$e(e[r++])];
  return r && r == s ? t : void 0;
}
function H(t, e, r) {
  var s = t == null ? void 0 : pr(t, e);
  return s === void 0 ? r : s;
}
function hr(t, e, r, s) {
  if (!D(t))
    return t;
  e = Ve(e, t);
  for (var i = -1, n = e.length, o = n - 1, l = t; l != null && ++i < n; ) {
    var u = $e(e[i]), f = r;
    if (u === "__proto__" || u === "constructor" || u === "prototype")
      return t;
    if (i != o) {
      var p = l[u];
      f = s ? s(p, u, l) : void 0, f === void 0 && (f = D(p) ? p : Ft(e[i + 1]) ? [] : {});
    }
    Rt(l, u, f), l = l[u];
  }
  return t;
}
function L(t, e, r) {
  return t == null ? t : hr(t, e, r);
}
class mr {
  constructor(e) {
    c(this, "runtimeCore");
    c(this, "processedSchemas");
    c(this, "processedModel");
    c(this, "getRuntimeMeta");
    c(this, "stableSchemas", []);
    c(this, "stableModel", {});
    c(this, "schemaPreset", P.schemaPreset);
    c(this, "componentPropsPreset", P.componentPropsPreset);
    c(this, "stableUpdaterProcessProgress");
    c(this, "stableUpdaterTimes", 0);
    c(this, "schemaEffect", new X());
    c(this, "defaultValueEffect", new X());
    c(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    c(this, "baseDefaultValueFunctionsLength");
    c(this, "isModelInitialized", !0);
    this.runtimeCore = e, this.processedSchemas = e.schemas, this.processedModel = e.model, this.getRuntimeMeta = e.getRuntimeMeta.bind(e), b(
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
  parse(e, r) {
    e.forEach((s, i) => {
      this.parseItem(s, i, r);
    });
  }
  // 初始化空数据结构，避免后续复杂的 if else
  initSchemas(e) {
    return e.map((r) => {
      const s = {};
      return r.children && (s.children = this.initSchemas(r.children)), s;
    });
  }
  countFunctionDefaultValues(e) {
    let r = 0;
    const s = /* @__PURE__ */ new Set();
    function i(n) {
      if (!s.has(n) && (Array.isArray(n) || n !== null && typeof n == "object")) {
        s.add(n);
        for (const o in n)
          n.hasOwnProperty(o) && (o === "defaultValue" && typeof n[o] == "function" && !n[o].toString().includes("[native code]") && r++, i(n[o]));
      }
    }
    return i(e), r;
  }
  // 派生过程，用于外部应用
  parseSchemas(e, r) {
    a.isArrayEmpty(this.processedSchemas.value) && (this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
      _(e)
    ), this.processedSchemas.value = this.initSchemas(e)), this.parse(e, r);
  }
  parseStable(e) {
    const r = {};
    if (!a.isUndefined(e.stable))
      r[e.key] = this.parseStable(e.stable);
    else
      return e;
    return r;
  }
  // 对于稳定初始化更新的抽象
  stableUpdater(e = []) {
    if (e.every(Boolean)) {
      const r = R(this.processedSchemas.value);
      !a.isProcessInprogress(r) && a.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: r.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(r));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, r, s) {
    const i = this, n = Array.from({
      length: Object.keys(e).filter((l) => l !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: r, updater: o });
    function o(l) {
      const u = l.index, f = l.key, p = l.keyIndex;
      if (a.isUndefined(l.stable))
        return;
      const E = i.parseStable(l.stable), S = s == null ? void 0 : s.index, C = s == null ? void 0 : s.key;
      let g = E;
      if (a.isProcessInprogress(g) || (n[p] = !0), s) {
        const y = i.processedSchemas.value[S][C][u][f];
        y && a.isObject(y) && f !== "component" && (g = h(y, g)), i.processedSchemas.value[S][C][u][f] = g, i.stableUpdater(n);
      } else {
        const y = i.processedSchemas.value[u][f];
        y && a.isObject(y) && f !== "component" && (g = h(y, g)), i.processedSchemas.value[u][f] = g, i.stableUpdater(n);
      }
    }
  }
  // 只做基本的对象 parser
  objectParser(e) {
    const r = e.data;
    Object.keys(r).forEach((i, n) => {
      if (i === "children")
        this.parseSchemas(r[i], {
          ...e,
          key: i,
          keyIndex: n
        });
      else {
        const o = (l) => {
          e.updater({
            ...e,
            key: i,
            keyIndex: n,
            stable: l
          });
        };
        a.isFunction(r[i]) ? i !== "defaultValue" ? this.schemaEffect.trackEffect(
          () => {
            if (i === "component") {
              const l = r[i](this.getRuntimeMeta());
              this.promiseFieldParser(l, o, !1);
            } else
              this.fieldParser(r[i], o);
          },
          {
            lazy: !1
          }
        ) : this.defaultValueEffect.trackEffect(
          () => {
            const l = this.schemaEffect.trackEffect(
              () => {
                /\{\s*model\s*\}/.test(r[i].toString()) ? this.fieldParser(r[i], (u) => {
                  if (!u)
                    return o(u);
                  this.defaultValueInprogressMap.set(r[i], u), !a.isProcessInprogress(u) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                    this.defaultValueInprogressMap.values()
                  ).every((f) => {
                    var p;
                    return !((p = f == null ? void 0 : f.includes) != null && p.call(f, "undefined"));
                  }) ? (o(u), this.defaultValueEffect.clearEffects(), v(() => {
                    l();
                  })) : o(u);
                }) : this.fieldParser(r[i], (u) => {
                  this.defaultValueInprogressMap.set(r[i], u), !a.isProcessInprogress(u) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                    this.defaultValueInprogressMap.values()
                  ).every((f) => {
                    var p;
                    return !((p = f == null ? void 0 : f.includes) != null && p.call(f, "undefined"));
                  }) ? (o(u), this.defaultValueEffect.clearEffects(), v(() => {
                    l();
                  })) : o(u);
                });
              },
              {
                lazy: !1
              }
            );
          },
          {
            lazy: !1
          }
        ) : i === "component" || i === "slots" || i === "runtime" ? this.promiseFieldParser(r[i], o, !1) : this.fieldParser(r[i], o);
      }
    });
  }
  promiseFieldParser(e, r, s) {
    a.isPromise(e) ? e.then((i) => {
      a.isString(i) && (i = K(i, "")), s && a.isObject(i) && !a.isNativeObject(i) ? this.objectParser({
        data: i,
        updater: r
      }) : r(i);
    }) : (a.isString(e) && (e = K(e, "")), s && a.isObject(e) && !a.isNativeObject(e) ? this.objectParser({
      data: e,
      updater: r
    }) : r(e));
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(e, r, s = !0) {
    if (a.isFunction(e))
      if (e.name.startsWith("__proform_raw_"))
        r(
          (...i) => e({
            rawArgs: i,
            ...this.getRuntimeMeta()
          })
        );
      else if (e.name.startsWith("__proform_structured_path_parsing_mark_"))
        r(() => e());
      else if (e.__proform_async_result) {
        const i = e.__proform_async_result;
        this.promiseFieldParser(i, r, s);
      } else {
        const i = e(this.getRuntimeMeta());
        e.name.startsWith("__proform_onetime_") && (e.__proform_async_result = i), this.promiseFieldParser(i, r, s);
      }
    else
      q(e) ? b(
        () => e.value,
        () => {
          a.isUndefined(e.value) || (s && a.isObject(e.value) && !a.isNativeObject(e.value) ? this.objectParser({
            data: e.value,
            updater: r
          }) : r(e.value));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : T(e) ? b(
        () => e,
        () => {
          a.isUndefined(e) || (s && a.isObject(e) && !a.isNativeObject(e) ? this.objectParser({
            data: e,
            updater: r
          }) : r(e));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : s && a.isObject(e) && !a.isNativeObject(e) ? this.objectParser({
        data: e,
        updater: r
      }) : r(e);
  }
  modelProcessor(e) {
    e.map(
      (r) => this.createModel(r, this.processedModel.value)
    ), a.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && (this.stableModel = _(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects());
  }
  setModel(e, r, s) {
    a.isFunction(r) ? L(e, r(), s) : e[r] = s;
  }
  createModel(e, r) {
    a.isListSchema(e) && (r[e.field] || this.setModel(r, e.field, [{}]), e.children.forEach((s) => {
      this.createModel(s, r[e.field][0]);
    })), a.isGroupSchema(e) && e.children.forEach((s) => {
      this.createModel(s, r);
    }), a.isItemSchema(e) && ("defaultValue" in e ? this.setModel(r, e.field, e.defaultValue) : this.setModel(r, e.field, void 0));
  }
}
class j {
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
class yr {
  constructor(e) {
    this.ui = e;
  }
  getRuntimeNative() {
    var r;
    return (r = d.presets.uiPresets[this.ui]) == null ? void 0 : r.native;
  }
  getRuntimeField(e) {
    var i;
    const r = (i = d.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = P.adapters[d.getUI(this.ui)];
    return (r == null ? void 0 : r.getRuntimeField(e)) ?? (s == null ? void 0 : s.getRuntimeField(e));
  }
  getRuntimeRequired(e) {
    var i;
    const r = (i = d.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = P.adapters[d.getUI(this.ui)];
    return (r == null ? void 0 : r.getRuntimeRequired(e)) ?? (s == null ? void 0 : s.getRuntimeRequired(e));
  }
  getFormModelPropName() {
    var s;
    const e = (s = d.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, r = P.adapters[d.getUI(this.ui)];
    return (e == null ? void 0 : e.getFormModelPropName()) ?? (r == null ? void 0 : r.getFormModelPropName());
  }
  formComponentRenderer(e) {
    var i;
    const r = (i = d.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = P.adapters[d.getUI(this.ui)];
    return (r == null ? void 0 : r.formComponentRenderer(e)) ?? (s == null ? void 0 : s.formComponentRenderer(e));
  }
  clearValidate(e) {
    var i;
    const r = (i = d.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = P.adapters[d.getUI(this.ui)];
    return (r == null ? void 0 : r.clearValidate(e)) ?? (s == null ? void 0 : s.clearValidate(e));
  }
}
function gr(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !ke(t);
}
class br {
  constructor(e) {
    c(this, "schemas", z([]));
    c(this, "model", z({}));
    c(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    c(this, "formRef", z(null));
    c(this, "hydrateEffect", new X());
    c(this, "native", Pe({}));
    c(this, "grid", {});
    c(this, "runtime", {});
    c(this, "globalNativeFormOverride", Pe({
      props: {
        Form: {},
        FormItem: {}
      },
      slots: {
        Form: {},
        FormItem: {}
      }
    }));
    c(this, "shared", {});
    this.setup = e, this.processor = new mr(this);
    const r = this.setup(this);
    if (this.ui = r.ui ?? d.presets.ui, this.runtimeAdapter = new yr(this.ui), Object.assign(this.globalNativeFormOverride, this.runtimeAdapter.getRuntimeNative()), q(r.schemas))
      b(
        // @ts-expect-error
        () => r.schemas.value,
        () => {
          this.processor.parseSchemas(r.schemas.value);
        },
        {
          deep: !0
        }
      );
    else if (T(r.schemas)) {
      const s = b(() => r.schemas, () => {
        this.processor.parseSchemas(r.schemas), v(() => {
          s();
        });
      }, {
        deep: !0
      });
    } else
      this.processor.parseSchemas(r.schemas);
  }
  getRuntimeMeta() {
    const e = R(_(this.model.value));
    let r;
    return {
      model: e,
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (s) => {
        r && clearTimeout(r), r = setTimeout(() => {
          if (q(s)) {
            const i = b(() => s.value, () => {
              h(this.shared, s.value), this.processor.schemaEffect.triggerEffects(), v(() => {
                i();
              });
            }, {
              deep: !0,
              immediate: !0
            });
          } else if (T(s)) {
            const i = b(() => s, () => {
              h(this.shared, s), this.processor.schemaEffect.triggerEffects(), v(() => {
                i();
              });
            }, {
              deep: !0,
              immediate: !0
            });
          } else
            h(this.shared, s), this.processor.schemaEffect.triggerEffects();
        }, 0);
      }
    };
  }
  runtimeItemProcessor(e, r, s = this.model.value, i) {
    var re, se, ie, ne, oe, ae, le, ue, ce, fe, de, pe, he, me, ye, ge, be;
    const n = R(e.component);
    if (!n)
      return;
    (se = (re = e.native) == null ? void 0 : re.props) != null && se.Form && h(this.globalNativeFormOverride.props.Form, (ne = (ie = e.native) == null ? void 0 : ie.props) == null ? void 0 : ne.Form), (ae = (oe = e.native) == null ? void 0 : oe.slots) != null && ae.Form && h(this.globalNativeFormOverride.slots.Form, (ue = (le = e.native) == null ? void 0 : le.slots) == null ? void 0 : ue.Form);
    const o = h(_((fe = (ce = this.native) == null ? void 0 : ce.slots) == null ? void 0 : fe.FormItem) ?? {}, (pe = (de = e.native) == null ? void 0 : de.slots) == null ? void 0 : pe.FormItem), l = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, u = h(_((me = (he = this.native) == null ? void 0 : he.props) == null ? void 0 : me.FormItem) ?? {}, (ge = (ye = e.native) == null ? void 0 : ye.props) == null ? void 0 : ge.FormItem), f = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: i,
      index: r
    }), p = n.name, E = e.componentProps ?? {}, S = P.placeholderPresetByComponentName;
    let C = e.placeholder, g = e.show;
    g === void 0 && (g = !0);
    let y = e.label ?? "", I;
    if (e.runtime ? I = e.runtime : I = (i == null ? void 0 : i.runtime) ?? this.runtime, !a.isUndefined(r) && !a.isObjectEmpty(I) && (y = K((be = I == null ? void 0 : I.customizeListItemLabel) == null ? void 0 : be.call(I, e.label ?? "", r + 1), "")), !C) {
      let N = "请输入";
      a.isUndefined(p) ? C = `${N}${y}` : /* @ts-expect-error */ S[p.toLowerCase()] ? (N = // @ts-expect-error
      S[p.toLowerCase()], C = `${N}${y}`) : (Object.keys(S).forEach((ve) => {
        p.toLowerCase().includes(ve.toLowerCase()) && (N = S[ve]);
      }), C = `${N}${y}`);
    }
    const Ne = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: y
    }), Me = j.getItemContainer(this), xe = j.getFormItemContainer(this), qe = this, Te = e.componentSlots;
    return m("div", {
      style: l
    }, [m(Me, {
      show: g
    }, {
      default() {
        return g && m(xe, x(u, {
          label: `${y ? `${y}:` : ""}`
        }, f, Ne), {
          default() {
            return qe.runtimeAdapter.formComponentRenderer({
              Component: n,
              schema: e,
              baseModel: s,
              placeholder: C,
              componentSlots: Te,
              props: E
            });
          },
          ...o
        });
      }
    })]);
  }
  runtimeGroupProcessor(e) {
    let r;
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
    }, gr(r = e.children.map((o) => this.runtimeItemProcessor(o))) ? r : {
      default: () => [r]
    })]);
  }
  addListItem(e) {
    var r, s;
    if (!((r = this.processor.stableModel[e.field]) != null && r[0]))
      return Promise.reject({
        code: "0001",
        message: "异步默认值数据正在处理中，请您耐心等待... "
      });
    (s = this.processor.stableModel[e.field]) != null && s[0] && this.model.value[e.field].push(_(this.processor.stableModel[e.field][0])), this.runtimeAdapter.clearValidate(this);
  }
  deleteListItem(e, r) {
    this.model.value[e.field].splice(r, 1), this.runtimeAdapter.clearValidate(this);
  }
  runtimeListProcessor(e) {
    const r = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, s = this;
    s.model.value[e.field] || (s.model.value[e.field] = [{}]);
    let i = e.show;
    i === void 0 && (i = !0);
    const n = j.getListContainer(this), o = j.getListItemContainer(this);
    return m("div", {
      style: r
    }, [i && m(n, {
      schema: e
    }, {
      default() {
        return s.model.value[e.field].map((l, u) => m(o, null, {
          default() {
            return e.children.map((f) => s.runtimeItemProcessor(f, u, l, e));
          },
          delete({
            container: f
          } = {}) {
            var E;
            const p = f ?? m("button", null, null);
            return Le(m(p, {
              onClick: () => s.deleteListItem(e, u)
            }, null), [[De, ((E = s.model.value[e.field]) == null ? void 0 : E.length) > 1]]);
          }
        }));
      },
      add({
        container: l
      } = {}) {
        const u = l ?? m("button", null, [Ge("添加")]);
        return m(u, {
          onClick: () => s.addListItem(e)
        }, null);
      }
    })]);
  }
  runtimeProcessor(e) {
    return e.map((r) => (r.type || (r.type = "item"), this.processorBySchemaType[r.type](r)));
  }
  exec() {
    var l, u, f, p;
    const e = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.grid
    }, r = this, s = h(this.globalNativeFormOverride.props.Form, _((u = (l = this.native) == null ? void 0 : l.props) == null ? void 0 : u.Form) ?? {}), i = h(this.globalNativeFormOverride.slots.Form, _((p = (f = this.native) == null ? void 0 : f.slots) == null ? void 0 : p.Form) ?? {}), n = j.getFormContainer(this), o = this.runtimeAdapter.getFormModelPropName();
    return m(n, x(s, {
      ref: this.formRef
    }, {
      [o]: this.model.value
    }), {
      default() {
        return m("div", {
          style: e
        }, [r.runtimeProcessor(r.schemas.value)]);
      },
      ...i
    });
  }
}
class d {
  static getPreset(e) {
    var r, s, i;
    return (s = (r = this.presets.uiPresets) == null ? void 0 : r[e]) != null && s.extend ? this.presets.uiPresets[(i = this.presets.uiPresets[e]) == null ? void 0 : i.extend] : this.presets.uiPresets[e];
  }
  static getUI(e) {
    var r, s, i;
    return (s = (r = this.presets.uiPresets) == null ? void 0 : r[e]) != null && s.extend ? (i = this.presets.uiPresets[e]) == null ? void 0 : i.extend : e;
  }
}
c(d, "presets");
function W({
  parentSchema: t,
  schema: e,
  index: r
}) {
  return t ? `${t.field}.${r}.${e.field}` : e.field;
}
const vr = {
  ArcoVue: {
    getRuntimeField(t) {
      const e = W(t);
      return a.isFunction(e) ? {
        field: e()
      } : {
        field: e
      };
    },
    getRuntimeRequired(t) {
      var e;
      if (t.required)
        if (!t.rules)
          t.rules = [], t.rules.push({
            required: !0,
            message: `${t.label}是必填项`
          });
        else {
          const r = t.rules.findIndex((s) => !a.isUndefined(s.required));
          r !== -1 ? (t.rules[r].required = !0, t.rules[r].message = `${t.label}是必填项`) : t.rules.unshift({
            required: !0,
            message: `${t.label}是必填项`
          });
        }
      else if (t.rules) {
        const r = (e = t.rules) == null ? void 0 : e.findIndex((s) => !!s.required);
        r !== -1 ? t.rules[r].required = !1 : t.rules.unshift({
          required: !0,
          message: `${t.label}是必填项`
        });
      }
      return {
        rules: t.rules
      };
    },
    getFormModelPropName() {
      return "model";
    },
    formComponentRenderer({
      Component: t,
      baseModel: e,
      schema: r,
      placeholder: s,
      componentSlots: i,
      props: n
    }) {
      let o;
      return a.isFunction(r.field) ? o = H(e, r.field()) : o = e[r.field], m(t, x({
        modelValue: o,
        "onUpdate:modelValue": (l) => {
          a.isFunction(r.field) ? L(e, r.field(), l) : e[r.field] = l;
        },
        placeholder: s
      }, n), {
        ...i
      });
    },
    validateForm(t) {
      return new Promise((e, r) => {
        t.runtimeCore.formRef.value.validate((s) => s ? r(s) : e(t.cleanFallbackFields(R(t.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(t) {
      t.formRef.value.clearValidate();
    }
  },
  NutUI: {
    getRuntimeField(t) {
      const e = W(t);
      return a.isFunction(e) ? {
        prop: e()
      } : {
        prop: e
      };
    },
    getRuntimeRequired(t) {
      var e;
      if (t.required)
        if (!t.rules)
          t.rules = [], t.rules.push({
            required: !0,
            message: `${t.label}是必填项`
          });
        else {
          const r = t.rules.findIndex((s) => !a.isUndefined(s.required));
          r !== -1 ? (t.rules[r].required = !0, t.rules[r].message = `${t.label}是必填项`) : t.rules.unshift({
            required: !0,
            message: `${t.label}是必填项`
          });
        }
      else if (t.rules) {
        const r = (e = t.rules) == null ? void 0 : e.findIndex((s) => !!s.required);
        r !== -1 ? t.rules[r].required = !1 : t.rules.unshift({
          required: !0,
          message: `${t.label}是必填项`
        });
      }
      return {
        rules: t.rules,
        required: t.required
      };
    },
    getFormModelPropName() {
      return "modelValue";
    },
    formComponentRenderer({
      Component: t,
      baseModel: e,
      schema: r,
      placeholder: s,
      componentSlots: i,
      props: n
    }) {
      let o;
      return a.isFunction(r.field) ? o = H(e, r.field()) : o = e[r.field], m(t, x({
        modelValue: o,
        "onUpdate:modelValue": (l) => {
          a.isFunction(r.field) ? L(e, r.field(), l) : e[r.field] = l;
        },
        placeholder: s
      }, n), {
        ...i
      });
    },
    validateForm(t) {
      return new Promise((e, r) => {
        t.runtimeCore.formRef.value.validate().then(({
          valid: s,
          errors: i
        }) => {
          s ? e(t.cleanFallbackFields(R(t.runtimeCore.processor.processedModel.value))) : r(i);
        });
      });
    },
    clearValidate(t) {
      t.formRef.value.reset();
    }
  },
  NaiveUI: {
    getRuntimeField(t) {
      const e = W(t);
      return a.isFunction(e) ? {
        path: e()
      } : {
        path: e
      };
    },
    getRuntimeRequired(t) {
      var e;
      if (t.required)
        if (!t.rules)
          t.rules = [], t.rules.push({
            required: !0,
            message: `${t.label}是必填项`,
            trigger: ["input", "blur"]
          });
        else {
          const r = t.rules.findIndex((s) => !a.isUndefined(s.required));
          r !== -1 ? (t.rules[r].required = !0, t.rules[r].message = `${t.label}是必填项`) : t.rules.unshift({
            required: !0,
            message: `${t.label}是必填项`,
            trigger: ["input", "blur"]
          });
        }
      else if (t.rules) {
        const r = (e = t.rules) == null ? void 0 : e.findIndex((s) => !!s.required);
        r !== -1 ? t.rules[r].required = !1 : t.rules.unshift({
          required: !0,
          message: `${t.label}是必填项`,
          trigger: ["input", "blur"]
        });
      }
      return {
        rule: t.rules
      };
    },
    getFormModelPropName() {
      return "model";
    },
    formComponentRenderer({
      Component: t,
      baseModel: e,
      schema: r,
      placeholder: s,
      componentSlots: i,
      props: n
    }) {
      let o;
      return a.isFunction(r.field) ? o = H(e, r.field()) : o = e[r.field], m(t, x({
        value: o,
        "onUpdate:value": (l) => {
          a.isFunction(r.field) ? L(e, r.field(), l) : e[r.field] = l;
        },
        placeholder: s
      }, n), {
        ...i
      });
    },
    validateForm(t) {
      return new Promise((e, r) => {
        t.runtimeCore.formRef.value.validate((s) => s ? r(s) : e(t.cleanFallbackFields(R(t.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(t) {
      t.formRef.value.restoreValidation();
    }
  }
}, w = class w {
  static getPlaceholderPrefixPresetByComponentName() {
    const e = {
      请选择: ["select", "tree"],
      请输入: ["input"]
    }, r = {};
    for (const s in e)
      e[s].forEach((i) => {
        r[i] = s;
      });
    return r;
  }
};
c(w, "schemaPreset", {
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
}), c(w, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
c(w, "placeholderPresetByComponentName", w.getPlaceholderPrefixPresetByComponentName());
let Y = w;
const P = {
  ...Y,
  adapters: {
    ...vr
  }
}, Cr = /* @__PURE__ */ Be({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(t) {
    const e = new br(t.setup);
    return () => e.exec();
  }
});
function Ir(t) {
  const e = new He(t);
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
function Sr(t) {
  d.presets = t;
}
function te(t, e) {
  return e === "native" && Object.defineProperty(t, "name", {
    value: `__proform_raw_${t.name}`,
    writable: !0
  }), e === "structured_path_parsing_mark" && Object.defineProperty(t, "name", {
    value: `__proform_structured_path_parsing_mark_${t.name}`,
    writable: !0
  }), e === "onetime" && Object.defineProperty(t, "name", {
    value: `__proform_onetime_${t.name}`,
    writable: !0
  }), t;
}
function Or(t) {
  return te(t, "native");
}
function Fr(t) {
  return t.__proform_raw_object = !0, t;
}
function Er(t) {
  return te(t, "onetime");
}
function jr(t) {
  function e() {
    return t;
  }
  return te(
    e,
    "structured_path_parsing_mark"
  );
}
export {
  Cr as ProForm,
  Or as markNativeFunction,
  Fr as markNativeObject,
  Er as markOnetimeFunction,
  jr as markStructuredPathParsing,
  Ir as useForm,
  Sr as useFormPresetConfigurer,
  te as useModifiers
};
