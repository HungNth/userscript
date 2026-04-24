// ==UserScript==
// @name         Remove Paywall Opener
// @namespace    https://github.com/HungNth/userscripts
// @version      1.2.0
// @description  Add Tampermonkey menu commands to open the current HTTPS page through paywall removal services.
// @author       HungNth
// @match        *://*/*
// @noframes
// @run-at       document-idle
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @license      MIT
// @icon         https://www.google.com/s2/favicons?domain=medium.com
// ==/UserScript==

!function(){"use strict";if(window.self!==window.top)return;const e=e=>{const r=(e=>{let r;try{r=new URL(e)}catch{return{isValid:!1,error:"URL hien tai khong hop le."}}return"https:"!==r.protocol?{isValid:!1,error:"URL hien tai phai su dung giao thuc https://."}:r.hostname?{isValid:!0,url:r.href}:{isValid:!1,error:"URL hien tai khong co ten mien hop le."}})(window.location.href);if(!r.isValid)return i=r.error,void alert(`[Remove Paywall] ${i}`);var i;GM_openInTab(`${e}${r.url}`,{active:!0,insert:!0})};[{menuName:"Open with Archive.is",baseUrl:"https://archive.is/"},{menuName:"Open with Freedium Mirror",baseUrl:"https://freedium-mirror.cfd/"},{menuName:"Open with Remove Paywall",baseUrl:"https://www.removepaywall.com/"}].forEach(({menuName:r,baseUrl:i})=>{GM_registerMenuCommand(r,()=>e(i))})}();