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
