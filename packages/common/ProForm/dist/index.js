var ue = Object.defineProperty;
var ce = (r, e, t) => e in r ? ue(r, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : r[e] = t;
var a = (r, e, t) => (ce(r, typeof e != "symbol" ? e + "" : e, t), t);
import { ref as N, readonly as se, nextTick as P, isRef as q, watch as y, isReactive as M, toRaw as S, reactive as re, createVNode as m, mergeProps as O, withDirectives as fe, vShow as de, createTextVNode as he, isVNode as pe, defineComponent as me } from "vue";
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
      for (const [n, d] of s)
        o.set(t(n), t(d));
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
function _(r, e) {
  return r.replace(/undefined/g, e);
}
class be {
  constructor(e) {
    a(this, "runtimeCore");
    a(this, "readonlyReactiveModel", N({}));
    this.formCustomization = e;
  }
  // happy path, 后续可以完善更多的 fallback 处理，fallback 处理是为了不卡住异步时的首次渲染做的优化
  cleanFallbackFields(e) {
    return e !== null && typeof e == "object" && (delete e.__yiwwhl_async_field_fallback, Object.values(e).forEach((t) => {
      this.cleanFallbackFields(t);
    })), e;
  }
  setup(e) {
    return this.runtimeCore = e, this.readonlyReactiveModel.value = se(e.model.value), Object.assign(this.runtimeCore.native, this.formCustomization.native), Object.assign(this.runtimeCore.grid, this.formCustomization.grid), Object.assign(this.runtimeCore.runtime, this.formCustomization.runtime), this.formCustomization.ui && (this.runtimeCore.ui = this.formCustomization.ui), this.formCustomization;
  }
  submit() {
    var s;
    const e = (s = u.getPreset(this.runtimeCore.ui)) == null ? void 0 : s.adapter, t = C.adapters[u.getUI(this.runtimeCore.ui)];
    return (e == null ? void 0 : e.validateForm(this)) ?? (t == null ? void 0 : t.validateForm(this));
  }
  hydrate(e) {
    P(() => {
      this.runtimeCore.hydrateEffect.trackEffect(
        () => {
          q(e) ? y(
            () => e.value,
            () => {
              h(this.runtimeCore.model.value, e.value);
            },
            {
              deep: !0,
              immediate: !0
            }
          ) : M(e) ? y(
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
        const t = y(
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
        const t = y(
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
    });
  }
  subscribeModel(e) {
    P(() => {
      const t = y(
        () => this.readonlyReactiveModel.value,
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
    var e;
    (e = this.runtimeCore) != null && e.model.value && (this.runtimeCore.model.value = g(
      this.runtimeCore.processor.stableModel
    ), this.readonlyReactiveModel.value = se(this.runtimeCore.model.value), this.runtimeCore.runtimeAdapter.clearValidate(this.runtimeCore));
  }
}
class x {
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
    a(this, "schemaEffect", new x());
    a(this, "defaultValueEffect", new x());
    a(this, "defaultValueInprogressMap", /* @__PURE__ */ new Map());
    a(this, "baseDefaultValueFunctionsLength");
    a(this, "isModelInitialized", !0);
    this.runtimeCore = e, this.processedSchemas = e.schemas, this.processedModel = e.model, this.getRuntimeMeta = e.getRuntimeMeta.bind(e), y(
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
      const t = S(this.processedSchemas.value);
      !l.isProcessInprogress(t) && l.isObjectEmpty(this.stableModel) && (this.stableUpdaterProcessProgress || (this.stableUpdaterProcessProgress = Array.from({
        length: t.length
      }).fill(!1)), this.stableUpdaterProcessProgress[this.stableUpdaterTimes] = !0, this.stableUpdaterTimes++, this.modelProcessor(t));
    }
  }
  // 核心单 schema 处理过程，接收一个对象键值对的数据结构
  parseItem(e, t, s) {
    const i = this, o = Array.from({
      length: Object.keys(e).filter((d) => d !== "children").length
    }).fill(!1);
    this.objectParser({ data: e, index: t, updater: n });
    function n(d) {
      const f = d.index, c = d.key, p = d.keyIndex;
      if (l.isUndefined(d.stable))
        return;
      const V = i.parseStable(d.stable), F = s == null ? void 0 : s.index, I = s == null ? void 0 : s.key;
      let v = V;
      if (l.isProcessInprogress(v) || (o[p] = !0), s) {
        const b = i.processedSchemas.value[F][I][f][c];
        b && l.isObject(b) && c !== "component" && (v = h(b, v)), i.processedSchemas.value[F][I][f][c] = v, i.stableUpdater(o);
      } else {
        const b = i.processedSchemas.value[f][c];
        b && l.isObject(b) && c !== "component" && (v = h(b, v)), i.processedSchemas.value[f][c] = v, i.stableUpdater(o);
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
        const n = (d) => {
          e.updater({
            ...e,
            key: i,
            keyIndex: o,
            stable: d
          });
        };
        l.isFunction(t[i]) ? i !== "defaultValue" ? this.schemaEffect.trackEffect(
          () => {
            if (i === "component") {
              const d = t[i](this.getRuntimeMeta());
              this.promiseFieldParser(d, n, !1);
            } else
              this.fieldParser(t[i], n);
          },
          {
            lazy: !1
          }
        ) : this.defaultValueEffect.trackEffect(
          () => {
            const d = this.schemaEffect.trackEffect(
              () => {
                /\{\s*model\s*\}/.test(t[i].toString()) ? this.fieldParser(t[i], (f) => {
                  if (!f)
                    return n(f);
                  this.defaultValueInprogressMap.set(t[i], f), !l.isProcessInprogress(f) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                    this.defaultValueInprogressMap.values()
                  ).every((c) => {
                    var p;
                    return !((p = c == null ? void 0 : c.includes) != null && p.call(c, "undefined"));
                  }) ? (n(f), this.defaultValueEffect.clearEffects(), P(() => {
                    d();
                  })) : n(f);
                }) : this.fieldParser(t[i], (f) => {
                  this.defaultValueInprogressMap.set(t[i], f), !l.isProcessInprogress(f) && this.defaultValueInprogressMap.size === this.baseDefaultValueFunctionsLength && Array.from(
                    this.defaultValueInprogressMap.values()
                  ).every((c) => {
                    var p;
                    return !((p = c == null ? void 0 : c.includes) != null && p.call(c, "undefined"));
                  }) ? (n(f), this.defaultValueEffect.clearEffects(), P(() => {
                    d();
                  })) : n(f);
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
      l.isString(i) && (i = _(i, "")), s && l.isObject(i) && !l.isNativeObject(i) ? this.objectParser({
        data: i,
        updater: t
      }) : t(i);
    }) : (l.isString(e) && (e = _(e, "")), s && l.isObject(e) && !l.isNativeObject(e) ? this.objectParser({
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
      else if (e.__proform_async_result) {
        const i = e.__proform_async_result;
        this.promiseFieldParser(i, t, s);
      } else {
        const i = e(this.getRuntimeMeta());
        e.__proform_async_result = i, this.promiseFieldParser(i, t, s);
      }
    else
      q(e) ? y(
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
      ) : M(e) ? y(
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
class j {
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
    a(this, "hydrateEffect", new x());
    a(this, "native", re({}));
    a(this, "grid", {});
    a(this, "runtime", {});
    a(this, "globalNativeFormOverride", re({
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
      y(
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
      const s = y(() => t.schemas, () => {
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
    const e = S(g(this.model.value));
    let t;
    return {
      model: e,
      reactiveModel: this.model.value,
      shared: this.shared,
      // share 增加防抖，当开发者在过程中进行 share 时避免频繁触发爆栈
      share: (s) => {
        t && clearTimeout(t), t = setTimeout(() => {
          if (q(s)) {
            const i = y(() => s.value, () => {
              h(this.shared, s.value), this.processor.schemaEffect.triggerEffects(), P(() => {
                i();
              });
            }, {
              deep: !0,
              immediate: !0
            });
          } else if (M(s)) {
            const i = y(() => s, () => {
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
    var $, z, k, B, D, T, G, W, K, H, J, Q, X, Y, Z, A, ee;
    const o = S(e.component);
    if (!o)
      return;
    (z = ($ = e.native) == null ? void 0 : $.props) != null && z.Form && h(this.globalNativeFormOverride.props.Form, (B = (k = e.native) == null ? void 0 : k.props) == null ? void 0 : B.Form), (T = (D = e.native) == null ? void 0 : D.slots) != null && T.Form && h(this.globalNativeFormOverride.slots.Form, (W = (G = e.native) == null ? void 0 : G.slots) == null ? void 0 : W.Form);
    const n = h(g((H = (K = this.native) == null ? void 0 : K.slots) == null ? void 0 : H.FormItem) ?? {}, (Q = (J = e.native) == null ? void 0 : J.slots) == null ? void 0 : Q.FormItem), d = {
      display: "grid",
      gridColumn: "1 / -1",
      ...e.grid
    }, f = h(g((Y = (X = this.native) == null ? void 0 : X.props) == null ? void 0 : Y.FormItem) ?? {}, (A = (Z = e.native) == null ? void 0 : Z.props) == null ? void 0 : A.FormItem), c = this.runtimeAdapter.getRuntimeField({
      schema: e,
      parentSchema: i,
      index: t
    }), p = o.name, V = e.componentProps ?? {}, F = C.placeholderPresetByComponentName;
    let I = e.placeholder, v = e.show;
    v === void 0 && (v = !0);
    let b = e.label ?? "", E;
    if (e.runtime ? E = e.runtime : E = (i == null ? void 0 : i.runtime) ?? this.runtime, !l.isUndefined(t) && !l.isObjectEmpty(E) && (b = _((ee = E == null ? void 0 : E.customizeListItemLabel) == null ? void 0 : ee.call(E, e.label ?? "", t + 1), "")), !I) {
      let w = "请输入";
      l.isUndefined(p) ? I = `${w}${b}` : /* @ts-expect-error */ F[p.toLowerCase()] ? (w = // @ts-expect-error
      F[p.toLowerCase()], I = `${w}${b}`) : (Object.keys(F).forEach((te) => {
        p.toLowerCase().includes(te.toLowerCase()) && (w = F[te]);
      }), I = `${w}${b}`);
    }
    const ie = this.runtimeAdapter.getRuntimeRequired({
      ...e,
      label: b
    }), oe = j.getItemContainer(this), ne = j.getFormItemContainer(this), le = this, ae = e.componentSlots;
    return m("div", {
      style: d
    }, [m(oe, {
      show: v
    }, {
      default() {
        return v && m(ne, O(f, {
          label: `${b ? `${b}:` : ""}`
        }, c, ie), {
          default() {
            return le.runtimeAdapter.formComponentRenderer({
              Component: o,
              schema: e,
              baseModel: s,
              placeholder: I,
              componentSlots: ae,
              props: V
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
    }, i = j.getGroupContainer(this);
    let o = e.show;
    return o === void 0 && (o = !0), m("div", {
      style: s
    }, [o && m(i, {
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
    const o = j.getListContainer(this), n = j.getListItemContainer(this);
    return m("div", {
      style: t
    }, [i && m(o, {
      schema: e
    }, {
      default() {
        return s.model.value[e.field].map((d, f) => m(n, null, {
          default() {
            return e.children.map((c) => s.runtimeItemProcessor(c, f, d, e));
          },
          delete({
            container: c
          } = {}) {
            var V;
            const p = c ?? m("button", null, null);
            return fe(m(p, {
              onClick: () => s.deleteListItem(e, f)
            }, null), [[de, ((V = s.model.value[e.field]) == null ? void 0 : V.length) > 1]]);
          }
        }));
      },
      add({
        container: d
      } = {}) {
        const f = d ?? m("button", null, [he("添加")]);
        return m(f, {
          onClick: () => s.addListItem(e)
        }, null);
      }
    })]);
  }
  runtimeProcessor(e) {
    return e.map((t) => (t.type || (t.type = "item"), this.processorBySchemaType[t.type](t)));
  }
  exec() {
    var d, f, c, p;
    const e = {
      display: "grid",
      gridColumn: "1 / -1",
      gridAutoColumns: "1fr",
      ...this.grid
    }, t = this, s = h(this.globalNativeFormOverride.props.Form, g((f = (d = this.native) == null ? void 0 : d.props) == null ? void 0 : f.Form) ?? {}), i = h(this.globalNativeFormOverride.slots.Form, g((p = (c = this.native) == null ? void 0 : c.slots) == null ? void 0 : p.Form) ?? {}), o = j.getFormContainer(this), n = this.runtimeAdapter.getFormModelPropName();
    return m(o, O(s, {
      ref: this.formRef
    }, {
      [n]: this.model.value
    }), {
      default() {
        return m("div", {
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
      return m(r, O({
        modelValue: e[t.field],
        "onUpdate:modelValue": (n) => e[t.field] = n,
        placeholder: s
      }, o), {
        ...i
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((s) => s ? t(s) : e(r.cleanFallbackFields(S(r.runtimeCore.processor.processedModel.value))));
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
      return m(r, O({
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
          s ? e(r.cleanFallbackFields(S(r.runtimeCore.processor.processedModel.value))) : t(i);
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
      return m(r, O({
        value: e[t.field],
        "onUpdate:value": (n) => e[t.field] = n,
        placeholder: s
      }, o), {
        ...i
      });
    },
    validateForm(r) {
      return new Promise((e, t) => {
        r.runtimeCore.formRef.value.validate((s) => s ? t(s) : e(r.cleanFallbackFields(S(r.runtimeCore.processor.processedModel.value))));
      });
    },
    clearValidate(r) {
      r.formRef.value.restoreValidation();
    }
  }
}, R = class R {
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
a(R, "schemaPreset", {
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
}), a(R, "componentPropsPreset", {
  options: {
    defaultValue: []
  }
}), // 基于基本功能提出基本预设
a(R, "placeholderPresetByComponentName", R.getPlaceholderPrefixPresetByComponentName());
let L = R;
const C = {
  ...L,
  adapters: {
    ...Ce
  }
}, Ve = /* @__PURE__ */ me({
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
function je(r) {
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
function Re(r) {
  u.presets = r;
}
function Ie(r, e) {
  return e === "native" && Object.defineProperty(r, "name", {
    value: `__proform_raw_${r.name}`,
    writable: !0
  }), r;
}
function Se(r) {
  return Ie(r, "native");
}
function we(r) {
  return r.__proform_raw_object = !0, r;
}
export {
  Ve as ProForm,
  Se as markNativeFunction,
  we as markNativeObject,
  je as useForm,
  Re as useFormPresetConfigurer,
  Ie as useModifiers
};
