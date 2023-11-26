"use strict";var I=Object.defineProperty;var v=(c,e,t)=>e in c?I(c,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[e]=t;var l=(c,e,t)=>(v(c,typeof e!="symbol"?e+"":e,t),t);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const n=require("vue");class O{constructor(e){l(this,"runtimeCore");this.formCustomization=e}cleanFallbackFields(e){return e!==null&&typeof e=="object"&&(delete e.__yiwwhl_async_field_fallback,Object.values(e).forEach(t=>{this.cleanFallbackFields(t)})),e}setup(e){return this.runtimeCore=e,this.formCustomization}submit(){return new Promise((e,t)=>{this.runtimeCore.formRef.value.validate(s=>s?t(s):e(this.cleanFallbackFields(n.toRaw(this.runtimeCore.processor.processedModel.value))))})}}class u{static typeChecker(e){return{}.toString.call(e)}static isArray(e){return this.typeChecker(e)==="[object Array]"}static isFunction(e){return this.typeChecker(e)==="[object Function]"}static isPromise(e){return e instanceof Promise}static isObject(e){return this.typeChecker(e)==="[object Object]"}static isAsyncFunction(e){return this.typeChecker(e)==="[object AsyncFunction]"}static isUndefined(e){return e===void 0}static isArrayEmpty(e){return(e==null?void 0:e.length)<1}static isObjectEmpty(e){return this.isArrayEmpty(Object.keys(e))}static isListSchema(e){return e.type==="list"}static isGroupSchema(e){return e.type==="group"}static isItemSchema(e){return this.isUndefined(e.type)||e.type==="item"}static isProcessInprogress(e){if(e===void 0)return!0;if(this.isObject(e)){if(e.setup&&this.isFunction(e.setup)&&e.props)return!1;if(this.isObjectEmpty(e))return!0;for(const t in e)if(e.hasOwnProperty(t)&&this.isProcessInprogress(e[t]))return!0}else if(this.isArray(e)){if(this.isArrayEmpty(e))return!0;for(const t of e)if(this.isProcessInprogress(t))return!0}return!1}}function S(c){const e=new WeakMap;function t(s){if(s===null||typeof s!="object")return s;if(s instanceof Date)return new Date(s);if(s instanceof RegExp)return new RegExp(s);if(s instanceof Map){const i=new Map;for(let[o,a]of s)i.set(t(o),t(a));return i}if(s instanceof Set){const i=new Set;for(let o of s)i.add(t(o));return i}if(e.has(s))return e.get(s);if(Array.isArray(s)){const i=[];e.set(s,i);for(let o=0;o<s.length;o++)i[o]=t(s[o]);return i}const r=Object.create(Object.getPrototypeOf(s));e.set(s,r);for(let i in s)s.hasOwnProperty(i)&&(r[i]=t(s[i]));return r}return t(c)}class w{constructor(){l(this,"effects",new Set)}clearEffects(){this.effects.clear()}triggerEffects(){Array.from(this.effects).forEach(e=>e())}trackEffect(e){return e(),this.effects.add(e),()=>this.effects.delete(e)}}class C{constructor(e){l(this,"processedSchemas");l(this,"processedModel");l(this,"getRuntimeMeta");l(this,"stableSchemas",[]);l(this,"stableModel",{});l(this,"schemaPreset",V.schemaPreset);l(this,"componentPropsPreset",V.componentPropsPreset);l(this,"stableUpdaterProcessProgress");l(this,"stableUpdaterTimes",0);l(this,"schemaEffect",new w);l(this,"defaultValueEffect",new w);l(this,"defaultValueInprogressMap",new Map);l(this,"baseDefaultValueFunctionsLength");this.processedSchemas=e.schemas,this.processedModel=e.model,this.getRuntimeMeta=e.getRuntimeMeta.bind(e),n.watch(()=>this.processedModel.value,()=>{this.schemaEffect.triggerEffects()},{deep:!0})}parse(e,t){e.forEach((s,r)=>{this.parseItem(s,r,t)})}initSchemas(e){return e.map(t=>{const s={};return t.children&&(s.children=this.initSchemas(t.children)),s})}countFunctionDefaultValues(e){let t=0,s=new Set;function r(i){if(!s.has(i)&&(Array.isArray(i)||i!==null&&typeof i=="object")){s.add(i);for(let o in i)i.hasOwnProperty(o)&&(o==="defaultValue"&&typeof i[o]=="function"&&i[o].toString().includes("defaultValue")&&t++,r(i[o]))}}return r(e),t}parseSchemas(e,t){u.isArrayEmpty(this.processedSchemas.value)&&(this.baseDefaultValueFunctionsLength=this.countFunctionDefaultValues(S(e)),this.processedSchemas.value=this.initSchemas(e)),this.parse(e,t)}parseStable(e){const t={};if(!u.isUndefined(e.stable))t[e.key]=this.parseStable(e.stable);else return e;return t}stableUpdater(e=[]){if(e.every(Boolean)){const t=n.toRaw(this.processedSchemas.value);!u.isProcessInprogress(t)&&u.isObjectEmpty(this.stableModel)&&(this.stableUpdaterProcessProgress||(this.stableUpdaterProcessProgress=Array.from({length:t.length}).fill(!1)),this.stableUpdaterProcessProgress[this.stableUpdaterTimes]=!0,this.stableUpdaterTimes++,this.modelProcessor(t))}}parseItem(e,t,s){const r=this,i=Array.from({length:Object.keys(e).filter(a=>a!=="children").length}).fill(!1);this.objectParser({data:e,index:t,updater:o});function o(a){const f=a.index,p=a.key,P=a.keyIndex;if(!a.stable)return;const j=r.parseStable(a.stable),b=s==null?void 0:s.index,g=s==null?void 0:s.key;let d=j;if(u.isProcessInprogress(d)||(i[P]=!0),s){let h=r.processedSchemas.value[b][g][f][p];h&&u.isObject(h)&&p!=="component"&&(d=Object.assign(h,d)),r.processedSchemas.value[b][g][f][p]=d,r.stableUpdater(i)}else{let h=r.processedSchemas.value[f][p];h&&u.isObject(h)&&(d=Object.assign(h,d)),r.processedSchemas.value[f][p]=d,r.stableUpdater(i)}}}objectParser(e){const t=e.data;Object.keys(t).forEach((r,i)=>{if(r==="children")this.parseSchemas(t[r],{...e,key:r,keyIndex:i});else{const o=a=>{e.updater({...e,key:r,keyIndex:i,stable:a})};if(u.isFunction(t[r]))r!=="defaultValue"?this.schemaEffect.trackEffect(()=>{if(r==="component"){const a=t[r](this.getRuntimeMeta());this.promiseFieldParser(a,o,!1)}else this.fieldParser(t[r],o)}):this.defaultValueEffect.trackEffect(()=>{const a=this.schemaEffect.trackEffect(()=>{/\{\s*model\s*\}/.test(t[r].toString())?this.fieldParser(t[r],f=>{if(!f)return o(f);this.defaultValueInprogressMap.set(t[r],f),!u.isProcessInprogress(f)&&this.defaultValueInprogressMap.size===this.baseDefaultValueFunctionsLength&&Array.from(this.defaultValueInprogressMap.values()).every(p=>!p.includes("undefined"))?(o(f),this.defaultValueEffect.clearEffects(),a()):o(f)}):this.fieldParser(t[r],f=>{this.defaultValueInprogressMap.set(t[r],f),!u.isProcessInprogress(f)&&this.defaultValueInprogressMap.size===this.baseDefaultValueFunctionsLength&&Array.from(this.defaultValueInprogressMap.values()).every(p=>!p.includes("undefined"))?(o(f),this.defaultValueEffect.clearEffects(),a()):o(f)})})});else if(r==="component"){const a=t[r];this.promiseFieldParser(a,o,!1)}else this.fieldParser(t[r],o)}})}promiseFieldParser(e,t,s){u.isPromise(e)?e.then(r=>{s&&u.isObject(r)?this.objectParser({data:r,updater:t}):t(r)}):s&&u.isObject(e)?this.objectParser({data:e,updater:t}):t(e)}fieldParser(e,t,s=!0){if(u.isFunction(e)){const r=e(this.getRuntimeMeta());this.promiseFieldParser(r,t,s)}else n.isRef(e)?n.watch(()=>e.value,()=>{u.isUndefined(e.value)||(s&&u.isObject(e.value)?this.objectParser({data:e.value,updater:t}):t(e.value))},{immediate:!0,deep:!0}):n.isReactive(e)?n.watch(()=>e,()=>{u.isUndefined(e)||(s&&u.isObject(e)?this.objectParser({data:e,updater:t}):t(e))},{immediate:!0,deep:!0}):s&&u.isObject(e)?this.objectParser({data:e,updater:t}):t(e)}modelProcessor(e){e.map(t=>this.createModel(t,this.processedModel.value)),u.isObjectEmpty(this.stableModel)&&this.stableUpdaterProcessProgress.every(Boolean)&&this.defaultValueEffect.effects.size===0&&(this.stableModel=S(this.processedModel.value))}createModel(e,t){u.isListSchema(e)&&(t[e.field]||(t[e.field]=[{}]),e.children.forEach(s=>{this.createModel(s,t[e.field][0])})),u.isGroupSchema(e)&&e.children.forEach(s=>{this.createModel(s,t)}),u.isItemSchema(e)&&(t[e.field]=e.defaultValue)}}function E(c){return typeof c=="function"||Object.prototype.toString.call(c)==="[object Object]"&&!n.isVNode(c)}class R{constructor(e){l(this,"schemas",n.ref([]));l(this,"model",n.ref({}));l(this,"processorBySchemaType",{item:this.runtimeItemProcessor.bind(this),group:this.runtimeGroupProcessor.bind(this),list:this.runtimeListProcessor.bind(this)});l(this,"formRef",n.ref(null));this.setup=e,this.processor=new C(this);const t=this.setup(this);this.processor.parseSchemas(t.schemas)}getRuntimeMeta(){return{model:n.toRaw(S(this.model.value))}}runtimeItemProcessor(e,t,s=this.model.value,r){var g;const i=r?`${r.field}.${t}.${e.field}`:e.field,o=n.toRaw(e.component);if(!o)return;const a=o.name,f=e.componentProps??{},p=V.placeholderPresetByComponentName;let P=e.placeholder;if(P||(P=`${p[a]??"请输入"}${e.label}`),e.required){e.rules||(e.rules=[]);const d=e.rules.findIndex(h=>!!h.required);d===-1?(g=e.rules)==null||g.push({required:!0,message:`${e.label}是必填项`}):e.rules.splice(d,1,{required:!0,message:`${e.label}是必填项`})}let b=e.show;return b===void 0&&(b=!0),b||delete s[e.field],n.createVNode(m.runtimeDoms.Item,null,{default(){return n.withDirectives(n.createVNode(m.runtimeDoms.FormItem,{label:`${e.label}:`,rules:e.rules,field:i},{default:()=>[n.createVNode(o,n.mergeProps({modelValue:s[e.field],"onUpdate:modelValue":d=>s[e.field]=d,placeholder:P},f),null)]}),[[n.vShow,b]])}})}runtimeGroupProcessor(e){let t;return n.createVNode(m.runtimeDoms.Group,{schema:e},E(t=e.children.map(s=>this.runtimeItemProcessor(s)))?t:{default:()=>[t]})}addListItem(e){var t,s;if(!((t=this.processor.stableModel[e.field])!=null&&t[0]))return Promise.reject({code:"0001",message:"异步默认值数据正在处理中，请您耐心等待... "});(s=this.processor.stableModel[e.field])!=null&&s[0]&&this.model.value[e.field].push(S(this.processor.stableModel[e.field][0]))}deleteListItem(e,t){this.model.value[e.field].splice(t,1);const s=e.children.map(({field:r})=>`${e.field}.${t}.${r}`);this.formRef.value.clearValidate(s)}runtimeListProcessor(e){const t=this;return t.model.value[e.field]||(t.model.value[e.field]=[{}]),n.createVNode(m.runtimeDoms.List,{schema:e},{default(){return t.model.value[e.field].map((s,r)=>n.createVNode(m.runtimeDoms.ListItem,null,{default(){return e.children.map(i=>t.runtimeItemProcessor(i,r,s,e))},delete({container:i}={}){var a;let o=i??n.createVNode("button",null,null);return n.withDirectives(n.createVNode(o,{onClick:()=>t.deleteListItem(e,r)},null),[[n.vShow,((a=t.model.value[e.field])==null?void 0:a.length)>1]])}}))},add({container:s}={}){let r=s??n.createVNode("button",null,[n.createTextVNode("添加")]);return n.createVNode(r,{onClick:()=>t.addListItem(e)},null)}})}runtimeProcessor(e){return e.map(t=>(t.type||(t.type="item"),this.processorBySchemaType[t.type](t)))}exec(){let e;return n.createVNode(m.runtimeDoms.Form,{ref:this.formRef,model:this.model.value},E(e=this.runtimeProcessor(this.schemas.value))?e:{default:()=>[e]})}}class m{}l(m,"runtimeDoms");const y=class y{static getPlaceholderPrefixPresetByComponentName(){const e={请选择:["Select","Tree","TreeSelect"],请输入:["Input"]},t={};for(let s in e)e[s].forEach(r=>{t[r]=s});return t}};l(y,"schemaPreset",{type:{defaultValue:"item"},component:{defaultValue:void 0},componentProps:{defaultValue:void 0},defaultValue:{defaultValue:void 0},label:{defaultValue:""},field:{defaultValue:"__yiwwhl_async_field_fallback"},rules:{defaultValue:[]},show:{defaultValue:!0},required:{defaultValue:!1},placeholder:{defaultValue:void 0},children:{defaultValue:[]}}),l(y,"componentPropsPreset",{options:{defaultValue:[]}}),l(y,"placeholderPresetByComponentName",y.getPlaceholderPrefixPresetByComponentName());let V=y;const A=n.defineComponent({props:{setup:{type:Function,required:!0}},setup(c){const e=new R(c.setup);return()=>e.exec()}});function D(c){const e=new O(c);return[e.setup.bind(e),{submit:e.submit.bind(e)}]}function M(c){return{install(){m.runtimeDoms=c}}}exports.ProForm=A;exports.useForm=D;exports.useFormRenderer=M;
