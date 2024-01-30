// Filter for the webRequest.onBeforeRequest event
const unblockNSFWFilter = { urls: ['<all_urls>'], types: ['script'] };

// Unblock NSFW
function unblockNSFW(details) {
    if (details.url.includes('shell')) {
        browser.tabs.executeScript(details.tabId, {
            file: '/content_scripts/reveal.js',
            runAt: 'document_start',
        });
    }
    if (details.url.includes('xpromo-nsfw-blocking-modal-desktop')) {
        return { cancel: true };
    }
}

// Request toggle
function requestToggle(condition) {
    if (condition) {
        return browser.webRequest.onBeforeRequest.addListener(unblockNSFW, unblockNSFWFilter, ['blocking']);
    }
    return browser.webRequest.onBeforeRequest.removeListener(unblockNSFW);
}

// Call requestToggle
requestToggle();

// Check state and toggle
function checkState(changes) {
    console.log(changes);
    const { status = {} } = changes;
    const { newValue, oldValue } = status;
    const hasListener = browser.webRequest.onBeforeRequest.hasListener(unblockNSFW);
    console.log(hasListener);
    requestToggle(newValue && !hasListener);
}

// Listen for webRequest.onBeforeRequest events
browser.webRequest.onBeforeRequest.addListener(unblockNSFW, unblockNSFWFilter, ['blocking']);

// Listen for storage changes
browser.storage.onChanged.addListener(checkState);

// Get state
browser.storage.local.get('status', result => {
    const { status = true } = result;
    requestToggle(status);
});
