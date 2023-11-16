export default class Modal {
  constructor({
    title,
    content,
    footer = "default",
    style = "default",
    className = null,
  }) {
    this.title = title;
    this.content = content;
    this.footer = footer;
    this.style = style;
    this.className = className;
  }

  /* Properties */
  get body() {
    return document.querySelector("body");
  }

  /* Style */

  #style = `
  /*!
  * Bootstrap  v5.3.2 (https://getbootstrap.com/)
  * Copyright 2011-2023 The Bootstrap Authors
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */

   *, ::after, ::before {
      box-sizing: border-box;
  }

  body {
    font-family: Arial, sans-serif;
  }
 
  h5 {
    font-size: 1.25rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
  }

  .btn {
      display: inline-block;
      padding: 0.375rem 0.75rem;
      font-family: Arial, sans-serif;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: ;
      text-align: center;
      text-decoration: none;
      vertical-align: middle;
      cursor: pointer;
      -webkit-user-select: none;
      -moz-user-select: none;
      user-select: none;
      border: 1px solid transparent;
      border-radius: 0.25rem;
      background-color: ;
      transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
          border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  }

  .btn:hover {
      color: ;
      background-color: ;
      text-decoration: none;
  }


  .modal {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 999;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .modal-dialog {
      width: 500px;
      background-color: white;
      border-radius: 5px;
      padding: 20px;
  }

  .modal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      color: ;
      pointer-events: auto;
      background-color: rgb(255, 255, 255);
      background-clip: padding-box;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 0.3rem;
      outline: 0;
      max-height: 100%;
      overflow-y: auto // overflow: hidden;
  }

  .modal-header {
      display: flex;
      flex-shrink: 0;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 1rem;
      border-bottom: 1px solid #e9ecef;
      border-top-left-radius: calc(0.3rem - 1px);
      border-top-right-radius: calc(0.3rem - 1px);
  }

  .btn-close {
        --btn-close-url: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 0 1 1.414 0L8 6.586 14.293.293a1 1 0 1 1 1.414 1.414L9.414 8l6.293 6.293a1 1 0 0 1-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 0 1-1.414-1.414L6.586 8 .293 1.707a1 1 0 0 1 0-1.414z'/%3e%3c/svg%3e");

      box-sizing: content-box;
      width: 1em;
      height: 1em;
      padding: 0.25em 0.25em;
      color: #000;
      background: transparent var(--btn-close-url) center/1em auto no-repeat;
      border: 0;
      border-radius: 0.375rem;
      opacity: 0.5;
  }

  .btn-close:hover {
      text-decoration: none;
      opacity: 0.75;
  }

  .modal-title {
    margin-bottom: 0;
    line-height: 1.5;
  }

  .modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
  }

  .modal-footer {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    padding: 0.25rem;
    background-color: ;
    border-top: 1px solid rgba(0, 0, 0, 0.175);
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  .modal-footer > * {
    margin: 0.25rem;
  }
  
  .modal-body {
    position: relative;
    flex: 1 1 auto;
    padding: 1rem;
    overflow-y: auto;
  }

  .modal-footer {
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    padding: 0.25rem;
    background-color: ;
    border-top: 1px solid rgba(0, 0, 0, 0.175);
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }

  .modal-footer > * {
    margin: 0.25rem;
  }
  `;

  /* Errors */

  #catchingErrors = () => {
    // title: string
    if (!this.title && typeof this.title !== "string") {
      throw new Error("Modal: The title can't empty and must be a string.");
    }

    // content: string | html string | HTMLElement
    if (
      !this.content &&
      typeof this.content !== "string" &&
      !(this.content instanceof HTMLElement)
    ) {
      throw new Error(
        "Modal: The content can't empty and must be a string or HTMLElement."
      );
    }

    // footer: "default" | "none" | object (not empty)
    if (
      this.footer !== "default" &&
      this.footer !== "none" &&
      typeof this.footer !== "object"
    ) {
      throw new Error("Modal: The footer must be a string or object.");
    }

    // footer object: { closeButton: null | { text: string, className: string | null, callback: function | null }, customButtons: null | array of { text: string, className: string | null, callback: function | null } }

    if (
      typeof this.footer === "object" &&
      Object.keys(this.footer).length === 0
    ) {
      throw new Error("Modal: The footer object can't be empty.");
    }

    if (typeof this.footer === "object") {
      if (Object.keys(this.footer).includes("closeButton")) {
        if (!Object.keys(this.footer.closeButton).includes("text")) {
          throw new Error(
            "Modal: The footer closeButton object can't be empty and must include text."
          );
        }

        if (this.footer.closeButton.text === "") {
          throw new Error(
            "Modal: The text in footer closeButton can't be empty."
          );
        }
      }
    }

    if (typeof this.footer === "object") {
      if (Object.keys(this.footer).includes("customButtons")) {
        this.footer.customButtons.map((o) => {
          if (!Object.keys(o).includes("text")) {
            throw new Error(
              "Modal: The footer customButtons object can't be empty and must include text."
            );
          }

          if (o.text === "") {
            throw new Error(
              "Modal: The text in footer customButtons can't be empty."
            );
          }

          return;
        });
      }
    }

    // style: "default" | "none"

    if (this.style !== "default" && this.style !== "none") {
      throw new Error("Modal: The style must be a string (default | none).");
    }

    // className: null | object (not empty)

    if (this.className && typeof this.className !== "object") {
      throw new Error("Modal: The className must be an object.");
    }

    const classNameKeys = [
      "modal",
      "modalHeader",
      "modalTitle",
      "modalBody",
      "modalFooter",
      "modalCloseButton",
      "modalButton",
    ];

    if (this.className) {
      if (Object.keys(this.className).length === 0) {
        throw new Error("Modal: The className object can't be empty.");
      }

      for (const key of Object.keys(this.className)) {
        if (!classNameKeys.includes(key)) {
          throw new Error(
            `Modal: The className object can't include ${key} key.`
          );
        }
      }
    }

    return true;
  };

  /* Helpers */

  #formatKey(key) {
    if (!key) return;

    const regexp = /[A-Z]/g;
    const matches = [...key.matchAll(regexp)];

    if (!matches.length) return key;

    for (const match of matches) {
      key = key.replace(match[0], `-${match[0].toLowerCase()}`);
    }

    return key;
  }

  #createEl(tag, className = null, attributes = {}) {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    if (Object.keys(attributes)) {
      for (const [key, value] of Object.entries(attributes)) {
        el.setAttribute(this.#formatKey(key), value);
      }
      return el;
    }
    return el;
  }

  /* Render methods */

  #renderModal() {
    const modal = this.#createEl("div", "modal");
    if (this.className && this.className.modal) {
      modal.classList.add(this.className.modal);
    }

    modal.addEventListener("click", (e) => {
      if (e.target.classList.contains("modal")) {
        this.close();
      }
    });

    /* Dialog */

    modal.appendChild(this.#renderModalDialog());

    return modal;
  }

  #renderModalDialog() {
    const modalDialog = this.#createEl("div", "modal-dialog");
    if (this.className && this.className.modalDialog) {
      modalDialog.classList.add(this.className.modalDialog);
    }

    /* Content */

    modalDialog.appendChild(this.#renderModalContent());

    return modalDialog;
  }

  #renderModalContent() {
    const modalContent = this.#createEl("div", "modal-content");
    if (this.className && this.className.modalContent) {
      modalContent.classList.add(this.className.modalContent);
    }

    modalContent.addEventListener("click", (e) => {
      e.stopPropagation();
    });

    /* Header */

    modalContent.appendChild(this.#renderHeader());

    /* Body */

    modalContent.appendChild(this.#renderModalBody());

    /* Footer */

    modalContent.appendChild(this.#renderFooter());

    return modalContent;
  }

  #renderModalTitle() {
    const modalTitle = this.#createEl("h5", "modal-title");
    if (this.className && this.className.modalTitle) {
      modalTitle.classList.add(this.className.modalTitle);
    }
    modalTitle.textContent = this.title;

    return modalTitle;
  }

  #renderHeader() {
    const modalHeader = this.#createEl("div", "modal-header");
    if (this.className && this.className.modalHeader) {
      modalHeader.classList.add(this.className.modalHeader);
    }

    /* Title */

    modalHeader.appendChild(this.#renderModalTitle());

    /* Close button */

    modalHeader.appendChild(this.#renderCloseButtonHeader());

    return modalHeader;
  }

  #renderModalBody() {
    const modalBody = this.#createEl("div", "modal-body");
    if (this.className && this.className.modalBody) {
      modalBody.classList.add(this.className.modalBody);
    }

    /* Content */

    if (typeof this.content === "string") {
      const p = this.#createEl("p");
      modalBody.appendChild(p);
      p.innerHTML = this.content;
    }

    if (this.content instanceof HTMLElement) {
      modalBody.appendChild(this.content);
    }

    return modalBody;
  }

  #renderFooter() {
    const modalFooter = this.#createEl("div", "modal-footer");
    if (this.className && this.className.modalFooter) {
      modalFooter.classList.add(this.className.modalFooter);
    }

    /* Buttons */

    if (this.footer === "default") {
      modalFooter.appendChild(this.#renderCloseButtonFooter());
    }

    if (this.footer === "none") {
      return modalFooter;
    }

    if (typeof this.footer === "object") {
      if (Object.keys(this.footer).includes("closeButton")) {
        modalFooter.appendChild(
          this.#renderCloseButtonFooter({
            text: this.footer.closeButton.text,
            className: this.footer.closeButton.className,
            callback: this.footer.closeButton.callback,
          })
        );
      }

      if (Object.keys(this.footer).includes("customButtons")) {
        this.footer.customButtons.map((o) => {
          modalFooter.appendChild(
            this.#renderCustomButton({
              text: o.text,
              className: o.className,
              callback: o.callback,
            })
          );
          return;
        });
      }
    }

    return modalFooter;
  }

  #renderCustomButton({ text, className = null, callback = null }) {
    const btn = this.#createEl("button", "btn", { type: "button" });
    btn.textContent = text;
    if (className) btn.classList.add(className);
    if (callback) btn.addEventListener("click", callback);

    return btn;
  }

  #renderCloseButtonFooter() {
    const btnClose = this.#createEl("button", "btn", {
      type: "button",
      ariaLabel: "close",
    });
    btnClose.textContent = "Close";
    btnClose.addEventListener("click", () => this.close());

    return btnClose;
  }

  #renderCloseButtonHeader() {
    const btnClose = this.#createEl("button", "btn-close", {
      type: "button",
      ariaLabel: "close",
    });
    btnClose.addEventListener("click", () => this.close());

    return btnClose;
  }

  #toogleStyle() {
    const style = document.querySelector("#modal-style");

    if (style) {
      style.remove();
    } else if (this.#style === "none") {
      return;
    } else {
      const style = document.createElement("style");
      style.id = "modal-style";
      style.textContent = this.#style;
      document.head.appendChild(style);
    }
  }

  /* Methods */

  render() {
    // Catching errors before render
    this.#catchingErrors();

    // Build modal
    return this.#renderModal();
  }

  open() {
    // Load style
    this.#toogleStyle();

    // Remove modal if exists
    this.destroy();

    // Render modal
    this.body.insertAdjacentElement("afterbegin", this.render());
  }

  close() {
    if (!document.querySelector(".modal")) return;

    // Remove style
    this.#toogleStyle();

    this.destroy();
  }

  // Remove modal
  destroy() {
    if (!document.querySelector(".modal")) return;
    this.body.removeChild(document.querySelector(".modal"));
  }
}
