// Elements
const toggle = document.getElementById('toggle');
const statusElement = document.getElementById('status');
const toggleNsfw = document.getElementById('toggle-nsfw');
const toggleSpoiler = document.getElementById('toggle-spoiler');
const form = document.getElementById('form');

// Function to get state
function getState() {
    const items = browser.storage.local.get('items');
    items.then(result => {
        if (result.length === undefined) return;
        toggle.checked = result.items.state;
        statusElement.textContent = result.items.state ? 'ON' : 'OFF';

        toggleNsfw.checked = result.items.nsfw;
        toggleSpoiler.checked = result.items.spoiler;
    });
}
getState();

// Listener for toggle
form.addEventListener('change', e => {
    browser.storage.local.set({
        items: {
            state: toggle.checked,
            nsfw: toggleNsfw.checked,
            spoiler: toggleSpoiler.checked,
        },
    });
    statusElement.textContent = toggle.checked ? 'ON' : 'OFF';
});
