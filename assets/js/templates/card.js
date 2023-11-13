import { capitalize, slugify } from "../utils/index.js";

export const card = (root, data) => {
  if (!root) el = document.querySelector("body");

  const col = document.createElement("div");
  col.classList.add("col-sm-2");
  const card = document.createElement("div");
  card.classList.add("card", "h-100");
  const body = document.createElement("div");
  body.classList.add(
    "card-body",
    "d-flex",
    "flex-column",
    "justify-content-between"
  );
  root.appendChild(col).appendChild(card).appendChild(body);

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.textContent = capitalize(data.name);

  const description = document.createElement("p");
  description.classList.add("card-text", "text-muted");
  description.textContent = capitalize(data.description);

  const button = document.createElement("button");
  button.classList.add("btn", "btn-primary");
  button.setAttribute("data-bs-toggle", "modal");
  button.setAttribute("data-bs-target", "#settingsModal");
  button.setAttribute("id", `${slugify(data.path)}-Button`);
  button.textContent = "Play";
  if (data.state === "in-progress") {
    button.classList.add("disabled");
  }

  body.appendChild(title);
  body.appendChild(description);
  body.appendChild(button);
};
