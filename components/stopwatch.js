const stopwatch = {
  isRunning: false,
  time: 0,
  timer: null,
  handlers: ["start", "stop", "reset"],
  templates: {
    stopwatch: '<div id="stopwatch">00 : 00 : 000</div>',
    controllers: `<div id="stopwatch-controllers">
      <button id="stopwatch-start">Start</button>
      <button id="stopwatch-stop">Stop</button>
      <button id="stopwatch-reset">Reset</button>
      </div>`,
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
  },
  // Start, Stop, Reset stopwatch on an event
  handlerEvents: (action) => {
    const event = document.querySelector(`[data-${action}]`).dataset[action];
    document.querySelector(`[data-${action}]`).addEventListener(event, () => {
      stopwatch[action]();
    });
  },

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

    // Check if data-controllers is present on the element
    // data-controllers can take values : All, None, Reset
    // If not, start and stop automatically after 1 minute
    // stop can be configure in dataset attribute data-stop (e.g. data-stop="30" for 30 seconds)
    if (!el.dataset.controllers || el.dataset.controllers === "false") {
      const stopTime = el.dataset.end || 60;
      stopwatch.start();

      setTimeout(() => {
        stopwatch.stop();
      }, stopTime * 1000);
    } else {
      // Add controllers to DOM
      stopwatch.insertAdjacentHTML(el, stopwatch.templates.controllers);
      // Add event listeners
      document
        .getElementById("stopwatch-start")
        .addEventListener("click", stopwatch.start);
      document
        .getElementById("stopwatch-stop")
        .addEventListener("click", stopwatch.stop);
      document
        .getElementById("stopwatch-reset")
        .addEventListener("click", stopwatch.reset);
    }

    // Set initial time
    document.getElementById("stopwatch").innerHTML = stopwatch.formattedTime();
  },
};

export default stopwatch;

// Path: components/stopwatch.js

/* usage:

Import stopwatch.js in your javascript file
Add data-time="stopwatch" on your Html file (e.g. <div data-time="stopwatch"></div>)
Select the element where you added data-time="stopwatch" (e.g. const timer = document.querySelector('[data-time="stopwatch"]');)
Add stopwatch.init(timer) in your event listener (e.g. document.addEventListener("DOMContentLoaded", () => { stopwatch.init(timer); });)

Handlers : 

- Start, Stop, Reset stopwatch on an event (e.g. click, mouseover, etc.)
(e.g. start on "click" : <body data-start="click">)
(e.g. stop on "mouseover" : <div data-stop="mouseover">)
(e.g. reset on "dblclick" : <h1 data-reset="dblclick">)

- Alternatively, you can start and stop the stopwatch manually
Add stopwatch.start(), stopwatch.stop() or stopwatch.reset() to your javascript code

Controllers :

On the root element (where you added data-time="stopwatch")

- Add data-controllers="All" (e.g. <div data-time="stopwatch" data-controllers="All">)
to add start, stop and reset button to your DOM

- Add data-controllers="Reset" (e.g. <div data-time="stopwatch" data-controllers="Reset">)
to add reset button to your DOM

- Add data-controllers="None" (e.g. <div data-time="stopwatch" data-controllers="None">)
or remove data-controllers attribute to not add any controller to your DOM

- Add data-end="30" (e.g. <div data-time="stopwatch" data-end="30">) to stop the stopwatch after 30 seconds
*/
