<template>
  <!-- навигация -->
  <my-navbar :main="1" />

  <header class="header">
    <!-- поиск -->
    <my-search
      v-model="movieCurrent"
      @search="search"
      :loading="storage.loader"
    >
      <p class="header__title">Fast. Convinient. Reliable.</p>
      <p class="header__subtitle">
        Unlock the magic of movies with our ultimate Movie Searcher!
      </p>
    </my-search>
  </header>

  <main class="main">
    <!-- кнопки для пагинации и окно для выбора типа сортировки, если сейчас происходит 
      запрос на сервер или кол-во найденных фильмов = 0 то не отображаются -->
    <div class="pages-and-select__wrapper" v-if="storage.movies.length > 0">
      <movie-pages v-model="currentPage" />
      <my-select
        v-model="selectedSort"
        :options="selectOptions"
        class="select"
      />
    </div>
    <!-- пока идет загрузка данных отображаем loader -->
    <!-- итерируемся по массиву полученных из запроса фильмов -->
    <div class="loader-screen" v-if="storage.loader">
      <my-loader />
    </div>
    <div v-if="storage.movies.length > 0">
      <movie-item
        v-for="movie in storage.movies"
        :key="movie.id"
        :movie="movie"
      />
    </div>
    <!-- если массив фильмов пуст -->
    <p v-else-if="!storage.loader" class="main__error">
      Нет совпадений(ಥ﹏ಥ)<br />попробуйте еще раз
    </p>
    <!-- для удобства блок для пагнации внизу страницы -->
    <movie-pages
      v-if="!storage.loader && storage.movies.length > 0"
      v-model="currentPage"
    />
  </main>
</template>

<script>
import MoviePages from "@/components/MoviePages.vue";
import MovieItem from "@/components/MovieItem.vue";
import MySearch from "@/components/MySearch.vue";
import MyNavbar from "@/components/MyNavbar";
import { useStorage } from "@/store/app.js";

export default {
  setup() {
    const storage = useStorage();
    return { storage };
  },
  components: {
    MovieItem,
    MoviePages,
    MySearch,
    MyNavbar,
  },
  data() {
    return {
      movieCurrent: "",
      currentPage: 1,
      selectedSort: "По умолчанию",
      sortValue: "",
      selectOptions: ["По рейтингу", "По дате выхода", "По хронометражу"],
    };
  },
  methods: {
    //при поиске сбрасываем текующую страницу и вид сортировки, вызываем функцию
    //getMovies() из storage
    search() {
      this.selectedSort = "По умолчанию";
      this.currentPage = 1;
      this.storage.getMovies(this.movieCurrent);
    },
  },
  watch: {
    //криво реализованная сортировка. с обычным html <select> можно
    //передавать в него объект с полями name и value, и уже исходя из
    //value осуществлять соответствующую сортировку, но с vuetify <v-select>
    //так не получится, т.к. он ждет на вход именно массив, а не объект, так что
    //пришлось сделать такую не очень красивую реализацию. Возможно я что то не понял
    selectedSort() {
      if (this.selectedSort != "По умолчанию") {
        this.currentPage = 1;
        if (this.selectedSort == "По рейтингу") this.sortValue = "rating.kp";
        else if (this.selectedSort == "По хронометражу")
          this.sortValue = "movieLength";
        else this.sortValue = "year";
        this.storage.getMovies(this.movieCurrent, 1, this.sortValue);
      }
    },
    //следим за изменением страницы, если она поменялась делаем запрос на сервер
    //с соответсвующим параметром _page=
    currentPage() {
      this.storage.getMovies(
        this.movieCurrent,
        this.currentPage,
        this.sortValue
      );
    },
  },
  //при создании страницы вызываем поиск фильмов без входных параметров
  mounted() {
    this.storage.getMovies("");
  },
};
</script>

<style lang="scss" scoped>
.loader-screen {
  position: absolute;
  background-color: rgb(71, 71, 71, 0.7);
  width: 1080px;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  min-height: 645vh;
  z-index: 2;
}
.header__title {
  font-size: 50px;
  font-weight: 800;
}
.header__subtitle {
  font-size: 30px;
}
.v-card {
  box-shadow: none;
}
.v-card-text {
  background-color: #151719;
}
.v-field__append-inner {
  cursor: pointer !important;
}
.main {
  background-color: black !important;
  min-height: 371px;
}
.main__error {
  color: white;
  font-size: 60px;
  text-align: center;
}
.loader {
  height: 371px;
}
.pages-and-select__wrapper {
  position: relative;
  display: flex;
  max-width: 1080px;
  margin: 0 auto;
  justify-content: center;
}
.select {
  position: absolute;
  right: 0px;
}
.v-skeleton-loader {
  display: block;
  background-color: black;
}
</style>