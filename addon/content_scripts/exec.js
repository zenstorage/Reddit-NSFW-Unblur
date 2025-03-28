let nsfwAc;
let spoilerAc;

function initializeContentScript() {
    browser.storage.local.get(["status", "switchs"], result => {
        const { status = true } = result;
        const { nsfw = true, spoiler = false } = result.switchs || {};

        nsfwAc = nsfw;
        spoilerAc = spoiler;

        if (status) {
            applyStyles();
            executeInMainWorld();
        }
    });
}
initializeContentScript();

function applyStyles() {
    const code = `
    .viewInApp, #nsfw-qr-dialog {
        display: none !important;
    }
    reddit-pdp-right-rail-post .absolute {
        display: none !important;
    }
    reddit-pdp-right-rail-post [style*="blur(12px)"] {
        filter: none !important;
    }
    `;
    const style = document.createElement("style");
    style.innerHTML = code;
    (document.head || document.documentElement).appendChild(style);
}

function executeInMainWorld() {
    const code = `
    function overrideCustomElements() {
        const nativeCustomElements = customElements.define;

        customElements.define = function (name, elemConstructor, options) {
            if (name === "faceplate-modal") {
                return;
            }

            if (name === "community-highlight-card") {
                const OriginalElement = elemConstructor;
                class ExtendedElement extends OriginalElement {
                    connectedCallback() {
                        super.connectedCallback();
                        this.isBlurred = false;
                    }
                }
                return nativeCustomElements.call(this, name, ExtendedElement, options);                
            }

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
                        this._windowEvents._events.delete("track-event");
                    }
                    connectedCallback() {
                        super.connectedCallback();
                        if ((this.reason == "nsfw" && ${nsfwAc}) || (this.reason === "spoiler" && ${spoilerAc})) {
                            this.blurred = false;
                        }
                    }
                }
                return nativeCustomElements.call(this, name, ExtendedElement, options);
            }

            return nativeCustomElements.call(this, name, elemConstructor, options);
        };
    }

    overrideCustomElements();
    `;

    const script = document.createElement("script");
    script.innerHTML = code;
    script.onload = () => script.remove();
    (document.head || document.documentElement).appendChild(script);
}
