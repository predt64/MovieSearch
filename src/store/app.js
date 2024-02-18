import {defineStore} from 'pinia'
const url="https://api.kinopoisk.dev/v1.4/movie/search?limit=25&page="
const urlId='https://api.kinopoisk.dev/v1.4/movie/'
const options={
  method:'GET',
  headers: {accept: 'application/json', 'X-API-KEY': '4ADT0P3-B4T4584-QAXQZ8V-KJ31MK4'},
};

export const useStorage =defineStore('storage',{
  state:()=>({
    loader:false,
    totalPages:10,
    currentPage:1,
    movies:[],
    counter:1
  }),
  actions:{
    async getMovies(search){
      this.loader=true;
      const res = await fetch(`${url}${this.currentPage}&query=${search}`,options);
      const data = await res.json();
      this.totalPages=data.pages;
      this.movies=data.docs;
      this.loader=false;
    },
    async getMovieById(id){
      const res = await fetch(`${urlId}${id}`,options)
      const data = await res.json();
      this.movies=data.docs;
    }
  },
})