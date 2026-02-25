// ==UserScript==
// @name         Flaticon SVG Downloader
// @version      1.1
// @description  Download SVG icons from Flaticon.
// @author       HungNth
// @homepage     https://github.com/HungNth/userscripts
// @match        *://www.flaticon.com/*
// @license      MIT
// @icon         https://www.flaticon.com/favicon.ico
// ==/UserScript==

!function(){"use strict";function e(){const e=document.getElementById("fi-premium-download-buttons");if(!e)return;if(document.getElementById("custom-download-button"))return;const t=document.createElement("a");t.href="#",t.className="btn col mg-none bj-button bj-button--primary",t.id="custom-download-button",t.innerHTML="<span>Download SVG</span>",t.addEventListener("click",(e=>{e.preventDefault(),async function(){var e=window.location.href.split("?")[0],t=e.split("/")[e.split("/").length-1],n=t.split("_")[1];if(console.log(`Filename: ${t}, ID: ${n}`),!n)return void alert("You can only download an SVG icon while viewing an icon.");if(!document.getElementById("gr_connected"))return void alert("Please login before clicking on me.");try{const e=await fetch("https://www.flaticon.com/editor/icon/svg/"+n+"?type=standard");if(!e.ok)throw new Error("Network response was not ok "+e.statusText);const o=await e.json();if(!o.url)throw new Error("Invalid response data");const r=await fetch(o.url),i=await r.blob(),c=URL.createObjectURL(i),a=document.createElement("a");a.href=c,a.download=`${t}.svg`,document.body.appendChild(a),a.click(),a.remove(),URL.revokeObjectURL(c)}catch(e){console.error(e),alert("Something went wrong >.<")}}()})),e.appendChild(t)}new MutationObserver((t=>{for(const n of t)"childList"===n.type&&e()})).observe(document.body,{childList:!0,subtree:!0}),e()}();