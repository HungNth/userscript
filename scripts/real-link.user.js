// ==UserScript==
// @name         Copy Real Link (Facebook)
// @version      2.0
// @namespace    https://github.com/HungNth/userscripts
// @license      MIT
// @description  Extract and copy clean URLs from Facebook redirect links, stripping tracking parameters like fbclid.
// @author       HungNth
// @match        *://*.facebook.com/*
// @grant        GM_setClipboard
// ==/UserScript==

(function() {
    'use strict';

    // List of known tracking parameters to strip from URLs
    const TRACKING_PARAMS = [
        // Facebook tracking
        'fbclid',
        'fb_action_ids',
        'fb_action_types',
        'fb_source',
        'fb_ref',
        'fbid',
        'action_object_map',
        'action_type_map',
        'action_ref_map',
        // UTM parameters (common across platforms)
        'utm_source',
        'utm_medium',
        'utm_campaign',
        'utm_term',
        'utm_content',
        'utm_id',
        'utm_source_platform',
        'utm_creative_format',
        'utm_marketing_tactic',
        // Google tracking
        'gclid',
        'gclsrc',
        'gbraid',
        'wbraid',
        // Microsoft/Bing
        'msclkid',
        // Other common trackers
        'ref',
        'referral',
        '_hsenc',
        '_hsmi',
        'mc_cid',
        'mc_eid',
        'igshid',
        'yclid',
        'zanpid',
        'dclid',
        'srsltid',
    ];

    /**
     * Remove known tracking parameters from a URL string.
     * @param {string} url
     * @returns {string} cleaned URL
     */
    const cleanTrackingParams = (url) => {
        try {
            const parsed = new URL(url);
            TRACKING_PARAMS.forEach(param => parsed.searchParams.delete(param));
            // Reconstruct without trailing '?' if no params remain
            return parsed.toString();
        } catch {
            // Not a valid URL, return as-is
            return url;
        }
    };

    const createCopyButton = (url) => {
        const button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.zIndex = '1000';
        button.style.backgroundColor = '#007bff';
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.padding = '5px 10px';
        button.style.borderRadius = '4px';
        button.style.cursor = 'pointer';

        // SVG icon
        const svgIcon = `<svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M10.975 14.51a1.05 1.05 0 0 0 0-1.485 2.95 2.95 0 0 1 0-4.172l3.536-3.535a2.95 2.95 0 1 1 4.172 4.172l-1.093 1.092a1.05 1.05 0 0 0 1.485 1.485l1.093-1.092a5.05 5.05 0 0 0-7.142-7.142L9.49 7.368a5.05 5.05 0 0 0 0 7.142c.41.41 1.075.41 1.485 0zm2.05-5.02a1.05 1.05 0 0 0 0 1.485 2.95 2.95 0 0 1 0 4.172l-3.5 3.5a2.95 2.95 0 1 1-4.171-4.172l1.025-1.025a1.05 1.05 0 0 0-1.485-1.485L3.87 12.99a5.05 5.05 0 0 0 7.142 7.142l3.5-3.5a5.05 5.05 0 0 0 0-7.142 1.05 1.05 0 0 0-1.485 0z" fill="#fff"/></svg>`;

        button.innerHTML = `${svgIcon} Copy Real Link`;

        button.onclick = () => {
            GM_setClipboard(url);
            button.textContent = 'Copied!';
            setTimeout(() => button.remove(), 2000);
        };

        return button;
    };

    document.addEventListener('contextmenu', function(event) {
        let target = event.target;

        // Traverse up to find an anchor element in case the click is on a child
        while (target && target.tagName !== 'A') {
            target = target.parentElement;
        }

        if (!target || target.tagName !== 'A' || !target.href) return;

        let url = target.href;
        let realURL = null;

        // Facebook redirect links use the pattern: /l.php?u=<encoded_url>&...
        const fbRedirect = url.match(/[?&]u=([^&]+)/);
        if (fbRedirect) {
            realURL = decodeURIComponent(fbRedirect[1]);
        } else {
            // Plain link on Facebook - still clean tracking params
            realURL = url;
        }

        // Strip tracking parameters from the resolved URL
        realURL = cleanTrackingParams(realURL);

        // Only show button if the cleaned URL differs from the raw href,
        // or if the link is a Facebook redirect (always helpful to surface the real URL)
        if (realURL && realURL !== url) {
            const button = createCopyButton(realURL);
            document.body.appendChild(button);
            const rect = target.getBoundingClientRect();
            button.style.top = `${rect.top + window.scrollY}px`;
            button.style.left = `${rect.right + window.scrollX + 5}px`;

            setTimeout(() => button.remove(), 2000);
        }
    });
})();
