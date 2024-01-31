// ==UserScript==
// @name            Reddit NSFW Unblur
// @namespace       https://greasyfork.org/users/821661
// @match           https://www.reddit.com/*
// @match           https://sh.reddit.com/*
// @grant           GM_addElement
// @grant           GM_addStyle
// @grant           GM_setValue
// @grant           GM_getValue
// @run-at          document-start
// @version         2.3
// @author          hdyzen
// @description     Unblur nsfw in Shreddit
// @license         MIT
// @homepage        https://github.com/zenstorage/Reddit-NSFW-Unblur
// ==/UserScript==
'use strict';

// Elements observer
const elementsDetected = new Set();

// States for NSFW and Spoiler
let { status = true, nsfw = true, spoiler = false } = GM_getValue('states', false);

console.log(status, nsfw, spoiler);

// Verify if Shreddit
document.addEventListener('DOMContentLoaded', () => {
    let isShreddit = document.querySelector('shreddit-app') ? true : false;

    if (isShreddit) return;
    console.log('Not Shreddit');
    observer.disconnect();
});

// Reveal
function reveal(element) {
    const shadowRoot = element.shadowRoot,
        blurredSlot = shadowRoot.querySelector('slot[name="blurred"]'),
        revealed = element.querySelector('[slot="revealed"]'),
        copyRevealed = revealed.cloneNode(true);

    console.log(element);
    // If have prompt to open app, remove it, else remove only blur
    if (element.matches('xpromo-nsfw-blocking-container')) {
        shadowRoot.querySelector('.prompt').remove();
    } else if ((element.getAttribute('reason') === 'nsfw' && nsfw) || (element.getAttribute('reason') === 'spoiler' && spoiler)) {
        revealExec(element, shadowRoot, blurredSlot, copyRevealed);
    } else {
        element.addEventListener('click', e => {
            revealExec(element, shadowRoot, blurredSlot, copyRevealed, 0);
        });
    }
}

// Reveal exec
function revealExec(element, shadowRoot, blurredSlot, copyRevealed, timer = 1000) {
    const style = document.createElement('style');
    style.innerHTML = `.overlay, .bg-scrim { display: none !important; } .outer { height: auto !important; } .inner {display: unset !important; pointer-events: auto !important; background: none !important; filter: none !important; }`;
    shadowRoot.appendChild(style);
    blurredSlot.name = 'revealed';
    setTimeout(() => {
        element.appendChild(copyRevealed);
        const oldRevealed = copyRevealed.previousElementSibling;
        if (oldRevealed.matches('[slot="revealed"]')) {
            oldRevealed.remove();
        }
    }, timer);
}

// Callback for MutationObserver
function callback(mutations) {
    mutations.forEach(mutation => {
        const targets = mutation.target.querySelectorAll('xpromo-nsfw-blocking-container, shreddit-blurred-container');
        targets.forEach(target => {
            if (target.shadowRoot && target.shadowRoot.innerHTML !== '' && !elementsDetected.has(target)) {
                console.log(target);
                elementsDetected.add(target);
                reveal(target);
            }
        });
    });
}

// Mutation observer
const observer = new MutationObserver(callback);

// Start observing
observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
});

document.addEventListener('DOMContentLoaded', e => {
    let isShreddit = document.querySelector('shreddit-app') ? true : false;

    if (!isShreddit) {
        observer.disconnect();
        console.log('Not Shreddit');
        return;
    }

    console.log('Shreddit');

    const status = GM_addElement(document.querySelector('.pl-lg'), 'div', {
        id: 'menu',
    });
    status.addEventListener('click', e => {
        status.classList.toggle('active');
    });
    status.innerHTML = `<div id="popup-toggle">Unblur</div><form id="status-container"><div id="status"></div><div id="container-toggle"><label for="toggle"><input id="toggle" name="toggle" type="checkbox"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M13 3C13 2.44772 12.5523 2 12 2C11.4477 2 11 2.44772 11 3V12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12V3ZM8.6092 5.8744C9.09211 5.60643 9.26636 4.99771 8.99839 4.5148C8.73042 4.03188 8.12171 3.85763 7.63879 4.1256C4.87453 5.65948 3 8.61014 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 8.66747 19.1882 5.75928 16.5007 4.20465C16.0227 3.92811 15.4109 4.09147 15.1344 4.56953C14.8579 5.04759 15.0212 5.65932 15.4993 5.93586C17.5942 7.14771 19 9.41027 19 12C19 15.866 15.866 19 12 19C8.13401 19 5 15.866 5 12C5 9.3658 6.45462 7.06997 8.6092 5.8744Z"></path></svg></label></div><div id="selected-ops"><label for="toggle-nsfw"><input type="checkbox" name="toggle-nsfw" id="toggle-nsfw"><span class="slider"></span><span class="slider-label">Unblur NSFW</span></label><label for="toggle-spoiler"><input type="checkbox" name="toggle-spoiler" id="toggle-spoiler"><span class="slider"></span><span class="slider-label">Unblur Spoiler</span></label></div></form>`;
    status.then(() => {
        const toggle = document.getElementById('toggle'),
            toggleNSFW = document.getElementById('toggle-nsfw'),
            toggleSpoiler = document.getElementById('toggle-spoiler'),
            form = document.getElementById('status-container');

        form.addEventListener('change', e => {
            GM_setValue('states', { status: toggle.checked, nsfw: toggleNSFW.checked, spoiler: toggleSpoiler.checked });
        });
        toggle.checked = status;
        toggleNSFW.checked = nsfw;
        toggleSpoiler.checked = spoiler;
    });
});

// Styles
GM_addStyle(`#menu { font-size: 15px; font-weight: 600; padding: 0 15px; cursor: pointer; background-color: var(--color-secondary-background); border-radius: 999px; position: relative;height: 40px;display: flex;align-items: center;justify-content: center;&:hover { background-color: var(--button-color-background-hover); } &.active #status-container {visibility: visible;opacity: 1;}}#status-container {visibility: hidden;opacity: 0;position: absolute;top: 100%;right: 0;background-color: #1f1b19;color: #d1c2b7;font-family: system-ui, sans-serif;font-size: 28px;transition: 0.1s ease;border-radius: 10px;&:has(input#toggle:not(:checked)) {& label {color: #bdafa5;}& #status::before {content: 'OFF';}& #selected-ops input:checked + .slider {background-color: hsl(15, 61%, 59%);&::before {background-color: hsl(17, 75%, 40%);}}}}#status {padding: 10px;width: 180px;text-align: center;background-color: rgba(255, 255, 255, 0.03);&::before {content: 'ON';}}#container-toggle {display: flex;justify-content: center;align-items: center;width: 100%;height: 80px;font-size: 16px;}#toggle {display: none;& + svg {transition: 0.1s ease;cursor: pointer;width: 4rem;height: auto;padding: 5px;border-radius: 10px;fill: #cc6b47;&:hover {fill: #db683e;background-color: rgba(255, 255, 255, 0.1);}}&:checked + svg {fill: #ff3e00;}}#selected-ops {font-size: 16px;padding: 10px;display: flex;flex-direction: column;gap: 8px;--slider-height: 1.4rem;--slider-width: 2.4rem;--slider-radius: 20px;--slider-background: rgba(255, 255, 255, 0.1);--slider-active-background: #ff7f55;--slider-thumb-size: 1rem;--slider-thum-offset: 0.2rem;--slider-thumb-background: rgba(202, 57, 0, 0.801);& > label {display: flex;justify-content: start;cursor: pointer;user-select: none;font-size: 16px;& input {display: none;&:checked + .slider {background-color: var(--slider-active-background);&::before {scale: 1.15;left: calc(var(--slider-width) - var(--slider-thumb-size) - var(--slider-thum-offset));background-color: var(--slider-thumb-background);}}}& .slider-label {flex-grow: 1;text-align: center;color: #d1c2b7;line-height: normal;}& .slider {position: relative;display: flex;align-items: center;height: var(--slider-height);width: var(--slider-width);border-radius: var(--slider-radius);background-color: var(--slider-background);transition: 0.1s ease;&::before {content: '';position: absolute;border-radius: inherit;height: var(--slider-thumb-size);width: var(--slider-thumb-size);left: var(--slider-thum-offset);background-color: var(--slider-background);transition: 0.3s ease;}}}} `);

// Remove overlay NSFW
GM_addStyle(`body[style="pointer-events: none; overflow: hidden;"] { pointer-events: auto !important; overflow: auto !important; } div[style="position: fixed; inset: 0px; backdrop-filter: blur(4px);"] { display: none !important; } shreddit-async-loader[bundlename="desktop_rpl_nsfw_blocking_modal"] { display: none !important; } [role="presentation"][style="filter: blur(4px);"] { filter: none !important; }shreddit-blurred-container{ display: flex ;height: 100%; } .sidebar-grid.fixed{ position: unset !important; }`);
