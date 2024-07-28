const rule = {
    'id': 1,
    'priority': 1,
    'action': { 'type': 'block' },
    'condition': {
        'urlFilter': 'nsfw-blocking',
        'resourceTypes': ['script'],
    },
};

function updateRules(add, remove) {
    chrome.declarativeNetRequest.updateDynamicRules(
        {
            addRules: add,
            removeRuleIds: remove, // Remove old rules with the same ID to avoid duplicates
        },
        () => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
            } else {
                console.log('Dynamic rule updated successfully.');
            }
        },
    );
}

chrome.runtime.onInstalled.addListener(() => {
    updateRules([rule], [rule.id]);
});

chrome.storage.onChanged.addListener(async changes => {
    const { status } = changes;

    if (status?.newValue === true) {
        updateRules([rule], [rule.id]);
        return;
    }

    updateRules([], [rule.id]);
});
