// ==UserScript==
// @name         Remember Collapsed State (Refined Selector) with Sisu student study planner
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Keeps specific elements collapsed across page loads and new tabs.
// @include      https://sisu.*.fi/student/new-plan/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Study structure expand/collapse button selector
    const CLICK_TARGET_SELECTOR = '.expandable__title.expandable__title__size__lg.expandable__title__variant__naked-dotted.openable';

    // additional attribute for the classes when collapsed
    const COLLAPSED_CLASS = 'closed';

    // localStorage key prefix
    const STORAGE_PREFIX = 'student_portal_state_';
    // ---------------------

    setInterval(() => {
        // Find all the clickable & collapsible study structure elements (bachelor's, master's etc phase) on the planner structure page
        const clickableElements = document.querySelectorAll(CLICK_TARGET_SELECTOR);

        clickableElements.forEach((el, index) => {
            // Skip if we've already set up this specific element
            if (el.dataset.tmInitialized === 'true') return;
            el.dataset.tmInitialized = 'true';

            // Give it a unique ID based on its ID or its position on the page
            const uniqueIdentifier = el.id ? el.id : `ui_element_${index}`;
            const storageKey = STORAGE_PREFIX + uniqueIdentifier;

            // Check its current real-world state and our saved preference
            const savedState = localStorage.getItem(storageKey);
            const isCurrentlyClosed = el.classList.contains(COLLAPSED_CLASS);

            // If the site loaded element OPEN, but your saved state says CLOSED -> "Click" it!
            if (savedState === 'true' && !isCurrentlyClosed) {
                el.click();
            }
            // If the site loaded element CLOSED, but your saved state says OPEN -> "Click" it!
            else if (savedState === 'false' && isCurrentlyClosed) {
                el.click();
            }

            // Listen for your manual clicks to update the saved state for next time
            el.addEventListener('click', (event) => {
                // We use a slightly longer delay (150ms) so the site's own React/Angular
                // code has plenty of time to add or remove the 'closed' class before we check it.
                setTimeout(() => {
                    const isNowClosed = el.classList.contains(COLLAPSED_CLASS);
                    localStorage.setItem(storageKey, isNowClosed);
                }, 150);
            });
        });
    }, 500);
})();
