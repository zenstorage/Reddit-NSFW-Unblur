// Filter for the webRequest.onBeforeRequest event
const unblockNSFWFilter = { urls: ['https://www.redditstatic.com/*blocking-modal*'], types: ['script'] };

// Unblock NSFW
function unblockNSFW(details) {
    return { cancel: true };
}

// Request toggle
function requestToggle(condition) {
    if (condition === true) {
        return browser.webRequest.onBeforeRequest.addListener(unblockNSFW, unblockNSFWFilter, ['blocking']);
    } else if (condition === false) {
        return browser.webRequest.onBeforeRequest.removeListener(unblockNSFW);
    }
}

// Check state and toggle
function checkState(changes) {
    console.log(changes);
    const { status = {} } = changes;
    const { newValue, oldValue } = status;
    const hasListener = browser.webRequest.onBeforeRequest.hasListener(unblockNSFW);
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
