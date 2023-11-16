export default class Modal {
  constructor(title, content, footer) {
    this.title = title;
    this.content = content;
    this.footer = footer;
    this.body = document.querySelector("body");
  }

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

  open() {
    this.body.appendChild(this.render());
  }

  close() {
    if (!document.querySelector(".modal")) return;
    this.body.removeChild(document.querySelector(".modal"));
  }

  render() {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(this.#style));
    document.getElementsByTagName("head")[0].appendChild(style);

    const modal = this.#createEl("div", "modal");
    const modalInner = this.#createEl("div", "modal-dialog");
    const modalContent = this.#createEl("div", "modal-content");
    const modalHeader = this.#createEl("div", "modal-header");
    const modalTitle = this.#createEl("h5", "modal-title");
    if (this.title) {
      modalTitle.textContent = this.title;
    }
    const modalBtnClose = this.#createEl("button", "btn-close", {
      type: "button",
      ariaLabel: "close",
    });
    const modalBody = this.#createEl("div", "modal-body");
    if (this.content) {
      modalBody.innerHTML = this.content;
    }
    const modalFooter = this.#createEl("div", "modal-footer");
    const modalBtnCloseFooter = this.#createEl("button", "btn", {
      type: "button",
      ariaLabel: "close",
    });
    modalBtnCloseFooter.textContent = "Close";
    if (this.footer) {
      modalFooter.innerHTML = this.footer;
    }

    modal.appendChild(modalInner);
    modalInner.appendChild(modalContent);
    modalContent.appendChild(modalHeader);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(modalBtnClose);
    modalContent.appendChild(modalBody);
    modalFooter.appendChild(modalBtnCloseFooter);
    modalContent.appendChild(modalFooter);

    modalBtnClose.addEventListener("click", () => this.close());
    modalBtnCloseFooter.addEventListener("click", () => this.close());
    modal.addEventListener("click", () => this.close());
    modalContent.addEventListener("click", (e) => e.stopPropagation());

    return modal;
  }
}
