// ==UserScript==
// @name             Envato skip iframe
// @description      Skip preview iframe on themeforest.net and codecanyon.net
// @match            *://preview.themeforest.net/item/*
// @match            *://preview.codecanyon.net/item/*
// @version          1.0.1
// @run-at           document-end
// @license          MIT
// @icon            https://envato.com/favicon.ico
// ==/UserScript==

window.location.replace(
    document.getElementsByTagName("iframe")[0].src
);