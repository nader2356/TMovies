import{r as c}from"./index.900ad18e.js";function p(t,n){if(t!=null){if(typeof t=="function"){t(n);return}try{t.current=n}catch{throw new Error(`Cannot assign value '${n}' to ref '${t}'`)}}}function S(...t){return n=>{t.forEach(e=>{p(e,n)})}}function R(...t){return c.exports.useMemo(()=>S(...t),t)}var f={exports:{}},a={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var o=c.exports;function l(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var d=typeof Object.is=="function"?Object.is:l,y=o.useState,h=o.useEffect,m=o.useLayoutEffect,x=o.useDebugValue;function v(t,n){var e=n(),u=y({inst:{value:e,getSnapshot:n}}),r=u[0].inst,i=u[1];return m(function(){r.value=e,r.getSnapshot=n,s(r)&&i({inst:r})},[t,e,n]),h(function(){return s(r)&&i({inst:r}),t(function(){s(r)&&i({inst:r})})},[t]),x(e),e}function s(t){var n=t.getSnapshot;t=t.value;try{var e=n();return!d(t,e)}catch{return!0}}function E(t,n){return n()}var g=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?E:v;a.useSyncExternalStore=o.useSyncExternalStore!==void 0?o.useSyncExternalStore:g;(function(t){t.exports=a})(f);const j=f.exports.useSyncExternalStore;function M(t,n){return typeof t=="function"?t(...n):!!t}export{j as a,S as m,M as s,R as u};
