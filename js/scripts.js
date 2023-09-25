const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
const endpoint = '/character/';
let currentPage = 1;
const PER_PAGE = 6;

let response;

const container = document.getElementById("container");
const searchBox = document.getElementById("searchBox");
const prevPageButton = document.getElementById("prevPage");
const nextPageButton = document.getElementById("nextPage");
const firstPageButton = document.getElementById("firstPage");
const lastPageButton = document.getElementById("lastPage");

const card = document.createElement("div");
card.className = "card";

let isLoading = false;

async function loadCharacters(page = 1, name = "") {
  try {
    isLoading = true;

    prevPageButton.disabled = true;
    firstPageButton.disabled = true;

    nextPageButton.disabled = true;
    lastPageButton.disabled = true;

    container.innerHTML = "";

    const params = {
      page,
      name,
    };

    response = await api.get(endpoint, { params });
    const results = response.data.results;

    for (i = 0; i < PER_PAGE; i++) {
      const currentPageEl = document.getElementById("currentPage");
      currentPageEl.innerText = currentPage;

      const card = document.createElement("div");
      card.className = "card";

      const characterImage = document.createElement("img");
      characterImage.src = results[i].image;

      const infoBox = document.createElement("div");
      infoBox.className = "infoBox";

      const characterName = document.createElement("h2");
      characterName.innerText = `Nome: ${results[i].name}`;

      const characterStatus = document.createElement("p");
      characterStatus.innerText = `Status: ${results[i].status}`;

      const characterSpecies = document.createElement("p");
      characterSpecies.innerText = `Espécie: ${results[i].species}`;

      card.appendChild(characterImage);
      card.appendChild(infoBox);
      infoBox.appendChild(characterName);
      infoBox.appendChild(characterStatus);
      infoBox.appendChild(characterSpecies);

      container.appendChild(card);
      console.log(response.data.results);

      const info = response.data.info;

      prevPageButton.disabled = info.prev ? false : true;
      firstPageButton.disabled = info.prev ? false : true;

      nextPageButton.disabled = info.next ? false : true;
      lastPageButton.disabled = info.next ? false : true;
    }
  } catch (error) {
    console.log("Error -> ", error);
  } finally {
    isLoading = false;
  }
}

loadCharacters();

searchBox.addEventListener("input", () => {
  currentPage = 1;
  loadCharacters(currentPage, searchBox.value);
});

firstPageButton.addEventListener("click", () => {
  if (currentPage > 1 && !isLoading) {
    currentPage = 1;
    loadCharacters(currentPage, searchBox.value);
  }
});

lastPageButton.addEventListener("click", () => {
  if (currentPage < response.data.info.pages && !isLoading) {
    currentPage = Math.ceil(response.data.info.pages);
    loadCharacters(currentPage, searchBox.value);
  }
});

prevPageButton.addEventListener("click", () => {
  if (currentPage > 1 && !isLoading) {
    currentPage--;
    loadCharacters(currentPage);
  }
});

nextPageButton.addEventListener("click", () => {
  if (currentPage < response.data.info.pages && !isLoading) {
    currentPage++;
    loadCharacters(currentPage, searchBox.value);
  }
});
