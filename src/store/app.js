import { defineStore } from "pinia";
import { ref, watch } from "vue";

//ключ к апи сайта
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    "X-API-KEY": "4ADT0P3-B4T4584-QAXQZ8V-KJ31MK4",
  },
};

const url = "http://localhost:3031/docs?_limit=25&_page=";
//для поиска фильмов на английском
const engLetters = /[a-zA-Z]/;

//для того чтобы работал watch переписал storage в composition API
export const useStorage = defineStore("storage", () => {
  const loader = ref(false);
  const totalPages = ref(0);
  const movies = ref([]);
  const similarMovies = ref([]);
  const movieInfo = ref({});
  const favMovies = ref([]);
  const favMoviesInLocalStorage = localStorage.getItem("fav-movies");
  //сбор данных из localStorage
  if (favMoviesInLocalStorage) {
    favMovies.value = JSON.parse(favMoviesInLocalStorage)._value;
  }

  //поиск фильмов
  const getMovies = async (search,currentPage=1, sortType = "") => {
    //пока идет запрос на странице отображается loader
    loader.value = true;
    let res;
    //если введено английское слово, ищем по соответсвующему ключу
    if (engLetters.test(search))
      res = await fetch(
        `${url}${currentPage}&alternativeName_like=${search}&_sort=${sortType}&_order=desc`
      )
    //иначе считаем что на русском
    else
      res = await fetch(
        `${url}${currentPage}&name_like=${search}&_sort=${sortType}&_order=desc`
      )

    const data = await res.json();

    //подсчет количества страниц. не уверен, что это нужно делать именно тут, но вроде удобно?
    //могу перенести в компоненты и передавать аргументом
    totalPages.value = Math.ceil(res.headers.get("x-total-count") / 25);
    movies.value = data;
    //loader отработал
    loader.value = false;
  };
  
  //поиск информации о фильме
  const getMovieInfo = async (id) => {
    loader.value = true;
    //берем информацию о фильме с сайта, т.к. там есть поле similarMovies
    //из которого мы детерменированно берем похожие фильмы
    const res = await fetch(
      `https://api.kinopoisk.dev/v1.4/movie/${id}`,
      options
    );
    const data = await res.json();
    movieInfo.value = data;
    //сохраняем все похожие фильмы в переменную
    const similarMoviesId = data.similarMovies;
    //убираем прошлые схожие фильмы из хранилища
    similarMovies.value = [];
    
    //по id ищем, есть ли найденные схожие фильмы в моей БД. Можно было
    //схожие фильмы тоже брать из БД сайта, но там можно делать только 200 запросов 
    //в день, поэтому для экономии тратчу только 1 запрос для получения фильма и поля
    //similarMovies в нем.
    //Отображаем 3 схожих фильма. Цикл останавливается когда нашел 3 фильма в моей
    //БД, если же не нашел или нашел меньше 3 штук, то берем их случайно.
    for (let i = 0; i < similarMoviesId.length; i++) {
      const response = await fetch( 
        `http://localhost:3031/docs?id=${similarMoviesId[i].id}`
      );
      const similarData = await response.json();
      //similarData.length т.к. нам возвращается массив
      if (similarData.length) {
        similarMovies.value.push(similarData[0]);
      }
      if (similarMovies.value.length == 3) break;
    }
    while (similarMovies.value.length < 3) {
      //если умножать на 9, то будут почти всегда одни и те же фильмы, а если на 99,
      //то нет. Т.к. мы ищем при помощи регулярного выражения _like, а фильмов 1000,
      //то вероятноть получить ничего крайне мала. По крайней мере за все время пользования
      //такого ни разу не произошло
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
  //сохранение в локалсторэдж
  watch(
    () => favMovies,
    (state) => localStorage.setItem("fav-movies", JSON.stringify(state)),
    { deep: true }
  );

  return {
    loader,
    totalPages,
    movies,
    similarMovies,
    movieInfo,
    favMovies,
    getMovies,
    getMovieInfo,
  };
});
