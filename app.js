import { createProgress } from "./progress/progress.js";
import { clampProgressValue } from "./utils/clampProgressValue.js";

const mount = document.getElementById("progressMount");
const valueInput = document.getElementById("valueInput");
const animateToggle = document.getElementById("animateToggle");
const hideToggle = document.getElementById("hideToggle");
const form = document.getElementById("controls");

const progress = createProgress(mount, { value: 0, animated: false, hidden: false });

function parseValue(raw) {
    const cleaned = String(raw ?? "").trim().replace(/[^\d]/g, "");
    if (!cleaned) return null;

    return clampProgressValue(cleaned);
}

function syncFromUI() {
    const value = parseValue(valueInput.value);

    if (value !== null) {
        valueInput.value = String(value);
        progress.setValue(value);
    } else {
        valueInput.value = "0"
        progress.setValue(0)
    }

    progress.setAnimated(animateToggle.checked);
    progress.setHidden(hideToggle.checked);
}

syncFromUI();

form.addEventListener("submit", (event) => {
    event.preventDefault();
});

valueInput.addEventListener("input", syncFromUI);
animateToggle.addEventListener("change", syncFromUI);
hideToggle.addEventListener("change", syncFromUI);