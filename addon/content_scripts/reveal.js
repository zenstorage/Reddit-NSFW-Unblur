let nsfwAc, spoilerAc;
const elementsDetected = new Set();

// Get NSFW and Spoiler state
browser.storage.local.get('switchs', result => {
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
});

// Reveal NSFW |func (only for xpromo-nsfw-blocking-container and shreddit-blurred-container)
function reveal(element) {
    const shadowRoot = element.shadowRoot,
        inner = shadowRoot.querySelector('.inner'),
        outer = shadowRoot.querySelector('.outer'),
        blurredSlot = shadowRoot.querySelector('slot[name="blurred"]');

    console.log(element, shadowRoot.innerHTML === '', inner, blurredSlot);

    // If have prompt to open app, remove it, else remove only blur
    if (element.matches('xpromo-nsfw-blocking-container')) {
        shadowRoot.querySelector('.prompt').remove();
    } else if ((element.getAttribute('reason') === 'nsfw' && nsfwAc) || (element.getAttribute('reason') === 'spoiler' && spoilerAc)) {
        shadowRoot.querySelector('.overlay').remove();
        shadowRoot.querySelector('.bg-scrim').remove();
        outer.style.height = 'auto';
        inner.classList.remove('blurred');
        inner.style.filter = 'none';
        blurredSlot.name = 'revealed';
    }
}

// Mutation observer handler
function mutationHandler(mutation) {
    const targets = mutation.target.querySelectorAll('xpromo-nsfw-blocking-container, shreddit-blurred-container');
    targets.forEach(target => {
        if (target.shadowRoot.innerHTML !== '' && !elementsDetected.has(target)) {
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
