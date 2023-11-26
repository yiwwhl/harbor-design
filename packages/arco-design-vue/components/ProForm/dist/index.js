var x = Object.defineProperty;
var D = (l, e, t) => e in l ? x(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t;
var o = (l, e, t) => (D(l, typeof e != "symbol" ? e + "" : e, t), t);
import { toRaw as S, watch as E, isRef as M, isReactive as U, ref as I, createVNode as d, withDirectives as v, mergeProps as R, vShow as O, createTextVNode as k, isVNode as L, defineComponent as F } from "vue";
class B {
  constructor(e) {
    o(this, "runtimeCore");
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
          S(this.runtimeCore.processor.processedModel.value)
        )
      ));
    });
  }
}
class u {
  static typeChecker(e) {
    return {}.toString.call(e);
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
function V(l) {
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
  return t(l);
}
class C {
  constructor() {
    o(this, "effects", /* @__PURE__ */ new Set());
  }
  clearEffects() {
    this.effects.clear();
  }
  triggerEffects() {
    Array.from(this.effects).forEach((e) => e());
  }
  trackEffect(e) {
    return e(), this.effects.add(e), () => this.effects.delete(e);
  }
}
class N {
  constructor(e) {
    o(this, "processedSchemas");
    o(this, "processedModel");
    o(this, "getRuntimeMeta");
    o(this, "stableSchemas", []);
    o(this, "stableModel", {});
    o(this, "schemaPreset", j.schemaPreset);
    o(this, "componentPropsPreset", j.componentPropsPreset);
    o(this, "stableUpdaterProcessProgress");
    o(this, "stableUpdaterTimes", 0);
    o(this, "schemaEffect", new C());
    o(this, "defaultValueEffect", new C());
    o(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    o(this, "baseDefaultValueFunctionsLength");
    this.processedSchemas = e.schemas, this.processedModel = e.model, this.getRuntimeMeta = e.getRuntimeMeta.bind(e), E(
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
          i.hasOwnProperty(n) && (n === "defaultValue" && typeof i[n] == "function" && t++, r(i[n]));
      }
    }
    return r(e), t;
  }
  // 派生过程，用于外部应用
  parseSchemas(e, t) {
    u.isArrayEmpty(this.processedSchemas.value) && (this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
      V(e)
    ), this.processedSchemas.value = this.initSchemas(e)), this.parse(e, t);
  }
  parseStable(e) {
    const t = {};
    if (!u.isUndefined(e.stable))
      t[e.key] = this.parseStable(e.stable);
    else
      return e;
    return t;
  }
  // 对于稳定初始化更新的抽象
  stableUpdater(e = []) {
    if (e.every(Boolean)) {
      const t = S(this.processedSchemas.value);
      !u.isProcessInprogress(t) && u.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
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
      const f = c.index, a = c.key, P = c.keyIndex;
      if (!c.stable)
        return;
      const w = r.parseStable(c.stable), m = s == null ? void 0 : s.index, g = s == null ? void 0 : s.key;
      let p = w;
      if (u.isProcessInprogress(p) || (i[P] = !0), s) {
        let b = r.processedSchemas.value[m][g][f][a];
        b && u.isObject(b) && a !== "component" && (p = Object.assign(b, p)), r.processedSchemas.value[m][g][f][a] = p, r.stableUpdater(i);
      } else {
        let b = r.processedSchemas.value[f][a];
        b && u.isObject(b) && (p = Object.assign(b, p)), r.processedSchemas.value[f][a] = p, r.stableUpdater(i);
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
        if (u.isFunction(t[r]))
          r !== "defaultValue" ? this.schemaEffect.trackEffect(() => {
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
                this.defaultValueInprogressMap.set(t[r], f), !u.isProcessInprogress(f) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(this.defaultValueInprogressMap.values()).every(
                  (a) => !a.includes("undefined")
                ) ? (n(f), this.defaultValueEffect.clearEffects(), c()) : n(f);
              }) : this.fieldParser(t[r], (f) => {
                this.defaultValueInprogressMap.set(t[r], f), !u.isProcessInprogress(f) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(this.defaultValueInprogressMap.values()).every(
                  (a) => !a.includes("undefined")
                ) ? (n(f), this.defaultValueEffect.clearEffects(), c()) : n(f);
              });
            });
          });
        else if (r === "component") {
          const c = t[r];
          this.promiseFieldParser(c, n, !1);
        } else
          this.fieldParser(t[r], n);
      }
    });
  }
  promiseFieldParser(e, t, s) {
    u.isPromise(e) ? e.then((r) => {
      s && u.isObject(r) ? this.objectParser({
        data: r,
        updater: t
      }) : t(r);
    }) : s && u.isObject(e) ? this.objectParser({
      data: e,
      updater: t
    }) : t(e);
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(e, t, s = !0) {
    if (u.isFunction(e)) {
      const r = e(this.getRuntimeMeta());
      this.promiseFieldParser(r, t, s);
    } else
      M(e) ? E(
        () => e.value,
        () => {
          u.isUndefined(e.value) || (s && u.isObject(e.value) ? this.objectParser({
            data: e.value,
            updater: t
          }) : t(e.value));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : U(e) ? E(
        () => e,
        () => {
          u.isUndefined(e) || (s && u.isObject(e) ? this.objectParser({
            data: e,
            updater: t
          }) : t(e));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : s && u.isObject(e) ? this.objectParser({
        data: e,
        updater: t
      }) : t(e);
  }
  modelProcessor(e) {
    e.map(
      (t) => this.createModel(t, this.processedModel.value)
    ), u.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && (this.stableModel = V(this.processedModel.value));
  }
  createModel(e, t) {
    u.isListSchema(e) && (t[e.field] || (t[e.field] = [{}]), e.children.forEach((s) => {
      this.createModel(s, t[e.field][0]);
    })), u.isGroupSchema(e) && e.children.forEach((s) => {
      this.createModel(s, t);
    }), u.isItemSchema(e) && (t[e.field] = e.defaultValue);
  }
}
function A(l) {
  return typeof l == "function" || Object.prototype.toString.call(l) === "[object Object]" && !L(l);
}
class T {
  constructor(e) {
    o(this, "schemas", I([]));
    o(this, "model", I({}));
    o(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    o(this, "formRef", I(null));
    this.setup = e, this.processor = new N(this);
    const t = this.setup(this);
    this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    return {
      model: S(V(this.model.value))
    };
  }
  runtimeItemProcessor(e, t, s = this.model.value, r) {
    var g;
    const i = r ? `${r.field}.${t}.${e.field}` : e.field, n = S(e.component);
    if (!n)
      return;
    const c = n.name, f = e.componentProps ?? {}, a = j.placeholderPresetByComponentName;
    let P = e.placeholder;
    P || (P = `${// @ts-expect-error
    a[c] ?? "请输入"}${e.label}`), e.required && (e.rules || (e.rules = []), (g = e.rules) == null || g.push({
      required: !0,
      message: `${e.label}是必填项`
    }));
    let m = e.show;
    return m === void 0 && (m = !0), m || delete s[e.field], d(h.runtimeDoms.Item, null, {
      default() {
        return v(d(h.runtimeDoms.FormItem, {
          label: `${e.label}:`,
          rules: e.rules,
          field: i
        }, {
          default: () => [d(n, R({
            modelValue: s[e.field],
            "onUpdate:modelValue": (p) => s[e.field] = p,
            placeholder: P
          }, f), null)]
        }), [[O, m]]);
      }
    });
  }
  runtimeGroupProcessor(e) {
    let t;
    return d(h.runtimeDoms.Group, {
      schema: e
    }, A(t = e.children.map((s) => this.runtimeItemProcessor(s))) ? t : {
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
    (s = this.processor.stableModel[e.field]) != null && s[0] && this.model.value[e.field].push(V(this.processor.stableModel[e.field][0]));
  }
  deleteListItem(e, t) {
    this.model.value[e.field].splice(t, 1);
  }
  runtimeListProcessor(e) {
    const t = this;
    return t.model.value[e.field] || (t.model.value[e.field] = [{}]), d(h.runtimeDoms.List, {
      schema: e
    }, {
      default() {
        return t.model.value[e.field].map((s, r) => d(h.runtimeDoms.ListItem, null, {
          default() {
            return e.children.map((i, n) => t.runtimeItemProcessor(i, n, s, e));
          },
          delete({
            container: i
          } = {}) {
            var c;
            let n = i ?? d("button", null, null);
            return v(d(n, {
              onClick: () => t.deleteListItem(e, r)
            }, null), [[O, ((c = t.model.value[e.field]) == null ? void 0 : c.length) > 1]]);
          }
        }));
      },
      add({
        container: s
      } = {}) {
        let r = s ?? d("button", null, [k("添加")]);
        return d(r, {
          onClick: () => t.addListItem(e)
        }, null);
      }
    });
  }
  runtimeProcessor(e) {
    return e.map((t) => (t.type || (t.type = "item"), this.processorBySchemaType[t.type](t)));
  }
  exec() {
    let e;
    return d(h.runtimeDoms.Form, {
      ref: this.formRef,
      model: this.model.value
    }, A(e = this.runtimeProcessor(this.schemas.value)) ? e : {
      default: () => [e]
    });
  }
}
class h {
}
o(h, "runtimeDoms");
const y = class y {
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
o(y, "schemaPreset", {
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
  }
}), o(y, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
o(y, "placeholderPresetByComponentName", y.getPlaceholderPrefixPresetByComponentName());
let j = y;
const $ = /* @__PURE__ */ F({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(l) {
    const e = new T(l.setup);
    return () => e.exec();
  }
});
function q(l) {
  const e = new B(l);
  return [
    e.setup.bind(e),
    {
      submit: e.submit.bind(e)
    }
  ];
}
function G(l) {
  return {
    install() {
      h.runtimeDoms = l;
    }
  };
}
export {
  $ as ProForm,
  q as useForm,
  G as useFormRenderer
};
