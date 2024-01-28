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
    const items = changes.items;
    if (!items) return;
    if (items.newValue.state) browser.webRequest.onBeforeRequest.addListener(unblockNSFW, unblockNSFWFilter, ['blocking']);
    else browser.webRequest.onBeforeRequest.removeListener(unblockNSFW);
}

browser.storage.onChanged.addListener(checkState);
