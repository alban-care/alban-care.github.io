export default class Stopwatch {
  #isRunning = false;
  #startTime = 0;
  #endTime = 0;
  #time = 0;
  #timer = null;

  constructor(el, options = {}) {
    this.el = el;
    this.options = {
      controllers: "all",
      ...options,
    };
    this.templates = {
      timer: `<div id="stopwatch-time">${this.formattedTime()}</div>`,
      buttons: `<div id="stopwatch-controllers"></div>`,
      start: `<button id="stopwatch-start">Start</button>`,
      stop: `<button id="stopwatch-stop">Stop</button>`,
      reset: `<button id="stopwatch-reset">Reset</button>`,
    };
    this.controllerTypes = ["start", "stop", "reset"];
    this.controllers = this.options.controllers.toLowerCase();
  }

  get elapsedTime() {
    return this.#endTime - this.#startTime;
  }

  start() {
    if (this.#isRunning) return;

    this.#isRunning = true;
    this.#timer = setInterval(() => {
      this.#time += 10;
      document.querySelector("#stopwatch-time").innerHTML =
        this.formattedTime();
    }, 10);

    this.#startTime = new Date().getTime();
  }

  stop() {
    if (!this.#isRunning) return;

    clearInterval(this.#timer);
    this.#isRunning = false;

    this.#endTime = new Date().getTime();
  }

  reset() {
    if (this.#isRunning) this.stop();

    this.#time = 0;

    document.querySelector("#stopwatch-time").innerHTML = this.formattedTime();

    this.#startTime = 0;
    this.#endTime = 0;
  }

  formattedTime() {
    const minutes = `0${Math.floor((this.#time / 60000) % 60)}`.slice(-2);
    const seconds = `0${Math.floor((this.#time / 1000) % 60)}`.slice(-2);
    const milliseconds = `00${this.#time % 1000}`.slice(-3);

    return `${minutes}:${seconds}.${milliseconds}`;
  }

  #insertAdjacentHTML(el, html, position = "beforeend") {
    const positionTypes = [
      "beforebegin",
      "afterbegin",
      "beforeend",
      "afterend",
    ];

    if (!el) {
      return;
    }

    if (el.lenght > 1) {
      return;
    }

    if (!positionTypes.includes(position)) {
      return;
    }

    el.insertAdjacentHTML(position, html);

    return el;
  }

  render() {
    if (!document.querySelector("[data-timer]")) {
      this.el.dataset.timer = "stopwatch";
    }

    if (this.controllers !== "all" && this.controllers !== "none") {
      this.controllers = "all";
    }

    this.#insertAdjacentHTML(
      document.querySelector("[data-timer]"),
      this.templates.timer
    );

    if (this.controllers === "all") {
      this.#insertAdjacentHTML(
        document.querySelector("[data-timer]"),
        this.templates.buttons
      );
      const buttons = document.querySelector("#stopwatch-controllers");
      this.controllerTypes.forEach((controller) => {
        // add button to DOM
        this.#insertAdjacentHTML(
          buttons,
          this.templates[controller],
          "beforeend"
        );

        // add event listener to button
        document
          .querySelector(`#stopwatch-${controller}`)
          .addEventListener("click", () => {
            this[controller]();
          });
      });
    }
  }

  return;
}
