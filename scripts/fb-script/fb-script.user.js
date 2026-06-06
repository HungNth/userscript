// ==UserScript==
// @name         Facebook Script for useful helper features
// @version      2.0.2
// @namespace    https://github.com/HungNth/userscripts
// @license      MIT
// @description  A Facebook toolkit for streamlining browsing, cleaning links, and adding useful helper features.
// @author       HungNth
// @match        *://*.facebook.com/*
// @icon         https://www.google.com/s2/favicons?domain=facebook.com
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
        button.style.display = 'flex';
        button.style.alignItems = 'center';
        button.style.gap = '5px';

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

            setTimeout(() => button.remove(), 5000);
        }
    });

    // Remove Facebook Ads
     const selector = `
        [id^="mount_0_0_"] > div > div:first-child > div.x9f619.x1n2onr6.x1ja2u2z
        > div.x9f619.x1n2onr6.x1ja2u2z:nth-child(4)
        > div.x78zum5.xdt5ytf.x1n2onr6.x1ja2u2z
        > div.x78zum5.xdt5ytf.x1n2onr6.xat3117.xxzkxad
        > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4:first-child
        > div.x9f619.x1ja2u2z.x78zum5.x2lah0s.x1n2onr6.xl56j7k.x1qjc9v5.xozqiw3.x1q0g3np.x1t2pt76.x17upfok:first-child
        > div.x9f619.x1ja2u2z.x78zum5.x1n2onr6.x1r8uery.x1iyjqo2.xs83m0k.xeuugli.x1qughib.x1cy8zhl.xozqiw3.x1q0g3np.xylbxtu.x1t2pt76.xornbnt
        > div.x9f619.x1ja2u2z.xnp8db0.x112wk31.xnjgh8c.xxc7z9f.x1t2pt76.x1u2d2a2.x6ikm8r.x10wlt62.x7wzq59.xxzkxad.x1daaz14:last-child
        > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.xedcshv.x1t2pt76
        > div.xb57i2i.x1q594ok.x5lxg6s.x78zum5.xdt5ytf.x6ikm8r.x1ja2u2z.x1pq812k.x1rohswg.xfk6m8.x1yqm8si.xjx87ck.x1l7klhg.x1iyjqo2.xs83m0k.x2lwn1j.xx8ngbg.xwo3gff.x1oyok0e.x1odjw0f.x1n2onr6.xq1qtft
        > div.x78zum5.xdt5ytf.x1iyjqo2.x1n2onr6:first-child
        > div.x1y1aw1k
    `.replace(/\s+/g, ' ').trim();

    function removeElement() {
        document.querySelectorAll(selector).forEach((el) => {
            el.remove();
        });
    }

    removeElement();

    const observer = new MutationObserver(() => {
        removeElement();
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true,
    });
})();
