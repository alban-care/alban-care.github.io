import { directories } from "../../config.js";
import { card } from "./templates/card.js";
import { setModal } from "./templates/modal.js";
import { capitalize } from "./utils/index.js";

const section = document.getElementById("games");

export const games = () => {
  section.addEventListener("load", init());
};

const init = () => {
  setSettingsModal();
  setGamesSection();
};

const setGamesSection = () => {
  const list = section.querySelector("#list");

  const hasChildren = list.hasChildNodes();

  if (hasChildren) {
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }
  }

  if (!directories || directories.length === 0) {
    const message = document.createElement("p");

    message.textContent = "No games found.";
    message.classList.add("text-center", "text-light");
    list.appendChild(message);
    return;
  }

  directories.forEach((directory) => {
    if (directory.state === "not-started") return;
    card(list, directory);
  });

  if (!list.hasChildNodes()) {
    const message = document.createElement("p");

    message.textContent = "No games found.";
    message.classList.add("text-center", "text-light");
    list.appendChild(message);
    return;
  }

  const message = document.createElement("p");
  message.textContent = "Click on a game to play.";
  message.classList.add("text-center", "text-light");
  list.appendChild(message);

  return list;
};

const setSettingsModal = () => {
  setModal("settingsModal", {
    title: "Settings",
    content: settingsForm(),
    button: {
      label: "Play",
      type: "link",
      path: "/games/",
    },
  });
};

const settingsForm = () => {
  const form = document.createElement("form");
  form.className = "row g-3 needs-validation";
  form.novalidate = true;

  const nickname = document.createElement("div");
  nickname.className = "col-md-4";

  const nicknameLabel = document.createElement("label");
  nicknameLabel.className = "form-label";
  nicknameLabel.setAttribute("for", `nickNameValidation`);
  nicknameLabel.textContent = "Nickname";

  const nicknameInput = document.createElement("input");
  nicknameInput.className = "form-control";
  nicknameInput.setAttribute("type", "text");
  nicknameInput.setAttribute("id", `nickNameValidation`);
  nicknameInput.setAttribute("aria-describedby", `nickNameInputGroupPrepend`);
  nicknameInput.setAttribute("placeholder", "Nickname");
  nicknameInput.required = true;

  const nicknameFeedback = document.createElement("div");
  nicknameFeedback.className = "invalid-feedback";
  nicknameFeedback.textContent = "Please choose a nickname.";

  nickname.appendChild(nicknameLabel);
  nickname.appendChild(nicknameInput);
  nickname.appendChild(nicknameFeedback);

  const level = document.createElement("div");

  const radioArray = ["beginner", "intermediate", "advanced"];
  radioArray.forEach((radio, index) => {
    level.appendChild(setRadioInput(index, "level", radio));
  });

  form.appendChild(nickname);
  form.appendChild(level);

  return form;
};

const setRadioInput = (index, name, labelText) => {
  const formCheck = document.createElement("div");
  formCheck.className = "form-check";

  const input = document.createElement("input");
  input.className = "form-check-input";
  input.setAttribute("type", "radio");
  input.setAttribute("name", `${name}FlexRadio`);
  input.setAttribute("id", `${name}FlexRadio${index}`);

  const label = document.createElement("label");
  label.className = "form-check-label";
  label.setAttribute("for", `${name}FlexRadio${index}`);
  label.textContent = capitalize(labelText);

  formCheck.appendChild(input);
  formCheck.appendChild(label);

  return formCheck;
};
