// Elements
const toggle = document.getElementById('toggle');
const statusElement = document.getElementById('status');
const toggleNsfw = document.getElementById('toggle-nsfw');
const toggleSpoiler = document.getElementById('toggle-spoiler');
const form = document.getElementById('form');

browser.storage.local.get('items', result => {
    const state = result.items.state;
    const nsfw = result.items.nsfw;
    const spoiler = result.items.spoiler;

    toggle.checked = state;
    statusElement.textContent = state ? 'ON' : 'OFF';

    toggleNsfw.checked = nsfw;
    toggleSpoiler.checked = spoiler;
});

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
