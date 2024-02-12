import {defineStore} from 'pinia'
const url="https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query="
const options={
  method:'GET',
  headers: {accept: 'application/json', 'X-API-KEY': '4ADT0P3-B4T4584-QAXQZ8V-KJ31MK4'}
};

export const useStorage =defineStore('storage',{
  state:()=>({
    loader:false,
    movies:[],
  }),
  actions:{
    async getMovies(search){
      this.movies=[]
      this.loader=true;
      const res = await fetch(`${url}${search}`,options);
      const data = await res.json();
      this.movies=data.docs;
      this.loader=false;
    }
  }
})