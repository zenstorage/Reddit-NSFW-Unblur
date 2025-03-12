// ==UserScript==
// @name            Minimal Reddit NSFW Unblur
// @namespace       https://greasyfork.org/users/821661
// @match           https://www.reddit.com/*
// @match           https://sh.reddit.com/*
// @grant           none
// @run-at          document-start
// @noframes
// @version         0.0.1
// @icon            https://raw.githubusercontent.com/zenstorage/Reddit-NSFW-Unblur/main/assets/icon.png
// @author          hdyzen
// @description     Unblur nsfw in Shreddit
// @license         MIT
// @homepage        https://github.com/zenstorage/Reddit-NSFW-Unblur
// ==/UserScript==

function initCSS() {
    const content = `
    body {
        overflow: auto !important;
        pointer-events: auto !important;
    }
    /* NSFW Thumbs */
    shreddit-pubsub-publisher img {
        filter: none !important;
    }
    :is(shreddit-post[nsfw], [data-faceplate-tracking-context*='"nsfw":true']) :is(a[href], shreddit-pubsub-publisher) + .absolute {
        display: none !important;
    }
    .sidebar-grid {
        filter: blur(0) !important;
    }
    .prompt, .bg-scrim, .overlay, .viewInApp, #blocking-modal, body > [style*="blur(4px)"] {
        display: none !important;
    }
    `;

    document.documentElement.insertAdjacentHTML("beforeend", `<style>${content}</style>`);
}
initCSS();

function patchCustomElements() {
    const nativeCustomElements = customElements.define;

    customElements.define = function (name, elemConstructor, options) {
        if (name === "xpromo-nsfw-blocking-container") {
            const OriginalElement = elemConstructor;

            class ExtendedElement extends OriginalElement {
                connectedCallback() {}
            }

            return nativeCustomElements.call(this, name, ExtendedElement, options);
        }

        if (name === "shreddit-blurred-container") {
            const OriginalElement = elemConstructor;

            class ExtendedElement extends OriginalElement {
                constructor() {
                    super();
                    this.blurred = false;
                    this._windowEvents._events.delete("track-event");
                }

                connectedCallback() {
                    super.connectedCallback();
                }
            }

            return nativeCustomElements.call(this, name, ExtendedElement, options);
        }

        return nativeCustomElements.call(this, name, elemConstructor, options);
    };
}
patchCustomElements();
