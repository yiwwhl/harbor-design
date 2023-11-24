var D = Object.defineProperty;
var _ = (c, e, t) => e in c ? D(c, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : c[e] = t;
var h = (c, e, t) => (_(c, typeof e != "symbol" ? e + "" : e, t), t);
import { toRaw as S, watch as F, watchEffect as j, isRef as L, isReactive as z, ref as b, createVNode as M, withDirectives as V, mergeProps as N, vShow as W, createTextVNode as G, isVNode as U, defineComponent as $ } from "vue";
class B {
  constructor(e) {
    h(this, "runtimeCore");
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
          S(this.runtimeCore.processors.processedModel.value)
        )
      ));
    });
  }
}
class d {
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
    h(this, "rawSchemas", []);
    h(this, "rawModel", {});
    h(this, "schemaPreset", {
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
      }
    });
    h(this, "componentPropsPreset", {
      options: {
        defaultValueWhenAsync: []
      }
    });
    h(this, "uniqueEffectMap", {});
    h(this, "schemaEffect", new k());
    h(this, "modelEffect", new k());
    h(this, "stopWatchEffect", new k());
    this.processedSchemas = e, this.processedModel = t, F(
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
        (m, y, p) => {
          p ? i[s][p] = m[p] : (t[s] = m, this.modelProcessor(
            m,
            f && this.processedModel.value[f][0]
          ), (!i[s] || y) && (i[s] = A(m)), this.schemaEffect.triggerEffects(), this.modelEffect.triggerEffects());
        },
        o,
        f
      );
    }
  }
  schemaProcessor(e, t, i, f, o) {
    const s = {}, l = this;
    function m(y = !1) {
      var p, E;
      if (s.componentProps) {
        const a = {};
        l.propsProcessor(
          s.componentProps,
          l.componentPropsPreset,
          a,
          (v) => {
            s.componentProps = a, i({ ...s }, v, "componentProps");
          },
          t,
          f
        );
        return;
      }
      if (s.children) {
        l.processedSchemas.value[t] = s, l.rawSchemas[t] = s, i({ ...s }, y), l.schemaAnalyzer(
          s.children,
          // @ts-expect-error 此处已经守卫为非 ItemSchema
          (p = l.processedSchemas.value[t]) == null ? void 0 : p.children,
          // @ts-expect-error 此处已经守卫为非 ItemSchema
          (E = l.rawSchemas[t]) == null ? void 0 : E.children,
          s.field,
          t
        );
        return;
      }
      i({ ...s }, y), l.rawModel = A(l.processedModel.value);
    }
    this.propsProcessor(
      e,
      this.schemaPreset,
      s,
      m,
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
        S(A(this.processedModel.value))
      )
    };
  }
  propsProcessor(e, t, i, f, o, s, l) {
    const m = Object.keys(e), y = Array.from({
      length: m.length
    }).fill(!1);
    function p() {
      return y.every((E) => E);
    }
    for (let E = 0; E < m.length; E++) {
      const a = m[E], v = e[a];
      if (d.isFunction(v)) {
        const P = v(this.runtimeMeta());
        a !== "defaultValue" ? this.schemaEffect.trackEffect(() => {
          let n = v(this.runtimeMeta());
          n instanceof Promise ? n.then((r) => {
            s === void 0 ? d.isFunction(r) || (typeof r == "string" && r.includes("undefined") && (r = r.replace(/undefined/g, "")), this.processedSchemas.value[o][a] = r) : d.isFunction(r) || (typeof r == "string" && r.includes("undefined") && (r = r.replace(/undefined/g, "")), this.processedSchemas.value[s].children[o][a] = r);
          }) : s === void 0 ? d.isFunction(n) || (typeof n == "string" && n.includes("undefined") && (n = n.replace(/undefined/g, "")), this.processedSchemas.value[o][a] = n) : d.isFunction(n) || (typeof n == "string" && n.includes("undefined") && (n = n.replace(/undefined/g, "")), this.processedSchemas.value[s].children[o][a] = n);
        }) : this.modelEffect.trackEffect(() => {
          let n = v(this.runtimeMeta());
          this.stopWatchEffect.trackEffect(
            j(() => {
              if (n = v(this.runtimeMeta()), n instanceof Promise)
                n.then((r) => {
                  if (typeof r == "string" && !r.includes("undefined") ? this.stopWatchEffect.triggerEffects() : r = r.replace(/undefined/g, ""), o === void 0 || l === void 0) {
                    if (d.isFunction(e.field)) {
                      const u = e.field(
                        this.runtimeMeta()
                      );
                      u instanceof Promise ? u.then((g) => {
                        this.processedModel.value[g] = r;
                      }) : this.processedModel.value[u] = r;
                      return;
                    }
                    this.processedModel.value[e.field] = r;
                  } else {
                    if (d.isFunction(e.field)) {
                      const u = e.field(
                        this.runtimeMeta()
                      );
                      u instanceof Promise ? u.then((g) => {
                        this.processedModel.value[l][o][g] = r;
                      }) : this.processedModel.value[l][o] && (this.processedModel.value[l][o][u] = r);
                      return;
                    }
                    this.processedModel.value[l] && this.processedModel.value[l].forEach(
                      // @ts-expect-error
                      (u) => {
                        u[e.field] = r;
                      }
                    );
                  }
                  this.rawModel = A(this.processedModel.value), this.modelEffect.clearEffects();
                });
              else {
                if (typeof n == "string" && !n.includes("undefined") ? this.stopWatchEffect.triggerEffects() : n = n.replace(/undefined/g, ""), d.isFunction(e.field)) {
                  const r = e.field(this.runtimeMeta());
                  r instanceof Promise ? r.then((u) => {
                    this.processedModel.value[u] = n;
                  }) : this.processedModel.value[r] = n;
                  return;
                }
                if (this.processedModel.value[e.field] = n, o === void 0 || l === void 0) {
                  if (d.isFunction(e.field)) {
                    const r = e.field(this.runtimeMeta());
                    r instanceof Promise ? r.then((u) => {
                      this.processedModel.value[u] = n;
                    }) : this.processedModel.value[r] = n;
                    return;
                  }
                  this.processedModel.value[e.field] = n;
                } else
                  for (let r = 0; r < this.processedModel.value[l].length; r++) {
                    const u = this.processedModel.value[l][r];
                    if (!d.isFunction(e.field))
                      u[e.field] = n;
                    else {
                      const g = e.field(
                        this.runtimeMeta()
                      );
                      g instanceof Promise ? g.then((C) => {
                        u[C] = n;
                      }) : u[g] = n;
                      return;
                    }
                  }
                this.rawModel = A(this.processedModel.value), this.modelEffect.clearEffects();
              }
            })
          );
        }), P instanceof Promise ? (y[E] = !0, i[a] = t[a].defaultValueWhenAsync, p() && f(), P.then((n) => {
          y[E] = !0, i[a] = n, p() && f(!0);
        })) : (y[E] = !0, i[a] = P, p() && f());
      } else
        y[E] = !0, L(v) ? F(
          () => v.value,
          (P) => {
            i[a] = P, p() && f();
          },
          {
            immediate: !0,
            deep: !0
          }
        ) : z(v) ? F(
          () => v,
          (P) => {
            i[a] = P, p() && f();
          },
          {
            immediate: !0,
            deep: !0
          }
        ) : (i[a] = v, p() && f());
    }
  }
  modelProcessor(e, t = this.processedModel.value) {
    if (d.isListSchema(e)) {
      if (d.isFunction(e.field))
        return;
      t[e.field] || (t[e.field] = [{}]), e.children.forEach((i) => {
        this.modelProcessor(i, t[e.field][0]);
      });
      return;
    }
    if (d.isGroupSchema(e)) {
      e.children.forEach((i) => {
        this.modelProcessor(i, t);
      });
      return;
    }
    if (d.isItemSchema(e)) {
      if (d.isFunction(e.field) || d.isUndefined(e.field) || !Number.isNaN(Number(e.field)) || d.isFunction(e.defaultValue))
        return;
      t[e.field] = e.defaultValue;
    }
  }
}
function R(c) {
  return typeof c == "function" || Object.prototype.toString.call(c) === "[object Object]" && !U(c);
}
class T {
  constructor(e) {
    h(this, "schemas", b([]));
    h(this, "model", b({}));
    h(this, "processorBySchemaType", {
      item: this.runtimeItemProcessor.bind(this),
      group: this.runtimeGroupProcessor.bind(this),
      list: this.runtimeListProcessor.bind(this)
    });
    h(this, "formRef", b(null));
    this.setup = e, this.processors = new O(this.schemas, this.model), this.analyze(this.setup(this));
  }
  analyze(e) {
    this.processors.schemaAnalyzer(e.schemas);
  }
  runtimeItemProcessor(e, t, i = this.model.value, f) {
    const o = f ? `${f.field}.${t}.${e.field}` : e.field, s = S(e.component), l = e.componentProps ?? {};
    let m = e.show;
    return m === void 0 && (m = !0), m || delete i[e.field], M(w.runtimeDoms.Item, null, {
      default() {
        return V(M(w.runtimeDoms.FormItem, {
          label: `${e.label}:`,
          rules: e.rules,
          field: o
        }, {
          default: () => [M(s, N({
            modelValue: i[e.field],
            "onUpdate:modelValue": (y) => i[e.field] = y
          }, l), null)]
        }), [[W, m]]);
      }
    });
  }
  runtimeGroupProcessor(e) {
    let t;
    return M(w.runtimeDoms.Group, {
      schema: e
    }, R(t = e.children.map((i) => this.runtimeItemProcessor(i))) ? t : {
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
    return M(w.runtimeDoms.List, {
      schema: e
    }, {
      default() {
        return t.model.value[e.field].map((i, f) => M(w.runtimeDoms.ListItem, null, {
          default() {
            return e.children.map((o, s) => t.runtimeItemProcessor(o, s, i, e));
          },
          delete({
            container: o
          } = {}) {
            var l;
            let s = o ?? M("button", null, null);
            return V(M(s, {
              onClick: () => t.deleteListItem(e, f)
            }, null), [[W, ((l = t.model.value[e.field]) == null ? void 0 : l.length) > 1]]);
          }
        }));
      },
      add({
        container: i
      } = {}) {
        let f = i ?? M("button", null, [G("添加")]);
        return M(f, {
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
    return M(w.runtimeDoms.Form, {
      ref: this.formRef,
      model: this.model.value
    }, R(e = this.runtimeProcessor(this.schemas.value)) ? e : {
      default: () => [e]
    });
  }
}
class w {
}
h(w, "runtimeDoms");
class k {
  constructor() {
    h(this, "effects", /* @__PURE__ */ new Set());
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
const J = /* @__PURE__ */ $({
  props: {
    setup: {
      type: Function,
      required: !0
    }
  },
  setup(c) {
    const e = new T(c.setup);
    return () => e.exec();
  }
});
function K(c) {
  const e = new B(c);
  return [
    e.setup.bind(e),
    {
      submit: e.submit.bind(e)
    }
  ];
}
function Q(c) {
  return {
    install() {
      w.runtimeDoms = c;
    }
  };
}
export {
  J as ProForm,
  K as useForm,
  Q as useFormRenderer
};
