let nsfw;
let spoiler;

// Get NSFW and Spoiler state
browser.storage.local.get('items', result => {
    nsfw = result.items.nsfw;
    spoiler = result.items.spoiler;

    // Start observing
    observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true,
    });
});

// Reveal NSFW |func (only for xpromo-nsfw-blocking-container and shreddit-blurred-container)
function revealNSFW(element) {
    // Shadow root of blurred
    const shadowRoot = element.shadowRoot;

    // If have prompt to open app, remove it, else remove only blur
    if (element.matches('xpromo-nsfw-blocking-container')) {
        shadowRoot.querySelector('.prompt').remove();
    } else if (element.matches('shreddit-blurred-container')) {
        const inner = shadowRoot.querySelector('.inner');
        shadowRoot.querySelector('.bg-scrim')?.remove();
        shadowRoot.querySelector('.overlay')?.remove();
        inner.classList.remove('blurred');
        inner.style.filter = 'none';
        shadowRoot.querySelector('slot[name="blurred"]').name = 'revealed';
    } else return;

    // Set as blurred
    element.setAttribute('revealed', '');
}

// Reveal Spoiler |func (only for shreddit-blurred-container)
function revealSpoiler(element) {
    // Shadow root of blurred
    const shadowRoot = element.shadowRoot;

    // If have blurred slot in shadow root
    const hasBlurred = shadowRoot.querySelector('slot[name="blurred"]');

    const inner = shadowRoot.querySelector('.inner');
    shadowRoot.querySelector('.bg-scrim')?.remove();
    shadowRoot.querySelector('.overlay')?.remove();
    inner.classList.remove('blurred');
    inner.style.filter = 'none';
    if (hasBlurred) hasBlurred.name = 'revealed';

    // Set as blurred
    element.setAttribute('revealed', '');
}

// Mutation observer handler
function mutationHandler(mutation) {
    if (nsfw) {
        const targets = mutation.target.querySelectorAll(':is(shreddit-blurred-container[reason="nsfw"], xpromo-nsfw-blocking-container):not([revealed])');
        targets.forEach(target => (target.shadowRoot ? revealNSFW(target) : null));
    }
    if (spoiler) {
        const targets = mutation.target.querySelectorAll('shreddit-blurred-container[reason="spoiler"]');
        targets.forEach(target => (target.shadowRoot ? revealSpoiler(target) : null));
    }
}

// Callback for MutationObserver
function checkIfBlurred(mutations) {
    mutations.forEach(mutationHandler);
}

// Mutation observer for detecting xpromo-nsfw-blocking-container or shreddit-blurred-container
const observer = new MutationObserver(checkIfBlurred);
