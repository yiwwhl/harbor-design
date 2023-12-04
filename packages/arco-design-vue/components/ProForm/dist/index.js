var Z = Object.defineProperty;
var ee = (o, e, t) => e in o ? Z(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var l = (o, e, t) => (ee(o, typeof e != "symbol" ? e + "" : e, t), t);
import { toRaw as O, isRef as J, watch as I, isReactive as Q, nextTick as K, ref as A, reactive as te, createVNode as c, withDirectives as W, mergeProps as F, vShow as H, createTextVNode as se, isVNode as re, defineComponent as ie } from "vue";
class f {
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
      if (e.setup && this.isFunction(e.setup) && e.props)
        return !1;
      if (this.isObjectEmpty(e))
        return !0;
      for (const t in e)
        if (e.hasOwnProperty(t) && this.isProcessInprogress(e[t]))
          return !0;
    } else if (this.isArray(e)) {
      if (this.isArrayEmpty(e))
        return !0;
      for (const t of e)
        if (this.isProcessInprogress(t))
          return !0;
    }
    return !1;
  }
}
function p(o, ...e) {
  return e.forEach((t) => {
    if (Array.isArray(t))
      Array.isArray(o) || (o = []), t.forEach((s, r) => {
        typeof s == "object" && s !== null ? o[r] = p(Array.isArray(s) ? [] : {}, s) : o[r] = s;
      });
    else
      for (let s in t)
        t.hasOwnProperty(s) && (typeof t[s] == "object" && t[s] !== null ? o[s] = p(o[s] || {}, t[s]) : o[s] = t[s]);
  }), o;
}
function y(o) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(s) {
    if (s === null || typeof s != "object")
      return s;
    if (s instanceof Date)
      return new Date(s);
    if (s instanceof RegExp)
      return new RegExp(s);
    if (s instanceof Map) {
      const i = /* @__PURE__ */ new Map();
      for (let [n, u] of s)
        i.set(t(n), t(u));
      return i;
    }
    if (s instanceof Set) {
      const i = /* @__PURE__ */ new Set();
      for (let n of s)
        i.add(t(n));
      return i;
    }
    if (e.has(s))
      return e.get(s);
    if (Array.isArray(s)) {
      const i = [];
      e.set(s, i);
      for (let n = 0; n < s.length; n++)
        i[n] = t(s[n]);
      return i;
    }
    const r = Object.create(Object.getPrototypeOf(s));
    e.set(s, r);
    for (let i in s)
      s.hasOwnProperty(i) && (r[i] = t(s[i]));
    return r;
  }
  return t(o);
}
function X(o, e) {
  return o.replace(/undefined/g, e);
}
class oe {
  constructor(e) {
    l(this, "runtimeCore");
    this.formCustomization = e;
  }
  // happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
  cleanFallbackFields(e) {
    return e !== null && typeof e == "object" && (delete e.__yiwwhl_async_field_fallback, Object.values(e).forEach((t) => {
      this.cleanFallbackFields(t);
    })), e;
  }
  setup(e) {
    return this.runtimeCore = e, Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.gridProps, this.formCustomization.gridProps), Object.assign(
      this.runtimeCore.runtimeSetters,
      this.formCustomization.runtimeSetters
    ), this.formCustomization;
  }
  submit() {
    return new Promise((e, t) => {
      this.runtimeCore.formRef.value.validate((s) => s ? t(s) : e(
        this.cleanFallbackFields(
          O(this.runtimeCore.processor.processedModel.value)
        )
      ));
    });
  }
  hydrate(e) {
    if (!this.runtimeCore)
      return Promise.reject({
        code: "0002",
        message: "hydrate 使用时机错误，建议将 hydrate 操作放到 onMounted 等页面节点挂载完成的钩子中，或者使用响应式的值来注入数据"
      });
    this.runtimeCore.hydrateEffect.trackEffect(
      () => {
        J(e) ? I(
          () => e.value,
          () => {
            p(this.runtimeCore.model.value, e.value);
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : Q(e) ? I(
          () => e,
          () => {
            p(this.runtimeCore.model.value, e);
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : p(this.runtimeCore.model.value, e);
      },
      {
        lazy: !0
      }
    );
  }
}
class M {
  constructor() {
    l(this, "effects", /* @__PURE__ */ new Set());
  }
  clearEffects() {
    this.effects.clear();
  }
  triggerEffects() {
    Array.from(this.effects).forEach((e) => e());
  }
  trackEffect(e, t = {
    lazy: !1
  }) {
    return !t.lazy && e(), this.effects.add(e), () => this.effects.delete(e);
  }
}
class ne {
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
    l(this, "schemaEffect", new M());
    l(this, "defaultValueEffect", new M());
    l(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    l(this, "baseDefaultValueFunctionsLength");
    this.runtimeCore = e, this.processedSchemas = e.schemas, this.processedModel = e.model, this.getRuntimeMeta = e.getRuntimeMeta.bind(e), I(
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
    e.forEach((s, r) => {
      this.parseItem(s, r, t);
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
    let t = 0, s = /* @__PURE__ */ new Set();
    function r(i) {
      if (!s.has(i) && (Array.isArray(i) || i !== null && typeof i == "object")) {
        s.add(i);
        for (let n in i)
          i.hasOwnProperty(n) && (n === "defaultValue" && typeof i[n] == "function" && !i[n].toString().includes("[native code]") && t++, r(i[n]));
      }
    }
    return r(e), t;
  }
  // 派生过程，用于外部应用
  parseSchemas(e, t) {
    f.isArrayEmpty(this.processedSchemas.value) && (this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
      y(e)
    ), this.processedSchemas.value = this.initSchemas(e)), this.parse(e, t);
  }
  parseStable(e) {
    const t = {};
    if (!f.isUndefined(e.stable))
      t[e.key] = this.parseStable(e.stable);
    else
      return e;
    return t;
  }
  // 对于稳定初始化更新的抽象
  stableUpdater(e = []) {
    if (e.every(Boolean)) {
      const t = O(this.processedSchemas.value);
      !f.isProcessInprogress(t) && f.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: t.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(t));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, t, s) {
    const r = this, i = Array.from({
      length: Object.keys(e).filter((u) => u !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: n });
    function n(u) {
      const a = u.index, d = u.key, V = u.keyIndex;
      if (!u.stable)
        return;
      const w = r.parseStable(u.stable), j = s == null ? void 0 : s.index, g = s == null ? void 0 : s.key;
      let h = w;
      if (f.isProcessInprogress(h) || (i[V] = !0), s) {
        let m = r.processedSchemas.value[j][g][a][d];
        m && f.isObject(m) && d !== "component" && (h = p(m, h)), r.processedSchemas.value[j][g][a][d] = h, r.stableUpdater(i);
      } else {
        let m = r.processedSchemas.value[a][d];
        m && f.isObject(m) && (h = p(m, h)), r.processedSchemas.value[a][d] = h, r.stableUpdater(i);
      }
    }
  }
  // 只做基本的对象 parser
  objectParser(e) {
    const t = e.data;
    Object.keys(t).forEach((r, i) => {
      if (r === "children")
        this.parseSchemas(t[r], {
          ...e,
          key: r,
          keyIndex: i
        });
      else {
        const n = (u) => {
          e.updater({
            ...e,
            key: r,
            keyIndex: i,
            stable: u
          });
        };
        f.isFunction(t[r]) ? r !== "defaultValue" ? this.schemaEffect.trackEffect(() => {
          if (r === "component") {
            const u = t[r](this.getRuntimeMeta());
            this.promiseFieldParser(u, n, !1);
          } else
            this.fieldParser(t[r], n);
        }) : this.defaultValueEffect.trackEffect(() => {
          const u = this.schemaEffect.trackEffect(() => {
            /\{\s*model\s*\}/.test(t[r].toString()) ? this.fieldParser(t[r], (a) => {
              if (!a)
                return n(a);
              this.defaultValueInprogressMap.set(t[r], a), !f.isProcessInprogress(a) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(this.defaultValueInprogressMap.values()).every(
                (d) => !d.includes("undefined")
              ) ? (n(a), this.defaultValueEffect.clearEffects(), K(() => {
                u();
              })) : n(a);
            }) : this.fieldParser(t[r], (a) => {
              this.defaultValueInprogressMap.set(t[r], a), !f.isProcessInprogress(a) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(this.defaultValueInprogressMap.values()).every(
                (d) => !d.includes("undefined")
              ) ? (n(a), this.defaultValueEffect.clearEffects(), K(() => {
                u();
              })) : n(a);
            });
          });
        }) : r === "component" || r === "slots" || r === "runtimeSetters" ? this.promiseFieldParser(t[r], n, !1) : this.fieldParser(t[r], n);
      }
    });
  }
  promiseFieldParser(e, t, s) {
    f.isPromise(e) ? e.then((r) => {
      s && f.isObject(r) ? this.objectParser({
        data: r,
        updater: t
      }) : t(r);
    }) : (f.isString(e) && (e = X(e, "")), s && f.isObject(e) ? this.objectParser({
      data: e,
      updater: t
    }) : t(e));
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(e, t, s = !0) {
    if (f.isFunction(e))
      if (e.name.startsWith("__proform_raw_"))
        t(e);
      else {
        const r = e(this.getRuntimeMeta());
        this.promiseFieldParser(r, t, s);
      }
    else
      J(e) ? I(
        () => e.value,
        () => {
          f.isUndefined(e.value) || (s && f.isObject(e.value) ? this.objectParser({
            data: e.value,
            updater: t
          }) : t(e.value));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : Q(e) ? I(
        () => e,
        () => {
          f.isUndefined(e) || (s && f.isObject(e) ? this.objectParser({
            data: e,
            updater: t
          }) : t(e));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : s && f.isObject(e) ? this.objectParser({
        data: e,
        updater: t
      }) : t(e);
  }
  modelProcessor(e) {
    e.map(
      (t) => this.createModel(t, this.processedModel.value)
    ), f.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && (this.stableModel = y(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects());
  }
  createModel(e, t) {
    f.isListSchema(e) && (t[e.field] || (t[e.field] = [{}]), e.children.forEach((s) => {
      this.createModel(s, t[e.field][0]);
    })), f.isGroupSchema(e) && e.children.forEach((s) => {
      this.createModel(s, t);
    }), f.isItemSchema(e) && (t[e.field] = e.defaultValue);
  }
}
function le(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !re(o);
}
class fe {
  constructor(e) {
    l(this, "schemas", A([]));
    l(this, "model", A({}));
    l(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    l(this, "formRef", A(null));
    l(this, "hydrateEffect", new M());
    l(this, "native", te({}));
    l(this, "gridProps", {});
    l(this, "runtimeSetters", {});
    l(this, "globalNativeFormOverride", {
      props: {},
      slots: {}
    });
    this.setup = e, this.processor = new ne(this);
    const t = this.setup(this);
    this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    return {
      model: O(y(this.model.value))
    };
  }
  runtimeItemProcessor(e, t, s = this.model.value, r) {
    var x, U, D, N, R, _, k, L, z, $, B, T, q, G;
    p(this.globalNativeFormOverride.props, (U = (x = e.native) == null ? void 0 : x.props) == null ? void 0 : U.Form), p(this.globalNativeFormOverride.slots, (N = (D = e.native) == null ? void 0 : D.slots) == null ? void 0 : N.Form);
    const i = p(y((_ = (R = this.native) == null ? void 0 : R.props) == null ? void 0 : _.FormItem) ?? {}, (L = (k = e.native) == null ? void 0 : k.props) == null ? void 0 : L.FormItem), n = p(y(($ = (z = this.native) == null ? void 0 : z.slots) == null ? void 0 : $.FormItem) ?? {}, (T = (B = e.native) == null ? void 0 : B.slots) == null ? void 0 : T.FormItem), u = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.gridProps
    }, a = r ? `${r.field}.${t}.${e.field}` : e.field, d = O(e.component);
    if (!d)
      return;
    const V = d.name, w = e.componentProps ?? {}, j = C.placeholderPresetByComponentName;
    let g = e.placeholder;
    const h = e.required;
    let m = e.show;
    m === void 0 && (m = !0), m || delete s[e.field];
    let P = e.label;
    const v = (r == null ? void 0 : r.runtimeSetters) ?? this.runtimeSetters;
    if (!f.isUndefined(t) && !f.isObjectEmpty(v) && (P = X((q = v == null ? void 0 : v.listItemLabelSetter) == null ? void 0 : q.call(v, e.label, t + 1), ""), g = `${// @ts-expect-error
    j[V] ?? "请输入"}${P}`), g || (g = `${// @ts-expect-error
    j[V] ?? "请输入"}${P}`), h)
      if (!e.rules)
        e.rules = [], (G = e.rules) == null || G.push({
          required: !0,
          message: `${P}是必填项`
        });
      else {
        const E = e.rules.findIndex((Y) => !!Y.required);
        e.rules[E].message = `${P}是必填项`;
      }
    return c("div", {
      style: u
    }, [c(b.runtimeDoms.Item, null, {
      default() {
        return W(c(b.runtimeDoms.FormItem, F(i, {
          label: `${P}:`,
          rules: e.rules,
          field: a
        }), {
          default() {
            return c(d, F({
              modelValue: s[e.field],
              "onUpdate:modelValue": (E) => s[e.field] = E,
              placeholder: g
            }, w), null);
          },
          ...n
        }), [[H, m]]);
      }
    })]);
  }
  runtimeGroupProcessor(e) {
    let t;
    const s = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.gridProps
    };
    return c("div", {
      style: s
    }, [c(b.runtimeDoms.Group, {
      schema: e
    }, le(t = e.children.map((r) => this.runtimeItemProcessor(r))) ? t : {
      default: () => [t]
    })]);
  }
  addListItem(e) {
    var t, s;
    if (!((t = this.processor.stableModel[e.field]) != null && t[0]))
      return Promise.reject({
        code: "0001",
        message: "异步默认值数据正在处理中，请您耐心等待... "
      });
    (s = this.processor.stableModel[e.field]) != null && s[0] && this.model.value[e.field].push(y(this.processor.stableModel[e.field][0])), this.formRef.value.clearValidate();
  }
  deleteListItem(e, t) {
    this.model.value[e.field].splice(t, 1), this.formRef.value.clearValidate();
  }
  runtimeListProcessor(e) {
    const t = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.gridProps
    }, s = this;
    return s.model.value[e.field] || (s.model.value[e.field] = [{}]), c("div", {
      style: t
    }, [c(b.runtimeDoms.List, {
      schema: e
    }, {
      default() {
        return s.model.value[e.field].map((r, i) => c(b.runtimeDoms.ListItem, null, {
          default() {
            return e.children.map((n) => s.runtimeItemProcessor(n, i, r, e));
          },
          delete({
            container: n
          } = {}) {
            var a;
            let u = n ?? c("button", null, null);
            return W(c(u, {
              onClick: () => s.deleteListItem(e, i)
            }, null), [[H, ((a = s.model.value[e.field]) == null ? void 0 : a.length) > 1]]);
          }
        }));
      },
      add({
        container: r
      } = {}) {
        let i = r ?? c("button", null, [se("添加")]);
        return c(i, {
          onClick: () => s.addListItem(e)
        }, null);
      }
    })]);
  }
  runtimeProcessor(e) {
    return e.map((t) => (t.type || (t.type = "item"), this.processorBySchemaType[t.type](t)));
  }
  exec() {
    var i, n, u, a;
    const e = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.gridProps
    }, t = this, s = p(y((n = (i = this.native) == null ? void 0 : i.props) == null ? void 0 : n.Form) ?? {}, this.globalNativeFormOverride.props), r = p(y((a = (u = this.native) == null ? void 0 : u.slots) == null ? void 0 : a.Form) ?? {}, this.globalNativeFormOverride.slots);
    return c(b.runtimeDoms.Form, F(s, {
      ref: this.formRef,
      model: this.model.value
    }), {
      default() {
        return c("div", {
          style: e
        }, [t.runtimeProcessor(t.schemas.value)]);
      },
      ...r
    });
  }
}
class b {
}
l(b, "runtimeDoms");
const S = class S {
  static getPlaceholderPrefixPresetByComponentName() {
    const e = {
      请选择: ["Select", "Tree", "TreeSelect"],
      请输入: ["Input"]
    }, t = {};
    for (let s in e)
      e[s].forEach((r) => {
        t[r] = s;
      });
    return t;
  }
};
l(S, "schemaPreset", {
  type: {
    defaultValue: "item"
  },
  component: {
    defaultValue: void 0
  },
  componentProps: {
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
  native: void 0,
  gridProps: void 0
}), l(S, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
l(S, "placeholderPresetByComponentName", S.getPlaceholderPrefixPresetByComponentName());
let C = S;
const ce = /* @__PURE__ */ ie({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(o) {
    const e = new fe(o.setup);
    return () => e.exec();
  }
});
function de(o) {
  const e = new oe(o);
  return [
    e.setup.bind(e),
    {
      submit: e.submit.bind(e),
      hydrate: e.hydrate.bind(e)
    }
  ];
}
function pe(o) {
  return {
    install() {
      b.runtimeDoms = o;
    }
  };
}
function me(o, e) {
  return e === "raw" && Object.defineProperty(o, "name", {
    value: `__proform_raw_${o.name}`,
    writable: !0
  }), o;
}
export {
  ce as ProForm,
  de as useForm,
  pe as useFormRenderer,
  me as useModifiers
};
