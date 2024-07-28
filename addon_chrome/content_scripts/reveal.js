let nsfwAc, spoilerAc;
const elementsDetected = new Set();

// Get NSFW and Spoiler state
chrome.storage.local.get('switchs', result => {
    const { switchs = {} } = result;
    const { nsfw = true, spoiler = false } = switchs;

    nsfwAc = nsfw;
    spoilerAc = spoiler;

    // Start observing
    observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
    });

    // Fix line-clamp and text-overflow
    document.documentElement.insertAdjacentHTML('beforeend', '<style> [slot="revealed"] > [class*="line-clamp"] { display: flex; flex-direction: column; gap: 1rem; } </style>');
});

// Reveal NSFW |func (only for xpromo-nsfw-blocking-container and shreddit-blurred-container)
function reveal(element) {
    const shadowRoot = element.shadowRoot,
        inner = shadowRoot.querySelector('.inner'),
        blurredSlot = shadowRoot.querySelector('slot[name="blurred"]');

    // If have prompt to open app, remove it, else remove only blur
    if (element.matches('xpromo-nsfw-blocking-container')) {
        shadowRoot.querySelector('.prompt').remove();
    } else if ((element.getAttribute('reason') === 'nsfw' && nsfwAc) || (element.getAttribute('reason') === 'spoiler' && spoilerAc)) {
        const style = document.createElement('style');
        style.innerHTML = `.overlay, .bg-scrim { display: none !important; } .h-\\[88px\\] { height: max-content !important; } .inner {display: unset !important; pointer-events: auto !important; background: none !important; filter: none !important; }`;
        shadowRoot.appendChild(style);
        blurredSlot.name = 'revealed';
    }
}

// Mutation observer handler
function mutationHandler(mutation) {
    const targets = mutation.target.querySelectorAll('xpromo-nsfw-blocking-container, shreddit-blurred-container');
    targets.forEach(target => {
        if (target.shadowRoot && target.shadowRoot.innerHTML !== '' && !elementsDetected.has(target)) {
            elementsDetected.add(target);
            reveal(target);
        }
    });
}

// Callback for MutationObserver
function callback(mutations) {
    mutations.forEach(mutationHandler);
}

// Mutation observer for detecting xpromo-nsfw-blocking-container or shreddit-blurred-container
const observer = new MutationObserver(callback);
