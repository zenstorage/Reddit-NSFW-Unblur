const toggle = document.getElementById("toggle");
const toggleNsfw = document.getElementById("toggle-nsfw");
const toggleSpoiler = document.getElementById("toggle-spoiler");
const form = document.getElementById("selected-ops");

function loadStoredSettings() {
    browser.storage.local.get(["status", "switchs"], result => {
        const { status = true } = result;
        const { nsfw = true, spoiler = false } = result.switchs || {};

        toggle.checked = status;
        toggleNsfw.checked = nsfw;
        toggleSpoiler.checked = spoiler;
    });
}

function saveStatus() {
    browser.storage.local.set({ status: toggle.checked });
}

function saveSwitches() {
    browser.storage.local.set({
        switchs: {
            nsfw: toggleNsfw.checked,
            spoiler: toggleSpoiler.checked,
        },
    });
}

toggle.addEventListener("click", saveStatus);
form.addEventListener("change", saveSwitches);

loadStoredSettings();
