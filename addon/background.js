browser.storage.local.set({
    items: {
        state: true,
        nsfw: true,
        spoiler: false,
    },
});

// Unblock NSFW
function unblockNSFW(details) {
    browser.tabs.executeScript({
        file: '/content_scripts/reveal.js',
        runAt: 'document_start',
    });
    return { cancel: true };
}

// Filter for the webRequest.onBeforeRequest event
const unblockNSFWFilter = { urls: ['https://www.redditstatic.com/*xpromo-nsfw-blocking-modal-desktop*'], types: ['script'] };

// Listen for webRequest.onBeforeRequest events
browser.webRequest.onBeforeRequest.addListener(unblockNSFW, unblockNSFWFilter, ['blocking']);

function checkState(changes) {
    const state = changes.items.newValue.state || true;
    if (state) browser.webRequest.onBeforeRequest.addListener(unblockNSFW, unblockNSFWFilter, ['blocking']);
    else if (!state) browser.webRequest.onBeforeRequest.removeListener(unblockNSFW);
}

browser.storage.onChanged.addListener(checkState);
