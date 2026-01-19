export function createProgress(mountNode) {
    if (!mountNode) return;

    const radius = 38;
    const circumference = Math.PI * radius;

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

    render();
}
