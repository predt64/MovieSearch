import { defineStore } from "pinia";
const url = "http://localhost:3031/docs?_limit=25&_page=";
const engLetters = /[a-zA-Z]/;

export const useStorage = defineStore("storage", {
  state: () => ({
    loader: false,
    totalPages: 0,
    currentPage: 1,
    movieSearch: "",
    movies: [],
    favMovies:[],
  }),
  actions: {
    async getMovies(search,sortType='') {
      this.loader = true;
      let res;

      //если введено английское слово, ищем по соответсвующему ключу
      if (engLetters.test(search))
        res = await fetch(`${url}${this.currentPage}&alternativeName_like=${search}&_sort=${sortType}&_order=desc`);

      else 
        res = await fetch(`${url}${this.currentPage}&name_like=${search}&_sort=${sortType}&_order=desc`);

      const data = await res.json();

      //подсчет количества страниц. не уверен, что это нужно делать именно тут, но вроде удобно
      (this.totalPages = Math.ceil(res.headers.get("x-total-count") / 25)),
        (this.movies = data);
      this.movieSearch = search;
      this.loader = false;
    },
    async getMovieById(id){
      const res = await fetch(`http://localhost:3031/docs?id=${id}`)
      const data = await res.json();
      return data
    }
  },
});
