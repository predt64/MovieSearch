<template>
  <header class="header">
    <div class="search">
      <div class="search__title">
        <p class="search__title_main">
          Fast. Convinient. Reliable. 
        </p>
        <p class="search__title_subtitle">
          Unlock the magic of movies with our ultimate Movie Searcher!
        </p>
      </div>
      <div class="search__input">
        <my-input v-model="movieCurrent" @search="storage.getMovies(movieCurrent)"/>
      </div>
    </div>
  </header>
  <main class="main">
    <my-loader v-if="storage.loader" class="loader"/>
    <movie-item v-else-if="storage.movies.length>0" v-for="movie in storage.movies" :key="movie.id" :movie="movie"/>
    <p v-else class="main__error">Нет совпадений(ಥ﹏ಥ)<br/>попробуйте еще раз</p>
  </main>
</template>

<script>
import myInput from "@/UI/MyInput.vue";
import myLoader from "@/UI/MyLoader.vue";
import MovieItem from "@/components/MovieItem.vue";
import { useStorage } from '@/store/app.js'

export default {
 
  setup() {
    const storage = useStorage()
    return { storage } 
  },
  components: {
    myInput,myLoader,MovieItem
  },
  data() {
    return {
      movieCurrent: "",
    };
  },
  methods: {
    search() {
      alert("qwe");
    },
  },
  beforeMount(){
    this.storage.getMovies('')
  }
};
</script>

<style lang="scss" scoped>
.v-card {
  box-shadow: none;
}
.v-card-text {
  background-color: #151719;
}
.v-field__append-inner {
  cursor: pointer !important;
}
.header{
  background-image:  linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0.5) 60%, rgba(0, 0, 0, 0.7) 100%), url(@/img/bgimage.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding-top: 120px;
  padding-bottom: 105px;
}
.search__input {
  text-align: center;
  margin-top: 40px;
}
.search__title{
  text-align: center;
  color: white;
}
.search__title_main{
  font-size: 50px;
  font-weight: 800;
}
.search__title_subtitle{
  font-size: 30px;
}
.main__error{
  text-align: center;
  font-size: 60px;
  height: 371px;
}
.loader{
  
  height: 371px;
}
</style>
