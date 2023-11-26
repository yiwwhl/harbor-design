"use strict";var I=Object.defineProperty;var v=(l,e,t)=>e in l?I(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t;var f=(l,e,t)=>(v(l,typeof e!="symbol"?e+"":e,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const i=require("vue");class O{constructor(e){f(this,"runtimeCore");this.formCustomization=e}cleanFallbackFields(e){return e!==null&&typeof e=="object"&&(delete e.__yiwwhl_async_field_fallback,Object.values(e).forEach(t=>{this.cleanFallbackFields(t)})),e}setup(e){return this.runtimeCore=e,this.formCustomization}submit(){return new Promise((e,t)=>{this.runtimeCore.formRef.value.validate(s=>s?t(s):e(this.cleanFallbackFields(i.toRaw(this.runtimeCore.processor.processedModel.value))))})}}class u{static typeChecker(e){return{}.toString.call(e)}static isArray(e){return this.typeChecker(e)==="[object Array]"}static isFunction(e){return this.typeChecker(e)==="[object Function]"}static isPromise(e){return e instanceof Promise}static isObject(e){return this.typeChecker(e)==="[object Object]"}static isAsyncFunction(e){return this.typeChecker(e)==="[object AsyncFunction]"}static isUndefined(e){return e===void 0}static isArrayEmpty(e){return(e==null?void 0:e.length)<1}static isObjectEmpty(e){return this.isArrayEmpty(Object.keys(e))}static isListSchema(e){return e.type==="list"}static isGroupSchema(e){return e.type==="group"}static isItemSchema(e){return this.isUndefined(e.type)||e.type==="item"}static isProcessInprogress(e){if(e===void 0)return!0;if(this.isObject(e)){if(e.setup&&this.isFunction(e.setup)&&e.props)return!1;if(this.isObjectEmpty(e))return!0;for(const t in e)if(e.hasOwnProperty(t)&&this.isProcessInprogress(e[t]))return!0}else if(this.isArray(e)){if(this.isArrayEmpty(e))return!0;for(const t of e)if(this.isProcessInprogress(t))return!0}return!1}}function j(l){const e=new WeakMap;function t(s){if(s===null||typeof s!="object")return s;if(s instanceof Date)return new Date(s);if(s instanceof RegExp)return new RegExp(s);if(s instanceof Map){const n=new Map;for(let[o,c]of s)n.set(t(o),t(c));return n}if(s instanceof Set){const n=new Set;for(let o of s)n.add(t(o));return n}if(e.has(s))return e.get(s);if(Array.isArray(s)){const n=[];e.set(s,n);for(let o=0;o<s.length;o++)n[o]=t(s[o]);return n}const r=Object.create(Object.getPrototypeOf(s));e.set(s,r);for(let n in s)s.hasOwnProperty(n)&&(r[n]=t(s[n]));return r}return t(l)}class E{constructor(){f(this,"effects",new Set)}clearEffects(){this.effects.clear()}triggerEffects(){Array.from(this.effects).forEach(e=>e())}trackEffect(e){return e(),this.effects.add(e),()=>this.effects.delete(e)}}class C{constructor(e){f(this,"processedSchemas");f(this,"processedModel");f(this,"getRuntimeMeta");f(this,"stableSchemas",[]);f(this,"stableModel",{});f(this,"schemaPreset",S.schemaPreset);f(this,"componentPropsPreset",S.componentPropsPreset);f(this,"stableUpdaterProcessProgress");f(this,"stableUpdaterTimes",0);f(this,"schemaEffect",new E);f(this,"defaultValueEffect",new E);f(this,"defaultValueInprogressMap",new Map);this.processedSchemas=e.schemas,this.processedModel=e.model,this.getRuntimeMeta=e.getRuntimeMeta.bind(e),i.watch(()=>this.processedModel.value,()=>{this.schemaEffect.triggerEffects()},{deep:!0})}parse(e,t){e.forEach((s,r)=>{this.parseItem(s,r,t)})}initSchemas(e){return e.map(t=>{const s={};return t.children&&(s.children=this.initSchemas(t.children)),s})}parseSchemas(e,t){u.isArrayEmpty(this.processedSchemas.value)&&(this.processedSchemas.value=this.initSchemas(e)),this.parse(e,t)}parseStable(e){const t={};if(!u.isUndefined(e.stable))t[e.key]=this.parseStable(e.stable);else return e;return t}stableUpdater(e=[]){if(e.every(Boolean)){const t=i.toRaw(this.processedSchemas.value);!u.isProcessInprogress(t)&&u.isObjectEmpty(this.stableModel)&&(this.stableUpdaterProcessProgress||(this.stableUpdaterProcessProgress=Array.from({length:t.length}).fill(!1)),this.stableUpdaterProcessProgress[this.stableUpdaterTimes]=!0,this.stableUpdaterTimes++,this.modelProcessor(t))}}parseItem(e,t,s){const r=this,n=Array.from({length:Object.keys(e).filter(c=>c!=="children").length}).fill(!1);this.objectParser({data:e,index:t,updater:o});function o(c){const a=c.index,d=c.key,y=c.keyIndex;if(!c.stable)return;const V=r.parseStable(c.stable),m=s==null?void 0:s.index,g=s==null?void 0:s.key;let p=V;if(u.isProcessInprogress(p)||(n[y]=!0),s){let b=r.processedSchemas.value[m][g][a][d];b&&u.isObject(b)&&d!=="component"&&(p=Object.assign(b,p)),r.processedSchemas.value[m][g][a][d]=p,r.stableUpdater(n)}else{let b=r.processedSchemas.value[a][d];b&&u.isObject(b)&&(p=Object.assign(b,p)),r.processedSchemas.value[a][d]=p,r.stableUpdater(n)}}}objectParser(e){const t=e.data;Object.keys(t).forEach((r,n)=>{if(r==="children")this.parseSchemas(t[r],{...e,key:r,keyIndex:n});else{const o=c=>{e.updater({...e,key:r,keyIndex:n,stable:c})};if(u.isFunction(t[r]))r!=="defaultValue"?this.schemaEffect.trackEffect(()=>{if(r==="component"){const c=t[r](this.getRuntimeMeta());this.promiseFieldParser(c,o,!1)}else this.fieldParser(t[r],o)}):this.defaultValueEffect.trackEffect(()=>{const c=this.schemaEffect.trackEffect(()=>{/\{\s*model\s*\}/.test(t[r].toString())?this.fieldParser(t[r],a=>{if(!a)return o(a);this.defaultValueInprogressMap.set(t[r],a),!u.isProcessInprogress(a)&&Array.from(this.defaultValueInprogressMap.values()).every(d=>!d.includes("undefined"))?(o(a),this.defaultValueEffect.clearEffects(),c()):o(a)}):this.fieldParser(t[r],a=>{!u.isProcessInprogress(a)&&Array.from(this.defaultValueInprogressMap.values()).every(d=>!d.includes("undefined"))?(o(a),this.defaultValueEffect.clearEffects(),c()):o(a)})})});else if(r==="component"){const c=t[r];this.promiseFieldParser(c,o,!1)}else this.fieldParser(t[r],o)}})}promiseFieldParser(e,t,s){u.isPromise(e)?e.then(r=>{s&&u.isObject(r)?this.objectParser({data:r,updater:t}):t(r)}):s&&u.isObject(e)?this.objectParser({data:e,updater:t}):t(e)}fieldParser(e,t,s=!0){if(u.isFunction(e)){const r=e(this.getRuntimeMeta());this.promiseFieldParser(r,t,s)}else i.isRef(e)?i.watch(()=>e.value,()=>{u.isUndefined(e.value)||(s&&u.isObject(e.value)?this.objectParser({data:e.value,updater:t}):t(e.value))},{immediate:!0,deep:!0}):i.isReactive(e)?i.watch(()=>e,()=>{u.isUndefined(e)||(s&&u.isObject(e)?this.objectParser({data:e,updater:t}):t(e))},{immediate:!0,deep:!0}):s&&u.isObject(e)?this.objectParser({data:e,updater:t}):t(e)}modelProcessor(e){e.map(t=>this.createModel(t,this.processedModel.value)),u.isObjectEmpty(this.stableModel)&&this.stableUpdaterProcessProgress.every(Boolean)&&this.defaultValueEffect.effects.size===0&&(this.stableModel=j(this.processedModel.value))}createModel(e,t){u.isListSchema(e)&&(t[e.field]||(t[e.field]=[{}]),e.children.forEach(s=>{this.createModel(s,t[e.field][0])})),u.isGroupSchema(e)&&e.children.forEach(s=>{this.createModel(s,t)}),u.isItemSchema(e)&&(t[e.field]=e.defaultValue)}}function w(l){return typeof l=="function"||Object.prototype.toString.call(l)==="[object Object]"&&!i.isVNode(l)}class R{constructor(e){f(this,"schemas",i.ref([]));f(this,"model",i.ref({}));f(this,"processorBySchemaType",{item:this.runtimeItemProcessor.bind(this),group:this.runtimeGroupProcessor.bind(this),list:this.runtimeListProcessor.bind(this)});f(this,"formRef",i.ref(null));this.setup=e,this.processor=new C(this);const t=this.setup(this);this.processor.parseSchemas(t.schemas)}getRuntimeMeta(){return{model:i.toRaw(j(this.model.value))}}runtimeItemProcessor(e,t,s=this.model.value,r){var g;const n=r?`${r.field}.${t}.${e.field}`:e.field,o=i.toRaw(e.component);if(!o)return;const c=o.name,a=e.componentProps??{},d=S.placeholderPresetByComponentName;let y=e.placeholder;y||(y=`${d[c]??"请输入"}${e.label}`),e.required&&(e.rules||(e.rules=[]),(g=e.rules)==null||g.push({required:!0,message:`${e.label}是必填项`}));let m=e.show;return m===void 0&&(m=!0),m||delete s[e.field],i.createVNode(h.runtimeDoms.Item,null,{default(){return i.withDirectives(i.createVNode(h.runtimeDoms.FormItem,{label:`${e.label}:`,rules:e.rules,field:n},{default:()=>[i.createVNode(o,i.mergeProps({modelValue:s[e.field],"onUpdate:modelValue":p=>s[e.field]=p,placeholder:y},a),null)]}),[[i.vShow,m]])}})}runtimeGroupProcessor(e){let t;return i.createVNode(h.runtimeDoms.Group,{schema:e},w(t=e.children.map(s=>this.runtimeItemProcessor(s)))?t:{default:()=>[t]})}addListItem(e){var t,s;if(!((t=this.processor.stableModel[e.field])!=null&&t[0]))return Promise.reject({code:"0001",message:"异步默认值数据正在处理中，请您耐心等待... "});(s=this.processor.stableModel[e.field])!=null&&s[0]&&this.model.value[e.field].push(j(this.processor.stableModel[e.field][0]))}deleteListItem(e,t){this.model.value[e.field].splice(t,1)}runtimeListProcessor(e){const t=this;return t.model.value[e.field]||(t.model.value[e.field]=[{}]),i.createVNode(h.runtimeDoms.List,{schema:e},{default(){return t.model.value[e.field].map((s,r)=>i.createVNode(h.runtimeDoms.ListItem,null,{default(){return e.children.map((n,o)=>t.runtimeItemProcessor(n,o,s,e))},delete({container:n}={}){var c;let o=n??i.createVNode("button",null,null);return i.withDirectives(i.createVNode(o,{onClick:()=>t.deleteListItem(e,r)},null),[[i.vShow,((c=t.model.value[e.field])==null?void 0:c.length)>1]])}}))},add({container:s}={}){let r=s??i.createVNode("button",null,[i.createTextVNode("添加")]);return i.createVNode(r,{onClick:()=>t.addListItem(e)},null)}})}runtimeProcessor(e){return e.map(t=>(t.type||(t.type="item"),this.processorBySchemaType[t.type](t)))}exec(){let e;return i.createVNode(h.runtimeDoms.Form,{ref:this.formRef,model:this.model.value},w(e=this.runtimeProcessor(this.schemas.value))?e:{default:()=>[e]})}}class h{}f(h,"runtimeDoms");const P=class P{static getPlaceholderPrefixPresetByComponentName(){const e={请选择:["Select","Tree","TreeSelect"],请输入:["Input"]},t={};for(let s in e)e[s].forEach(r=>{t[r]=s});return t}};f(P,"schemaPreset",{type:{defaultValue:"item"},component:{defaultValue:void 0},componentProps:{defaultValue:void 0},defaultValue:{defaultValue:void 0},label:{defaultValue:""},field:{defaultValue:"__yiwwhl_async_field_fallback"},rules:{defaultValue:[]},show:{defaultValue:!0},required:{defaultValue:!1},placeholder:{defaultValue:void 0},children:{defaultValue:[]}}),f(P,"componentPropsPreset",{options:{defaultValue:[]}}),f(P,"placeholderPresetByComponentName",P.getPlaceholderPrefixPresetByComponentName());let S=P;const N=i.defineComponent({props:{setup:{type:Function,required:!0}},setup(l){const e=new R(l.setup);return()=>e.exec()}});function x(l){const e=new O(l);return[e.setup.bind(e),{submit:e.submit.bind(e)}]}function A(l){return{install(){h.runtimeDoms=l}}}exports.ProForm=N;exports.useForm=x;exports.useFormRenderer=A;