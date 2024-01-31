let nsfwAc, spoilerAc;
const elementsDetected = new Set();

// Get NSFW and Spoiler state
browser.storage.local.get('switchs', result => {
    const { switchs = {} } = result;
    const { nsfw = true, spoiler = false } = switchs;

    nsfwAc = nsfw;
    spoilerAc = spoiler;
});

function targetHandler(target) {
    console.log(target);
    if (target.matches('xpromo-nsfw-blocking-container')) {
        target.shadowRoot.children[1].remove();
    } else if ((target.matches('shreddit-blurred-container[reason="nsfw"]') && nsfwAc) || (target.matches('shreddit-blurred-container[reason="spoiler"]') && spoilerAc)) {
        target.children[0].click();
    }
}

const observer = new MutationObserver(mutation => {
    mutation.forEach(mutation => {
        const targets = mutation.target.querySelectorAll('xpromo-nsfw-blocking-container, shreddit-blurred-container');
        targets.forEach(target => {
            if (!elementsDetected.has(target) && target.shadowRoot && target.shadowRoot.innerHTML !== '') {
                elementsDetected.add(target);
                targetHandler(target);
            }
        });
    });
});

observer.observe(document, {
    childList: true,
    subtree: true,
    attributes: true,
});

// Fix line-clamp and text-overflow
document.documentElement.insertAdjacentHTML('beforeend', '<style> [slot="revealed"] > [class*="line-clamp"] { display: flex; flex-direction: column; gap: 1rem; } </style>');
