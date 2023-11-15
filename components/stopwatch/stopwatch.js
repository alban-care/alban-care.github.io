const stopwatch = {
  isRunning: false,
  time: 0,
  timer: null,
  handlers: ["start", "stop", "reset"],
  templates: {
    stopwatch: '<div id="stopwatch">00 : 00 : 000</div>',
    controllers: `<div id="stopwatch-controllers"></div>`,
    start: `<button id="stopwatch-start">Start</button>`,
    stop: `<button id="stopwatch-stop">Stop</button>`,
    reset: `<button id="stopwatch-reset">Reset</button>`,
  },
  formattedTime: () => {
    const getMilsec = `00${stopwatch.time % 1000}`.slice(-3);
    const getSec = `0${Math.floor((stopwatch.time / 1000) % 60)}`.slice(-2);
    const getMin = `0${Math.floor((stopwatch.time / 60000) % 60)}`.slice(-2);

    return `${getMin} : ${getSec} : ${getMilsec}`;
  },
  start: () => {
    if (stopwatch.isRunning) {
      return;
    }
    stopwatch.isRunning = true;
    stopwatch.timer = setInterval(() => {
      stopwatch.time += 10;
      document.getElementById("stopwatch").innerHTML =
        stopwatch.formattedTime();
    }, 10);
  },
  stop: () => {
    if (!stopwatch.isRunning) {
      return;
    }
    clearInterval(stopwatch.timer);
    stopwatch.isRunning = false;
  },
  reset: () => {
    stopwatch.stop();
    stopwatch.time = 0;
    document.getElementById("stopwatch").innerHTML = stopwatch.formattedTime();
  },
  /**
   * @param {NodeList|Element} el (e.g. document.querySelector('body'))
   * @param {string} html (e.g. '<div>hello</div>')
   * @param {string} position (beforebegin, afterbegin, beforeend, afterend)
   * @returns {void}
   */
  insertAdjacentHTML: (el, html, position = "beforeend") => {
    if (!el) {
      return;
    }

    if (el.length) {
      el.forEach((item) => {
        item.insertAdjacentHTML(position, html);
      });
      return;
    }

    el.insertAdjacentHTML(position, html);

    return el;
  },
  // Set time out by default or with setdata
  setTime: (el) => {
    if (!el) return;

    if (!el.dataset.end) return;

    const stopTime = Number(el.dataset.end) || 60;

    stopwatch.start();

    setTimeout(() => {
      stopwatch.stop();
    }, stopTime * 1000);
  },

  // Set Controllers buttons to the DOM
  setControllers: (el) => {
    if (!el) return;

    const options = {
      all: [
        stopwatch.templates.start,
        stopwatch.templates.stop,
        stopwatch.templates.reset,
      ],
      reset: [stopwatch.templates.reset],
      none: [],
    };

    if (!el.dataset.controllers) return;
    if (el.dataset.controllers.toLowerCase() === "none") return;

    const controllers = options[el.dataset.controllers] || options.all;

    // wrapper
    const wrapper = stopwatch.insertAdjacentHTML(
      el,
      stopwatch.templates.controllers,
      "beforeend"
    );

    // buttons
    controllers.forEach((controller) => {
      stopwatch.insertAdjacentHTML(wrapper, controller, "beforeend");
    });

    if (el.dataset.controllers === "all") {
      document
        .getElementById("stopwatch-start")
        .addEventListener("click", stopwatch.start);
      document
        .getElementById("stopwatch-stop")
        .addEventListener("click", stopwatch.stop);
    }

    document
      .getElementById("stopwatch-reset")
      .addEventListener("click", stopwatch.reset);

    return el;
  },
  // Control the stopwatch on an event (e.g. click, mouseover, etc.)
  handlerEvents: (action) => {
    const event = document.querySelector(`[data-${action}]`).dataset[action];
    document.querySelector(`[data-${action}]`).addEventListener(event, () => {
      stopwatch[action]();
    });
  },
  // Init stopwatch
  init: (el) => {
    if (!el) {
      throw new Error("Please provide a valid element in stopwatch.init()");
    }
    // Add stopwatch to DOM
    stopwatch.insertAdjacentHTML(el, stopwatch.templates.stopwatch);

    // Start, Stop, Reset stopwatch on an event (e.g. click, mouseover, etc.)
    stopwatch.handlers.forEach((handler) => {
      if (document.querySelector(`[data-${handler}]`)) {
        stopwatch.handlerEvents(handler);
      }
    });

    // Add controllers to DOM
    stopwatch.setControllers(el);
    stopwatch.setTime(el);
    return;
  },
};

export default stopwatch;

// Path: components/stopwatch.js
