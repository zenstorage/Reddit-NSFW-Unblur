const toggle = document.getElementById("toggle");
const statusElement = document.getElementById("status");
const toggleNsfw = document.getElementById("toggle-nsfw");
const toggleSpoiler = document.getElementById("toggle-spoiler");
const form = document.getElementById("selected-ops");

browser.storage.local.get("status", result => {
    const { status = true } = result;

    toggle.checked = status;
});

browser.storage.local.get("switchs", result => {
    const { switchs = {} } = result;
    const { nsfw = true, spoiler = false } = switchs;

    toggleNsfw.checked = nsfw;
    toggleSpoiler.checked = spoiler;
});

toggle.addEventListener("click", e => {
    browser.storage.local.set({ status: toggle.checked });
});

form.addEventListener("change", e => {
    browser.storage.local.set({ switchs: { nsfw: toggleNsfw.checked, spoiler: toggleSpoiler.checked } });
});
