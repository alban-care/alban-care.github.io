# stopwatch

## Init

Import `stopwatch.js` in your javascript file

Add `data-time="stopwatch"` on your Html file (e.g. `<div data-time="stopwatch"></div>`)

Select the element where you added `data-time="stopwatch"` (e.g. `const timer = document.querySelector('[data-time="stopwatch"]');`)

Add `stopwatch.init(timer)` in your event listener (e.g. `document.addEventListener("DOMContentLoaded", () => { stopwatch.init(timer); });`)

## Handlers :

- Start, Stop, Reset stopwatch on an event (e.g. click, mouseover, etc.)

> (e.g. start on "click" : `<body data-start="click">`)

> (e.g. stop on "mouseover" : `<div data-stop="mouseover">`)

> (e.g. reset on "dblclick" : `<h1 data-reset="dblclick">`)

- Alternatively, you can start and stop the stopwatch manually

  Add `stopwatch.start()`, `stopwatch.stop()` or `stopwatch.reset()` to your javascript code

## Controllers :

On the root element (where you added `data-time="stopwatch"`)

- Add `data-controllers="All"` (e.g. `<div data-time="stopwatch" data-controllers="All">`)

  to add start, stop and reset button to your DOM

- Add `data-controllers="Reset"` (e.g. `<div data-time="stopwatch" data-controllers="Reset">`)

  to add reset button to your DOM

- Add `data-controllers="None"` (e.g. `<div data-time="stopwatch" data-controllers="None">`)

  or remove `data-controllers` attribute to not add any controller to your DOM

- Add `data-end="30"` (e.g. `<div data-time="stopwatch" data-end="30">`) to stop the stopwatch after 30 seconds
