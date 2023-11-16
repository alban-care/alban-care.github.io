# Modal class

## Description

It is inspired from the Bootstrap modal component and use the [Bootstrap modal](https://getbootstrap.com/docs/5.3/components/modal/) css classes (Thanks a lot to Bootstrap for this).

## Usage

1. Import the Modal class

```javascript
import Modal from "./Modal.js";
```

2. Personalize the modal with the parameters above

```javascript
const options = {
  title: "Modal title",
  content: "Modal content",
  footer: "default",
};
```

3. Create a new instance of Modal

```javascript
const modal = new Modal(options);
```

4. Render the modal

```javascript
modal.render();
```

5. Add an event listener on a button or anything else to open the modal

```javascript
const openModalButton = document.querySelector("#openModalButton");
openModalButton.addEventListener("click", () => {
  modal.open();
});
```

## Options

1. Choose your title (required):

```javascript
title: string | html string | HTMLElement
```

2. Customize your content (required):

```javascript
content: string | html string | HTMLElement
```

3. Customize your buttons (required)

```javascript
footer: "default" | "none" | {
    closeButton: null | {
        text: string // required
        className: string // optional
        callback: function // optional
    },
    buttons:[
    {
        text: string // required
        className: string // optional
        callback: function // optional
    },
    /* other buttons */
    ]
}

```

4. Personalize the modal with your own css classes (optional):

```javascript
className: {
  modal: string; // optional
  modalHeader: string; // optional
  modalTitle: string; // optional
  modalBody: string; // optional
  modalFooter: string; // optional
  modalCloseButton: string; // optional
  modalButton: string; // optional
}
```

Or alternatively, you can desactivate the default css classes by setting the style option to "none" and then add your own css classes to the modal (optional):

```javascript
style: "default" | "none";
```

and then add classes in your css file :

```css
.modal {
  /* (...) */
}
.modal-header {
  /* (...) */
}
.modal-title {
  /* (...) */
}
.modal-body {
  /* (...) */
}
.modal-footer {
  /* (...) */
}
.modal-close-button {
  /* (...) */
}
.modal-button {
  /* (...) */
}
```

> Example with className option :

```javascript
const options = {
  title: "Modal title",
  content: "Modal content",
  footer: "default",
  className: {
    modal: "my-modal",
    modalHeader: "my-modal-header",
    modalTitle: "my-modal-title",
    modalBody: "my-modal-body",
    modalFooter: "my-modal-footer",
    modalCloseButton: "my-modal-close-button",
    modalButton: "my-modal-button",
  },
};
```

> Example with style option :

```javascript
// js file
const options = {
  title: "Modal title",
  content: "Modal content",
  footer: "default",
  style: "none",
};
```

```css
/* css file */
.my-modal {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;
  outline: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

/* more if you want */
```

## Methods

1. Render the modal

```javascript
modal.render();
```

2. Open the modal

```javascript
modal.open();
```

3. Close the modal

```javascript
modal.close();
```

4. Destroy the modal

```javascript
modal.destroy();
```

## Events

1. Open event

```javascript
modal.on("open", () => {
  // do something
});
```

2. Close event

```javascript
modal.on("close", () => {
  // do something
});
```

3. Destroy event

```javascript
modal.on("destroy", () => {
  // do something
});
```
