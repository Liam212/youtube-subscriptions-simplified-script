// ==UserScript==
// @name         YouTube Subscriptions Simplified
// @namespace    https://liamstout.com/
// @version      2024-10-04
// @description  Simplifies the YouTube Subscriptions page by removing distracting elements and adjusting layout.
// @author       Liam212
// @match        https://www.youtube.com/feed/subscriptions
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function getElement(id) {
        return document.getElementById(id);
    }

    function hideElementById(id) {
        const element = getElement(id);
        if (element) {
            setElementStyle(element, { display: 'none' });
        } else {
            console.warn(`Element with ID '${id}' not found.`);
        }
    }

    function setElementStyle(element, styles) {
        if (element && styles) {
            Object.assign(element.style, styles);
        } else {
            console.error('Invalid element or styles provided.');
        }
    }

    function hideDismissableSections() {
        const sectionRenderers = document.querySelectorAll('ytd-rich-section-renderer');
        sectionRenderers.forEach(section => {
            if (section.hasAttribute('modern-vwt-style-v2')) {
                section.style.display = 'none';
            }
        });
    }

    const observer = new MutationObserver(() => {
        hideElementById('guide');
        hideElementById('logo');
        hideElementById('start');

        // Dissmissable sections contain suggested shorts, news and other distractions
        hideDismissableSections();

        setElementStyle(getElement('page-manager'), { marginLeft: 0 });
        setElementStyle(document.querySelector('#container.ytd-masthead'), { justifyContent: 'center' });
        setElementStyle(document.querySelector('#buttons.ytd-masthead'), { display: 'none' });
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
