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

(function() {
    'use strict';

    if (window.self !== window.top) {
        return;
    }

    const REMOVE_PAYWALL_BASE_URL = 'https://www.removepaywall.com/';
    const MENU_COMMAND_NAME = 'Open with Remove Paywall';

    const showError = (message) => {
        alert(`[Remove Paywall] ${message}`);
    };

    const getValidHttpsUrl = (rawUrl) => {
        let parsedUrl;

        try {
            parsedUrl = new URL(rawUrl);
        } catch {
            return {
                isValid: false,
                error: 'URL hien tai khong hop le.',
            };
        }

        if (parsedUrl.protocol !== 'https:') {
            return {
                isValid: false,
                error: 'URL hien tai phai su dung giao thuc https://.',
            };
        }

        if (!parsedUrl.hostname) {
            return {
                isValid: false,
                error: 'URL hien tai khong co ten mien hop le.',
            };
        }

        return {
            isValid: true,
            url: parsedUrl.href,
        };
    };

    const openCurrentPageWithRemovePaywall = () => {
        const currentUrl = getValidHttpsUrl(window.location.href);

        if (!currentUrl.isValid) {
            showError(currentUrl.error);
            return;
        }

        GM_openInTab(`${REMOVE_PAYWALL_BASE_URL}${currentUrl.url}`, {
            active: true,
            insert: true,
        });
    };

    GM_registerMenuCommand(MENU_COMMAND_NAME, openCurrentPageWithRemovePaywall);
})();
