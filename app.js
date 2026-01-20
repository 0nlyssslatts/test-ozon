import { createProgress } from "./progress/progress.js";

const mount = document.getElementById("progressMount");
const valueInput = document.getElementById("valueInput");
const animateToggle = document.getElementById("animateToggle");
const hideToggle = document.getElementById("hideToggle");

const progress = createProgress(mount, { value: 0, animated: false, hidden: false });

function parseValue(raw) {
    const cleaned = String(raw ?? "").trim().replace(/[^\d]/g, "");
    if (!cleaned) return null;

    const num = Number(cleaned);
    if (!Number.isFinite(num)) return null;

    return Math.max(0, Math.min(100, Math.round(num)));
}

function syncFromUI() {
    const value = parseValue(valueInput.value);

    if (value !== null) {
        valueInput.value = String(value);
        progress.setValue(value);
    } else {
        return
    }

    progress.setAnimated(animateToggle.checked);
    progress.setHidden(hideToggle.checked);
}

syncFromUI();


valueInput.addEventListener("input", syncFromUI);
animateToggle.addEventListener("change", syncFromUI);
hideToggle.addEventListener("change", syncFromUI);