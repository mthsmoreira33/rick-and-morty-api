const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
});
const endpoint = '/character/';
let currentPage = 1;
const PER_PAGE = 6;

let response;
