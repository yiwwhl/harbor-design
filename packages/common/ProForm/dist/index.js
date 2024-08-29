var Ge = Object.defineProperty;
var Be = (r, e, t) => e in r ? Ge(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var l = (r, e, t) => (Be(r, typeof e != "symbol" ? e + "" : e, t), t);
import { ref as H, readonly as Ee, nextTick as S, isRef as T, watch as w, isReactive as z, watchEffect as G, toRaw as $, reactive as Y, createVNode as m, mergeProps as q, withDirectives as Ke, vShow as We, createTextVNode as Xe, isVNode as Ye, defineComponent as Ze } from "vue";
var Je = typeof global == "object" && global && global.Object === Object && global, Qe = typeof self == "object" && self && self.Object === Object && self, ee = Je || Qe || Function("return this")(), M = ee.Symbol, Re = Object.prototype, Ae = Re.hasOwnProperty, ke = Re.toString, U = M ? M.toStringTag : void 0;
function et(r) {
  var e = Ae.call(r, U), t = r[U];
  try {
    r[U] = void 0;
    var i = !0;
  } catch {
  }
  var s = ke.call(r);
  return i && (e ? r[U] = t : delete r[U]), s;
}
var tt = Object.prototype, rt = tt.toString;
function it(r) {
  return rt.call(r);
}
var st = "[object Null]", nt = "[object Undefined]", Oe = M ? M.toStringTag : void 0;
function $e(r) {
  return r == null ? r === void 0 ? nt : st : Oe && Oe in Object(r) ? et(r) : it(r);
}
function ot(r) {
  return r != null && typeof r == "object";
}
var at = "[object Symbol]";
function te(r) {
  return typeof r == "symbol" || ot(r) && $e(r) == at;
}
function lt(r, e) {
  for (var t = -1, i = r == null ? 0 : r.length, s = Array(i); ++t < i; )
    s[t] = e(r[t], t, r);
  return s;
}
var re = Array.isArray, ut = 1 / 0, we = M ? M.prototype : void 0, Fe = we ? we.toString : void 0;
function Me(r) {
  if (typeof r == "string")
    return r;
  if (re(r))
    return lt(r, Me) + "";
  if (te(r))
    return Fe ? Fe.call(r) : "";
  var e = r + "";
  return e == "0" && 1 / r == -ut ? "-0" : e;
}
function B(r) {
  var e = typeof r;
  return r != null && (e == "object" || e == "function");
}
var ft = "[object AsyncFunction]", ct = "[object Function]", dt = "[object GeneratorFunction]", ht = "[object Proxy]";
function Ve(r) {
  if (!B(r))
    return !1;
  var e = $e(r);
  return e == ct || e == dt || e == ft || e == ht;
}
var Z = ee["__core-js_shared__"], je = function() {
  var r = /[^.]+$/.exec(Z && Z.keys && Z.keys.IE_PROTO || "");
  return r ? "Symbol(src)_1." + r : "";
}();
function pt(r) {
  return !!je && je in r;
}
var mt = Function.prototype, gt = mt.toString;
function bt(r) {
  if (r != null) {
    try {
      return gt.call(r);
    } catch {
    }
    try {
      return r + "";
    } catch {
    }
  }
  return "";
}
var vt = /[\\^$.*+?()[\]{}|]/g, yt = /^\[object .+?Constructor\]$/, _t = Function.prototype, Pt = Object.prototype, Ct = _t.toString, It = Pt.hasOwnProperty, St = RegExp(
  "^" + Ct.call(It).replace(vt, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Et(r) {
  if (!B(r) || pt(r))
    return !1;
  var e = Ve(r) ? St : yt;
  return e.test(bt(r));
}
function Ot(r, e) {
  return r == null ? void 0 : r[e];
}
function ie(r, e) {
  var t = Ot(r, e);
  return Et(t) ? t : void 0;
}
var xe = function() {
  try {
    var r = ie(Object, "defineProperty");
    return r({}, "", {}), r;
  } catch {
  }
}(), wt = 9007199254740991, Ft = /^(?:0|[1-9]\d*)$/;
function jt(r, e) {
  var t = typeof r;
  return e = e ?? wt, !!e && (t == "number" || t != "symbol" && Ft.test(r)) && r > -1 && r % 1 == 0 && r < e;
}
function xt(r, e, t) {
  e == "__proto__" && xe ? xe(r, e, {
    configurable: !0,
    enumerable: !0,
    value: t,
    writable: !0
  }) : r[e] = t;
}
function Ne(r, e) {
  return r === e || r !== r && e !== e;
}
var Rt = Object.prototype, $t = Rt.hasOwnProperty;
function Mt(r, e, t) {
  var i = r[e];
  (!($t.call(r, e) && Ne(i, t)) || t === void 0 && !(e in r)) && xt(r, e, t);
}
var Vt = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Nt = /^\w*$/;
function Ut(r, e) {
  if (re(r))
    return !1;
  var t = typeof r;
  return t == "number" || t == "symbol" || t == "boolean" || r == null || te(r) ? !0 : Nt.test(r) || !Vt.test(r) || e != null && r in Object(e);
}
var L = ie(Object, "create");
function qt() {
  this.__data__ = L ? L(null) : {}, this.size = 0;
}
function Tt(r) {
  var e = this.has(r) && delete this.__data__[r];
  return this.size -= e ? 1 : 0, e;
}
var zt = "__lodash_hash_undefined__", Lt = Object.prototype, Ht = Lt.hasOwnProperty;
function Dt(r) {
  var e = this.__data__;
  if (L) {
    var t = e[r];
    return t === zt ? void 0 : t;
  }
  return Ht.call(e, r) ? e[r] : void 0;
}
var Gt = Object.prototype, Bt = Gt.hasOwnProperty;
function Kt(r) {
  var e = this.__data__;
  return L ? e[r] !== void 0 : Bt.call(e, r);
}
var Wt = "__lodash_hash_undefined__";
function Xt(r, e) {
  var t = this.__data__;
  return this.size += this.has(r) ? 0 : 1, t[r] = L && e === void 0 ? Wt : e, this;
}
function F(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
F.prototype.clear = qt;
F.prototype.delete = Tt;
F.prototype.get = Dt;
F.prototype.has = Kt;
F.prototype.set = Xt;
function Yt() {
  this.__data__ = [], this.size = 0;
}
function K(r, e) {
  for (var t = r.length; t--; )
    if (Ne(r[t][0], e))
      return t;
  return -1;
}
var Zt = Array.prototype, Jt = Zt.splice;
function Qt(r) {
  var e = this.__data__, t = K(e, r);
  if (t < 0)
    return !1;
  var i = e.length - 1;
  return t == i ? e.pop() : Jt.call(e, t, 1), --this.size, !0;
}
function At(r) {
  var e = this.__data__, t = K(e, r);
  return t < 0 ? void 0 : e[t][1];
}
function kt(r) {
  return K(this.__data__, r) > -1;
}
function er(r, e) {
  var t = this.__data__, i = K(t, r);
  return i < 0 ? (++this.size, t.push([r, e])) : t[i][1] = e, this;
}
function V(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
V.prototype.clear = Yt;
V.prototype.delete = Qt;
V.prototype.get = At;
V.prototype.has = kt;
V.prototype.set = er;
var tr = ie(ee, "Map");
function rr() {
  this.size = 0, this.__data__ = {
    hash: new F(),
    map: new (tr || V)(),
    string: new F()
  };
}
function ir(r) {
  var e = typeof r;
  return e == "string" || e == "number" || e == "symbol" || e == "boolean" ? r !== "__proto__" : r === null;
}
function W(r, e) {
  var t = r.__data__;
  return ir(e) ? t[typeof e == "string" ? "string" : "hash"] : t.map;
}
function sr(r) {
  var e = W(this, r).delete(r);
  return this.size -= e ? 1 : 0, e;
}
function nr(r) {
  return W(this, r).get(r);
}
function or(r) {
  return W(this, r).has(r);
}
function ar(r, e) {
  var t = W(this, r), i = t.size;
  return t.set(r, e), this.size += t.size == i ? 0 : 1, this;
}
function j(r) {
  var e = -1, t = r == null ? 0 : r.length;
  for (this.clear(); ++e < t; ) {
    var i = r[e];
    this.set(i[0], i[1]);
  }
}
j.prototype.clear = rr;
j.prototype.delete = sr;
j.prototype.get = nr;
j.prototype.has = or;
j.prototype.set = ar;
var lr = "Expected a function";
function se(r, e) {
  if (typeof r != "function" || e != null && typeof e != "function")
    throw new TypeError(lr);
  var t = function() {
    var i = arguments, s = e ? e.apply(this, i) : i[0], n = t.cache;
    if (n.has(s))
      return n.get(s);
    var a = r.apply(this, i);
    return t.cache = n.set(s, a) || n, a;
  };
  return t.cache = new (se.Cache || j)(), t;
}
se.Cache = j;
var ur = 500;
function fr(r) {
  var e = se(r, function(i) {
    return t.size === ur && t.clear(), i;
  }), t = e.cache;
  return e;
}
var cr = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, dr = /\\(\\)?/g, hr = fr(function(r) {
  var e = [];
  return r.charCodeAt(0) === 46 && e.push(""), r.replace(cr, function(t, i, s, n) {
    e.push(s ? n.replace(dr, "$1") : i || t);
  }), e;
});
function pr(r) {
  return r == null ? "" : Me(r);
}
function Ue(r, e) {
  return re(r) ? r : Ut(r, e) ? [r] : hr(pr(r));
}
var mr = 1 / 0;
function qe(r) {
  if (typeof r == "string" || te(r))
    return r;
  var e = r + "";
  return e == "0" && 1 / r == -mr ? "-0" : e;
}
function gr(r, e) {
  e = Ue(e, r);
  for (var t = 0, i = e.length; r != null && t < i; )
    r = r[qe(e[t++])];
  return t && t == i ? r : void 0;
}
function D(r, e, t) {
  var i = r == null ? void 0 : gr(r, e);
  return i === void 0 ? t : i;
}
function br(r, e, t, i) {
  if (!B(r))
    return r;
  e = Ue(e, r);
  for (var s = -1, n = e.length, a = n - 1, u = r; u != null && ++s < n; ) {
    var f = qe(e[s]), c = t;
    if (f === "__proto__" || f === "constructor" || f === "prototype")
      return r;
    if (s != a) {
      var h = u[f];
      c = i ? i(h, f, u) : void 0, c === void 0 && (c = B(h) ? h : jt(e[s + 1]) ? [] : {});
    }
    Mt(u, f, c), u = u[f];
  }
  return r;
}
function _(r, e, t) {
  return r == null ? r : br(r, e, t);
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
function Q(r, e) {
  return r.replace(/undefined/g, e);
}
class vr {
  constructor(e) {
    l(this, "runtimeCore");
    l(this, "readonlyReactiveModel", H({}));
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
    return this.runtimeCore = e, this.readonlyReactiveModel.value = Ee(e.model.value), Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var i;
    const e = (i = d.getPreset(this.runtimeCore.ui)) == null ? void 0 : i.adapter, t = I.adapters[d.getUI(this.runtimeCore.ui)];
    return (e == null ? void 0 : e.validateForm(this)) ?? (t == null ? void 0 : t.validateForm(this));
  }
  hydrate(e) {
    S(() => {
      this.runtimeCore.hydrateEffect.trackEffect(
        () => {
          T(e) ? w(
            () => e.value,
            () => {
              v(this.runtimeCore.model.value, e.value);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : z(e) ? w(
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
        T(e[t]) ? G(() => {
          _(this.runtimeCore.shared, t, e[t].value), this.shareHistory.get(t) !== e[t].value && (this.shareHistory.set(t, e[t].value), this.runtimeCore.processor.schemaEffect.triggerEffects());
        }) : z(e[t]) ? G(() => {
          _(this.runtimeCore.shared, t, e[t]), this.shareHistory.get(t) !== e[t] && (this.shareHistory.set(t, e[t]), this.runtimeCore.processor.schemaEffect.triggerEffects());
        }) : (_(this.runtimeCore.shared, t, e[t]), this.shareHistory.get(t) !== e[t] && (this.shareHistory.set(t, e[t]), this.runtimeCore.processor.schemaEffect.triggerEffects()));
      });
    });
  }
  subscribeModel(e) {
    S(() => {
      const t = w(
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
    ), this.readonlyReactiveModel.value = Ee(this.runtimeCore.model.value), this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore));
  }
}
class A {
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
class yr {
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
    l(this, "schemaEffect", new A());
    l(this, "defaultValueEffect", new A());
    l(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    l(this, "baseDefaultValueFunctionsLength");
    l(this, "isModelInitialized", !0);
    l(this, "schemaEffectHistory", /* @__PURE__ */ new Map());
    l(this, "stableUpdaterHistory", /* @__PURE__ */ new Map());
    this.runtimeCore = e, this.processedSchemas = e.schemas, this.processedModel = e.model, this.getRuntimeMeta = e.getRuntimeMeta.bind(e), w(
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
      C(e)
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
      const a = $(this.processedSchemas.value);
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
      const p = s.parseStable(u.stable), b = i == null ? void 0 : i.index, E = i == null ? void 0 : i.key;
      let y = p;
      if (o.isProcessInprogress(y) || (n[h] = !0), i) {
        const g = s.processedSchemas.value[b][E][f][c];
        g && o.isObject(g) && c !== "component" && (y = v(g, y)), s.processedSchemas.value[b][E][f][c] = y, s.stableUpdater(
          n,
          i,
          t,
          c,
          f
        );
      } else {
        const g = s.processedSchemas.value[f][c];
        g && o.isObject(g) && c !== "component" && (y = v(g, y)), s.processedSchemas.value[f][c] = y, s.stableUpdater(
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
                      var b;
                      return !((b = p == null ? void 0 : p.includes) != null && b.call(p, "undefined"));
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
                      var b;
                      return !((b = p == null ? void 0 : p.includes) != null && b.call(p, "undefined"));
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
      o.isString(n) && (n = Q(n, "")), i && o.isObject(n) && !o.isNativeObject(n) ? this.objectParser({
        data: n,
        updater: t,
        index: s.rootIndex,
        parentMeta: s.parentMeta
      }) : t(n);
    }) : (o.isString(e) && (e = Q(e, "")), i && o.isObject(e) && !o.isNativeObject(e) ? this.objectParser({
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
      T(e) ? w(
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
      ) : z(e) ? w(
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
      this.stableModel = C(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects();
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
        if (o.isFunction(e.field) && D(t, e.field()))
          return;
        if (o.isString(e.field) && t[e.field])
          return;
        this.setModel(t, e.field, void 0);
      }
    });
  }
}
class x {
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
class _r {
  constructor(e) {
    this.ui = e;
  }
  getRuntimeNative() {
    var t;
    return (t = d.presets.uiPresets[this.ui]) == null ? void 0 : t.native;
  }
  getRuntimeField(e) {
    var s;
    const t = (s = d.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = I.adapters[d.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeField(e)) ?? (i == null ? void 0 : i.getRuntimeField(e));
  }
  getRuntimeRequired(e) {
    var s;
    const t = (s = d.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = I.adapters[d.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeRequired(e)) ?? (i == null ? void 0 : i.getRuntimeRequired(e));
  }
  getFormModelPropName() {
    var i;
    const e = (i = d.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, t = I.adapters[d.getUI(this.ui)];
    return (e == null ? void 0 : e.getFormModelPropName()) ?? (t == null ? void 0 : t.getFormModelPropName());
  }
  formComponentRenderer(e) {
    var s;
    const t = (s = d.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = I.adapters[d.getUI(this.ui)];
    return (t == null ? void 0 : t.formComponentRenderer(e)) ?? (i == null ? void 0 : i.formComponentRenderer(e));
  }
  clearValidate(e) {
    var s;
    const t = (s = d.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, i = I.adapters[d.getUI(this.ui)];
    return (t == null ? void 0 : t.clearValidate(e)) ?? (i == null ? void 0 : i.clearValidate(e));
  }
}
function Pr(r) {
  return typeof r == "function" || Object.prototype.toString.call(r) === "[object Object]" && !Ye(r);
}
class Cr {
  constructor(e) {
    l(this, "schemas", H([]));
    l(this, "model", H({}));
    l(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    l(this, "formRef", H(null));
    l(this, "hydrateEffect", new A());
    l(this, "native", Y({}));
    l(this, "grid", {});
    l(this, "runtime", {});
    l(this, "globalNativeFormOverride", Y({
      props: {
        Form: {},
        FormItem: {}
      },
      slots: {
        Form: {},
        FormItem: {}
      }
    }));
    l(this, "shared", Y({}));
    l(this, "shareHistory", /* @__PURE__ */ new Map());
    this.setup = e, this.processor = new yr(this);
    const t = this.setup(this);
    this.ui = t.ui ?? d.presets.ui, this.runtimeAdapter = new _r(this.ui), Object.assign(this.globalNativeFormOverride, this.runtimeAdapter.getRuntimeNative()), T(t.schemas) ? w(
      // @ts-expect-error
      () => t.schemas.value,
      () => {
        this.processor.parseSchemas(t.schemas.value);
      },
      {
        deep: !0
      }
    ) : z(t.schemas) ? w(() => t.schemas, () => {
      this.processor.parseSchemas(t.schemas);
    }, {
      deep: !0
    }) : this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    return {
      model: $(C(this.model.value)),
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (t) => {
        S(() => {
          Object.keys(t).forEach((i) => {
            T(t[i]) ? G(() => {
              _(this.shared, i, t[i].value), this.shareHistory.get(i) !== t[i].value && (this.shareHistory.set(i, t[i].value), this.processor.schemaEffect.triggerEffects());
            }) : z(t[i]) ? G(() => {
              _(this.shared, i, t[i]), this.shareHistory.get(i) !== t[i] && (this.shareHistory.set(i, t[i]), this.processor.schemaEffect.triggerEffects());
            }) : (_(this.shared, i, t[i]), this.shareHistory.get(i) !== t[i] && (this.shareHistory.set(i, t[i]), this.processor.schemaEffect.triggerEffects()));
          });
        });
      }
    };
  }
  runtimeItemProcessor(e, t, i = this.model.value, s) {
    var oe, ae, le, ue, fe, ce, de, he, pe, me, ge, be, ve, ye, _e, Pe, Ce, Ie;
    const n = $(e.component);
    if (!n)
      return;
    (ae = (oe = e.native) == null ? void 0 : oe.props) != null && ae.Form && v(this.globalNativeFormOverride.props.Form, (ue = (le = e.native) == null ? void 0 : le.props) == null ? void 0 : ue.Form), (ce = (fe = e.native) == null ? void 0 : fe.slots) != null && ce.Form && v(this.globalNativeFormOverride.slots.Form, (he = (de = e.native) == null ? void 0 : de.slots) == null ? void 0 : he.Form);
    const a = v(C((me = (pe = this.native) == null ? void 0 : pe.slots) == null ? void 0 : me.FormItem) ?? {}, (be = (ge = e.native) == null ? void 0 : ge.slots) == null ? void 0 : be.FormItem), u = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, f = v(C((ye = (ve = this.native) == null ? void 0 : ve.props) == null ? void 0 : ye.FormItem) ?? {}, (Pe = (_e = e.native) == null ? void 0 : _e.props) == null ? void 0 : Pe.FormItem), c = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: s,
      index: t
    }), h = n.name, p = e.componentProps ?? {}, b = I.placeholderPresetByComponentName;
    let E = e.placeholder, y = e.show;
    y === void 0 && (y = !0);
    let g = (Ve(e.label) ? e.label() : e.label) ?? "", O;
    if (e.runtime ? O = e.runtime : O = (s == null ? void 0 : s.runtime) ?? this.runtime, !o.isUndefined(t) && !o.isObjectEmpty(O) && (g = Q((Ce = O == null ? void 0 : O.customizeListItemLabel) == null ? void 0 : Ce.call(O, e.label ?? "", t + 1), "")), !E) {
      let N = "请输入";
      o.isUndefined(h) ? E = `${N}${g}` : /* @ts-expect-error */ b[h.toLowerCase()] ? (N = // @ts-expect-error
      b[h.toLowerCase()], E = `${N}${g}`) : (Object.keys(b).forEach((Se) => {
        h.toLowerCase().includes(Se.toLowerCase()) && (N = b[Se]);
      }), E = `${N}${g}`);
    }
    const Te = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: g
    }), ze = x.getItemContainer(this), Le = x.getFormItemContainer(this), He = this, De = e.componentSlots, P = (Ie = d.presets.uiPresets[this.ui]) == null ? void 0 : Ie.display;
    let X;
    return !o.isUndefined(P == null ? void 0 : P.labelPrefix) && !o.isNull(P == null ? void 0 : P.labelPrefix) ? X = `${g}${P == null ? void 0 : P.labelPrefix}` : X = `${g}:`, m("div", {
      style: u
    }, [m(ze, {
      show: y
    }, {
      default() {
        return y && m(Le, q(f, {
          label: `${g ? X : ""}`
        }, c, Te), {
          default() {
            return He.runtimeAdapter.formComponentRenderer({
              Component: n,
              schema: e,
              baseModel: i,
              placeholder: E,
              componentSlots: De,
              props: p
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
    return n === void 0 && (n = !0), m("div", {
      style: i
    }, [n && m(s, {
      schema: e
    }, Pr(t = e.children.map((a) => this.runtimeItemProcessor(a))) ? t : {
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
    }, i = this;
    i.model.value[e.field] || (i.model.value[e.field] = [{}]);
    let s = e.show;
    s === void 0 && (s = !0);
    const n = x.getListContainer(this), a = x.getListItemContainer(this);
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
            return Ke(m(h, {
              onClick: () => i.deleteListItem(e, f)
            }, null), [[We, ((p = i.model.value[e.field]) == null ? void 0 : p.length) > 1]]);
          }
        }));
      },
      add({
        container: u
      } = {}) {
        const f = u ?? m("button", null, [Xe("添加")]);
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
    }, t = this, i = v(this.globalNativeFormOverride.props.Form, C((f = (u = this.native) == null ? void 0 : u.props) == null ? void 0 : f.Form) ?? {}), s = v(this.globalNativeFormOverride.slots.Form, C((h = (c = this.native) == null ? void 0 : c.slots) == null ? void 0 : h.Form) ?? {}), n = x.getFormContainer(this), a = this.runtimeAdapter.getFormModelPropName();
    return m(n, q(i, {
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
function J({
  parentSchema: r,
  schema: e,
  index: t
}) {
  return r ? `${r.field}.${t}.${e.field}` : e.field;
}
const Ir = {
  ArcoVue: {
    getRuntimeField(r) {
      const e = J(r);
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
      return o.isFunction(t.field) ? a = D(e, t.field()) : a = e[t.field], m(r, q({
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
        r.runtimeCore.formRef.value.validate((i) => i ? t(i) : e(r.cleanFallbackFields($(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      var e, t;
      (t = (e = r.formRef.value) == null ? void 0 : e.clearValidate) == null || t.call(e);
    }
  },
  NutUI: {
    getRuntimeField(r) {
      const e = J(r);
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
      return o.isFunction(t.field) ? a = D(e, t.field()) : a = e[t.field], m(r, q({
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
          i ? e(r.cleanFallbackFields($(r.runtimeCore.processor.processedModel.value))) : t(s);
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
      const e = J(r);
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
      return o.isFunction(t.field) ? a = D(e, t.field()) : a = e[t.field], m(r, q({
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
        r.runtimeCore.formRef.value.validate((i) => i ? t(i) : e(r.cleanFallbackFields($(r.runtimeCore.processor.processedModel.value))));
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
l(R, "schemaPreset", {
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
}), l(R, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
l(R, "placeholderPresetByComponentName", R.getPlaceholderPrefixPresetByComponentName());
let k = R;
const I = {
  ...k,
  adapters: {
    ...Ir
  }
}, Or = /* @__PURE__ */ Ze({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(r) {
    const e = new Cr(r.setup);
    return () => e.exec();
  }
});
function wr(r) {
  const e = new vr(r);
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
function Fr(r) {
  d.presets = r;
}
function ne(r, e) {
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
function jr(r) {
  return ne(r, "native");
}
function xr(r) {
  return r.__proform_raw_object = !0, r;
}
function Rr(r) {
  return ne(r, "onetime");
}
function $r(r) {
  function e() {
    return r;
  }
  return ne(
    e,
    "structured_path_parsing_mark"
  );
}
export {
  Or as ProForm,
  jr as markNativeFunction,
  xr as markNativeObject,
  Rr as markOnetimeFunction,
  $r as markStructuredPathParsing,
  wr as useForm,
  Fr as useFormPresetConfigurer,
  ne as useModifiers
};
