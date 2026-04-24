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

(function() {
    'use strict';

    if (window.self !== window.top) {
        return;
    }

    const PAYWALL_OPENERS = [
        {
            menuName: 'Open with Archive.is',
            baseUrl: 'https://archive.is/',
        },
        {
            menuName: 'Open with Freedium Mirror',
            baseUrl: 'https://freedium-mirror.cfd/',
        },
        {
            menuName: 'Open with Remove Paywall',
            baseUrl: 'https://www.removepaywall.com/',
        },
    ];

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

    const openCurrentPageWithPaywallOpener = (baseUrl) => {
        const currentUrl = getValidHttpsUrl(window.location.href);

        if (!currentUrl.isValid) {
            showError(currentUrl.error);
            return;
        }

        GM_openInTab(`${baseUrl}${currentUrl.url}`, {
            active: true,
            insert: true,
        });
    };

    PAYWALL_OPENERS.forEach(({ menuName, baseUrl }) => {
        GM_registerMenuCommand(menuName, () => openCurrentPageWithPaywallOpener(baseUrl));
    });
})();
