var j = Object.defineProperty;
var L = (c, e, t) => e in c ? j(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var d = (c, e, t) => (L(c, typeof e != "symbol" ? e + "" : e, t), t);
import { toRaw as W, watch as S, watchEffect as z, isRef as _, isReactive as B, ref as k, createVNode as v, withDirectives as C, mergeProps as q, vShow as R, createTextVNode as $, isVNode as G, defineComponent as T } from "vue";
class U {
  constructor(e) {
    d(this, "runtimeCore");
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
      this.runtimeCore.formRef.value.validate((i) => i ? t(i) : e(
        this.cleanFallbackFields(
          W(this.runtimeCore.processors.processedModel.value)
        )
      ));
    });
  }
}
class p {
  static typeChecker(e) {
    return {}.toString.call(e);
  }
  static isArray(e) {
    return this.typeChecker(e) === "[object Array]";
  }
  static isFunction(e) {
    return this.typeChecker(e).includes("Function");
  }
  static isAsyncFunction(e) {
    let t = !1;
    return this.typeChecker(e) === "[object AsyncFunction]" && (t = !0), t;
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
}
function A(c) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(i) {
    if (i === null || typeof i != "object")
      return i;
    if (i instanceof Date)
      return new Date(i);
    if (i instanceof RegExp)
      return new RegExp(i);
    if (i instanceof Map) {
      const o = /* @__PURE__ */ new Map();
      for (let [s, l] of i)
        o.set(t(s), t(l));
      return o;
    }
    if (i instanceof Set) {
      const o = /* @__PURE__ */ new Set();
      for (let s of i)
        o.add(t(s));
      return o;
    }
    if (e.has(i))
      return e.get(i);
    if (Array.isArray(i)) {
      const o = [];
      e.set(i, o);
      for (let s = 0; s < i.length; s++)
        o[s] = t(i[s]);
      return o;
    }
    const f = Object.create(Object.getPrototypeOf(i));
    e.set(i, f);
    for (let o in i)
      i.hasOwnProperty(o) && (f[o] = t(i[o]));
    return f;
  }
  return t(c);
}
class O {
  constructor(e, t) {
    d(this, "rawSchemas", []);
    d(this, "rawModel", {});
    d(this, "schemaPreset", b.schemaPreset);
    d(this, "componentPropsPreset", b.componentPropsPreset);
    d(this, "uniqueEffectMap", {});
    d(this, "schemaEffect", new V());
    d(this, "modelEffect", new V());
    d(this, "stopWatchEffect", new V());
    this.processedSchemas = e, this.processedModel = t, S(
      () => this.processedModel.value,
      () => {
        this.schemaEffect.triggerEffects(), this.modelEffect.triggerEffects();
      },
      {
        deep: !0
      }
    );
  }
  schemaAnalyzer(e, t = this.processedSchemas.value, i = this.rawSchemas, f, o) {
    for (let s = 0; s < e.length; s++) {
      let l = e[s];
      this.schemaProcessor(
        l,
        s,
        (P, E, a) => {
          a ? i[s][a] = P[a] : (t[s] = P, this.modelProcessor(
            P,
            f && this.processedModel.value[f][0]
          ), (!i[s] || E) && (i[s] = A(P)), this.schemaEffect.triggerEffects(), this.modelEffect.triggerEffects());
        },
        o,
        f
      );
    }
  }
  schemaProcessor(e, t, i, f, o) {
    const s = {}, l = this;
    function P(E = !1) {
      var a, y;
      if (s.componentProps) {
        const u = {};
        l.propsProcessor(
          s.componentProps,
          l.componentPropsPreset,
          u,
          (m) => {
            s.componentProps = u, i({ ...s }, m, "componentProps");
          },
          t,
          f
        );
        return;
      }
      if (s.children) {
        l.processedSchemas.value[t] = s, l.rawSchemas[t] = s, i({ ...s }, E), l.schemaAnalyzer(
          s.children,
          // @ts-expect-error 此处已经守卫为非 ItemSchema
          (a = l.processedSchemas.value[t]) == null ? void 0 : a.children,
          // @ts-expect-error 此处已经守卫为非 ItemSchema
          (y = l.rawSchemas[t]) == null ? void 0 : y.children,
          s.field,
          t
        );
        return;
      }
      i({ ...s }, E), l.rawModel = A(l.processedModel.value);
    }
    this.propsProcessor(
      e,
      this.schemaPreset,
      s,
      P,
      t,
      f,
      o
    );
  }
  replaceFunctionsWithUndefined(e) {
    if (typeof e != "object" || e === null)
      return e;
    for (let t in e)
      if (e.hasOwnProperty(t)) {
        let i = e[t];
        typeof i == "function" || typeof i == "object" && this.replaceFunctionsWithUndefined(i);
      }
    return e;
  }
  runtimeMeta() {
    return {
      model: this.replaceFunctionsWithUndefined(
        W(A(this.processedModel.value))
      )
    };
  }
  propsProcessor(e, t, i, f, o, s, l) {
    const P = Object.keys(e), E = Array.from({
      length: P.length
    }).fill(!1);
    function a() {
      return E.every((y) => y);
    }
    for (let y = 0; y < P.length; y++) {
      const u = P[y], m = e[u];
      if (p.isFunction(m)) {
        const M = m(this.runtimeMeta());
        u !== "defaultValue" ? this.schemaEffect.trackEffect(() => {
          let n = m(this.runtimeMeta());
          n instanceof Promise ? n.then((r) => {
            s === void 0 ? p.isFunction(r) || (typeof r == "string" && r.includes("undefined") && (r = r.replace(/undefined/g, "")), this.processedSchemas.value[o][u] = r) : p.isFunction(r) || (typeof r == "string" && r.includes("undefined") && (r = r.replace(/undefined/g, "")), this.processedSchemas.value[s].children[o][u] = r);
          }) : s === void 0 ? p.isFunction(n) || (typeof n == "string" && n.includes("undefined") && (n = n.replace(/undefined/g, "")), this.processedSchemas.value[o][u] = n) : p.isFunction(n) || (typeof n == "string" && n.includes("undefined") && (n = n.replace(/undefined/g, "")), this.processedSchemas.value[s].children[o][u] = n);
        }) : this.modelEffect.trackEffect(() => {
          let n = m(this.runtimeMeta());
          this.stopWatchEffect.trackEffect(
            z(() => {
              if (n = m(this.runtimeMeta()), n instanceof Promise)
                n.then((r) => {
                  if (typeof r == "string" && !r.includes("undefined") ? this.stopWatchEffect.triggerEffects() : r = r.replace(/undefined/g, ""), o === void 0 || l === void 0) {
                    if (p.isFunction(e.field)) {
                      const h = e.field(
                        this.runtimeMeta()
                      );
                      h instanceof Promise ? h.then((g) => {
                        this.processedModel.value[g] = r;
                      }) : this.processedModel.value[h] = r;
                      return;
                    }
                    this.processedModel.value[e.field] = r;
                  } else {
                    if (p.isFunction(e.field)) {
                      const h = e.field(
                        this.runtimeMeta()
                      );
                      h instanceof Promise ? h.then((g) => {
                        this.processedModel.value[l][o][g] = r;
                      }) : this.processedModel.value[l][o] && (this.processedModel.value[l][o][h] = r);
                      return;
                    }
                    this.processedModel.value[l] && this.processedModel.value[l].forEach(
                      // @ts-expect-error
                      (h) => {
                        h[e.field] = r;
                      }
                    );
                  }
                  this.rawModel = A(this.processedModel.value), this.modelEffect.clearEffects();
                });
              else {
                if (typeof n == "string" && !n.includes("undefined") ? this.stopWatchEffect.triggerEffects() : n = n.replace(/undefined/g, ""), p.isFunction(e.field)) {
                  const r = e.field(this.runtimeMeta());
                  r instanceof Promise ? r.then((h) => {
                    this.processedModel.value[h] = n;
                  }) : this.processedModel.value[r] = n;
                  return;
                }
                if (this.processedModel.value[e.field] = n, o === void 0 || l === void 0) {
                  if (p.isFunction(e.field)) {
                    const r = e.field(this.runtimeMeta());
                    r instanceof Promise ? r.then((h) => {
                      this.processedModel.value[h] = n;
                    }) : this.processedModel.value[r] = n;
                    return;
                  }
                  this.processedModel.value[e.field] = n;
                } else
                  for (let r = 0; r < this.processedModel.value[l].length; r++) {
                    const h = this.processedModel.value[l][r];
                    if (!p.isFunction(e.field))
                      h[e.field] = n;
                    else {
                      const g = e.field(
                        this.runtimeMeta()
                      );
                      g instanceof Promise ? g.then((N) => {
                        h[N] = n;
                      }) : h[g] = n;
                      return;
                    }
                  }
                this.rawModel = A(this.processedModel.value), this.modelEffect.clearEffects();
              }
            })
          );
        }), M instanceof Promise ? (E[y] = !0, i[u] = t[u].defaultValueWhenAsync, a() && f(), M.then((n) => {
          E[y] = !0, i[u] = n, a() && f(!0);
        })) : (E[y] = !0, i[u] = M, a() && f());
      } else
        E[y] = !0, _(m) ? S(
          () => m.value,
          (M) => {
            i[u] = M, a() && f();
          },
          {
            immediate: !0,
            deep: !0
          }
        ) : B(m) ? S(
          () => m,
          (M) => {
            i[u] = M, a() && f();
          },
          {
            immediate: !0,
            deep: !0
          }
        ) : (i[u] = m, a() && f());
    }
  }
  modelProcessor(e, t = this.processedModel.value) {
    if (p.isListSchema(e)) {
      if (p.isFunction(e.field))
        return;
      t[e.field] || (t[e.field] = [{}]), e.children.forEach((i) => {
        this.modelProcessor(i, t[e.field][0]);
      });
      return;
    }
    if (p.isGroupSchema(e)) {
      e.children.forEach((i) => {
        this.modelProcessor(i, t);
      });
      return;
    }
    if (p.isItemSchema(e)) {
      if (p.isFunction(e.field) || p.isUndefined(e.field) || !Number.isNaN(Number(e.field)) || p.isFunction(e.defaultValue))
        return;
      t[e.field] = e.defaultValue;
    }
  }
}
function D(c) {
  return typeof c == "function" || Object.prototype.toString.call(c) === "[object Object]" && !G(c);
}
class H {
  constructor(e) {
    d(this, "schemas", k([]));
    d(this, "model", k({}));
    d(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    d(this, "formRef", k(null));
    this.setup = e, this.processors = new O(this.schemas, this.model), this.analyze(this.setup(this));
  }
  analyze(e) {
    this.processors.schemaAnalyzer(e.schemas);
  }
  runtimeItemProcessor(e, t, i = this.model.value, f) {
    var m;
    const o = f ? `${f.field}.${t}.${e.field}` : e.field, s = W(e.component), l = s.name, P = e.componentProps ?? {}, E = b.placeholderPresetByComponentName;
    let a = e.placeholder;
    a || (a = `${// @ts-expect-error
    E[l] ?? "请输入"}${e.label}`), e.required && (e.rules || (e.rules = []), (m = e.rules) == null || m.push({
      required: !0,
      message: `${e.label}是必填项`
    }));
    let u = e.show;
    return u === void 0 && (u = !0), u || delete i[e.field], v(w.runtimeDoms.Item, null, {
      default() {
        return C(v(w.runtimeDoms.FormItem, {
          label: `${e.label}:`,
          rules: e.rules,
          field: o
        }, {
          default: () => [v(s, q({
            modelValue: i[e.field],
            "onUpdate:modelValue": (M) => i[e.field] = M,
            placeholder: a
          }, P), null)]
        }), [[R, u]]);
      }
    });
  }
  runtimeGroupProcessor(e) {
    let t;
    return v(w.runtimeDoms.Group, {
      schema: e
    }, D(t = e.children.map((i) => this.runtimeItemProcessor(i))) ? t : {
      default: () => [t]
    });
  }
  addListItem(e) {
    var t, i;
    if (!((t = this.processors.rawModel[e.field]) != null && t[0]))
      return Promise.reject({
        code: "0001",
        message: "异步默认值数据正在处理中，请您耐心等待... "
      });
    (i = this.processors.rawModel[e.field]) != null && i[0] && this.model.value[e.field].push(A(this.processors.rawModel[e.field][0]));
  }
  deleteListItem(e, t) {
    this.model.value[e.field].splice(t, 1);
  }
  runtimeListProcessor(e) {
    const t = this;
    return v(w.runtimeDoms.List, {
      schema: e
    }, {
      default() {
        return t.model.value[e.field].map((i, f) => v(w.runtimeDoms.ListItem, null, {
          default() {
            return e.children.map((o, s) => t.runtimeItemProcessor(o, s, i, e));
          },
          delete({
            container: o
          } = {}) {
            var l;
            let s = o ?? v("button", null, null);
            return C(v(s, {
              onClick: () => t.deleteListItem(e, f)
            }, null), [[R, ((l = t.model.value[e.field]) == null ? void 0 : l.length) > 1]]);
          }
        }));
      },
      add({
        container: i
      } = {}) {
        let f = i ?? v("button", null, [$("添加")]);
        return v(f, {
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
    return v(w.runtimeDoms.Form, {
      ref: this.formRef,
      model: this.model.value
    }, D(e = this.runtimeProcessor(this.schemas.value)) ? e : {
      default: () => [e]
    });
  }
}
class w {
}
d(w, "runtimeDoms");
class V {
  constructor() {
    d(this, "effects", /* @__PURE__ */ new Set());
  }
  clearEffects() {
    this.effects.clear();
  }
  triggerEffects() {
    Array.from(this.effects).forEach((e) => e());
  }
  trackEffect(e) {
    this.effects.add(e);
  }
}
const F = class F {
  static getPlaceholderPrefixPresetByComponentName() {
    const e = {
      请选择: ["Select", "Tree", "TreeSelect"],
      请输入: ["Input"]
    }, t = {};
    for (let i in e)
      e[i].forEach((f) => {
        t[f] = i;
      });
    return t;
  }
};
d(F, "schemaPreset", {
  type: {
    defaultValueWhenAsync: "item"
  },
  component: {
    defaultValueWhenAsync: void 0
  },
  componentProps: {
    defaultValueWhenAsync: void 0
  },
  defaultValue: {
    defaultValueWhenAsync: void 0
  },
  label: {
    defaultValueWhenAsync: ""
  },
  field: {
    defaultValueWhenAsync: "__yiwwhl_async_field_fallback"
  },
  rules: {
    defaultValueWhenAsync: []
  },
  show: {
    defaultValueWhenAsync: !0
  },
  required: {
    defaultValueWhenAsync: !1
  },
  placeholder: {
    defaultValueWhenAsync: void 0
  }
}), d(F, "componentPropsPreset", {
  options: {
    defaultValueWhenAsync: []
  }
}), // 基于基本功能提出基本预设
d(F, "placeholderPresetByComponentName", F.getPlaceholderPrefixPresetByComponentName());
let b = F;
const Q = /* @__PURE__ */ T({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(c) {
    const e = new H(c.setup);
    return () => e.exec();
  }
});
function X(c) {
  const e = new U(c);
  return [
    e.setup.bind(e),
    {
      submit: e.submit.bind(e)
    }
  ];
}
function Y(c) {
  return {
    install() {
      w.runtimeDoms = c;
    }
  };
}
export {
  Q as ProForm,
  X as useForm,
  Y as useFormRenderer
};
