var Te = Object.defineProperty;
var ze = (r, e, t) => e in r ? Te(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var u = (r, e, t) => (ze(r, typeof e != "symbol" ? e + "" : e, t), t);
import { ref as z, readonly as Pe, nextTick as O, isRef as F, watch as v, isReactive as j, toRaw as R, reactive as K, createVNode as b, mergeProps as U, withDirectives as Le, vShow as De, createTextVNode as Ge, isVNode as Be, defineComponent as He } from "vue";
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
        if (this.isProcessInprogress(t))
          return !0;
    }
    return !1;
  }
  static isNativeObject(e) {
    return !!e.__proform_raw_object;
  }
}
function h(r, ...e) {
  return e.forEach((t) => {
    if (Array.isArray(t))
      Array.isArray(r) || (r = []), t.forEach((i, s) => {
        typeof i == "object" && i !== null ? r[s] = h(Array.isArray(i) ? [] : {}, i) : r[s] = i;
      });
    else
      for (const i in t)
        t.hasOwnProperty(i) && (typeof t[i] == "object" && t[i] !== null ? r[i] = h(r[i] || {}, t[i]) : r[i] = t[i]);
  }), r;
}
function P(r) {
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
      for (const [a, l] of i)
        n.set(t(a), t(l));
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
function Y(r, e) {
  return r.replace(/undefined/g, e);
}
class Ke {
  constructor(e) {
    u(this, "runtimeCore");
    u(this, "readonlyReactiveModel", z({}));
    this.formCustomization = e;
  }
  // happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
  cleanFallbackFields(e) {
    return e !== null && typeof e == "object" && (delete e.__yiwwhl_async_field_fallback, Object.values(e).forEach((t) => {
      this.cleanFallbackFields(t);
    })), e;
  }
  setup(e) {
    return this.runtimeCore = e, this.readonlyReactiveModel.value = Pe(e.model.value), Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var i;
    const e = (i = c.getPreset(this.runtimeCore.ui)) == null ? void 0 : i.adapter, t = C.adapters[c.getUI(this.runtimeCore.ui)];
    return (e == null ? void 0 : e.validateForm(this)) ?? (t == null ? void 0 : t.validateForm(this));
  }
  hydrate(e) {
    O(() => {
      this.runtimeCore.hydrateEffect.trackEffect(
        () => {
          F(e) ? v(
            () => e.value,
            () => {
              h(this.runtimeCore.model.value, e.value);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : j(e) ? v(
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
    O(() => {
      F(e) ? v(
        () => e.value,
        () => {
          h(this.runtimeCore.shared, e.value);
        },
        {
          deep: !0,
          immediate: !0
        }
      ) : j(e) ? v(
        () => e,
        () => {
          h(this.runtimeCore.shared, e);
        },
        {
          deep: !0,
          immediate: !0
        }
      ) : Object.keys(e).forEach((t) => {
        F(e[t]) ? v(
          () => e[t].value,
          () => {
            h(this.runtimeCore.shared, {
              [t]: e[t].value
            });
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : j(e[t]) ? v(
          () => e[t],
          () => {
            h(this.runtimeCore.shared, {
              [t]: e[t]
            });
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : h(this.runtimeCore.shared, {
          [t]: e[t]
        });
      });
    });
  }
  subscribeModel(e) {
    O(() => {
      const t = v(
        () => this.readonlyReactiveModel.value,
        (i) => {
          e(i, {
            stopSubscribe() {
              O(() => {
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
    (e = this.runtimeCore) != null && e.model.value && (this.runtimeCore.model.value = P(
      this.runtimeCore.processor.stableModel
    ), this.readonlyReactiveModel.value = Pe(this.runtimeCore.model.value), this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore));
  }
}
class Z {
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
    return !t.lazy && e(), t.identifier ? this.identifierMap.get(t.identifier) || (this.effects.add(e), this.identifierMap.set(t.identifier, !0)) : this.effects.add(e), () => this.effects.delete(e);
  }
}
var We = typeof global == "object" && global && global.Object === Object && global, Xe = typeof self == "object" && self && self.Object === Object && self, Q = We || Xe || Function("return this")(), $ = Q.Symbol, je = Object.prototype, Ye = je.hasOwnProperty, Ze = je.toString, q = $ ? $.toStringTag : void 0;
function Je(r) {
  var e = Ye.call(r, q), t = r[q];
  try {
    r[q] = void 0;
    var i = !0;
  } catch {
  }
  var s = Ze.call(r);
  return i && (e ? r[q] = t : delete r[q]), s;
}
var Qe = Object.prototype, ke = Qe.toString;
function Ae(r) {
  return ke.call(r);
}
var et = "[object Null]", tt = "[object Undefined]", Ce = $ ? $.toStringTag : void 0;
function we(r) {
  return r == null ? r === void 0 ? tt : et : Ce && Ce in Object(r) ? Je(r) : Ae(r);
}
function rt(r) {
  return r != null && typeof r == "object";
}
var it = "[object Symbol]";
function k(r) {
  return typeof r == "symbol" || rt(r) && we(r) == it;
}
function st(r, e) {
  for (var t = -1, i = r == null ? 0 : r.length, s = Array(i); ++t < i; )
    s[t] = e(r[t], t, r);
  return s;
}
var A = Array.isArray, nt = 1 / 0, Ie = $ ? $.prototype : void 0, Se = Ie ? Ie.toString : void 0;
function Me(r) {
  if (typeof r == "string")
    return r;
  if (A(r))
    return st(r, Me) + "";
  if (k(r))
    return Se ? Se.call(r) : "";
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
  var e = we(r);
  return e == at || e == lt || e == ot || e == ut;
}
var W = Q["__core-js_shared__"], Oe = function() {
  var r = /[^.]+$/.exec(W && W.keys && W.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function ct(r) {
  return !!Oe && Oe in r;
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
var mt = /[\\^$.*+?()[\]{}|]/g, bt = /^\[object .+?Constructor\]$/, vt = Function.prototype, gt = Object.prototype, yt = vt.toString, _t = gt.hasOwnProperty, Pt = RegExp(
  "^" + yt.call(_t).replace(mt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Ct(r) {
  if (!G(r) || ct(r))
    return !1;
  var e = ft(r) ? Pt : bt;
  return e.test(ht(r));
}
function It(r, e) {
  return r == null ? void 0 : r[e];
}
function ee(r, e) {
  var t = It(r, e);
  return Ct(t) ? t : void 0;
}
var Fe = function() {
  try {
    var r = ee(Object, "defineProperty");
    return r({}, "", {}), r;
  } catch {
  }
}(), St = 9007199254740991, Ot = /^(?:0|[1-9]\d*)$/;
function Ft(r, e) {
  var t = typeof r;
  return e = e ?? St, !!e && (t == "number" || t != "symbol" && Ot.test(r)) && r > -1 && r % 1 == 0 && r < e;
}
function jt(r, e, t) {
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
var wt = Object.prototype, Mt = wt.hasOwnProperty;
function xt(r, e, t) {
  var i = r[e];
  (!(Mt.call(r, e) && xe(i, t)) || t === void 0 && !(e in r)) && jt(r, e, t);
}
var Et = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Rt = /^\w*$/;
function $t(r, e) {
  if (A(r))
    return !1;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || k(r) ? !0 : Rt.test(r) || !Et.test(r) || e != null && r in Object(e);
}
var T = ee(Object, "create");
function Vt() {
  this.__data__ = T ? T(null) : {}, this.size = 0;
}
function Nt(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
var qt = "__lodash_hash_undefined__", Ut = Object.prototype, Tt = Ut.hasOwnProperty;
function zt(r) {
  var e = this.__data__;
  if (T) {
    var t = e[r];
    return t === qt ? void 0 : t;
  }
  return Tt.call(e, r) ? e[r] : void 0;
}
var Lt = Object.prototype, Dt = Lt.hasOwnProperty;
function Gt(r) {
  var e = this.__data__;
  return T ? e[r] !== void 0 : Dt.call(e, r);
}
var Bt = "__lodash_hash_undefined__";
function Ht(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = T && e === void 0 ? Bt : e, this;
}
function w(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
w.prototype.clear = Vt;
w.prototype.delete = Nt;
w.prototype.get = zt;
w.prototype.has = Gt;
w.prototype.set = Ht;
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
var kt = ee(Q, "Map");
function At() {
  this.size = 0, this.__data__ = {
    hash: new w(),
    map: new (kt || V)(),
    string: new w()
  };
}
function er(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
function H(r, e) {
  var t = r.__data__;
  return er(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function tr(r) {
  var e = H(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
function rr(r) {
  return H(this, r).get(r);
}
function ir(r) {
  return H(this, r).has(r);
}
function sr(r, e) {
  var t = H(this, r), i = t.size;
  return t.set(r, e), this.size += t.size == i ? 0 : 1, this;
}
function M(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
M.prototype.clear = At;
M.prototype.delete = tr;
M.prototype.get = rr;
M.prototype.has = ir;
M.prototype.set = sr;
var nr = "Expected a function";
function te(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(nr);
  var t = function() {
    var i = arguments, s = e ? e.apply(this, i) : i[0], n = t.cache;
    if (n.has(s))
      return n.get(s);
    var a = r.apply(this, i);
    return t.cache = n.set(s, a) || n, a;
  };
  return t.cache = new (te.Cache || M)(), t;
}
te.Cache = M;
var or = 500;
function ar(r) {
  var e = te(r, function(i) {
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
function Ee(r, e) {
  return A(r) ? r : $t(r, e) ? [r] : fr(cr(r));
}
var dr = 1 / 0;
function Re(r) {
  if (typeof r == "string" || k(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -dr ? "-0" : e;
}
function pr(r, e) {
  e = Ee(e, r);
  for (var t = 0, i = e.length; r != null && t < i; )
    r = r[Re(e[t++])];
  return t && t == i ? r : void 0;
}
function L(r, e, t) {
  var i = r == null ? void 0 : pr(r, e);
  return i === void 0 ? t : i;
}
function hr(r, e, t, i) {
  if (!G(r))
    return r;
  e = Ee(e, r);
  for (var s = -1, n = e.length, a = n - 1, l = r; l != null && ++s < n; ) {
    var f = Re(e[s]), d = t;
    if (f === "__proto__" || f === "constructor" || f === "prototype")
      return r;
    if (s != a) {
      var p = l[f];
      d = i ? i(p, f, l) : void 0, d === void 0 && (d = G(p) ? p : Ft(e[s + 1]) ? [] : {});
    }
    xt(l, f, d), l = l[f];
  }
  return r;
}
function D(r, e, t) {
  return r == null ? r : hr(r, e, t);
}
class mr {
  constructor(e) {
    u(this, "runtimeCore");
    u(this, "processedSchemas");
    u(this, "processedModel");
    u(this, "getRuntimeMeta");
    u(this, "stableSchemas", []);
    u(this, "stableModel", {});
    u(this, "schemaPreset", C.schemaPreset);
    u(this, "componentPropsPreset", C.componentPropsPreset);
    u(this, "stableUpdaterProcessProgress");
    u(this, "stableUpdaterTimes", 0);
    u(this, "schemaEffect", new Z());
    u(this, "defaultValueEffect", new Z());
    u(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    u(this, "baseDefaultValueFunctionsLength");
    u(this, "isModelInitialized", !0);
    this.runtimeCore = e, this.processedSchemas = e.schemas, this.processedModel = e.model, this.getRuntimeMeta = e.getRuntimeMeta.bind(e), v(
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
      P(e)
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
      const t = R(this.processedSchemas.value);
      !o.isProcessInprogress(t) && o.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: t.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(t));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, t, i) {
    const s = this, n = Array.from({
      length: Object.keys(e).filter((l) => l !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: a, parentMeta: i });
    function a(l) {
      const f = l.index, d = l.key, p = l.keyIndex;
      if (o.isUndefined(l.stable))
        return;
      const m = s.parseStable(l.stable), y = i == null ? void 0 : i.index, I = i == null ? void 0 : i.key;
      let _ = m;
      if (o.isProcessInprogress(_) || (n[p] = !0), i) {
        const g = s.processedSchemas.value[y][I][f][d];
        g && o.isObject(g) && d !== "component" && (_ = h(g, _)), s.processedSchemas.value[y][I][f][d] = _, s.stableUpdater(n);
      } else {
        const g = s.processedSchemas.value[f][d];
        g && o.isObject(g) && d !== "component" && (_ = h(g, _)), s.processedSchemas.value[f][d] = _, s.stableUpdater(n);
      }
    }
  }
  // 只做基本的对象 parser
  objectParser(e) {
    const t = e.data;
    Object.keys(t).forEach((s, n) => {
      var a, l;
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
            identifier: `${(a = e.parentMeta) == null ? void 0 : a.key}${(l = e.parentMeta) == null ? void 0 : l.index}${e.index}${s}${n}`
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
                    ).every((m) => {
                      var y;
                      return !((y = m == null ? void 0 : m.includes) != null && y.call(m, "undefined"));
                    }) ? (f(p), this.defaultValueEffect.clearEffects(), O(() => {
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
                    ).every((m) => {
                      var y;
                      return !((y = m == null ? void 0 : m.includes) != null && y.call(m, "undefined"));
                    }) ? (f(p), this.defaultValueEffect.clearEffects(), O(() => {
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
      o.isString(n) && (n = Y(n, "")), i && o.isObject(n) && !o.isNativeObject(n) ? this.objectParser({
        data: n,
        updater: t,
        index: s.rootIndex,
        parentMeta: s.parentMeta
      }) : t(n);
    }) : (o.isString(e) && (e = Y(e, "")), i && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
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
      F(e) ? v(
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
      ) : j(e) ? v(
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
    ), o.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && (this.stableModel = P(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects());
  }
  setModel(e, t, i) {
    o.isFunction(t) ? D(e, t(), i) : e[t] = i;
  }
  createModel(e, t) {
    if (o.isListSchema(e) && (t[e.field] || this.setModel(t, e.field, [{}]), e.children.forEach((i) => {
      this.createModel(i, t[e.field][0]);
    })), o.isGroupSchema(e) && e.children.forEach((i) => {
      this.createModel(i, t);
    }), o.isItemSchema(e))
      if ("defaultValue" in e)
        this.setModel(t, e.field, e.defaultValue);
      else {
        if (o.isFunction(e.field) && L(t, e.field()))
          return;
        if (o.isString(e.field) && t[e.field])
          return;
        this.setModel(t, e.field, void 0);
      }
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
class br {
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
function vr(r) {
  return typeof r == "function" || Object.prototype.toString.call(r) === "[object Object]" && !Be(r);
}
class gr {
  constructor(e) {
    u(this, "schemas", z([]));
    u(this, "model", z({}));
    u(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    u(this, "formRef", z(null));
    u(this, "hydrateEffect", new Z());
    u(this, "native", K({}));
    u(this, "grid", {});
    u(this, "runtime", {});
    u(this, "globalNativeFormOverride", K({
      props: {
        Form: {},
        FormItem: {}
      },
      slots: {
        Form: {},
        FormItem: {}
      }
    }));
    u(this, "shared", K({}));
    this.setup = e, this.processor = new mr(this);
    const t = this.setup(this);
    if (this.ui = t.ui ?? c.presets.ui, this.runtimeAdapter = new br(this.ui), Object.assign(this.globalNativeFormOverride, this.runtimeAdapter.getRuntimeNative()), F(t.schemas))
      v(
        // @ts-expect-error
        () => t.schemas.value,
        () => {
          this.processor.parseSchemas(t.schemas.value);
        },
        {
          deep: !0
        }
      );
    else if (j(t.schemas)) {
      const i = v(() => t.schemas, () => {
        this.processor.parseSchemas(t.schemas), O(() => {
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
      model: R(P(this.model.value)),
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (t) => {
        F(t) ? v(() => t.value, () => {
          h(this.shared, t.value);
        }, {
          deep: !0,
          immediate: !0
        }) : j(t) ? v(() => t, () => {
          h(this.shared, t);
        }, {
          deep: !0,
          immediate: !0
        }) : Object.keys(t).forEach((i) => {
          F(t[i]) ? v(() => t[i].value, () => {
            h(this.shared, {
              [i]: t[i].value
            });
          }, {
            deep: !0,
            immediate: !0
          }) : j(t[i]) ? v(() => t[i], () => {
            h(this.shared, {
              [i]: t[i]
            });
          }, {
            deep: !0,
            immediate: !0
          }) : h(this.shared, {
            [i]: t[i]
          });
        });
      }
    };
  }
  runtimeItemProcessor(e, t, i = this.model.value, s) {
    var ie, se, ne, oe, ae, le, ue, fe, ce, de, pe, he, me, be, ve, ge, ye;
    const n = R(e.component);
    if (!n)
      return;
    (se = (ie = e.native) == null ? void 0 : ie.props) != null && se.Form && h(this.globalNativeFormOverride.props.Form, (oe = (ne = e.native) == null ? void 0 : ne.props) == null ? void 0 : oe.Form), (le = (ae = e.native) == null ? void 0 : ae.slots) != null && le.Form && h(this.globalNativeFormOverride.slots.Form, (fe = (ue = e.native) == null ? void 0 : ue.slots) == null ? void 0 : fe.Form);
    const a = h(P((de = (ce = this.native) == null ? void 0 : ce.slots) == null ? void 0 : de.FormItem) ?? {}, (he = (pe = e.native) == null ? void 0 : pe.slots) == null ? void 0 : he.FormItem), l = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, f = h(P((be = (me = this.native) == null ? void 0 : me.props) == null ? void 0 : be.FormItem) ?? {}, (ge = (ve = e.native) == null ? void 0 : ve.props) == null ? void 0 : ge.FormItem), d = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: s,
      index: t
    }), p = n.name, m = e.componentProps ?? {}, y = C.placeholderPresetByComponentName;
    let I = e.placeholder, _ = e.show;
    _ === void 0 && (_ = !0);
    let g = e.label ?? "", S;
    if (e.runtime ? S = e.runtime : S = (s == null ? void 0 : s.runtime) ?? this.runtime, !o.isUndefined(t) && !o.isObjectEmpty(S) && (g = Y((ye = S == null ? void 0 : S.customizeListItemLabel) == null ? void 0 : ye.call(S, e.label ?? "", t + 1), "")), !I) {
      let N = "请输入";
      o.isUndefined(p) ? I = `${N}${g}` : /* @ts-expect-error */ y[p.toLowerCase()] ? (N = // @ts-expect-error
      y[p.toLowerCase()], I = `${N}${g}`) : (Object.keys(y).forEach((_e) => {
        p.toLowerCase().includes(_e.toLowerCase()) && (N = y[_e]);
      }), I = `${N}${g}`);
    }
    const $e = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: g
    }), Ve = x.getItemContainer(this), Ne = x.getFormItemContainer(this), qe = this, Ue = e.componentSlots;
    return b("div", {
      style: l
    }, [b(Ve, {
      show: _
    }, {
      default() {
        return _ && b(Ne, U(f, {
          label: `${g ? `${g}:` : ""}`
        }, d, $e), {
          default() {
            return qe.runtimeAdapter.formComponentRenderer({
              Component: n,
              schema: e,
              baseModel: i,
              placeholder: I,
              componentSlots: Ue,
              props: m
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
    }, s = x.getGroupContainer(this);
    let n = e.show;
    return n === void 0 && (n = !0), b("div", {
      style: i
    }, [n && b(s, {
      schema: e
    }, vr(t = e.children.map((a) => this.runtimeItemProcessor(a))) ? t : {
      default: () => [t]
    })]);
  }
  addListItem(e) {
    var t, i;
    if (!((t = this.processor.stableModel[e.field]) != null && t[0]))
      return Promise.reject({
        code: "0001",
        message: "异步默认值数据正在处理中，请您耐心等待... "
      });
    (i = this.processor.stableModel[e.field]) != null && i[0] && this.model.value[e.field].push(P(this.processor.stableModel[e.field][0])), this.runtimeAdapter.clearValidate(this);
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
    const n = x.getListContainer(this), a = x.getListItemContainer(this);
    return b("div", {
      style: t
    }, [s && b(n, {
      schema: e
    }, {
      default() {
        return i.model.value[e.field].map((l, f) => b(a, null, {
          default() {
            return e.children.map((d) => i.runtimeItemProcessor(d, f, l, e));
          },
          delete({
            container: d
          } = {}) {
            var m;
            const p = d ?? b("button", null, null);
            return Le(b(p, {
              onClick: () => i.deleteListItem(e, f)
            }, null), [[De, ((m = i.model.value[e.field]) == null ? void 0 : m.length) > 1]]);
          }
        }));
      },
      add({
        container: l
      } = {}) {
        const f = l ?? b("button", null, [Ge("添加")]);
        return b(f, {
          onClick: () => i.addListItem(e)
        }, null);
      }
    })]);
  }
  runtimeProcessor(e) {
    return e.map((t) => (t.type || (t.type = "item"), this.processorBySchemaType[t.type](t)));
  }
  exec() {
    var l, f, d, p;
    const e = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.grid
    }, t = this, i = h(this.globalNativeFormOverride.props.Form, P((f = (l = this.native) == null ? void 0 : l.props) == null ? void 0 : f.Form) ?? {}), s = h(this.globalNativeFormOverride.slots.Form, P((p = (d = this.native) == null ? void 0 : d.slots) == null ? void 0 : p.Form) ?? {}), n = x.getFormContainer(this), a = this.runtimeAdapter.getFormModelPropName();
    return b(n, U(i, {
      ref: this.formRef
    }, {
      [a]: this.model.value
    }), {
      default() {
        return b("div", {
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
u(c, "presets");
function X({
  parentSchema: r,
  schema: e,
  index: t
}) {
  return r ? `${r.field}.${t}.${e.field}` : e.field;
}
const yr = {
  ArcoVue: {
    getRuntimeField(r) {
      const e = X(r);
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
          const t = r.rules.findIndex((i) => !o.isUndefined(i.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = `${r.label}是必填项`) : r.rules.unshift({
            required: !0,
            message: `${r.label}是必填项`
          });
        }
      else if (r.rules) {
        const t = (e = r.rules) == null ? void 0 : e.findIndex((i) => !!i.required);
        t !== -1 ? r.rules[t].required = !1 : r.rules.unshift({
          required: !0,
          message: `${r.label}是必填项`
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
      return o.isFunction(t.field) ? a = L(e, t.field()) : a = e[t.field], b(r, U({
        modelValue: a,
        "onUpdate:modelValue": (l) => {
          o.isFunction(t.field) ? D(e, t.field(), l) : e[t.field] = l;
        },
        placeholder: i
      }, n), {
        ...s
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((i) => i ? t(i) : e(r.cleanFallbackFields(R(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      var e, t;
      (t = (e = r.formRef.value) == null ? void 0 : e.clearValidate) == null || t.call(e);
    }
  },
  NutUI: {
    getRuntimeField(r) {
      const e = X(r);
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
          const t = r.rules.findIndex((i) => !o.isUndefined(i.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = `${r.label}是必填项`) : r.rules.unshift({
            required: !0,
            message: `${r.label}是必填项`
          });
        }
      else if (r.rules) {
        const t = (e = r.rules) == null ? void 0 : e.findIndex((i) => !!i.required);
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
      placeholder: i,
      componentSlots: s,
      props: n
    }) {
      let a;
      return o.isFunction(t.field) ? a = L(e, t.field()) : a = e[t.field], b(r, U({
        modelValue: a,
        "onUpdate:modelValue": (l) => {
          o.isFunction(t.field) ? D(e, t.field(), l) : e[t.field] = l;
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
          i ? e(r.cleanFallbackFields(R(r.runtimeCore.processor.processedModel.value))) : t(s);
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
      const e = X(r);
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
          const t = r.rules.findIndex((i) => !o.isUndefined(i.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = `${r.label}是必填项`) : r.rules.unshift({
            required: !0,
            message: `${r.label}是必填项`,
            trigger: ["input", "blur"]
          });
        }
      else if (r.rules) {
        const t = (e = r.rules) == null ? void 0 : e.findIndex((i) => !!i.required);
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
      placeholder: i,
      componentSlots: s,
      props: n
    }) {
      let a;
      return o.isFunction(t.field) ? a = L(e, t.field()) : a = e[t.field], b(r, U({
        value: a,
        "onUpdate:value": (l) => {
          o.isFunction(t.field) ? D(e, t.field(), l) : e[t.field] = l;
        },
        placeholder: i
      }, n), {
        ...s
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((i) => i ? t(i) : e(r.cleanFallbackFields(R(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      var e, t;
      (t = (e = r.formRef.value) == null ? void 0 : e.restoreValidation) == null || t.call(e);
    }
  }
}, E = class E {
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
u(E, "schemaPreset", {
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
}), u(E, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
u(E, "placeholderPresetByComponentName", E.getPlaceholderPrefixPresetByComponentName());
let J = E;
const C = {
  ...J,
  adapters: {
    ...yr
  }
}, Cr = /* @__PURE__ */ He({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(r) {
    const e = new gr(r.setup);
    return () => e.exec();
  }
});
function Ir(r) {
  const e = new Ke(r);
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
function Sr(r) {
  c.presets = r;
}
function re(r, e) {
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
function Or(r) {
  return re(r, "native");
}
function Fr(r) {
  return r.__proform_raw_object = !0, r;
}
function jr(r) {
  return re(r, "onetime");
}
function wr(r) {
  function e() {
    return r;
  }
  return re(
    e,
    "structured_path_parsing_mark"
  );
}
export {
  Cr as ProForm,
  Or as markNativeFunction,
  Fr as markNativeObject,
  jr as markOnetimeFunction,
  wr as markStructuredPathParsing,
  Ir as useForm,
  Sr as useFormPresetConfigurer,
  re as useModifiers
};
