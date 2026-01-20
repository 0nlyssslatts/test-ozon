export function clampProgressValue(value) {
    const num = Number(value);
    if (!Number.isFinite(num)) return null;
    return Math.max(0, Math.min(100, Math.round(num)));
}
