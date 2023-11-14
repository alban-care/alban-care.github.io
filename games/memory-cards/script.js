import { faker } from "./data.js";

const API_URL = "https://pokeapi.co/api/v2/";
const ENV = "prod"; // prod || dev
const level = "expert"; // beginner || intermediate || expert
let first = null;
let second = null;

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
  if (!flippedCardEl) return;
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

  const cardsInRow = Math.sqrt(array.length); // 4 or 6 or 8

  board.classList.add("row", `row-cols-${cardsInRow}`, "g-1");

  const boardSize = cardsInRow * 90 + (cardsInRow - 1) * 10; // 4 * 90 + 3 * 10 = 400 (px
  board.style.width = `${boardSize}px`;
  board.style.height = `${boardSize}px`;
  board.style.minWidth = `${boardSize}px`;
  board.style.minHeight = `${boardSize}px`;

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
    col.style.height = `${boardSize / cardsInRow}px`;
    col.style.minHeight = `${boardSize / cardsInRow}px`;
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
      getClickedCards(card);
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

const getClickedCards = (card) => {
  const pokemonName = card.querySelector(".front").alt;
  console.log(pokemonName);

  if (!card) return;
  if (!first) {
    first = card;
    first.classList.add("disabled");
    return;
  }

  if (!second) {
    second = card;
    first.classList.add("disabled");
  }

  const cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.classList.add("disabled");
  });

  setTimeout(() => {
    flipCard(first);
    flipCard(second);
    first = null;
    second = null;
    cards.forEach((card) => {
      card.classList.remove("disabled");
    });
  }, 1000);

  compareCards(first, second);
};

const compareCards = (first, second) => {
  if (!first || !second) return;

  const firstCardName = first.querySelector(".front").alt;
  const secondCardName = second.querySelector(".front").alt;

  if (firstCardName === secondCardName) {
    first.classList.add("fade-out");
    second.classList.add("fade-out");

    setTimeout(() => {
      first.parentNode.removeChild(first);
      second.parentNode.removeChild(second);

      first = null;
      second = null;
    }, 500);

    return;
  }

  first = null;
  second = null;

  return;
};

const init = async () => {
  /* init the game */
  // get difficulty
  const numberOfCards =
    ENV === "dev"
      ? difficulty("beginner") ** 2 / 2
      : difficulty(level) ** 2 / 2;
  // get pokemons cards
  const pokemons = await getPokemons(numberOfCards);
  // set shuffle deck cards
  const cards = await shuffle([...pokemons, ...pokemons]);
  /* render views */
  await generateBoard(cards);
};

document.addEventListener("DOMContentLoaded", await init());
