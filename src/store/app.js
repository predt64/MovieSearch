import { defineStore } from "pinia";
import { ref, watch } from "vue";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": "4ADT0P3-B4T4584-QAXQZ8V-KJ31MK4",
  },
};
const url = "http://localhost:3031/docs?_limit=25&_page=";
const engLetters = /[a-zA-Z]/;

//для того чтобы работал watch переписал storage в composition API
export const useStorage = defineStore("storage", () => {
  const loader = ref(false);
  const totalPages = ref(0);
  const currentPage = ref(1);
  const movieSearch = ref("");
  const movies = ref([]);
  const similarMovies = ref([]);
  const movieInfo = ref({});
  const favMovies = ref([]);
  const favMoviesInLocalStorage = localStorage.getItem("fav-movies");

  if (favMoviesInLocalStorage) {
    favMovies.value = JSON.parse(favMoviesInLocalStorage)._value;
  }

  const getMovies = async (search, sortType = "") => {
    loader.value = true;
    let res;
    //если введено английское слово, ищем по соответсвующему ключу
    if (engLetters.test(search))
      res = await fetch(
        `${url}${currentPage.value}&alternativeName_like=${search}&_sort=${sortType}&_order=desc`
      )
    else
      res = await fetch(
        `${url}${currentPage.value}&name_like=${search}&_sort=${sortType}&_order=desc`
      )
      console.log(sortType)

    const data = await res.json();

    //подсчет количества страниц. не уверен, что это нужно делать именно тут, но вроде удобно
    totalPages.value = Math.ceil(res.headers.get("x-total-count") / 25);
    movies.value = data;
    movieSearch.value = search;
    loader.value = false;
  };

  //я хотел как то попробовать сделать так, чтобы после выполнения функции
  //она возвращала найденный фильм, и я бы его сохранял уже в компоненте,
  //а не в хранилище(возмонжо это более правильно? мне так показалось.
  //хотя количество используемой памяти вроде не меняется, но засорять
  //хранилище под кучу узконаправленных переменных не хотелось бы).
  //но я не понял как это сделать, всегда возвращался [object Promise],
  //много всякого перепробовал, в основном связанного с промисами,
  //в интернете на тему передачи данных из pinia из асинхронной функции
  //не нашел, так что решил остановиться на варианте с сохранением значения
  //в хранилище и уже последующем его использовании в компоненте.
  const getSimilarMovies = async (id) => {
    loader.value = true;
    const res = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie/${id}`,
      options
    );
    const data = await res.json();
    movieInfo.value = data;
    const similarMoviesId = data.similarMovies;
    similarMovies.value = [];
    for (let i = 0; i < similarMoviesId.length; i++) {
      const response = await fetch(
        `http://localhost:3031/docs?id=${similarMoviesId[i].id}`
      );
      const similarData = await response.json();
      if (similarData.length) {
        similarMovies.value.push(similarData[0]);
      }
      if (similarMovies.value.length == 3) break;
    }
    while (similarMovies.value.length < 3) {
      const response = await fetch(
        `http://localhost:3031/docs?id_like=${Math.floor(Math.random() * 99)}`
      );
      const similarData = await response.json();
      if (similarData != []) {
        similarMovies.value.push(similarData[0]);
      }
    }
    loader.value = false;
  };

  watch(
    () => favMovies,
    (state) => localStorage.setItem("fav-movies", JSON.stringify(state)),
    { deep: true }
  );

  return {
    loader,
    totalPages,
    currentPage,
    movieSearch,
    movies,
    similarMovies,
    movieInfo,
    favMovies,
    getMovies,
    getSimilarMovies,
  };
});
