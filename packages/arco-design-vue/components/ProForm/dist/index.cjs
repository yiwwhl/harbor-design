"use strict";var _=Object.defineProperty;var L=(n,e,t)=>e in n?_(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var c=(n,e,t)=>(L(n,typeof e!="symbol"?e+"":e,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const o=require("vue");class f{static typeChecker(e){return{}.toString.call(e)}static isString(e){return typeof e=="string"}static isArray(e){return this.typeChecker(e)==="[object Array]"}static isFunction(e){return this.typeChecker(e)==="[object Function]"}static isPromise(e){return e instanceof Promise}static isObject(e){return this.typeChecker(e)==="[object Object]"}static isAsyncFunction(e){return this.typeChecker(e)==="[object AsyncFunction]"}static isUndefined(e){return e===void 0}static isArrayEmpty(e){return(e==null?void 0:e.length)<1}static isObjectEmpty(e){return this.isArrayEmpty(Object.keys(e))}static isListSchema(e){return e.type==="list"}static isGroupSchema(e){return e.type==="group"}static isItemSchema(e){return this.isUndefined(e.type)||e.type==="item"}static isProcessInprogress(e){if(e===void 0)return!0;if(this.isObject(e)){if(e.setup&&this.isFunction(e.setup)&&e.props)return!1;if(this.isObjectEmpty(e))return!0;for(const t in e)if(e.hasOwnProperty(t)&&this.isProcessInprogress(e[t]))return!0}else if(this.isArray(e)){if(this.isArrayEmpty(e))return!0;for(const t of e)if(this.isProcessInprogress(t))return!0}return!1}}function d(n,...e){return e.forEach(t=>{if(Array.isArray(t))Array.isArray(n)||(n=[]),t.forEach((s,r)=>{typeof s=="object"&&s!==null?n[r]=d(Array.isArray(s)?[]:{},s):n[r]=s});else for(let s in t)t.hasOwnProperty(s)&&(typeof t[s]=="object"&&t[s]!==null?n[s]=d(n[s]||{},t[s]):n[s]=t[s])}),n}function y(n){const e=new WeakMap;function t(s){if(s===null||typeof s!="object")return s;if(s instanceof Date)return new Date(s);if(s instanceof RegExp)return new RegExp(s);if(s instanceof Map){const i=new Map;for(let[l,a]of s)i.set(t(l),t(a));return i}if(s instanceof Set){const i=new Set;for(let l of s)i.add(t(l));return i}if(e.has(s))return e.get(s);if(Array.isArray(s)){const i=[];e.set(s,i);for(let l=0;l<s.length;l++)i[l]=t(s[l]);return i}const r=Object.create(Object.getPrototypeOf(s));e.set(s,r);for(let i in s)s.hasOwnProperty(i)&&(r[i]=t(s[i]));return r}return t(n)}class T{constructor(e){c(this,"runtimeCore");this.formCustomization=e}cleanFallbackFields(e){return e!==null&&typeof e=="object"&&(delete e.__yiwwhl_async_field_fallback,Object.values(e).forEach(t=>{this.cleanFallbackFields(t)})),e}setup(e){return this.runtimeCore=e,this.formCustomization}submit(){return new Promise((e,t)=>{this.runtimeCore.formRef.value.validate(s=>s?t(s):e(this.cleanFallbackFields(o.toRaw(this.runtimeCore.processor.processedModel.value))))})}hydrate(e){if(!this.runtimeCore)return Promise.reject({code:"0002",message:"hydrate 使用时机错误，建议将 hydrate 操作放到 onMounted 等页面节点挂载完成的钩子中，或者使用响应式的值来注入数据"});this.runtimeCore.hydrateEffect.trackEffect(()=>{o.isRef(e)?o.watch(()=>e.value,()=>{d(this.runtimeCore.model.value,e.value)},{deep:!0,immediate:!0}):o.isReactive(e)?o.watch(()=>e,()=>{d(this.runtimeCore.model.value,e)},{deep:!0,immediate:!0}):d(this.runtimeCore.model.value,e)},{lazy:!0})}customize(e){Object.assign(this.runtimeCore.customizedOptions,e)}}class I{constructor(){c(this,"effects",new Set)}clearEffects(){this.effects.clear()}triggerEffects(){Array.from(this.effects).forEach(e=>e())}trackEffect(e,t={lazy:!1}){return!t.lazy&&e(),this.effects.add(e),()=>this.effects.delete(e)}}class B{constructor(e){c(this,"runtimeCore");c(this,"processedSchemas");c(this,"processedModel");c(this,"getRuntimeMeta");c(this,"stableSchemas",[]);c(this,"stableModel",{});c(this,"schemaPreset",v.schemaPreset);c(this,"componentPropsPreset",v.componentPropsPreset);c(this,"stableUpdaterProcessProgress");c(this,"stableUpdaterTimes",0);c(this,"schemaEffect",new I);c(this,"defaultValueEffect",new I);c(this,"defaultValueInprogressMap",new Map);c(this,"baseDefaultValueFunctionsLength");this.runtimeCore=e,this.processedSchemas=e.schemas,this.processedModel=e.model,this.getRuntimeMeta=e.getRuntimeMeta.bind(e),o.watch(()=>this.processedModel.value,()=>{this.schemaEffect.triggerEffects()},{deep:!0})}parse(e,t){e.forEach((s,r)=>{this.parseItem(s,r,t)})}initSchemas(e){return e.map(t=>{const s={};return t.children&&(s.children=this.initSchemas(t.children)),s})}countFunctionDefaultValues(e){let t=0,s=new Set;function r(i){if(!s.has(i)&&(Array.isArray(i)||i!==null&&typeof i=="object")){s.add(i);for(let l in i)i.hasOwnProperty(l)&&(l==="defaultValue"&&typeof i[l]=="function"&&!i[l].toString().includes("[native code]")&&t++,r(i[l]))}}return r(e),t}parseSchemas(e,t){f.isArrayEmpty(this.processedSchemas.value)&&(this.baseDefaultValueFunctionsLength=this.countFunctionDefaultValues(y(e)),this.processedSchemas.value=this.initSchemas(e)),this.parse(e,t)}parseStable(e){const t={};if(!f.isUndefined(e.stable))t[e.key]=this.parseStable(e.stable);else return e;return t}stableUpdater(e=[]){if(e.every(Boolean)){const t=o.toRaw(this.processedSchemas.value);!f.isProcessInprogress(t)&&f.isObjectEmpty(this.stableModel)&&(this.stableUpdaterProcessProgress||(this.stableUpdaterProcessProgress=Array.from({length:t.length}).fill(!1)),this.stableUpdaterProcessProgress[this.stableUpdaterTimes]=!0,this.stableUpdaterTimes++,this.modelProcessor(t))}}parseItem(e,t,s){const r=this,i=Array.from({length:Object.keys(e).filter(a=>a!=="children").length}).fill(!1);this.objectParser({data:e,index:t,updater:l});function l(a){const u=a.index,m=a.key,S=a.keyIndex;if(!a.stable)return;const E=r.parseStable(a.stable),P=s==null?void 0:s.index,j=s==null?void 0:s.key;let p=E;if(f.isProcessInprogress(p)||(i[S]=!0),s){let h=r.processedSchemas.value[P][j][u][m];h&&f.isObject(h)&&m!=="component"&&(p=d(h,p)),r.processedSchemas.value[P][j][u][m]=p,r.stableUpdater(i)}else{let h=r.processedSchemas.value[u][m];h&&f.isObject(h)&&(p=d(h,p)),r.processedSchemas.value[u][m]=p,r.stableUpdater(i)}}}objectParser(e){const t=e.data;Object.keys(t).forEach((r,i)=>{if(r==="children")this.parseSchemas(t[r],{...e,key:r,keyIndex:i});else{const l=a=>{e.updater({...e,key:r,keyIndex:i,stable:a})};f.isFunction(t[r])?r!=="defaultValue"?this.schemaEffect.trackEffect(()=>{if(r==="component"){const a=t[r](this.getRuntimeMeta());this.promiseFieldParser(a,l,!1)}else this.fieldParser(t[r],l)}):this.defaultValueEffect.trackEffect(()=>{const a=this.schemaEffect.trackEffect(()=>{/\{\s*model\s*\}/.test(t[r].toString())?this.fieldParser(t[r],u=>{if(!u)return l(u);this.defaultValueInprogressMap.set(t[r],u),!f.isProcessInprogress(u)&&this.defaultValueInprogressMap.size===this.baseDefaultValueFunctionsLength&&Array.from(this.defaultValueInprogressMap.values()).every(m=>!m.includes("undefined"))?(l(u),this.defaultValueEffect.clearEffects(),o.nextTick(()=>{a()})):l(u)}):this.fieldParser(t[r],u=>{this.defaultValueInprogressMap.set(t[r],u),!f.isProcessInprogress(u)&&this.defaultValueInprogressMap.size===this.baseDefaultValueFunctionsLength&&Array.from(this.defaultValueInprogressMap.values()).every(m=>!m.includes("undefined"))?(l(u),this.defaultValueEffect.clearEffects(),o.nextTick(()=>{a()})):l(u)})})}):r==="component"||r==="slots"?this.promiseFieldParser(t[r],l,!1):this.fieldParser(t[r],l)}})}replaceUndefinedInString(e,t){return e.replace(/undefined/g,t)}promiseFieldParser(e,t,s){f.isPromise(e)?e.then(r=>{s&&f.isObject(r)?this.objectParser({data:r,updater:t}):t(r)}):(f.isString(e)&&(e=this.replaceUndefinedInString(e,"")),s&&f.isObject(e)?this.objectParser({data:e,updater:t}):t(e))}fieldParser(e,t,s=!0){if(f.isFunction(e))if(e.name.startsWith("__proform_raw_"))t(e);else{const r=e(this.getRuntimeMeta());this.promiseFieldParser(r,t,s)}else o.isRef(e)?o.watch(()=>e.value,()=>{f.isUndefined(e.value)||(s&&f.isObject(e.value)?this.objectParser({data:e.value,updater:t}):t(e.value))},{immediate:!0,deep:!0}):o.isReactive(e)?o.watch(()=>e,()=>{f.isUndefined(e)||(s&&f.isObject(e)?this.objectParser({data:e,updater:t}):t(e))},{immediate:!0,deep:!0}):s&&f.isObject(e)?this.objectParser({data:e,updater:t}):t(e)}modelProcessor(e){e.map(t=>this.createModel(t,this.processedModel.value)),f.isObjectEmpty(this.stableModel)&&this.stableUpdaterProcessProgress.every(Boolean)&&this.defaultValueEffect.effects.size===0&&(this.stableModel=y(this.processedModel.value),this.runtimeCore.hydrateEffect.triggerEffects(),this.runtimeCore.hydrateEffect.clearEffects())}createModel(e,t){f.isListSchema(e)&&(t[e.field]||(t[e.field]=[{}]),e.children.forEach(s=>{this.createModel(s,t[e.field][0])})),f.isGroupSchema(e)&&e.children.forEach(s=>{this.createModel(s,t)}),f.isItemSchema(e)&&(t[e.field]=e.defaultValue)}}function q(n){return typeof n=="function"||Object.prototype.toString.call(n)==="[object Object]"&&!o.isVNode(n)}class ${constructor(e){c(this,"schemas",o.ref([]));c(this,"model",o.ref({}));c(this,"processorBySchemaType",{item:this.runtimeItemProcessor.bind(this),group:this.runtimeGroupProcessor.bind(this),list:this.runtimeListProcessor.bind(this)});c(this,"formRef",o.ref(null));c(this,"hydrateEffect",new I);c(this,"customizedOptions",o.reactive({}));c(this,"globalNativeFormOverride",{props:{},slots:{}});this.setup=e,this.processor=new B(this);const t=this.setup(this);this.processor.parseSchemas(t.schemas)}getRuntimeMeta(){return{model:o.toRaw(y(this.model.value))}}runtimeItemProcessor(e,t,s=this.model.value,r){var h,w,O,C,N,A,F,M,R,z,x,D,U;d(this.globalNativeFormOverride.props,(w=(h=e.native)==null?void 0:h.props)==null?void 0:w.Form),d(this.globalNativeFormOverride.slots,(C=(O=e.native)==null?void 0:O.slots)==null?void 0:C.Form);const i=d(y((A=(N=this.customizedOptions.native)==null?void 0:N.props)==null?void 0:A.FormItem)??{},(M=(F=e.native)==null?void 0:F.props)==null?void 0:M.FormItem),l=d(y((z=(R=this.customizedOptions.native)==null?void 0:R.slots)==null?void 0:z.FormItem)??{},(D=(x=e.native)==null?void 0:x.slots)==null?void 0:D.FormItem),a=r?`${r.field}.${t}.${e.field}`:e.field,u=o.toRaw(e.component);if(!u)return;const m=u.name,S=e.componentProps??{},E=v.placeholderPresetByComponentName;let P=e.placeholder;if(P||(P=`${E[m]??"请输入"}${e.label}`),e.required)if(!e.rules)e.rules=[],(U=e.rules)==null||U.push({required:!0,message:`${e.label}是必填项`});else{const V=e.rules.findIndex(k=>!!k.required);e.rules[V].message=`${e.label}是必填项`}let p=e.show;return p===void 0&&(p=!0),p||delete s[e.field],o.createVNode(b.runtimeDoms.Item,null,{default(){return o.withDirectives(o.createVNode(b.runtimeDoms.FormItem,o.mergeProps(i,{label:`${e.label}:`,rules:e.rules,field:a}),{default(){return o.createVNode(u,o.mergeProps({modelValue:s[e.field],"onUpdate:modelValue":V=>s[e.field]=V,placeholder:P},S),null)},...l}),[[o.vShow,p]])}})}runtimeGroupProcessor(e){let t;return o.createVNode(b.runtimeDoms.Group,{schema:e},q(t=e.children.map(s=>this.runtimeItemProcessor(s)))?t:{default:()=>[t]})}addListItem(e){var t,s;if(!((t=this.processor.stableModel[e.field])!=null&&t[0]))return Promise.reject({code:"0001",message:"异步默认值数据正在处理中，请您耐心等待... "});(s=this.processor.stableModel[e.field])!=null&&s[0]&&this.model.value[e.field].push(y(this.processor.stableModel[e.field][0])),this.formRef.value.clearValidate()}deleteListItem(e,t){this.model.value[e.field].splice(t,1),this.formRef.value.clearValidate()}runtimeListProcessor(e){const t=this;return t.model.value[e.field]||(t.model.value[e.field]=[{}]),o.createVNode(b.runtimeDoms.List,{schema:e},{default(){return t.model.value[e.field].map((s,r)=>o.createVNode(b.runtimeDoms.ListItem,null,{default(){return e.children.map(i=>t.runtimeItemProcessor(i,r,s,e))},delete({container:i}={}){var a;let l=i??o.createVNode("button",null,null);return o.withDirectives(o.createVNode(l,{onClick:()=>t.deleteListItem(e,r)},null),[[o.vShow,((a=t.model.value[e.field])==null?void 0:a.length)>1]])}}))},add({container:s}={}){let r=s??o.createVNode("button",null,[o.createTextVNode("添加")]);return o.createVNode(r,{onClick:()=>t.addListItem(e)},null)}})}runtimeProcessor(e){return e.map(t=>(t.type||(t.type="item"),this.processorBySchemaType[t.type](t)))}exec(){var r,i,l,a;const e=this,t=d(y((i=(r=this.customizedOptions.native)==null?void 0:r.props)==null?void 0:i.Form)??{},this.globalNativeFormOverride.props),s=d(y((a=(l=this.customizedOptions.native)==null?void 0:l.slots)==null?void 0:a.Form)??{},this.globalNativeFormOverride.slots);return o.createVNode(b.runtimeDoms.Form,o.mergeProps(t,{ref:this.formRef,model:this.model.value}),{default(){return e.runtimeProcessor(e.schemas.value)},...s})}}class b{}c(b,"runtimeDoms");const g=class g{static getPlaceholderPrefixPresetByComponentName(){const e={请选择:["Select","Tree","TreeSelect"],请输入:["Input"]},t={};for(let s in e)e[s].forEach(r=>{t[r]=s});return t}};c(g,"schemaPreset",{type:{defaultValue:"item"},component:{defaultValue:void 0},componentProps:{defaultValue:void 0},defaultValue:{defaultValue:void 0},label:{defaultValue:""},field:{defaultValue:"__yiwwhl_async_field_fallback"},rules:{defaultValue:[]},show:{defaultValue:!0},required:{defaultValue:!1},placeholder:{defaultValue:void 0},children:{defaultValue:[]},native:void 0}),c(g,"componentPropsPreset",{options:{defaultValue:[]}}),c(g,"placeholderPresetByComponentName",g.getPlaceholderPrefixPresetByComponentName());let v=g;const G=o.defineComponent({props:{setup:{type:Function,required:!0}},setup(n){const e=new $(n.setup);return()=>e.exec()}});function K(n){const e=new T(n);return[e.setup.bind(e),{submit:e.submit.bind(e),hydrate:e.hydrate.bind(e),customize:e.customize.bind(e)}]}function W(n){return{install(){b.runtimeDoms=n}}}function H(n,e){return e==="raw"&&Object.defineProperty(n,"name",{value:`__proform_raw_${n.name}`,writable:!0}),n}exports.ProForm=G;exports.useForm=K;exports.useFormRenderer=W;exports.useModifiers=H;
