// ==UserScript==
// @name            Reddit NSFW Unblur
// @namespace       https://greasyfork.org/users/821661
// @match           https://www.reddit.com/*
// @match           https://sh.reddit.com/*
// @grant           GM_addElement
// @grant           GM_addStyle
// @grant           GM_setValue
// @grant           GM_getValue
// @run-at          document-body
// @noframes
// @version         2.3.7a
// @author          hdyzen
// @description     Unblur nsfw in Shreddit
// @license         MIT
// @homepage        https://github.com/zenstorage/Reddit-NSFW-Unblur
// ==/UserScript==
'use strict';

// States for NSFW and Spoiler
let { status = true, nsfw = true, spoiler = false } = GM_getValue('states', false);

// Mutation observer
const observer = new MutationObserver(callback);

// Callback for MutationObserver
function callback(mutations) {
    const nsfwModal = document.querySelector('shreddit-async-loader[bundlename*="nsfw_blocking_modal"]'),
        prompt = document.querySelector('xpromo-nsfw-blocking-container:not([removedPrompt])'),
        blurrends = document.querySelectorAll('shreddit-blurred-container:not([clicked])'),
        menuAdded = !!document.getElementById('menu');

    if (!menuAdded) initMenu();

    if (!status) return;

    if (nsfwModal)
        // Remove NSFW modal loader
        nsfwModal.remove();

    // Remove prompt
    if (prompt?.shadowRoot?.innerHTML) {
        prompt.setAttribute('removedPrompt', '');
        prompt.shadowRoot.children[1].remove();
    }

    // Click blurrends
    blurrends.forEach(blurred => {
        if (blurred.shadowRoot?.innerHTML) {
            blurred.setAttribute('clicked', '');
            const clickIfMatch = (blurred.matches('[reason="nsfw"]') && nsfw) || (blurred.matches('[reason="spoiler"]') && spoiler) ? blurred.children[0].click() : null;
        }
    });
}

function initMenu() {
    // Add menu
    const menu = GM_addElement(document.querySelector('header.v2 > nav'), 'div', {
        id: 'menu',
    });

    // Add toggle
    menu.addEventListener('click', e => {
        if (e.target.id === 'menu' || e.target.id === 'popup-toggle') menu.classList.toggle('active');
    });

    // Add popup html
    menu.innerHTML = `<div id="popup-toggle">Unblur</div><form id="status-container"><div id="status"></div><div id="container-toggle"><label for="toggle"><input id="toggle" name="toggle" type="checkbox"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V3ZM8.6092 5.8744C9.09211 5.60643 9.26636 4.99771 8.99839 4.5148C8.73042 4.03188 8.12171 3.85763 7.63879 4.1256C4.87453 5.65948 3 8.61014 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 8.66747 19.1882 5.75928 16.5007 4.20465C16.0227 3.92811 15.4109 4.09147 15.1344 4.56953C14.8579 5.04759 15.0212 5.65932 15.4993 5.93586C17.5942 7.14771 19 9.41027 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 9.3658 6.45462 7.06997 8.6092 5.8744Z"></path></svg></label></div><div id="selected-ops"><label for="toggle-nsfw"><input type="checkbox" name="toggle-nsfw" id="toggle-nsfw"><span class="slider"></span><span class="slider-label">Unblur NSFW</span></label><label for="toggle-spoiler"><input type="checkbox" name="toggle-spoiler" id="toggle-spoiler"><span class="slider"></span><span class="slider-label">Unblur Spoiler</span></label></div></form>`;
    menu.then(() => {
        const toggle = document.getElementById('toggle'),
            toggleNSFW = document.getElementById('toggle-nsfw'),
            toggleSpoiler = document.getElementById('toggle-spoiler'),
            form = document.getElementById('status-container');

        toggle.checked = status;
        toggleNSFW.checked = nsfw;
        toggleSpoiler.checked = spoiler;

        form.addEventListener('change', e => {
            GM_setValue('states', { status: toggle.checked, nsfw: toggleNSFW.checked, spoiler: toggleSpoiler.checked });
        });

        document.addEventListener('click', e => {
            if (!e.target.closest('#menu') && menu.classList.contains('active')) menu.classList.remove('active'); // Close menu
            if (e.target.closest('media-telemetry-observer')) e.preventDefault(); // Prevent open post when clicking on video
        });
    });
}

// Start observing
observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
});

if (status) {
    GM_addStyle(`body.v2 {overflow: auto !important;pointer-events: auto !important;}.sidebar-grid {filter: blur(0) !important;}[bundlename="desktop_rpl_nsfw_blocking_modal"],body > div[style*="blur"] {display: none !important}`);
}

document.addEventListener('DOMContentLoaded', e => {
    let isShreddit = document.body.matches('.v2');
    // Check if Shreddit
    if (!isShreddit) observer.disconnect();
});

// Styles
GM_addStyle(`#menu {pointer-events: auto;z-index: 999;font-size: 15px;font-weight: 600;padding: 0 15px;cursor: pointer;background-color: var(--color-secondary-background);border-radius: 999px;height: calc(var(--shreddit-header-height) - 1rem);display: flex;align-items: center;justify-content: center;grid-column: -1;min-width: max-content;&:hover {background-color: var(--button-color-background-hover);}&.active #status-container {visibility: visible;opacity: 1;}}#status-container {box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);cursor: auto;visibility: hidden;opacity: 0;position: absolute;top: 100%;right: 0;background-color: #1f1b19;color: #d1c2b7;font-family: system-ui, sans-serif;font-size: 28px;transition: 0.1s ease;border-radius: 10px;&:has(input#toggle:not(:checked)) {& label {color: #bdafa5;}& #status::before {content: 'OFF';}& #selected-ops input:checked + .slider {background-color: hsl(15, 61%, 59%);&::before {background-color: hsl(17, 75%, 40%);}}}}#status {padding: 10px;width: 180px;text-align: center;background-color: rgba(255, 255, 255, 0.03);&::before {content: 'ON';}}#container-toggle {display: flex;justify-content: center;align-items: center;width: 100%;height: 80px;font-size: 16px;}#toggle {display: none;& + svg {transition: 0.1s ease;cursor: pointer;width: 4rem;height: auto;padding: 5px;border-radius: 10px;fill: #cc6b47;&:hover {fill: #db683e;background-color: rgba(255, 255, 255, 0.1);}}&:checked + svg {fill: #ff3e00;}}#selected-ops {font-size: 16px;padding: 10px;display: flex;flex-direction: column;gap: 8px;--slider-height: 1.4rem;--slider-width: 2.4rem;--slider-radius: 20px;--slider-background: rgba(255, 255, 255, 0.1);--slider-active-background: #ff7f55;--slider-thumb-size: 1rem;--slider-thum-offset: 0.2rem;--slider-thumb-background: rgba(202, 57, 0, 0.801);& > label {display: flex;justify-content: start;cursor: pointer;user-select: none;font-size: 16px;& input {display: none;&:checked + .slider {background-color: var(--slider-active-background);&::before {scale: 1.15;left: calc(var(--slider-width) - var(--slider-thumb-size) - var(--slider-thum-offset));background-color: var(--slider-thumb-background);}}}& .slider-label {flex-grow: 1;text-align: center;color: #d1c2b7;line-height: normal;}& .slider {position: relative;display: flex;align-items: center;height: var(--slider-height);width: var(--slider-width);border-radius: var(--slider-radius);background-color: var(--slider-background);transition: 0.1s ease;&::before {content: '';position: absolute;border-radius: inherit;height: var(--slider-thumb-size);width: var(--slider-thumb-size);left: var(--slider-thum-offset);background-color: var(--slider-background);transition: 0.3s ease;}}}}@media (hover: none) and (any-pointer: coarse) {#menu {margin-left: 0.5rem;}}body.v2 {overflow: auto !important;pointer-events: auto !important;}.sidebar-grid {filter: blur(0) !important;}`);
