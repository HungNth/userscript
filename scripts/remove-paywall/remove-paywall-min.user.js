// ==UserScript==
// @name         Remove Paywall Opener
// @namespace    https://github.com/HungNth/userscripts
// @version      1.1.1
// @description  Add a Tampermonkey menu command to open the current HTTPS page through removepaywall.com.
// @author       HungNth
// @match        *://*/*
// @noframes
// @run-at       document-idle
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @license      MIT
// @icon         https://www.google.com/s2/favicons?domain=medium.com
// ==/UserScript==

!function(){"use strict";if(window.self!==window.top)return;GM_registerMenuCommand("Open with Remove Paywall",()=>{const e=(e=>{let r;try{r=new URL(e)}catch{return{isValid:!1,error:"URL hien tai khong hop le."}}return"https:"!==r.protocol?{isValid:!1,error:"URL hien tai phai su dung giao thuc https://."}:r.hostname?{isValid:!0,url:r.href}:{isValid:!1,error:"URL hien tai khong co ten mien hop le."}})(window.location.href);if(!e.isValid)return r=e.error,void alert(`[Remove Paywall] ${r}`);var r;GM_openInTab(`https://www.removepaywall.com/${e.url}`,{active:!0,insert:!0})})}();