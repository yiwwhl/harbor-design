var H = Object.defineProperty;
var J = (o, e, t) => e in o ? H(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var l = (o, e, t) => (J(o, typeof e != "symbol" ? e + "" : e, t), t);
import { toRaw as j, isRef as G, watch as v, isReactive as K, nextTick as T, ref as w, reactive as Q, createVNode as m, withDirectives as $, mergeProps as C, vShow as q, createTextVNode as X, isVNode as Y, defineComponent as Z } from "vue";
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
function u(o, ...e) {
  return e.forEach((t) => {
    if (Array.isArray(t))
      Array.isArray(o) || (o = []), t.forEach((s, r) => {
        typeof s == "object" && s !== null ? o[r] = u(Array.isArray(s) ? [] : {}, s) : o[r] = s;
      });
    else
      for (let s in t)
        t.hasOwnProperty(s) && (typeof t[s] == "object" && t[s] !== null ? o[s] = u(o[s] || {}, t[s]) : o[s] = t[s]);
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
      for (let [n, c] of s)
        i.set(t(n), t(c));
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
class ee {
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
    return this.runtimeCore = e, this.formCustomization;
  }
  submit() {
    return new Promise((e, t) => {
      this.runtimeCore.formRef.value.validate((s) => s ? t(s) : e(
        this.cleanFallbackFields(
          j(this.runtimeCore.processor.processedModel.value)
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
        G(e) ? v(
          () => e.value,
          () => {
            u(this.runtimeCore.model.value, e.value);
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : K(e) ? v(
          () => e,
          () => {
            u(this.runtimeCore.model.value, e);
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : u(this.runtimeCore.model.value, e);
      },
      {
        lazy: !0
      }
    );
  }
  // TODO：目前仅用于配制一些基本的如 Form，FormItem 等 UI 库组件的默认属性，但后续会扩展其价值，包括设置统一布局等，都会考虑往内部封装
  customize(e) {
    Object.assign(this.runtimeCore.customizedOptions, e);
  }
}
class A {
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
class te {
  constructor(e) {
    l(this, "runtimeCore");
    l(this, "processedSchemas");
    l(this, "processedModel");
    l(this, "getRuntimeMeta");
    l(this, "stableSchemas", []);
    l(this, "stableModel", {});
    l(this, "schemaPreset", S.schemaPreset);
    l(this, "componentPropsPreset", S.componentPropsPreset);
    l(this, "stableUpdaterProcessProgress");
    l(this, "stableUpdaterTimes", 0);
    l(this, "schemaEffect", new A());
    l(this, "defaultValueEffect", new A());
    l(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    l(this, "baseDefaultValueFunctionsLength");
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
    a.isArrayEmpty(this.processedSchemas.value) && (this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
      y(e)
    ), this.processedSchemas.value = this.initSchemas(e)), this.parse(e, t);
  }
  parseStable(e) {
    const t = {};
    if (!a.isUndefined(e.stable))
      t[e.key] = this.parseStable(e.stable);
    else
      return e;
    return t;
  }
  // 对于稳定初始化更新的抽象
  stableUpdater(e = []) {
    if (e.every(Boolean)) {
      const t = j(this.processedSchemas.value);
      !a.isProcessInprogress(t) && a.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: t.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(t));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, t, s) {
    const r = this, i = Array.from({
      length: Object.keys(e).filter((c) => c !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: n });
    function n(c) {
      const f = c.index, p = c.key, I = c.keyIndex;
      if (!c.stable)
        return;
      const V = r.parseStable(c.stable), P = s == null ? void 0 : s.index, O = s == null ? void 0 : s.key;
      let d = V;
      if (a.isProcessInprogress(d) || (i[I] = !0), s) {
        let h = r.processedSchemas.value[P][O][f][p];
        h && a.isObject(h) && p !== "component" && (d = u(h, d)), r.processedSchemas.value[P][O][f][p] = d, r.stableUpdater(i);
      } else {
        let h = r.processedSchemas.value[f][p];
        h && a.isObject(h) && (d = u(h, d)), r.processedSchemas.value[f][p] = d, r.stableUpdater(i);
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
        const n = (c) => {
          e.updater({
            ...e,
            key: r,
            keyIndex: i,
            stable: c
          });
        };
        a.isFunction(t[r]) ? r !== "defaultValue" ? this.schemaEffect.trackEffect(() => {
          if (r === "component") {
            const c = t[r](this.getRuntimeMeta());
            this.promiseFieldParser(c, n, !1);
          } else
            this.fieldParser(t[r], n);
        }) : this.defaultValueEffect.trackEffect(() => {
          const c = this.schemaEffect.trackEffect(() => {
            /\{\s*model\s*\}/.test(t[r].toString()) ? this.fieldParser(t[r], (f) => {
              if (!f)
                return n(f);
              this.defaultValueInprogressMap.set(t[r], f), !a.isProcessInprogress(f) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(this.defaultValueInprogressMap.values()).every(
                (p) => !p.includes("undefined")
              ) ? (n(f), this.defaultValueEffect.clearEffects(), T(() => {
                c();
              })) : n(f);
            }) : this.fieldParser(t[r], (f) => {
              this.defaultValueInprogressMap.set(t[r], f), !a.isProcessInprogress(f) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(this.defaultValueInprogressMap.values()).every(
                (p) => !p.includes("undefined")
              ) ? (n(f), this.defaultValueEffect.clearEffects(), T(() => {
                c();
              })) : n(f);
            });
          });
        }) : r === "component" || r === "slots" ? this.promiseFieldParser(t[r], n, !1) : this.fieldParser(t[r], n);
      }
    });
  }
  replaceUndefinedInString(e, t) {
    return e.replace(/undefined/g, t);
  }
  promiseFieldParser(e, t, s) {
    a.isPromise(e) ? e.then((r) => {
      s && a.isObject(r) ? this.objectParser({
        data: r,
        updater: t
      }) : t(r);
    }) : (a.isString(e) && (e = this.replaceUndefinedInString(e, "")), s && a.isObject(e) ? this.objectParser({
      data: e,
      updater: t
    }) : t(e));
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(e, t, s = !0) {
    if (a.isFunction(e))
      if (e.name.startsWith("__proform_raw_"))
        t(e);
      else {
        const r = e(this.getRuntimeMeta());
        this.promiseFieldParser(r, t, s);
      }
    else
      G(e) ? v(
        () => e.value,
        () => {
          a.isUndefined(e.value) || (s && a.isObject(e.value) ? this.objectParser({
            data: e.value,
            updater: t
          }) : t(e.value));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : K(e) ? v(
        () => e,
        () => {
          a.isUndefined(e) || (s && a.isObject(e) ? this.objectParser({
            data: e,
            updater: t
          }) : t(e));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : s && a.isObject(e) ? this.objectParser({
        data: e,
        updater: t
      }) : t(e);
  }
  modelProcessor(e) {
    e.map(
      (t) => this.createModel(t, this.processedModel.value)
    ), a.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && (this.stableModel = y(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects());
  }
  createModel(e, t) {
    a.isListSchema(e) && (t[e.field] || (t[e.field] = [{}]), e.children.forEach((s) => {
      this.createModel(s, t[e.field][0]);
    })), a.isGroupSchema(e) && e.children.forEach((s) => {
      this.createModel(s, t);
    }), a.isItemSchema(e) && (t[e.field] = e.defaultValue);
  }
}
function se(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !Y(o);
}
class re {
  constructor(e) {
    l(this, "schemas", w([]));
    l(this, "model", w({}));
    l(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    l(this, "formRef", w(null));
    l(this, "hydrateEffect", new A());
    l(this, "customizedOptions", Q({}));
    l(this, "globalNativeFormOverride", {
      props: {},
      slots: {}
    });
    this.setup = e, this.processor = new te(this);
    const t = this.setup(this);
    this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    return {
      model: j(y(this.model.value))
    };
  }
  runtimeItemProcessor(e, t, s = this.model.value, r) {
    var h, z, F, M, x, U, D, N, k, R, _, L, B;
    u(this.globalNativeFormOverride.props, (z = (h = e.native) == null ? void 0 : h.props) == null ? void 0 : z.Form), u(this.globalNativeFormOverride.slots, (M = (F = e.native) == null ? void 0 : F.slots) == null ? void 0 : M.Form);
    const i = u(y((U = (x = this.customizedOptions.native) == null ? void 0 : x.props) == null ? void 0 : U.FormItem) ?? {}, (N = (D = e.native) == null ? void 0 : D.props) == null ? void 0 : N.FormItem), n = u(y((R = (k = this.customizedOptions.native) == null ? void 0 : k.slots) == null ? void 0 : R.FormItem) ?? {}, (L = (_ = e.native) == null ? void 0 : _.slots) == null ? void 0 : L.FormItem), c = r ? `${r.field}.${t}.${e.field}` : e.field, f = j(e.component);
    if (!f)
      return;
    const p = f.name, I = e.componentProps ?? {}, V = S.placeholderPresetByComponentName;
    let P = e.placeholder;
    if (P || (P = `${// @ts-expect-error
    V[p] ?? "请输入"}${e.label}`), e.required)
      if (!e.rules)
        e.rules = [], (B = e.rules) == null || B.push({
          required: !0,
          message: `${e.label}是必填项`
        });
      else {
        const E = e.rules.findIndex((W) => !!W.required);
        e.rules[E].message = `${e.label}是必填项`;
      }
    let d = e.show;
    return d === void 0 && (d = !0), d || delete s[e.field], m(b.runtimeDoms.Item, null, {
      default() {
        return $(m(b.runtimeDoms.FormItem, C(i, {
          label: `${e.label}:`,
          rules: e.rules,
          field: c
        }), {
          default() {
            return m(f, C({
              modelValue: s[e.field],
              "onUpdate:modelValue": (E) => s[e.field] = E,
              placeholder: P
            }, I), null);
          },
          ...n
        }), [[q, d]]);
      }
    });
  }
  runtimeGroupProcessor(e) {
    let t;
    return m(b.runtimeDoms.Group, {
      schema: e
    }, se(t = e.children.map((s) => this.runtimeItemProcessor(s))) ? t : {
      default: () => [t]
    });
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
    const t = this;
    return t.model.value[e.field] || (t.model.value[e.field] = [{}]), m(b.runtimeDoms.List, {
      schema: e
    }, {
      default() {
        return t.model.value[e.field].map((s, r) => m(b.runtimeDoms.ListItem, null, {
          default() {
            return e.children.map((i) => t.runtimeItemProcessor(i, r, s, e));
          },
          delete({
            container: i
          } = {}) {
            var c;
            let n = i ?? m("button", null, null);
            return $(m(n, {
              onClick: () => t.deleteListItem(e, r)
            }, null), [[q, ((c = t.model.value[e.field]) == null ? void 0 : c.length) > 1]]);
          }
        }));
      },
      add({
        container: s
      } = {}) {
        let r = s ?? m("button", null, [X("添加")]);
        return m(r, {
          onClick: () => t.addListItem(e)
        }, null);
      }
    });
  }
  runtimeProcessor(e) {
    return e.map((t) => (t.type || (t.type = "item"), this.processorBySchemaType[t.type](t)));
  }
  exec() {
    var r, i, n, c;
    const e = this, t = u(y((i = (r = this.customizedOptions.native) == null ? void 0 : r.props) == null ? void 0 : i.Form) ?? {}, this.globalNativeFormOverride.props), s = u(y((c = (n = this.customizedOptions.native) == null ? void 0 : n.slots) == null ? void 0 : c.Form) ?? {}, this.globalNativeFormOverride.slots);
    return m(b.runtimeDoms.Form, C(t, {
      ref: this.formRef,
      model: this.model.value
    }), {
      default() {
        return e.runtimeProcessor(e.schemas.value);
      },
      ...s
    });
  }
}
class b {
}
l(b, "runtimeDoms");
const g = class g {
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
l(g, "schemaPreset", {
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
  native: void 0
}), l(g, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
l(g, "placeholderPresetByComponentName", g.getPlaceholderPrefixPresetByComponentName());
let S = g;
const ne = /* @__PURE__ */ Z({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(o) {
    const e = new re(o.setup);
    return () => e.exec();
  }
});
function le(o) {
  const e = new ee(o);
  return [
    e.setup.bind(e),
    {
      submit: e.submit.bind(e),
      hydrate: e.hydrate.bind(e),
      customize: e.customize.bind(e)
    }
  ];
}
function ce(o) {
  return {
    install() {
      b.runtimeDoms = o;
    }
  };
}
function ae(o, e) {
  return e === "raw" && Object.defineProperty(o, "name", {
    value: `__proform_raw_${o.name}`,
    writable: !0
  }), o;
}
export {
  ne as ProForm,
  le as useForm,
  ce as useFormRenderer,
  ae as useModifiers
};
