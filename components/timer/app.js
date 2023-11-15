import Stopwatch from "./stopwatch/index.js";

const stopwatch = new Stopwatch(document.querySelector("body"), {
  controllers: "all",
});

document.addEventListener("DOMContentLoaded", () => {
  stopwatch.render();
});
