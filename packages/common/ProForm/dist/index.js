var Ue = Object.defineProperty;
var ze = (t, e, r) => e in t ? Ue(t, e, { enumerable: !0, configurable: !0, writable: !0, value: r }) : t[e] = r;
var u = (t, e, r) => (ze(t, typeof e != "symbol" ? e + "" : e, r), r);
import { ref as z, readonly as _e, nextTick as P, isRef as q, watch as _, isReactive as T, toRaw as x, reactive as Pe, createVNode as y, mergeProps as N, withDirectives as Le, vShow as De, createTextVNode as Ge, isVNode as Be, defineComponent as ke } from "vue";
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
      Array.isArray(t) || (t = []), r.forEach((i, s) => {
        typeof i == "object" && i !== null ? t[s] = h(Array.isArray(i) ? [] : {}, i) : t[s] = i;
      });
    else
      for (const i in r)
        r.hasOwnProperty(i) && (typeof r[i] == "object" && r[i] !== null ? t[i] = h(t[i] || {}, r[i]) : t[i] = r[i]);
  }), t;
}
function I(t) {
  const e = /* @__PURE__ */ new WeakMap();
  function r(i) {
    if (i === null || typeof i != "object")
      return i;
    if (i instanceof Date)
      return new Date(i);
    if (i instanceof RegExp)
      return new RegExp(i);
    if (i instanceof Map) {
      const n = /* @__PURE__ */ new Map();
      for (const [a, l] of i)
        n.set(r(a), r(l));
      return n;
    }
    if (i instanceof Set) {
      const n = /* @__PURE__ */ new Set();
      for (const a of i)
        n.add(r(a));
      return n;
    }
    if (e.has(i))
      return e.get(i);
    if (Array.isArray(i)) {
      const n = [];
      e.set(i, n);
      for (let a = 0; a < i.length; a++)
        n[a] = r(i[a]);
      return n;
    }
    const s = Object.create(Object.getPrototypeOf(i));
    e.set(i, s);
    for (const n in i)
      i.hasOwnProperty(n) && (s[n] = r(i[n]));
    return s;
  }
  return r(t);
}
function K(t, e) {
  return t.replace(/undefined/g, e);
}
class He {
  constructor(e) {
    u(this, "runtimeCore");
    u(this, "readonlyReactiveModel", z({}));
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
    var i;
    const e = (i = f.getPreset(this.runtimeCore.ui)) == null ? void 0 : i.adapter, r = C.adapters[f.getUI(this.runtimeCore.ui)];
    return (e == null ? void 0 : e.validateForm(this)) ?? (r == null ? void 0 : r.validateForm(this));
  }
  hydrate(e) {
    P(() => {
      this.runtimeCore.hydrateEffect.trackEffect(
        () => {
          q(e) ? _(
            () => e.value,
            () => {
              h(this.runtimeCore.model.value, e.value);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : T(e) ? _(
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
    P(() => {
      if (q(e)) {
        const r = _(
          () => e.value,
          () => {
            h(this.runtimeCore.shared, e.value), P(() => {
              r();
            });
          },
          {
            deep: !0,
            immediate: !0
          }
        );
      } else if (T(e)) {
        const r = _(
          () => e,
          () => {
            h(this.runtimeCore.shared, e), P(() => {
              r();
            });
          },
          {
            deep: !0,
            immediate: !0
          }
        );
      } else
        h(this.runtimeCore.shared, e);
    });
  }
  subscribeModel(e) {
    P(() => {
      const r = _(
        () => this.readonlyReactiveModel.value,
        (i) => {
          e(i, {
            stopSubscribe() {
              P(() => {
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
    (e = this.runtimeCore) != null && e.model.value && (this.runtimeCore.model.value = I(
      this.runtimeCore.processor.stableModel
    ), this.readonlyReactiveModel.value = _e(this.runtimeCore.model.value), this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore));
  }
}
class X {
  constructor() {
    u(this, "effects", /* @__PURE__ */ new Set());
    u(this, "identifierMap", /* @__PURE__ */ new Map());
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
    return !r.lazy && e(), r.identifier ? this.identifierMap.get(r.identifier) || (this.effects.add(e), this.identifierMap.set(r.identifier, !0)) : this.effects.add(e), () => this.effects.delete(e);
  }
}
var We = typeof global == "object" && global && global.Object === Object && global, Ke = typeof self == "object" && self && self.Object === Object && self, Z = We || Ke || Function("return this")(), E = Z.Symbol, je = Object.prototype, Xe = je.hasOwnProperty, Ye = je.toString, V = E ? E.toStringTag : void 0;
function Ze(t) {
  var e = Xe.call(t, V), r = t[V];
  try {
    t[V] = void 0;
    var i = !0;
  } catch {
  }
  var s = Ye.call(t);
  return i && (e ? t[V] = r : delete t[V]), s;
}
var Je = Object.prototype, Qe = Je.toString;
function Ae(t) {
  return Qe.call(t);
}
var et = "[object Null]", tt = "[object Undefined]", Ie = E ? E.toStringTag : void 0;
function we(t) {
  return t == null ? t === void 0 ? tt : et : Ie && Ie in Object(t) ? Ze(t) : Ae(t);
}
function rt(t) {
  return t != null && typeof t == "object";
}
var it = "[object Symbol]";
function J(t) {
  return typeof t == "symbol" || rt(t) && we(t) == it;
}
function st(t, e) {
  for (var r = -1, i = t == null ? 0 : t.length, s = Array(i); ++r < i; )
    s[r] = e(t[r], r, t);
  return s;
}
var Q = Array.isArray, nt = 1 / 0, Ce = E ? E.prototype : void 0, Se = Ce ? Ce.toString : void 0;
function Me(t) {
  if (typeof t == "string")
    return t;
  if (Q(t))
    return st(t, Me) + "";
  if (J(t))
    return Se ? Se.call(t) : "";
  var e = t + "";
  return e == "0" && 1 / t == -nt ? "-0" : e;
}
function G(t) {
  var e = typeof t;
  return t != null && (e == "object" || e == "function");
}
var ot = "[object AsyncFunction]", at = "[object Function]", lt = "[object GeneratorFunction]", ut = "[object Proxy]";
function ct(t) {
  if (!G(t))
    return !1;
  var e = we(t);
  return e == at || e == lt || e == ot || e == ut;
}
var H = Z["__core-js_shared__"], Oe = function() {
  var t = /[^.]+$/.exec(H && H.keys && H.keys.IE_PROTO || "");
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
var mt = /[\\^$.*+?()[\]{}|]/g, yt = /^\[object .+?Constructor\]$/, bt = Function.prototype, gt = Object.prototype, vt = bt.toString, _t = gt.hasOwnProperty, Pt = RegExp(
  "^" + vt.call(_t).replace(mt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function It(t) {
  if (!G(t) || ft(t))
    return !1;
  var e = ct(t) ? Pt : yt;
  return e.test(ht(t));
}
function Ct(t, e) {
  return t == null ? void 0 : t[e];
}
function A(t, e) {
  var r = Ct(t, e);
  return It(r) ? r : void 0;
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
function jt(t, e, r) {
  e == "__proto__" && Fe ? Fe(t, e, {
    configurable: !0,
    enumerable: !0,
    value: r,
    writable: !0
  }) : t[e] = r;
}
function xe(t, e) {
  return t === e || t !== t && e !== e;
}
var wt = Object.prototype, Mt = wt.hasOwnProperty;
function xt(t, e, r) {
  var i = t[e];
  (!(Mt.call(t, e) && xe(i, r)) || r === void 0 && !(e in t)) && jt(t, e, r);
}
var Et = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Rt = /^\w*$/;
function $t(t, e) {
  if (Q(t))
    return !1;
  var r = typeof t;
  return r == "number" || r == "symbol" || r == "boolean" || t == null || J(t) ? !0 : Rt.test(t) || !Et.test(t) || e != null && t in Object(e);
}
var U = A(Object, "create");
function Vt() {
  this.__data__ = U ? U(null) : {}, this.size = 0;
}
function Nt(t) {
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
var Bt = "__lodash_hash_undefined__";
function kt(t, e) {
  var r = this.__data__;
  return this.size += this.has(t) ? 0 : 1, r[t] = U && e === void 0 ? Bt : e, this;
}
function F(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var i = t[e];
    this.set(i[0], i[1]);
  }
}
F.prototype.clear = Vt;
F.prototype.delete = Nt;
F.prototype.get = zt;
F.prototype.has = Gt;
F.prototype.set = kt;
function Ht() {
  this.__data__ = [], this.size = 0;
}
function B(t, e) {
  for (var r = t.length; r--; )
    if (xe(t[r][0], e))
      return r;
  return -1;
}
var Wt = Array.prototype, Kt = Wt.splice;
function Xt(t) {
  var e = this.__data__, r = B(e, t);
  if (r < 0)
    return !1;
  var i = e.length - 1;
  return r == i ? e.pop() : Kt.call(e, r, 1), --this.size, !0;
}
function Yt(t) {
  var e = this.__data__, r = B(e, t);
  return r < 0 ? void 0 : e[r][1];
}
function Zt(t) {
  return B(this.__data__, t) > -1;
}
function Jt(t, e) {
  var r = this.__data__, i = B(r, t);
  return i < 0 ? (++this.size, r.push([t, e])) : r[i][1] = e, this;
}
function R(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var i = t[e];
    this.set(i[0], i[1]);
  }
}
R.prototype.clear = Ht;
R.prototype.delete = Xt;
R.prototype.get = Yt;
R.prototype.has = Zt;
R.prototype.set = Jt;
var Qt = A(Z, "Map");
function At() {
  this.size = 0, this.__data__ = {
    hash: new F(),
    map: new (Qt || R)(),
    string: new F()
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
function ir(t) {
  return k(this, t).has(t);
}
function sr(t, e) {
  var r = k(this, t), i = r.size;
  return r.set(t, e), this.size += r.size == i ? 0 : 1, this;
}
function j(t) {
  var e = -1, r = t == null ? 0 : t.length;
  for (this.clear(); ++e < r; ) {
    var i = t[e];
    this.set(i[0], i[1]);
  }
}
j.prototype.clear = At;
j.prototype.delete = tr;
j.prototype.get = rr;
j.prototype.has = ir;
j.prototype.set = sr;
var nr = "Expected a function";
function ee(t, e) {
  if (typeof t != "function" || e != null && typeof e != "function")
    throw new TypeError(nr);
  var r = function() {
    var i = arguments, s = e ? e.apply(this, i) : i[0], n = r.cache;
    if (n.has(s))
      return n.get(s);
    var a = t.apply(this, i);
    return r.cache = n.set(s, a) || n, a;
  };
  return r.cache = new (ee.Cache || j)(), r;
}
ee.Cache = j;
var or = 500;
function ar(t) {
  var e = ee(t, function(i) {
    return r.size === or && r.clear(), i;
  }), r = e.cache;
  return e;
}
var lr = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, ur = /\\(\\)?/g, cr = ar(function(t) {
  var e = [];
  return t.charCodeAt(0) === 46 && e.push(""), t.replace(lr, function(r, i, s, n) {
    e.push(s ? n.replace(ur, "$1") : i || r);
  }), e;
});
function fr(t) {
  return t == null ? "" : Me(t);
}
function Ee(t, e) {
  return Q(t) ? t : $t(t, e) ? [t] : cr(fr(t));
}
var dr = 1 / 0;
function Re(t) {
  if (typeof t == "string" || J(t))
    return t;
  var e = t + "";
  return e == "0" && 1 / t == -dr ? "-0" : e;
}
function pr(t, e) {
  e = Ee(e, t);
  for (var r = 0, i = e.length; t != null && r < i; )
    t = t[Re(e[r++])];
  return r && r == i ? t : void 0;
}
function L(t, e, r) {
  var i = t == null ? void 0 : pr(t, e);
  return i === void 0 ? r : i;
}
function hr(t, e, r, i) {
  if (!G(t))
    return t;
  e = Ee(e, t);
  for (var s = -1, n = e.length, a = n - 1, l = t; l != null && ++s < n; ) {
    var c = Re(e[s]), d = r;
    if (c === "__proto__" || c === "constructor" || c === "prototype")
      return t;
    if (s != a) {
      var p = l[c];
      d = i ? i(p, c, l) : void 0, d === void 0 && (d = G(p) ? p : Ft(e[s + 1]) ? [] : {});
    }
    xt(l, c, d), l = l[c];
  }
  return t;
}
function D(t, e, r) {
  return t == null ? t : hr(t, e, r);
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
    u(this, "schemaEffect", new X());
    u(this, "defaultValueEffect", new X());
    u(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    u(this, "baseDefaultValueFunctionsLength");
    u(this, "isModelInitialized", !0);
    this.runtimeCore = e, this.processedSchemas = e.schemas, this.processedModel = e.model, this.getRuntimeMeta = e.getRuntimeMeta.bind(e), _(
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
    e.forEach((i, s) => {
      this.parseItem(i, s, r);
    });
  }
  // 初始化空数据结构，避免后续复杂的 if else
  initSchemas(e) {
    return e.map((r) => {
      const i = {};
      return r.children && (i.children = this.initSchemas(r.children)), i;
    });
  }
  countFunctionDefaultValues(e) {
    let r = 0;
    const i = /* @__PURE__ */ new Set();
    function s(n) {
      if (!i.has(n) && (Array.isArray(n) || n !== null && typeof n == "object")) {
        i.add(n);
        for (const a in n)
          n.hasOwnProperty(a) && (a === "defaultValue" && typeof n[a] == "function" && !n[a].toString().includes("[native code]") && r++, s(n[a]));
      }
    }
    return s(e), r;
  }
  // 派生过程，用于外部应用
  parseSchemas(e, r) {
    o.isArrayEmpty(this.processedSchemas.value) && (this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
      I(e)
    ), this.processedSchemas.value = this.initSchemas(e)), this.parse(e, r);
  }
  parseStable(e) {
    const r = {};
    if (!o.isUndefined(e.stable))
      r[e.key] = this.parseStable(e.stable);
    else
      return e;
    return r;
  }
  // 对于稳定初始化更新的抽象
  stableUpdater(e = []) {
    if (e.every(Boolean)) {
      const r = x(this.processedSchemas.value);
      !o.isProcessInprogress(r) && o.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: r.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(r));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, r, i) {
    const s = this, n = Array.from({
      length: Object.keys(e).filter((l) => l !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: r, updater: a, parentMeta: i });
    function a(l) {
      const c = l.index, d = l.key, p = l.keyIndex;
      if (o.isUndefined(l.stable))
        return;
      const m = s.parseStable(l.stable), g = i == null ? void 0 : i.index, S = i == null ? void 0 : i.key;
      let v = m;
      if (o.isProcessInprogress(v) || (n[p] = !0), i) {
        const b = s.processedSchemas.value[g][S][c][d];
        b && o.isObject(b) && d !== "component" && (v = h(b, v)), s.processedSchemas.value[g][S][c][d] = v, s.stableUpdater(n);
      } else {
        const b = s.processedSchemas.value[c][d];
        b && o.isObject(b) && d !== "component" && (v = h(b, v)), s.processedSchemas.value[c][d] = v, s.stableUpdater(n);
      }
    }
  }
  // 只做基本的对象 parser
  objectParser(e) {
    const r = e.data;
    Object.keys(r).forEach((s, n) => {
      var a, l;
      if (s === "children")
        this.parseSchemas(r[s], {
          ...e,
          key: s,
          keyIndex: n
        });
      else {
        const c = (d) => {
          e.updater({
            ...e,
            key: s,
            keyIndex: n,
            stable: d
          });
        };
        o.isFunction(r[s]) ? s !== "defaultValue" ? this.schemaEffect.trackEffect(
          () => {
            if (s === "component") {
              const d = r[s](this.getRuntimeMeta());
              this.promiseFieldParser(d, c, !1, {
                rootIndex: e.index,
                parentMeta: e.parentMeta
              });
            } else
              this.fieldParser(r[s], c, {
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
                /\{\s*model\s*\}/.test(r[s].toString()) ? this.fieldParser(
                  r[s],
                  (p) => {
                    if (!p)
                      return c(p);
                    this.defaultValueInprogressMap.set(r[s], p), !o.isProcessInprogress(p) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                      this.defaultValueInprogressMap.values()
                    ).every((m) => {
                      var g;
                      return !((g = m == null ? void 0 : m.includes) != null && g.call(m, "undefined"));
                    }) ? (c(p), this.defaultValueEffect.clearEffects(), P(() => {
                      d();
                    })) : c(p);
                  },
                  {
                    rootIndex: e.index,
                    parentMeta: e.parentMeta
                  }
                ) : this.fieldParser(
                  r[s],
                  (p) => {
                    this.defaultValueInprogressMap.set(r[s], p), !o.isProcessInprogress(p) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                      this.defaultValueInprogressMap.values()
                    ).every((m) => {
                      var g;
                      return !((g = m == null ? void 0 : m.includes) != null && g.call(m, "undefined"));
                    }) ? (c(p), this.defaultValueEffect.clearEffects(), P(() => {
                      d();
                    })) : c(p);
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
        ) : s === "component" || s === "slots" || s === "runtime" ? this.promiseFieldParser(r[s], c, !1, {
          rootIndex: e.index,
          parentMeta: e.parentMeta
        }) : this.fieldParser(r[s], c, {
          rootIndex: e.index,
          parentMeta: e.parentMeta
        });
      }
    });
  }
  promiseFieldParser(e, r, i, s) {
    o.isPromise(e) ? e.then((n) => {
      o.isString(n) && (n = K(n, "")), i && o.isObject(n) && !o.isNativeObject(n) ? this.objectParser({
        data: n,
        updater: r,
        index: s.rootIndex,
        parentMeta: s.parentMeta
      }) : r(n);
    }) : (o.isString(e) && (e = K(e, "")), i && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
      data: e,
      updater: r,
      index: s.rootIndex,
      parentMeta: s.parentMeta
    }) : r(e));
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(e, r, i, s = !0) {
    if (o.isFunction(e))
      if (e.name.startsWith("__proform_raw_"))
        r(
          (...n) => e({
            rawArgs: n,
            ...this.getRuntimeMeta()
          })
        );
      else if (e.name.startsWith("__proform_structured_path_parsing_mark_"))
        r(e);
      else if (e.__proform_cached_result) {
        const n = e.__proform_cached_result;
        this.promiseFieldParser(n, r, s, i);
      } else {
        const n = e(this.getRuntimeMeta());
        e.name.startsWith("__proform_onetime_") && (e.__proform_cached_result = n), this.promiseFieldParser(n, r, s, i);
      }
    else
      q(e) ? _(
        () => e.value,
        () => {
          o.isUndefined(e.value) || (s && o.isObject(e.value) && !o.isNativeObject(e.value) ? this.objectParser({
            data: e.value,
            updater: r,
            index: i.rootIndex,
            parentMeta: i.parentMeta
          }) : r(e.value));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : T(e) ? _(
        () => e,
        () => {
          o.isUndefined(e) || (s && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
            data: e,
            updater: r,
            index: i.rootIndex,
            parentMeta: i.parentMeta
          }) : r(e));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : s && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
        data: e,
        updater: r,
        index: i.rootIndex,
        parentMeta: i.parentMeta
      }) : r(e);
  }
  modelProcessor(e) {
    e.map(
      (r) => this.createModel(r, this.processedModel.value)
    ), o.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && (this.stableModel = I(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects());
  }
  setModel(e, r, i) {
    o.isFunction(r) ? D(e, r(), i) : e[r] = i;
  }
  createModel(e, r) {
    if (o.isListSchema(e) && (r[e.field] || this.setModel(r, e.field, [{}]), e.children.forEach((i) => {
      this.createModel(i, r[e.field][0]);
    })), o.isGroupSchema(e) && e.children.forEach((i) => {
      this.createModel(i, r);
    }), o.isItemSchema(e))
      if ("defaultValue" in e)
        this.setModel(r, e.field, e.defaultValue);
      else {
        if (o.isFunction(e.field) && L(r, e.field()))
          return;
        if (o.isString(e.field) && r[e.field])
          return;
        this.setModel(r, e.field, void 0);
      }
  }
}
class w {
  static getFormContainer({ ui: e } = {}) {
    return f.presets.uiPresets[e ?? f.presets.ui].container.Form;
  }
  static getFormItemContainer({ ui: e } = {}) {
    return f.presets.uiPresets[e ?? f.presets.ui].container.FormItem;
  }
  static getItemContainer({ ui: e } = {}) {
    return f.presets.uiPresets[e ?? f.presets.ui].container.Item;
  }
  static getGroupContainer({ ui: e } = {}) {
    return f.presets.uiPresets[e ?? f.presets.ui].container.Group;
  }
  static getListContainer({ ui: e } = {}) {
    return f.presets.uiPresets[e ?? f.presets.ui].container.List;
  }
  static getListItemContainer({ ui: e } = {}) {
    return f.presets.uiPresets[e ?? f.presets.ui].container.ListItem;
  }
}
class yr {
  constructor(e) {
    this.ui = e;
  }
  getRuntimeNative() {
    var r;
    return (r = f.presets.uiPresets[this.ui]) == null ? void 0 : r.native;
  }
  getRuntimeField(e) {
    var s;
    const r = (s = f.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[f.getUI(this.ui)];
    return (r == null ? void 0 : r.getRuntimeField(e)) ?? (i == null ? void 0 : i.getRuntimeField(e));
  }
  getRuntimeRequired(e) {
    var s;
    const r = (s = f.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[f.getUI(this.ui)];
    return (r == null ? void 0 : r.getRuntimeRequired(e)) ?? (i == null ? void 0 : i.getRuntimeRequired(e));
  }
  getFormModelPropName() {
    var i;
    const e = (i = f.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, r = C.adapters[f.getUI(this.ui)];
    return (e == null ? void 0 : e.getFormModelPropName()) ?? (r == null ? void 0 : r.getFormModelPropName());
  }
  formComponentRenderer(e) {
    var s;
    const r = (s = f.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[f.getUI(this.ui)];
    return (r == null ? void 0 : r.formComponentRenderer(e)) ?? (i == null ? void 0 : i.formComponentRenderer(e));
  }
  clearValidate(e) {
    var s;
    const r = (s = f.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = C.adapters[f.getUI(this.ui)];
    return (r == null ? void 0 : r.clearValidate(e)) ?? (i == null ? void 0 : i.clearValidate(e));
  }
}
function br(t) {
  return typeof t == "function" || Object.prototype.toString.call(t) === "[object Object]" && !Be(t);
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
    u(this, "hydrateEffect", new X());
    u(this, "native", Pe({}));
    u(this, "grid", {});
    u(this, "runtime", {});
    u(this, "globalNativeFormOverride", Pe({
      props: {
        Form: {},
        FormItem: {}
      },
      slots: {
        Form: {},
        FormItem: {}
      }
    }));
    u(this, "shared", {});
    this.setup = e, this.processor = new mr(this);
    const r = this.setup(this);
    if (this.ui = r.ui ?? f.presets.ui, this.runtimeAdapter = new yr(this.ui), Object.assign(this.globalNativeFormOverride, this.runtimeAdapter.getRuntimeNative()), q(r.schemas))
      _(
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
      const i = _(() => r.schemas, () => {
        this.processor.parseSchemas(r.schemas), P(() => {
          i();
        });
      }, {
        deep: !0
      });
    } else
      this.processor.parseSchemas(r.schemas);
  }
  getRuntimeMeta() {
    const e = x(I(this.model.value));
    let r;
    return {
      model: e,
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (i) => {
        r && clearTimeout(r), r = setTimeout(() => {
          if (q(i)) {
            const s = _(() => i.value, () => {
              h(this.shared, i.value), P(() => {
                s();
              });
            }, {
              deep: !0,
              immediate: !0
            });
          } else if (T(i)) {
            const s = _(() => i, () => {
              h(this.shared, i), P(() => {
                s();
              });
            }, {
              deep: !0,
              immediate: !0
            });
          } else
            h(this.shared, i);
        }, 0);
      }
    };
  }
  runtimeItemProcessor(e, r, i = this.model.value, s) {
    var re, ie, se, ne, oe, ae, le, ue, ce, fe, de, pe, he, me, ye, be, ge;
    const n = x(e.component);
    if (!n)
      return;
    (ie = (re = e.native) == null ? void 0 : re.props) != null && ie.Form && h(this.globalNativeFormOverride.props.Form, (ne = (se = e.native) == null ? void 0 : se.props) == null ? void 0 : ne.Form), (ae = (oe = e.native) == null ? void 0 : oe.slots) != null && ae.Form && h(this.globalNativeFormOverride.slots.Form, (ue = (le = e.native) == null ? void 0 : le.slots) == null ? void 0 : ue.Form);
    const a = h(I((fe = (ce = this.native) == null ? void 0 : ce.slots) == null ? void 0 : fe.FormItem) ?? {}, (pe = (de = e.native) == null ? void 0 : de.slots) == null ? void 0 : pe.FormItem), l = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, c = h(I((me = (he = this.native) == null ? void 0 : he.props) == null ? void 0 : me.FormItem) ?? {}, (be = (ye = e.native) == null ? void 0 : ye.props) == null ? void 0 : be.FormItem), d = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: s,
      index: r
    }), p = n.name, m = e.componentProps ?? {}, g = C.placeholderPresetByComponentName;
    let S = e.placeholder, v = e.show;
    v === void 0 && (v = !0);
    let b = e.label ?? "", O;
    if (e.runtime ? O = e.runtime : O = (s == null ? void 0 : s.runtime) ?? this.runtime, !o.isUndefined(r) && !o.isObjectEmpty(O) && (b = K((ge = O == null ? void 0 : O.customizeListItemLabel) == null ? void 0 : ge.call(O, e.label ?? "", r + 1), "")), !S) {
      let $ = "请输入";
      o.isUndefined(p) ? S = `${$}${b}` : /* @ts-expect-error */ g[p.toLowerCase()] ? ($ = // @ts-expect-error
      g[p.toLowerCase()], S = `${$}${b}`) : (Object.keys(g).forEach((ve) => {
        p.toLowerCase().includes(ve.toLowerCase()) && ($ = g[ve]);
      }), S = `${$}${b}`);
    }
    const $e = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: b
    }), Ve = w.getItemContainer(this), Ne = w.getFormItemContainer(this), qe = this, Te = e.componentSlots;
    return y("div", {
      style: l
    }, [y(Ve, {
      show: v
    }, {
      default() {
        return v && y(Ne, N(c, {
          label: `${b ? `${b}:` : ""}`
        }, d, $e), {
          default() {
            return qe.runtimeAdapter.formComponentRenderer({
              Component: n,
              schema: e,
              baseModel: i,
              placeholder: S,
              componentSlots: Te,
              props: m
            });
          },
          ...a
        });
      }
    })]);
  }
  runtimeGroupProcessor(e) {
    let r;
    const i = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, s = w.getGroupContainer(this);
    let n = e.show;
    return n === void 0 && (n = !0), y("div", {
      style: i
    }, [n && y(s, {
      schema: e
    }, br(r = e.children.map((a) => this.runtimeItemProcessor(a))) ? r : {
      default: () => [r]
    })]);
  }
  addListItem(e) {
    var r, i;
    if (!((r = this.processor.stableModel[e.field]) != null && r[0]))
      return Promise.reject({
        code: "0001",
        message: "异步默认值数据正在处理中，请您耐心等待... "
      });
    (i = this.processor.stableModel[e.field]) != null && i[0] && this.model.value[e.field].push(I(this.processor.stableModel[e.field][0])), this.runtimeAdapter.clearValidate(this);
  }
  deleteListItem(e, r) {
    this.model.value[e.field].splice(r, 1), this.runtimeAdapter.clearValidate(this);
  }
  runtimeListProcessor(e) {
    const r = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, i = this;
    i.model.value[e.field] || (i.model.value[e.field] = [{}]);
    let s = e.show;
    s === void 0 && (s = !0);
    const n = w.getListContainer(this), a = w.getListItemContainer(this);
    return y("div", {
      style: r
    }, [s && y(n, {
      schema: e
    }, {
      default() {
        return i.model.value[e.field].map((l, c) => y(a, null, {
          default() {
            return e.children.map((d) => i.runtimeItemProcessor(d, c, l, e));
          },
          delete({
            container: d
          } = {}) {
            var m;
            const p = d ?? y("button", null, null);
            return Le(y(p, {
              onClick: () => i.deleteListItem(e, c)
            }, null), [[De, ((m = i.model.value[e.field]) == null ? void 0 : m.length) > 1]]);
          }
        }));
      },
      add({
        container: l
      } = {}) {
        const c = l ?? y("button", null, [Ge("添加")]);
        return y(c, {
          onClick: () => i.addListItem(e)
        }, null);
      }
    })]);
  }
  runtimeProcessor(e) {
    return e.map((r) => (r.type || (r.type = "item"), this.processorBySchemaType[r.type](r)));
  }
  exec() {
    var l, c, d, p;
    const e = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.grid
    }, r = this, i = h(this.globalNativeFormOverride.props.Form, I((c = (l = this.native) == null ? void 0 : l.props) == null ? void 0 : c.Form) ?? {}), s = h(this.globalNativeFormOverride.slots.Form, I((p = (d = this.native) == null ? void 0 : d.slots) == null ? void 0 : p.Form) ?? {}), n = w.getFormContainer(this), a = this.runtimeAdapter.getFormModelPropName();
    return y(n, N(i, {
      ref: this.formRef
    }, {
      [a]: this.model.value
    }), {
      default() {
        return y("div", {
          style: e
        }, [r.runtimeProcessor(r.schemas.value)]);
      },
      ...s
    });
  }
}
class f {
  static getPreset(e) {
    var r, i, s;
    return (i = (r = this.presets.uiPresets) == null ? void 0 : r[e]) != null && i.extend ? this.presets.uiPresets[(s = this.presets.uiPresets[e]) == null ? void 0 : s.extend] : this.presets.uiPresets[e];
  }
  static getUI(e) {
    var r, i, s;
    return (i = (r = this.presets.uiPresets) == null ? void 0 : r[e]) != null && i.extend ? (s = this.presets.uiPresets[e]) == null ? void 0 : s.extend : e;
  }
}
u(f, "presets");
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
      return o.isFunction(e) ? {
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
          const r = t.rules.findIndex((i) => !o.isUndefined(i.required));
          r !== -1 ? (t.rules[r].required = !0, t.rules[r].message = `${t.label}是必填项`) : t.rules.unshift({
            required: !0,
            message: `${t.label}是必填项`
          });
        }
      else if (t.rules) {
        const r = (e = t.rules) == null ? void 0 : e.findIndex((i) => !!i.required);
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
      placeholder: i,
      componentSlots: s,
      props: n
    }) {
      let a;
      return o.isFunction(r.field) ? a = L(e, r.field()) : a = e[r.field], y(t, N({
        modelValue: a,
        "onUpdate:modelValue": (l) => {
          o.isFunction(r.field) ? D(e, r.field(), l) : e[r.field] = l;
        },
        placeholder: i
      }, n), {
        ...s
      });
    },
    validateForm(t) {
      return new Promise((e, r) => {
        t.runtimeCore.formRef.value.validate((i) => i ? r(i) : e(t.cleanFallbackFields(x(t.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(t) {
      var e, r;
      (r = (e = t.formRef.value) == null ? void 0 : e.clearValidate) == null || r.call(e);
    }
  },
  NutUI: {
    getRuntimeField(t) {
      const e = W(t);
      return o.isFunction(e) ? {
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
          const r = t.rules.findIndex((i) => !o.isUndefined(i.required));
          r !== -1 ? (t.rules[r].required = !0, t.rules[r].message = `${t.label}是必填项`) : t.rules.unshift({
            required: !0,
            message: `${t.label}是必填项`
          });
        }
      else if (t.rules) {
        const r = (e = t.rules) == null ? void 0 : e.findIndex((i) => !!i.required);
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
      placeholder: i,
      componentSlots: s,
      props: n
    }) {
      let a;
      return o.isFunction(r.field) ? a = L(e, r.field()) : a = e[r.field], y(t, N({
        modelValue: a,
        "onUpdate:modelValue": (l) => {
          o.isFunction(r.field) ? D(e, r.field(), l) : e[r.field] = l;
        },
        placeholder: i
      }, n), {
        ...s
      });
    },
    validateForm(t) {
      return new Promise((e, r) => {
        t.runtimeCore.formRef.value.validate().then(({
          valid: i,
          errors: s
        }) => {
          i ? e(t.cleanFallbackFields(x(t.runtimeCore.processor.processedModel.value))) : r(s);
        });
      });
    },
    clearValidate(t) {
      var e, r;
      (r = (e = t.formRef.value) == null ? void 0 : e.reset) == null || r.call(e);
    }
  },
  NaiveUI: {
    getRuntimeField(t) {
      const e = W(t);
      return o.isFunction(e) ? {
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
          const r = t.rules.findIndex((i) => !o.isUndefined(i.required));
          r !== -1 ? (t.rules[r].required = !0, t.rules[r].message = `${t.label}是必填项`) : t.rules.unshift({
            required: !0,
            message: `${t.label}是必填项`,
            trigger: ["input", "blur"]
          });
        }
      else if (t.rules) {
        const r = (e = t.rules) == null ? void 0 : e.findIndex((i) => !!i.required);
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
      placeholder: i,
      componentSlots: s,
      props: n
    }) {
      let a;
      return o.isFunction(r.field) ? a = L(e, r.field()) : a = e[r.field], y(t, N({
        value: a,
        "onUpdate:value": (l) => {
          o.isFunction(r.field) ? D(e, r.field(), l) : e[r.field] = l;
        },
        placeholder: i
      }, n), {
        ...s
      });
    },
    validateForm(t) {
      return new Promise((e, r) => {
        t.runtimeCore.formRef.value.validate((i) => i ? r(i) : e(t.cleanFallbackFields(x(t.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(t) {
      var e, r;
      (r = (e = t.formRef.value) == null ? void 0 : e.restoreValidation) == null || r.call(e);
    }
  }
}, M = class M {
  static getPlaceholderPrefixPresetByComponentName() {
    const e = {
      请选择: ["select", "tree"],
      请输入: ["input"]
    }, r = {};
    for (const i in e)
      e[i].forEach((s) => {
        r[s] = i;
      });
    return r;
  }
};
u(M, "schemaPreset", {
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
}), u(M, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
u(M, "placeholderPresetByComponentName", M.getPlaceholderPrefixPresetByComponentName());
let Y = M;
const C = {
  ...Y,
  adapters: {
    ...vr
  }
}, Ir = /* @__PURE__ */ ke({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(t) {
    const e = new gr(t.setup);
    return () => e.exec();
  }
});
function Cr(t) {
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
  f.presets = t;
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
function jr(t) {
  return te(t, "onetime");
}
function wr(t) {
  function e() {
    return t;
  }
  return te(
    e,
    "structured_path_parsing_mark"
  );
}
export {
  Ir as ProForm,
  Or as markNativeFunction,
  Fr as markNativeObject,
  jr as markOnetimeFunction,
  wr as markStructuredPathParsing,
  Cr as useForm,
  Sr as useFormPresetConfigurer,
  te as useModifiers
};
