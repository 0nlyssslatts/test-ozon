import { clampProgressValue } from "../utils/clampProgressValue.js";

export function createProgress(mountNode, initialState = {}) {
    if (!mountNode) return;

    const radius = 38;
    const circumference = 2 * Math.PI * radius;

    const state = {
        value: 0,
        animated: false,
        hidden: false,
        ...initialState,
    };

    const refs = {
        root: null,
        progressCircle: null,
    };


    function render() {
        const root = document.createElement("div");
        root.className = "progress";

        const rotator = document.createElement("div");
        rotator.className = "progress__rotator";

        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");

        const track = document.createElementNS(svgNS, "circle");
        track.setAttribute("cx", "50");
        track.setAttribute("cy", "50");
        track.setAttribute("r", radius);
        track.setAttribute("fill", "none");
        track.setAttribute("stroke", "var(--track)");
        track.setAttribute("stroke-width", "8");

        const progress = document.createElementNS(svgNS, "circle");
        progress.setAttribute("cx", "50");
        progress.setAttribute("cy", "50");
        progress.setAttribute("r", radius);
        progress.setAttribute("fill", "none");
        progress.setAttribute("stroke", "var(--progress)");
        progress.setAttribute("stroke-width", "8");
        progress.setAttribute("stroke-linecap", "round");

        progress.style.transform = "rotate(-90deg)";
        progress.style.transformOrigin = "50px 50px";
        progress.style.strokeDasharray = `${circumference} ${circumference}`;
        progress.style.transition = "stroke-dashoffset 150ms ease";

        svg.append(track, progress);
        rotator.appendChild(svg);
        root.appendChild(rotator);

        refs.root = root;
        refs.progressCircle = progress;

        mountNode.replaceChildren(root);
    }

    function applyState() {
        const { value, animated, hidden } = state;

        const offset = circumference * (1 - value / 100);
        refs.progressCircle.style.strokeDashoffset = offset;

        refs.root.classList.toggle("progress--animated", animated);
        refs.root.classList.toggle("progress--hidden", hidden);
    }

    function update(nextState = {}) {
        if ("value" in nextState) {
            state.value = clampProgressValue(nextState.value);
        }
        if ("animated" in nextState) {
            state.animated = Boolean(nextState.animated);
        }
        if ("hidden" in nextState) {
            state.hidden = Boolean(nextState.hidden);
        }
        applyState();
    }

    render();
    update(state)


    return {
        setValue: (value) => update({ value: value }),
        setAnimated: (isAnimated) => update({ animated: isAnimated }),
        setHidden: (isHidden) => update({ hidden: isHidden }),
    };
}
