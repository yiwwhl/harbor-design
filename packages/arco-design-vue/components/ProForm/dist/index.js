var R = Object.defineProperty;
var U = (l, e, t) => e in l ? R(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t;
var o = (l, e, t) => (U(l, typeof e != "symbol" ? e + "" : e, t), t);
import { toRaw as V, isRef as D, watch as E, isReactive as M, ref as I, createVNode as h, withDirectives as O, mergeProps as k, vShow as A, createTextVNode as L, isVNode as F, defineComponent as z } from "vue";
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
function S(l, ...e) {
  return e.forEach((t) => {
    for (let s in t)
      t.hasOwnProperty(s) && (typeof t[s] == "object" && t[s] !== null ? (l[s] = l[s] || {}, S(l[s], t[s])) : l[s] = t[s]);
  }), l;
}
function v(l) {
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
class $ {
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
          V(this.runtimeCore.processor.processedModel.value)
        )
      ));
    });
  }
  hydrate(e) {
    this.runtimeCore.hydrateEffect.trackEffect(
      () => {
        D(e) ? E(
          () => e.value,
          () => {
            S(this.runtimeCore.model.value, e.value);
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : M(e) ? E(
          () => e,
          () => {
            S(this.runtimeCore.model.value, e);
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : S(this.runtimeCore.model.value, e);
      },
      {
        lazy: !0
      }
    );
  }
}
class w {
  constructor() {
    o(this, "effects", /* @__PURE__ */ new Set());
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
class B {
  constructor(e) {
    o(this, "runtimeCore");
    o(this, "processedSchemas");
    o(this, "processedModel");
    o(this, "getRuntimeMeta");
    o(this, "stableSchemas", []);
    o(this, "stableModel", {});
    o(this, "schemaPreset", j.schemaPreset);
    o(this, "componentPropsPreset", j.componentPropsPreset);
    o(this, "stableUpdaterProcessProgress");
    o(this, "stableUpdaterTimes", 0);
    o(this, "schemaEffect", new w());
    o(this, "defaultValueEffect", new w());
    o(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    o(this, "baseDefaultValueFunctionsLength");
    this.runtimeCore = e, this.processedSchemas = e.schemas, this.processedModel = e.model, this.getRuntimeMeta = e.getRuntimeMeta.bind(e), E(
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
      v(e)
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
      const t = V(this.processedSchemas.value);
      !f.isProcessInprogress(t) && f.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
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
      const u = c.index, d = c.key, P = c.keyIndex;
      if (!c.stable)
        return;
      const C = r.parseStable(c.stable), y = s == null ? void 0 : s.index, g = s == null ? void 0 : s.key;
      let a = C;
      if (f.isProcessInprogress(a) || (i[P] = !0), s) {
        let p = r.processedSchemas.value[y][g][u][d];
        p && f.isObject(p) && d !== "component" && (a = Object.assign(p, a)), r.processedSchemas.value[y][g][u][d] = a, r.stableUpdater(i);
      } else {
        let p = r.processedSchemas.value[u][d];
        p && f.isObject(p) && (a = Object.assign(p, a)), r.processedSchemas.value[u][d] = a, r.stableUpdater(i);
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
        if (f.isFunction(t[r]))
          r !== "defaultValue" ? this.schemaEffect.trackEffect(() => {
            if (r === "component") {
              const c = t[r](this.getRuntimeMeta());
              this.promiseFieldParser(c, n, !1);
            } else
              this.fieldParser(t[r], n);
          }) : this.defaultValueEffect.trackEffect(() => {
            const c = this.schemaEffect.trackEffect(() => {
              /\{\s*model\s*\}/.test(t[r].toString()) ? this.fieldParser(t[r], (u) => {
                if (!u)
                  return n(u);
                this.defaultValueInprogressMap.set(t[r], u), !f.isProcessInprogress(u) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(this.defaultValueInprogressMap.values()).every(
                  (d) => !d.includes("undefined")
                ) ? (n(u), this.defaultValueEffect.clearEffects(), c()) : n(u);
              }) : this.fieldParser(t[r], (u) => {
                this.defaultValueInprogressMap.set(t[r], u), !f.isProcessInprogress(u) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(this.defaultValueInprogressMap.values()).every(
                  (d) => !d.includes("undefined")
                ) ? (n(u), this.defaultValueEffect.clearEffects(), c()) : n(u);
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
      D(e) ? E(
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
    ), f.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && (this.stableModel = v(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects());
  }
  createModel(e, t) {
    f.isListSchema(e) && (t[e.field] || (t[e.field] = [{}]), e.children.forEach((s) => {
      this.createModel(s, t[e.field][0]);
    })), f.isGroupSchema(e) && e.children.forEach((s) => {
      this.createModel(s, t);
    }), f.isItemSchema(e) && (t[e.field] = e.defaultValue);
  }
}
function x(l) {
  return typeof l == "function" || Object.prototype.toString.call(l) === "[object Object]" && !F(l);
}
class q {
  constructor(e) {
    o(this, "schemas", I([]));
    o(this, "model", I({}));
    o(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    o(this, "formRef", I(null));
    o(this, "hydrateEffect", new w());
    this.setup = e, this.processor = new B(this);
    const t = this.setup(this);
    this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    return {
      model: V(v(this.model.value))
    };
  }
  runtimeItemProcessor(e, t, s = this.model.value, r) {
    var g;
    const i = r ? `${r.field}.${t}.${e.field}` : e.field, n = V(e.component);
    if (!n)
      return;
    const c = n.name, u = e.componentProps ?? {}, d = j.placeholderPresetByComponentName;
    let P = e.placeholder;
    if (P || (P = `${// @ts-expect-error
    d[c] ?? "请输入"}${e.label}`), e.required) {
      e.rules || (e.rules = []);
      const a = e.rules.findIndex((p) => !!p.required);
      a === -1 ? (g = e.rules) == null || g.push({
        required: !0,
        message: `${e.label}是必填项`
      }) : e.rules.splice(a, 1, {
        required: !0,
        message: `${e.label}是必填项`
      });
    }
    let y = e.show;
    return y === void 0 && (y = !0), y || delete s[e.field], h(m.runtimeDoms.Item, null, {
      default() {
        return O(h(m.runtimeDoms.FormItem, {
          label: `${e.label}:`,
          rules: e.rules,
          field: i
        }, {
          default: () => [h(n, k({
            modelValue: s[e.field],
            "onUpdate:modelValue": (a) => s[e.field] = a,
            placeholder: P
          }, u), null)]
        }), [[A, y]]);
      }
    });
  }
  runtimeGroupProcessor(e) {
    let t;
    return h(m.runtimeDoms.Group, {
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
    (s = this.processor.stableModel[e.field]) != null && s[0] && this.model.value[e.field].push(v(this.processor.stableModel[e.field][0]));
  }
  deleteListItem(e, t) {
    this.model.value[e.field].splice(t, 1);
    const s = e.children.map(({
      field: r
    }) => `${e.field}.${t}.${r}`);
    this.formRef.value.clearValidate(s);
  }
  runtimeListProcessor(e) {
    const t = this;
    return t.model.value[e.field] || (t.model.value[e.field] = [{}]), h(m.runtimeDoms.List, {
      schema: e
    }, {
      default() {
        return t.model.value[e.field].map((s, r) => h(m.runtimeDoms.ListItem, null, {
          default() {
            return e.children.map((i) => t.runtimeItemProcessor(i, r, s, e));
          },
          delete({
            container: i
          } = {}) {
            var c;
            let n = i ?? h("button", null, null);
            return O(h(n, {
              onClick: () => t.deleteListItem(e, r)
            }, null), [[A, ((c = t.model.value[e.field]) == null ? void 0 : c.length) > 1]]);
          }
        }));
      },
      add({
        container: s
      } = {}) {
        let r = s ?? h("button", null, [L("添加")]);
        return h(r, {
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
    return h(m.runtimeDoms.Form, {
      ref: this.formRef,
      model: this.model.value
    }, x(e = this.runtimeProcessor(this.schemas.value)) ? e : {
      default: () => [e]
    });
  }
}
class m {
}
o(m, "runtimeDoms");
const b = class b {
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
o(b, "schemaPreset", {
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
}), o(b, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
o(b, "placeholderPresetByComponentName", b.getPlaceholderPrefixPresetByComponentName());
let j = b;
const _ = /* @__PURE__ */ z({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(l) {
    const e = new q(l.setup);
    return () => e.exec();
  }
});
function G(l) {
  const e = new $(l);
  return [
    e.setup.bind(e),
    {
      submit: e.submit.bind(e),
      hydrate: e.hydrate.bind(e)
    }
  ];
}
function K(l) {
  return {
    install() {
      m.runtimeDoms = l;
    }
  };
}
export {
  _ as ProForm,
  G as useForm,
  K as useFormRenderer
};
