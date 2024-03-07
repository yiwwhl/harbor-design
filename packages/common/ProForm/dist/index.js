var Sg = Object.defineProperty;
var Pg = (d, f, i) => f in d ? Sg(d, f, { enumerable: !0, configurable: !0, writable: !0, value: i }) : d[f] = i;
var D = (d, f, i) => (Pg(d, typeof f != "symbol" ? f + "" : f, i), i);
import { ref as Fr, readonly as Ns, nextTick as Ye, isRef as At, watch as qe, isReactive as Ot, toRaw as rt, reactive as Ds, createVNode as ae, mergeProps as Pt, withDirectives as Ag, vShow as Og, createTextVNode as Lg, isVNode as Tg, defineComponent as Fg } from "vue";
class A {
  static typeChecker(f) {
    return {}.toString.call(f);
  }
  static isString(f) {
    return typeof f == "string";
  }
  static isArray(f) {
    return this.typeChecker(f) === "[object Array]";
  }
  static isFunction(f) {
    return this.typeChecker(f) === "[object Function]";
  }
  static isPromise(f) {
    return f instanceof Promise;
  }
  static isObject(f) {
    return this.typeChecker(f) === "[object Object]";
  }
  static isAsyncFunction(f) {
    return this.typeChecker(f) === "[object AsyncFunction]";
  }
  static isUndefined(f) {
    return f === void 0;
  }
  static isArrayEmpty(f) {
    return (f == null ? void 0 : f.length) < 1;
  }
  static isObjectEmpty(f) {
    return this.isArrayEmpty(Object.keys(f));
  }
  static isListSchema(f) {
    return f.type === "list";
  }
  static isGroupSchema(f) {
    return f.type === "group";
  }
  static isItemSchema(f) {
    return this.isUndefined(f.type) || f.type === "item";
  }
  static isProcessInprogress(f) {
    if (f === void 0)
      return !0;
    if (this.isObject(f)) {
      if (f.setup || this.isFunction(f.setup) || f.props)
        return !1;
      if (this.isObjectEmpty(f))
        return !0;
      for (const i in f) {
        if (i === "componentProps")
          return !1;
        if (f.hasOwnProperty(i) && this.isProcessInprogress(f[i]))
          return !0;
      }
    } else if (this.isArray(f)) {
      if (this.isArrayEmpty(f))
        return !0;
      for (const i of f)
        if (this.isProcessInprogress(i))
          return !0;
    }
    return !1;
  }
  static isNativeObject(f) {
    return !!f.__proform_raw_object;
  }
}
function fe(d, ...f) {
  return f.forEach((i) => {
    if (Array.isArray(i))
      Array.isArray(d) || (d = []), i.forEach((p, w) => {
        typeof p == "object" && p !== null ? d[w] = fe(Array.isArray(p) ? [] : {}, p) : d[w] = p;
      });
    else
      for (const p in i)
        i.hasOwnProperty(p) && (typeof i[p] == "object" && i[p] !== null ? d[p] = fe(d[p] || {}, i[p]) : d[p] = i[p]);
  }), d;
}
function pn(d) {
  const f = /* @__PURE__ */ new WeakMap();
  function i(p) {
    if (p === null || typeof p != "object")
      return p;
    if (p instanceof Date)
      return new Date(p);
    if (p instanceof RegExp)
      return new RegExp(p);
    if (p instanceof Map) {
      const R = /* @__PURE__ */ new Map();
      for (const [b, W] of p)
        R.set(i(b), i(W));
      return R;
    }
    if (p instanceof Set) {
      const R = /* @__PURE__ */ new Set();
      for (const b of p)
        R.add(i(b));
      return R;
    }
    if (f.has(p))
      return f.get(p);
    if (Array.isArray(p)) {
      const R = [];
      f.set(p, R);
      for (let b = 0; b < p.length; b++)
        R[b] = i(p[b]);
      return R;
    }
    const w = Object.create(Object.getPrototypeOf(p));
    f.set(p, w);
    for (const R in p)
      p.hasOwnProperty(R) && (w[R] = i(p[R]));
    return w;
  }
  return i(d);
}
function ru(d, f) {
  return d.replace(/undefined/g, f);
}
class Mg {
  constructor(f) {
    D(this, "runtimeCore");
    D(this, "readonlyReactiveModel", Fr({}));
    this.formCustomization = f;
  }
  // happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
  cleanFallbackFields(f) {
    return f !== null && typeof f == "object" && (delete f.__yiwwhl_async_field_fallback, Object.values(f).forEach((i) => {
      this.cleanFallbackFields(i);
    })), f;
  }
  setup(f) {
    return this.runtimeCore = f, this.readonlyReactiveModel.value = Ns(f.model.value), Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var p;
    const f = (p = V.getPreset(this.runtimeCore.ui)) == null ? void 0 : p.adapter, i = dn.adapters[V.getUI(this.runtimeCore.ui)];
    return (f == null ? void 0 : f.validateForm(this)) ?? (i == null ? void 0 : i.validateForm(this));
  }
  hydrate(f) {
    Ye(() => {
      this.runtimeCore.hydrateEffect.trackEffect(
        () => {
          At(f) ? qe(
            () => f.value,
            () => {
              fe(this.runtimeCore.model.value, f.value);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : Ot(f) ? qe(
            () => f,
            () => {
              fe(this.runtimeCore.model.value, f);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : fe(this.runtimeCore.model.value, f);
        },
        {
          lazy: !1
        }
      );
    });
  }
  share(f) {
    Ye(() => {
      if (At(f)) {
        const i = qe(
          () => f.value,
          () => {
            fe(this.runtimeCore.shared, f.value), this.runtimeCore.processor.schemaEffect.triggerEffects(), Ye(() => {
              i();
            });
          },
          {
            deep: !0,
            immediate: !0
          }
        );
      } else if (Ot(f)) {
        const i = qe(
          () => f,
          () => {
            fe(this.runtimeCore.shared, f), this.runtimeCore.processor.schemaEffect.triggerEffects(), Ye(() => {
              i();
            });
          },
          {
            deep: !0,
            immediate: !0
          }
        );
      } else
        fe(this.runtimeCore.shared, f), this.runtimeCore.processor.schemaEffect.triggerEffects();
    });
  }
  subscribeModel(f) {
    Ye(() => {
      const i = qe(
        () => this.readonlyReactiveModel.value,
        (p) => {
          f(p, {
            stopSubscribe() {
              Ye(() => {
                i();
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
    var f;
    (f = this.runtimeCore) != null && f.model.value && (this.runtimeCore.model.value = pn(
      this.runtimeCore.processor.stableModel
    ), this.readonlyReactiveModel.value = Ns(this.runtimeCore.model.value), this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore));
  }
}
class iu {
  constructor() {
    D(this, "effects", /* @__PURE__ */ new Set());
  }
  clearEffects() {
    this.effects.clear();
  }
  triggerEffects() {
    Array.from(this.effects).forEach((f) => f());
  }
  trackEffect(f, i = {
    lazy: !0
  }) {
    return !i.lazy && f(), this.effects.add(f), () => this.effects.delete(f);
  }
}
var St = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Mr = { exports: {} };
/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
Mr.exports;
(function(d, f) {
  (function() {
    var i, p = "4.17.21", w = 200, R = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", b = "Expected a function", W = "Invalid `variable` option passed into `_.template`", G = "__lodash_hash_undefined__", z = 500, Q = "__lodash_placeholder__", pe = 1, Xe = 2, de = 4, re = 1, te = 2, j = 1, en = 2, Lt = 4, Ae = 8, gn = 16, Oe = 32, nn = 64, Le = 128, _n = 256, Nn = 512, Tt = 30, Ft = "...", Mt = 800, Ut = 16, it = 1, Wt = 2, Bt = 3, Je = 1 / 0, Ge = 9007199254740991, Nt = 17976931348623157e292, En = NaN, Ie = 4294967295, Dt = Ie - 1, Sn = Ie >>> 1, qt = [
      ["ary", Le],
      ["bind", j],
      ["bindKey", en],
      ["curry", Ae],
      ["curryRight", gn],
      ["flip", Nn],
      ["partial", Oe],
      ["partialRight", nn],
      ["rearg", _n]
    ], Dn = "[object Arguments]", Gt = "[object Array]", Gs = "[object AsyncFunction]", ut = "[object Boolean]", ft = "[object Date]", $s = "[object DOMException]", $t = "[object Error]", zt = "[object Function]", fu = "[object GeneratorFunction]", $e = "[object Map]", st = "[object Number]", zs = "[object Null]", tn = "[object Object]", su = "[object Promise]", Hs = "[object Proxy]", ot = "[object RegExp]", ze = "[object Set]", lt = "[object String]", Ht = "[object Symbol]", Vs = "[object Undefined]", at = "[object WeakMap]", Ks = "[object WeakSet]", ct = "[object ArrayBuffer]", qn = "[object DataView]", Ur = "[object Float32Array]", Wr = "[object Float64Array]", Br = "[object Int8Array]", Nr = "[object Int16Array]", Dr = "[object Int32Array]", qr = "[object Uint8Array]", Gr = "[object Uint8ClampedArray]", $r = "[object Uint16Array]", zr = "[object Uint32Array]", Zs = /\b__p \+= '';/g, Ys = /\b(__p \+=) '' \+/g, Xs = /(__e\(.*?\)|\b__t\)) \+\n'';/g, ou = /&(?:amp|lt|gt|quot|#39);/g, lu = /[&<>"']/g, Js = RegExp(ou.source), Qs = RegExp(lu.source), ks = /<%-([\s\S]+?)%>/g, js = /<%([\s\S]+?)%>/g, au = /<%=([\s\S]+?)%>/g, eo = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, no = /^\w*$/, to = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Hr = /[\\^$.*+?()[\]{}|]/g, ro = RegExp(Hr.source), Vr = /^\s+/, io = /\s/, uo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, fo = /\{\n\/\* \[wrapped with (.+)\] \*/, so = /,? & /, oo = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, lo = /[()=,{}\[\]\/\s]/, ao = /\\(\\)?/g, co = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, cu = /\w*$/, ho = /^[-+]0x[0-9a-f]+$/i, po = /^0b[01]+$/i, go = /^\[object .+?Constructor\]$/, _o = /^0o[0-7]+$/i, vo = /^(?:0|[1-9]\d*)$/, mo = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Vt = /($^)/, wo = /['\n\r\u2028\u2029\\]/g, Kt = "\\ud800-\\udfff", xo = "\\u0300-\\u036f", yo = "\\ufe20-\\ufe2f", Io = "\\u20d0-\\u20ff", hu = xo + yo + Io, pu = "\\u2700-\\u27bf", du = "a-z\\xdf-\\xf6\\xf8-\\xff", Co = "\\xac\\xb1\\xd7\\xf7", bo = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", Ro = "\\u2000-\\u206f", Eo = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", gu = "A-Z\\xc0-\\xd6\\xd8-\\xde", _u = "\\ufe0e\\ufe0f", vu = Co + bo + Ro + Eo, Kr = "['’]", So = "[" + Kt + "]", mu = "[" + vu + "]", Zt = "[" + hu + "]", wu = "\\d+", Po = "[" + pu + "]", xu = "[" + du + "]", yu = "[^" + Kt + vu + wu + pu + du + gu + "]", Zr = "\\ud83c[\\udffb-\\udfff]", Ao = "(?:" + Zt + "|" + Zr + ")", Iu = "[^" + Kt + "]", Yr = "(?:\\ud83c[\\udde6-\\uddff]){2}", Xr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Gn = "[" + gu + "]", Cu = "\\u200d", bu = "(?:" + xu + "|" + yu + ")", Oo = "(?:" + Gn + "|" + yu + ")", Ru = "(?:" + Kr + "(?:d|ll|m|re|s|t|ve))?", Eu = "(?:" + Kr + "(?:D|LL|M|RE|S|T|VE))?", Su = Ao + "?", Pu = "[" + _u + "]?", Lo = "(?:" + Cu + "(?:" + [Iu, Yr, Xr].join("|") + ")" + Pu + Su + ")*", To = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Fo = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", Au = Pu + Su + Lo, Mo = "(?:" + [Po, Yr, Xr].join("|") + ")" + Au, Uo = "(?:" + [Iu + Zt + "?", Zt, Yr, Xr, So].join("|") + ")", Wo = RegExp(Kr, "g"), Bo = RegExp(Zt, "g"), Jr = RegExp(Zr + "(?=" + Zr + ")|" + Uo + Au, "g"), No = RegExp([
      Gn + "?" + xu + "+" + Ru + "(?=" + [mu, Gn, "$"].join("|") + ")",
      Oo + "+" + Eu + "(?=" + [mu, Gn + bu, "$"].join("|") + ")",
      Gn + "?" + bu + "+" + Ru,
      Gn + "+" + Eu,
      Fo,
      To,
      wu,
      Mo
    ].join("|"), "g"), Do = RegExp("[" + Cu + Kt + hu + _u + "]"), qo = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Go = [
      "Array",
      "Buffer",
      "DataView",
      "Date",
      "Error",
      "Float32Array",
      "Float64Array",
      "Function",
      "Int8Array",
      "Int16Array",
      "Int32Array",
      "Map",
      "Math",
      "Object",
      "Promise",
      "RegExp",
      "Set",
      "String",
      "Symbol",
      "TypeError",
      "Uint8Array",
      "Uint8ClampedArray",
      "Uint16Array",
      "Uint32Array",
      "WeakMap",
      "_",
      "clearTimeout",
      "isFinite",
      "parseInt",
      "setTimeout"
    ], $o = -1, Y = {};
    Y[Ur] = Y[Wr] = Y[Br] = Y[Nr] = Y[Dr] = Y[qr] = Y[Gr] = Y[$r] = Y[zr] = !0, Y[Dn] = Y[Gt] = Y[ct] = Y[ut] = Y[qn] = Y[ft] = Y[$t] = Y[zt] = Y[$e] = Y[st] = Y[tn] = Y[ot] = Y[ze] = Y[lt] = Y[at] = !1;
    var Z = {};
    Z[Dn] = Z[Gt] = Z[ct] = Z[qn] = Z[ut] = Z[ft] = Z[Ur] = Z[Wr] = Z[Br] = Z[Nr] = Z[Dr] = Z[$e] = Z[st] = Z[tn] = Z[ot] = Z[ze] = Z[lt] = Z[Ht] = Z[qr] = Z[Gr] = Z[$r] = Z[zr] = !0, Z[$t] = Z[zt] = Z[at] = !1;
    var zo = {
      // Latin-1 Supplement block.
      À: "A",
      Á: "A",
      Â: "A",
      Ã: "A",
      Ä: "A",
      Å: "A",
      à: "a",
      á: "a",
      â: "a",
      ã: "a",
      ä: "a",
      å: "a",
      Ç: "C",
      ç: "c",
      Ð: "D",
      ð: "d",
      È: "E",
      É: "E",
      Ê: "E",
      Ë: "E",
      è: "e",
      é: "e",
      ê: "e",
      ë: "e",
      Ì: "I",
      Í: "I",
      Î: "I",
      Ï: "I",
      ì: "i",
      í: "i",
      î: "i",
      ï: "i",
      Ñ: "N",
      ñ: "n",
      Ò: "O",
      Ó: "O",
      Ô: "O",
      Õ: "O",
      Ö: "O",
      Ø: "O",
      ò: "o",
      ó: "o",
      ô: "o",
      õ: "o",
      ö: "o",
      ø: "o",
      Ù: "U",
      Ú: "U",
      Û: "U",
      Ü: "U",
      ù: "u",
      ú: "u",
      û: "u",
      ü: "u",
      Ý: "Y",
      ý: "y",
      ÿ: "y",
      Æ: "Ae",
      æ: "ae",
      Þ: "Th",
      þ: "th",
      ß: "ss",
      // Latin Extended-A block.
      Ā: "A",
      Ă: "A",
      Ą: "A",
      ā: "a",
      ă: "a",
      ą: "a",
      Ć: "C",
      Ĉ: "C",
      Ċ: "C",
      Č: "C",
      ć: "c",
      ĉ: "c",
      ċ: "c",
      č: "c",
      Ď: "D",
      Đ: "D",
      ď: "d",
      đ: "d",
      Ē: "E",
      Ĕ: "E",
      Ė: "E",
      Ę: "E",
      Ě: "E",
      ē: "e",
      ĕ: "e",
      ė: "e",
      ę: "e",
      ě: "e",
      Ĝ: "G",
      Ğ: "G",
      Ġ: "G",
      Ģ: "G",
      ĝ: "g",
      ğ: "g",
      ġ: "g",
      ģ: "g",
      Ĥ: "H",
      Ħ: "H",
      ĥ: "h",
      ħ: "h",
      Ĩ: "I",
      Ī: "I",
      Ĭ: "I",
      Į: "I",
      İ: "I",
      ĩ: "i",
      ī: "i",
      ĭ: "i",
      į: "i",
      ı: "i",
      Ĵ: "J",
      ĵ: "j",
      Ķ: "K",
      ķ: "k",
      ĸ: "k",
      Ĺ: "L",
      Ļ: "L",
      Ľ: "L",
      Ŀ: "L",
      Ł: "L",
      ĺ: "l",
      ļ: "l",
      ľ: "l",
      ŀ: "l",
      ł: "l",
      Ń: "N",
      Ņ: "N",
      Ň: "N",
      Ŋ: "N",
      ń: "n",
      ņ: "n",
      ň: "n",
      ŋ: "n",
      Ō: "O",
      Ŏ: "O",
      Ő: "O",
      ō: "o",
      ŏ: "o",
      ő: "o",
      Ŕ: "R",
      Ŗ: "R",
      Ř: "R",
      ŕ: "r",
      ŗ: "r",
      ř: "r",
      Ś: "S",
      Ŝ: "S",
      Ş: "S",
      Š: "S",
      ś: "s",
      ŝ: "s",
      ş: "s",
      š: "s",
      Ţ: "T",
      Ť: "T",
      Ŧ: "T",
      ţ: "t",
      ť: "t",
      ŧ: "t",
      Ũ: "U",
      Ū: "U",
      Ŭ: "U",
      Ů: "U",
      Ű: "U",
      Ų: "U",
      ũ: "u",
      ū: "u",
      ŭ: "u",
      ů: "u",
      ű: "u",
      ų: "u",
      Ŵ: "W",
      ŵ: "w",
      Ŷ: "Y",
      ŷ: "y",
      Ÿ: "Y",
      Ź: "Z",
      Ż: "Z",
      Ž: "Z",
      ź: "z",
      ż: "z",
      ž: "z",
      Ĳ: "IJ",
      ĳ: "ij",
      Œ: "Oe",
      œ: "oe",
      ŉ: "'n",
      ſ: "s"
    }, Ho = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }, Vo = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#39;": "'"
    }, Ko = {
      "\\": "\\",
      "'": "'",
      "\n": "n",
      "\r": "r",
      "\u2028": "u2028",
      "\u2029": "u2029"
    }, Zo = parseFloat, Yo = parseInt, Ou = typeof St == "object" && St && St.Object === Object && St, Xo = typeof self == "object" && self && self.Object === Object && self, oe = Ou || Xo || Function("return this")(), Qr = f && !f.nodeType && f, Pn = Qr && !0 && d && !d.nodeType && d, Lu = Pn && Pn.exports === Qr, kr = Lu && Ou.process, Te = function() {
      try {
        var c = Pn && Pn.require && Pn.require("util").types;
        return c || kr && kr.binding && kr.binding("util");
      } catch {
      }
    }(), Tu = Te && Te.isArrayBuffer, Fu = Te && Te.isDate, Mu = Te && Te.isMap, Uu = Te && Te.isRegExp, Wu = Te && Te.isSet, Bu = Te && Te.isTypedArray;
    function Ce(c, _, g) {
      switch (g.length) {
        case 0:
          return c.call(_);
        case 1:
          return c.call(_, g[0]);
        case 2:
          return c.call(_, g[0], g[1]);
        case 3:
          return c.call(_, g[0], g[1], g[2]);
      }
      return c.apply(_, g);
    }
    function Jo(c, _, g, I) {
      for (var O = -1, q = c == null ? 0 : c.length; ++O < q; ) {
        var ie = c[O];
        _(I, ie, g(ie), c);
      }
      return I;
    }
    function Fe(c, _) {
      for (var g = -1, I = c == null ? 0 : c.length; ++g < I && _(c[g], g, c) !== !1; )
        ;
      return c;
    }
    function Qo(c, _) {
      for (var g = c == null ? 0 : c.length; g-- && _(c[g], g, c) !== !1; )
        ;
      return c;
    }
    function Nu(c, _) {
      for (var g = -1, I = c == null ? 0 : c.length; ++g < I; )
        if (!_(c[g], g, c))
          return !1;
      return !0;
    }
    function vn(c, _) {
      for (var g = -1, I = c == null ? 0 : c.length, O = 0, q = []; ++g < I; ) {
        var ie = c[g];
        _(ie, g, c) && (q[O++] = ie);
      }
      return q;
    }
    function Yt(c, _) {
      var g = c == null ? 0 : c.length;
      return !!g && $n(c, _, 0) > -1;
    }
    function jr(c, _, g) {
      for (var I = -1, O = c == null ? 0 : c.length; ++I < O; )
        if (g(_, c[I]))
          return !0;
      return !1;
    }
    function X(c, _) {
      for (var g = -1, I = c == null ? 0 : c.length, O = Array(I); ++g < I; )
        O[g] = _(c[g], g, c);
      return O;
    }
    function mn(c, _) {
      for (var g = -1, I = _.length, O = c.length; ++g < I; )
        c[O + g] = _[g];
      return c;
    }
    function ei(c, _, g, I) {
      var O = -1, q = c == null ? 0 : c.length;
      for (I && q && (g = c[++O]); ++O < q; )
        g = _(g, c[O], O, c);
      return g;
    }
    function ko(c, _, g, I) {
      var O = c == null ? 0 : c.length;
      for (I && O && (g = c[--O]); O--; )
        g = _(g, c[O], O, c);
      return g;
    }
    function ni(c, _) {
      for (var g = -1, I = c == null ? 0 : c.length; ++g < I; )
        if (_(c[g], g, c))
          return !0;
      return !1;
    }
    var jo = ti("length");
    function el(c) {
      return c.split("");
    }
    function nl(c) {
      return c.match(oo) || [];
    }
    function Du(c, _, g) {
      var I;
      return g(c, function(O, q, ie) {
        if (_(O, q, ie))
          return I = q, !1;
      }), I;
    }
    function Xt(c, _, g, I) {
      for (var O = c.length, q = g + (I ? 1 : -1); I ? q-- : ++q < O; )
        if (_(c[q], q, c))
          return q;
      return -1;
    }
    function $n(c, _, g) {
      return _ === _ ? pl(c, _, g) : Xt(c, qu, g);
    }
    function tl(c, _, g, I) {
      for (var O = g - 1, q = c.length; ++O < q; )
        if (I(c[O], _))
          return O;
      return -1;
    }
    function qu(c) {
      return c !== c;
    }
    function Gu(c, _) {
      var g = c == null ? 0 : c.length;
      return g ? ii(c, _) / g : En;
    }
    function ti(c) {
      return function(_) {
        return _ == null ? i : _[c];
      };
    }
    function ri(c) {
      return function(_) {
        return c == null ? i : c[_];
      };
    }
    function $u(c, _, g, I, O) {
      return O(c, function(q, ie, K) {
        g = I ? (I = !1, q) : _(g, q, ie, K);
      }), g;
    }
    function rl(c, _) {
      var g = c.length;
      for (c.sort(_); g--; )
        c[g] = c[g].value;
      return c;
    }
    function ii(c, _) {
      for (var g, I = -1, O = c.length; ++I < O; ) {
        var q = _(c[I]);
        q !== i && (g = g === i ? q : g + q);
      }
      return g;
    }
    function ui(c, _) {
      for (var g = -1, I = Array(c); ++g < c; )
        I[g] = _(g);
      return I;
    }
    function il(c, _) {
      return X(_, function(g) {
        return [g, c[g]];
      });
    }
    function zu(c) {
      return c && c.slice(0, Zu(c) + 1).replace(Vr, "");
    }
    function be(c) {
      return function(_) {
        return c(_);
      };
    }
    function fi(c, _) {
      return X(_, function(g) {
        return c[g];
      });
    }
    function ht(c, _) {
      return c.has(_);
    }
    function Hu(c, _) {
      for (var g = -1, I = c.length; ++g < I && $n(_, c[g], 0) > -1; )
        ;
      return g;
    }
    function Vu(c, _) {
      for (var g = c.length; g-- && $n(_, c[g], 0) > -1; )
        ;
      return g;
    }
    function ul(c, _) {
      for (var g = c.length, I = 0; g--; )
        c[g] === _ && ++I;
      return I;
    }
    var fl = ri(zo), sl = ri(Ho);
    function ol(c) {
      return "\\" + Ko[c];
    }
    function ll(c, _) {
      return c == null ? i : c[_];
    }
    function zn(c) {
      return Do.test(c);
    }
    function al(c) {
      return qo.test(c);
    }
    function cl(c) {
      for (var _, g = []; !(_ = c.next()).done; )
        g.push(_.value);
      return g;
    }
    function si(c) {
      var _ = -1, g = Array(c.size);
      return c.forEach(function(I, O) {
        g[++_] = [O, I];
      }), g;
    }
    function Ku(c, _) {
      return function(g) {
        return c(_(g));
      };
    }
    function wn(c, _) {
      for (var g = -1, I = c.length, O = 0, q = []; ++g < I; ) {
        var ie = c[g];
        (ie === _ || ie === Q) && (c[g] = Q, q[O++] = g);
      }
      return q;
    }
    function Jt(c) {
      var _ = -1, g = Array(c.size);
      return c.forEach(function(I) {
        g[++_] = I;
      }), g;
    }
    function hl(c) {
      var _ = -1, g = Array(c.size);
      return c.forEach(function(I) {
        g[++_] = [I, I];
      }), g;
    }
    function pl(c, _, g) {
      for (var I = g - 1, O = c.length; ++I < O; )
        if (c[I] === _)
          return I;
      return -1;
    }
    function dl(c, _, g) {
      for (var I = g + 1; I--; )
        if (c[I] === _)
          return I;
      return I;
    }
    function Hn(c) {
      return zn(c) ? _l(c) : jo(c);
    }
    function He(c) {
      return zn(c) ? vl(c) : el(c);
    }
    function Zu(c) {
      for (var _ = c.length; _-- && io.test(c.charAt(_)); )
        ;
      return _;
    }
    var gl = ri(Vo);
    function _l(c) {
      for (var _ = Jr.lastIndex = 0; Jr.test(c); )
        ++_;
      return _;
    }
    function vl(c) {
      return c.match(Jr) || [];
    }
    function ml(c) {
      return c.match(No) || [];
    }
    var wl = function c(_) {
      _ = _ == null ? oe : Vn.defaults(oe.Object(), _, Vn.pick(oe, Go));
      var g = _.Array, I = _.Date, O = _.Error, q = _.Function, ie = _.Math, K = _.Object, oi = _.RegExp, xl = _.String, Me = _.TypeError, Qt = g.prototype, yl = q.prototype, Kn = K.prototype, kt = _["__core-js_shared__"], jt = yl.toString, H = Kn.hasOwnProperty, Il = 0, Yu = function() {
        var e = /[^.]+$/.exec(kt && kt.keys && kt.keys.IE_PROTO || "");
        return e ? "Symbol(src)_1." + e : "";
      }(), er = Kn.toString, Cl = jt.call(K), bl = oe._, Rl = oi(
        "^" + jt.call(H).replace(Hr, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
      ), nr = Lu ? _.Buffer : i, xn = _.Symbol, tr = _.Uint8Array, Xu = nr ? nr.allocUnsafe : i, rr = Ku(K.getPrototypeOf, K), Ju = K.create, Qu = Kn.propertyIsEnumerable, ir = Qt.splice, ku = xn ? xn.isConcatSpreadable : i, pt = xn ? xn.iterator : i, An = xn ? xn.toStringTag : i, ur = function() {
        try {
          var e = Mn(K, "defineProperty");
          return e({}, "", {}), e;
        } catch {
        }
      }(), El = _.clearTimeout !== oe.clearTimeout && _.clearTimeout, Sl = I && I.now !== oe.Date.now && I.now, Pl = _.setTimeout !== oe.setTimeout && _.setTimeout, fr = ie.ceil, sr = ie.floor, li = K.getOwnPropertySymbols, Al = nr ? nr.isBuffer : i, ju = _.isFinite, Ol = Qt.join, Ll = Ku(K.keys, K), ue = ie.max, ce = ie.min, Tl = I.now, Fl = _.parseInt, ef = ie.random, Ml = Qt.reverse, ai = Mn(_, "DataView"), dt = Mn(_, "Map"), ci = Mn(_, "Promise"), Zn = Mn(_, "Set"), gt = Mn(_, "WeakMap"), _t = Mn(K, "create"), or = gt && new gt(), Yn = {}, Ul = Un(ai), Wl = Un(dt), Bl = Un(ci), Nl = Un(Zn), Dl = Un(gt), lr = xn ? xn.prototype : i, vt = lr ? lr.valueOf : i, nf = lr ? lr.toString : i;
      function s(e) {
        if (k(e) && !L(e) && !(e instanceof B)) {
          if (e instanceof Ue)
            return e;
          if (H.call(e, "__wrapped__"))
            return rs(e);
        }
        return new Ue(e);
      }
      var Xn = /* @__PURE__ */ function() {
        function e() {
        }
        return function(n) {
          if (!J(n))
            return {};
          if (Ju)
            return Ju(n);
          e.prototype = n;
          var t = new e();
          return e.prototype = i, t;
        };
      }();
      function ar() {
      }
      function Ue(e, n) {
        this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!n, this.__index__ = 0, this.__values__ = i;
      }
      s.templateSettings = {
        /**
         * Used to detect `data` property values to be HTML-escaped.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        escape: ks,
        /**
         * Used to detect code to be evaluated.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        evaluate: js,
        /**
         * Used to detect `data` property values to inject.
         *
         * @memberOf _.templateSettings
         * @type {RegExp}
         */
        interpolate: au,
        /**
         * Used to reference the data object in the template text.
         *
         * @memberOf _.templateSettings
         * @type {string}
         */
        variable: "",
        /**
         * Used to import variables into the compiled template.
         *
         * @memberOf _.templateSettings
         * @type {Object}
         */
        imports: {
          /**
           * A reference to the `lodash` function.
           *
           * @memberOf _.templateSettings.imports
           * @type {Function}
           */
          _: s
        }
      }, s.prototype = ar.prototype, s.prototype.constructor = s, Ue.prototype = Xn(ar.prototype), Ue.prototype.constructor = Ue;
      function B(e) {
        this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = Ie, this.__views__ = [];
      }
      function ql() {
        var e = new B(this.__wrapped__);
        return e.__actions__ = me(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = me(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = me(this.__views__), e;
      }
      function Gl() {
        if (this.__filtered__) {
          var e = new B(this);
          e.__dir__ = -1, e.__filtered__ = !0;
        } else
          e = this.clone(), e.__dir__ *= -1;
        return e;
      }
      function $l() {
        var e = this.__wrapped__.value(), n = this.__dir__, t = L(e), r = n < 0, u = t ? e.length : 0, o = ec(0, u, this.__views__), l = o.start, a = o.end, h = a - l, v = r ? a : l - 1, m = this.__iteratees__, x = m.length, y = 0, C = ce(h, this.__takeCount__);
        if (!t || !r && u == h && C == h)
          return Ef(e, this.__actions__);
        var S = [];
        e:
          for (; h-- && y < C; ) {
            v += n;
            for (var F = -1, P = e[v]; ++F < x; ) {
              var U = m[F], N = U.iteratee, Se = U.type, ve = N(P);
              if (Se == Wt)
                P = ve;
              else if (!ve) {
                if (Se == it)
                  continue e;
                break e;
              }
            }
            S[y++] = P;
          }
        return S;
      }
      B.prototype = Xn(ar.prototype), B.prototype.constructor = B;
      function On(e) {
        var n = -1, t = e == null ? 0 : e.length;
        for (this.clear(); ++n < t; ) {
          var r = e[n];
          this.set(r[0], r[1]);
        }
      }
      function zl() {
        this.__data__ = _t ? _t(null) : {}, this.size = 0;
      }
      function Hl(e) {
        var n = this.has(e) && delete this.__data__[e];
        return this.size -= n ? 1 : 0, n;
      }
      function Vl(e) {
        var n = this.__data__;
        if (_t) {
          var t = n[e];
          return t === G ? i : t;
        }
        return H.call(n, e) ? n[e] : i;
      }
      function Kl(e) {
        var n = this.__data__;
        return _t ? n[e] !== i : H.call(n, e);
      }
      function Zl(e, n) {
        var t = this.__data__;
        return this.size += this.has(e) ? 0 : 1, t[e] = _t && n === i ? G : n, this;
      }
      On.prototype.clear = zl, On.prototype.delete = Hl, On.prototype.get = Vl, On.prototype.has = Kl, On.prototype.set = Zl;
      function rn(e) {
        var n = -1, t = e == null ? 0 : e.length;
        for (this.clear(); ++n < t; ) {
          var r = e[n];
          this.set(r[0], r[1]);
        }
      }
      function Yl() {
        this.__data__ = [], this.size = 0;
      }
      function Xl(e) {
        var n = this.__data__, t = cr(n, e);
        if (t < 0)
          return !1;
        var r = n.length - 1;
        return t == r ? n.pop() : ir.call(n, t, 1), --this.size, !0;
      }
      function Jl(e) {
        var n = this.__data__, t = cr(n, e);
        return t < 0 ? i : n[t][1];
      }
      function Ql(e) {
        return cr(this.__data__, e) > -1;
      }
      function kl(e, n) {
        var t = this.__data__, r = cr(t, e);
        return r < 0 ? (++this.size, t.push([e, n])) : t[r][1] = n, this;
      }
      rn.prototype.clear = Yl, rn.prototype.delete = Xl, rn.prototype.get = Jl, rn.prototype.has = Ql, rn.prototype.set = kl;
      function un(e) {
        var n = -1, t = e == null ? 0 : e.length;
        for (this.clear(); ++n < t; ) {
          var r = e[n];
          this.set(r[0], r[1]);
        }
      }
      function jl() {
        this.size = 0, this.__data__ = {
          hash: new On(),
          map: new (dt || rn)(),
          string: new On()
        };
      }
      function ea(e) {
        var n = Cr(this, e).delete(e);
        return this.size -= n ? 1 : 0, n;
      }
      function na(e) {
        return Cr(this, e).get(e);
      }
      function ta(e) {
        return Cr(this, e).has(e);
      }
      function ra(e, n) {
        var t = Cr(this, e), r = t.size;
        return t.set(e, n), this.size += t.size == r ? 0 : 1, this;
      }
      un.prototype.clear = jl, un.prototype.delete = ea, un.prototype.get = na, un.prototype.has = ta, un.prototype.set = ra;
      function Ln(e) {
        var n = -1, t = e == null ? 0 : e.length;
        for (this.__data__ = new un(); ++n < t; )
          this.add(e[n]);
      }
      function ia(e) {
        return this.__data__.set(e, G), this;
      }
      function ua(e) {
        return this.__data__.has(e);
      }
      Ln.prototype.add = Ln.prototype.push = ia, Ln.prototype.has = ua;
      function Ve(e) {
        var n = this.__data__ = new rn(e);
        this.size = n.size;
      }
      function fa() {
        this.__data__ = new rn(), this.size = 0;
      }
      function sa(e) {
        var n = this.__data__, t = n.delete(e);
        return this.size = n.size, t;
      }
      function oa(e) {
        return this.__data__.get(e);
      }
      function la(e) {
        return this.__data__.has(e);
      }
      function aa(e, n) {
        var t = this.__data__;
        if (t instanceof rn) {
          var r = t.__data__;
          if (!dt || r.length < w - 1)
            return r.push([e, n]), this.size = ++t.size, this;
          t = this.__data__ = new un(r);
        }
        return t.set(e, n), this.size = t.size, this;
      }
      Ve.prototype.clear = fa, Ve.prototype.delete = sa, Ve.prototype.get = oa, Ve.prototype.has = la, Ve.prototype.set = aa;
      function tf(e, n) {
        var t = L(e), r = !t && Wn(e), u = !t && !r && Rn(e), o = !t && !r && !u && jn(e), l = t || r || u || o, a = l ? ui(e.length, xl) : [], h = a.length;
        for (var v in e)
          (n || H.call(e, v)) && !(l && // Safari 9 has enumerable `arguments.length` in strict mode.
          (v == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
          u && (v == "offset" || v == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
          o && (v == "buffer" || v == "byteLength" || v == "byteOffset") || // Skip index properties.
          ln(v, h))) && a.push(v);
        return a;
      }
      function rf(e) {
        var n = e.length;
        return n ? e[Ii(0, n - 1)] : i;
      }
      function ca(e, n) {
        return br(me(e), Tn(n, 0, e.length));
      }
      function ha(e) {
        return br(me(e));
      }
      function hi(e, n, t) {
        (t !== i && !Ke(e[n], t) || t === i && !(n in e)) && fn(e, n, t);
      }
      function mt(e, n, t) {
        var r = e[n];
        (!(H.call(e, n) && Ke(r, t)) || t === i && !(n in e)) && fn(e, n, t);
      }
      function cr(e, n) {
        for (var t = e.length; t--; )
          if (Ke(e[t][0], n))
            return t;
        return -1;
      }
      function pa(e, n, t, r) {
        return yn(e, function(u, o, l) {
          n(r, u, t(u), l);
        }), r;
      }
      function uf(e, n) {
        return e && ke(n, se(n), e);
      }
      function da(e, n) {
        return e && ke(n, xe(n), e);
      }
      function fn(e, n, t) {
        n == "__proto__" && ur ? ur(e, n, {
          configurable: !0,
          enumerable: !0,
          value: t,
          writable: !0
        }) : e[n] = t;
      }
      function pi(e, n) {
        for (var t = -1, r = n.length, u = g(r), o = e == null; ++t < r; )
          u[t] = o ? i : Zi(e, n[t]);
        return u;
      }
      function Tn(e, n, t) {
        return e === e && (t !== i && (e = e <= t ? e : t), n !== i && (e = e >= n ? e : n)), e;
      }
      function We(e, n, t, r, u, o) {
        var l, a = n & pe, h = n & Xe, v = n & de;
        if (t && (l = u ? t(e, r, u, o) : t(e)), l !== i)
          return l;
        if (!J(e))
          return e;
        var m = L(e);
        if (m) {
          if (l = tc(e), !a)
            return me(e, l);
        } else {
          var x = he(e), y = x == zt || x == fu;
          if (Rn(e))
            return Af(e, a);
          if (x == tn || x == Dn || y && !u) {
            if (l = h || y ? {} : Yf(e), !a)
              return h ? Va(e, da(l, e)) : Ha(e, uf(l, e));
          } else {
            if (!Z[x])
              return u ? e : {};
            l = rc(e, x, a);
          }
        }
        o || (o = new Ve());
        var C = o.get(e);
        if (C)
          return C;
        o.set(e, l), Cs(e) ? e.forEach(function(P) {
          l.add(We(P, n, t, P, e, o));
        }) : ys(e) && e.forEach(function(P, U) {
          l.set(U, We(P, n, t, U, e, o));
        });
        var S = v ? h ? Fi : Ti : h ? xe : se, F = m ? i : S(e);
        return Fe(F || e, function(P, U) {
          F && (U = P, P = e[U]), mt(l, U, We(P, n, t, U, e, o));
        }), l;
      }
      function ga(e) {
        var n = se(e);
        return function(t) {
          return ff(t, e, n);
        };
      }
      function ff(e, n, t) {
        var r = t.length;
        if (e == null)
          return !r;
        for (e = K(e); r--; ) {
          var u = t[r], o = n[u], l = e[u];
          if (l === i && !(u in e) || !o(l))
            return !1;
        }
        return !0;
      }
      function sf(e, n, t) {
        if (typeof e != "function")
          throw new Me(b);
        return Rt(function() {
          e.apply(i, t);
        }, n);
      }
      function wt(e, n, t, r) {
        var u = -1, o = Yt, l = !0, a = e.length, h = [], v = n.length;
        if (!a)
          return h;
        t && (n = X(n, be(t))), r ? (o = jr, l = !1) : n.length >= w && (o = ht, l = !1, n = new Ln(n));
        e:
          for (; ++u < a; ) {
            var m = e[u], x = t == null ? m : t(m);
            if (m = r || m !== 0 ? m : 0, l && x === x) {
              for (var y = v; y--; )
                if (n[y] === x)
                  continue e;
              h.push(m);
            } else
              o(n, x, r) || h.push(m);
          }
        return h;
      }
      var yn = Mf(Qe), of = Mf(gi, !0);
      function _a(e, n) {
        var t = !0;
        return yn(e, function(r, u, o) {
          return t = !!n(r, u, o), t;
        }), t;
      }
      function hr(e, n, t) {
        for (var r = -1, u = e.length; ++r < u; ) {
          var o = e[r], l = n(o);
          if (l != null && (a === i ? l === l && !Ee(l) : t(l, a)))
            var a = l, h = o;
        }
        return h;
      }
      function va(e, n, t, r) {
        var u = e.length;
        for (t = T(t), t < 0 && (t = -t > u ? 0 : u + t), r = r === i || r > u ? u : T(r), r < 0 && (r += u), r = t > r ? 0 : Rs(r); t < r; )
          e[t++] = n;
        return e;
      }
      function lf(e, n) {
        var t = [];
        return yn(e, function(r, u, o) {
          n(r, u, o) && t.push(r);
        }), t;
      }
      function le(e, n, t, r, u) {
        var o = -1, l = e.length;
        for (t || (t = uc), u || (u = []); ++o < l; ) {
          var a = e[o];
          n > 0 && t(a) ? n > 1 ? le(a, n - 1, t, r, u) : mn(u, a) : r || (u[u.length] = a);
        }
        return u;
      }
      var di = Uf(), af = Uf(!0);
      function Qe(e, n) {
        return e && di(e, n, se);
      }
      function gi(e, n) {
        return e && af(e, n, se);
      }
      function pr(e, n) {
        return vn(n, function(t) {
          return an(e[t]);
        });
      }
      function Fn(e, n) {
        n = Cn(n, e);
        for (var t = 0, r = n.length; e != null && t < r; )
          e = e[je(n[t++])];
        return t && t == r ? e : i;
      }
      function cf(e, n, t) {
        var r = n(e);
        return L(e) ? r : mn(r, t(e));
      }
      function ge(e) {
        return e == null ? e === i ? Vs : zs : An && An in K(e) ? ja(e) : hc(e);
      }
      function _i(e, n) {
        return e > n;
      }
      function ma(e, n) {
        return e != null && H.call(e, n);
      }
      function wa(e, n) {
        return e != null && n in K(e);
      }
      function xa(e, n, t) {
        return e >= ce(n, t) && e < ue(n, t);
      }
      function vi(e, n, t) {
        for (var r = t ? jr : Yt, u = e[0].length, o = e.length, l = o, a = g(o), h = 1 / 0, v = []; l--; ) {
          var m = e[l];
          l && n && (m = X(m, be(n))), h = ce(m.length, h), a[l] = !t && (n || u >= 120 && m.length >= 120) ? new Ln(l && m) : i;
        }
        m = e[0];
        var x = -1, y = a[0];
        e:
          for (; ++x < u && v.length < h; ) {
            var C = m[x], S = n ? n(C) : C;
            if (C = t || C !== 0 ? C : 0, !(y ? ht(y, S) : r(v, S, t))) {
              for (l = o; --l; ) {
                var F = a[l];
                if (!(F ? ht(F, S) : r(e[l], S, t)))
                  continue e;
              }
              y && y.push(S), v.push(C);
            }
          }
        return v;
      }
      function ya(e, n, t, r) {
        return Qe(e, function(u, o, l) {
          n(r, t(u), o, l);
        }), r;
      }
      function xt(e, n, t) {
        n = Cn(n, e), e = kf(e, n);
        var r = e == null ? e : e[je(Ne(n))];
        return r == null ? i : Ce(r, e, t);
      }
      function hf(e) {
        return k(e) && ge(e) == Dn;
      }
      function Ia(e) {
        return k(e) && ge(e) == ct;
      }
      function Ca(e) {
        return k(e) && ge(e) == ft;
      }
      function yt(e, n, t, r, u) {
        return e === n ? !0 : e == null || n == null || !k(e) && !k(n) ? e !== e && n !== n : ba(e, n, t, r, yt, u);
      }
      function ba(e, n, t, r, u, o) {
        var l = L(e), a = L(n), h = l ? Gt : he(e), v = a ? Gt : he(n);
        h = h == Dn ? tn : h, v = v == Dn ? tn : v;
        var m = h == tn, x = v == tn, y = h == v;
        if (y && Rn(e)) {
          if (!Rn(n))
            return !1;
          l = !0, m = !1;
        }
        if (y && !m)
          return o || (o = new Ve()), l || jn(e) ? Vf(e, n, t, r, u, o) : Qa(e, n, h, t, r, u, o);
        if (!(t & re)) {
          var C = m && H.call(e, "__wrapped__"), S = x && H.call(n, "__wrapped__");
          if (C || S) {
            var F = C ? e.value() : e, P = S ? n.value() : n;
            return o || (o = new Ve()), u(F, P, t, r, o);
          }
        }
        return y ? (o || (o = new Ve()), ka(e, n, t, r, u, o)) : !1;
      }
      function Ra(e) {
        return k(e) && he(e) == $e;
      }
      function mi(e, n, t, r) {
        var u = t.length, o = u, l = !r;
        if (e == null)
          return !o;
        for (e = K(e); u--; ) {
          var a = t[u];
          if (l && a[2] ? a[1] !== e[a[0]] : !(a[0] in e))
            return !1;
        }
        for (; ++u < o; ) {
          a = t[u];
          var h = a[0], v = e[h], m = a[1];
          if (l && a[2]) {
            if (v === i && !(h in e))
              return !1;
          } else {
            var x = new Ve();
            if (r)
              var y = r(v, m, h, e, n, x);
            if (!(y === i ? yt(m, v, re | te, r, x) : y))
              return !1;
          }
        }
        return !0;
      }
      function pf(e) {
        if (!J(e) || sc(e))
          return !1;
        var n = an(e) ? Rl : go;
        return n.test(Un(e));
      }
      function Ea(e) {
        return k(e) && ge(e) == ot;
      }
      function Sa(e) {
        return k(e) && he(e) == ze;
      }
      function Pa(e) {
        return k(e) && Or(e.length) && !!Y[ge(e)];
      }
      function df(e) {
        return typeof e == "function" ? e : e == null ? ye : typeof e == "object" ? L(e) ? vf(e[0], e[1]) : _f(e) : Ws(e);
      }
      function wi(e) {
        if (!bt(e))
          return Ll(e);
        var n = [];
        for (var t in K(e))
          H.call(e, t) && t != "constructor" && n.push(t);
        return n;
      }
      function Aa(e) {
        if (!J(e))
          return cc(e);
        var n = bt(e), t = [];
        for (var r in e)
          r == "constructor" && (n || !H.call(e, r)) || t.push(r);
        return t;
      }
      function xi(e, n) {
        return e < n;
      }
      function gf(e, n) {
        var t = -1, r = we(e) ? g(e.length) : [];
        return yn(e, function(u, o, l) {
          r[++t] = n(u, o, l);
        }), r;
      }
      function _f(e) {
        var n = Ui(e);
        return n.length == 1 && n[0][2] ? Jf(n[0][0], n[0][1]) : function(t) {
          return t === e || mi(t, e, n);
        };
      }
      function vf(e, n) {
        return Bi(e) && Xf(n) ? Jf(je(e), n) : function(t) {
          var r = Zi(t, e);
          return r === i && r === n ? Yi(t, e) : yt(n, r, re | te);
        };
      }
      function dr(e, n, t, r, u) {
        e !== n && di(n, function(o, l) {
          if (u || (u = new Ve()), J(o))
            Oa(e, n, l, t, dr, r, u);
          else {
            var a = r ? r(Di(e, l), o, l + "", e, n, u) : i;
            a === i && (a = o), hi(e, l, a);
          }
        }, xe);
      }
      function Oa(e, n, t, r, u, o, l) {
        var a = Di(e, t), h = Di(n, t), v = l.get(h);
        if (v) {
          hi(e, t, v);
          return;
        }
        var m = o ? o(a, h, t + "", e, n, l) : i, x = m === i;
        if (x) {
          var y = L(h), C = !y && Rn(h), S = !y && !C && jn(h);
          m = h, y || C || S ? L(a) ? m = a : ee(a) ? m = me(a) : C ? (x = !1, m = Af(h, !0)) : S ? (x = !1, m = Of(h, !0)) : m = [] : Et(h) || Wn(h) ? (m = a, Wn(a) ? m = Es(a) : (!J(a) || an(a)) && (m = Yf(h))) : x = !1;
        }
        x && (l.set(h, m), u(m, h, r, o, l), l.delete(h)), hi(e, t, m);
      }
      function mf(e, n) {
        var t = e.length;
        if (t)
          return n += n < 0 ? t : 0, ln(n, t) ? e[n] : i;
      }
      function wf(e, n, t) {
        n.length ? n = X(n, function(o) {
          return L(o) ? function(l) {
            return Fn(l, o.length === 1 ? o[0] : o);
          } : o;
        }) : n = [ye];
        var r = -1;
        n = X(n, be(E()));
        var u = gf(e, function(o, l, a) {
          var h = X(n, function(v) {
            return v(o);
          });
          return { criteria: h, index: ++r, value: o };
        });
        return rl(u, function(o, l) {
          return za(o, l, t);
        });
      }
      function La(e, n) {
        return xf(e, n, function(t, r) {
          return Yi(e, r);
        });
      }
      function xf(e, n, t) {
        for (var r = -1, u = n.length, o = {}; ++r < u; ) {
          var l = n[r], a = Fn(e, l);
          t(a, l) && It(o, Cn(l, e), a);
        }
        return o;
      }
      function Ta(e) {
        return function(n) {
          return Fn(n, e);
        };
      }
      function yi(e, n, t, r) {
        var u = r ? tl : $n, o = -1, l = n.length, a = e;
        for (e === n && (n = me(n)), t && (a = X(e, be(t))); ++o < l; )
          for (var h = 0, v = n[o], m = t ? t(v) : v; (h = u(a, m, h, r)) > -1; )
            a !== e && ir.call(a, h, 1), ir.call(e, h, 1);
        return e;
      }
      function yf(e, n) {
        for (var t = e ? n.length : 0, r = t - 1; t--; ) {
          var u = n[t];
          if (t == r || u !== o) {
            var o = u;
            ln(u) ? ir.call(e, u, 1) : Ri(e, u);
          }
        }
        return e;
      }
      function Ii(e, n) {
        return e + sr(ef() * (n - e + 1));
      }
      function Fa(e, n, t, r) {
        for (var u = -1, o = ue(fr((n - e) / (t || 1)), 0), l = g(o); o--; )
          l[r ? o : ++u] = e, e += t;
        return l;
      }
      function Ci(e, n) {
        var t = "";
        if (!e || n < 1 || n > Ge)
          return t;
        do
          n % 2 && (t += e), n = sr(n / 2), n && (e += e);
        while (n);
        return t;
      }
      function M(e, n) {
        return qi(Qf(e, n, ye), e + "");
      }
      function Ma(e) {
        return rf(et(e));
      }
      function Ua(e, n) {
        var t = et(e);
        return br(t, Tn(n, 0, t.length));
      }
      function It(e, n, t, r) {
        if (!J(e))
          return e;
        n = Cn(n, e);
        for (var u = -1, o = n.length, l = o - 1, a = e; a != null && ++u < o; ) {
          var h = je(n[u]), v = t;
          if (h === "__proto__" || h === "constructor" || h === "prototype")
            return e;
          if (u != l) {
            var m = a[h];
            v = r ? r(m, h, a) : i, v === i && (v = J(m) ? m : ln(n[u + 1]) ? [] : {});
          }
          mt(a, h, v), a = a[h];
        }
        return e;
      }
      var If = or ? function(e, n) {
        return or.set(e, n), e;
      } : ye, Wa = ur ? function(e, n) {
        return ur(e, "toString", {
          configurable: !0,
          enumerable: !1,
          value: Ji(n),
          writable: !0
        });
      } : ye;
      function Ba(e) {
        return br(et(e));
      }
      function Be(e, n, t) {
        var r = -1, u = e.length;
        n < 0 && (n = -n > u ? 0 : u + n), t = t > u ? u : t, t < 0 && (t += u), u = n > t ? 0 : t - n >>> 0, n >>>= 0;
        for (var o = g(u); ++r < u; )
          o[r] = e[r + n];
        return o;
      }
      function Na(e, n) {
        var t;
        return yn(e, function(r, u, o) {
          return t = n(r, u, o), !t;
        }), !!t;
      }
      function gr(e, n, t) {
        var r = 0, u = e == null ? r : e.length;
        if (typeof n == "number" && n === n && u <= Sn) {
          for (; r < u; ) {
            var o = r + u >>> 1, l = e[o];
            l !== null && !Ee(l) && (t ? l <= n : l < n) ? r = o + 1 : u = o;
          }
          return u;
        }
        return bi(e, n, ye, t);
      }
      function bi(e, n, t, r) {
        var u = 0, o = e == null ? 0 : e.length;
        if (o === 0)
          return 0;
        n = t(n);
        for (var l = n !== n, a = n === null, h = Ee(n), v = n === i; u < o; ) {
          var m = sr((u + o) / 2), x = t(e[m]), y = x !== i, C = x === null, S = x === x, F = Ee(x);
          if (l)
            var P = r || S;
          else
            v ? P = S && (r || y) : a ? P = S && y && (r || !C) : h ? P = S && y && !C && (r || !F) : C || F ? P = !1 : P = r ? x <= n : x < n;
          P ? u = m + 1 : o = m;
        }
        return ce(o, Dt);
      }
      function Cf(e, n) {
        for (var t = -1, r = e.length, u = 0, o = []; ++t < r; ) {
          var l = e[t], a = n ? n(l) : l;
          if (!t || !Ke(a, h)) {
            var h = a;
            o[u++] = l === 0 ? 0 : l;
          }
        }
        return o;
      }
      function bf(e) {
        return typeof e == "number" ? e : Ee(e) ? En : +e;
      }
      function Re(e) {
        if (typeof e == "string")
          return e;
        if (L(e))
          return X(e, Re) + "";
        if (Ee(e))
          return nf ? nf.call(e) : "";
        var n = e + "";
        return n == "0" && 1 / e == -Je ? "-0" : n;
      }
      function In(e, n, t) {
        var r = -1, u = Yt, o = e.length, l = !0, a = [], h = a;
        if (t)
          l = !1, u = jr;
        else if (o >= w) {
          var v = n ? null : Xa(e);
          if (v)
            return Jt(v);
          l = !1, u = ht, h = new Ln();
        } else
          h = n ? [] : a;
        e:
          for (; ++r < o; ) {
            var m = e[r], x = n ? n(m) : m;
            if (m = t || m !== 0 ? m : 0, l && x === x) {
              for (var y = h.length; y--; )
                if (h[y] === x)
                  continue e;
              n && h.push(x), a.push(m);
            } else
              u(h, x, t) || (h !== a && h.push(x), a.push(m));
          }
        return a;
      }
      function Ri(e, n) {
        return n = Cn(n, e), e = kf(e, n), e == null || delete e[je(Ne(n))];
      }
      function Rf(e, n, t, r) {
        return It(e, n, t(Fn(e, n)), r);
      }
      function _r(e, n, t, r) {
        for (var u = e.length, o = r ? u : -1; (r ? o-- : ++o < u) && n(e[o], o, e); )
          ;
        return t ? Be(e, r ? 0 : o, r ? o + 1 : u) : Be(e, r ? o + 1 : 0, r ? u : o);
      }
      function Ef(e, n) {
        var t = e;
        return t instanceof B && (t = t.value()), ei(n, function(r, u) {
          return u.func.apply(u.thisArg, mn([r], u.args));
        }, t);
      }
      function Ei(e, n, t) {
        var r = e.length;
        if (r < 2)
          return r ? In(e[0]) : [];
        for (var u = -1, o = g(r); ++u < r; )
          for (var l = e[u], a = -1; ++a < r; )
            a != u && (o[u] = wt(o[u] || l, e[a], n, t));
        return In(le(o, 1), n, t);
      }
      function Sf(e, n, t) {
        for (var r = -1, u = e.length, o = n.length, l = {}; ++r < u; ) {
          var a = r < o ? n[r] : i;
          t(l, e[r], a);
        }
        return l;
      }
      function Si(e) {
        return ee(e) ? e : [];
      }
      function Pi(e) {
        return typeof e == "function" ? e : ye;
      }
      function Cn(e, n) {
        return L(e) ? e : Bi(e, n) ? [e] : ts($(e));
      }
      var Da = M;
      function bn(e, n, t) {
        var r = e.length;
        return t = t === i ? r : t, !n && t >= r ? e : Be(e, n, t);
      }
      var Pf = El || function(e) {
        return oe.clearTimeout(e);
      };
      function Af(e, n) {
        if (n)
          return e.slice();
        var t = e.length, r = Xu ? Xu(t) : new e.constructor(t);
        return e.copy(r), r;
      }
      function Ai(e) {
        var n = new e.constructor(e.byteLength);
        return new tr(n).set(new tr(e)), n;
      }
      function qa(e, n) {
        var t = n ? Ai(e.buffer) : e.buffer;
        return new e.constructor(t, e.byteOffset, e.byteLength);
      }
      function Ga(e) {
        var n = new e.constructor(e.source, cu.exec(e));
        return n.lastIndex = e.lastIndex, n;
      }
      function $a(e) {
        return vt ? K(vt.call(e)) : {};
      }
      function Of(e, n) {
        var t = n ? Ai(e.buffer) : e.buffer;
        return new e.constructor(t, e.byteOffset, e.length);
      }
      function Lf(e, n) {
        if (e !== n) {
          var t = e !== i, r = e === null, u = e === e, o = Ee(e), l = n !== i, a = n === null, h = n === n, v = Ee(n);
          if (!a && !v && !o && e > n || o && l && h && !a && !v || r && l && h || !t && h || !u)
            return 1;
          if (!r && !o && !v && e < n || v && t && u && !r && !o || a && t && u || !l && u || !h)
            return -1;
        }
        return 0;
      }
      function za(e, n, t) {
        for (var r = -1, u = e.criteria, o = n.criteria, l = u.length, a = t.length; ++r < l; ) {
          var h = Lf(u[r], o[r]);
          if (h) {
            if (r >= a)
              return h;
            var v = t[r];
            return h * (v == "desc" ? -1 : 1);
          }
        }
        return e.index - n.index;
      }
      function Tf(e, n, t, r) {
        for (var u = -1, o = e.length, l = t.length, a = -1, h = n.length, v = ue(o - l, 0), m = g(h + v), x = !r; ++a < h; )
          m[a] = n[a];
        for (; ++u < l; )
          (x || u < o) && (m[t[u]] = e[u]);
        for (; v--; )
          m[a++] = e[u++];
        return m;
      }
      function Ff(e, n, t, r) {
        for (var u = -1, o = e.length, l = -1, a = t.length, h = -1, v = n.length, m = ue(o - a, 0), x = g(m + v), y = !r; ++u < m; )
          x[u] = e[u];
        for (var C = u; ++h < v; )
          x[C + h] = n[h];
        for (; ++l < a; )
          (y || u < o) && (x[C + t[l]] = e[u++]);
        return x;
      }
      function me(e, n) {
        var t = -1, r = e.length;
        for (n || (n = g(r)); ++t < r; )
          n[t] = e[t];
        return n;
      }
      function ke(e, n, t, r) {
        var u = !t;
        t || (t = {});
        for (var o = -1, l = n.length; ++o < l; ) {
          var a = n[o], h = r ? r(t[a], e[a], a, t, e) : i;
          h === i && (h = e[a]), u ? fn(t, a, h) : mt(t, a, h);
        }
        return t;
      }
      function Ha(e, n) {
        return ke(e, Wi(e), n);
      }
      function Va(e, n) {
        return ke(e, Kf(e), n);
      }
      function vr(e, n) {
        return function(t, r) {
          var u = L(t) ? Jo : pa, o = n ? n() : {};
          return u(t, e, E(r, 2), o);
        };
      }
      function Jn(e) {
        return M(function(n, t) {
          var r = -1, u = t.length, o = u > 1 ? t[u - 1] : i, l = u > 2 ? t[2] : i;
          for (o = e.length > 3 && typeof o == "function" ? (u--, o) : i, l && _e(t[0], t[1], l) && (o = u < 3 ? i : o, u = 1), n = K(n); ++r < u; ) {
            var a = t[r];
            a && e(n, a, r, o);
          }
          return n;
        });
      }
      function Mf(e, n) {
        return function(t, r) {
          if (t == null)
            return t;
          if (!we(t))
            return e(t, r);
          for (var u = t.length, o = n ? u : -1, l = K(t); (n ? o-- : ++o < u) && r(l[o], o, l) !== !1; )
            ;
          return t;
        };
      }
      function Uf(e) {
        return function(n, t, r) {
          for (var u = -1, o = K(n), l = r(n), a = l.length; a--; ) {
            var h = l[e ? a : ++u];
            if (t(o[h], h, o) === !1)
              break;
          }
          return n;
        };
      }
      function Ka(e, n, t) {
        var r = n & j, u = Ct(e);
        function o() {
          var l = this && this !== oe && this instanceof o ? u : e;
          return l.apply(r ? t : this, arguments);
        }
        return o;
      }
      function Wf(e) {
        return function(n) {
          n = $(n);
          var t = zn(n) ? He(n) : i, r = t ? t[0] : n.charAt(0), u = t ? bn(t, 1).join("") : n.slice(1);
          return r[e]() + u;
        };
      }
      function Qn(e) {
        return function(n) {
          return ei(Ms(Fs(n).replace(Wo, "")), e, "");
        };
      }
      function Ct(e) {
        return function() {
          var n = arguments;
          switch (n.length) {
            case 0:
              return new e();
            case 1:
              return new e(n[0]);
            case 2:
              return new e(n[0], n[1]);
            case 3:
              return new e(n[0], n[1], n[2]);
            case 4:
              return new e(n[0], n[1], n[2], n[3]);
            case 5:
              return new e(n[0], n[1], n[2], n[3], n[4]);
            case 6:
              return new e(n[0], n[1], n[2], n[3], n[4], n[5]);
            case 7:
              return new e(n[0], n[1], n[2], n[3], n[4], n[5], n[6]);
          }
          var t = Xn(e.prototype), r = e.apply(t, n);
          return J(r) ? r : t;
        };
      }
      function Za(e, n, t) {
        var r = Ct(e);
        function u() {
          for (var o = arguments.length, l = g(o), a = o, h = kn(u); a--; )
            l[a] = arguments[a];
          var v = o < 3 && l[0] !== h && l[o - 1] !== h ? [] : wn(l, h);
          if (o -= v.length, o < t)
            return Gf(
              e,
              n,
              mr,
              u.placeholder,
              i,
              l,
              v,
              i,
              i,
              t - o
            );
          var m = this && this !== oe && this instanceof u ? r : e;
          return Ce(m, this, l);
        }
        return u;
      }
      function Bf(e) {
        return function(n, t, r) {
          var u = K(n);
          if (!we(n)) {
            var o = E(t, 3);
            n = se(n), t = function(a) {
              return o(u[a], a, u);
            };
          }
          var l = e(n, t, r);
          return l > -1 ? u[o ? n[l] : l] : i;
        };
      }
      function Nf(e) {
        return on(function(n) {
          var t = n.length, r = t, u = Ue.prototype.thru;
          for (e && n.reverse(); r--; ) {
            var o = n[r];
            if (typeof o != "function")
              throw new Me(b);
            if (u && !l && Ir(o) == "wrapper")
              var l = new Ue([], !0);
          }
          for (r = l ? r : t; ++r < t; ) {
            o = n[r];
            var a = Ir(o), h = a == "wrapper" ? Mi(o) : i;
            h && Ni(h[0]) && h[1] == (Le | Ae | Oe | _n) && !h[4].length && h[9] == 1 ? l = l[Ir(h[0])].apply(l, h[3]) : l = o.length == 1 && Ni(o) ? l[a]() : l.thru(o);
          }
          return function() {
            var v = arguments, m = v[0];
            if (l && v.length == 1 && L(m))
              return l.plant(m).value();
            for (var x = 0, y = t ? n[x].apply(this, v) : m; ++x < t; )
              y = n[x].call(this, y);
            return y;
          };
        });
      }
      function mr(e, n, t, r, u, o, l, a, h, v) {
        var m = n & Le, x = n & j, y = n & en, C = n & (Ae | gn), S = n & Nn, F = y ? i : Ct(e);
        function P() {
          for (var U = arguments.length, N = g(U), Se = U; Se--; )
            N[Se] = arguments[Se];
          if (C)
            var ve = kn(P), Pe = ul(N, ve);
          if (r && (N = Tf(N, r, u, C)), o && (N = Ff(N, o, l, C)), U -= Pe, C && U < v) {
            var ne = wn(N, ve);
            return Gf(
              e,
              n,
              mr,
              P.placeholder,
              t,
              N,
              ne,
              a,
              h,
              v - U
            );
          }
          var Ze = x ? t : this, hn = y ? Ze[e] : e;
          return U = N.length, a ? N = pc(N, a) : S && U > 1 && N.reverse(), m && h < U && (N.length = h), this && this !== oe && this instanceof P && (hn = F || Ct(hn)), hn.apply(Ze, N);
        }
        return P;
      }
      function Df(e, n) {
        return function(t, r) {
          return ya(t, e, n(r), {});
        };
      }
      function wr(e, n) {
        return function(t, r) {
          var u;
          if (t === i && r === i)
            return n;
          if (t !== i && (u = t), r !== i) {
            if (u === i)
              return r;
            typeof t == "string" || typeof r == "string" ? (t = Re(t), r = Re(r)) : (t = bf(t), r = bf(r)), u = e(t, r);
          }
          return u;
        };
      }
      function Oi(e) {
        return on(function(n) {
          return n = X(n, be(E())), M(function(t) {
            var r = this;
            return e(n, function(u) {
              return Ce(u, r, t);
            });
          });
        });
      }
      function xr(e, n) {
        n = n === i ? " " : Re(n);
        var t = n.length;
        if (t < 2)
          return t ? Ci(n, e) : n;
        var r = Ci(n, fr(e / Hn(n)));
        return zn(n) ? bn(He(r), 0, e).join("") : r.slice(0, e);
      }
      function Ya(e, n, t, r) {
        var u = n & j, o = Ct(e);
        function l() {
          for (var a = -1, h = arguments.length, v = -1, m = r.length, x = g(m + h), y = this && this !== oe && this instanceof l ? o : e; ++v < m; )
            x[v] = r[v];
          for (; h--; )
            x[v++] = arguments[++a];
          return Ce(y, u ? t : this, x);
        }
        return l;
      }
      function qf(e) {
        return function(n, t, r) {
          return r && typeof r != "number" && _e(n, t, r) && (t = r = i), n = cn(n), t === i ? (t = n, n = 0) : t = cn(t), r = r === i ? n < t ? 1 : -1 : cn(r), Fa(n, t, r, e);
        };
      }
      function yr(e) {
        return function(n, t) {
          return typeof n == "string" && typeof t == "string" || (n = De(n), t = De(t)), e(n, t);
        };
      }
      function Gf(e, n, t, r, u, o, l, a, h, v) {
        var m = n & Ae, x = m ? l : i, y = m ? i : l, C = m ? o : i, S = m ? i : o;
        n |= m ? Oe : nn, n &= ~(m ? nn : Oe), n & Lt || (n &= ~(j | en));
        var F = [
          e,
          n,
          u,
          C,
          x,
          S,
          y,
          a,
          h,
          v
        ], P = t.apply(i, F);
        return Ni(e) && jf(P, F), P.placeholder = r, es(P, e, n);
      }
      function Li(e) {
        var n = ie[e];
        return function(t, r) {
          if (t = De(t), r = r == null ? 0 : ce(T(r), 292), r && ju(t)) {
            var u = ($(t) + "e").split("e"), o = n(u[0] + "e" + (+u[1] + r));
            return u = ($(o) + "e").split("e"), +(u[0] + "e" + (+u[1] - r));
          }
          return n(t);
        };
      }
      var Xa = Zn && 1 / Jt(new Zn([, -0]))[1] == Je ? function(e) {
        return new Zn(e);
      } : ji;
      function $f(e) {
        return function(n) {
          var t = he(n);
          return t == $e ? si(n) : t == ze ? hl(n) : il(n, e(n));
        };
      }
      function sn(e, n, t, r, u, o, l, a) {
        var h = n & en;
        if (!h && typeof e != "function")
          throw new Me(b);
        var v = r ? r.length : 0;
        if (v || (n &= ~(Oe | nn), r = u = i), l = l === i ? l : ue(T(l), 0), a = a === i ? a : T(a), v -= u ? u.length : 0, n & nn) {
          var m = r, x = u;
          r = u = i;
        }
        var y = h ? i : Mi(e), C = [
          e,
          n,
          t,
          r,
          u,
          m,
          x,
          o,
          l,
          a
        ];
        if (y && ac(C, y), e = C[0], n = C[1], t = C[2], r = C[3], u = C[4], a = C[9] = C[9] === i ? h ? 0 : e.length : ue(C[9] - v, 0), !a && n & (Ae | gn) && (n &= ~(Ae | gn)), !n || n == j)
          var S = Ka(e, n, t);
        else
          n == Ae || n == gn ? S = Za(e, n, a) : (n == Oe || n == (j | Oe)) && !u.length ? S = Ya(e, n, t, r) : S = mr.apply(i, C);
        var F = y ? If : jf;
        return es(F(S, C), e, n);
      }
      function zf(e, n, t, r) {
        return e === i || Ke(e, Kn[t]) && !H.call(r, t) ? n : e;
      }
      function Hf(e, n, t, r, u, o) {
        return J(e) && J(n) && (o.set(n, e), dr(e, n, i, Hf, o), o.delete(n)), e;
      }
      function Ja(e) {
        return Et(e) ? i : e;
      }
      function Vf(e, n, t, r, u, o) {
        var l = t & re, a = e.length, h = n.length;
        if (a != h && !(l && h > a))
          return !1;
        var v = o.get(e), m = o.get(n);
        if (v && m)
          return v == n && m == e;
        var x = -1, y = !0, C = t & te ? new Ln() : i;
        for (o.set(e, n), o.set(n, e); ++x < a; ) {
          var S = e[x], F = n[x];
          if (r)
            var P = l ? r(F, S, x, n, e, o) : r(S, F, x, e, n, o);
          if (P !== i) {
            if (P)
              continue;
            y = !1;
            break;
          }
          if (C) {
            if (!ni(n, function(U, N) {
              if (!ht(C, N) && (S === U || u(S, U, t, r, o)))
                return C.push(N);
            })) {
              y = !1;
              break;
            }
          } else if (!(S === F || u(S, F, t, r, o))) {
            y = !1;
            break;
          }
        }
        return o.delete(e), o.delete(n), y;
      }
      function Qa(e, n, t, r, u, o, l) {
        switch (t) {
          case qn:
            if (e.byteLength != n.byteLength || e.byteOffset != n.byteOffset)
              return !1;
            e = e.buffer, n = n.buffer;
          case ct:
            return !(e.byteLength != n.byteLength || !o(new tr(e), new tr(n)));
          case ut:
          case ft:
          case st:
            return Ke(+e, +n);
          case $t:
            return e.name == n.name && e.message == n.message;
          case ot:
          case lt:
            return e == n + "";
          case $e:
            var a = si;
          case ze:
            var h = r & re;
            if (a || (a = Jt), e.size != n.size && !h)
              return !1;
            var v = l.get(e);
            if (v)
              return v == n;
            r |= te, l.set(e, n);
            var m = Vf(a(e), a(n), r, u, o, l);
            return l.delete(e), m;
          case Ht:
            if (vt)
              return vt.call(e) == vt.call(n);
        }
        return !1;
      }
      function ka(e, n, t, r, u, o) {
        var l = t & re, a = Ti(e), h = a.length, v = Ti(n), m = v.length;
        if (h != m && !l)
          return !1;
        for (var x = h; x--; ) {
          var y = a[x];
          if (!(l ? y in n : H.call(n, y)))
            return !1;
        }
        var C = o.get(e), S = o.get(n);
        if (C && S)
          return C == n && S == e;
        var F = !0;
        o.set(e, n), o.set(n, e);
        for (var P = l; ++x < h; ) {
          y = a[x];
          var U = e[y], N = n[y];
          if (r)
            var Se = l ? r(N, U, y, n, e, o) : r(U, N, y, e, n, o);
          if (!(Se === i ? U === N || u(U, N, t, r, o) : Se)) {
            F = !1;
            break;
          }
          P || (P = y == "constructor");
        }
        if (F && !P) {
          var ve = e.constructor, Pe = n.constructor;
          ve != Pe && "constructor" in e && "constructor" in n && !(typeof ve == "function" && ve instanceof ve && typeof Pe == "function" && Pe instanceof Pe) && (F = !1);
        }
        return o.delete(e), o.delete(n), F;
      }
      function on(e) {
        return qi(Qf(e, i, fs), e + "");
      }
      function Ti(e) {
        return cf(e, se, Wi);
      }
      function Fi(e) {
        return cf(e, xe, Kf);
      }
      var Mi = or ? function(e) {
        return or.get(e);
      } : ji;
      function Ir(e) {
        for (var n = e.name + "", t = Yn[n], r = H.call(Yn, n) ? t.length : 0; r--; ) {
          var u = t[r], o = u.func;
          if (o == null || o == e)
            return u.name;
        }
        return n;
      }
      function kn(e) {
        var n = H.call(s, "placeholder") ? s : e;
        return n.placeholder;
      }
      function E() {
        var e = s.iteratee || Qi;
        return e = e === Qi ? df : e, arguments.length ? e(arguments[0], arguments[1]) : e;
      }
      function Cr(e, n) {
        var t = e.__data__;
        return fc(n) ? t[typeof n == "string" ? "string" : "hash"] : t.map;
      }
      function Ui(e) {
        for (var n = se(e), t = n.length; t--; ) {
          var r = n[t], u = e[r];
          n[t] = [r, u, Xf(u)];
        }
        return n;
      }
      function Mn(e, n) {
        var t = ll(e, n);
        return pf(t) ? t : i;
      }
      function ja(e) {
        var n = H.call(e, An), t = e[An];
        try {
          e[An] = i;
          var r = !0;
        } catch {
        }
        var u = er.call(e);
        return r && (n ? e[An] = t : delete e[An]), u;
      }
      var Wi = li ? function(e) {
        return e == null ? [] : (e = K(e), vn(li(e), function(n) {
          return Qu.call(e, n);
        }));
      } : eu, Kf = li ? function(e) {
        for (var n = []; e; )
          mn(n, Wi(e)), e = rr(e);
        return n;
      } : eu, he = ge;
      (ai && he(new ai(new ArrayBuffer(1))) != qn || dt && he(new dt()) != $e || ci && he(ci.resolve()) != su || Zn && he(new Zn()) != ze || gt && he(new gt()) != at) && (he = function(e) {
        var n = ge(e), t = n == tn ? e.constructor : i, r = t ? Un(t) : "";
        if (r)
          switch (r) {
            case Ul:
              return qn;
            case Wl:
              return $e;
            case Bl:
              return su;
            case Nl:
              return ze;
            case Dl:
              return at;
          }
        return n;
      });
      function ec(e, n, t) {
        for (var r = -1, u = t.length; ++r < u; ) {
          var o = t[r], l = o.size;
          switch (o.type) {
            case "drop":
              e += l;
              break;
            case "dropRight":
              n -= l;
              break;
            case "take":
              n = ce(n, e + l);
              break;
            case "takeRight":
              e = ue(e, n - l);
              break;
          }
        }
        return { start: e, end: n };
      }
      function nc(e) {
        var n = e.match(fo);
        return n ? n[1].split(so) : [];
      }
      function Zf(e, n, t) {
        n = Cn(n, e);
        for (var r = -1, u = n.length, o = !1; ++r < u; ) {
          var l = je(n[r]);
          if (!(o = e != null && t(e, l)))
            break;
          e = e[l];
        }
        return o || ++r != u ? o : (u = e == null ? 0 : e.length, !!u && Or(u) && ln(l, u) && (L(e) || Wn(e)));
      }
      function tc(e) {
        var n = e.length, t = new e.constructor(n);
        return n && typeof e[0] == "string" && H.call(e, "index") && (t.index = e.index, t.input = e.input), t;
      }
      function Yf(e) {
        return typeof e.constructor == "function" && !bt(e) ? Xn(rr(e)) : {};
      }
      function rc(e, n, t) {
        var r = e.constructor;
        switch (n) {
          case ct:
            return Ai(e);
          case ut:
          case ft:
            return new r(+e);
          case qn:
            return qa(e, t);
          case Ur:
          case Wr:
          case Br:
          case Nr:
          case Dr:
          case qr:
          case Gr:
          case $r:
          case zr:
            return Of(e, t);
          case $e:
            return new r();
          case st:
          case lt:
            return new r(e);
          case ot:
            return Ga(e);
          case ze:
            return new r();
          case Ht:
            return $a(e);
        }
      }
      function ic(e, n) {
        var t = n.length;
        if (!t)
          return e;
        var r = t - 1;
        return n[r] = (t > 1 ? "& " : "") + n[r], n = n.join(t > 2 ? ", " : " "), e.replace(uo, `{
/* [wrapped with ` + n + `] */
`);
      }
      function uc(e) {
        return L(e) || Wn(e) || !!(ku && e && e[ku]);
      }
      function ln(e, n) {
        var t = typeof e;
        return n = n ?? Ge, !!n && (t == "number" || t != "symbol" && vo.test(e)) && e > -1 && e % 1 == 0 && e < n;
      }
      function _e(e, n, t) {
        if (!J(t))
          return !1;
        var r = typeof n;
        return (r == "number" ? we(t) && ln(n, t.length) : r == "string" && n in t) ? Ke(t[n], e) : !1;
      }
      function Bi(e, n) {
        if (L(e))
          return !1;
        var t = typeof e;
        return t == "number" || t == "symbol" || t == "boolean" || e == null || Ee(e) ? !0 : no.test(e) || !eo.test(e) || n != null && e in K(n);
      }
      function fc(e) {
        var n = typeof e;
        return n == "string" || n == "number" || n == "symbol" || n == "boolean" ? e !== "__proto__" : e === null;
      }
      function Ni(e) {
        var n = Ir(e), t = s[n];
        if (typeof t != "function" || !(n in B.prototype))
          return !1;
        if (e === t)
          return !0;
        var r = Mi(t);
        return !!r && e === r[0];
      }
      function sc(e) {
        return !!Yu && Yu in e;
      }
      var oc = kt ? an : nu;
      function bt(e) {
        var n = e && e.constructor, t = typeof n == "function" && n.prototype || Kn;
        return e === t;
      }
      function Xf(e) {
        return e === e && !J(e);
      }
      function Jf(e, n) {
        return function(t) {
          return t == null ? !1 : t[e] === n && (n !== i || e in K(t));
        };
      }
      function lc(e) {
        var n = Pr(e, function(r) {
          return t.size === z && t.clear(), r;
        }), t = n.cache;
        return n;
      }
      function ac(e, n) {
        var t = e[1], r = n[1], u = t | r, o = u < (j | en | Le), l = r == Le && t == Ae || r == Le && t == _n && e[7].length <= n[8] || r == (Le | _n) && n[7].length <= n[8] && t == Ae;
        if (!(o || l))
          return e;
        r & j && (e[2] = n[2], u |= t & j ? 0 : Lt);
        var a = n[3];
        if (a) {
          var h = e[3];
          e[3] = h ? Tf(h, a, n[4]) : a, e[4] = h ? wn(e[3], Q) : n[4];
        }
        return a = n[5], a && (h = e[5], e[5] = h ? Ff(h, a, n[6]) : a, e[6] = h ? wn(e[5], Q) : n[6]), a = n[7], a && (e[7] = a), r & Le && (e[8] = e[8] == null ? n[8] : ce(e[8], n[8])), e[9] == null && (e[9] = n[9]), e[0] = n[0], e[1] = u, e;
      }
      function cc(e) {
        var n = [];
        if (e != null)
          for (var t in K(e))
            n.push(t);
        return n;
      }
      function hc(e) {
        return er.call(e);
      }
      function Qf(e, n, t) {
        return n = ue(n === i ? e.length - 1 : n, 0), function() {
          for (var r = arguments, u = -1, o = ue(r.length - n, 0), l = g(o); ++u < o; )
            l[u] = r[n + u];
          u = -1;
          for (var a = g(n + 1); ++u < n; )
            a[u] = r[u];
          return a[n] = t(l), Ce(e, this, a);
        };
      }
      function kf(e, n) {
        return n.length < 2 ? e : Fn(e, Be(n, 0, -1));
      }
      function pc(e, n) {
        for (var t = e.length, r = ce(n.length, t), u = me(e); r--; ) {
          var o = n[r];
          e[r] = ln(o, t) ? u[o] : i;
        }
        return e;
      }
      function Di(e, n) {
        if (!(n === "constructor" && typeof e[n] == "function") && n != "__proto__")
          return e[n];
      }
      var jf = ns(If), Rt = Pl || function(e, n) {
        return oe.setTimeout(e, n);
      }, qi = ns(Wa);
      function es(e, n, t) {
        var r = n + "";
        return qi(e, ic(r, dc(nc(r), t)));
      }
      function ns(e) {
        var n = 0, t = 0;
        return function() {
          var r = Tl(), u = Ut - (r - t);
          if (t = r, u > 0) {
            if (++n >= Mt)
              return arguments[0];
          } else
            n = 0;
          return e.apply(i, arguments);
        };
      }
      function br(e, n) {
        var t = -1, r = e.length, u = r - 1;
        for (n = n === i ? r : n; ++t < n; ) {
          var o = Ii(t, u), l = e[o];
          e[o] = e[t], e[t] = l;
        }
        return e.length = n, e;
      }
      var ts = lc(function(e) {
        var n = [];
        return e.charCodeAt(0) === 46 && n.push(""), e.replace(to, function(t, r, u, o) {
          n.push(u ? o.replace(ao, "$1") : r || t);
        }), n;
      });
      function je(e) {
        if (typeof e == "string" || Ee(e))
          return e;
        var n = e + "";
        return n == "0" && 1 / e == -Je ? "-0" : n;
      }
      function Un(e) {
        if (e != null) {
          try {
            return jt.call(e);
          } catch {
          }
          try {
            return e + "";
          } catch {
          }
        }
        return "";
      }
      function dc(e, n) {
        return Fe(qt, function(t) {
          var r = "_." + t[0];
          n & t[1] && !Yt(e, r) && e.push(r);
        }), e.sort();
      }
      function rs(e) {
        if (e instanceof B)
          return e.clone();
        var n = new Ue(e.__wrapped__, e.__chain__);
        return n.__actions__ = me(e.__actions__), n.__index__ = e.__index__, n.__values__ = e.__values__, n;
      }
      function gc(e, n, t) {
        (t ? _e(e, n, t) : n === i) ? n = 1 : n = ue(T(n), 0);
        var r = e == null ? 0 : e.length;
        if (!r || n < 1)
          return [];
        for (var u = 0, o = 0, l = g(fr(r / n)); u < r; )
          l[o++] = Be(e, u, u += n);
        return l;
      }
      function _c(e) {
        for (var n = -1, t = e == null ? 0 : e.length, r = 0, u = []; ++n < t; ) {
          var o = e[n];
          o && (u[r++] = o);
        }
        return u;
      }
      function vc() {
        var e = arguments.length;
        if (!e)
          return [];
        for (var n = g(e - 1), t = arguments[0], r = e; r--; )
          n[r - 1] = arguments[r];
        return mn(L(t) ? me(t) : [t], le(n, 1));
      }
      var mc = M(function(e, n) {
        return ee(e) ? wt(e, le(n, 1, ee, !0)) : [];
      }), wc = M(function(e, n) {
        var t = Ne(n);
        return ee(t) && (t = i), ee(e) ? wt(e, le(n, 1, ee, !0), E(t, 2)) : [];
      }), xc = M(function(e, n) {
        var t = Ne(n);
        return ee(t) && (t = i), ee(e) ? wt(e, le(n, 1, ee, !0), i, t) : [];
      });
      function yc(e, n, t) {
        var r = e == null ? 0 : e.length;
        return r ? (n = t || n === i ? 1 : T(n), Be(e, n < 0 ? 0 : n, r)) : [];
      }
      function Ic(e, n, t) {
        var r = e == null ? 0 : e.length;
        return r ? (n = t || n === i ? 1 : T(n), n = r - n, Be(e, 0, n < 0 ? 0 : n)) : [];
      }
      function Cc(e, n) {
        return e && e.length ? _r(e, E(n, 3), !0, !0) : [];
      }
      function bc(e, n) {
        return e && e.length ? _r(e, E(n, 3), !0) : [];
      }
      function Rc(e, n, t, r) {
        var u = e == null ? 0 : e.length;
        return u ? (t && typeof t != "number" && _e(e, n, t) && (t = 0, r = u), va(e, n, t, r)) : [];
      }
      function is(e, n, t) {
        var r = e == null ? 0 : e.length;
        if (!r)
          return -1;
        var u = t == null ? 0 : T(t);
        return u < 0 && (u = ue(r + u, 0)), Xt(e, E(n, 3), u);
      }
      function us(e, n, t) {
        var r = e == null ? 0 : e.length;
        if (!r)
          return -1;
        var u = r - 1;
        return t !== i && (u = T(t), u = t < 0 ? ue(r + u, 0) : ce(u, r - 1)), Xt(e, E(n, 3), u, !0);
      }
      function fs(e) {
        var n = e == null ? 0 : e.length;
        return n ? le(e, 1) : [];
      }
      function Ec(e) {
        var n = e == null ? 0 : e.length;
        return n ? le(e, Je) : [];
      }
      function Sc(e, n) {
        var t = e == null ? 0 : e.length;
        return t ? (n = n === i ? 1 : T(n), le(e, n)) : [];
      }
      function Pc(e) {
        for (var n = -1, t = e == null ? 0 : e.length, r = {}; ++n < t; ) {
          var u = e[n];
          r[u[0]] = u[1];
        }
        return r;
      }
      function ss(e) {
        return e && e.length ? e[0] : i;
      }
      function Ac(e, n, t) {
        var r = e == null ? 0 : e.length;
        if (!r)
          return -1;
        var u = t == null ? 0 : T(t);
        return u < 0 && (u = ue(r + u, 0)), $n(e, n, u);
      }
      function Oc(e) {
        var n = e == null ? 0 : e.length;
        return n ? Be(e, 0, -1) : [];
      }
      var Lc = M(function(e) {
        var n = X(e, Si);
        return n.length && n[0] === e[0] ? vi(n) : [];
      }), Tc = M(function(e) {
        var n = Ne(e), t = X(e, Si);
        return n === Ne(t) ? n = i : t.pop(), t.length && t[0] === e[0] ? vi(t, E(n, 2)) : [];
      }), Fc = M(function(e) {
        var n = Ne(e), t = X(e, Si);
        return n = typeof n == "function" ? n : i, n && t.pop(), t.length && t[0] === e[0] ? vi(t, i, n) : [];
      });
      function Mc(e, n) {
        return e == null ? "" : Ol.call(e, n);
      }
      function Ne(e) {
        var n = e == null ? 0 : e.length;
        return n ? e[n - 1] : i;
      }
      function Uc(e, n, t) {
        var r = e == null ? 0 : e.length;
        if (!r)
          return -1;
        var u = r;
        return t !== i && (u = T(t), u = u < 0 ? ue(r + u, 0) : ce(u, r - 1)), n === n ? dl(e, n, u) : Xt(e, qu, u, !0);
      }
      function Wc(e, n) {
        return e && e.length ? mf(e, T(n)) : i;
      }
      var Bc = M(os);
      function os(e, n) {
        return e && e.length && n && n.length ? yi(e, n) : e;
      }
      function Nc(e, n, t) {
        return e && e.length && n && n.length ? yi(e, n, E(t, 2)) : e;
      }
      function Dc(e, n, t) {
        return e && e.length && n && n.length ? yi(e, n, i, t) : e;
      }
      var qc = on(function(e, n) {
        var t = e == null ? 0 : e.length, r = pi(e, n);
        return yf(e, X(n, function(u) {
          return ln(u, t) ? +u : u;
        }).sort(Lf)), r;
      });
      function Gc(e, n) {
        var t = [];
        if (!(e && e.length))
          return t;
        var r = -1, u = [], o = e.length;
        for (n = E(n, 3); ++r < o; ) {
          var l = e[r];
          n(l, r, e) && (t.push(l), u.push(r));
        }
        return yf(e, u), t;
      }
      function Gi(e) {
        return e == null ? e : Ml.call(e);
      }
      function $c(e, n, t) {
        var r = e == null ? 0 : e.length;
        return r ? (t && typeof t != "number" && _e(e, n, t) ? (n = 0, t = r) : (n = n == null ? 0 : T(n), t = t === i ? r : T(t)), Be(e, n, t)) : [];
      }
      function zc(e, n) {
        return gr(e, n);
      }
      function Hc(e, n, t) {
        return bi(e, n, E(t, 2));
      }
      function Vc(e, n) {
        var t = e == null ? 0 : e.length;
        if (t) {
          var r = gr(e, n);
          if (r < t && Ke(e[r], n))
            return r;
        }
        return -1;
      }
      function Kc(e, n) {
        return gr(e, n, !0);
      }
      function Zc(e, n, t) {
        return bi(e, n, E(t, 2), !0);
      }
      function Yc(e, n) {
        var t = e == null ? 0 : e.length;
        if (t) {
          var r = gr(e, n, !0) - 1;
          if (Ke(e[r], n))
            return r;
        }
        return -1;
      }
      function Xc(e) {
        return e && e.length ? Cf(e) : [];
      }
      function Jc(e, n) {
        return e && e.length ? Cf(e, E(n, 2)) : [];
      }
      function Qc(e) {
        var n = e == null ? 0 : e.length;
        return n ? Be(e, 1, n) : [];
      }
      function kc(e, n, t) {
        return e && e.length ? (n = t || n === i ? 1 : T(n), Be(e, 0, n < 0 ? 0 : n)) : [];
      }
      function jc(e, n, t) {
        var r = e == null ? 0 : e.length;
        return r ? (n = t || n === i ? 1 : T(n), n = r - n, Be(e, n < 0 ? 0 : n, r)) : [];
      }
      function eh(e, n) {
        return e && e.length ? _r(e, E(n, 3), !1, !0) : [];
      }
      function nh(e, n) {
        return e && e.length ? _r(e, E(n, 3)) : [];
      }
      var th = M(function(e) {
        return In(le(e, 1, ee, !0));
      }), rh = M(function(e) {
        var n = Ne(e);
        return ee(n) && (n = i), In(le(e, 1, ee, !0), E(n, 2));
      }), ih = M(function(e) {
        var n = Ne(e);
        return n = typeof n == "function" ? n : i, In(le(e, 1, ee, !0), i, n);
      });
      function uh(e) {
        return e && e.length ? In(e) : [];
      }
      function fh(e, n) {
        return e && e.length ? In(e, E(n, 2)) : [];
      }
      function sh(e, n) {
        return n = typeof n == "function" ? n : i, e && e.length ? In(e, i, n) : [];
      }
      function $i(e) {
        if (!(e && e.length))
          return [];
        var n = 0;
        return e = vn(e, function(t) {
          if (ee(t))
            return n = ue(t.length, n), !0;
        }), ui(n, function(t) {
          return X(e, ti(t));
        });
      }
      function ls(e, n) {
        if (!(e && e.length))
          return [];
        var t = $i(e);
        return n == null ? t : X(t, function(r) {
          return Ce(n, i, r);
        });
      }
      var oh = M(function(e, n) {
        return ee(e) ? wt(e, n) : [];
      }), lh = M(function(e) {
        return Ei(vn(e, ee));
      }), ah = M(function(e) {
        var n = Ne(e);
        return ee(n) && (n = i), Ei(vn(e, ee), E(n, 2));
      }), ch = M(function(e) {
        var n = Ne(e);
        return n = typeof n == "function" ? n : i, Ei(vn(e, ee), i, n);
      }), hh = M($i);
      function ph(e, n) {
        return Sf(e || [], n || [], mt);
      }
      function dh(e, n) {
        return Sf(e || [], n || [], It);
      }
      var gh = M(function(e) {
        var n = e.length, t = n > 1 ? e[n - 1] : i;
        return t = typeof t == "function" ? (e.pop(), t) : i, ls(e, t);
      });
      function as(e) {
        var n = s(e);
        return n.__chain__ = !0, n;
      }
      function _h(e, n) {
        return n(e), e;
      }
      function Rr(e, n) {
        return n(e);
      }
      var vh = on(function(e) {
        var n = e.length, t = n ? e[0] : 0, r = this.__wrapped__, u = function(o) {
          return pi(o, e);
        };
        return n > 1 || this.__actions__.length || !(r instanceof B) || !ln(t) ? this.thru(u) : (r = r.slice(t, +t + (n ? 1 : 0)), r.__actions__.push({
          func: Rr,
          args: [u],
          thisArg: i
        }), new Ue(r, this.__chain__).thru(function(o) {
          return n && !o.length && o.push(i), o;
        }));
      });
      function mh() {
        return as(this);
      }
      function wh() {
        return new Ue(this.value(), this.__chain__);
      }
      function xh() {
        this.__values__ === i && (this.__values__ = bs(this.value()));
        var e = this.__index__ >= this.__values__.length, n = e ? i : this.__values__[this.__index__++];
        return { done: e, value: n };
      }
      function yh() {
        return this;
      }
      function Ih(e) {
        for (var n, t = this; t instanceof ar; ) {
          var r = rs(t);
          r.__index__ = 0, r.__values__ = i, n ? u.__wrapped__ = r : n = r;
          var u = r;
          t = t.__wrapped__;
        }
        return u.__wrapped__ = e, n;
      }
      function Ch() {
        var e = this.__wrapped__;
        if (e instanceof B) {
          var n = e;
          return this.__actions__.length && (n = new B(this)), n = n.reverse(), n.__actions__.push({
            func: Rr,
            args: [Gi],
            thisArg: i
          }), new Ue(n, this.__chain__);
        }
        return this.thru(Gi);
      }
      function bh() {
        return Ef(this.__wrapped__, this.__actions__);
      }
      var Rh = vr(function(e, n, t) {
        H.call(e, t) ? ++e[t] : fn(e, t, 1);
      });
      function Eh(e, n, t) {
        var r = L(e) ? Nu : _a;
        return t && _e(e, n, t) && (n = i), r(e, E(n, 3));
      }
      function Sh(e, n) {
        var t = L(e) ? vn : lf;
        return t(e, E(n, 3));
      }
      var Ph = Bf(is), Ah = Bf(us);
      function Oh(e, n) {
        return le(Er(e, n), 1);
      }
      function Lh(e, n) {
        return le(Er(e, n), Je);
      }
      function Th(e, n, t) {
        return t = t === i ? 1 : T(t), le(Er(e, n), t);
      }
      function cs(e, n) {
        var t = L(e) ? Fe : yn;
        return t(e, E(n, 3));
      }
      function hs(e, n) {
        var t = L(e) ? Qo : of;
        return t(e, E(n, 3));
      }
      var Fh = vr(function(e, n, t) {
        H.call(e, t) ? e[t].push(n) : fn(e, t, [n]);
      });
      function Mh(e, n, t, r) {
        e = we(e) ? e : et(e), t = t && !r ? T(t) : 0;
        var u = e.length;
        return t < 0 && (t = ue(u + t, 0)), Lr(e) ? t <= u && e.indexOf(n, t) > -1 : !!u && $n(e, n, t) > -1;
      }
      var Uh = M(function(e, n, t) {
        var r = -1, u = typeof n == "function", o = we(e) ? g(e.length) : [];
        return yn(e, function(l) {
          o[++r] = u ? Ce(n, l, t) : xt(l, n, t);
        }), o;
      }), Wh = vr(function(e, n, t) {
        fn(e, t, n);
      });
      function Er(e, n) {
        var t = L(e) ? X : gf;
        return t(e, E(n, 3));
      }
      function Bh(e, n, t, r) {
        return e == null ? [] : (L(n) || (n = n == null ? [] : [n]), t = r ? i : t, L(t) || (t = t == null ? [] : [t]), wf(e, n, t));
      }
      var Nh = vr(function(e, n, t) {
        e[t ? 0 : 1].push(n);
      }, function() {
        return [[], []];
      });
      function Dh(e, n, t) {
        var r = L(e) ? ei : $u, u = arguments.length < 3;
        return r(e, E(n, 4), t, u, yn);
      }
      function qh(e, n, t) {
        var r = L(e) ? ko : $u, u = arguments.length < 3;
        return r(e, E(n, 4), t, u, of);
      }
      function Gh(e, n) {
        var t = L(e) ? vn : lf;
        return t(e, Ar(E(n, 3)));
      }
      function $h(e) {
        var n = L(e) ? rf : Ma;
        return n(e);
      }
      function zh(e, n, t) {
        (t ? _e(e, n, t) : n === i) ? n = 1 : n = T(n);
        var r = L(e) ? ca : Ua;
        return r(e, n);
      }
      function Hh(e) {
        var n = L(e) ? ha : Ba;
        return n(e);
      }
      function Vh(e) {
        if (e == null)
          return 0;
        if (we(e))
          return Lr(e) ? Hn(e) : e.length;
        var n = he(e);
        return n == $e || n == ze ? e.size : wi(e).length;
      }
      function Kh(e, n, t) {
        var r = L(e) ? ni : Na;
        return t && _e(e, n, t) && (n = i), r(e, E(n, 3));
      }
      var Zh = M(function(e, n) {
        if (e == null)
          return [];
        var t = n.length;
        return t > 1 && _e(e, n[0], n[1]) ? n = [] : t > 2 && _e(n[0], n[1], n[2]) && (n = [n[0]]), wf(e, le(n, 1), []);
      }), Sr = Sl || function() {
        return oe.Date.now();
      };
      function Yh(e, n) {
        if (typeof n != "function")
          throw new Me(b);
        return e = T(e), function() {
          if (--e < 1)
            return n.apply(this, arguments);
        };
      }
      function ps(e, n, t) {
        return n = t ? i : n, n = e && n == null ? e.length : n, sn(e, Le, i, i, i, i, n);
      }
      function ds(e, n) {
        var t;
        if (typeof n != "function")
          throw new Me(b);
        return e = T(e), function() {
          return --e > 0 && (t = n.apply(this, arguments)), e <= 1 && (n = i), t;
        };
      }
      var zi = M(function(e, n, t) {
        var r = j;
        if (t.length) {
          var u = wn(t, kn(zi));
          r |= Oe;
        }
        return sn(e, r, n, t, u);
      }), gs = M(function(e, n, t) {
        var r = j | en;
        if (t.length) {
          var u = wn(t, kn(gs));
          r |= Oe;
        }
        return sn(n, r, e, t, u);
      });
      function _s(e, n, t) {
        n = t ? i : n;
        var r = sn(e, Ae, i, i, i, i, i, n);
        return r.placeholder = _s.placeholder, r;
      }
      function vs(e, n, t) {
        n = t ? i : n;
        var r = sn(e, gn, i, i, i, i, i, n);
        return r.placeholder = vs.placeholder, r;
      }
      function ms(e, n, t) {
        var r, u, o, l, a, h, v = 0, m = !1, x = !1, y = !0;
        if (typeof e != "function")
          throw new Me(b);
        n = De(n) || 0, J(t) && (m = !!t.leading, x = "maxWait" in t, o = x ? ue(De(t.maxWait) || 0, n) : o, y = "trailing" in t ? !!t.trailing : y);
        function C(ne) {
          var Ze = r, hn = u;
          return r = u = i, v = ne, l = e.apply(hn, Ze), l;
        }
        function S(ne) {
          return v = ne, a = Rt(U, n), m ? C(ne) : l;
        }
        function F(ne) {
          var Ze = ne - h, hn = ne - v, Bs = n - Ze;
          return x ? ce(Bs, o - hn) : Bs;
        }
        function P(ne) {
          var Ze = ne - h, hn = ne - v;
          return h === i || Ze >= n || Ze < 0 || x && hn >= o;
        }
        function U() {
          var ne = Sr();
          if (P(ne))
            return N(ne);
          a = Rt(U, F(ne));
        }
        function N(ne) {
          return a = i, y && r ? C(ne) : (r = u = i, l);
        }
        function Se() {
          a !== i && Pf(a), v = 0, r = h = u = a = i;
        }
        function ve() {
          return a === i ? l : N(Sr());
        }
        function Pe() {
          var ne = Sr(), Ze = P(ne);
          if (r = arguments, u = this, h = ne, Ze) {
            if (a === i)
              return S(h);
            if (x)
              return Pf(a), a = Rt(U, n), C(h);
          }
          return a === i && (a = Rt(U, n)), l;
        }
        return Pe.cancel = Se, Pe.flush = ve, Pe;
      }
      var Xh = M(function(e, n) {
        return sf(e, 1, n);
      }), Jh = M(function(e, n, t) {
        return sf(e, De(n) || 0, t);
      });
      function Qh(e) {
        return sn(e, Nn);
      }
      function Pr(e, n) {
        if (typeof e != "function" || n != null && typeof n != "function")
          throw new Me(b);
        var t = function() {
          var r = arguments, u = n ? n.apply(this, r) : r[0], o = t.cache;
          if (o.has(u))
            return o.get(u);
          var l = e.apply(this, r);
          return t.cache = o.set(u, l) || o, l;
        };
        return t.cache = new (Pr.Cache || un)(), t;
      }
      Pr.Cache = un;
      function Ar(e) {
        if (typeof e != "function")
          throw new Me(b);
        return function() {
          var n = arguments;
          switch (n.length) {
            case 0:
              return !e.call(this);
            case 1:
              return !e.call(this, n[0]);
            case 2:
              return !e.call(this, n[0], n[1]);
            case 3:
              return !e.call(this, n[0], n[1], n[2]);
          }
          return !e.apply(this, n);
        };
      }
      function kh(e) {
        return ds(2, e);
      }
      var jh = Da(function(e, n) {
        n = n.length == 1 && L(n[0]) ? X(n[0], be(E())) : X(le(n, 1), be(E()));
        var t = n.length;
        return M(function(r) {
          for (var u = -1, o = ce(r.length, t); ++u < o; )
            r[u] = n[u].call(this, r[u]);
          return Ce(e, this, r);
        });
      }), Hi = M(function(e, n) {
        var t = wn(n, kn(Hi));
        return sn(e, Oe, i, n, t);
      }), ws = M(function(e, n) {
        var t = wn(n, kn(ws));
        return sn(e, nn, i, n, t);
      }), ep = on(function(e, n) {
        return sn(e, _n, i, i, i, n);
      });
      function np(e, n) {
        if (typeof e != "function")
          throw new Me(b);
        return n = n === i ? n : T(n), M(e, n);
      }
      function tp(e, n) {
        if (typeof e != "function")
          throw new Me(b);
        return n = n == null ? 0 : ue(T(n), 0), M(function(t) {
          var r = t[n], u = bn(t, 0, n);
          return r && mn(u, r), Ce(e, this, u);
        });
      }
      function rp(e, n, t) {
        var r = !0, u = !0;
        if (typeof e != "function")
          throw new Me(b);
        return J(t) && (r = "leading" in t ? !!t.leading : r, u = "trailing" in t ? !!t.trailing : u), ms(e, n, {
          leading: r,
          maxWait: n,
          trailing: u
        });
      }
      function ip(e) {
        return ps(e, 1);
      }
      function up(e, n) {
        return Hi(Pi(n), e);
      }
      function fp() {
        if (!arguments.length)
          return [];
        var e = arguments[0];
        return L(e) ? e : [e];
      }
      function sp(e) {
        return We(e, de);
      }
      function op(e, n) {
        return n = typeof n == "function" ? n : i, We(e, de, n);
      }
      function lp(e) {
        return We(e, pe | de);
      }
      function ap(e, n) {
        return n = typeof n == "function" ? n : i, We(e, pe | de, n);
      }
      function cp(e, n) {
        return n == null || ff(e, n, se(n));
      }
      function Ke(e, n) {
        return e === n || e !== e && n !== n;
      }
      var hp = yr(_i), pp = yr(function(e, n) {
        return e >= n;
      }), Wn = hf(/* @__PURE__ */ function() {
        return arguments;
      }()) ? hf : function(e) {
        return k(e) && H.call(e, "callee") && !Qu.call(e, "callee");
      }, L = g.isArray, dp = Tu ? be(Tu) : Ia;
      function we(e) {
        return e != null && Or(e.length) && !an(e);
      }
      function ee(e) {
        return k(e) && we(e);
      }
      function gp(e) {
        return e === !0 || e === !1 || k(e) && ge(e) == ut;
      }
      var Rn = Al || nu, _p = Fu ? be(Fu) : Ca;
      function vp(e) {
        return k(e) && e.nodeType === 1 && !Et(e);
      }
      function mp(e) {
        if (e == null)
          return !0;
        if (we(e) && (L(e) || typeof e == "string" || typeof e.splice == "function" || Rn(e) || jn(e) || Wn(e)))
          return !e.length;
        var n = he(e);
        if (n == $e || n == ze)
          return !e.size;
        if (bt(e))
          return !wi(e).length;
        for (var t in e)
          if (H.call(e, t))
            return !1;
        return !0;
      }
      function wp(e, n) {
        return yt(e, n);
      }
      function xp(e, n, t) {
        t = typeof t == "function" ? t : i;
        var r = t ? t(e, n) : i;
        return r === i ? yt(e, n, i, t) : !!r;
      }
      function Vi(e) {
        if (!k(e))
          return !1;
        var n = ge(e);
        return n == $t || n == $s || typeof e.message == "string" && typeof e.name == "string" && !Et(e);
      }
      function yp(e) {
        return typeof e == "number" && ju(e);
      }
      function an(e) {
        if (!J(e))
          return !1;
        var n = ge(e);
        return n == zt || n == fu || n == Gs || n == Hs;
      }
      function xs(e) {
        return typeof e == "number" && e == T(e);
      }
      function Or(e) {
        return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Ge;
      }
      function J(e) {
        var n = typeof e;
        return e != null && (n == "object" || n == "function");
      }
      function k(e) {
        return e != null && typeof e == "object";
      }
      var ys = Mu ? be(Mu) : Ra;
      function Ip(e, n) {
        return e === n || mi(e, n, Ui(n));
      }
      function Cp(e, n, t) {
        return t = typeof t == "function" ? t : i, mi(e, n, Ui(n), t);
      }
      function bp(e) {
        return Is(e) && e != +e;
      }
      function Rp(e) {
        if (oc(e))
          throw new O(R);
        return pf(e);
      }
      function Ep(e) {
        return e === null;
      }
      function Sp(e) {
        return e == null;
      }
      function Is(e) {
        return typeof e == "number" || k(e) && ge(e) == st;
      }
      function Et(e) {
        if (!k(e) || ge(e) != tn)
          return !1;
        var n = rr(e);
        if (n === null)
          return !0;
        var t = H.call(n, "constructor") && n.constructor;
        return typeof t == "function" && t instanceof t && jt.call(t) == Cl;
      }
      var Ki = Uu ? be(Uu) : Ea;
      function Pp(e) {
        return xs(e) && e >= -Ge && e <= Ge;
      }
      var Cs = Wu ? be(Wu) : Sa;
      function Lr(e) {
        return typeof e == "string" || !L(e) && k(e) && ge(e) == lt;
      }
      function Ee(e) {
        return typeof e == "symbol" || k(e) && ge(e) == Ht;
      }
      var jn = Bu ? be(Bu) : Pa;
      function Ap(e) {
        return e === i;
      }
      function Op(e) {
        return k(e) && he(e) == at;
      }
      function Lp(e) {
        return k(e) && ge(e) == Ks;
      }
      var Tp = yr(xi), Fp = yr(function(e, n) {
        return e <= n;
      });
      function bs(e) {
        if (!e)
          return [];
        if (we(e))
          return Lr(e) ? He(e) : me(e);
        if (pt && e[pt])
          return cl(e[pt]());
        var n = he(e), t = n == $e ? si : n == ze ? Jt : et;
        return t(e);
      }
      function cn(e) {
        if (!e)
          return e === 0 ? e : 0;
        if (e = De(e), e === Je || e === -Je) {
          var n = e < 0 ? -1 : 1;
          return n * Nt;
        }
        return e === e ? e : 0;
      }
      function T(e) {
        var n = cn(e), t = n % 1;
        return n === n ? t ? n - t : n : 0;
      }
      function Rs(e) {
        return e ? Tn(T(e), 0, Ie) : 0;
      }
      function De(e) {
        if (typeof e == "number")
          return e;
        if (Ee(e))
          return En;
        if (J(e)) {
          var n = typeof e.valueOf == "function" ? e.valueOf() : e;
          e = J(n) ? n + "" : n;
        }
        if (typeof e != "string")
          return e === 0 ? e : +e;
        e = zu(e);
        var t = po.test(e);
        return t || _o.test(e) ? Yo(e.slice(2), t ? 2 : 8) : ho.test(e) ? En : +e;
      }
      function Es(e) {
        return ke(e, xe(e));
      }
      function Mp(e) {
        return e ? Tn(T(e), -Ge, Ge) : e === 0 ? e : 0;
      }
      function $(e) {
        return e == null ? "" : Re(e);
      }
      var Up = Jn(function(e, n) {
        if (bt(n) || we(n)) {
          ke(n, se(n), e);
          return;
        }
        for (var t in n)
          H.call(n, t) && mt(e, t, n[t]);
      }), Ss = Jn(function(e, n) {
        ke(n, xe(n), e);
      }), Tr = Jn(function(e, n, t, r) {
        ke(n, xe(n), e, r);
      }), Wp = Jn(function(e, n, t, r) {
        ke(n, se(n), e, r);
      }), Bp = on(pi);
      function Np(e, n) {
        var t = Xn(e);
        return n == null ? t : uf(t, n);
      }
      var Dp = M(function(e, n) {
        e = K(e);
        var t = -1, r = n.length, u = r > 2 ? n[2] : i;
        for (u && _e(n[0], n[1], u) && (r = 1); ++t < r; )
          for (var o = n[t], l = xe(o), a = -1, h = l.length; ++a < h; ) {
            var v = l[a], m = e[v];
            (m === i || Ke(m, Kn[v]) && !H.call(e, v)) && (e[v] = o[v]);
          }
        return e;
      }), qp = M(function(e) {
        return e.push(i, Hf), Ce(Ps, i, e);
      });
      function Gp(e, n) {
        return Du(e, E(n, 3), Qe);
      }
      function $p(e, n) {
        return Du(e, E(n, 3), gi);
      }
      function zp(e, n) {
        return e == null ? e : di(e, E(n, 3), xe);
      }
      function Hp(e, n) {
        return e == null ? e : af(e, E(n, 3), xe);
      }
      function Vp(e, n) {
        return e && Qe(e, E(n, 3));
      }
      function Kp(e, n) {
        return e && gi(e, E(n, 3));
      }
      function Zp(e) {
        return e == null ? [] : pr(e, se(e));
      }
      function Yp(e) {
        return e == null ? [] : pr(e, xe(e));
      }
      function Zi(e, n, t) {
        var r = e == null ? i : Fn(e, n);
        return r === i ? t : r;
      }
      function Xp(e, n) {
        return e != null && Zf(e, n, ma);
      }
      function Yi(e, n) {
        return e != null && Zf(e, n, wa);
      }
      var Jp = Df(function(e, n, t) {
        n != null && typeof n.toString != "function" && (n = er.call(n)), e[n] = t;
      }, Ji(ye)), Qp = Df(function(e, n, t) {
        n != null && typeof n.toString != "function" && (n = er.call(n)), H.call(e, n) ? e[n].push(t) : e[n] = [t];
      }, E), kp = M(xt);
      function se(e) {
        return we(e) ? tf(e) : wi(e);
      }
      function xe(e) {
        return we(e) ? tf(e, !0) : Aa(e);
      }
      function jp(e, n) {
        var t = {};
        return n = E(n, 3), Qe(e, function(r, u, o) {
          fn(t, n(r, u, o), r);
        }), t;
      }
      function ed(e, n) {
        var t = {};
        return n = E(n, 3), Qe(e, function(r, u, o) {
          fn(t, u, n(r, u, o));
        }), t;
      }
      var nd = Jn(function(e, n, t) {
        dr(e, n, t);
      }), Ps = Jn(function(e, n, t, r) {
        dr(e, n, t, r);
      }), td = on(function(e, n) {
        var t = {};
        if (e == null)
          return t;
        var r = !1;
        n = X(n, function(o) {
          return o = Cn(o, e), r || (r = o.length > 1), o;
        }), ke(e, Fi(e), t), r && (t = We(t, pe | Xe | de, Ja));
        for (var u = n.length; u--; )
          Ri(t, n[u]);
        return t;
      });
      function rd(e, n) {
        return As(e, Ar(E(n)));
      }
      var id = on(function(e, n) {
        return e == null ? {} : La(e, n);
      });
      function As(e, n) {
        if (e == null)
          return {};
        var t = X(Fi(e), function(r) {
          return [r];
        });
        return n = E(n), xf(e, t, function(r, u) {
          return n(r, u[0]);
        });
      }
      function ud(e, n, t) {
        n = Cn(n, e);
        var r = -1, u = n.length;
        for (u || (u = 1, e = i); ++r < u; ) {
          var o = e == null ? i : e[je(n[r])];
          o === i && (r = u, o = t), e = an(o) ? o.call(e) : o;
        }
        return e;
      }
      function fd(e, n, t) {
        return e == null ? e : It(e, n, t);
      }
      function sd(e, n, t, r) {
        return r = typeof r == "function" ? r : i, e == null ? e : It(e, n, t, r);
      }
      var Os = $f(se), Ls = $f(xe);
      function od(e, n, t) {
        var r = L(e), u = r || Rn(e) || jn(e);
        if (n = E(n, 4), t == null) {
          var o = e && e.constructor;
          u ? t = r ? new o() : [] : J(e) ? t = an(o) ? Xn(rr(e)) : {} : t = {};
        }
        return (u ? Fe : Qe)(e, function(l, a, h) {
          return n(t, l, a, h);
        }), t;
      }
      function ld(e, n) {
        return e == null ? !0 : Ri(e, n);
      }
      function ad(e, n, t) {
        return e == null ? e : Rf(e, n, Pi(t));
      }
      function cd(e, n, t, r) {
        return r = typeof r == "function" ? r : i, e == null ? e : Rf(e, n, Pi(t), r);
      }
      function et(e) {
        return e == null ? [] : fi(e, se(e));
      }
      function hd(e) {
        return e == null ? [] : fi(e, xe(e));
      }
      function pd(e, n, t) {
        return t === i && (t = n, n = i), t !== i && (t = De(t), t = t === t ? t : 0), n !== i && (n = De(n), n = n === n ? n : 0), Tn(De(e), n, t);
      }
      function dd(e, n, t) {
        return n = cn(n), t === i ? (t = n, n = 0) : t = cn(t), e = De(e), xa(e, n, t);
      }
      function gd(e, n, t) {
        if (t && typeof t != "boolean" && _e(e, n, t) && (n = t = i), t === i && (typeof n == "boolean" ? (t = n, n = i) : typeof e == "boolean" && (t = e, e = i)), e === i && n === i ? (e = 0, n = 1) : (e = cn(e), n === i ? (n = e, e = 0) : n = cn(n)), e > n) {
          var r = e;
          e = n, n = r;
        }
        if (t || e % 1 || n % 1) {
          var u = ef();
          return ce(e + u * (n - e + Zo("1e-" + ((u + "").length - 1))), n);
        }
        return Ii(e, n);
      }
      var _d = Qn(function(e, n, t) {
        return n = n.toLowerCase(), e + (t ? Ts(n) : n);
      });
      function Ts(e) {
        return Xi($(e).toLowerCase());
      }
      function Fs(e) {
        return e = $(e), e && e.replace(mo, fl).replace(Bo, "");
      }
      function vd(e, n, t) {
        e = $(e), n = Re(n);
        var r = e.length;
        t = t === i ? r : Tn(T(t), 0, r);
        var u = t;
        return t -= n.length, t >= 0 && e.slice(t, u) == n;
      }
      function md(e) {
        return e = $(e), e && Qs.test(e) ? e.replace(lu, sl) : e;
      }
      function wd(e) {
        return e = $(e), e && ro.test(e) ? e.replace(Hr, "\\$&") : e;
      }
      var xd = Qn(function(e, n, t) {
        return e + (t ? "-" : "") + n.toLowerCase();
      }), yd = Qn(function(e, n, t) {
        return e + (t ? " " : "") + n.toLowerCase();
      }), Id = Wf("toLowerCase");
      function Cd(e, n, t) {
        e = $(e), n = T(n);
        var r = n ? Hn(e) : 0;
        if (!n || r >= n)
          return e;
        var u = (n - r) / 2;
        return xr(sr(u), t) + e + xr(fr(u), t);
      }
      function bd(e, n, t) {
        e = $(e), n = T(n);
        var r = n ? Hn(e) : 0;
        return n && r < n ? e + xr(n - r, t) : e;
      }
      function Rd(e, n, t) {
        e = $(e), n = T(n);
        var r = n ? Hn(e) : 0;
        return n && r < n ? xr(n - r, t) + e : e;
      }
      function Ed(e, n, t) {
        return t || n == null ? n = 0 : n && (n = +n), Fl($(e).replace(Vr, ""), n || 0);
      }
      function Sd(e, n, t) {
        return (t ? _e(e, n, t) : n === i) ? n = 1 : n = T(n), Ci($(e), n);
      }
      function Pd() {
        var e = arguments, n = $(e[0]);
        return e.length < 3 ? n : n.replace(e[1], e[2]);
      }
      var Ad = Qn(function(e, n, t) {
        return e + (t ? "_" : "") + n.toLowerCase();
      });
      function Od(e, n, t) {
        return t && typeof t != "number" && _e(e, n, t) && (n = t = i), t = t === i ? Ie : t >>> 0, t ? (e = $(e), e && (typeof n == "string" || n != null && !Ki(n)) && (n = Re(n), !n && zn(e)) ? bn(He(e), 0, t) : e.split(n, t)) : [];
      }
      var Ld = Qn(function(e, n, t) {
        return e + (t ? " " : "") + Xi(n);
      });
      function Td(e, n, t) {
        return e = $(e), t = t == null ? 0 : Tn(T(t), 0, e.length), n = Re(n), e.slice(t, t + n.length) == n;
      }
      function Fd(e, n, t) {
        var r = s.templateSettings;
        t && _e(e, n, t) && (n = i), e = $(e), n = Tr({}, n, r, zf);
        var u = Tr({}, n.imports, r.imports, zf), o = se(u), l = fi(u, o), a, h, v = 0, m = n.interpolate || Vt, x = "__p += '", y = oi(
          (n.escape || Vt).source + "|" + m.source + "|" + (m === au ? co : Vt).source + "|" + (n.evaluate || Vt).source + "|$",
          "g"
        ), C = "//# sourceURL=" + (H.call(n, "sourceURL") ? (n.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++$o + "]") + `
`;
        e.replace(y, function(P, U, N, Se, ve, Pe) {
          return N || (N = Se), x += e.slice(v, Pe).replace(wo, ol), U && (a = !0, x += `' +
__e(` + U + `) +
'`), ve && (h = !0, x += `';
` + ve + `;
__p += '`), N && (x += `' +
((__t = (` + N + `)) == null ? '' : __t) +
'`), v = Pe + P.length, P;
        }), x += `';
`;
        var S = H.call(n, "variable") && n.variable;
        if (!S)
          x = `with (obj) {
` + x + `
}
`;
        else if (lo.test(S))
          throw new O(W);
        x = (h ? x.replace(Zs, "") : x).replace(Ys, "$1").replace(Xs, "$1;"), x = "function(" + (S || "obj") + `) {
` + (S ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (a ? ", __e = _.escape" : "") + (h ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + x + `return __p
}`;
        var F = Us(function() {
          return q(o, C + "return " + x).apply(i, l);
        });
        if (F.source = x, Vi(F))
          throw F;
        return F;
      }
      function Md(e) {
        return $(e).toLowerCase();
      }
      function Ud(e) {
        return $(e).toUpperCase();
      }
      function Wd(e, n, t) {
        if (e = $(e), e && (t || n === i))
          return zu(e);
        if (!e || !(n = Re(n)))
          return e;
        var r = He(e), u = He(n), o = Hu(r, u), l = Vu(r, u) + 1;
        return bn(r, o, l).join("");
      }
      function Bd(e, n, t) {
        if (e = $(e), e && (t || n === i))
          return e.slice(0, Zu(e) + 1);
        if (!e || !(n = Re(n)))
          return e;
        var r = He(e), u = Vu(r, He(n)) + 1;
        return bn(r, 0, u).join("");
      }
      function Nd(e, n, t) {
        if (e = $(e), e && (t || n === i))
          return e.replace(Vr, "");
        if (!e || !(n = Re(n)))
          return e;
        var r = He(e), u = Hu(r, He(n));
        return bn(r, u).join("");
      }
      function Dd(e, n) {
        var t = Tt, r = Ft;
        if (J(n)) {
          var u = "separator" in n ? n.separator : u;
          t = "length" in n ? T(n.length) : t, r = "omission" in n ? Re(n.omission) : r;
        }
        e = $(e);
        var o = e.length;
        if (zn(e)) {
          var l = He(e);
          o = l.length;
        }
        if (t >= o)
          return e;
        var a = t - Hn(r);
        if (a < 1)
          return r;
        var h = l ? bn(l, 0, a).join("") : e.slice(0, a);
        if (u === i)
          return h + r;
        if (l && (a += h.length - a), Ki(u)) {
          if (e.slice(a).search(u)) {
            var v, m = h;
            for (u.global || (u = oi(u.source, $(cu.exec(u)) + "g")), u.lastIndex = 0; v = u.exec(m); )
              var x = v.index;
            h = h.slice(0, x === i ? a : x);
          }
        } else if (e.indexOf(Re(u), a) != a) {
          var y = h.lastIndexOf(u);
          y > -1 && (h = h.slice(0, y));
        }
        return h + r;
      }
      function qd(e) {
        return e = $(e), e && Js.test(e) ? e.replace(ou, gl) : e;
      }
      var Gd = Qn(function(e, n, t) {
        return e + (t ? " " : "") + n.toUpperCase();
      }), Xi = Wf("toUpperCase");
      function Ms(e, n, t) {
        return e = $(e), n = t ? i : n, n === i ? al(e) ? ml(e) : nl(e) : e.match(n) || [];
      }
      var Us = M(function(e, n) {
        try {
          return Ce(e, i, n);
        } catch (t) {
          return Vi(t) ? t : new O(t);
        }
      }), $d = on(function(e, n) {
        return Fe(n, function(t) {
          t = je(t), fn(e, t, zi(e[t], e));
        }), e;
      });
      function zd(e) {
        var n = e == null ? 0 : e.length, t = E();
        return e = n ? X(e, function(r) {
          if (typeof r[1] != "function")
            throw new Me(b);
          return [t(r[0]), r[1]];
        }) : [], M(function(r) {
          for (var u = -1; ++u < n; ) {
            var o = e[u];
            if (Ce(o[0], this, r))
              return Ce(o[1], this, r);
          }
        });
      }
      function Hd(e) {
        return ga(We(e, pe));
      }
      function Ji(e) {
        return function() {
          return e;
        };
      }
      function Vd(e, n) {
        return e == null || e !== e ? n : e;
      }
      var Kd = Nf(), Zd = Nf(!0);
      function ye(e) {
        return e;
      }
      function Qi(e) {
        return df(typeof e == "function" ? e : We(e, pe));
      }
      function Yd(e) {
        return _f(We(e, pe));
      }
      function Xd(e, n) {
        return vf(e, We(n, pe));
      }
      var Jd = M(function(e, n) {
        return function(t) {
          return xt(t, e, n);
        };
      }), Qd = M(function(e, n) {
        return function(t) {
          return xt(e, t, n);
        };
      });
      function ki(e, n, t) {
        var r = se(n), u = pr(n, r);
        t == null && !(J(n) && (u.length || !r.length)) && (t = n, n = e, e = this, u = pr(n, se(n)));
        var o = !(J(t) && "chain" in t) || !!t.chain, l = an(e);
        return Fe(u, function(a) {
          var h = n[a];
          e[a] = h, l && (e.prototype[a] = function() {
            var v = this.__chain__;
            if (o || v) {
              var m = e(this.__wrapped__), x = m.__actions__ = me(this.__actions__);
              return x.push({ func: h, args: arguments, thisArg: e }), m.__chain__ = v, m;
            }
            return h.apply(e, mn([this.value()], arguments));
          });
        }), e;
      }
      function kd() {
        return oe._ === this && (oe._ = bl), this;
      }
      function ji() {
      }
      function jd(e) {
        return e = T(e), M(function(n) {
          return mf(n, e);
        });
      }
      var eg = Oi(X), ng = Oi(Nu), tg = Oi(ni);
      function Ws(e) {
        return Bi(e) ? ti(je(e)) : Ta(e);
      }
      function rg(e) {
        return function(n) {
          return e == null ? i : Fn(e, n);
        };
      }
      var ig = qf(), ug = qf(!0);
      function eu() {
        return [];
      }
      function nu() {
        return !1;
      }
      function fg() {
        return {};
      }
      function sg() {
        return "";
      }
      function og() {
        return !0;
      }
      function lg(e, n) {
        if (e = T(e), e < 1 || e > Ge)
          return [];
        var t = Ie, r = ce(e, Ie);
        n = E(n), e -= Ie;
        for (var u = ui(r, n); ++t < e; )
          n(t);
        return u;
      }
      function ag(e) {
        return L(e) ? X(e, je) : Ee(e) ? [e] : me(ts($(e)));
      }
      function cg(e) {
        var n = ++Il;
        return $(e) + n;
      }
      var hg = wr(function(e, n) {
        return e + n;
      }, 0), pg = Li("ceil"), dg = wr(function(e, n) {
        return e / n;
      }, 1), gg = Li("floor");
      function _g(e) {
        return e && e.length ? hr(e, ye, _i) : i;
      }
      function vg(e, n) {
        return e && e.length ? hr(e, E(n, 2), _i) : i;
      }
      function mg(e) {
        return Gu(e, ye);
      }
      function wg(e, n) {
        return Gu(e, E(n, 2));
      }
      function xg(e) {
        return e && e.length ? hr(e, ye, xi) : i;
      }
      function yg(e, n) {
        return e && e.length ? hr(e, E(n, 2), xi) : i;
      }
      var Ig = wr(function(e, n) {
        return e * n;
      }, 1), Cg = Li("round"), bg = wr(function(e, n) {
        return e - n;
      }, 0);
      function Rg(e) {
        return e && e.length ? ii(e, ye) : 0;
      }
      function Eg(e, n) {
        return e && e.length ? ii(e, E(n, 2)) : 0;
      }
      return s.after = Yh, s.ary = ps, s.assign = Up, s.assignIn = Ss, s.assignInWith = Tr, s.assignWith = Wp, s.at = Bp, s.before = ds, s.bind = zi, s.bindAll = $d, s.bindKey = gs, s.castArray = fp, s.chain = as, s.chunk = gc, s.compact = _c, s.concat = vc, s.cond = zd, s.conforms = Hd, s.constant = Ji, s.countBy = Rh, s.create = Np, s.curry = _s, s.curryRight = vs, s.debounce = ms, s.defaults = Dp, s.defaultsDeep = qp, s.defer = Xh, s.delay = Jh, s.difference = mc, s.differenceBy = wc, s.differenceWith = xc, s.drop = yc, s.dropRight = Ic, s.dropRightWhile = Cc, s.dropWhile = bc, s.fill = Rc, s.filter = Sh, s.flatMap = Oh, s.flatMapDeep = Lh, s.flatMapDepth = Th, s.flatten = fs, s.flattenDeep = Ec, s.flattenDepth = Sc, s.flip = Qh, s.flow = Kd, s.flowRight = Zd, s.fromPairs = Pc, s.functions = Zp, s.functionsIn = Yp, s.groupBy = Fh, s.initial = Oc, s.intersection = Lc, s.intersectionBy = Tc, s.intersectionWith = Fc, s.invert = Jp, s.invertBy = Qp, s.invokeMap = Uh, s.iteratee = Qi, s.keyBy = Wh, s.keys = se, s.keysIn = xe, s.map = Er, s.mapKeys = jp, s.mapValues = ed, s.matches = Yd, s.matchesProperty = Xd, s.memoize = Pr, s.merge = nd, s.mergeWith = Ps, s.method = Jd, s.methodOf = Qd, s.mixin = ki, s.negate = Ar, s.nthArg = jd, s.omit = td, s.omitBy = rd, s.once = kh, s.orderBy = Bh, s.over = eg, s.overArgs = jh, s.overEvery = ng, s.overSome = tg, s.partial = Hi, s.partialRight = ws, s.partition = Nh, s.pick = id, s.pickBy = As, s.property = Ws, s.propertyOf = rg, s.pull = Bc, s.pullAll = os, s.pullAllBy = Nc, s.pullAllWith = Dc, s.pullAt = qc, s.range = ig, s.rangeRight = ug, s.rearg = ep, s.reject = Gh, s.remove = Gc, s.rest = np, s.reverse = Gi, s.sampleSize = zh, s.set = fd, s.setWith = sd, s.shuffle = Hh, s.slice = $c, s.sortBy = Zh, s.sortedUniq = Xc, s.sortedUniqBy = Jc, s.split = Od, s.spread = tp, s.tail = Qc, s.take = kc, s.takeRight = jc, s.takeRightWhile = eh, s.takeWhile = nh, s.tap = _h, s.throttle = rp, s.thru = Rr, s.toArray = bs, s.toPairs = Os, s.toPairsIn = Ls, s.toPath = ag, s.toPlainObject = Es, s.transform = od, s.unary = ip, s.union = th, s.unionBy = rh, s.unionWith = ih, s.uniq = uh, s.uniqBy = fh, s.uniqWith = sh, s.unset = ld, s.unzip = $i, s.unzipWith = ls, s.update = ad, s.updateWith = cd, s.values = et, s.valuesIn = hd, s.without = oh, s.words = Ms, s.wrap = up, s.xor = lh, s.xorBy = ah, s.xorWith = ch, s.zip = hh, s.zipObject = ph, s.zipObjectDeep = dh, s.zipWith = gh, s.entries = Os, s.entriesIn = Ls, s.extend = Ss, s.extendWith = Tr, ki(s, s), s.add = hg, s.attempt = Us, s.camelCase = _d, s.capitalize = Ts, s.ceil = pg, s.clamp = pd, s.clone = sp, s.cloneDeep = lp, s.cloneDeepWith = ap, s.cloneWith = op, s.conformsTo = cp, s.deburr = Fs, s.defaultTo = Vd, s.divide = dg, s.endsWith = vd, s.eq = Ke, s.escape = md, s.escapeRegExp = wd, s.every = Eh, s.find = Ph, s.findIndex = is, s.findKey = Gp, s.findLast = Ah, s.findLastIndex = us, s.findLastKey = $p, s.floor = gg, s.forEach = cs, s.forEachRight = hs, s.forIn = zp, s.forInRight = Hp, s.forOwn = Vp, s.forOwnRight = Kp, s.get = Zi, s.gt = hp, s.gte = pp, s.has = Xp, s.hasIn = Yi, s.head = ss, s.identity = ye, s.includes = Mh, s.indexOf = Ac, s.inRange = dd, s.invoke = kp, s.isArguments = Wn, s.isArray = L, s.isArrayBuffer = dp, s.isArrayLike = we, s.isArrayLikeObject = ee, s.isBoolean = gp, s.isBuffer = Rn, s.isDate = _p, s.isElement = vp, s.isEmpty = mp, s.isEqual = wp, s.isEqualWith = xp, s.isError = Vi, s.isFinite = yp, s.isFunction = an, s.isInteger = xs, s.isLength = Or, s.isMap = ys, s.isMatch = Ip, s.isMatchWith = Cp, s.isNaN = bp, s.isNative = Rp, s.isNil = Sp, s.isNull = Ep, s.isNumber = Is, s.isObject = J, s.isObjectLike = k, s.isPlainObject = Et, s.isRegExp = Ki, s.isSafeInteger = Pp, s.isSet = Cs, s.isString = Lr, s.isSymbol = Ee, s.isTypedArray = jn, s.isUndefined = Ap, s.isWeakMap = Op, s.isWeakSet = Lp, s.join = Mc, s.kebabCase = xd, s.last = Ne, s.lastIndexOf = Uc, s.lowerCase = yd, s.lowerFirst = Id, s.lt = Tp, s.lte = Fp, s.max = _g, s.maxBy = vg, s.mean = mg, s.meanBy = wg, s.min = xg, s.minBy = yg, s.stubArray = eu, s.stubFalse = nu, s.stubObject = fg, s.stubString = sg, s.stubTrue = og, s.multiply = Ig, s.nth = Wc, s.noConflict = kd, s.noop = ji, s.now = Sr, s.pad = Cd, s.padEnd = bd, s.padStart = Rd, s.parseInt = Ed, s.random = gd, s.reduce = Dh, s.reduceRight = qh, s.repeat = Sd, s.replace = Pd, s.result = ud, s.round = Cg, s.runInContext = c, s.sample = $h, s.size = Vh, s.snakeCase = Ad, s.some = Kh, s.sortedIndex = zc, s.sortedIndexBy = Hc, s.sortedIndexOf = Vc, s.sortedLastIndex = Kc, s.sortedLastIndexBy = Zc, s.sortedLastIndexOf = Yc, s.startCase = Ld, s.startsWith = Td, s.subtract = bg, s.sum = Rg, s.sumBy = Eg, s.template = Fd, s.times = lg, s.toFinite = cn, s.toInteger = T, s.toLength = Rs, s.toLower = Md, s.toNumber = De, s.toSafeInteger = Mp, s.toString = $, s.toUpper = Ud, s.trim = Wd, s.trimEnd = Bd, s.trimStart = Nd, s.truncate = Dd, s.unescape = qd, s.uniqueId = cg, s.upperCase = Gd, s.upperFirst = Xi, s.each = cs, s.eachRight = hs, s.first = ss, ki(s, function() {
        var e = {};
        return Qe(s, function(n, t) {
          H.call(s.prototype, t) || (e[t] = n);
        }), e;
      }(), { chain: !1 }), s.VERSION = p, Fe(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(e) {
        s[e].placeholder = s;
      }), Fe(["drop", "take"], function(e, n) {
        B.prototype[e] = function(t) {
          t = t === i ? 1 : ue(T(t), 0);
          var r = this.__filtered__ && !n ? new B(this) : this.clone();
          return r.__filtered__ ? r.__takeCount__ = ce(t, r.__takeCount__) : r.__views__.push({
            size: ce(t, Ie),
            type: e + (r.__dir__ < 0 ? "Right" : "")
          }), r;
        }, B.prototype[e + "Right"] = function(t) {
          return this.reverse()[e](t).reverse();
        };
      }), Fe(["filter", "map", "takeWhile"], function(e, n) {
        var t = n + 1, r = t == it || t == Bt;
        B.prototype[e] = function(u) {
          var o = this.clone();
          return o.__iteratees__.push({
            iteratee: E(u, 3),
            type: t
          }), o.__filtered__ = o.__filtered__ || r, o;
        };
      }), Fe(["head", "last"], function(e, n) {
        var t = "take" + (n ? "Right" : "");
        B.prototype[e] = function() {
          return this[t](1).value()[0];
        };
      }), Fe(["initial", "tail"], function(e, n) {
        var t = "drop" + (n ? "" : "Right");
        B.prototype[e] = function() {
          return this.__filtered__ ? new B(this) : this[t](1);
        };
      }), B.prototype.compact = function() {
        return this.filter(ye);
      }, B.prototype.find = function(e) {
        return this.filter(e).head();
      }, B.prototype.findLast = function(e) {
        return this.reverse().find(e);
      }, B.prototype.invokeMap = M(function(e, n) {
        return typeof e == "function" ? new B(this) : this.map(function(t) {
          return xt(t, e, n);
        });
      }), B.prototype.reject = function(e) {
        return this.filter(Ar(E(e)));
      }, B.prototype.slice = function(e, n) {
        e = T(e);
        var t = this;
        return t.__filtered__ && (e > 0 || n < 0) ? new B(t) : (e < 0 ? t = t.takeRight(-e) : e && (t = t.drop(e)), n !== i && (n = T(n), t = n < 0 ? t.dropRight(-n) : t.take(n - e)), t);
      }, B.prototype.takeRightWhile = function(e) {
        return this.reverse().takeWhile(e).reverse();
      }, B.prototype.toArray = function() {
        return this.take(Ie);
      }, Qe(B.prototype, function(e, n) {
        var t = /^(?:filter|find|map|reject)|While$/.test(n), r = /^(?:head|last)$/.test(n), u = s[r ? "take" + (n == "last" ? "Right" : "") : n], o = r || /^find/.test(n);
        u && (s.prototype[n] = function() {
          var l = this.__wrapped__, a = r ? [1] : arguments, h = l instanceof B, v = a[0], m = h || L(l), x = function(U) {
            var N = u.apply(s, mn([U], a));
            return r && y ? N[0] : N;
          };
          m && t && typeof v == "function" && v.length != 1 && (h = m = !1);
          var y = this.__chain__, C = !!this.__actions__.length, S = o && !y, F = h && !C;
          if (!o && m) {
            l = F ? l : new B(this);
            var P = e.apply(l, a);
            return P.__actions__.push({ func: Rr, args: [x], thisArg: i }), new Ue(P, y);
          }
          return S && F ? e.apply(this, a) : (P = this.thru(x), S ? r ? P.value()[0] : P.value() : P);
        });
      }), Fe(["pop", "push", "shift", "sort", "splice", "unshift"], function(e) {
        var n = Qt[e], t = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(e);
        s.prototype[e] = function() {
          var u = arguments;
          if (r && !this.__chain__) {
            var o = this.value();
            return n.apply(L(o) ? o : [], u);
          }
          return this[t](function(l) {
            return n.apply(L(l) ? l : [], u);
          });
        };
      }), Qe(B.prototype, function(e, n) {
        var t = s[n];
        if (t) {
          var r = t.name + "";
          H.call(Yn, r) || (Yn[r] = []), Yn[r].push({ name: n, func: t });
        }
      }), Yn[mr(i, en).name] = [{
        name: "wrapper",
        func: i
      }], B.prototype.clone = ql, B.prototype.reverse = Gl, B.prototype.value = $l, s.prototype.at = vh, s.prototype.chain = mh, s.prototype.commit = wh, s.prototype.next = xh, s.prototype.plant = Ih, s.prototype.reverse = Ch, s.prototype.toJSON = s.prototype.valueOf = s.prototype.value = bh, s.prototype.first = s.prototype.head, pt && (s.prototype[pt] = yh), s;
    }, Vn = wl();
    Pn ? ((Pn.exports = Vn)._ = Vn, Qr._ = Vn) : oe._ = Vn;
  }).call(St);
})(Mr, Mr.exports);
var Bn = Mr.exports;
class Ug {
  constructor(f) {
    D(this, "runtimeCore");
    D(this, "processedSchemas");
    D(this, "processedModel");
    D(this, "getRuntimeMeta");
    D(this, "stableSchemas", []);
    D(this, "stableModel", {});
    D(this, "schemaPreset", dn.schemaPreset);
    D(this, "componentPropsPreset", dn.componentPropsPreset);
    D(this, "stableUpdaterProcessProgress");
    D(this, "stableUpdaterTimes", 0);
    D(this, "schemaEffect", new iu());
    D(this, "defaultValueEffect", new iu());
    D(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    D(this, "baseDefaultValueFunctionsLength");
    D(this, "isModelInitialized", !0);
    this.runtimeCore = f, this.processedSchemas = f.schemas, this.processedModel = f.model, this.getRuntimeMeta = f.getRuntimeMeta.bind(f), qe(
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
  parse(f, i) {
    f.forEach((p, w) => {
      this.parseItem(p, w, i);
    });
  }
  // 初始化空数据结构，避免后续复杂的 if else
  initSchemas(f) {
    return f.map((i) => {
      const p = {};
      return i.children && (p.children = this.initSchemas(i.children)), p;
    });
  }
  countFunctionDefaultValues(f) {
    let i = 0;
    const p = /* @__PURE__ */ new Set();
    function w(R) {
      if (!p.has(R) && (Array.isArray(R) || R !== null && typeof R == "object")) {
        p.add(R);
        for (const b in R)
          R.hasOwnProperty(b) && (b === "defaultValue" && typeof R[b] == "function" && !R[b].toString().includes("[native code]") && i++, w(R[b]));
      }
    }
    return w(f), i;
  }
  // 派生过程，用于外部应用
  parseSchemas(f, i) {
    A.isArrayEmpty(this.processedSchemas.value) && (this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
      pn(f)
    ), this.processedSchemas.value = this.initSchemas(f)), this.parse(f, i);
  }
  parseStable(f) {
    const i = {};
    if (!A.isUndefined(f.stable))
      i[f.key] = this.parseStable(f.stable);
    else
      return f;
    return i;
  }
  // 对于稳定初始化更新的抽象
  stableUpdater(f = []) {
    if (f.every(Boolean)) {
      const i = rt(this.processedSchemas.value);
      !A.isProcessInprogress(i) && A.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: i.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(i));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(f, i, p) {
    const w = this, R = Array.from({
      length: Object.keys(f).filter((W) => W !== "children").length
    }).fill(!1);
    this.objectParser({ data: f, index: i, updater: b });
    function b(W) {
      const G = W.index, z = W.key, Q = W.keyIndex;
      if (A.isUndefined(W.stable))
        return;
      const pe = w.parseStable(W.stable), Xe = p == null ? void 0 : p.index, de = p == null ? void 0 : p.key;
      let re = pe;
      if (A.isProcessInprogress(re) || (R[Q] = !0), p) {
        const te = w.processedSchemas.value[Xe][de][G][z];
        te && A.isObject(te) && z !== "component" && (re = fe(te, re)), w.processedSchemas.value[Xe][de][G][z] = re, w.stableUpdater(R);
      } else {
        const te = w.processedSchemas.value[G][z];
        te && A.isObject(te) && z !== "component" && (re = fe(te, re)), w.processedSchemas.value[G][z] = re, w.stableUpdater(R);
      }
    }
  }
  // 只做基本的对象 parser
  objectParser(f) {
    const i = f.data;
    Object.keys(i).forEach((w, R) => {
      if (w === "children")
        this.parseSchemas(i[w], {
          ...f,
          key: w,
          keyIndex: R
        });
      else {
        const b = (W) => {
          f.updater({
            ...f,
            key: w,
            keyIndex: R,
            stable: W
          });
        };
        A.isFunction(i[w]) ? w !== "defaultValue" ? this.schemaEffect.trackEffect(
          () => {
            if (w === "component") {
              const W = i[w](this.getRuntimeMeta());
              this.promiseFieldParser(W, b, !1);
            } else
              this.fieldParser(i[w], b);
          },
          {
            lazy: !1
          }
        ) : this.defaultValueEffect.trackEffect(
          () => {
            const W = this.schemaEffect.trackEffect(
              () => {
                /\{\s*model\s*\}/.test(i[w].toString()) ? this.fieldParser(i[w], (G) => {
                  if (!G)
                    return b(G);
                  this.defaultValueInprogressMap.set(i[w], G), !A.isProcessInprogress(G) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                    this.defaultValueInprogressMap.values()
                  ).every((z) => {
                    var Q;
                    return !((Q = z == null ? void 0 : z.includes) != null && Q.call(z, "undefined"));
                  }) ? (b(G), this.defaultValueEffect.clearEffects(), Ye(() => {
                    W();
                  })) : b(G);
                }) : this.fieldParser(i[w], (G) => {
                  this.defaultValueInprogressMap.set(i[w], G), !A.isProcessInprogress(G) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                    this.defaultValueInprogressMap.values()
                  ).every((z) => {
                    var Q;
                    return !((Q = z == null ? void 0 : z.includes) != null && Q.call(z, "undefined"));
                  }) ? (b(G), this.defaultValueEffect.clearEffects(), Ye(() => {
                    W();
                  })) : b(G);
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
        ) : w === "component" || w === "slots" || w === "runtime" ? this.promiseFieldParser(i[w], b, !1) : this.fieldParser(i[w], b);
      }
    });
  }
  promiseFieldParser(f, i, p) {
    A.isPromise(f) ? f.then((w) => {
      A.isString(w) && (w = ru(w, "")), p && A.isObject(w) && !A.isNativeObject(w) ? this.objectParser({
        data: w,
        updater: i
      }) : i(w);
    }) : (A.isString(f) && (f = ru(f, "")), p && A.isObject(f) && !A.isNativeObject(f) ? this.objectParser({
      data: f,
      updater: i
    }) : i(f));
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(f, i, p = !0) {
    if (A.isFunction(f))
      if (f.name.startsWith("__proform_raw_"))
        i(
          (...w) => f({
            rawArgs: w,
            ...this.getRuntimeMeta()
          })
        );
      else if (f.name.startsWith("__proform_structured_path_parsing_mark_"))
        i(() => f());
      else if (f.__proform_async_result) {
        const w = f.__proform_async_result;
        this.promiseFieldParser(w, i, p);
      } else {
        const w = f(this.getRuntimeMeta());
        f.__proform_async_result = w, this.promiseFieldParser(w, i, p);
      }
    else
      At(f) ? qe(
        () => f.value,
        () => {
          A.isUndefined(f.value) || (p && A.isObject(f.value) && !A.isNativeObject(f.value) ? this.objectParser({
            data: f.value,
            updater: i
          }) : i(f.value));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : Ot(f) ? qe(
        () => f,
        () => {
          A.isUndefined(f) || (p && A.isObject(f) && !A.isNativeObject(f) ? this.objectParser({
            data: f,
            updater: i
          }) : i(f));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : p && A.isObject(f) && !A.isNativeObject(f) ? this.objectParser({
        data: f,
        updater: i
      }) : i(f);
  }
  modelProcessor(f) {
    f.map(
      (i) => this.createModel(i, this.processedModel.value)
    ), A.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && (this.stableModel = pn(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects());
  }
  setModel(f, i, p) {
    A.isFunction(i) ? Bn.set(f, i(), p) : f[i] = p;
  }
  createModel(f, i) {
    A.isListSchema(f) && (i[f.field] || this.setModel(i, f.field, [{}]), f.children.forEach((p) => {
      this.createModel(p, i[f.field][0]);
    })), A.isGroupSchema(f) && f.children.forEach((p) => {
      this.createModel(p, i);
    }), A.isItemSchema(f) && ("defaultValue" in f ? this.setModel(i, f.field, f.defaultValue) : this.setModel(i, f.field, void 0));
  }
}
class nt {
  static getFormContainer({ ui: f } = {}) {
    return V.presets.uiPresets[f ?? V.presets.ui].container.Form;
  }
  static getFormItemContainer({ ui: f } = {}) {
    return V.presets.uiPresets[f ?? V.presets.ui].container.FormItem;
  }
  static getItemContainer({ ui: f } = {}) {
    return V.presets.uiPresets[f ?? V.presets.ui].container.Item;
  }
  static getGroupContainer({ ui: f } = {}) {
    return V.presets.uiPresets[f ?? V.presets.ui].container.Group;
  }
  static getListContainer({ ui: f } = {}) {
    return V.presets.uiPresets[f ?? V.presets.ui].container.List;
  }
  static getListItemContainer({ ui: f } = {}) {
    return V.presets.uiPresets[f ?? V.presets.ui].container.ListItem;
  }
}
class Wg {
  constructor(f) {
    this.ui = f;
  }
  getRuntimeNative() {
    var i;
    return (i = V.presets.uiPresets[this.ui]) == null ? void 0 : i.native;
  }
  getRuntimeField(f) {
    var w;
    const i = (w = V.presets.uiPresets[this.ui]) == null ? void 0 : w.adapter, p = dn.adapters[V.getUI(this.ui)];
    return (i == null ? void 0 : i.getRuntimeField(f)) ?? (p == null ? void 0 : p.getRuntimeField(f));
  }
  getRuntimeRequired(f) {
    var w;
    const i = (w = V.presets.uiPresets[this.ui]) == null ? void 0 : w.adapter, p = dn.adapters[V.getUI(this.ui)];
    return (i == null ? void 0 : i.getRuntimeRequired(f)) ?? (p == null ? void 0 : p.getRuntimeRequired(f));
  }
  getFormModelPropName() {
    var p;
    const f = (p = V.presets.uiPresets[this.ui]) == null ? void 0 : p.adapter, i = dn.adapters[V.getUI(this.ui)];
    return (f == null ? void 0 : f.getFormModelPropName()) ?? (i == null ? void 0 : i.getFormModelPropName());
  }
  formComponentRenderer(f) {
    var w;
    const i = (w = V.presets.uiPresets[this.ui]) == null ? void 0 : w.adapter, p = dn.adapters[V.getUI(this.ui)];
    return (i == null ? void 0 : i.formComponentRenderer(f)) ?? (p == null ? void 0 : p.formComponentRenderer(f));
  }
  clearValidate(f) {
    var w;
    const i = (w = V.presets.uiPresets[this.ui]) == null ? void 0 : w.adapter, p = dn.adapters[V.getUI(this.ui)];
    return (i == null ? void 0 : i.clearValidate(f)) ?? (p == null ? void 0 : p.clearValidate(f));
  }
}
function Bg(d) {
  return typeof d == "function" || Object.prototype.toString.call(d) === "[object Object]" && !Tg(d);
}
class Ng {
  constructor(f) {
    D(this, "schemas", Fr([]));
    D(this, "model", Fr({}));
    D(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    D(this, "formRef", Fr(null));
    D(this, "hydrateEffect", new iu());
    D(this, "native", Ds({}));
    D(this, "grid", {});
    D(this, "runtime", {});
    D(this, "globalNativeFormOverride", Ds({
      props: {
        Form: {},
        FormItem: {}
      },
      slots: {
        Form: {},
        FormItem: {}
      }
    }));
    D(this, "shared", {});
    this.setup = f, this.processor = new Ug(this);
    const i = this.setup(this);
    if (this.ui = i.ui ?? V.presets.ui, this.runtimeAdapter = new Wg(this.ui), Object.assign(this.globalNativeFormOverride, this.runtimeAdapter.getRuntimeNative()), At(i.schemas))
      qe(
        // @ts-expect-error
        () => i.schemas.value,
        () => {
          this.processor.parseSchemas(i.schemas.value);
        },
        {
          deep: !0
        }
      );
    else if (Ot(i.schemas)) {
      const p = qe(() => i.schemas, () => {
        this.processor.parseSchemas(i.schemas), Ye(() => {
          p();
        });
      }, {
        deep: !0
      });
    } else
      this.processor.parseSchemas(i.schemas);
  }
  getRuntimeMeta() {
    const f = rt(pn(this.model.value));
    let i;
    return {
      model: f,
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (p) => {
        i && clearTimeout(i), i = setTimeout(() => {
          if (At(p)) {
            const w = qe(() => p.value, () => {
              fe(this.shared, p.value), this.processor.schemaEffect.triggerEffects(), Ye(() => {
                w();
              });
            }, {
              deep: !0,
              immediate: !0
            });
          } else if (Ot(p)) {
            const w = qe(() => p, () => {
              fe(this.shared, p), this.processor.schemaEffect.triggerEffects(), Ye(() => {
                w();
              });
            }, {
              deep: !0,
              immediate: !0
            });
          } else
            fe(this.shared, p), this.processor.schemaEffect.triggerEffects();
        }, 0);
      }
    };
  }
  runtimeItemProcessor(f, i, p = this.model.value, w) {
    var nn, Le, _n, Nn, Tt, Ft, Mt, Ut, it, Wt, Bt, Je, Ge, Nt, En, Ie, Dt;
    const R = rt(f.component);
    if (!R)
      return;
    (Le = (nn = f.native) == null ? void 0 : nn.props) != null && Le.Form && fe(this.globalNativeFormOverride.props.Form, (Nn = (_n = f.native) == null ? void 0 : _n.props) == null ? void 0 : Nn.Form), (Ft = (Tt = f.native) == null ? void 0 : Tt.slots) != null && Ft.Form && fe(this.globalNativeFormOverride.slots.Form, (Ut = (Mt = f.native) == null ? void 0 : Mt.slots) == null ? void 0 : Ut.Form);
    const b = fe(pn((Wt = (it = this.native) == null ? void 0 : it.slots) == null ? void 0 : Wt.FormItem) ?? {}, (Je = (Bt = f.native) == null ? void 0 : Bt.slots) == null ? void 0 : Je.FormItem), W = {
      display: "grid",
      gridColumn: "1 / -1",
      ...f.grid
    }, G = fe(pn((Nt = (Ge = this.native) == null ? void 0 : Ge.props) == null ? void 0 : Nt.FormItem) ?? {}, (Ie = (En = f.native) == null ? void 0 : En.props) == null ? void 0 : Ie.FormItem), z = this.runtimeAdapter.getRuntimeField({
      schema: f,
      parentSchema: w,
      index: i
    }), Q = R.name, pe = f.componentProps ?? {}, Xe = dn.placeholderPresetByComponentName;
    let de = f.placeholder, re = f.show;
    re === void 0 && (re = !0);
    let te = f.label ?? "", j;
    if (f.runtime ? j = f.runtime : j = (w == null ? void 0 : w.runtime) ?? this.runtime, !A.isUndefined(i) && !A.isObjectEmpty(j) && (te = ru((Dt = j == null ? void 0 : j.customizeListItemLabel) == null ? void 0 : Dt.call(j, f.label ?? "", i + 1), "")), !de) {
      let Sn = "请输入";
      A.isUndefined(Q) ? de = `${Sn}${te}` : /* @ts-expect-error */ Xe[Q.toLowerCase()] ? (Sn = // @ts-expect-error
      Xe[Q.toLowerCase()], de = `${Sn}${te}`) : (Object.keys(Xe).forEach((qt) => {
        Q.toLowerCase().includes(qt.toLowerCase()) && (Sn = Xe[qt]);
      }), de = `${Sn}${te}`);
    }
    const en = this.runtimeAdapter.getRuntimeRequired({
      ...f,
      label: te
    }), Lt = nt.getItemContainer(this), Ae = nt.getFormItemContainer(this), gn = this, Oe = f.componentSlots;
    return ae("div", {
      style: W
    }, [ae(Lt, {
      show: re
    }, {
      default() {
        return re && ae(Ae, Pt(G, {
          label: `${te ? `${te}:` : ""}`
        }, z, en), {
          default() {
            return gn.runtimeAdapter.formComponentRenderer({
              Component: R,
              schema: f,
              baseModel: p,
              placeholder: de,
              componentSlots: Oe,
              props: pe
            });
          },
          ...b
        });
      }
    })]);
  }
  runtimeGroupProcessor(f) {
    let i;
    const p = {
      display: "grid",
      gridColumn: "1 / -1",
      ...f.grid
    }, w = nt.getGroupContainer(this);
    let R = f.show;
    return R === void 0 && (R = !0), ae("div", {
      style: p
    }, [R && ae(w, {
      schema: f
    }, Bg(i = f.children.map((b) => this.runtimeItemProcessor(b))) ? i : {
      default: () => [i]
    })]);
  }
  addListItem(f) {
    var i, p;
    if (!((i = this.processor.stableModel[f.field]) != null && i[0]))
      return Promise.reject({
        code: "0001",
        message: "异步默认值数据正在处理中，请您耐心等待... "
      });
    (p = this.processor.stableModel[f.field]) != null && p[0] && this.model.value[f.field].push(pn(this.processor.stableModel[f.field][0])), this.runtimeAdapter.clearValidate(this);
  }
  deleteListItem(f, i) {
    this.model.value[f.field].splice(i, 1), this.runtimeAdapter.clearValidate(this);
  }
  runtimeListProcessor(f) {
    const i = {
      display: "grid",
      gridColumn: "1 / -1",
      ...f.grid
    }, p = this;
    p.model.value[f.field] || (p.model.value[f.field] = [{}]);
    let w = f.show;
    w === void 0 && (w = !0);
    const R = nt.getListContainer(this), b = nt.getListItemContainer(this);
    return ae("div", {
      style: i
    }, [w && ae(R, {
      schema: f
    }, {
      default() {
        return p.model.value[f.field].map((W, G) => ae(b, null, {
          default() {
            return f.children.map((z) => p.runtimeItemProcessor(z, G, W, f));
          },
          delete({
            container: z
          } = {}) {
            var pe;
            const Q = z ?? ae("button", null, null);
            return Ag(ae(Q, {
              onClick: () => p.deleteListItem(f, G)
            }, null), [[Og, ((pe = p.model.value[f.field]) == null ? void 0 : pe.length) > 1]]);
          }
        }));
      },
      add({
        container: W
      } = {}) {
        const G = W ?? ae("button", null, [Lg("添加")]);
        return ae(G, {
          onClick: () => p.addListItem(f)
        }, null);
      }
    })]);
  }
  runtimeProcessor(f) {
    return f.map((i) => (i.type || (i.type = "item"), this.processorBySchemaType[i.type](i)));
  }
  exec() {
    var W, G, z, Q;
    const f = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.grid
    }, i = this, p = fe(this.globalNativeFormOverride.props.Form, pn((G = (W = this.native) == null ? void 0 : W.props) == null ? void 0 : G.Form) ?? {}), w = fe(this.globalNativeFormOverride.slots.Form, pn((Q = (z = this.native) == null ? void 0 : z.slots) == null ? void 0 : Q.Form) ?? {}), R = nt.getFormContainer(this), b = this.runtimeAdapter.getFormModelPropName();
    return ae(R, Pt(p, {
      ref: this.formRef
    }, {
      [b]: this.model.value
    }), {
      default() {
        return ae("div", {
          style: f
        }, [i.runtimeProcessor(i.schemas.value)]);
      },
      ...w
    });
  }
}
class V {
  static getPreset(f) {
    var i, p, w;
    return (p = (i = this.presets.uiPresets) == null ? void 0 : i[f]) != null && p.extend ? this.presets.uiPresets[(w = this.presets.uiPresets[f]) == null ? void 0 : w.extend] : this.presets.uiPresets[f];
  }
  static getUI(f) {
    var i, p, w;
    return (p = (i = this.presets.uiPresets) == null ? void 0 : i[f]) != null && p.extend ? (w = this.presets.uiPresets[f]) == null ? void 0 : w.extend : f;
  }
}
D(V, "presets");
function tu({
  parentSchema: d,
  schema: f,
  index: i
}) {
  return d ? `${d.field}.${i}.${f.field}` : f.field;
}
const Dg = {
  ArcoVue: {
    getRuntimeField(d) {
      const f = tu(d);
      return A.isFunction(f) ? {
        field: f()
      } : {
        field: f
      };
    },
    getRuntimeRequired(d) {
      var f;
      if (d.required)
        if (!d.rules)
          d.rules = [], d.rules.push({
            required: !0,
            message: `${d.label}是必填项`
          });
        else {
          const i = d.rules.findIndex((p) => !A.isUndefined(p.required));
          i !== -1 ? (d.rules[i].required = !0, d.rules[i].message = `${d.label}是必填项`) : d.rules.unshift({
            required: !0,
            message: `${d.label}是必填项`
          });
        }
      else if (d.rules) {
        const i = (f = d.rules) == null ? void 0 : f.findIndex((p) => !!p.required);
        i !== -1 ? d.rules[i].required = !1 : d.rules.unshift({
          required: !0,
          message: `${d.label}是必填项`
        });
      }
      return {
        rules: d.rules
      };
    },
    getFormModelPropName() {
      return "model";
    },
    formComponentRenderer({
      Component: d,
      baseModel: f,
      schema: i,
      placeholder: p,
      componentSlots: w,
      props: R
    }) {
      let b;
      return A.isFunction(i.field) ? b = Bn.get(f, i.field()) : b = f[i.field], ae(d, Pt({
        modelValue: b,
        "onUpdate:modelValue": (W) => {
          A.isFunction(i.field) ? Bn.set(f, i.field(), W) : f[i.field] = W;
        },
        placeholder: p
      }, R), {
        ...w
      });
    },
    validateForm(d) {
      return new Promise((f, i) => {
        d.runtimeCore.formRef.value.validate((p) => p ? i(p) : f(d.cleanFallbackFields(rt(d.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(d) {
      d.formRef.value.clearValidate();
    }
  },
  NutUI: {
    getRuntimeField(d) {
      const f = tu(d);
      return A.isFunction(f) ? {
        prop: f()
      } : {
        prop: f
      };
    },
    getRuntimeRequired(d) {
      var f;
      if (d.required)
        if (!d.rules)
          d.rules = [], d.rules.push({
            required: !0,
            message: `${d.label}是必填项`
          });
        else {
          const i = d.rules.findIndex((p) => !A.isUndefined(p.required));
          i !== -1 ? (d.rules[i].required = !0, d.rules[i].message = `${d.label}是必填项`) : d.rules.unshift({
            required: !0,
            message: `${d.label}是必填项`
          });
        }
      else if (d.rules) {
        const i = (f = d.rules) == null ? void 0 : f.findIndex((p) => !!p.required);
        i !== -1 ? d.rules[i].required = !1 : d.rules.unshift({
          required: !0,
          message: `${d.label}是必填项`
        });
      }
      return {
        rules: d.rules,
        required: d.required
      };
    },
    getFormModelPropName() {
      return "modelValue";
    },
    formComponentRenderer({
      Component: d,
      baseModel: f,
      schema: i,
      placeholder: p,
      componentSlots: w,
      props: R
    }) {
      let b;
      return A.isFunction(i.field) ? b = Bn.get(f, i.field()) : b = f[i.field], ae(d, Pt({
        modelValue: b,
        "onUpdate:modelValue": (W) => {
          A.isFunction(i.field) ? Bn.set(f, i.field(), W) : f[i.field] = W;
        },
        placeholder: p
      }, R), {
        ...w
      });
    },
    validateForm(d) {
      return new Promise((f, i) => {
        d.runtimeCore.formRef.value.validate().then(({
          valid: p,
          errors: w
        }) => {
          p ? f(d.cleanFallbackFields(rt(d.runtimeCore.processor.processedModel.value))) : i(w);
        });
      });
    },
    clearValidate(d) {
      d.formRef.value.reset();
    }
  },
  NaiveUI: {
    getRuntimeField(d) {
      const f = tu(d);
      return A.isFunction(f) ? {
        path: f()
      } : {
        path: f
      };
    },
    getRuntimeRequired(d) {
      var f;
      if (d.required)
        if (!d.rules)
          d.rules = [], d.rules.push({
            required: !0,
            message: `${d.label}是必填项`,
            trigger: ["input", "blur"]
          });
        else {
          const i = d.rules.findIndex((p) => !A.isUndefined(p.required));
          i !== -1 ? (d.rules[i].required = !0, d.rules[i].message = `${d.label}是必填项`) : d.rules.unshift({
            required: !0,
            message: `${d.label}是必填项`,
            trigger: ["input", "blur"]
          });
        }
      else if (d.rules) {
        const i = (f = d.rules) == null ? void 0 : f.findIndex((p) => !!p.required);
        i !== -1 ? d.rules[i].required = !1 : d.rules.unshift({
          required: !0,
          message: `${d.label}是必填项`,
          trigger: ["input", "blur"]
        });
      }
      return {
        rule: d.rules
      };
    },
    getFormModelPropName() {
      return "model";
    },
    formComponentRenderer({
      Component: d,
      baseModel: f,
      schema: i,
      placeholder: p,
      componentSlots: w,
      props: R
    }) {
      let b;
      return A.isFunction(i.field) ? b = Bn.get(f, i.field()) : b = f[i.field], ae(d, Pt({
        value: b,
        "onUpdate:value": (W) => {
          A.isFunction(i.field) ? Bn.set(f, i.field(), W) : f[i.field] = W;
        },
        placeholder: p
      }, R), {
        ...w
      });
    },
    validateForm(d) {
      return new Promise((f, i) => {
        d.runtimeCore.formRef.value.validate((p) => p ? i(p) : f(d.cleanFallbackFields(rt(d.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(d) {
      d.formRef.value.restoreValidation();
    }
  }
}, tt = class tt {
  static getPlaceholderPrefixPresetByComponentName() {
    const f = {
      请选择: ["select", "tree"],
      请输入: ["input"]
    }, i = {};
    for (const p in f)
      f[p].forEach((w) => {
        i[w] = p;
      });
    return i;
  }
};
D(tt, "schemaPreset", {
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
}), D(tt, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
D(tt, "placeholderPresetByComponentName", tt.getPlaceholderPrefixPresetByComponentName());
let uu = tt;
const dn = {
  ...uu,
  adapters: {
    ...Dg
  }
}, $g = /* @__PURE__ */ Fg({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(d) {
    const f = new Ng(d.setup);
    return () => f.exec();
  }
});
function zg(d) {
  const f = new Mg(d);
  return [
    f.setup.bind(f),
    {
      submit: f.submit.bind(f),
      hydrate: f.hydrate.bind(f),
      share: f.share.bind(f),
      subscribeModel: f.subscribeModel.bind(f),
      resetModel: f.resetModel.bind(f)
    }
  ];
}
function Hg(d) {
  V.presets = d;
}
function qs(d, f) {
  return f === "native" && Object.defineProperty(d, "name", {
    value: `__proform_raw_${d.name}`,
    writable: !0
  }), f === "structured_path_parsing_mark" && Object.defineProperty(d, "name", {
    value: `__proform_structured_path_parsing_mark_${d.name}`,
    writable: !0
  }), d;
}
function Vg(d) {
  return qs(d, "native");
}
function Kg(d) {
  return d.__proform_raw_object = !0, d;
}
function Zg(d) {
  function f() {
    return d;
  }
  return qs(
    f,
    "structured_path_parsing_mark"
  );
}
export {
  $g as ProForm,
  Vg as markNativeFunction,
  Kg as markNativeObject,
  Zg as markStructuredPathParsing,
  zg as useForm,
  Hg as useFormPresetConfigurer,
  qs as useModifiers
};
