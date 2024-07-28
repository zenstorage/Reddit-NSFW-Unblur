const toggle = document.getElementById('toggle'),
    statusElement = document.getElementById('status'),
    toggleNsfw = document.getElementById('toggle-nsfw'),
    toggleSpoiler = document.getElementById('toggle-spoiler'),
    form = document.getElementById('selected-ops');

chrome.storage.local.get('status', result => {
    const { status = true } = result;

    toggle.checked = status;
});

chrome.storage.local.get('switchs', result => {
    const { switchs = {} } = result;
    const { nsfw = true, spoiler = false } = switchs;

    toggleNsfw.checked = nsfw;
    toggleSpoiler.checked = spoiler;
});

toggle.addEventListener('click', async e => {
    chrome.storage.local.set({ status: toggle.checked });
});

form.addEventListener('change', e => {
    chrome.storage.local.set({ switchs: { nsfw: toggleNsfw.checked, spoiler: toggleSpoiler.checked } });
});
