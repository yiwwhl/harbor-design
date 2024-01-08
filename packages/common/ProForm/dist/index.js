var re = Object.defineProperty;
var ie = (r, e, t) => e in r ? re(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var a = (r, e, t) => (ie(r, typeof e != "symbol" ? e + "" : e, t), t);
import { isRef as x, watch as I, isReactive as z, toRaw as j, nextTick as w, ref as q, reactive as oe, createVNode as p, mergeProps as R, withDirectives as ne, vShow as le, createTextVNode as ae, isVNode as ue, defineComponent as ce } from "vue";
class l {
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
function m(r, ...e) {
  return e.forEach((t) => {
    if (Array.isArray(t))
      Array.isArray(r) || (r = []), t.forEach((s, i) => {
        typeof s == "object" && s !== null ? r[i] = m(Array.isArray(s) ? [] : {}, s) : r[i] = s;
      });
    else
      for (const s in t)
        t.hasOwnProperty(s) && (typeof t[s] == "object" && t[s] !== null ? r[s] = m(r[s] || {}, t[s]) : r[s] = t[s]);
  }), r;
}
function g(r) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(s) {
    if (s === null || typeof s != "object")
      return s;
    if (s instanceof Date)
      return new Date(s);
    if (s instanceof RegExp)
      return new RegExp(s);
    if (s instanceof Map) {
      const o = /* @__PURE__ */ new Map();
      for (const [n, u] of s)
        o.set(t(n), t(u));
      return o;
    }
    if (s instanceof Set) {
      const o = /* @__PURE__ */ new Set();
      for (const n of s)
        o.add(t(n));
      return o;
    }
    if (e.has(s))
      return e.get(s);
    if (Array.isArray(s)) {
      const o = [];
      e.set(s, o);
      for (let n = 0; n < s.length; n++)
        o[n] = t(s[n]);
      return o;
    }
    const i = Object.create(Object.getPrototypeOf(s));
    e.set(s, i);
    for (const o in s)
      s.hasOwnProperty(o) && (i[o] = t(s[o]));
    return i;
  }
  return t(r);
}
function U(r, e) {
  return r.replace(/undefined/g, e);
}
class fe {
  constructor(e) {
    a(this, "runtimeCore");
    this.formCustomization = e;
  }
  // happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
  cleanFallbackFields(e) {
    return e !== null && typeof e == "object" && (delete e.__yiwwhl_async_field_fallback, Object.values(e).forEach((t) => {
      this.cleanFallbackFields(t);
    })), e;
  }
  setup(e) {
    return this.runtimeCore = e, Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var s;
    const e = (s = f.presets.uiPresets[this.runtimeCore.ui]) == null ? void 0 : s.adapter, t = b.adapters[this.runtimeCore.ui];
    return (e == null ? void 0 : e.validateForm(this)) ?? (t == null ? void 0 : t.validateForm(this));
  }
  hydrate(e) {
    if (!this.runtimeCore)
      return Promise.reject({
        code: "0002",
        message: "hydrate 使用时机错误，建议将 hydrate 操作放到 onMounted 等页面节点挂载完成的钩子中，或者使用响应式的值来注入数据"
      });
    this.runtimeCore.hydrateEffect.trackEffect(
      () => {
        x(e) ? I(
          () => e.value,
          () => {
            m(this.runtimeCore.model.value, e.value);
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : z(e) ? I(
          () => e,
          () => {
            m(this.runtimeCore.model.value, e);
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : m(this.runtimeCore.model.value, e);
      },
      {
        lazy: !0
      }
    );
  }
}
class N {
  constructor() {
    a(this, "effects", /* @__PURE__ */ new Set());
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
    return !t.lazy && e(), this.effects.add(e), () => this.effects.delete(e);
  }
}
class de {
  constructor(e) {
    a(this, "runtimeCore");
    a(this, "processedSchemas");
    a(this, "processedModel");
    a(this, "getRuntimeMeta");
    a(this, "stableSchemas", []);
    a(this, "stableModel", {});
    a(this, "schemaPreset", b.schemaPreset);
    a(this, "componentPropsPreset", b.componentPropsPreset);
    a(this, "stableUpdaterProcessProgress");
    a(this, "stableUpdaterTimes", 0);
    a(this, "schemaEffect", new N());
    a(this, "defaultValueEffect", new N());
    a(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    a(this, "baseDefaultValueFunctionsLength");
    a(this, "isModelInitialized", !0);
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
    e.forEach((s, i) => {
      this.parseItem(s, i, t);
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
    let t = 0;
    const s = /* @__PURE__ */ new Set();
    function i(o) {
      if (!s.has(o) && (Array.isArray(o) || o !== null && typeof o == "object")) {
        s.add(o);
        for (const n in o)
          o.hasOwnProperty(n) && (n === "defaultValue" && typeof o[n] == "function" && !o[n].toString().includes("[native code]") && t++, i(o[n]));
      }
    }
    return i(e), t;
  }
  // 派生过程，用于外部应用
  parseSchemas(e, t) {
    l.isArrayEmpty(this.processedSchemas.value) && (this.baseDefaultValueFunctionsLength = this.countFunctionDefaultValues(
      g(e)
    ), this.processedSchemas.value = this.initSchemas(e)), this.parse(e, t);
  }
  parseStable(e) {
    const t = {};
    if (!l.isUndefined(e.stable))
      t[e.key] = this.parseStable(e.stable);
    else
      return e;
    return t;
  }
  // 对于稳定初始化更新的抽象
  stableUpdater(e = []) {
    if (e.every(Boolean)) {
      const t = j(this.processedSchemas.value);
      !l.isProcessInprogress(t) && l.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: t.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(t));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, t, s) {
    const i = this, o = Array.from({
      length: Object.keys(e).filter((u) => u !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: n });
    function n(u) {
      const c = u.index, d = u.key, y = u.keyIndex;
      if (l.isUndefined(u.stable))
        return;
      const O = i.parseStable(u.stable), C = s == null ? void 0 : s.index, v = s == null ? void 0 : s.key;
      let P = O;
      if (l.isProcessInprogress(P) || (o[y] = !0), s) {
        const h = i.processedSchemas.value[C][v][c][d];
        h && l.isObject(h) && d !== "component" && (P = m(h, P)), i.processedSchemas.value[C][v][c][d] = P, i.stableUpdater(o);
      } else {
        const h = i.processedSchemas.value[c][d];
        h && l.isObject(h) && d !== "component" && (P = m(h, P)), i.processedSchemas.value[c][d] = P, i.stableUpdater(o);
      }
    }
  }
  // 只做基本的对象 parser
  objectParser(e) {
    const t = e.data;
    Object.keys(t).forEach((i, o) => {
      if (i === "children")
        this.parseSchemas(t[i], {
          ...e,
          key: i,
          keyIndex: o
        });
      else {
        const n = (u) => {
          e.updater({
            ...e,
            key: i,
            keyIndex: o,
            stable: u
          });
        };
        l.isFunction(t[i]) ? i !== "defaultValue" ? this.schemaEffect.trackEffect(
          () => {
            if (i === "component") {
              const u = t[i](this.getRuntimeMeta());
              this.promiseFieldParser(u, n, !1);
            } else
              this.fieldParser(t[i], n);
          },
          {
            lazy: !1
          }
        ) : this.defaultValueEffect.trackEffect(
          () => {
            const u = this.schemaEffect.trackEffect(() => {
              /\{\s*model\s*\}/.test(t[i].toString()) ? this.fieldParser(t[i], (c) => {
                if (!c)
                  return n(c);
                this.defaultValueInprogressMap.set(t[i], c), !l.isProcessInprogress(c) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                  this.defaultValueInprogressMap.values()
                ).every((d) => !d.includes("undefined")) ? (n(c), this.defaultValueEffect.clearEffects(), w(() => {
                  u();
                })) : n(c);
              }) : this.fieldParser(t[i], (c) => {
                this.defaultValueInprogressMap.set(t[i], c), !l.isProcessInprogress(c) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                  this.defaultValueInprogressMap.values()
                ).every((d) => !d.includes("undefined")) ? (n(c), this.defaultValueEffect.clearEffects(), w(() => {
                  u();
                })) : n(c);
              });
            });
          },
          {
            lazy: !1
          }
        ) : i === "component" || i === "slots" || i === "runtime" ? this.promiseFieldParser(t[i], n, !1) : this.fieldParser(t[i], n);
      }
    });
  }
  promiseFieldParser(e, t, s) {
    l.isPromise(e) ? e.then((i) => {
      l.isString(i) && (i = U(i, "")), s && l.isObject(i) ? this.objectParser({
        data: i,
        updater: t
      }) : t(i);
    }) : (l.isString(e) && (e = U(e, "")), s && l.isObject(e) ? this.objectParser({
      data: e,
      updater: t
    }) : t(e));
  }
  // 对任意对象中单个字段的 parse: 做基本处理
  fieldParser(e, t, s = !0) {
    if (l.isFunction(e))
      if (e.name.startsWith("__proform_raw_"))
        t(
          (...i) => e({
            rawArgs: i,
            ...this.getRuntimeMeta()
          })
        );
      else {
        const i = e(this.getRuntimeMeta());
        this.promiseFieldParser(i, t, s);
      }
    else
      x(e) ? I(
        () => e.value,
        () => {
          l.isUndefined(e.value) || (s && l.isObject(e.value) ? this.objectParser({
            data: e.value,
            updater: t
          }) : t(e.value));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : z(e) ? I(
        () => e,
        () => {
          l.isUndefined(e) || (s && l.isObject(e) ? this.objectParser({
            data: e,
            updater: t
          }) : t(e));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : s && l.isObject(e) ? this.objectParser({
        data: e,
        updater: t
      }) : t(e);
  }
  modelProcessor(e) {
    e.map(
      (t) => this.createModel(t, this.processedModel.value)
    ), l.isObjectEmpty(this.stableModel) && this.stableUpdaterProcessProgress.every(Boolean) && this.defaultValueEffect.effects.size === 0 && (this.stableModel = g(this.processedModel.value), this.runtimeCore.hydrateEffect.triggerEffects(), this.runtimeCore.hydrateEffect.clearEffects());
  }
  createModel(e, t) {
    l.isListSchema(e) && (t[e.field] || (t[e.field] = [{}]), e.children.forEach((s) => {
      this.createModel(s, t[e.field][0]);
    })), l.isGroupSchema(e) && e.children.forEach((s) => {
      this.createModel(s, t);
    }), l.isItemSchema(e) && ("defaultValue" in e ? t[e.field] = e.defaultValue : t[e.field] || (t[e.field] = void 0));
  }
}
class F {
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
class pe {
  constructor(e) {
    this.ui = e;
  }
  getRuntimeField(e) {
    var i;
    const t = (i = f.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = b.adapters[this.ui];
    return (t == null ? void 0 : t.getRuntimeField(e)) ?? (s == null ? void 0 : s.getRuntimeField(e));
  }
  getRuntimeRequired(e) {
    var i;
    const t = (i = f.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = b.adapters[this.ui];
    return (t == null ? void 0 : t.getRuntimeRequired(e)) ?? (s == null ? void 0 : s.getRuntimeRequired(e));
  }
  getFormModelPropName() {
    var s;
    const e = (s = f.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, t = b.adapters[this.ui];
    return (e == null ? void 0 : e.getFormModelPropName()) ?? (t == null ? void 0 : t.getFormModelPropName());
  }
  formComponentRenderer(e) {
    var i;
    const t = (i = f.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = b.adapters[this.ui];
    return (t == null ? void 0 : t.formComponentRenderer(e)) ?? (s == null ? void 0 : s.formComponentRenderer(e));
  }
  clearValidate(e) {
    var i;
    const t = (i = f.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = b.adapters[this.ui];
    return (t == null ? void 0 : t.clearValidate(e)) ?? (s == null ? void 0 : s.clearValidate(e));
  }
}
function he(r) {
  return typeof r == "function" || Object.prototype.toString.call(r) === "[object Object]" && !ue(r);
}
class me {
  constructor(e) {
    a(this, "schemas", q([]));
    a(this, "model", q({}));
    a(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    a(this, "formRef", q(null));
    a(this, "hydrateEffect", new N());
    a(this, "native", oe({}));
    a(this, "grid", {});
    a(this, "runtime", {});
    a(this, "globalNativeFormOverride", {
      props: {},
      slots: {}
    });
    this.setup = e, this.processor = new de(this);
    const t = this.setup(this);
    if (this.ui = t.ui ?? f.presets.ui, this.runtimeAdapter = new pe(this.ui), x(t.schemas)) {
      const s = I(() => t.schemas, () => {
        this.processor.parseSchemas(t.schemas.value), w(() => {
          s();
        });
      }, {
        deep: !0
      });
    } else if (z(t.schemas)) {
      const s = I(() => t.schemas, () => {
        this.processor.parseSchemas(t.schemas), w(() => {
          s();
        });
      }, {
        deep: !0
      });
    } else
      this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    return {
      model: j(g(this.model.value)),
      reactiveModel: this.model.value
    };
  }
  runtimeItemProcessor(e, t, s = this.model.value, i) {
    var k, $, _, B, D, G, T, K, W, H, J, Q, X;
    const o = j(e.component);
    if (!o)
      return;
    m(this.globalNativeFormOverride.props, ($ = (k = e.native) == null ? void 0 : k.props) == null ? void 0 : $.Form), m(this.globalNativeFormOverride.slots, (B = (_ = e.native) == null ? void 0 : _.slots) == null ? void 0 : B.Form);
    const n = m(g((G = (D = this.native) == null ? void 0 : D.slots) == null ? void 0 : G.FormItem) ?? {}, (K = (T = e.native) == null ? void 0 : T.slots) == null ? void 0 : K.FormItem), u = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, c = m(g((H = (W = this.native) == null ? void 0 : W.props) == null ? void 0 : H.FormItem) ?? {}, (Q = (J = e.native) == null ? void 0 : J.props) == null ? void 0 : Q.FormItem), d = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: i,
      index: t
    }), y = o.name, O = e.componentProps ?? {}, C = b.placeholderPresetByComponentName;
    let v = e.placeholder, P = e.show;
    P === void 0 && (P = !0), P || delete s[e.field];
    let h = e.label ?? "";
    const V = (i == null ? void 0 : i.runtime) ?? this.runtime;
    if (!l.isUndefined(t) && !l.isObjectEmpty(V) && (h = U((X = V == null ? void 0 : V.customizeItemLabel) == null ? void 0 : X.call(V, e.label ?? "", t + 1), "")), !v) {
      let E = "请输入";
      l.isUndefined(y) ? v = `${E}${h}` : /* @ts-expect-error */ C[y.toLowerCase()] ? (E = // @ts-expect-error
      C[y.toLowerCase()], v = `${E}${h}`) : (Object.keys(C).forEach((Y) => {
        y.toLowerCase().includes(Y.toLowerCase()) && (E = C[Y]);
      }), v = `${E}${h}`);
    }
    const Z = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: h
    }), A = F.getItemContainer(this), ee = F.getFormItemContainer(this), te = this, se = e.componentSlots;
    return p("div", {
      style: u
    }, [p(A, {
      show: P
    }, {
      default() {
        return p(ee, R(c, {
          label: `${h ? `${h}:` : ""}`
        }, d, Z), {
          default() {
            return te.runtimeAdapter.formComponentRenderer({
              Component: o,
              schema: e,
              baseModel: s,
              placeholder: v,
              componentSlots: se,
              props: O
            });
          },
          ...n
        });
      }
    })]);
  }
  runtimeGroupProcessor(e) {
    let t;
    const s = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, i = F.getGroupContainer(this);
    return p("div", {
      style: s
    }, [p(i, {
      schema: e
    }, he(t = e.children.map((o) => this.runtimeItemProcessor(o))) ? t : {
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
    (s = this.processor.stableModel[e.field]) != null && s[0] && this.model.value[e.field].push(g(this.processor.stableModel[e.field][0])), this.runtimeAdapter.clearValidate(this);
  }
  deleteListItem(e, t) {
    this.model.value[e.field].splice(t, 1), this.runtimeAdapter.clearValidate(this);
  }
  runtimeListProcessor(e) {
    const t = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, s = this;
    s.model.value[e.field] || (s.model.value[e.field] = [{}]);
    const i = F.getListContainer(this), o = F.getListItemContainer(this);
    return p("div", {
      style: t
    }, [p(i, {
      schema: e
    }, {
      default() {
        return s.model.value[e.field].map((n, u) => p(o, null, {
          default() {
            return e.children.map((c) => s.runtimeItemProcessor(c, u, n, e));
          },
          delete({
            container: c
          } = {}) {
            var y;
            const d = c ?? p("button", null, null);
            return ne(p(d, {
              onClick: () => s.deleteListItem(e, u)
            }, null), [[le, ((y = s.model.value[e.field]) == null ? void 0 : y.length) > 1]]);
          }
        }));
      },
      add({
        container: n
      } = {}) {
        const u = n ?? p("button", null, [ae("添加")]);
        return p(u, {
          onClick: () => s.addListItem(e)
        }, null);
      }
    })]);
  }
  runtimeProcessor(e) {
    return e.map((t) => (t.type || (t.type = "item"), this.processorBySchemaType[t.type](t)));
  }
  exec() {
    var u, c, d, y;
    const e = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.grid
    }, t = this, s = m(g((c = (u = this.native) == null ? void 0 : u.props) == null ? void 0 : c.Form) ?? {}, this.globalNativeFormOverride.props), i = m(g((y = (d = this.native) == null ? void 0 : d.slots) == null ? void 0 : y.Form) ?? {}, this.globalNativeFormOverride.slots), o = F.getFormContainer(this), n = this.runtimeAdapter.getFormModelPropName();
    return p(o, R(s, {
      ref: this.formRef
    }, {
      [n]: this.model.value
    }), {
      default() {
        return p("div", {
          style: e
        }, [t.runtimeProcessor(t.schemas.value)]);
      },
      ...i
    });
  }
}
class f {
}
a(f, "presets");
function M({
  parentSchema: r,
  schema: e,
  index: t
}) {
  return r ? `${r.field}.${t}.${e.field}` : e.field;
}
const ye = {
  ArcoVue: {
    getRuntimeField(r) {
      return {
        field: M(r)
      };
    },
    getRuntimeRequired(r) {
      var e, t;
      if (r.required)
        if (!r.rules)
          r.rules = [], (e = r.rules) == null || e.push({
            required: !0,
            message: `${r.label}是必填项`
          });
        else {
          const s = r.rules.findIndex((i) => !l.isUndefined(i.required));
          s !== -1 && (r.rules[s].required = !0, r.rules[s].message = `${r.label}是必填项`);
        }
      else if (r.rules) {
        const s = (t = r.rules) == null ? void 0 : t.findIndex((i) => !!i.required);
        s !== -1 && (r.rules[s].required = !1);
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
      placeholder: s,
      componentSlots: i,
      props: o
    }) {
      return p(r, R({
        modelValue: e[t.field],
        "onUpdate:modelValue": (n) => e[t.field] = n,
        placeholder: s
      }, o), {
        ...i
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((s) => s ? t(s) : e(r.cleanFallbackFields(j(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      r.formRef.value.clearValidate();
    }
  },
  NutUI: {
    getRuntimeField(r) {
      return {
        prop: M(r)
      };
    },
    getRuntimeRequired(r) {
      var e, t;
      if (r.required)
        if (!r.rules)
          r.rules = [], (e = r.rules) == null || e.push({
            required: !0,
            message: `${r.label}是必填项`
          });
        else {
          const s = r.rules.findIndex((i) => !l.isUndefined(i.required));
          s !== -1 && (r.rules[s].required = !0, r.rules[s].message = `${r.label}是必填项`);
        }
      else if (r.rules) {
        const s = (t = r.rules) == null ? void 0 : t.findIndex((i) => !!i.required);
        s !== -1 && (r.rules[s].required = !1);
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
      placeholder: s,
      componentSlots: i,
      props: o
    }) {
      return p(r, R({
        modelValue: e[t.field],
        "onUpdate:modelValue": (n) => e[t.field] = n,
        placeholder: s
      }, o), {
        ...i
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate().then(({
          valid: s,
          errors: i
        }) => {
          s ? e(r.cleanFallbackFields(j(r.runtimeCore.processor.processedModel.value))) : t(i);
        });
      });
    },
    clearValidate(r) {
      r.formRef.value.reset();
    }
  },
  NaiveUI: {
    getRuntimeField(r) {
      return {
        path: M(r)
      };
    },
    getRuntimeRequired(r) {
      var e, t;
      if (r.required)
        if (!r.rules)
          r.rules = [], (e = r.rules) == null || e.push({
            required: !0,
            message: `${r.label}是必填项`,
            trigger: ["input", "blur"]
          });
        else {
          const s = r.rules.findIndex((i) => !l.isUndefined(i.required));
          s !== -1 && (r.rules[s].required = !0, r.rules[s].message = `${r.label}是必填项`);
        }
      else if (r.rules) {
        const s = (t = r.rules) == null ? void 0 : t.findIndex((i) => !!i.required);
        s !== -1 && (r.rules[s].required = !1);
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
      placeholder: s,
      componentSlots: i,
      props: o
    }) {
      return p(r, R({
        value: e[t.field],
        "onUpdate:value": (n) => e[t.field] = n,
        placeholder: s
      }, o), {
        ...i
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((s) => s ? t(s) : e(r.cleanFallbackFields(j(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      r.formRef.value.restoreValidation();
    }
  }
}, S = class S {
  static getPlaceholderPrefixPresetByComponentName() {
    const e = {
      请选择: ["select", "tree"],
      请输入: ["input"]
    }, t = {};
    for (const s in e)
      e[s].forEach((i) => {
        t[i] = s;
      });
    return t;
  }
};
a(S, "schemaPreset", {
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
  }
}), a(S, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
a(S, "placeholderPresetByComponentName", S.getPlaceholderPrefixPresetByComponentName());
let L = S;
const b = {
  ...L,
  adapters: {
    ...ye
  }
}, ge = /* @__PURE__ */ ce({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(r) {
    const e = new me(r.setup);
    return () => e.exec();
  }
});
function Ce(r) {
  const e = new fe(r);
  return [
    e.setup.bind(e),
    {
      submit: e.submit.bind(e),
      hydrate: e.hydrate.bind(e)
    }
  ];
}
function Ie(r) {
  f.presets = r;
}
function Pe(r, e) {
  return e === "native" && Object.defineProperty(r, "name", {
    value: `__proform_raw_${r.name}`,
    writable: !0
  }), r;
}
function Ve(r) {
  return Pe(r, "native");
}
export {
  ge as ProForm,
  Ve as markNativeFunction,
  Ce as useForm,
  Ie as useFormPresetConfigurer,
  Pe as useModifiers
};
