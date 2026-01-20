import { createProgress } from "./progress/progress.js";

const mount = document.getElementById("progressMount");

const progress = createProgress(mount, { value: 20, animated: false, hidden: false });
