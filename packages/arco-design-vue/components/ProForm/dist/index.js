var A = Object.defineProperty;
var U = (o, e, t) => e in o ? A(o, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : o[e] = t;
var c = (o, e, t) => (U(o, typeof e != "symbol" ? e + "" : e, t), t);
import { toRaw as S, watch as E, isRef as R, isReactive as M, ref as I, createVNode as d, withDirectives as O, mergeProps as k, vShow as v, createTextVNode as D, isVNode as B, defineComponent as L } from "vue";
class N {
  constructor(e) {
    c(this, "runtimeCore");
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
class f {
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
function V(o) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(s) {
    if (s === null || typeof s != "object")
      return s;
    if (s instanceof Date)
      return new Date(s);
    if (s instanceof RegExp)
      return new RegExp(s);
    if (s instanceof Map) {
      const n = /* @__PURE__ */ new Map();
      for (let [i, l] of s)
        n.set(t(i), t(l));
      return n;
    }
    if (s instanceof Set) {
      const n = /* @__PURE__ */ new Set();
      for (let i of s)
        n.add(t(i));
      return n;
    }
    if (e.has(s))
      return e.get(s);
    if (Array.isArray(s)) {
      const n = [];
      e.set(s, n);
      for (let i = 0; i < s.length; i++)
        n[i] = t(s[i]);
      return n;
    }
    const r = Object.create(Object.getPrototypeOf(s));
    e.set(s, r);
    for (let n in s)
      s.hasOwnProperty(n) && (r[n] = t(s[n]));
    return r;
  }
  return t(o);
}
class C {
  constructor() {
    c(this, "effects", /* @__PURE__ */ new Set());
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
class T {
  constructor(e) {
    c(this, "processedSchemas");
    c(this, "processedModel");
    c(this, "getRuntimeMeta");
    c(this, "stableSchemas", []);
    c(this, "stableModel", {});
    c(this, "schemaPreset", j.schemaPreset);
    c(this, "componentPropsPreset", j.componentPropsPreset);
    c(this, "stableUpdaterProcessProgress");
    c(this, "stableUpdaterTimes", 0);
    c(this, "schemaEffect", new C());
    c(this, "defaultValueEffect", new C());
    c(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
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
  // 派生过程，用于外部应用
  parseSchemas(e, t) {
    f.isArrayEmpty(this.processedSchemas.value) && (this.processedSchemas.value = this.initSchemas(e)), this.parse(e, t);
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
      const t = S(this.processedSchemas.value);
      !f.isProcessInprogress(t) && f.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: t.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(t));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, t, s) {
    const r = this, n = Array.from({
      length: Object.keys(e).filter((l) => l !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: i });
    function i(l) {
      const u = l.index, a = l.key, y = l.keyIndex;
      if (!l.stable)
        return;
      const w = r.parseStable(l.stable), m = s == null ? void 0 : s.index, g = s == null ? void 0 : s.key;
      let p = w;
      if (f.isProcessInprogress(p) || (n[y] = !0), s) {
        let b = r.processedSchemas.value[m][g][u][a];
        b && f.isObject(b) && a !== "component" && (p = Object.assign(b, p)), r.processedSchemas.value[m][g][u][a] = p, r.stableUpdater(n);
      } else {
        let b = r.processedSchemas.value[u][a];
        b && f.isObject(b) && (p = Object.assign(b, p)), r.processedSchemas.value[u][a] = p, r.stableUpdater(n);
      }
    }
  }
  // 只做基本的对象 parser
  objectParser(e) {
    const t = e.data;
    Object.keys(t).forEach((r, n) => {
      if (r === "children")
        this.parseSchemas(t[r], {
          ...e,
          key: r,
          keyIndex: n
        });
      else {
        const i = (l) => {
          e.updater({
            ...e,
            key: r,
            keyIndex: n,
            stable: l
          });
        };
        if (f.isFunction(t[r]))
          r !== "defaultValue" ? this.schemaEffect.trackEffect(() => {
            if (r === "component") {
              const l = t[r](this.getRuntimeMeta());
              this.promiseFieldParser(l, i, !1);
            } else
              this.fieldParser(t[r], i);
          }) : this.defaultValueEffect.trackEffect(() => {
            const l = this.schemaEffect.trackEffect(() => {
              /\{\s*model\s*\}/.test(t[r].toString()) ? this.fieldParser(t[r], (u) => {
                if (!u)
                  return i(u);
                this.defaultValueInprogressMap.set(t[r], u), !f.isProcessInprogress(u) && Array.from(this.defaultValueInprogressMap.values()).every(
                  (a) => !a.includes("undefined")
                ) ? (i(u), this.defaultValueEffect.clearEffects(), l()) : i(u);
              }) : this.fieldParser(t[r], (u) => {
                !f.isProcessInprogress(u) && Array.from(this.defaultValueInprogressMap.values()).every(
                  (a) => !a.includes("undefined")
                ) ? (i(u), this.defaultValueEffect.clearEffects(), l()) : i(u);
              });
            });
          });
        else if (r === "component") {
          const l = t[r];
          this.promiseFieldParser(l, i, !1);
        } else
          this.fieldParser(t[r], i);
      }
    });
  }
  promiseFieldParser(e, t, s) {
    f.isPromise(e) ? e.then((r) => {
      s && f.isObject(r) ? this.objectParser({
        data: r,
        updater: t
      }) : t(r);
    }) : s && f.isObject(e) ? this.objectParser({
      data: e,
      updater: t
    }) : t(e);
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(e, t, s = !0) {
    if (f.isFunction(e)) {
      const r = e(this.getRuntimeMeta());
      this.promiseFieldParser(r, t, s);
    } else
      R(e) ? E(
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
      ) : M(e) ? E(
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
    ), f.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && (this.stableModel = V(this.processedModel.value));
  }
  createModel(e, t) {
    f.isListSchema(e) && (t[e.field] || (t[e.field] = [{}]), e.children.forEach((s) => {
      this.createModel(s, t[e.field][0]);
    })), f.isGroupSchema(e) && e.children.forEach((s) => {
      this.createModel(s, t);
    }), f.isItemSchema(e) && (t[e.field] = e.defaultValue);
  }
}
function x(o) {
  return typeof o == "function" || Object.prototype.toString.call(o) === "[object Object]" && !B(o);
}
class _ {
  constructor(e) {
    c(this, "schemas", I([]));
    c(this, "model", I({}));
    c(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    c(this, "formRef", I(null));
    this.setup = e, this.processor = new T(this);
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
    const n = r ? `${r.field}.${t}.${e.field}` : e.field, i = S(e.component);
    if (!i)
      return;
    const l = i.name, u = e.componentProps ?? {}, a = j.placeholderPresetByComponentName;
    let y = e.placeholder;
    y || (y = `${// @ts-expect-error
    a[l] ?? "请输入"}${e.label}`), e.required && (e.rules || (e.rules = []), (g = e.rules) == null || g.push({
      required: !0,
      message: `${e.label}是必填项`
    }));
    let m = e.show;
    return m === void 0 && (m = !0), m || delete s[e.field], d(h.runtimeDoms.Item, null, {
      default() {
        return O(d(h.runtimeDoms.FormItem, {
          label: `${e.label}:`,
          rules: e.rules,
          field: n
        }, {
          default: () => [d(i, k({
            modelValue: s[e.field],
            "onUpdate:modelValue": (p) => s[e.field] = p,
            placeholder: y
          }, u), null)]
        }), [[v, m]]);
      }
    });
  }
  runtimeGroupProcessor(e) {
    let t;
    return d(h.runtimeDoms.Group, {
      schema: e
    }, x(t = e.children.map((s) => this.runtimeItemProcessor(s))) ? t : {
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
            return e.children.map((n, i) => t.runtimeItemProcessor(n, i, s, e));
          },
          delete({
            container: n
          } = {}) {
            var l;
            let i = n ?? d("button", null, null);
            return O(d(i, {
              onClick: () => t.deleteListItem(e, r)
            }, null), [[v, ((l = t.model.value[e.field]) == null ? void 0 : l.length) > 1]]);
          }
        }));
      },
      add({
        container: s
      } = {}) {
        let r = s ?? d("button", null, [D("添加")]);
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
    }, x(e = this.runtimeProcessor(this.schemas.value)) ? e : {
      default: () => [e]
    });
  }
}
class h {
}
c(h, "runtimeDoms");
const P = class P {
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
c(P, "schemaPreset", {
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
}), c(P, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
c(P, "placeholderPresetByComponentName", P.getPlaceholderPrefixPresetByComponentName());
let j = P;
const z = /* @__PURE__ */ L({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(o) {
    const e = new _(o.setup);
    return () => e.exec();
  }
});
function F(o) {
  const e = new N(o);
  return [
    e.setup.bind(e),
    {
      submit: e.submit.bind(e)
    }
  ];
}
function G(o) {
  return {
    install() {
      h.runtimeDoms = o;
    }
  };
}
export {
  z as ProForm,
  F as useForm,
  G as useFormRenderer
};
