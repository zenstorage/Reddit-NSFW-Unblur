// ==UserScript==
// @name            Reddit NSFW Unblur
// @namespace       https://greasyfork.org/users/821661
// @match           https://www.reddit.com/*
// @match           https://sh.reddit.com/*
// @grant           none
// @run-at          document-start
// @version         2.2
// @author          hdyzen
// @description     Unblur nsfw in Shreddit
// @license         MIT
// @homepage        https://github.com/zenstorage/Reddit-NSFW-Unblur
// ==/UserScript==
'use strict';

// Verify if Shreddit
document.addEventListener('DOMContentLoaded', () => {
    let isShreddit = document.querySelector('shreddit-app') ? true : false;

    if (isShreddit) return;
    console.log('Not Shreddit');
    observer.disconnect();
});

function removeOverlay() {
    const style = document.createElement('style');
    style.innerHTML = `
    body[style="pointer-events: none; overflow: hidden;"] {
        pointer-events: auto !important;
        overflow: auto !important;
      }
      div[style="position: fixed; inset: 0px; backdrop-filter: blur(4px);"] {
        display: none !important;
      }
      shreddit-async-loader[bundlename="desktop_rpl_nsfw_blocking_modal"] {
        display: none !important;
      }
      [role="presentation"][style="filter: blur(4px);"] {
        filter: none !important;
    }`;
    document.head.appendChild(style);
}
removeOverlay();

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        const targets = mutation.target.querySelectorAll(':is(shreddit-blurred-container[reason="nsfw"], xpromo-nsfw-blocking-container):not([revealed])');
        targets.forEach(target => {
            const style = document.createElement('style');
            style.innerHTML = `
            .blurred {
                filter: none !important;
                display: unset !important;
                pointer-events: unset !important;
                background: unset !important;
            }
            .overlay, .bg-scrim, .prompt {
                display: none !important;
            }
            `;
            const shadowRoot = target.shadowRoot;
            const slot = shadowRoot?.querySelector('slot[name="blurred"]');
            const revealed = target.querySelector('[slot="revealed"]');
            if (target.matches('shreddit-blurred-container[reason="nsfw"]') && shadowRoot && revealed && slot) {
                shadowRoot.appendChild(style);
                slot.name = 'revealed';
                const copyRevealed = revealed.cloneNode(true);
                setTimeout(() => {
                    target.appendChild(copyRevealed);
                    const oldRevealed = copyRevealed.previousElementSibling;
                    if (oldRevealed.matches('[slot="revealed"]')) {
                        oldRevealed.remove();
                    }
                }, 2000);
                target.setAttribute('revealed', '');
            } else if (target.matches('xpromo-nsfw-blocking-container') && shadowRoot) {
                shadowRoot.appendChild(style);
                target.setAttribute('revealed', '');
            }
        });
    });
});

observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
});
