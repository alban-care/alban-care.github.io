export const setModal = (id, data) => {
  if (!id) throw new Error("id is required");

  const body = document.querySelector("body");

  const modal = document.createElement("div");
  modal.classList.add("modal", "fade");
  modal.setAttribute("id", id);
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-labelledby", `${id}Label`);
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.classList.add("modal-dialog");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const modalHeader = document.createElement("div");
  modalHeader.classList.add("modal-header");

  const modalTitle = document.createElement("h1");
  modalTitle.classList.add("modal-title", "fs-5", "text-dark");
  modalTitle.setAttribute("id", `${id}Label`);
  modalTitle.textContent = data.title || "";

  const modalCloseButton = document.createElement("button");
  modalCloseButton.classList.add("btn-close");
  modalCloseButton.setAttribute("type", "button");
  modalCloseButton.setAttribute("data-bs-dismiss", "modal");
  modalCloseButton.setAttribute("aria-label", "Close");

  const modalBody = document.createElement("div");
  modalBody.classList.add("modal-body", "text-dark");
  modalBody.appendChild(data.content);

  const modalFooter = document.createElement("div");
  modalFooter.classList.add("modal-footer");

  const closeButton = document.createElement("button");
  closeButton.classList.add("btn", "btn-secondary");
  closeButton.setAttribute("type", "button");
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.textContent = "Cancel";

  if (data.button) {
    const { label, type, path } = data.button;

    const altButton = document.createElement("button");
    altButton.classList.add("btn", "btn-primary");
    altButton.setAttribute("type", type || "button");

    if (type === "link") {
      altButton.setAttribute("href", `/games/${path}` || "#");
      altButton.textContent = label || "Play";
    }

    modalFooter.appendChild(altButton);
  }

  modalFooter.appendChild(closeButton);
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(modalCloseButton);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);
  body.appendChild(modal);
};
