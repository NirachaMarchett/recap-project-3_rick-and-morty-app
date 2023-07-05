import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 42;
let page = 1;
let searchQuery = "";

// fetch the data

export async function fetchCharacters() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
  );
  const JSON = await response.json();
  const data = await JSON.results;
  return data;
}

// this can be removed as we fetch all data with fetchCharacters
export async function fetchInfo() {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
  );
  const JSON = await response.json();
  const data = await JSON.info.pages;
  return data;
}

// Render card
render();

pagination.textContent = `${page}/${maxPage}`;

//Pagination

async function render() {
  try {
    cardContainer.innerHTML = "";
    //After removed fetchInfo function and return JSON (line 26), remove line 25
    //const data = await fetchCharacters();
    maxPage = await fetchInfo(); // replace with data.info.pages
    const allCharacters = await fetchCharacters(); //data.results
    allCharacters.forEach((character) => {
      createCharacterCard(character);
    });
    pagination.textContent = `${page}/${maxPage}`;
  } catch (error) {
    console.log("error: ", error);
  }
}

function increasePageCount() {
  if (page >= 1 && page < maxPage) {
    page++;
    render();
  }
}

function decreasePageCount() {
  if (page > 1 && page <= maxPage) {
    page--;
    render();
  }
}

nextButton.addEventListener("click", () => {
  increasePageCount();
});

prevButton.addEventListener("click", () => {
  decreasePageCount();
});

// Search Bar

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(event.target));
  searchQuery = data.query;
  page = 1;
  render();
  searchBar.reset();
  //searchBar.query.focus();
});
