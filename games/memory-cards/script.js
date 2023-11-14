import { faker } from "./data.js";

const API_URL = "https://pokeapi.co/api/v2/";
const ENV = "dev"; // prod || dev

const difficulty = (level) => {
  switch (level) {
    case "beginner":
      return 4;
    case "intermediate":
      return 6;
    case "expert":
      return 8;
    default:
      return 4;
  }
};

const shuffle = async (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const flipCard = (card) => {
  if (!card) return;
  const flippedCardEl = card.querySelector(".card-body");
  flippedCardEl.classList.toggle("flipped");
  return card;
};

const generateBoard = async (array) => {
  if (!array || array.length === 0) {
    console.log("No valid array or empty in the generateBoard function");
    return;
  }

  if (array.length % 2 !== 0 || array.length > 64 || array.length < 16) {
    console.log(
      "Array length is not even or is greater than 64 or less than 16"
    );
    return;
  }

  const board = document.getElementById("board");
  if (!board) {
    console.log("No valid board");
    return;
  }

  const hasChildren = board.hasChildNodes();

  if (hasChildren) {
    while (board.firstChild) {
      board.removeChild(board.firstChild);
    }
  }

  board.classList.add("row", `row-cols-${Math.sqrt(array.length)}`, "g-1");
  board.style.width = `${
    Math.sqrt(array.length) * ((150 * 4) / Math.sqrt(array.length))
  }px`;

  const cardView = (name, image) => {
    return `
    <div class="card">
    <div class="card-body flipped">
    <img src="${image}" class="front" alt="${name}">
    <img src="./images/pokeball.png" class="back" alt="pokeball" />
    </div>
    </div>`;
  };

  for (const pokemon of array) {
    const info = await getCardInfo(pokemon);
    const col = document.createElement("div");
    col.classList.add("col");
    col.innerHTML += cardView(
      info.name,
      info.image || "https://via.placeholder.com/150"
    );
    board.appendChild(col);
  }

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      flipCard(card);
    });
  });

  return board;
};

/* get pokemons with api */
const getPokemons = async (numberOfCards) => {
  if (ENV === "dev") {
    numberOfCards = 8;
    const pokemons = faker.results.slice(0, numberOfCards);
    return await shuffle(pokemons);
  }
  /* production */
  const response = await fetch(
    `${API_URL}pokemon?limit=${numberOfCards}&offset=0`
  );

  const data = await response.json();

  if (!data || !response.ok) {
    console.log("no data founded");
    return;
  }

  return await shuffle(data.results);
};

const getCardInfo = async (pokemon) => {
  if (ENV === "dev") {
    const number = pokemon.url.replaceAll("/", "").slice(-1);

    return {
      name: pokemon.name,
      image: `./images/${number}.svg`,
    };
  }

  const response = await fetch(pokemon.url);
  const data = await response.json();
  if (!data || !response.ok) {
    return;
  }

  return {
    name: data.name,
    image: data.sprites.other.dream_world.front_default,
  };
};

const init = async () => {
  if (ENV === "dev") {
    const numberOfCards = difficulty("beginner") ** 2 / 2;
    const pokemons = await getPokemons(numberOfCards);
    const cards = await shuffle([...pokemons, ...pokemons]);
    const board = await generateBoard(cards);
    return board;
  } else {
    /* production */
    const numberOfCards = difficulty("beginner") ** 2 / 2;
    const pokemons = await getPokemons(numberOfCards);
    if (!pokemons) {
      return;
    }
    const cards = await shuffle([...pokemons, ...pokemons]);
    const board = await generateBoard(cards);
    return board;
  }
};

document.addEventListener("DOMContentLoaded", await init());
