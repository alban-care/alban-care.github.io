import { directories } from "./config.js";

/**
 * Check if the template is supported by the browser.
 * @returns {boolean} - True if the template is supported, false otherwise. *
 */
const supportedTemplate = () => {
  if ("content" in document.createElement("template")) {
    return true;
  }

  return false;
};

const generateListOfGames = () => {
  const games = document.getElementById("games");

  if (!supportedTemplate()) {
    console.error("Template is not supported.");
    return;
  }

  const hasChildren = games.hasChildNodes();

  if (hasChildren) {
    while (games.firstChild) {
      games.removeChild(games.firstChild);
    }
  }

  if (!directories || directories.length === 0) {
    const message = document.createElement("p");

    message.textContent = "No games found.";
    message.classList.add("text-center", "text-light");
    games.appendChild(message);
    return;
  }

  directories.forEach((directory) => {
    if (directory.state === "not-started") return;
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
    games.appendChild(col).appendChild(card).appendChild(body);

    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = capitalize(directory.name);

    const description = document.createElement("p");
    description.classList.add("card-text", "text-muted");
    description.textContent = capitalize(directory.description);

    const link = document.createElement("a");
    link.classList.add("btn", "btn-primary");
    link.textContent = "Play";
    link.setAttribute("href", directory.path);
    link.setAttribute("target", "_blank");
    if (directory.state === "in-progress") {
      link.classList.add("disabled");
    }
    body.appendChild(title);
    body.appendChild(description);
    body.appendChild(link);
  });

  if (!games.hasChildNodes()) {
    const message = document.createElement("p");

    message.textContent = "No games found.";
    message.classList.add("text-center", "text-light");
    games.appendChild(message);
    return;
  }

  const message = document.createElement("p");
  message.textContent = "Click on a game to play.";
  message.classList.add("text-center", "text-light");
  games.appendChild(message);
};

document.addEventListener("DOMContentLoaded", () => generateListOfGames());

function capitalize(string) {
  if (!string) return string;
  if (typeof string !== "string") return string;
  if (string.length === 1) return string.toUpperCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
}
