var ae = Object.defineProperty;
var ue = (r, e, t) => e in r ? ae(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var a = (r, e, t) => (ue(r, typeof e != "symbol" ? e + "" : e, t), t);
import { readonly as ce, isRef as q, watch as v, isReactive as M, nextTick as P, toRaw as w, ref as N, reactive as se, createVNode as p, mergeProps as O, withDirectives as fe, vShow as de, createTextVNode as he, isVNode as pe, defineComponent as me } from "vue";
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
      Array.isArray(r) || (r = []), t.forEach((s, i) => {
        typeof s == "object" && s !== null ? r[i] = h(Array.isArray(s) ? [] : {}, s) : r[i] = s;
      });
    else
      for (const s in t)
        t.hasOwnProperty(s) && (typeof t[s] == "object" && t[s] !== null ? r[s] = h(r[s] || {}, t[s]) : r[s] = t[s]);
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
      for (const [n, f] of s)
        o.set(t(n), t(f));
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
function x(r, e) {
  return r.replace(/undefined/g, e);
}
class be {
  constructor(e) {
    a(this, "runtimeCore");
    a(this, "reactiveModel");
    this.formCustomization = e;
  }
  // happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
  cleanFallbackFields(e) {
    return e !== null && typeof e == "object" && (delete e.__yiwwhl_async_field_fallback, Object.values(e).forEach((t) => {
      this.cleanFallbackFields(t);
    })), e;
  }
  setup(e) {
    return this.runtimeCore = e, this.reactiveModel = ce(e.model.value), Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var s;
    const e = (s = u.getPreset(this.runtimeCore.ui)) == null ? void 0 : s.adapter, t = C.adapters[u.getUI(this.runtimeCore.ui)];
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
        q(e) ? v(
          () => e.value,
          () => {
            h(this.runtimeCore.model.value, e.value);
          },
          {
            deep: !0,
            immediate: !0
          }
        ) : M(e) ? v(
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
  }
  share(e) {
    if (q(e)) {
      const t = v(
        () => e.value,
        () => {
          h(this.runtimeCore.shared, e.value), this.runtimeCore.processor.schemaEffect.triggerEffects(), P(() => {
            t();
          });
        },
        {
          deep: !0,
          immediate: !0
        }
      );
    } else if (M(e)) {
      const t = v(
        () => e,
        () => {
          h(this.runtimeCore.shared, e), this.runtimeCore.processor.schemaEffect.triggerEffects(), P(() => {
            t();
          });
        },
        {
          deep: !0,
          immediate: !0
        }
      );
    } else
      h(this.runtimeCore.shared, e), this.runtimeCore.processor.schemaEffect.triggerEffects();
  }
  subscribeModel(e) {
    P(() => {
      const t = v(
        () => this.reactiveModel,
        (s) => {
          e(s, {
            stopSubscribe() {
              P(() => {
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
    P(() => {
      var e;
      (e = this.runtimeCore) != null && e.model.value && (this.runtimeCore.model.value = g(
        this.runtimeCore.processor.stableModel
      ));
    });
  }
}
class L {
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
class ve {
  constructor(e) {
    a(this, "runtimeCore");
    a(this, "processedSchemas");
    a(this, "processedModel");
    a(this, "getRuntimeMeta");
    a(this, "stableSchemas", []);
    a(this, "stableModel", {});
    a(this, "schemaPreset", C.schemaPreset);
    a(this, "componentPropsPreset", C.componentPropsPreset);
    a(this, "stableUpdaterProcessProgress");
    a(this, "stableUpdaterTimes", 0);
    a(this, "schemaEffect", new L());
    a(this, "defaultValueEffect", new L());
    a(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    a(this, "baseDefaultValueFunctionsLength");
    a(this, "isModelInitialized", !0);
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
      const t = w(this.processedSchemas.value);
      !l.isProcessInprogress(t) && l.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: t.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(t));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, t, s) {
    const i = this, o = Array.from({
      length: Object.keys(e).filter((f) => f !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: n });
    function n(f) {
      const c = f.index, d = f.key, y = f.keyIndex;
      if (l.isUndefined(f.stable))
        return;
      const F = i.parseStable(f.stable), E = s == null ? void 0 : s.index, I = s == null ? void 0 : s.key;
      let b = F;
      if (l.isProcessInprogress(b) || (o[y] = !0), s) {
        const m = i.processedSchemas.value[E][I][c][d];
        m && l.isObject(m) && d !== "component" && (b = h(m, b)), i.processedSchemas.value[E][I][c][d] = b, i.stableUpdater(o);
      } else {
        const m = i.processedSchemas.value[c][d];
        m && l.isObject(m) && d !== "component" && (b = h(m, b)), i.processedSchemas.value[c][d] = b, i.stableUpdater(o);
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
        const n = (f) => {
          e.updater({
            ...e,
            key: i,
            keyIndex: o,
            stable: f
          });
        };
        l.isFunction(t[i]) ? i !== "defaultValue" ? this.schemaEffect.trackEffect(
          () => {
            if (i === "component") {
              const f = t[i](this.getRuntimeMeta());
              this.promiseFieldParser(f, n, !1);
            } else
              this.fieldParser(t[i], n);
          },
          {
            lazy: !1
          }
        ) : this.defaultValueEffect.trackEffect(
          () => {
            const f = this.schemaEffect.trackEffect(
              () => {
                /\{\s*model\s*\}/.test(t[i].toString()) ? this.fieldParser(t[i], (c) => {
                  if (!c)
                    return n(c);
                  this.defaultValueInprogressMap.set(t[i], c), !l.isProcessInprogress(c) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                    this.defaultValueInprogressMap.values()
                  ).every((d) => !d.includes("undefined")) ? (n(c), this.defaultValueEffect.clearEffects(), P(() => {
                    f();
                  })) : n(c);
                }) : this.fieldParser(t[i], (c) => {
                  this.defaultValueInprogressMap.set(t[i], c), !l.isProcessInprogress(c) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                    this.defaultValueInprogressMap.values()
                  ).every((d) => !d.includes("undefined")) ? (n(c), this.defaultValueEffect.clearEffects(), P(() => {
                    f();
                  })) : n(c);
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
        ) : i === "component" || i === "slots" || i === "runtime" ? this.promiseFieldParser(t[i], n, !1) : this.fieldParser(t[i], n);
      }
    });
  }
  promiseFieldParser(e, t, s) {
    l.isPromise(e) ? e.then((i) => {
      l.isString(i) && (i = x(i, "")), s && l.isObject(i) && !l.isNativeObject(i) ? this.objectParser({
        data: i,
        updater: t
      }) : t(i);
    }) : (l.isString(e) && (e = x(e, "")), s && l.isObject(e) && !l.isNativeObject(e) ? this.objectParser({
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
      q(e) ? v(
        () => e.value,
        () => {
          l.isUndefined(e.value) || (s && l.isObject(e.value) && !l.isNativeObject(e.value) ? this.objectParser({
            data: e.value,
            updater: t
          }) : t(e.value));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : M(e) ? v(
        () => e,
        () => {
          l.isUndefined(e) || (s && l.isObject(e) && !l.isNativeObject(e) ? this.objectParser({
            data: e,
            updater: t
          }) : t(e));
        },
        {
          immediate: !0,
          deep: !0
        }
      ) : s && l.isObject(e) && !l.isNativeObject(e) ? this.objectParser({
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
class V {
  static getFormContainer({ ui: e } = {}) {
    return u.presets.uiPresets[e ?? u.presets.ui].container.Form;
  }
  static getFormItemContainer({ ui: e } = {}) {
    return u.presets.uiPresets[e ?? u.presets.ui].container.FormItem;
  }
  static getItemContainer({ ui: e } = {}) {
    return u.presets.uiPresets[e ?? u.presets.ui].container.Item;
  }
  static getGroupContainer({ ui: e } = {}) {
    return u.presets.uiPresets[e ?? u.presets.ui].container.Group;
  }
  static getListContainer({ ui: e } = {}) {
    return u.presets.uiPresets[e ?? u.presets.ui].container.List;
  }
  static getListItemContainer({ ui: e } = {}) {
    return u.presets.uiPresets[e ?? u.presets.ui].container.ListItem;
  }
}
class ye {
  constructor(e) {
    this.ui = e;
  }
  getRuntimeNative() {
    var t;
    return (t = u.presets.uiPresets[this.ui]) == null ? void 0 : t.native;
  }
  getRuntimeField(e) {
    var i;
    const t = (i = u.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = C.adapters[u.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeField(e)) ?? (s == null ? void 0 : s.getRuntimeField(e));
  }
  getRuntimeRequired(e) {
    var i;
    const t = (i = u.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = C.adapters[u.getUI(this.ui)];
    return (t == null ? void 0 : t.getRuntimeRequired(e)) ?? (s == null ? void 0 : s.getRuntimeRequired(e));
  }
  getFormModelPropName() {
    var s;
    const e = (s = u.presets.uiPresets[this.ui]) == null ? void 0 : s.adapter, t = C.adapters[u.getUI(this.ui)];
    return (e == null ? void 0 : e.getFormModelPropName()) ?? (t == null ? void 0 : t.getFormModelPropName());
  }
  formComponentRenderer(e) {
    var i;
    const t = (i = u.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = C.adapters[u.getUI(this.ui)];
    return (t == null ? void 0 : t.formComponentRenderer(e)) ?? (s == null ? void 0 : s.formComponentRenderer(e));
  }
  clearValidate(e) {
    var i;
    const t = (i = u.presets.uiPresets[this.ui]) == null ? void 0 : i.adapter, s = C.adapters[u.getUI(this.ui)];
    return (t == null ? void 0 : t.clearValidate(e)) ?? (s == null ? void 0 : s.clearValidate(e));
  }
}
function Pe(r) {
  return typeof r == "function" || Object.prototype.toString.call(r) === "[object Object]" && !pe(r);
}
class ge {
  constructor(e) {
    a(this, "schemas", N([]));
    a(this, "model", N({}));
    a(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    a(this, "formRef", N(null));
    a(this, "hydrateEffect", new L());
    a(this, "native", se({}));
    a(this, "grid", {});
    a(this, "runtime", {});
    a(this, "globalNativeFormOverride", se({
      props: {
        Form: {},
        FormItem: {}
      },
      slots: {
        Form: {},
        FormItem: {}
      }
    }));
    a(this, "shared", {});
    this.setup = e, this.processor = new ve(this);
    const t = this.setup(this);
    if (this.ui = t.ui ?? u.presets.ui, this.runtimeAdapter = new ye(this.ui), Object.assign(this.globalNativeFormOverride, this.runtimeAdapter.getRuntimeNative()), q(t.schemas))
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
    else if (M(t.schemas)) {
      const s = v(() => t.schemas, () => {
        this.processor.parseSchemas(t.schemas), P(() => {
          s();
        });
      }, {
        deep: !0
      });
    } else
      this.processor.parseSchemas(t.schemas);
  }
  getRuntimeMeta() {
    const e = w(g(this.model.value));
    let t;
    return {
      model: e,
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (s) => {
        t && clearTimeout(t), t = setTimeout(() => {
          if (q(s)) {
            const i = v(() => s.value, () => {
              h(this.shared, s.value), this.processor.schemaEffect.triggerEffects(), P(() => {
                i();
              });
            }, {
              deep: !0,
              immediate: !0
            });
          } else if (M(s)) {
            const i = v(() => s, () => {
              h(this.shared, s), this.processor.schemaEffect.triggerEffects(), P(() => {
                i();
              });
            }, {
              deep: !0,
              immediate: !0
            });
          } else
            h(this.shared, s), this.processor.schemaEffect.triggerEffects();
        }, 0);
      }
    };
  }
  runtimeItemProcessor(e, t, s = this.model.value, i) {
    var _, z, k, B, D, T, G, W, K, H, J, Q, X, Y, Z, A, ee;
    const o = w(e.component);
    if (!o)
      return;
    (z = (_ = e.native) == null ? void 0 : _.props) != null && z.Form && h(this.globalNativeFormOverride.props.Form, (B = (k = e.native) == null ? void 0 : k.props) == null ? void 0 : B.Form), (T = (D = e.native) == null ? void 0 : D.slots) != null && T.Form && h(this.globalNativeFormOverride.slots.Form, (W = (G = e.native) == null ? void 0 : G.slots) == null ? void 0 : W.Form);
    const n = h(g((H = (K = this.native) == null ? void 0 : K.slots) == null ? void 0 : H.FormItem) ?? {}, (Q = (J = e.native) == null ? void 0 : J.slots) == null ? void 0 : Q.FormItem), f = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, c = h(g((Y = (X = this.native) == null ? void 0 : X.props) == null ? void 0 : Y.FormItem) ?? {}, (A = (Z = e.native) == null ? void 0 : Z.props) == null ? void 0 : A.FormItem), d = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: i,
      index: t
    }), y = o.name, F = e.componentProps ?? {}, E = C.placeholderPresetByComponentName;
    let I = e.placeholder, b = e.show;
    b === void 0 && (b = !0);
    let m = e.label ?? "";
    const j = (i == null ? void 0 : i.runtime) ?? this.runtime;
    if (!l.isUndefined(t) && !l.isObjectEmpty(j) && (m = x((ee = j == null ? void 0 : j.customizeListItemLabel) == null ? void 0 : ee.call(j, e.label ?? "", t + 1), "")), !I) {
      let R = "请输入";
      l.isUndefined(y) ? I = `${R}${m}` : /* @ts-expect-error */ E[y.toLowerCase()] ? (R = // @ts-expect-error
      E[y.toLowerCase()], I = `${R}${m}`) : (Object.keys(E).forEach((te) => {
        y.toLowerCase().includes(te.toLowerCase()) && (R = E[te]);
      }), I = `${R}${m}`);
    }
    const re = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: m
    }), ie = V.getItemContainer(this), oe = V.getFormItemContainer(this), ne = this, le = e.componentSlots;
    return p("div", {
      style: f
    }, [p(ie, {
      show: b
    }, {
      default() {
        return b && p(oe, O(c, {
          label: `${m ? `${m}:` : ""}`
        }, d, re), {
          default() {
            return ne.runtimeAdapter.formComponentRenderer({
              Component: o,
              schema: e,
              baseModel: s,
              placeholder: I,
              componentSlots: le,
              props: F
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
    }, i = V.getGroupContainer(this);
    let o = e.show;
    return o === void 0 && (o = !0), p("div", {
      style: s
    }, [o && p(i, {
      schema: e
    }, Pe(t = e.children.map((n) => this.runtimeItemProcessor(n))) ? t : {
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
    let i = e.show;
    i === void 0 && (i = !0);
    const o = V.getListContainer(this), n = V.getListItemContainer(this);
    return p("div", {
      style: t
    }, [i && p(o, {
      schema: e
    }, {
      default() {
        return s.model.value[e.field].map((f, c) => p(n, null, {
          default() {
            return e.children.map((d) => s.runtimeItemProcessor(d, c, f, e));
          },
          delete({
            container: d
          } = {}) {
            var F;
            const y = d ?? p("button", null, null);
            return fe(p(y, {
              onClick: () => s.deleteListItem(e, c)
            }, null), [[de, ((F = s.model.value[e.field]) == null ? void 0 : F.length) > 1]]);
          }
        }));
      },
      add({
        container: f
      } = {}) {
        const c = f ?? p("button", null, [he("添加")]);
        return p(c, {
          onClick: () => s.addListItem(e)
        }, null);
      }
    })]);
  }
  runtimeProcessor(e) {
    return e.map((t) => (t.type || (t.type = "item"), this.processorBySchemaType[t.type](t)));
  }
  exec() {
    var f, c, d, y;
    const e = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.grid
    }, t = this, s = h(g((c = (f = this.native) == null ? void 0 : f.props) == null ? void 0 : c.Form) ?? {}, this.globalNativeFormOverride.props.Form), i = h(g((y = (d = this.native) == null ? void 0 : d.slots) == null ? void 0 : y.Form) ?? {}, this.globalNativeFormOverride.slots.Form), o = V.getFormContainer(this), n = this.runtimeAdapter.getFormModelPropName();
    return p(o, O(s, {
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
class u {
  static getPreset(e) {
    var t, s, i;
    return (s = (t = this.presets.uiPresets) == null ? void 0 : t[e]) != null && s.extend ? this.presets.uiPresets[(i = this.presets.uiPresets[e]) == null ? void 0 : i.extend] : this.presets.uiPresets[e];
  }
  static getUI(e) {
    var t, s, i;
    return (s = (t = this.presets.uiPresets) == null ? void 0 : t[e]) != null && s.extend ? (i = this.presets.uiPresets[e]) == null ? void 0 : i.extend : e;
  }
}
a(u, "presets");
function U({
  parentSchema: r,
  schema: e,
  index: t
}) {
  return r ? `${r.field}.${t}.${e.field}` : e.field;
}
const Ce = {
  ArcoVue: {
    getRuntimeField(r) {
      return {
        field: U(r)
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
          const t = r.rules.findIndex((s) => !l.isUndefined(s.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = `${r.label}是必填项`) : r.rules.unshift({
            required: !0,
            message: `${r.label}是必填项`
          });
        }
      else if (r.rules) {
        const t = (e = r.rules) == null ? void 0 : e.findIndex((s) => !!s.required);
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
      placeholder: s,
      componentSlots: i,
      props: o
    }) {
      return p(r, O({
        modelValue: e[t.field],
        "onUpdate:modelValue": (n) => e[t.field] = n,
        placeholder: s
      }, o), {
        ...i
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((s) => s ? t(s) : e(r.cleanFallbackFields(w(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      r.formRef.value.clearValidate();
    }
  },
  NutUI: {
    getRuntimeField(r) {
      return {
        prop: U(r)
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
          const t = r.rules.findIndex((s) => !l.isUndefined(s.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = `${r.label}是必填项`) : r.rules.unshift({
            required: !0,
            message: `${r.label}是必填项`
          });
        }
      else if (r.rules) {
        const t = (e = r.rules) == null ? void 0 : e.findIndex((s) => !!s.required);
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
      placeholder: s,
      componentSlots: i,
      props: o
    }) {
      return p(r, O({
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
          s ? e(r.cleanFallbackFields(w(r.runtimeCore.processor.processedModel.value))) : t(i);
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
        path: U(r)
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
          const t = r.rules.findIndex((s) => !l.isUndefined(s.required));
          t !== -1 ? (r.rules[t].required = !0, r.rules[t].message = `${r.label}是必填项`) : r.rules.unshift({
            required: !0,
            message: `${r.label}是必填项`,
            trigger: ["input", "blur"]
          });
        }
      else if (r.rules) {
        const t = (e = r.rules) == null ? void 0 : e.findIndex((s) => !!s.required);
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
      placeholder: s,
      componentSlots: i,
      props: o
    }) {
      return p(r, O({
        value: e[t.field],
        "onUpdate:value": (n) => e[t.field] = n,
        placeholder: s
      }, o), {
        ...i
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((s) => s ? t(s) : e(r.cleanFallbackFields(w(r.runtimeCore.processor.processedModel.value))));
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
let $ = S;
const C = {
  ...$,
  adapters: {
    ...Ce
  }
}, je = /* @__PURE__ */ me({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(r) {
    const e = new ge(r.setup);
    return () => e.exec();
  }
});
function Ve(r) {
  const e = new be(r);
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
function Se(r) {
  u.presets = r;
}
function Ie(r, e) {
  return e === "native" && Object.defineProperty(r, "name", {
    value: `__proform_raw_${r.name}`,
    writable: !0
  }), r;
}
function we(r) {
  return Ie(r, "native");
}
function Re(r) {
  return r.__proform_raw_object = !0, r;
}
export {
  je as ProForm,
  we as markNativeFunction,
  Re as markNativeObject,
  Ve as useForm,
  Se as useFormPresetConfigurer,
  Ie as useModifiers
};
